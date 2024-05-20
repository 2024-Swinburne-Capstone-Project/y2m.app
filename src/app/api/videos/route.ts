import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const videos = await db.selectFrom('Video').selectAll().execute();

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch videos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, embeddingLink, videoLength } = body;

    if (!title || !description || !embeddingLink || !videoLength) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db
      .insertInto('Video')
      .values({
        title,
        description,
        embeddingLink,
        videoLength,
      })
      .execute();

    return new Response(JSON.stringify({ message: 'Video created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating video:', error);
    return new Response(JSON.stringify({ error: 'Failed to create video' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
