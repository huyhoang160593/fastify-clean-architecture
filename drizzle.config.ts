import type { Config } from 'drizzle-kit';
import { envVariables } from './src/configs/env.config.ts';

export default {
  schema: './src/frameworks/database/dizzle/schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: envVariables.POSTGRES_HOSTNAME,
    user: envVariables.POSTGRES_USER,
    password: envVariables.POSTGRES_PASSWORD,
    database: envVariables.POSTGRES_DB,
  },
} satisfies Config;