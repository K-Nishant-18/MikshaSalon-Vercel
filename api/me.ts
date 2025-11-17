import { storage } from "../server/storage";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const TOKEN_NAME = "mishka_token";

export default async function handler(req: any, res: any) {
  try {
    const cookies = req.headers?.cookie ? parse(req.headers.cookie) : {};
    const token = cookies[TOKEN_NAME];
    if (!token) return res.status(401).json({ message: "unauthenticated" });

    const secret = process.env.SESSION_SECRET || "dev_session_secret_change_me";
    let payload: any;
    try {
      payload = jwt.verify(token, secret) as any;
    } catch (e) {
      return res.status(401).json({ message: "invalid token" });
    }

    const user = await storage.getUser(payload.id as string);
    if (!user) return res.status(404).json({ message: "user not found" });
    const { password: _p, ...publicUser } = user as any;
    return res.status(200).json({ user: publicUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message || "Internal Server Error" });
  }
}
