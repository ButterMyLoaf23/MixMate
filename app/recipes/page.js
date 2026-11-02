import { prisma } from '@/lib/db';
import RecipeCatalog from '@/app/components/RecipeCatalog';

const fallbackRecipes = [
  { name: 'Cucumber Mint Cooler', slug: 'cucumber-mint-cooler', description: 'Cucumber, mint, lime, sparkling water', difficulty: 'EASY', prepMinutes: 5, flavor: 'FRESH_HERBAL', imageUrl: '/mocktails/cucumber-mint.jpeg' },
  { name: 'Berry Basil Fizz', slug: 'berry-basil-fizz', description: 'Mixed berries, basil, lemon, soda water', difficulty: 'EASY', prepMinutes: 8, flavor: 'BRIGHT_FRUITY', imageUrl: '/mocktails/blueberry-lemon.jpg' },
  { name: 'Ginger Citrus Spritz', slug: 'ginger-citrus-spritz', description: 'Ginger, orange, lemon, tonic water', difficulty: 'EASY', prepMinutes: 6, flavor: 'ZESTY_SPICY', imageUrl: '/mocktails/ginger-mango-lime.jpg' },
  { name: 'Peach Tea Smash', slug: 'peach-tea-smash', description: 'Peach, black tea, lemon, honey', difficulty: 'EASY', prepMinutes: 10, flavor: 'SWEET_MELLOW', imageUrl: '/mocktails/peach-tea.webp' }
];

async function loadRecipes() {
  try { const recipes = await prisma.recipe.findMany({ where: { isPublished: true }, include: { ingredients: { include: { ingredient: true } } }, orderBy: { name: 'asc' } }); return recipes.length ? recipes : fallbackRecipes; }
  catch { return fallbackRecipes; }
}

export default async function RecipesPage() {
  const recipes = await loadRecipes();
  return (
    <section className="catalog-page">
      <div className="page-heading"><div><p className="eyebrow">Recipe catalog</p><h1>Find a drink for the moment.</h1><p>Search the catalog or filter by the ingredients already in your kitchen.</p></div><a className="button primary" href="/recipes/new">Create recipe</a></div>
      <RecipeCatalog recipes={recipes} />
    </section>
  );
}
