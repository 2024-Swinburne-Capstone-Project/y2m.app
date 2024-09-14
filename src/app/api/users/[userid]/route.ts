import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {
  const loggedInUserId = request.headers.get('X-User-Id');
  if (!loggedInUserId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  const userId = params.userid;
  try {
    const user = await db
      .selectFrom('User')
      .selectAll()
      .where('User.id', '=', userId)
      .executeTakeFirst();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const [skills, educations, experiences] = await Promise.all([
      db.selectFrom('Skill').selectAll().where('userId', '=', user.id).execute(),
      db.selectFrom('Education').selectAll().where('userId', '=', user.id).execute(),
      db.selectFrom('Experience').selectAll().where('userId', '=', user.id).execute(),
    ]);

    const existingConnection = await db
      .selectFrom('MentorMentee')
      .selectAll()
      .where((eb) =>
        eb.or([
          eb.and([eb('mentorId', '=', userId), eb('menteeId', '=', loggedInUserId)]),
          eb.and([eb('mentorId', '=', loggedInUserId), eb('menteeId', '=', userId)]),
        ])
      )
      .executeTakeFirst();

    const existingRequest = await db
      .selectFrom('MentorshipRequest')
      .selectAll()
      .where((eb) =>
        eb.or([
          eb.and([eb('mentorId', '=', userId), eb('menteeId', '=', loggedInUserId)]),
          eb.and([eb('mentorId', '=', loggedInUserId), eb('menteeId', '=', userId)]),
        ])
      )
      .executeTakeFirst();

    const userDetails = {
      user,
      educations,
      experiences,
      skills,
      hasExistingConnection: !!existingConnection,
      hasExistingRequest: !!existingRequest,
    };

    return NextResponse.json(userDetails);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
