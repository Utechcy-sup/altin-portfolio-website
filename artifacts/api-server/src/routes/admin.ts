import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable, productsTable, customersTable, goldPriceHistoryTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

// ── Giriş (Auth) ────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, username),
    });

    if (!user) return res.status(401).json({ message: "Kullanıcı bulunamadı." });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Geçersiz şifre." });

    // BASİT AUTH (Prod'da JWT veya Session önerilir)
    res.json({ success: true, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: "Giriş hatası." });
  }
});

// ── Koleksiyon (Ürünler) Yönetimi ───────────────────────────────────────
router.get("/products", async (req, res) => {
  const data = await db.query.productsTable.findMany({
    orderBy: [desc(productsTable.createdAt)]
  });
  res.json(data);
});

router.post("/products", async (req, res) => {
  try {
    const [newProduct] = await db.insert(productsTable).values(req.body).returning();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Ürün eklenemedi." });
  }
});

router.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [updatedProduct] = await db.update(productsTable)
            .set(req.body)
            .where(eq(productsTable.id, parseInt(id)))
            .returning();
        res.json(updatedProduct);
    } catch(err) {
        res.status(500).json({ error: "Güncelleme hatası." });
    }
});

router.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.delete(productsTable).where(eq(productsTable.id, parseInt(id)));
        res.json({ success: true });
    } catch(err) {
        res.status(500).json({ error: "Silme hatası." });
    }
});

// ── Diğer Bilgi Ekranları ───────────────────────────────────────────────
router.get("/customers", async (req, res) => {
  const data = await db.query.customersTable.findMany({ orderBy: [desc(customersTable.createdAt)] });
  res.json(data);
});

router.get("/price-history", async (req, res) => {
  const data = await db.query.goldPriceHistoryTable.findMany({ 
    limit: 100, 
    orderBy: [desc(goldPriceHistoryTable.timestamp)] 
  });
  res.json(data);
});

export default router;
