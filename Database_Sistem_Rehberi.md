# 🗄️ Veritabanı (Database) Sistem Rehberi ve Yönetimi

Bu doküman, projenizde kullanılan PostgreSQL veritabanı altyapısının, tablo yapılarının ve modern Drizzle ORM kullanımının teknik detaylarını içerir.

---

## 1. Teknik Mimari
Sistemimiz, ölçeklenebilir ve modern bir veritabanı katmanı üzerine kuruludur:
- **Motor (Engine):** PostgreSQL (Neon.tech Bulut Altyapısı)
- **Yönetici (ORM):** Drizzle ORM (TypeScript ile %100 uyumlu, yüksek performanslı)
- **Şema Katmanı:** `lib/db/src/schema/*.ts` dosyaları içinde tanımlıdır.

---

## 2. Mevcut Tablo Yapıları

### **A. `gold_price_history` (Fiyat Arşivi)**
Canlı fiyatları saniye saniye veya saat saat kaydetmek için kullanılır. Gerçek grafikler için veri sağlar.
- `id`: Benzersiz anahtar.
- `symbol`: Ürün sembolü (Altın, Ayar22 vb.).
- `buy_price` | `sell_price`: O anki fiyatlar.
- `timestamp`: Verinin kaydedildiği an.

### **B. `customers` (Müşteri Yönetimi)**
Müşteri kayıtlarını ve notlarını tutmak için kullanılan alandır.
- `id`, `name`, `phone`, `email`, `notes`.
- `created_at`: Kayıt tarihi.

### **C. `products` (Koleksiyon ve Vitrin Kontrolü)**
Sitenin ana sayfasında hangi resmin nerede görüneceğini (Banner, Vitrin, Koleksiyon) kontrol eden akıllı tablodur.
- `display_location`: Görselin konumu (`hero`, `featured`, `banner` gibi).
- `is_active`: Yayında olup olmadığını belirler.
- `sort_order`: Sıralama önceliği.

---

## 3. Yeni Tablo veya Alan Eklemek (Drizzle Push)
Yeni bir tablo eklemek istediğinizde şu 3 basit adımı izleyin:

1.  **Tanım yapın:** `lib/db/src/schema/` altında yeni bir `.ts` dosyası açıp tablonuzu tanımlayın.
2.  **Kaydedin:** Dosyayı kaydettiğinizde sistem otomatiğe hazırdır.
3.  **İtin (Push):** Terminale şunu yazın:
    ```bash
    pnpm --filter @workspace/db run push
    ```
    *Drizzle, veritabanınızı saniyeler içinde yeni tabloya göre günceller.*

---

## 4. Güvenlik ve Canlıya Alım (Production)

### **⚠️ Kritik Güvenlik Uyarısı:**
Veritabanı şifresini içeren `.env` dosyası asla Git reponuza gömülmemelidir. Bu dosya `.gitignore` listesine eklenmiştir.

### **Vercel / Production Kurulumu:**
Sitenizi Vercel'e (veya API sunucunuzu başka bir yere) yüklediğinizde:
1.  Sunucunuzun panelinde **"Environment Variables"** bölümünü bulun.
2.  `DATABASE_URL` isminde yeni bir değişken oluşturun.
3.  Değer olarak Neon.tech'ten aldığınız `postgresql://...sslmode=require` linkini yapıştırın.
*Böylece şifreniz hiçbir zaman kodun içinde görünmez ve %100 güvenli kalır.*

---
*Saygın Gold - Veritabanı Yönetim Sistemi v1.1*
