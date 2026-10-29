import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const recipes = [
  { name: 'Cucumber Mint Cooler', slug: 'cucumber-mint-cooler', description: 'A crisp, garden-fresh cooler with a bright lime finish.', instructions: 'Muddle cucumber and mint. Add lime juice and ice, top with sparkling water, and stir gently.', flavor: 'FRESH_HERBAL', ingredients: [['Cucumber', '4 slices'], ['Mint leaves', '8 leaves'], ['Lime juice', '1 oz'], ['Sparkling water', '4 oz']] },
  { name: 'Berry Basil Fizz', slug: 'berry-basil-fizz', description: 'Juicy berries and fragrant basil with a lively sparkle.', instructions: 'Muddle berries and basil with lemon juice. Add ice, top with soda water, and sweeten to taste.', flavor: 'BRIGHT_FRUITY', ingredients: [['Mixed berries', '1/2 cup'], ['Basil leaves', '4 leaves'], ['Lemon juice', '1 oz'], ['Soda water', '4 oz']] },
  { name: 'Ginger Citrus Spritz', slug: 'ginger-citrus-spritz', description: 'A zesty citrus spritz with a gentle ginger kick.', instructions: 'Combine citrus juices and ginger syrup over ice. Top with tonic water and garnish with an orange wheel.', flavor: 'ZESTY_SPICY', ingredients: [['Orange juice', '2 oz'], ['Lemon juice', '1/2 oz'], ['Ginger syrup', '1/2 oz'], ['Tonic water', '3 oz']] }
];

for (const item of recipes) {
  const recipe = await prisma.recipe.upsert({ where: { slug: item.slug }, update: item, create: { ...item, ingredients: undefined } });
  for (const [name, amount] of item.ingredients) {
    const ingredient = await prisma.ingredient.upsert({ where: { name }, update: {}, create: { name } });
    await prisma.recipeIngredient.upsert({ where: { recipeId_ingredientId: { recipeId: recipe.id, ingredientId: ingredient.id } }, update: { amount }, create: { recipeId: recipe.id, ingredientId: ingredient.id, amount } });
  }
}

console.log(`Seeded ${recipes.length} MixMate recipes.`);
await prisma.$disconnect();
