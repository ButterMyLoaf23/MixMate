import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
    const body = await request.json();
    const name = String(body.name || '').trim();
    const ingredients = Array.isArray(body.ingredients) ? body.ingredients : [];
    if (!name || !body.description || !body.instructions || !ingredients.some((item) => item.name?.trim())) {
      return NextResponse.json({ error: 'Name, description, instructions, and at least one ingredient are required.' }, { status: 400 });
    }
    const baseSlug = slugify(name) || `recipe-${Date.now()}`;
    let slug = baseSlug;
    let suffix = 2;
    while (await prisma.recipe.findUnique({ where: { slug } })) slug = `${baseSlug}-${suffix++}`;
    const recipe = await prisma.recipe.create({
      data: {
        authorId: user.id,
        name,
        slug,
        description: String(body.description).trim(),
        instructions: String(body.instructions).trim(),
        prepMinutes: Number(body.prepMinutes) || 5,
        difficulty: body.difficulty || 'EASY',
        flavor: body.flavor || 'OTHER',
        isPublished: true,
        ingredients: {
          create: ingredients.filter((item) => item.name?.trim()).map((item) => ({
            amount: String(item.amount || '').trim(),
            ingredient: { connectOrCreate: { where: { name: item.name.trim() }, create: { name: item.name.trim() } } }
          }))
        }
      }
    });
    return NextResponse.json({ slug: recipe.slug }, { status: 201 });
  } catch (error) {
    console.error('Recipe creation failed:', error);
    return NextResponse.json({ error: 'Recipe could not be created. Check the server database connection.' }, { status: 500 });
  }
}
