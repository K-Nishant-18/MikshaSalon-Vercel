import { storage } from "../server/storage";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const TOKEN_NAME = "mishka_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).end("Method Not Allowed");
    }

    const body = req.body || (await new Promise((r) => {
      let data = "";
      req.on("data", (c: any) => (data += c));
      req.on("end", () => r(JSON.parse(data || "{}")));
    }));

    const { username, password } = body;
    if (!username || !password) return res.status(400).json({ message: "username and password required" });

    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) return res.status(401).json({ message: "invalid credentials" });

    const secret = process.env.SESSION_SECRET || "dev_session_secret_change_me";
    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: TOKEN_MAX_AGE });

    const cookie = serialize(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_MAX_AGE,
    });

    res.setHeader("Set-Cookie", cookie);
    const { password: _p, ...publicUser } = user as any;
    return res.status(200).json({ user: publicUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message || "Internal Server Error" });
  }
}
