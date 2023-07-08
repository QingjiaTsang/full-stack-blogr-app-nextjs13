import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export const POST = async (req) => {
  const { title, content, published, authorId } = await req.json();
  // avoid unauthorized update by hacking the request
  const session = await getServerSession(authOptions);
  if (session.user.id !== authorId) {
    return NextResponse.json({ error: 'Unauthorized to create' }, { status: 401 });
  }
  // console.log(`title, content, published, authorId`, title, content, published, authorId);

  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published,
        author: { connect: { id: authorId } },
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create post or draft' }, { status: 500 });
  }
};
