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

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const body = await req.json();
  const { type, data } = body;

  try {
    let result;
    switch (type) {
      case 'milestone':
        result = await db
          .insertInto('Milestone')
          .values({ ...data, user_id: userId })
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
          .values({ ...data, user_id: userId })
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      case 'badge':
        result = await db
          .insertInto('Badge')
          .values({ ...data, user_id: userId })
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

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const body = await req.json();
  const { type, id, data } = body;

  try {
    let result;
    switch (type) {
      case 'milestone':
        result = await db
          .updateTable('Milestone')
          .set(data)
          .where('id', '=', id)
          .where('userId', '=', userId)
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      case 'milestoneStep':
        result = await db
          .updateTable('MilestoneStep')
          .set(data)
          .where('id', '=', id)
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      case 'developmentArea':
        result = await db
          .updateTable('DevelopmentArea')
          .set(data)
          .where('id', '=', id)
          .where('userId', '=', userId)
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      case 'badge':
        result = await db
          .updateTable('Badge')
          .set(data)
          .where('id', '=', id)
          .where('userId', '=', userId)
          .returningAll()
          .executeTakeFirstOrThrow();
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (!type || !id) {
    return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 });
  }

  try {
    let result;
    switch (type) {
      case 'milestone':
        result = await db
          .deleteFrom('Milestone')
          .where('id', '=', Number(id))
          .where('userId', '=', userId)
          .returningAll()
          .executeTakeFirst();
        break;
      case 'milestoneStep':
        result = await db
          .deleteFrom('MilestoneStep')
          .where('id', '=', Number(id))
          .returningAll()
          .executeTakeFirst();
        break;
      case 'developmentArea':
        result = await db
          .deleteFrom('DevelopmentArea')
          .where('id', '=', Number(id))
          .where('userId', '=', userId)
          .returningAll()
          .executeTakeFirst();
        break;
      case 'badge':
        result = await db
          .deleteFrom('Badge')
          .where('id', '=', Number(id))
          .where('userId', '=', userId)
          .returningAll()
          .executeTakeFirst();
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    if (!result) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
