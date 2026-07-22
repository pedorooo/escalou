const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function seed() {
  const connectionString =
    process.env.DATABASE_URL ||
    'postgresql://copa_user:copa_pass@localhost:5432/adivinhe_copa';

  console.log('Connecting to database:', connectionString);

  const pool = new Pool({ connectionString });

  try {
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const seedPath = path.join(__dirname, '../db/seeds/2026_seed.sql');

    console.log('Resetting database schema (dropping old tables)...');
    await pool.query(`
      DROP TABLE IF EXISTS game_session_progress CASCADE;
      DROP TABLE IF EXISTS game_sessions CASCADE;
      DROP TABLE IF EXISTS accounts CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS player_aliases CASCADE;
      DROP TABLE IF EXISTS players CASCADE;
      DROP TABLE IF EXISTS teams CASCADE;
      DROP TABLE IF EXISTS editions CASCADE;
      DROP TABLE IF EXISTS tournaments CASCADE;
    `);

    if (fs.existsSync(schemaPath)) {
      console.log('Executing db/schema.sql...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(schemaSql);
    }

    if (fs.existsSync(seedPath)) {
      console.log('Executing db/seeds/2026_seed.sql...');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      await pool.query(seedSql);
    }

    console.log('Database reset & seed executed successfully!');
  } catch (err) {
    console.error('Seed runner error:', err.message);
  } finally {
    await pool.end();
  }
}

seed();
