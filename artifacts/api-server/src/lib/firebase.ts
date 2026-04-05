import admin from "firebase-admin";
import { logger } from "./logger";

// Kullanıcının sağladığı yerel dosya yolu veya Vercel'deki ortam değişkeni
const DEV_SERVICE_ACCOUNT_PATH = "/Users/uggrcn/Downloads/saygin-gold-website-firebase-adminsdk-fbsvc-2f74396174.json";
const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!admin.apps.length) {
  try {
    let credential;

    if (serviceAccountVar) {
      logger.info("Railway: FIREBASE_SERVICE_ACCOUNT ortam değişkeni algılandı.");
      try {
        // Full JSON string ise parse et
        const jsonContent = JSON.parse(serviceAccountVar);
        credential = admin.credential.cert(jsonContent);
      } catch (e) {
        // String olarak dosya yolu girildiyse
        credential = admin.credential.cert(serviceAccountVar);
      }
    } else {
      // Yerel geliştirme ortamı kontrolü
      logger.warn("UYARI: FIREBASE_SERVICE_ACCOUNT bulunamadı. Yerel geliştirme dosyasına bakılıyor...");
      credential = admin.credential.cert(DEV_SERVICE_ACCOUNT_PATH);
    }

    admin.initializeApp({
      credential,
    });
    logger.info("✅ Firebase Admin başarıyla başlatıldı.");
  } catch (error: any) {
    logger.error({ 
      message: error?.message, 
      code: error?.code 
    }, "❌ Firebase Başlatılamadı! Lütfen Railway panelinde FIREBASE_SERVICE_ACCOUNT değişkenini kontrol edin.");
    
    // Veritabanı olmadan uygulama çalışamaz, bu yüzden süreci durduruyoruz
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
}

export const firestore = admin.firestore();
export const auth = admin.auth();
export default admin;
