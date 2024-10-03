import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest, { params }: { params: { userid: string } }) {
  const loggedInUserId = req.headers.get('X-User-Id');
  if (!loggedInUserId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }
  const userId = params.userid;
  const body = await req.json();
  const { feedback, rating, endorsedSkill } = body;

  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  if (!userId || !feedback || typeof rating !== 'number') {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    await db.transaction().execute(async (trx) => {
      // Insert feedback
      await trx
        .insertInto('MentorFeedback')
        .values({
          mentorId: userId,
          menteeId: loggedInUserId,
          feedback: feedback,
          rating: rating,
          endorsedSkill: endorsedSkill,
        })
        .execute();

      // Update or insert skill endorsement
      if (endorsedSkill) {
        const existingSkill = await trx
          .selectFrom('Skill')
          .where('userId', '=', userId)
          .where('name', '=', endorsedSkill)
          .selectAll()
          .executeTakeFirst();

        if (existingSkill) {
          await trx
            .updateTable('Skill')
            .set({ endorsements: (existingSkill.endorsements || 0) + 1 })
            .where('id', '=', existingSkill.id)
            .execute();
        } else {
          await trx
            .insertInto('Skill')
            .values({
              userId: userId,
              name: endorsedSkill,
              endorsements: 1,
            })
            .execute();
        }
      }

      // Calculate the average rating
      const ratings = await trx
        .selectFrom('MentorFeedback')
        .select('rating')
        .where('mentorId', '=', userId)
        .execute();
      const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      const roundedAverageRating = Math.round(averageRating * 2) / 2;

      // Update user's overall rating
      await trx
        .updateTable('User')
        .set({ overallRating: roundedAverageRating })
        .where('id', '=', userId)
        .execute();
    });

    return NextResponse.json(
      { message: 'Feedback saved successfully and user rating updated' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving mentor feedback:', error);
    return NextResponse.json({ message: 'Failed to save mentor feedback' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
  const userId = params.userid;
  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const feedback = await db
      .selectFrom('MentorFeedback')
      .select(['feedback', 'rating'])
      .where('mentorId', '=', userId)
      .execute();

    const skills = await db
      .selectFrom('Skill')
      .select(['name', 'endorsements'])
      .where('userId', '=', userId)
      .where('endorsements', '>', 0)
      .execute();

    return NextResponse.json({ data: { feedback, skills } }, { status: 200 });
  } catch (error) {
    console.error('Error fetching mentor feedback:', error);
    return NextResponse.json({ message: 'Failed to fetch mentor feedback' }, { status: 500 });
  }
}
