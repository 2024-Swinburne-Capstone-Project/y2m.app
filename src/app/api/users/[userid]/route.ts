import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Testimonial } from '@/types';

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

    const [skills, educations, experiences, mentorFeedback] = await Promise.all([
      db.selectFrom('Skill').selectAll().where('userId', '=', user.id).execute(),
      db.selectFrom('Education').selectAll().where('userId', '=', user.id).execute(),
      db.selectFrom('Experience').selectAll().where('userId', '=', user.id).execute(),
      db.selectFrom('MentorFeedback').selectAll().where('mentorId', '=', user.id).execute(),
    ]);

    let testimonials: Testimonial[] = [];

    if (mentorFeedback.length > 0) {
      const menteeIds = mentorFeedback.map((feedback) => feedback.menteeId);
      const mentees = await db
        .selectFrom('User')
        .select(['User.id', 'User.name', 'User.profilePictureURL'])
        .where('id', 'in', menteeIds)
        .execute();

      const menteeMap = mentees.reduce(
        (acc, mentee) => {
          acc[mentee.id] = {
            id: mentee.id,
            name: mentee.name,
            imagePath: mentee.profilePictureURL || '',
          };
          return acc;
        },
        {} as Record<string, { id: string; name: string; imagePath: string }>
      );

      testimonials = mentorFeedback.map((feedback) => ({
        name: { text: menteeMap[feedback.menteeId].name },
        image: menteeMap[feedback.menteeId].imagePath,
        quote: { text: feedback.feedback },
      }));
    }

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
      testimonials,
      hasExistingConnection: !!existingConnection,
      hasExistingRequest: !!existingRequest,
    };

    return NextResponse.json(userDetails);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
