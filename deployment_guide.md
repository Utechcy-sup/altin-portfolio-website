# Saygın Gold — Vercel & Railway Dağıtım Kılavuzu

Bu kılavuz, uygulamanızı **Vercel** (Frontend) ve **Railway** (Backend) üzerine ayrı ayrı kurmanız için gereken tüm adımları içerir.

---

## 1. Arka Plan (Backend) — Railway Dağıtımı

Railway, sunucu tarafı kodunuzun çalışacağı ve altın fiyatlarını arşivleyeceği merkezdir.

### Adımlar:
1.  **Railway Hesabı:** [railway.app](https://railway.app) adresine gidin ve GitHub hesabınıza bağlayın.
2.  **Yeni Proje:** `New Project` -> `Deploy from GitHub repo` seçeneğini kullanın.
3.  **Klasör Ayarı (Root):** Monorepo yapısı nedeniyle Railway'e **Root Directory** olarak `/artifacts/api-server` dizinini gösterin.
    *   *Alternatif:* Root'u `/` bırakıp **Start Command**'ı `pnpm --filter @workspace/api-server run dev` veya build sonrası `pnpm install && pnpm --filter @workspace/api-server run build && pnpm --filter @workspace/api-server run start` yapabilirsiniz.
4.  **Değişkenler (Variables Tab):**
    *   `PORT`: Railway bunu otomatik atar (genelde varsayılan yeterlidir).
    *   `FIREBASE_SERVICE_ACCOUNT`: Elinizdeki `.json` dosyasının **içeriğini tamamen seçip** (tüm süslü parantezler dahil) buraya yapıştırın.
    *   `ALLOWED_ORIGIN`: Eğer Vercel adresinizi biliyorsanız onu yazın (örn: `https://saygin-gold.vercel.app`). Şimdilik `*` yaparak tüm isteklere izin verebilirsiniz.

---

## 2. Ön Yüz (Frontend) — Vercel Dağıtımı

Vercel, kullanıcılarınızın web sitenize gireceği hızlı statik barındırma servisidir.

### Adımlar:
1.  **Vercel Hesabı:** [vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
2.  **Proje İçe Aktar:** `Add New` -> `Project` seçip GitHub deponuzu seçin.
3.  **Framework Preset:** Vercel **Vite** projesini otomatik tanıyacaktır.
4.  **Root Directory:** `artifacts/gold-portfolio` dizinini seçin. **ÇOK ÖNEMLİ.**
5.  **Build Settings:**
    *   **Build Command:** `pnpm install && pnpm run build`
    *   **Output Directory:** `dist/public` (Vite konfigürasyonunuzda bu şekilde ayarlıdır).
    *   **Install Command:** `pnpm install`
6.  **Ortam Değişkenleri (Environment Variables):**
    *   `VITE_API_URL`: Railway tarafından size verilen URL'yi buraya yapıştırın. (örn: `https://api-server-production.up.railway.app`) **Sonunda `/` olmasın.**

---

## 3. Yayına Alım Sonrası Kontroller

*   **Veri Akışı:** Sitenize girdiğinizde fiyatların "Loading" kalmaması gerekir. Eğer kalıyorsa, Vercel console üzerinden `VITE_API_URL` adresinin doğruluğunu kontrol edin.
*   **Admin Girişi:** `/admin` sayfasına gidip giriş yapmayı deneyin. İstek Railway'e başarıyla gidiyorsa kurulum tamamdır.
*   **Loglar:** Railway üzerindeki `Deployments` -> `View Logs` kısmından altın fiyat arşivleyicinin (`Gold Worker`) çalışmaya başladığını teyit edin.

> [!TIP]
> **Domain (Opsiyonel):** Her iki servis için de `saygingold.com` gibi kendi domain adresinizi bağlayabilirsiniz.
