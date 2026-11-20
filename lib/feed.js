// Atom feed of the verified scholarships: most recently verified first, then soonest open deadline,
// then the ones without a single date, then the passed ones.
// Entries that were never checked against the official site have no honest <updated> date, so they are left out.

import { daysLeft } from './deadlines.js';

const escapeXml = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildFeed(scholarships, siteUrl, now = Date.now()) {
  const rank = (s) => (!s.deadlineDate ? 1 : daysLeft(s, now) < 0 ? 2 : 0);
  const sorted = scholarships.filter((s) => s.lastVerified).sort((a, b) =>
    b.lastVerified.localeCompare(a.lastVerified) ||
    rank(a) - rank(b) ||
    (a.deadlineDate || '').localeCompare(b.deadlineDate || ''));
  const updated = (s) => `${s.lastVerified}T00:00:00Z`;

  const entries = sorted.map((s) => {
    const link = `${siteUrl}/scholarships/${s.id}`;
    return `  <entry>
    <id>${link}</id>
    <title>${escapeXml(s.name)}</title>
    <link href="${link}"/>
    <updated>${updated(s)}</updated>
    <summary>${escapeXml(`${s.organizer}. Deadline: ${s.deadline}. ${s.description}`)}</summary>
  </entry>`;
  });

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${siteUrl}/feed.xml</id>
  <title>Civora scholarships for Nepali students</title>
  <link rel="self" href="${siteUrl}/feed.xml"/>
  <link href="${siteUrl}/scholarships"/>
  <updated>${sorted.length ? updated(sorted[0]) : '1970-01-01T00:00:00Z'}</updated>
  <author><name>Civora</name></author>
${entries.join('\n')}
</feed>
`;
}
