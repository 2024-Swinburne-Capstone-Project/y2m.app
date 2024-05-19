import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const blogPosts = await db.selectFrom('BlogPost').selectAll().execute();

    return new Response(JSON.stringify(blogPosts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blog posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, content, author, imagePath } = body;

    if (!title || !content || !author || !imagePath) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db
      .insertInto('BlogPost')
      .values({
        title,
        content,
        author,
        imagePath,
        date: new Date().toISOString(),
      })
      .execute();

    return new Response(JSON.stringify({ message: 'Blog post created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to create blog post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
