/**
 * GET /api/scholarships/calendar.ics            - every open deadline (subscribable feed)
 * GET /api/scholarships/calendar.ics?ids=a,b,c  - only those scholarships, as a download
 */

import { scholarships } from '../../../scholarships/scholarships-data';
import { buildCalendar } from '../../../../lib/ics';

const IDS_PATTERN = /^[a-z0-9-]{1,60}(,[a-z0-9-]{1,60}){0,49}$/;

export async function GET(request) {
  const ids = new URL(request.url).searchParams.get('ids');
  if (ids !== null && !IDS_PATTERN.test(ids)) {
    return Response.json({ success: false, error: 'Invalid ids parameter' }, { status: 400 });
  }

  const wanted = ids ? ids.split(',') : null;
  const selected = wanted ? scholarships.filter((s) => wanted.includes(s.id)) : scholarships;
  const calendar = buildCalendar(selected);

  // An empty download is an error; the subscribed feed keeps answering even when it has no events.
  if (wanted && !calendar.includes('BEGIN:VEVENT')) {
    return Response.json({ success: false, error: 'No upcoming deadline for these scholarships' }, { status: 404 });
  }

  const filename = wanted && wanted.length === 1 ? `civora-${wanted[0]}.ics` : 'civora-deadlines.ics';
  return new Response(calendar, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `${wanted ? 'attachment' : 'inline'}; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
