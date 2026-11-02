import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', database: 'connected', service: 'mixmate-api' });
  } catch (error) {
    console.error('Health check database failure:', error);
    return NextResponse.json({ status: 'error', database: 'unavailable', service: 'mixmate-api' }, { status: 503 });
  }
}
