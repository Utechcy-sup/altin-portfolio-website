import path from "node:path";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// 🛡️ Güvenli CORS Ayarı (Sadece Sizin Sitenize İzin Verir)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // İzin verilen adresler (Railway'den ALLOWED_ORIGIN olarak da virgülle ayırıp eklenebilir)
  const envAllowed = process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(",") : [];
  const allowedOrigins = [
    "https://altin-portfolio-website-gold-portfo.vercel.app", // Sizin Vercel siteniz
    "http://localhost:5173", // Lokal geliştirme
    ...envAllowed
  ];

  // Eğer gelen istek bizim izin verdiğimiz listedeyse, izin ver; değilse engelle
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Mobil uygulama, Postman veya sunucu içi haberleşme (origin başlığı olmaz)
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  // Preflight (Ön yükleme) isteğini yanıtla
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Railway API OK");
});

app.use("/api", router);

// Backend API routes are handled via /api
// Static files are served by Vercel, so no need for static serving here.

export default app;
