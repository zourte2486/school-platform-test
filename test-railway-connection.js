// Test Railway database connection
const mysql = require("mysql2/promise");

async function testRailwayConnection() {
  try {
    console.log("🔌 Testing Railway database connection...");

    const connection = await mysql.createConnection({
      host: "yamanote.proxy.rlwy.net",
      user: "root",
      password: "yOCYPZmltALovIZJVowIRGzoNvCFmovp",
      database: "railway",
      port: 39062,
      ssl: { rejectUnauthorized: false },
    });

    console.log("✅ Database connected successfully!");

    // Test if schools table exists
    const [tables] = await connection.execute("SHOW TABLES LIKE 'schools'");
    if (tables.length === 0) {
      console.log("❌ Schools table does not exist!");
      console.log("🔧 Creating schools table...");

      await connection.execute(`
        CREATE TABLE schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name TEXT NOT NULL,
          adress TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          contact BIGINT NOT NULL,
          image TEXT NOT NULL,
          email_id TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log("✅ Schools table created!");
    } else {
      console.log("✅ Schools table exists!");
    }

    // Test query
    const [rows] = await connection.execute(
      "SELECT COUNT(*) as count FROM schools"
    );
    console.log(`📊 Found ${rows[0].count} schools in database`);

    await connection.end();
    console.log("🔌 Connection closed");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check if Railway database is running");
    console.log("2. Verify connection credentials");
    console.log("3. Check if database exists");
  }
}

testRailwayConnection();
