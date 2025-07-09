import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Connection error:', err);
  } else {
    console.log('✅ Connected! Time:', res.rows[0]);
  }
  pool.end();
});
