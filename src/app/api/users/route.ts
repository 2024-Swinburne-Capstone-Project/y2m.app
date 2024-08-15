import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  try {
    let query = db.selectFrom('User').select(['id', 'name']);

    if (name) {
      query = query.where('User.name', 'like', `%${name}%`);
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
