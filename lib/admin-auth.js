import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

const digest = (value) => createHash('sha256').update(value).digest();

/**
 * Guard for the write routes. Returns the response to send when the caller is not the admin,
 * or null when the request may proceed. Without ADMIN_API_TOKEN the write API does not exist (404).
 */
export function rejectUnlessAdmin(request) {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }
  const given = request.headers.get('x-admin-token') || '';
  // Hashing first gives timingSafeEqual the equal-length buffers it requires.
  if (!timingSafeEqual(digest(given), digest(expected))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
