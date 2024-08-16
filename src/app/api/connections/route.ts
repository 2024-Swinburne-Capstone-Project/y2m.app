import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const userId = request.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const mentorConnections = await db
      .selectFrom('MentorMentee')
      .where('menteeId', '=', userId)
      .select('mentorId as id')
      .execute();

    const menteeConnections = await db
      .selectFrom('MentorMentee')
      .where('mentorId', '=', userId)
      .select('menteeId as id')
      .execute();

    const mentorIds = mentorConnections.map((connection) => connection.id);
    const menteeIds = menteeConnections.map((connection) => connection.id);

    const [mentors, mentees] = await Promise.all([
      mentorIds.length > 0 ? fetchUserDetails(mentorIds) : [],
      menteeIds.length > 0 ? fetchUserDetails(menteeIds) : [],
    ]);

    return NextResponse.json({ mentors, mentees });
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function fetchUserDetails(userIds: string[]) {
  const users = await db.selectFrom('User').where('id', 'in', userIds).selectAll().execute();

  const userDetails = await Promise.all(
    users.map(async (user) => {
      const [skills, educations, experiences] = await Promise.all([
        db.selectFrom('Skill').selectAll().where('userId', '=', user.id).execute(),
        db.selectFrom('Education').selectAll().where('userId', '=', user.id).execute(),
        db.selectFrom('Experience').selectAll().where('userId', '=', user.id).execute(),
      ]);

      return {
        user,
        skills,
        educations,
        experiences,
      };
    })
  );

  return userDetails;
}
