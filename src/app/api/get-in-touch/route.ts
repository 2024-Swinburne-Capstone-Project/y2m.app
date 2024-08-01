import { NextRequest, NextResponse } from 'next/server';
import { GetInTouch } from '@/types/db';
import { db } from '@/lib/db';
import { ApiError } from '@/types';

export async function GET() {
  try {
    const getInTouchMessages = await db.selectFrom('GetInTouch').selectAll().execute();
    const response = { data: getInTouchMessages };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching get in touch messages:', error);
    const apiError: ApiError = { message: 'Failed to fetch get in touch messages' };
    return NextResponse.json(apiError, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: GetInTouch = await req.json();
    const {
      firstName,
      lastName,
      email,
      message,
      demo = false,
      feedback = false,
      question = false,
    } = body;
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newGetInTouchMessage = await db
      .insertInto('GetInTouch')
      .values({
        firstName,
        lastName,
        email,
        message,
        demo,
        feedback,
        question,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const response = {
      data: newGetInTouchMessage,
      message: 'Message saved successfully',
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error saving get in touch message:', error);
    const apiError: ApiError = { message: 'Failed to save get in touch message' };
    return NextResponse.json(apiError, { status: 500 });
  }
}
