import mysql from 'mysql2/promise';

// Railway connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_platform',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  // Add SSL configuration for Railway
  ssl: process.env.DB_HOST?.includes('railway') ? { rejectUnauthorized: false } : undefined,
};

const pool = mysql.createPool(dbConfig);

export default pool;
