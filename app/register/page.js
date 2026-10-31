'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) { event.preventDefault(); setBusy(true); setError(''); const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const data = await response.json(); if (!response.ok) { setError(data.message); setBusy(false); return; } window.location.href = '/recipes'; }
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}><p className="eyebrow">Join MixMate</p><h1>Create your account</h1><label>Username<input required value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Password<input required minLength="8" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>{error && <p className="form-error">{error}</p>}<button className="button primary" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button><p className="auth-switch">Already have an account? <a href="/login">Log in</a></p></form></section>;
}
