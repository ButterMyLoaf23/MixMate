import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
    const recipe = await prisma.recipe.findUnique({ where: { slug: (await params).slug } });
    if (!recipe) return NextResponse.json({ error: 'Recipe not found.' }, { status: 404 });
    if (recipe.authorId !== user.id) return NextResponse.json({ error: 'You can only delete recipes you created.' }, { status: 403 });
    await prisma.recipe.delete({ where: { id: recipe.id } });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error('Recipe deletion failed:', error);
    return NextResponse.json({ error: 'Recipe could not be deleted.' }, { status: 500 });
  }
}
