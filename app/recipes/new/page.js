'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const blankIngredient = { name: '', amount: '' };

export default function NewRecipePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', instructions: '', prepMinutes: 5, difficulty: 'EASY', flavor: 'BRIGHT_FRUITY', ingredients: [{ ...blankIngredient }] });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  function updateIngredient(index, key, value) { setForm((current) => ({ ...current, ingredients: current.ingredients.map((item, i) => i === index ? { ...item, [key]: value } : item) })); }
  async function submit(event) {
    event.preventDefault(); setSaving(true); setError('');
    try { const response = await fetch('/api/recipes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); router.push(`/recipes/${data.slug}`); }
    catch (err) { setError(err.message || 'Recipe could not be created.'); setSaving(false); }
  }
  return <section className="auth-page"><form className="auth-card recipe-form" onSubmit={submit}><p className="eyebrow">Your kitchen</p><h1>Create a recipe</h1><p>Share a favorite combination with your future self.</p>{error && <p className="form-error">{error}</p>}<label>Name<input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Citrus Garden Fizz" /></label><label>Description<textarea required value={form.description} onChange={(e) => update('description', e.target.value)} rows="3" /></label><div className="form-grid"><label>Prep minutes<input type="number" min="1" value={form.prepMinutes} onChange={(e) => update('prepMinutes', e.target.value)} /></label><label>Difficulty<select value={form.difficulty} onChange={(e) => update('difficulty', e.target.value)}><option value="EASY">Easy</option><option value="MEDIUM">Medium</option><option value="HARD">Hard</option></select></label><label>Flavor<select value={form.flavor} onChange={(e) => update('flavor', e.target.value)}><option value="FRESH_HERBAL">Fresh & herbal</option><option value="BRIGHT_FRUITY">Bright & fruity</option><option value="ZESTY_SPICY">Zesty & spicy</option><option value="SWEET_MELLOW">Sweet & mellow</option><option value="OTHER">Other</option></select></label></div><fieldset><legend>Ingredients</legend>{form.ingredients.map((item, index) => <div className="ingredient-row" key={index}><input required placeholder="Ingredient" value={item.name} onChange={(e) => updateIngredient(index, 'name', e.target.value)} /><input placeholder="Amount" value={item.amount} onChange={(e) => updateIngredient(index, 'amount', e.target.value)} /></div>)}<button type="button" className="text-button" onClick={() => setForm((current) => ({ ...current, ingredients: [...current.ingredients, { ...blankIngredient }] }))}>+ Add ingredient</button></fieldset><label>Instructions<textarea required value={form.instructions} onChange={(e) => update('instructions', e.target.value)} rows="5" placeholder="Build over ice, stir, and garnish." /></label><button className="button primary" disabled={saving}>{saving ? 'Creating recipe…' : 'Create recipe'}</button></form></section>;
}
