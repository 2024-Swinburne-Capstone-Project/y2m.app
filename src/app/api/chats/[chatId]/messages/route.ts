import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { chatId: string } }) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  const { chatId } = params;

  try {
    const messages = await db
      .selectFrom('Message')
      .where('chatId', '=', parseInt(chatId))
      .orderBy('createdAt', 'asc')
      .selectAll()
      .execute();

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  const { chatId } = params;
  const { content } = await req.json();

  try {
    const newMessage = await db
      .insertInto('Message')
      .values({
        content,
        chatId: parseInt(chatId),
        senderId: userId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
