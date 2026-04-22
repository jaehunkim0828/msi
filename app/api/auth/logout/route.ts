import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // 쿠키 삭제
  response.cookies.delete('auth-token');

  return response;
}
