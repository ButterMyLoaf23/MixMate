'use client';

import { useMemo, useState } from 'react';

export default function RecipeCatalog({ recipes }) {
  const [query, setQuery] = useState('');
  const [flavor, setFlavor] = useState('all');
  const filtered = useMemo(() => recipes.filter((recipe) => {
    const text = [recipe.name, recipe.description, ...(recipe.ingredients || []).map((item) => item.ingredient.name)].join(' ').toLowerCase();
    return text.includes(query.toLowerCase()) && (flavor === 'all' || recipe.flavor === flavor);
  }), [recipes, query, flavor]);
  return <>
    <div className="filters"><input aria-label="Search recipes and ingredients" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by recipe or ingredient" /><select value={flavor} onChange={(event) => setFlavor(event.target.value)} aria-label="Filter recipes"><option value="all">All flavors</option><option value="FRESH_HERBAL">Fresh & herbal</option><option value="BRIGHT_FRUITY">Bright & fruity</option><option value="ZESTY_SPICY">Zesty & spicy</option><option value="SWEET_MELLOW">Sweet & mellow</option><option value="OTHER">Other</option></select><span className="search-count">{filtered.length} recipe{filtered.length === 1 ? '' : 's'}</span></div>
    {filtered.length ? <div className="recipe-list">{filtered.map((recipe) => <article className="recipe-list-card" key={recipe.slug}>{recipe.imageUrl && <img className="recipe-photo" src={recipe.imageUrl} alt={`${recipe.name} alcohol-free mocktail`} />}<div className="recipe-list-card-body"><p className="card-label">{recipe.flavor.replaceAll('_', ' ')}</p><h2>{recipe.name}</h2><p>{recipe.description}</p><div className="recipe-meta"><span>{recipe.prepMinutes} min</span><span>{recipe.difficulty.toLowerCase()}</span></div><a className="text-button" href={`/recipes/${recipe.slug}`}>View recipe →</a></div></article>)}</div> : <div className="empty-state"><p>No recipes match that ingredient or flavor.</p><button className="button secondary" onClick={() => { setQuery(''); setFlavor('all'); }}>Clear search</button></div>}
  </>;
}
