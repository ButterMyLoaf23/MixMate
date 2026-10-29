const recipes = [
  { name: 'Cucumber Mint Cooler', ingredients: 'Cucumber, mint, lime, sparkling water', difficulty: 'Easy', time: '5 min', flavor: 'Fresh & herbal' },
  { name: 'Berry Basil Fizz', ingredients: 'Mixed berries, basil, lemon, soda water', difficulty: 'Easy', time: '8 min', flavor: 'Bright & fruity' },
  { name: 'Ginger Citrus Spritz', ingredients: 'Ginger, orange, lemon, tonic water', difficulty: 'Easy', time: '6 min', flavor: 'Zesty & spicy' },
  { name: 'Peach Tea Smash', ingredients: 'Peach, black tea, lemon, honey', difficulty: 'Easy', time: '10 min', flavor: 'Sweet & mellow' }
];

export default function RecipesPage() {
  return (
    <section className="catalog-page">
      <div className="page-heading"><div><p className="eyebrow">Recipe catalog</p><h1>Find a drink for the moment.</h1><p>Search the catalog or filter by the ingredients already in your kitchen.</p></div><a className="button primary" href="/recipes/new">Create recipe</a></div>
      <div className="filters"><input aria-label="Search recipes" placeholder="Search mocktails or ingredients" /><select defaultValue="all" aria-label="Filter recipes"><option value="all">All flavors</option><option>Fresh & herbal</option><option>Bright & fruity</option><option>Zesty & spicy</option><option>Sweet & mellow</option></select><button className="button secondary">Search</button></div>
      <div className="recipe-list">{recipes.map((recipe) => <article className="recipe-list-card" key={recipe.name}><p className="card-label">{recipe.flavor}</p><h2>{recipe.name}</h2><p>{recipe.ingredients}</p><div className="recipe-meta"><span>{recipe.time}</span><span>{recipe.difficulty}</span></div><button className="text-button">View recipe →</button></article>)}</div>
    </section>
  );
}
