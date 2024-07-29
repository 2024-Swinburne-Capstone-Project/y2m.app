import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { CreateBlogPostData, ApiError } from '@/types';

export async function GET() {
  try {
    const blogPosts = await db.selectFrom('BlogPost').selectAll().execute();
    const response = { data: blogPosts };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    const apiError: ApiError = { message: 'Failed to fetch blog posts' };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBlogPostData = await request.json();

    const { title, content, author, imagePath } = body;

    if (!title || !content || !author || !imagePath) {
      const apiError: ApiError = { message: 'Missing required fields' };
      return NextResponse.json(apiError, { status: 400 });
    }

    const newBlogPost = await db
      .insertInto('BlogPost')
      .values({
        title,
        content,
        author,
        imagePath,
        date: new Date().toISOString(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const response = {
      data: newBlogPost,
      message: 'Blog post created successfully',
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    const apiError: ApiError = { message: 'Failed to create blog post' };
    return NextResponse.json(apiError, { status: 500 });
  }
}
