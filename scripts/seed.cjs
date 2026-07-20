const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function seed() {
  const connectionString =
    process.env.DATABASE_URL ||
    'postgresql://escalou_user:escalou_pass@localhost:5432/escalou_db';

  console.log('Connecting to database:', connectionString);

  const pool = new Pool({ connectionString });

  try {
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const seedPath = path.join(__dirname, '../db/seeds/2026_seed.sql');

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

    console.log('Database seed executed successfully!');
  } catch (err) {
    console.log('Seed runner output:', err.message);
  } finally {
    await pool.end();
  }
}

seed();
