import express, { type Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import { registerRoutes } from "./routes";

export async function buildApp() {
  const app = express();

  // attach a typed rawBody field via intersection instead of module augmentation
  // (keeps this file valid when compiled as a module)

  app.use(express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  }));
  app.use(express.urlencoded({ extended: false }));

  // Serverless-friendly session storage using signed cookies.
  // Keep session small (avoid storing large objects) since data is stored in the client cookie.
  // Set SESSION_SECRET in environment for cookie signing. Default to a dev fallback.
  const sessionSecret = process.env.SESSION_SECRET || "dev_session_secret_change_me";
  app.use(
    cookieSession({
      name: "mishka_sess",
      keys: [sessionSecret],
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }),
  );

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        console.log(`${new Date().toLocaleTimeString("en-US")} [express] ${logLine}`);
      }
    });

    next();
  });

  // register application routes (may perform async setup)
  await registerRoutes(app as any);

  // simple error handler to return json errors for serverless responses
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
  });

  return app;
}

export default buildApp;
