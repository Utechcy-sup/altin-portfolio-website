import { db } from "./index";

async function check() {
  console.log("🔍 Checking database...");
  try {
    const users = await db.query.usersTable.findMany();
    console.log(`📊 Found ${users.length} users.`);
    users.forEach(u => console.log(`- ${u.username} (${u.role})`));
  } catch (error) {
    console.error("❌ Check failed:", error);
  } finally {
    process.exit(0);
  }
}

check();
