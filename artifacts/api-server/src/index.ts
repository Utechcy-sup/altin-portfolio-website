import "dotenv/config";
import app from "./app";
import { logger } from "./lib/logger";
import { startGoldWorker } from "./lib/gold-worker";

// Railway, Cloud Run vb. yapıların varsayılan beklediği port genellikle 8080'dir.
const rawPort = process.env.PORT || "8080";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// 🥇 Altın Fiyat Arşivleme Sistemini (30 Dakikalık) Başlatıyoruz
startGoldWorker();

app.listen(port, "0.0.0.0", () => {
  logger.info({ port }, "Server listening on 0.0.0.0");
});
