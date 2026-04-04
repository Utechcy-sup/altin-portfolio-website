import { Router } from "express";
import bcrypt from "bcryptjs";
import { firestore, auth } from "../lib/firebase";

const router = Router();

// ── Giriş (Auth) ────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userSnapshot = await firestore.collection("users")
      .where("username", "==", username)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      res.status(401).json({ message: "Kullanıcı bulunamadı." });
      return;
    }

    const userData = userSnapshot.docs[0].data();
    const isValid = await bcrypt.compare(password, userData.password);
    
    if (!isValid) {
      res.status(401).json({ message: "Geçersiz şifre." });
      return;
    }


    // Firebase Custom Token oluşturarak frontend'e dönebiliriz (Opsiyonel)
    const customToken = await auth.createCustomToken(userSnapshot.docs[0].id);

    res.json({ 
      success: true, 
      token: customToken,
      user: { id: userSnapshot.docs[0].id, username: userData.username } 
    });
  } catch (err) {
    res.status(500).json({ error: "Giriş hatası." });
  }
});

// ── Koleksiyon (Ürünler) Yönetimi ───────────────────────────────────────
router.get("/products", async (req, res) => {
  try {
    const snapshot = await firestore.collection("products")
      .orderBy("createdAt", "desc")
      .get();
    
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ürünler listelenemedi." });
  }
});

router.post("/products", async (req, res) => {
  try {
    const newProduct = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const docRef = await firestore.collection("products").add(newProduct);
    res.json({ id: docRef.id, ...newProduct });
  } catch (err) {
    res.status(500).json({ error: "Ürün eklenemedi." });
  }
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    await firestore.collection("products").doc(id).update(updateData);
    res.json({ id, ...updateData });
  } catch(err) {
    res.status(500).json({ error: "Güncelleme hatası." });
  }
});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await firestore.collection("products").doc(id).delete();
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: "Silme hatası." });
  }
});

// ── Diğer Bilgi Ekranları ───────────────────────────────────────────────
router.get("/customers", async (req, res) => {
  try {
    const snapshot = await firestore.collection("customers")
      .orderBy("createdAt", "desc")
      .get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Müşteriler listelenemedi." });
  }
});

router.get("/price-history", async (req, res) => {
  try {
    const snapshot = await firestore.collection("gold_price_history")
      .orderBy("timestamp", "desc")
      .limit(100)
      .get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fiyat geçmişi alınamadı." });
  }
});

export default router;
