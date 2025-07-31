import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Neon 데이터베이스 연결
const sql = neon(process.env.DATABASE_URL!);

// Drizzle 인스턴스 생성
export const db = drizzle(sql, { schema });

// 타입 익스포트
export type Database = typeof db;
export * from './schema';