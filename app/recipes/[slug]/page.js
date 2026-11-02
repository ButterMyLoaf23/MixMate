import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import FavoriteButton from '@/app/components/FavoriteButton';

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: { ingredients: { include: { ingredient: true } }, author: true }
  });

  if (!recipe) notFound();
  const user = await getCurrentUser();
  const favorite = user ? await prisma.favorite.findUnique({ where: { userId_recipeId: { userId: user.id, recipeId: recipe.id } } }) : null;
  const steps = recipe.instructions.split(/(?:\.\s+|;\s+)/).map((step) => step.trim()).filter(Boolean);

  return (
    <article className="recipe-detail">
      <a className="back-link" href="/recipes">← Back to recipes</a>
      <p className="eyebrow">{recipe.flavor.replace('_', ' ')}</p>
      <h1>{recipe.name}</h1>
      {recipe.imageUrl && <img className="recipe-detail-photo" src={recipe.imageUrl} alt={`${recipe.name} mocktail`} />}
      <p className="recipe-intro">{recipe.description}</p>
      <div className="recipe-detail-meta"><span>{recipe.prepMinutes} minutes</span><span>{recipe.difficulty.toLowerCase()}</span></div>
      {user ? <FavoriteButton slug={recipe.slug} initialFavorited={Boolean(favorite)} /> : <p><a className="text-button" href="/login">Log in to save this recipe</a></p>}
      <div className="recipe-detail-grid">
        <section className="recipe-section"><h2>Ingredients</h2><ul>{recipe.ingredients.map((item) => <li key={item.id}><span>{item.ingredient.name}</span><strong>{item.amount}</strong></li>)}</ul></section>
        <section className="recipe-section"><h2>How to make it</h2><ol className="instructions">{steps.map((step, index) => <li key={`${recipe.id}-${index}`}>{step}{/[.!?]$/.test(step) ? '' : '.'}</li>)}</ol><p className="recipe-tip"><strong>Tip:</strong> Chill your glass first and use fresh ice for the cleanest flavor.</p></section>
      </div>
    </article>
  );
}
