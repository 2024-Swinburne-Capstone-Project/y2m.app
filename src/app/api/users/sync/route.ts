// src/app/api/users/sync/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { auth0Id, email, name } = await req.json();

    const existingUser = await db
      .selectFrom('User')
      .selectAll()
      .where('id', '=', auth0Id)
      .executeTakeFirst();

    if (existingUser) {
      await db.updateTable('User').set({ name, email }).where('id', '=', auth0Id).execute();
    } else {
      await db
        .insertInto('User')
        .values({
          id: auth0Id,
          name,
          email,
          isMentee: false,
          isMentor: false,
          mentorAreas: [],
          menteeInterests: [],
        })
        .execute();
    }

    return NextResponse.json({ message: 'User synced successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}
