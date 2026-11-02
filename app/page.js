import { prisma } from '@/lib/db';

const fallbackRecipes = [
  { name: 'Cucumber Mint Cooler', slug: 'cucumber-mint-cooler', flavor: 'FRESH_HERBAL', prepMinutes: 5, difficulty: 'EASY', imageUrl: '/mocktails/cucumber-mint.jpeg' },
  { name: 'Berry Basil Fizz', slug: 'berry-basil-fizz', flavor: 'BRIGHT_FRUITY', prepMinutes: 8, difficulty: 'EASY', imageUrl: '/mocktails/blueberry-lemon.jpg' },
  { name: 'Ginger Citrus Spritz', slug: 'ginger-citrus-spritz', flavor: 'ZESTY_SPICY', prepMinutes: 6, difficulty: 'EASY', imageUrl: '/mocktails/ginger-mango-lime.jpg' }
];

async function loadPopularRecipes() {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    let favorites = await prisma.favorite.findMany({ where: { createdAt: { gte: since } }, include: { recipe: true } });
    if (!favorites.length) favorites = await prisma.favorite.findMany({ include: { recipe: true } });
    const counts = favorites.reduce((result, favorite) => { const flavor = favorite.recipe.flavor; result[flavor] = (result[flavor] || 0) + 1; return result; }, {});
    const flavorOrder = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const recipes = await prisma.recipe.findMany({ where: { isPublished: true }, orderBy: { name: 'asc' } });
    const ordered = [...flavorOrder.map((flavor) => recipes.find((recipe) => recipe.flavor === flavor)), ...recipes].filter(Boolean);
    return ordered.filter((recipe, index, list) => list.findIndex((item) => item.id === recipe.id) === index).slice(0, 3);
  } catch {
    return fallbackRecipes;
  }
}

export default async function HomePage() {
  const featuredRecipes = await loadPopularRecipes();
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
          <div><p className="eyebrow">Based on saves from the last 7 days</p><h2>Most popular flavors this week</h2></div>
          <a href="/recipes">See all recipes</a>
        </div>
        <div className="recipe-grid">
          {featuredRecipes.map((recipe) => (
            <article className="recipe-card" key={recipe.slug}>
              <a href={`/recipes/${recipe.slug}`}><img className="recipe-art" src={recipe.imageUrl} alt={`${recipe.name} mocktail`} /></a>
              <div className="recipe-card-body"><p className="card-label">{recipe.flavor.replaceAll('_', ' ')}</p><h3><a className="recipe-title-link" href={`/recipes/${recipe.slug}`}>{recipe.name}</a></h3><p>{recipe.prepMinutes} min · {recipe.difficulty.toLowerCase()}</p></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
