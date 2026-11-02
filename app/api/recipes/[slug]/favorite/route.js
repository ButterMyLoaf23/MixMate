import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

async function getRecipe(slug) {
  return prisma.recipe.findUnique({ where: { slug } });
}

export async function POST(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Please log in to save favorites.' }, { status: 401 });
    const recipe = await getRecipe((await params).slug);
    if (!recipe) return NextResponse.json({ error: 'Recipe not found.' }, { status: 404 });
    await prisma.favorite.upsert({ where: { userId_recipeId: { userId: user.id, recipeId: recipe.id } }, update: {}, create: { userId: user.id, recipeId: recipe.id } });
    return NextResponse.json({ favorited: true });
  } catch (error) {
    console.error('Favorite failed:', error);
    return NextResponse.json({ error: 'Favorite could not be saved.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
    const recipe = await getRecipe((await params).slug);
    if (!recipe) return NextResponse.json({ error: 'Recipe not found.' }, { status: 404 });
    await prisma.favorite.deleteMany({ where: { userId: user.id, recipeId: recipe.id } });
    return NextResponse.json({ favorited: false });
  } catch (error) {
    console.error('Favorite removal failed:', error);
    return NextResponse.json({ error: 'Favorite could not be removed.' }, { status: 500 });
  }
}
