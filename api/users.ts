import { storage } from "../server/storage";

export default async function handler(req: any, res: any) {
  try {
    if (req.method === "POST") {
      const body = req.body || (await new Promise((r) => {
        let data = "";
        req.on("data", (chunk: any) => (data += chunk));
        req.on("end", () => r(JSON.parse(data || "{}")));
      }));

      const { username, password } = body;
      if (!username || !password) {
        return res.status(400).json({ message: "username and password required" });
      }

      const existing = await storage.getUserByUsername(username);
      if (existing) {
        return res.status(409).json({ message: "user already exists" });
      }

      const user = await storage.createUser({ username, password });
      return res.status(201).json({ user });
    }

    if (req.method === "GET") {
      const id = req.query?.id || req.url?.split("/").pop();
      if (!id) return res.status(400).json({ message: "id required" });

      const user = await storage.getUser(id as string);
      if (!user) return res.status(404).json({ message: "not found" });
      // hide password in response
      const { password, ...rest } = user as any;
      return res.status(200).json({ user: rest });
    }

    res.setHeader("Allow", "GET,POST");
    res.status(405).end("Method Not Allowed");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message || "Internal Server Error" });
  }
}
