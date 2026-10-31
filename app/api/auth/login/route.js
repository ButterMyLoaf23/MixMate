import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSessionToken, sessionCookie } from '@/lib/auth';

export async function POST(request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({ where: { email: email?.trim().toLowerCase() } });
  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) return NextResponse.json({ message: 'Email or password is incorrect.' }, { status: 401 });
  const response = NextResponse.json({ user: { id: user.id, username: user.username, email: user.email } });
  response.headers.set('Set-Cookie', sessionCookie(createSessionToken(user)));
  return response;
}
