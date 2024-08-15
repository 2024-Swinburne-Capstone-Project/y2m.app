import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  CreateMentorshipRequestData,
  MentorshipRequestStatus,
} from '@/types/mentorship-request/mentorship-request';
import { UserData } from '@/types/mentor-search/user-data';

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const body: CreateMentorshipRequestData = await req.json();
    const { mentorId, message } = body;

    const newRequest = await db
      .insertInto('MentorshipRequest')
      .values({
        createdAt: new Date(),
        updatedAt: new Date(),
        mentorId,
        menteeId: userId,
        status: MentorshipRequestStatus.PENDING,
        message,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating mentorship request:', error);
    return NextResponse.json({ error: 'Failed to create mentorship request' }, { status: 500 });
  }
}

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

    if (incomingRequests.length === 0) {
      return NextResponse.json(
        outgoingRequests.map((request) => ({
          ...request,
          mentee: null,
        }))
      );
    }

    const menteeIds = incomingRequests.map((request) => request.menteeId);

    const [users, educations, experiences, skills] = await Promise.all([
      db.selectFrom('User').selectAll().where('id', 'in', menteeIds).execute(),
      db.selectFrom('Education').selectAll().where('userId', 'in', menteeIds).execute(),
      db.selectFrom('Experience').selectAll().where('userId', 'in', menteeIds).execute(),
      db.selectFrom('Skill').selectAll().where('userId', 'in', menteeIds).execute(),
    ]);

    const menteeDataMap = new Map<string, UserData>();

    users?.forEach((user) => {
      menteeDataMap.set(user.id, {
        user,
        education: [],
        experience: [],
        skills: [],
      });
    });

    educations?.forEach((edu) => {
      const userData = menteeDataMap.get(edu.userId);
      if (userData) {
        userData.education.push(edu);
      }
    });

    experiences?.forEach((exp) => {
      const userData = menteeDataMap.get(exp.userId);
      if (userData) {
        userData.experience.push(exp);
      }
    });

    skills?.forEach((skill) => {
      const userData = menteeDataMap.get(skill.userId);
      if (userData) {
        userData.skills.push(skill);
      }
    });

    const requestsWithMenteeData = incomingRequests.map((request) => ({
      ...request,
      mentee: menteeDataMap.get(request.menteeId),
    }));

    const combinedRequests = [
      ...requestsWithMenteeData,
      ...outgoingRequests.map((request) => ({
        ...request,
        mentee: null,
      })),
    ];

    return NextResponse.json(combinedRequests);
  } catch (error) {
    console.error('Error fetching mentorship connections:', error);
    return NextResponse.json({ error: 'Failed to fetch mentorship connections' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Request ID and status are required' }, { status: 400 });
    }

    if (!Object.values(MentorshipRequestStatus).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const mentorshipRequest = await db
      .selectFrom('MentorshipRequest')
      .selectAll()
      .where('id', '=', id)
      .where('mentorId', '=', userId)
      .executeTakeFirst();

    if (!mentorshipRequest) {
      return NextResponse.json({ error: 'Request not found or unauthorized' }, { status: 404 });
    }

    await db.deleteFrom('MentorshipRequest').where('id', '=', id).execute();

    if (status === MentorshipRequestStatus.ACCEPTED) {
      await db
        .insertInto('MentorMentee')
        .values({
          mentorId: mentorshipRequest.mentorId,
          menteeId: mentorshipRequest.menteeId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .execute();
    }

    return NextResponse.json({ message: 'Request processed successfully' });
  } catch (error) {
    console.error('Error processing mentorship request:', error);
    return NextResponse.json({ error: 'Failed to process mentorship request' }, { status: 500 });
  }
}
