import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import buildApp from '../server/app';

let cachedHandler: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedHandler) {
      const app = await buildApp();
      cachedHandler = serverless(app as any);
    }

    return cachedHandler(req, res);
  } catch (err) {
    console.error('serverless handler error', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
