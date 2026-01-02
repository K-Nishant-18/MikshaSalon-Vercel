import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import buildApp from '../server/app';

let cachedHandler: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("Vercel Function Invoked: " + req.url);
  try {
    if (!cachedHandler) {
      console.log("Building app...");
      const app = await buildApp();
      console.log("App built, creating handler...");
      cachedHandler = serverless(app as any);
    }

    console.log("Processing request...");
    return cachedHandler(req, res);
  } catch (err) {
    console.error('serverless handler error', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
