import { io, Socket } from "socket.io-client";
import { db, goldPriceHistoryTable } from "@workspace/db";
import { logger } from "./logger";

const SOCKET_URL = "wss://socket.haremaltin.com";
const SAVE_INTERVAL_MS = 30 * 60 * 1000; // 30 Dakika
const SYMBOLS_TO_SAVE = ["ALTIN", "AYAR22", "USDTRY", "EURTRY", "ONS", "CEYREK_YENI"];

interface HaremAltinPrices {
  [key: string]: {
    alis: string;
    satis: string;
    [key: string]: any;
  };
}

let latestPrices: Record<string, { alis: number; satis: number }> = {};
let socket: Socket | null = null;

/**
 * HaremAltin Socket.io Canlı Fiyat Dinleyicisi
 */
export function startGoldWorker() {
  logger.info("Initializing Gold Price Worker (30min snapshot mode)...");

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    reconnectionAttempts: 20,
    reconnectionDelay: 5000,
  });

  socket.on("connect", () => {
    logger.info("Gold Worker connected to HaremAltin Socket.");
    socket?.emit("init", "Vue");
  });

  socket.on("price_changed", (data: any) => {
    if (!data) return;
    
    // Basit bir şekilde gelen veriyi ayrıştırıp saklayalım
    Object.entries(data).forEach(([key, val]: [string, any]) => {
      if (typeof val === 'object' && val.alis && val.satis) {
        latestPrices[key] = {
            alis: parseFloat(String(val.alis).replace(',', '.')),
            satis: parseFloat(String(val.satis).replace(',', '.'))
        };
      }
    });
  });

  socket.on("disconnect", () => {
    logger.warn("Gold Worker disconnected from HaremAltin socket.");
  });

  // ── Arşivleme Döngüsü ─────
  setInterval(async () => {
    await saveSnapshots();
  }, SAVE_INTERVAL_MS);

  // Başlangıçta bir defa çekip kaydedelim (boş kalmasın)
  setTimeout(() => saveSnapshots(), 10000);
}

/**
 * O anki fiyatların fotoğrafını (snapshot) çekip veritabanına kaydeder
 */
async function saveSnapshots() {
  const symbols = Object.keys(latestPrices).filter(s => SYMBOLS_TO_SAVE.includes(s));
  
  if (symbols.length === 0) {
    logger.warn("Gold Worker: No data received yet to save snapshots.");
    return;
  }

  logger.info({ count: symbols.length }, "Saving 30-min price snapshots into database...");

  try {
    for (const symbol of symbols) {
      const price = latestPrices[symbol];
      if (price.alis > 0 && price.satis > 0) {
        await db.insert(goldPriceHistoryTable).values({
          symbol,
          buyPrice: price.alis.toString(),
          sellPrice: price.satis.toString(),
          timestamp: new Date()
        });
      }
    }
    logger.info("Successfully archived gold price snapshots.");
  } catch (err) {
    logger.error({ err }, "Error while saving price snapshots to DB.");
  }
}
