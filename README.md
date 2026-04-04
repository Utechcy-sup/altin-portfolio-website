# Altın Portföy (workspace)

pnpm tabanlı monorepo: React + Vite ön yüzü (`gold-portfolio`), Express API (`api-server`) ve paylaşılan `lib/*` paketleri.

## Özellikler

- **Canlı Altın/Döviz Takibi:** HaremAltin Socket.io entegrasyonu ile anlık fiyatlar.
- **Akıllı Fallback:** Socket bağlantısı koptuğunda BigPara API üzerinden otomatik yedekleme.
- **Hesaplayıcı:** Farklı ayarlarda altın gram/fiyat hesaplama aracı.
- **Responsive Tasarım:** Tüm cihazlarla tam uyumlu, premium grafikler ve animasyonlar.

## Gereksinimler

- [Node.js](https://nodejs.org/) (LTS önerilir)
- [pnpm](https://pnpm.io/) (npm ile: `npm install -g pnpm`)

## Kurulum ve Çalıştırma

Depo kökünde:

```bash
pnpm install
```

**Geliştirme (Local Dev):**
Ön yüz (Vite) ve sunucuyu aynı anda çalıştırmak için iki terminal kullanabilirsiniz:
1. Terminal: `pnpm --filter @workspace/api-server run dev` (API)
2. Terminal: `pnpm --filter @workspace/gold-portfolio run dev` (Frontend)

## Railway Deployment (Monolitik)

Bu proje Railway üzerinde tek bir servis olarak (Backend + Static Frontend) çalışacak şekilde yapılandırılmıştır.

1. Projeyi Railway'de Github üzerinden yeni proje olarak ekleyin.
2. Railway otomatik olarak `pnpm` kuracak ve projeyi derleyecektir.
3. Ayarlardaki (Variables) kısma şu değişkenleri ekleyin:
   - `DATABASE_URL` = neon.tech veya başka bir PostgreSQL bağlantınız
4. Uygulama başlatıldığında Node Express sunucusu hem `/api` isteklerini karşılayacak hem de React arayüzünü sunacaktır.

*Not: Veritabanı tablolarının oluşturulması için (ilklendirme) Railway üzerinden command paletten `npm run push` komutunu çalıştırabilirsiniz.*

## Kök script’ler

| Komut            | Açıklama                                                |
|------------------|---------------------------------------------------------|
| `pnpm run build` | Frontend Vite ve Backend API'sini yayına hazır derler.  |
| `pnpm run start` | Backend Express uygulamasını başlatır (Railway için dizayn edilmiştir). |
| `pnpm run push`  | Veritabanı semasını Drizzle ile DB'ye pushlar.          |

## Dizin özeti

| Yol                    | İçerik                                      |
|------------------------|---------------------------------------------|
| `artifacts/gold-portfolio` | React, Vite, Tailwind, Wouter               |
| `artifacts/api-server`   | Express Node Server                         |
| `lib/db`               | Veritabanı ve Drizzle Schema dosyaları      |
| `scripts`              | Yardımcı betikler                           |

## Güvenlik: paket yaşı

`pnpm-workspace.yaml` içinde `minimumReleaseAge` (varsayılan 1440 dakika) tanımlıdır; çok yeni yayınlanmış paketler kurulumda reddedilebilir. İstisnalar dosyada `minimumReleaseAgeExclude` altında listelenir.

---

Sorun veya iyileştirme öneriniz için depo üzerinden issue/PR kullanabilirsiniz.
