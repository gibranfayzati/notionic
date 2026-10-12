import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './comment-schema.js'

const DATABASE_URL = process.env.DATABASE_URL

function createMissingDbProxy() {
  const err = () => {
    throw new Error(
      '[fuma-comment] DATABASE_URL is not set. Set it to a Postgres connection string or disable comments (comment.provider = "") in blog.config.js.'
    )
  }
  return new Proxy(err, {
    get: () => createMissingDbProxy(),
    apply: err,
  })
}

const sql = DATABASE_URL ? postgres(DATABASE_URL, { onnotice: () => {} }) : null
export const db = DATABASE_URL ? drizzle(sql, { schema }) : createMissingDbProxy()

let initialized = false
export async function ensureDbTables() {
  if (initialized) return
  initialized = true
  if (!DATABASE_URL || !sql) {
    console.warn('[fuma-comment] Skipping DB init: DATABASE_URL is not set.')
    return
  }
  await sql`
    CREATE TABLE IF NOT EXISTS fuma_users (
      id VARCHAR(256) PRIMARY KEY,
      name VARCHAR(256),
      image TEXT
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS roles (
      "userId" VARCHAR(256) PRIMARY KEY,
      name VARCHAR(256) NOT NULL,
      "canDelete" BOOLEAN NOT NULL
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      page VARCHAR(256) NOT NULL,
      thread INTEGER,
      author VARCHAR(256) NOT NULL,
      content JSON NOT NULL,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS rates (
      "userId" VARCHAR(256) NOT NULL,
      "commentId" INTEGER NOT NULL,
      "like" BOOLEAN NOT NULL,
      PRIMARY KEY ("userId", "commentId")
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS comment_idx ON rates ("commentId")
  `
}
