import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const userId = request.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const isMentor = searchParams.get('isMentor') === 'true';
  const isMentee = searchParams.get('isMentee') === 'true';

  try {
    let query = db
      .selectFrom('User')
      .leftJoin('MentorMentee', 'User.id', 'MentorMentee.mentorId')
      .where('id', '!=', userId)
      .select([
        'id',
        'name',
        'email',
        'aboutMe',
        'linkedInProfileLink',
        'profilePictureURL',
        'isMentor',
        'isMentee',
        'mentorAreas',
        'menteeInterests',
        'availability',
      ]);

    if (name) {
      query = query.where('User.name', 'like', `%${name}%`);
    }

    if (isMentor) {
      query = query.where('isMentor', '=', true);
    }

    if (isMentee) {
      query = query.where('isMentee', '=', true);
    }

    const users = await query.execute();

    const detailedUsers = await Promise.all(
      users.map(async (user) => {
        const education = await db
          .selectFrom('Education')
          .selectAll()
          .where('userId', '=', user.id)
          .execute();

        const experience = await db
          .selectFrom('Experience')
          .selectAll()
          .where('userId', '=', user.id)
          .execute();

        const skills = await db
          .selectFrom('Skill')
          .select('name')
          .where('userId', '=', user.id)
          .execute();

        return {
          user,
          education,
          experience,
          skills,
        };
      })
    );

    return NextResponse.json(detailedUsers);
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
