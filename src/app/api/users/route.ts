import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'kysely';

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
      .selectAll()
      .distinctOn('u.id')
      .where('u.id', '!=', userId);
    if (isMentor) {
      query = query.where('isMentor', '=', true);
    }

    if (searchTerm) {
      query = query
        .rightJoin('Skill as s', 's.userId', 'u.id')
        .rightJoin('Experience as ex', 'ex.userId', 'u.id')
        .rightJoin('Education as ed', 'ed.userId', 'u.id')
        .select(['u.name as name', 'u.id as id'])
        .where((eb) =>
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

    console.log({ detailedUsers });

    return NextResponse.json(detailedUsers);
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
