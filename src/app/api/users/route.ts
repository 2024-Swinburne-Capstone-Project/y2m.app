import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const userId = request.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get('searchTerm');
  const isMentor = searchParams.get('isMentor') === 'true';

  try {
    let query = db
      .selectFrom('User as u')
      .selectAll('u')
      .leftJoin('Skill as s', 's.userId', 'u.id')
      .leftJoin('Experience as ex', 'ex.userId', 'u.id')
      .leftJoin('Education as ed', 'ed.userId', 'u.id')
      .distinctOn('u.id')
      .where('u.id', '!=', userId);

    if (searchTerm) {
      query = query.where((eb) =>
        eb.or([
          eb('u.name', 'ilike', `%${searchTerm}%`),
          eb('s.name', 'ilike', `%${searchTerm}%`),
          eb('ex.company', 'ilike', `%${searchTerm}%`),
          eb('ex.position', 'ilike', `%${searchTerm}%`),
          eb('ed.institution', 'ilike', `%${searchTerm}%`),
          eb('ed.degree', 'ilike', `%${searchTerm}%`),
          eb('ed.fieldOfStudy', 'ilike', `%${searchTerm}%`),
        ])
      );
    }

    if (isMentor) {
      query = query.where('isMentor', '=', true);
    }

    const users = await query.execute();

    const detailedUsers = await Promise.all(
      users.map(async (user) => {
        const educations = await db
          .selectFrom('Education')
          .selectAll()
          .where('userId', '=', user.id)
          .execute();
        const experiences = await db
          .selectFrom('Experience')
          .selectAll()
          .where('userId', '=', user.id)
          .execute();

        const skills = await db
          .selectFrom('Skill')
          .select('name')
          .where('userId', '=', user.id)
          .execute();

        const existingRequest = await db
          .selectFrom('MentorshipRequest')
          .selectAll()
          .where((eb) =>
            eb.or([
              eb.and([eb('menteeId', '=', userId), eb('mentorId', '=', user.id)]),
              eb.and([eb('menteeId', '=', user.id), eb('mentorId', '=', userId)]),
            ])
          )
          .executeTakeFirst();

        const existingConnection = await db
          .selectFrom('MentorMentee')
          .selectAll()
          .where('menteeId', '=', userId)
          .executeTakeFirst();

        return {
          user,
          educations,
          experiences,
          skills,
          hasExistingRequest: !!existingRequest,
          hasExistingConnection: !!existingConnection,
        };
      })
    );

    return NextResponse.json(detailedUsers);
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}