// GET /feed.xml - Atom feed of the verified scholarships (see lib/feed.js for the order).

import { scholarships } from '../scholarships/scholarships-data';
import { buildFeed } from '../../lib/feed';
import { SITE_URL } from '../../lib/site';

// Static, rebuilt daily: the order depends on which deadlines are still open.
export const revalidate = 86400;

export function GET() {
  return new Response(buildFeed(scholarships, SITE_URL), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
