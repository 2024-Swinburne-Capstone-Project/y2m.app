import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CreateMentorshipRequestData } from '@/types/mentorship-request/mentorship-request';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const incomingRequests = await db
      .selectFrom('MentorshipRequest')
      .selectAll()
      .where('mentorId', '=', userId)
      .execute();

    const outgoingRequests = await db
      .selectFrom('MentorshipRequest')
      .selectAll()
      .where('menteeId', '=', userId)
      .execute();

    const requests = [...incomingRequests, ...outgoingRequests];

    const enhancedRequests = await Promise.all(
      requests.map(async (request) => {
        const mentorId = String(request.mentorId);

        const [mentor, mentee] = await Promise.all([
          db
            .selectFrom('User')
            .selectAll()
            .where('id', '=', mentorId)
            .executeTakeFirst()
            .then(async (user) => {
              if (user) {
                const [skills, educations, experiences] = await Promise.all([
                  db.selectFrom('Skill').selectAll().where('userId', '=', user.id).execute(),
                  db.selectFrom('Education').selectAll().where('userId', '=', user.id).execute(),
                  db.selectFrom('Experience').selectAll().where('userId', '=', user.id).execute(),
                ]);
                return { user, skills, educations, experiences };
              }
              return null;
            }),
          db
            .selectFrom('User')
            .selectAll()
            .where('id', '=', request.menteeId)
            .executeTakeFirst()
            .then(async (user) => {
              if (user) {
                const [skills, educations, experiences] = await Promise.all([
                  db.selectFrom('Skill').selectAll().where('userId', '=', user.id).execute(),
                  db.selectFrom('Education').selectAll().where('userId', '=', user.id).execute(),
                  db.selectFrom('Experience').selectAll().where('userId', '=', user.id).execute(),
                ]);
                return { user, skills, educations, experiences };
              }
              return null;
            }),
        ]);

        return {
          mentor,
          mentee,
          ...request,
        };
      })
    );
    return NextResponse.json(enhancedRequests);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to process mentorship request',
        userId: userId,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const body: CreateMentorshipRequestData = await req.json();
    const { mentorId, message } = body;

    // Check if a request already exists in either direction
    const existingRequest = await db
      .selectFrom('MentorshipRequest')
      .selectAll()
      .where((eb) =>
        eb.or([
          eb.and([eb('menteeId', '=', userId), eb('mentorId', '=', mentorId)]),
          eb.and([eb('menteeId', '=', mentorId), eb('mentorId', '=', userId)]),
        ])
      )
      .executeTakeFirst();

    if (existingRequest) {
      return NextResponse.json(
        { error: 'A mentorship request already exists between these users' },
        { status: 400 }
      );
    }

    const newRequest = await db
      .insertInto('MentorshipRequest')
      .values({
        mentorId,
        menteeId: userId,
        message,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating mentorship request:', error);
    return NextResponse.json({ error: 'Failed to create mentorship request' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const { id, action } = await req.json();

    if (!id || !action) {
      return NextResponse.json({ error: 'Request ID and action are required' }, { status: 400 });
    }

    const request = await db
      .selectFrom('MentorshipRequest')
      .selectAll()
      .where('id', '=', id)
      .where('mentorId', '=', userId)
      .executeTakeFirst();

    if (!request) {
      return NextResponse.json({ error: 'Request not found or unauthorized' }, { status: 404 });
    }

    if (action === 'accept') {
      await db.transaction().execute(async (trx) => {
        // Delete the request
        await trx.deleteFrom('MentorshipRequest').where('id', '=', id).execute();

        // Create a new mentor-mentee connection
        await trx
          .insertInto('MentorMentee')
          .values({
            mentorId: request.mentorId,
            menteeId: request.menteeId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .execute();
      });
    } else if (action === 'reject') {
      // Simply delete the request
      await db.deleteFrom('MentorshipRequest').where('id', '=', id).execute();
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Request processed successfully' });
  } catch (error) {
    console.error('Error processing mentorship request:', error);
    return NextResponse.json({ error: 'Failed to process mentorship request' }, { status: 500 });
  }
}
