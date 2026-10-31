'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await response.json();
    if (!response.ok) { setError(data.message); setBusy(false); return; }
    window.location.href = '/recipes';
  }
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}><p className="eyebrow">Welcome back</p><h1>Log in to MixMate</h1><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Password<input required type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>{error && <p className="form-error">{error}</p>}<button className="button primary" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button><p className="auth-switch">New to MixMate? <a href="/register">Create an account</a></p></form></section>;
}
