import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const unreadNotifications = await db
      .selectFrom('AccountNotification')
      .selectAll()
      .where((eb) => eb.and([eb('userId', '=', userId), eb('read', '=', false)]))
      .execute();
    return NextResponse.json(unreadNotifications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get user notifications' }, { status: 500 });
  }
}
