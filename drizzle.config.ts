import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { Value } from '@sinclair/typebox/value'
import { envSchema } from './src/core/entities/index'

const cleanProcessEnv = Value.Convert(envSchema, Value.Clean(envSchema, Object.assign({}, process.env)))
if (!Value.Check(envSchema, cleanProcessEnv)){
  console.info('Error when parse environment variables:')
  console.error([...Value.Errors(envSchema, cleanProcessEnv)])
  throw new Error('There is error when parse environment variables. Look for the log upward for more detail ↑↑↑')
}

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