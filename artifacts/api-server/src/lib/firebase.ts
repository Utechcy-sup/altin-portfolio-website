import admin from "firebase-admin";
import { logger } from "./logger";

// Kullanıcının sağladığı yerel dosya yolu veya Vercel'deki ortam değişkeni
const DEV_SERVICE_ACCOUNT_PATH = "/Users/uggrcn/Downloads/saygin-gold-website-firebase-adminsdk-fbsvc-2f74396174.json";
const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!admin.apps.length) {
  try {
    let credential;

    if (serviceAccountVar) {
      // JSON formatında ise parse et, değilse dosya yolu olarak kabul et
      try {
        credential = admin.credential.cert(JSON.parse(serviceAccountVar));
      } catch (e) {
        credential = admin.credential.cert(serviceAccountVar);
      }
      logger.info("Firebase Admin initialized with FIREBASE_SERVICE_ACCOUNT env var.");
    } else {
      // Çevre değişkeni yoksa yerel geliştirme path'ine bak
      credential = admin.credential.cert(DEV_SERVICE_ACCOUNT_PATH);
      logger.info(`Firebase Admin initialized with local JSON: ${DEV_SERVICE_ACCOUNT_PATH}`);
    }

    admin.initializeApp({
      credential,
    });
  } catch (error) {
    logger.error({ error }, "Failed to initialize Firebase Admin. Please check your Service Account JSON.");
  }
}

export const firestore = admin.firestore();
export const auth = admin.auth();
export default admin;
