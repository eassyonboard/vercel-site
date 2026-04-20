/**
 * Vercel Postgres / Neon integrations often expose POSTGRES_PRISMA_URL or POSTGRES_URL.
 * Prisma's schema uses DATABASE_URL — mirror a fallback so runtime matches.
 */
function applyDatabaseUrlFallback(): void {
  if (process.env.DATABASE_URL?.trim()) return;
  const fallback =
    process.env.POSTGRES_PRISMA_URL?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (fallback) {
    process.env.DATABASE_URL = fallback;
  }
}

applyDatabaseUrlFallback();
