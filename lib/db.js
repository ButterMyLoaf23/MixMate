import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const configuredUrl = process.env.DATABASE_URL;
const databaseUrl = configuredUrl && (configuredUrl.includes('schema=') ? configuredUrl : `${configuredUrl}${configuredUrl.includes('?') ? '&' : '?'}schema=mixmate`);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
