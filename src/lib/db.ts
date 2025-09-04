import mysql, { PoolOptions } from 'mysql2/promise';

// Railway connection configuration with performance optimizations
const dbConfig: PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_platform',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 20, // Increased for better performance
  queueLimit: 0,
  connectTimeout: 60000, // ✅ correct property
  // Performance optimizations
  multipleStatements: false,
  dateStrings: true,
  supportBigNumbers: true,
  bigNumberStrings: true,
};

// ✅ Only add SSL if Railway is detected
if (process.env.DB_HOST?.includes('railway')) {
  dbConfig.ssl = { rejectUnauthorized: false };
}

const pool = mysql.createPool(dbConfig);

export default pool;
