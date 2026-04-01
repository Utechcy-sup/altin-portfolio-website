# Altın Portföy (workspace)

pnpm tabanlı monorepo: React + Vite ön yüzü (`gold-portfolio`), Express API (`api-server`) ve paylaşılan `lib/*` paketleri.

## Gereksinimler

- [Node.js](https://nodejs.org/) (LTS önerilir)
- [pnpm](https://pnpm.io/) (npm ile: `npm install -g pnpm`)

## Kurulum

Depo kökünde:

```bash
pnpm install
```

**Windows:** Kök `package.json` içindeki `preinstall` betiği `sh` kullanır; sistemde `sh` yoksa kurulum şu şekilde yapılabilir:

```bash
pnpm install --ignore-scripts
```

macOS/Linux’ta Git veya uyumlu bir shell ile normal `pnpm install` genelde sorunsuz çalışır.

## Geliştirme ortamı

Ön yüz ve API ayrı süreçlerde çalışır. İki terminal kullanın.

### 1. API (`@workspace/api-server`)

`artifacts/api-server/.env` örnek değerler:

| Değişken       | Açıklama                          |
|----------------|-----------------------------------|
| `PORT`         | API portu (örn. `5000`)           |
| `DATABASE_URL` | PostgreSQL bağlantı URL’si        |
| `NODE_ENV`     | Örn. `development`                |

Kod değiştiyse önce derleyin, sonra başlatın:

**cmd.exe:**

```bat
cd artifacts\api-server
pnpm run build
set PORT=5000
set NODE_ENV=development
node --enable-source-maps .\dist\index.mjs
```

**PowerShell:**

```powershell
$env:PORT="5000"; $env:NODE_ENV="development"
Set-Location artifacts/api-server
pnpm run build   # gerekirse
node --enable-source-maps ./dist/index.mjs
```

> Not: Çalışan uygulama `process.env.PORT` okur; `.env` dosyası otomatik yüklenmez—portu ortam değişkeni veya süreç yöneticinizle verin.

Paketteki `pnpm run dev` betiği Unix `export` kullanır; Windows’ta yukarıdaki `build` + `node` akışını kullanın.

### 2. Ön yüz (`@workspace/gold-portfolio`)

`artifacts/gold-portfolio/.env` içeriği referans için:

- `PORT=3000` — Vite geliştirme sunucusu
- `BASE_PATH=/` — yayın tabanı
- `VITE_API_URL=http://localhost:5000` — API adresi

`vite.config.ts`, yapılandırma yüklenirken **yalnızca ortam değişkenlerini** okur; `.env` otomatik bağlanmaz. Geliştirme için `PORT` ve `BASE_PATH`’i shell’de verin:

**PowerShell (depo kökünden):**

```powershell
$env:PORT="3000"; $env:BASE_PATH="/"
pnpm --filter @workspace/gold-portfolio run dev
```

**bash:**

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/gold-portfolio run dev
```

- Yerel: `http://localhost:3000/`
- API: `http://localhost:5000/` (ön yüz `VITE_API_URL` ile hizalanır)

## Kök script’ler

| Komut            | Açıklama                                                |
|------------------|---------------------------------------------------------|
| `pnpm run build` | Tip kontrolü + workspace içinde tanımlı `build` script’leri |
| `pnpm run typecheck` | TypeScript kontrolü (lib’ler + artifacts/scripts) |

## Dizin özeti

| Yol                    | İçerik                                      |
|------------------------|---------------------------------------------|
| `artifacts/gold-portfolio` | React, Vite, Tailwind, Wouter               |
| `artifacts/api-server`   | Express 5, Drizzle ile uyumlu `lib/db`      |
| `lib/*`                | `db`, `api-zod`, `api-spec`, `api-client-react` vb. |
| `scripts`              | Yardımcı script’ler                         |

## Güvenlik: paket yaşı

`pnpm-workspace.yaml` içinde `minimumReleaseAge` (varsayılan 1440 dakika) tanımlıdır; çok yeni yayınlanmış paketler kurulumda reddedilebilir. İstisnalar dosyada `minimumReleaseAgeExclude` altında listelenir.

---

Sorun veya iyileştirme öneriniz için depo üzerinden issue/PR kullanabilirsiniz.
