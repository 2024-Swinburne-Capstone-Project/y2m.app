import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  // Add more search parameters as needed
  
  let query = db.selectFrom('User').selectAll(); //TODO change to only specific columns to avoid PII

  try {
    if (name) {
      query = query.where('User.name', 'like', `%${name}%`);
    }

    const users = await query.execute();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
