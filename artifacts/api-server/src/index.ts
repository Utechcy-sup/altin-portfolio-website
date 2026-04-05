import "dotenv/config";
import app from "./app";
import { logger } from "./lib/logger";
import { startGoldWorker } from "./lib/gold-worker";

// Railway PORT değişkenini bazen gecikmeli veya boş gönderebilir. Çökmemesi için varsayılan 5001.
const rawPort = process.env["PORT"] || "5001";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// 🥇 Altın Fiyat Arşivleme Sistemini (30 Dakikalık) Başlatıyoruz
startGoldWorker();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
