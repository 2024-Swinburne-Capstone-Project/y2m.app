import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.url?.split('blogs/')[1];
  if (!id) {
    return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
  }

  try {
    const blogPost = await db
      .selectFrom('BlogPost')
      .selectAll()
      .where('id', '=', parseInt(id))
      .executeTakeFirst();

    if (!blogPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
