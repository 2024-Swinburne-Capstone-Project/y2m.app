import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { UserProfile } from '@/types';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const user = await db
      .selectFrom('User')
      .selectAll()
      .where('id', '=', userId)
      .executeTakeFirst();

    const education = await db
      .selectFrom('Education')
      .selectAll()
      .where('userId', '=', userId)
      .execute();

    const experience = await db
      .selectFrom('Experience')
      .selectAll()
      .where('userId', '=', userId)
      .execute();

    const skills = await db
      .selectFrom('Skill')
      .select('name')
      .where('userId', '=', userId)
      .execute();

    return NextResponse.json({
      user,
      education,
      experience,
      skills,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const body: UserProfile = await req.json();
    const { education, experience, skills, user } = body;

    await db.transaction().execute(async (trx) => {
      await trx
        .updateTable('User')
        .set({
          name: user.name,
          email: user.email,
          aboutMe: user.aboutMe,
          linkedInProfileLink: user.linkedInProfileLink,
          profilePictureURL: user.profilePictureURL,
          profileBackgroundURL: user.profileBackgroundURL,
          isMentor: !!user.isMentor,
          isMentee: !!user.isMentee,
          mentorAreas: user.mentorAreas,
          menteeInterests: user.menteeInterests,
          availability: user.availability,
        })
        .where('id', '=', userId)
        .execute();

      // Update education, experience, and skills as before
      await trx.deleteFrom('Education').where('userId', '=', userId).execute();
      for (const edu of education) {
        await trx
          .insertInto('Education')
          .values({
            userId,
            institution: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startDate: edu.startDate?.toString(),
            endDate: edu.endDate?.toString(),
            grade: edu.grade,
            onGoing: edu.onGoing,
          })
          .execute();
      }

      await trx.deleteFrom('Experience').where('userId', '=', userId).execute();
      for (const exp of experience) {
        await trx
          .insertInto('Experience')
          .values({
            userId,
            position: exp.position,
            company: exp.company,
            location: exp.location,
            startDate: exp.startDate?.toString(),
            endDate: exp.endDate?.toString(),
            current: exp.current,
          })
          .execute();
      }

      await trx.deleteFrom('Skill').where('userId', '=', userId).execute();
      for (const skill of skills) {
        await trx
          .insertInto('Skill')
          .values({
            userId,
            name: skill.name,
          })
          .execute();
      }
    });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
