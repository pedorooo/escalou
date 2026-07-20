import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://copa_user:copa_pass@localhost:5432/adivinhe_copa',
  connectionTimeoutMillis: 3000,
});

pool.on('error', (err) => {
  console.warn('Unexpected error on idle PostgreSQL client:', err.message);
});
