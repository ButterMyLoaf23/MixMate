import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import DeleteRecipeButton from '@/app/components/DeleteRecipeButton';

export default async function MyRecipesPage() {
  const user = await getCurrentUser();
  if (!user) return <section className="auth-page"><div className="auth-card"><p className="eyebrow">Your kitchen</p><h1>Create your own recipes.</h1><p>Log in to create and manage your personal mocktails.</p><a className="button primary" href="/login">Log in</a></div></section>;
  const recipes = await prisma.recipe.findMany({ where: { authorId: user.id }, orderBy: { createdAt: 'desc' } });
  return <section className="catalog-page"><div className="page-heading"><div><p className="eyebrow">Your kitchen</p><h1>My recipes</h1><p>Recipes you have created for your own collection.</p></div><a className="button primary" href="/recipes/new">Create recipe</a></div>{recipes.length ? <div className="recipe-list">{recipes.map((recipe) => <article className="recipe-list-card" key={recipe.id}>{recipe.imageUrl && <img className="recipe-photo" src={recipe.imageUrl} alt={`${recipe.name} mocktail`} />}<div className="recipe-list-card-body"><p className="card-label">{recipe.flavor.replaceAll('_', ' ')}</p><h2>{recipe.name}</h2><p>{recipe.description}</p><div className="recipe-actions"><a className="text-button" href={`/recipes/${recipe.slug}`}>View recipe →</a><DeleteRecipeButton slug={recipe.slug} /></div></div></article>)}</div> : <div className="empty-state"><p>You have not created a recipe yet.</p><a className="button secondary" href="/recipes/new">Create your first recipe</a></div>}</section>;
}
