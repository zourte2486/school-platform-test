import mysql from 'mysql2/promise';

// Railway connection configuration with performance optimizations
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_platform',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 20, // Increased for better performance
  queueLimit: 0,
  acquireTimeout: 60000, // 60 seconds
  timeout: 60000, // 60 seconds
  reconnect: true,
  // Add SSL configuration for Railway
  ssl: process.env.DB_HOST?.includes('railway') ? { rejectUnauthorized: false } : false,
  // Performance optimizations
  multipleStatements: false,
  dateStrings: true,
  supportBigNumbers: true,
  bigNumberStrings: true,
};

const pool = mysql.createPool(dbConfig);

export default pool;
