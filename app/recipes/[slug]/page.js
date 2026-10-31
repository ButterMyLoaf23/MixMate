import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: { ingredients: { include: { ingredient: true } } }
  });

  if (!recipe) notFound();

  return (
    <article className="recipe-detail">
      <a className="back-link" href="/recipes">← Back to recipes</a>
      <p className="eyebrow">{recipe.flavor.replace('_', ' ')}</p>
      <h1>{recipe.name}</h1>
      <p className="recipe-intro">{recipe.description}</p>
      <div className="recipe-detail-meta"><span>{recipe.prepMinutes} minutes</span><span>{recipe.difficulty.toLowerCase()}</span></div>
      <div className="recipe-detail-grid">
        <section className="recipe-section"><h2>Ingredients</h2><ul>{recipe.ingredients.map((item) => <li key={item.id}><span>{item.ingredient.name}</span><strong>{item.amount}</strong></li>)}</ul></section>
        <section className="recipe-section"><h2>Instructions</h2><p className="instructions">{recipe.instructions}</p></section>
      </div>
    </article>
  );
}
