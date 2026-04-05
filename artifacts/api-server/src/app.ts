import path from "node:path";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

app.use(
  cors({
    origin: ALLOWED_ORIGIN === "*" ? "*" : ALLOWED_ORIGIN.split(","),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Production Static Serving
if (process.env.NODE_ENV === "production") {
  const publicPath = path.resolve(
    import.meta.dirname,
    "../../gold-portfolio/dist/public"
  );
  app.use(express.static(publicPath));

  app.get("/*", (req, res) => {
    if (req.path.startsWith("/api")) return;
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

export default app;
