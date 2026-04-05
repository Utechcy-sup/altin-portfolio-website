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
    origin: (origin, callback) => {
      // origin boşsa (örneğin mobil uygulamalar veya aynı sunucudan istek) veya ALLOWED_ORIGIN "*" ise izin ver
      if (!origin || ALLOWED_ORIGIN === "*") {
        callback(null, true);
        return;
      }
      
      const allowedOrigins = ALLOWED_ORIGIN.split(",");
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS: Bu adresten gelen isteğe izin verilmiyor."));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Backend API routes are handled via /api
// Static files are served by Vercel, so no need for static serving here.

export default app;
