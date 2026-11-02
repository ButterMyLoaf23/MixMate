import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import FavoriteButton from '@/app/components/FavoriteButton';
import DeleteRecipeButton from '@/app/components/DeleteRecipeButton';

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: { ingredients: { include: { ingredient: true } }, author: true }
  });

  if (!recipe) notFound();
  const user = await getCurrentUser();
  const favorite = user ? await prisma.favorite.findUnique({ where: { userId_recipeId: { userId: user.id, recipeId: recipe.id } } }) : null;
  const instructionParts = recipe.instructions.split(/(?:\.\s+|;\s+)/).map((step) => step.trim()).filter(Boolean);
  const ingredientNames = recipe.ingredients.map((item) => item.ingredient.name).join(', ');
  const steps = [
    `Prepare your workspace and measure the ingredients: ${ingredientNames}. Chill the serving glass if you have time.`,
    ...instructionParts,
    'Taste the drink before serving. Adjust the citrus, sweetener, or sparkling water in small amounts until the balance is right.',
    'Finish with the listed garnish and serve immediately while the drink is cold and bright.'
  ];

  return (
    <article className="recipe-detail">
      <a className="back-link" href="/recipes">← Back to recipes</a>
      <p className="eyebrow">{recipe.flavor.replace('_', ' ')}</p>
      <h1>{recipe.name}</h1>
      {recipe.imageUrl && <img className="recipe-detail-photo" src={recipe.imageUrl} alt={`${recipe.name} mocktail`} />}
      <p className="recipe-intro">{recipe.description}</p>
      <div className="recipe-detail-meta"><span>{recipe.prepMinutes} minutes</span><span>{recipe.difficulty.toLowerCase()}</span></div>
      <div className="recipe-actions">{user ? <FavoriteButton slug={recipe.slug} initialFavorited={Boolean(favorite)} /> : <p><a className="text-button" href="/login">Log in to save this recipe</a></p>}{user?.id === recipe.authorId && <DeleteRecipeButton slug={recipe.slug} />}</div>
      <div className="recipe-detail-grid">
        <section className="recipe-section"><h2>Ingredients</h2><ul>{recipe.ingredients.map((item) => <li key={item.id}><span>{item.ingredient.name}</span><strong>{item.amount}</strong></li>)}</ul></section>
        <section className="recipe-section recipe-instructions-section"><h2>Step-by-step guide</h2><p className="section-description">Follow the order below so the flavors stay balanced and the drink stays cold.</p><ol className="instructions">{steps.map((step, index) => <li key={`${recipe.id}-${index}`}><strong>Step {index + 1}:</strong> {step}{/[.!?]$/.test(step) ? '' : '.'}</li>)}</ol><p className="recipe-tip"><strong>Tip:</strong> Use fresh ice and add sparkling ingredients last so they stay lively.</p></section>
      </div>
    </article>
  );
}
