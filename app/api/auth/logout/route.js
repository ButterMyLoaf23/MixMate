import { NextResponse } from 'next/server';

export function GET(request) {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set('mixmate_session', '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return response;
}
