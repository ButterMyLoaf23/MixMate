import { prisma } from '@/lib/db';

const fallbackRecipes = [
  { name: 'Cucumber Mint Cooler', slug: 'cucumber-mint-cooler', description: 'Cucumber, mint, lime, sparkling water', difficulty: 'EASY', prepMinutes: 5, flavor: 'FRESH_HERBAL' },
  { name: 'Berry Basil Fizz', slug: 'berry-basil-fizz', description: 'Mixed berries, basil, lemon, soda water', difficulty: 'EASY', prepMinutes: 8, flavor: 'BRIGHT_FRUITY' },
  { name: 'Ginger Citrus Spritz', slug: 'ginger-citrus-spritz', description: 'Ginger, orange, lemon, tonic water', difficulty: 'EASY', prepMinutes: 6, flavor: 'ZESTY_SPICY' },
  { name: 'Peach Tea Smash', slug: 'peach-tea-smash', description: 'Peach, black tea, lemon, honey', difficulty: 'EASY', prepMinutes: 10, flavor: 'SWEET_MELLOW' }
];

async function loadRecipes() {
  try { return await prisma.recipe.findMany({ where: { isPublished: true }, orderBy: { name: 'asc' } }); }
  catch { return fallbackRecipes; }
}

export default async function RecipesPage() {
  const recipes = await loadRecipes();
  return (
    <section className="catalog-page">
      <div className="page-heading"><div><p className="eyebrow">Recipe catalog</p><h1>Find a drink for the moment.</h1><p>Search the catalog or filter by the ingredients already in your kitchen.</p></div><a className="button primary" href="/recipes/new">Create recipe</a></div>
      <div className="filters"><input aria-label="Search recipes" placeholder="Search mocktails or ingredients" /><select defaultValue="all" aria-label="Filter recipes"><option value="all">All flavors</option><option>Fresh & herbal</option><option>Bright & fruity</option><option>Zesty & spicy</option><option>Sweet & mellow</option></select><button className="button secondary">Search</button></div>
      <div className="recipe-list">{recipes.map((recipe) => <article className="recipe-list-card" key={recipe.slug}><p className="card-label">{recipe.flavor.replaceAll('_', ' ')}</p><h2>{recipe.name}</h2><p>{recipe.description}</p><div className="recipe-meta"><span>{recipe.prepMinutes} min</span><span>{recipe.difficulty.toLowerCase()}</span></div><a className="text-button" href={`/recipes/${recipe.slug}`}>View recipe →</a></article>)}</div>
    </section>
  );
}
