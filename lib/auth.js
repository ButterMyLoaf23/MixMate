import crypto from 'node:crypto';

const cookieName = 'mixmate_session';
function secret() { return process.env.AUTH_SECRET || 'development-only-change-me'; }

export function createSessionToken(user) {
  const payload = Buffer.from(JSON.stringify({ id: user.id, username: user.username, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function sessionCookie(token) {
  return `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
}
