import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { getSessionCookieName, readSessionToken } from '@/lib/auth';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = readSessionToken(token);
  if (!session) return null;
  return prisma.user.findUnique({ where: { id: session.id } });
}
