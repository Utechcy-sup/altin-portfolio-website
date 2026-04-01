export interface Product {
  id: string;
  title: string;
  category: string;
  karat: string;
  weight: string;
  price: number;
  description: string;
  images: string[];
  badge?: string;
  featured?: boolean;
}

export const CATEGORIES = [
  "22 Ayar Bilezikler",
  "18 Ayar Yüzükler",
  "Has Altın Kolye",
  "Külçe ve Yatırım",
  "Özel Tasarım"
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "İmparatorluk Kelepçesi",
    category: "22 Ayar Bilezikler",
    karat: "22K",
    weight: "35.5g",
    price: 125000,
    description: "Geleneksel Osmanlı motiflerinden ilham alınarak ustalarımız tarafından el işçiliği ile üretilmiş özel seri kelepçe.",
    images: ["/assets/prod_bangle.png"],
    badge: "Yeni Koleksiyon",
    featured: true
  },
  {
    id: "p2",
    title: "Safir Damla Kolye",
    category: "Has Altın Kolye",
    karat: "24K",
    weight: "12.8g",
    price: 68500,
    description: "Has altının eşsiz parlaklığı ile damla kesim tasarımın buluştuğu zarif kolye.",
    images: ["/assets/prod_pendant.png"],
    featured: true
  },
  {
    id: "p3",
    title: "100g Külçe Altın",
    category: "Külçe ve Yatırım",
    karat: "24K",
    weight: "100.0g",
    price: 295000,
    description: "Uluslararası geçerliliğe sahip, sertifikalı 100 gram saf külçe altın.",
    images: ["/assets/gold_bullion.png"],
    badge: "Yatırım",
    featured: true
  },
  {
    id: "p4",
    title: "Sonsuzluk Alyans",
    category: "18 Ayar Yüzükler",
    karat: "18K",
    weight: "8.2g",
    price: 32400,
    description: "Modern ve klasik çizgileri birleştiren, ömür boyu kullanıma uygun alyans.",
    images: ["/assets/prod_ring.png"],
    featured: true
  },
  {
    id: "p5",
    title: "Kapalıçarşı Burma",
    category: "22 Ayar Bilezikler",
    karat: "22K",
    weight: "25.0g",
    price: 88000,
    description: "Klasik burma bilezik, yılların eskitemediği değer.",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"]
  },
  {
    id: "p6",
    title: "Kraliyet Seti",
    category: "Özel Tasarım",
    karat: "22K",
    weight: "85.4g",
    price: 320000,
    description: "Kolye, küpe ve bileklikten oluşan göz alıcı özel tasarım set.",
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&sat=-20"],
    badge: "Özel Tasarım"
  },
  {
    id: "p7",
    title: "50g Külçe Altın",
    category: "Külçe ve Yatırım",
    karat: "24K",
    weight: "50.0g",
    price: 147500,
    description: "Sertifikalı yatırım aracı 50 gram İsviçre menşeili külçe altın.",
    images: ["https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800&q=80"]
  },
  {
    id: "p8",
    title: "Gül Yaprağı Yüzük",
    category: "18 Ayar Yüzükler",
    karat: "18K",
    weight: "5.5g",
    price: 24500,
    description: "İnce detaylara sahip zarif gül yaprağı motifli altın yüzük.",
    images: ["https://images.unsplash.com/photo-1573408301185-9521ecff9ee7?w=800&q=80&sat=10"]
  },
  {
    id: "p9",
    title: "Mega Ajda Bilezik",
    category: "22 Ayar Bilezikler",
    karat: "22K",
    weight: "40.0g",
    price: 140000,
    description: "Gösterişli ve kalın formda Ajda bilezik modeli.",
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&bri=10"]
  },
  {
    id: "p10",
    title: "Zümrüt Yeşili Kolye",
    category: "Has Altın Kolye",
    karat: "22K",
    weight: "18.5g",
    price: 75000,
    description: "Altının sıcaklığı ile zümrüt detaylarının buluştuğu harika kolye.",
    images: ["https://images.unsplash.com/photo-1515562529859-bd15b08e3e43?w=800&q=80&sat=30"]
  },
  {
    id: "p11",
    title: "1 Kg Külçe Altın",
    category: "Külçe ve Yatırım",
    karat: "24K",
    weight: "1000.0g",
    price: 2950000,
    description: "Büyük ölçekli yatırımcılar için LBMA onaylı 1 kilogram külçe altın.",
    images: ["https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800&q=80&bri=-10"],
    badge: "Özel Fiyat"
  },
  {
    id: "p12",
    title: "Lalezar Gerdanlık",
    category: "Özel Tasarım",
    karat: "22K",
    weight: "65.0g",
    price: 245000,
    description: "Osmanlı lale motiflerinden esinlenerek tasarlanan ihtişamlı gerdanlık.",
    images: ["https://images.unsplash.com/photo-1573408301185-9521ecff9ee7?w=800&q=80&bri=10"]
  }
];
