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
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
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
    images: ["https://images.unsplash.com/photo-1599643478524-fb66f70d00ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
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
    images: ["https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
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
    images: ["https://images.unsplash.com/photo-1605100804763-247f6612148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "p5",
    title: "Kapalıçarşı Burma",
    category: "22 Ayar Bilezikler",
    karat: "22K",
    weight: "25.0g",
    price: 88000,
    description: "Klasik burma bilezik, yılların eskitemediği değer.",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "p6",
    title: "Kraliyet Seti",
    category: "Özel Tasarım",
    karat: "22K",
    weight: "85.4g",
    price: 320000,
    description: "Kolye, küpe ve bileklikten oluşan göz alıcı özel tasarım set.",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
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
    images: ["https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "p8",
    title: "Gül Yaprağı Yüzük",
    category: "18 Ayar Yüzükler",
    karat: "18K",
    weight: "5.5g",
    price: 24500,
    description: "İnce detaylara sahip zarif gül yaprağı motifli altın yüzük.",
    images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "p9",
    title: "Mega Ajda Bilezik",
    category: "22 Ayar Bilezikler",
    karat: "22K",
    weight: "40.0g",
    price: 140000,
    description: "Gösterişli ve kalın formda Ajda bilezik modeli.",
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "p10",
    title: "Zümrüt Yeşili Kolye",
    category: "Has Altın Kolye",
    karat: "22K",
    weight: "18.5g",
    price: 75000,
    description: "Altının sıcaklığı ile zümrüt detaylarının buluştuğu harika kolye.",
    images: ["https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "p11",
    title: "1 Kg Külçe Altın",
    category: "Külçe ve Yatırım",
    karat: "24K",
    weight: "1000.0g",
    price: 2950000,
    description: "Büyük ölçekli yatırımcılar için LBMA onaylı 1 kilogram külçe altın.",
    images: ["https://images.unsplash.com/photo-1587324438673-56c808f975bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
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
    images: ["https://images.unsplash.com/photo-1509941943102-10c232535736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
  }
];
