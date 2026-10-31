import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSessionToken, sessionCookie } from '@/lib/auth';

export async function POST(request) {
  const { username, email, password } = await request.json();
  if (!username?.trim() || !email?.trim() || !password || password.length < 8) return NextResponse.json({ message: 'Username, email, and a password of at least 8 characters are required.' }, { status: 400 });
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) return NextResponse.json({ message: 'An account with that email already exists.' }, { status: 409 });
  const user = await prisma.user.create({ data: { username: username.trim(), email: normalizedEmail, passwordHash: await bcrypt.hash(password, 12) } });
  const response = NextResponse.json({ user: { id: user.id, username: user.username, email: user.email } }, { status: 201 });
  response.headers.set('Set-Cookie', sessionCookie(createSessionToken(user)));
  return response;
}
