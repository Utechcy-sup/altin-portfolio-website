import { db, usersTable } from "./index";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  const adminUsername = "admin";
  const adminPassword = "admin123";

  try {
    const existing = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, adminUsername),
    });

    if (existing) {
      console.log("⚠️ Admin user already exists. Skipping.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await db.insert(usersTable).values({
      username: adminUsername,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
    console.log("👤 Username: " + adminUsername);
    console.log("🔑 Password: " + adminPassword);
    console.log("⚠️ Please change the password after first login.");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
