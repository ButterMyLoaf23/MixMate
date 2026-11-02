'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteRecipeButton({ slug }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function removeRecipe() {
    if (!window.confirm('Delete this recipe permanently?')) return;
    setBusy(true); setError('');
    const response = await fetch(`/api/recipes/${slug}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) { setError(data.error || 'Recipe could not be deleted.'); setBusy(false); return; }
    router.push('/my-recipes');
    router.refresh();
  }
  return <span className="delete-control"><button type="button" className="button danger" onClick={removeRecipe} disabled={busy}>{busy ? 'Deleting…' : 'Delete recipe'}</button>{error && <small className="form-error">{error}</small>}</span>;
}
