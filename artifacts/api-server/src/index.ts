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

// Railway üzerinde Port eşleşmezliği (502 Bad Gateway) yaşanmaması için "Tüm Olası Portlara Ağ Atma" tekniği:
const targetPorts = new Set([port, 8080, 5001, 3000, 80]);

targetPorts.forEach((p) => {
  app.listen(p, "0.0.0.0", () => {
    logger.info({ port: p }, `Server successfully listening on 0.0.0.0:${p}`);
  }).on("error", () => {
    // Port zaten doluysa veya yetki yoksa görmezden gel, diğerleri dinlemeye devam etsin
  });
});
