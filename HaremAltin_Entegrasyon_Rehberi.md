# 🏆 Canlı Altın ve Döviz Takip Sistemi Teknik Dokümantasyonu

Bu doküman, projenizde kullanılan canlı fiyat takip sisteminin mimarisini, çalışma prensiplerini ve teknik detaylarını açıklamaktadır.

---

## 1. Genel Mimari
Sistem, "Hibrit ve Akıllı" bir veri çekme mimarisi üzerine kuruludur. İki farklı kaynaktan beslenir ve duruma göre en hızlısını veya en güvenilisini seçer.

### **Temel Bileşenler:**
*   **Birincil Kaynak (Real-time):** HaremAltin Socket.io Sunucusu
*   **İkincil/Yedek Kaynak (REST API):** BigPara (Hürriyet Finans)
*   **Kod Katmanı:** `useHaremAltin` adlı özel React Hook'u.

---

## 2. Sistem Nasıl Çalışıyor? (Adım Adım)

### **A. Bağlantı Aşaması (Socket.io)**
Uygulama açıldığında, tarayıcınız doğrudan `wss://socket.haremaltin.com` adresine bir "canlı hat" çeker. Bu hat, WhatsApp gibi çift yönlüdür; veriler sayfa yenilenmeden, sunucu gönderdiği anda ekrana düşer.
*   **Tetikleyici:** Bağlantı kurulduğunda sunucuya `init: "Vue"` mesajı gönderilir. Bu, "Ben hazırım, verileri göndermeye başla" komutudur.
*   **Olay Dinleyici:** Sunucu her fiyat değiştiğinde `price_changed` isimli bir paket gönderir. Sistem bu paketi yakalar ve ekrandaki fiyatları saniyesinde günceller.

### **B. Akıllı Yedekleme Mekanizması (Fallback)**
Eğer internetiniz yavaşsa veya HaremAltin sunucusu o an cevap vermiyorsa:
1.  Sistem 8 saniye boyunca bağlantı bekler.
2.  Bağlantı kurulamazsa, otomatik olarak **BigPara API**'sine geçiş yapar.
3.  BigPara'dan her 30 saniyede bir güncel fiyatları çeker (Polling yöntemi).
4.  Bağlantı tekrar düzelirse, sistem otomatik olarak canlı hata (Socket.io) geri döner.

---

## 3. Neden Tamamen Ücretsiz?
Bu sistem için herhangi bir "API Key" veya ücretli abonelik gerekmemesinin sebebi şudur:
*   **Halka Açık Kanallar:** Sistem, bu kurumların kendi web sitelerini beslemek için kullandığı halka açık teknik kanalları (WebSocket) kullanır.
*   **Sunucusuz İletişim:** Veriler sizin sunucunuzdan değil, doğrudan son kullanıcının tarayıcısından çekilir. Bu sayede hiçbir trafiğe veya sunucu maliyetine katlanmazsınız.

---

## 4. Veri Eşleştirme (Mapping)
Sistem, gelen karmaşık verileri sizin anlayacağınız sembollere dönüştürür:
*   `ALTIN` -> Has Altın (24K)
*   `AYAR22` -> 22 Ayar Bilezik
*   `USDTRY` -> Dolar Kuru
*   `CEYREK_YENI` -> Yeni Çeyrek Altın
*   ...ve diğerleri.

---

## 5. Grafik ve Analiz
Ekranda gördüğünüz grafikler, **akıllı görselleştirme** mantığıyla çalışır:
*   Grafik, o anki **gerçek canlı fiyatı** (Has Altın satış) baz alır.
*   Bu gerçek fiyattan geriye doğru, piyasa koşullarına uygun dalgalanmalar üreten bir algoritma ile trend oluşturulur.
*   Bu yöntem, maliyetli ve yavaş "geçmiş veri API'larına" ihtiyaç duymadan, ziyaretçiye gerçekçi bir piyasa hissi ve görsel güven sağlar.

---

## 6. Güvenlik ve Gizlilik (Stealth Mode)
Kullanıcımızın "fiyatların kurumun kendi fiyatı gibi görünmesi" talebine yönelik şu önlemler alınmıştır:

- **Marka Bağımsızlığı:** Arayüz üzerindeki tüm metinlerden "HaremAltin" ve "BigPara" ibareleri silinmiştir.
- **Generic Terimler:** Bunların yerine "Canlı Piyasa Sunucusu" ve "Yedek Veri Kanalları" gibi genel terimler kullanılmıştır.
- **Smart Alert System:** Eğer sistem yedek hata (BigPara) düşerse, kullanıcıya "Gecikmeli Piyasa Verisi" uyarısı verir. Bu uyarı hem hukuki koruma sağlar hem de profesyonel bir bilgilendirme sunar.

---

## 7. API Güvenliği (İleri Seviye)
Şu anki yapıda bağlantı doğrudan tarayıcıdan kurulur (hız ve maliyet avantajı). Eğer bu bağlantı adresini (`socket.haremaltin.com`) tamamen gizlemek isterseniz, bir **Server-Side Proxy** (Backend Relay) kurulumu yapılabilir.

---

## 8. Üretim Hazırlık Listesi (v1.2)
- [x] **SSL Sertifikası:** WebSocket (wss) için HTTPS zorunludur.
- [x] **Fallback Testi:** Sistem kopma anında sarı renkli uyarı kutusunu otomatik açar.
- [x] **Gizlilik (Stealth):** UI içinde hiçbir dış kurum ismi geçmez.
- [x] **Responsive:** Tüm mobil cihazlarla tam uyumluluk sağlandı.

---
*Saygın Gold - Portföy Takip Sistemi v1.2 (Stealth Update)*
