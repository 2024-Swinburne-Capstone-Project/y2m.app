import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const chats = await db
      .selectFrom('Chat')
      .innerJoin('ChatParticipant', 'Chat.id', 'ChatParticipant.chatId')
      .where('ChatParticipant.userId', '=', userId)
      .select(['Chat.id', 'Chat.createdAt', 'Chat.updatedAt'])
      .execute();

    const chatsWithDetails = await Promise.all(
      chats.map(async (chat) => {
        const participants = await db
          .selectFrom('ChatParticipant')
          .innerJoin('User', 'ChatParticipant.userId', 'User.id')
          .where('ChatParticipant.chatId', '=', chat.id)
          .select(['User.id', 'User.name', 'User.profilePictureURL'])
          .execute();

        const lastMessage = await db
          .selectFrom('Message')
          .where('chatId', '=', chat.id)
          .orderBy('createdAt', 'desc')
          .limit(1)
          .selectAll()
          .executeTakeFirst();

        return {
          ...chat,
          participants: participants.filter((p) => p.id !== userId),
          lastMessage,
        };
      })
    );

    return NextResponse.json(chatsWithDetails);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const { participantId } = await req.json();

    if (!participantId) {
      return NextResponse.json({ error: 'Participant ID is required' }, { status: 400 });
    }

    // Start a transaction
    const result = await db.transaction().execute(async (trx) => {
      // Create a new chat
      const [newChat] = await trx
        .insertInto('Chat')
        .values({
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returning(['id', 'createdAt', 'updatedAt'])
        .execute();

      // Add participants to the chat
      await trx
        .insertInto('ChatParticipant')
        .values([
          { chatId: newChat.id, userId: userId },
          { chatId: newChat.id, userId: participantId },
        ])
        .execute();

      // Fetch participant details
      const participants = await trx
        .selectFrom('User')
        .where('id', 'in', [userId, participantId])
        .select(['id', 'name', 'profilePictureURL'])
        .execute();

      return {
        ...newChat,
        participants: participants.filter((p) => p.id !== userId),
        lastMessage: null,
      };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating new chat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
