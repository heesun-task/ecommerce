import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await pool.query('SELECT NOW()');
  return NextResponse.json({ time: result.rows[0].now });
}
