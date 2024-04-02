import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/frameworks/database/dizzle/schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.POSTGRES_HOSTNAME ?? "",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB ?? "",
  },
} satisfies Config;