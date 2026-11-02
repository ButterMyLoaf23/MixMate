'use client';

import { useState } from 'react';

export default function FavoriteButton({ slug, initialFavorited = false }) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function toggle() {
    setBusy(true); setError('');
    const response = await fetch(`/api/recipes/${slug}/favorite`, { method: favorited ? 'DELETE' : 'POST' });
    const data = await response.json();
    if (!response.ok) setError(data.error || 'Something went wrong.');
    else setFavorited(data.favorited);
    setBusy(false);
  }
  return <span className="favorite-control"><button className="button secondary" onClick={toggle} disabled={busy}>{busy ? 'Saving…' : favorited ? '♥ Saved' : '♡ Save favorite'}</button>{error && <small className="form-error">{error}</small>}</span>;
}
