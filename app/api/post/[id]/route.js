import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async (req, { params }) => {
  try {
    const result = await prisma.post.findUnique({
      where: { id: String(params.id) },
      include: { author: { select: { name: true } } },
    });
    console.log(`result`, result);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to query the post' }, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { authorId, ...payload } = await req.json();
  // avoid unauthorized update by hacking the request
  const session = await getServerSession(authOptions);
  if (session.user.id !== authorId) {
    return NextResponse.json({ error: 'Unauthorized to update' }, { status: 401 });
  }

  try {
    const result = await prisma.post.update({
      where: { id: String(params.id) },
      data: { ...payload },
    });
    return NextResponse.json({ message: 'Successfully publish the post' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { authorId } = await req.json();
  // avoid unauthorized deletion by hacking the request
  const session = await getServerSession(authOptions);
  if (session.user.id !== authorId) {
    return NextResponse.json({ error: 'Unauthorized to delete' }, { status: 401 });
  }

  try {
    const result = await prisma.post.delete({
      where: { id: String(params.id) },
    });
    return NextResponse.json({ message: 'Successfully delete the post' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
};
