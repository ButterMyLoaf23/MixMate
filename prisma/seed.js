import 'dotenv/config';
import { prisma } from '../lib/db.js';

const recipes = [
  { name: 'Cucumber Mint Cooler', slug: 'cucumber-mint-cooler', description: 'A crisp, garden-fresh cooler with a bright lime finish.', instructions: 'Muddle cucumber and mint. Add lime juice and ice, top with sparkling water, and stir gently.', flavor: 'FRESH_HERBAL', ingredients: [['Cucumber', '4 slices'], ['Mint leaves', '8 leaves'], ['Lime juice', '1 oz'], ['Sparkling water', '4 oz']] },
  { name: 'Berry Basil Fizz', slug: 'berry-basil-fizz', description: 'Juicy berries and fragrant basil with a lively sparkle.', instructions: 'Muddle berries and basil with lemon juice. Add ice, top with soda water, and sweeten to taste.', flavor: 'BRIGHT_FRUITY', ingredients: [['Mixed berries', '1/2 cup'], ['Basil leaves', '4 leaves'], ['Lemon juice', '1 oz'], ['Soda water', '4 oz']] },
  { name: 'Ginger Citrus Spritz', slug: 'ginger-citrus-spritz', description: 'A zesty citrus spritz with a gentle ginger kick.', instructions: 'Combine citrus juices and ginger syrup over ice. Top with tonic water and garnish with an orange wheel.', flavor: 'ZESTY_SPICY', ingredients: [['Orange juice', '2 oz'], ['Lemon juice', '1/2 oz'], ['Ginger syrup', '1/2 oz'], ['Tonic water', '3 oz']] },
  { name: 'Peach Tea Smash', slug: 'peach-tea-smash', description: 'Soft peach and refreshing black tea balanced with lemon.', instructions: 'Shake peach nectar, chilled tea, lemon, and honey with ice. Pour over fresh ice and garnish with peach.', flavor: 'SWEET_MELLOW', ingredients: [['Peach nectar', '2 oz'], ['Black tea', '3 oz'], ['Lemon juice', '1/2 oz'], ['Honey syrup', '1/2 oz']] },
  { name: 'Pomegranate Rosemary Tonic', slug: 'pomegranate-rosemary-tonic', description: 'Tart pomegranate and rosemary topped with crisp tonic.', instructions: 'Stir pomegranate juice and rosemary syrup over ice. Top with tonic and garnish with rosemary.', flavor: 'SWEET_MELLOW', ingredients: [['Pomegranate juice', '2 oz'], ['Rosemary syrup', '1/2 oz'], ['Lime juice', '1/2 oz'], ['Tonic water', '3 oz']] },
  { name: 'Mango Chili Cooler', slug: 'mango-chili-cooler', description: 'Tropical mango with lime and a subtle chili finish.', instructions: 'Shake mango nectar, lime, and agave with ice. Pour over ice, top with sparkling water, and add a chili-salt rim.', flavor: 'ZESTY_SPICY', ingredients: [['Mango nectar', '3 oz'], ['Lime juice', '1 oz'], ['Agave syrup', '1/2 oz'], ['Sparkling water', '2 oz']] },
  { name: 'Lavender Lemonade Fizz', slug: 'lavender-lemonade-fizz', description: 'Floral lavender meets bright lemon in a delicate fizz.', instructions: 'Combine lemonade and lavender syrup over ice. Top with sparkling water and stir gently.', flavor: 'FRESH_HERBAL', ingredients: [['Lemonade', '4 oz'], ['Lavender syrup', '1/2 oz'], ['Sparkling water', '2 oz'], ['Lemon wheel', '1 garnish']] },
  { name: 'Watermelon Lime Refresher', slug: 'watermelon-lime-refresher', description: 'Juicy watermelon and lime make an easy warm-weather favorite.', instructions: 'Blend watermelon until smooth. Strain if desired, add lime and ice, then top with soda water.', flavor: 'BRIGHT_FRUITY', ingredients: [['Watermelon juice', '4 oz'], ['Lime juice', '1 oz'], ['Soda water', '2 oz'], ['Mint', '1 garnish']] }
];

for (const item of recipes) {
  const { ingredients, ...recipeData } = item;
  const recipe = await prisma.recipe.upsert({ where: { slug: item.slug }, update: recipeData, create: recipeData });
  for (const [name, amount] of ingredients) {
    const ingredient = await prisma.ingredient.upsert({ where: { name }, update: {}, create: { name } });
    await prisma.recipeIngredient.upsert({ where: { recipeId_ingredientId: { recipeId: recipe.id, ingredientId: ingredient.id } }, update: { amount }, create: { recipeId: recipe.id, ingredientId: ingredient.id, amount } });
  }
}

console.log(`Seeded ${recipes.length} MixMate recipes.`);
await prisma.$disconnect();
