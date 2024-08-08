import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {
  const userId = params.userid;

  try {
    const mentors = await db
      .selectFrom('MentorMentee')
      .selectAll()
      .innerJoin('User', 'User.id', 'MentorMentee.mentorId')
      .where('MentorMentee.menteeId', '=', userId)
      .execute();
    console.log(mentors);
    return NextResponse.json(mentors);
  } catch (error) {
    console.error('Error fetching user mentors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { userid: string } }) {
  const userId = params.userid;
  const data = await request.json();

  try {
    // Create a new mentor-mentee relationship
    await db
      .insertInto('MentorMentee')
      .values({
        mentorId: data.mentorId,
        menteeId: userId,
        updatedAt: new Date().toISOString(),
      })
      .executeTakeFirstOrThrow();

    return NextResponse.json({ message: 'Mentor created successfully' });
  } catch (error) {
    console.error('Error creating user mentor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
