import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user) return <section className="auth-page"><div className="auth-card"><p className="eyebrow">Your collection</p><h1>Save recipes you love.</h1><p>Log in to keep your favorite mocktails in one place.</p><a className="button primary" href="/login">Log in</a></div></section>;
  const favorites = await prisma.favorite.findMany({ where: { userId: user.id }, include: { recipe: true }, orderBy: { createdAt: 'desc' } });
  return <section className="catalog-page"><div className="page-heading"><div><p className="eyebrow">Your collection</p><h1>Favorite recipes</h1><p>Your saved mocktails are ready whenever you are.</p></div></div>{favorites.length ? <div className="recipe-list">{favorites.map(({ recipe }) => <article className="recipe-list-card" key={recipe.id}><p className="card-label">{recipe.flavor.replaceAll('_', ' ')}</p><h2>{recipe.name}</h2><p>{recipe.description}</p><a className="text-button" href={`/recipes/${recipe.slug}`}>View recipe →</a></article>)}</div> : <div className="empty-state"><p>You have not saved any recipes yet.</p><a className="button secondary" href="/recipes">Browse recipes</a></div>}</section>;
}
