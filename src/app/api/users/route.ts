import { db } from '@/lib/db';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withApiAuthRequired(async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = new NextResponse();
    const session = await getSession(request, res);
    if (!session?.user) {
      return new Response('User not found', { status: 404 });
    }
    const { user } = session;

    // Check if user already exists
    const existingUser = await db.selectFrom('users').where('id', '=', user.sub).executeTakeFirst();
    if (existingUser) {
      console.log('User already exists');
      return new Response('User already exists', { status: 200 });
    }

    if (!user.name) {
      throw new Error('Name is required');
    }

    db.insertInto('users')
      .values({
        id: user.sub,
        email: user.email || null,
        name: user.name,
        bio: body.bio || null,
        profilePicture: user.picture || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .execute();

    return new Response('User created successfully', { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Failed to create user', { status: 500 });
  }
});
