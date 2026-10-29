const featuredRecipes = [
  { name: 'Cucumber Mint Cooler', flavor: 'Fresh & herbal', time: '5 min', color: 'mint' },
  { name: 'Berry Basil Fizz', flavor: 'Bright & fruity', time: '8 min', color: 'berry' },
  { name: 'Ginger Citrus Spritz', flavor: 'Zesty & spicy', time: '6 min', color: 'citrus' }
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <p className="eyebrow">Your alcohol-free drink companion</p>
        <h1>Find your next favorite mocktail.</h1>
        <p className="hero-copy">Discover refreshing recipes, search by what you already have, and save the ones worth making again.</p>
        <div className="hero-actions">
          <a className="button primary" href="/recipes">Browse recipes</a>
          <a className="button secondary" href="/recipes?mode=ingredients">Search by ingredients</a>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><p className="eyebrow">A little inspiration</p><h2>Featured mocktails</h2></div>
          <a href="/recipes">See all recipes</a>
        </div>
        <div className="recipe-grid">
          {featuredRecipes.map((recipe) => (
            <article className={`recipe-card ${recipe.color}`} key={recipe.name}>
              <div className="recipe-art" aria-hidden="true" />
              <div className="recipe-card-body"><p className="card-label">{recipe.flavor}</p><h3>{recipe.name}</h3><p>{recipe.time} · Easy</p></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
