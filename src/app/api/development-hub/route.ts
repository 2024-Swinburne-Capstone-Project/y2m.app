import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const [milestones, milestoneSteps, developmentAreas, badges] = await Promise.all([
      db.selectFrom('Milestone').selectAll().where('userId', '=', userId).execute(),
      db
        .selectFrom('MilestoneStep')
        .selectAll()
        .innerJoin('Milestone', 'Milestone.id', 'MilestoneStep.milestoneId')
        .where('Milestone.userId', '=', userId)
        .execute(),
      db.selectFrom('DevelopmentArea').selectAll().where('userId', '=', userId).execute(),
      db.selectFrom('Badge').selectAll().where('userId', '=', userId).execute(),
    ]);

    return NextResponse.json({
      milestones,
      milestoneSteps,
      developmentAreas,
      badges,
    });
  } catch (error) {
    console.error('Error fetching development hub data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { milestones, developmentAreas, badges } = data;

    await db.transaction().execute(async (trx) => {
      // Update milestones
      for (const milestone of milestones) {
        await trx
          .updateTable('Milestone')
          .set(milestone)
          .where('id', '=', milestone.id)
          .where('userId', '=', userId)
          .execute();

        // Update milestone steps
        for (const step of milestone.steps) {
          await trx
            .updateTable('MilestoneStep')
            .set(step)
            .where('id', '=', step.id)
            .where('milestoneId', '=', milestone.id)
            .execute();
        }
      }

      // Update development areas
      for (const area of developmentAreas) {
        await trx
          .updateTable('DevelopmentArea')
          .set(area)
          .where('id', '=', area.id)
          .where('userId', '=', userId)
          .execute();
      }

      // Update badges
      for (const badge of badges) {
        await trx
          .updateTable('Badge')
          .set(badge)
          .where('id', '=', badge.id)
          .where('userId', '=', userId)
          .execute();
      }
    });

    return NextResponse.json({ message: 'Development hub updated successfully' });
  } catch (error) {
    console.error('Error updating development hub:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  const body = await req.json();
  const { type, data } = body;

  try {
    let result;
    switch (type) {
      case 'milestone':
        result = await db
          .insertInto('Milestone')
          .values({ ...data, userId })
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      case 'milestoneStep':
        result = await db
          .insertInto('MilestoneStep')
          .values(data)
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      case 'developmentArea':
        result = await db
          .insertInto('DevelopmentArea')
          .values({ ...data, userId })
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      case 'badge':
        result = await db
          .insertInto('Badge')
          .values({ ...data, userId })
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
