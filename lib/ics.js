// Minimal iCalendar (RFC 5545) writer for scholarship deadlines.

import { daysLeft } from './deadlines';

const escapeText = (text) =>
  String(text).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

// Content lines may be at most 75 octets; longer ones continue on a line starting with a space.
function fold(line) {
  const out = [];
  let current = '';
  let bytes = 0;
  for (const char of line) {
    const size = Buffer.byteLength(char);
    if (bytes + size > 75) {
      out.push(current);
      current = ' ';
      bytes = 1;
    }
    current += char;
    bytes += size;
  }
  out.push(current);
  return out.join('\r\n');
}

const compact = (isoDate) => isoDate.replace(/-/g, '');

function nextDay(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

/**
 * Build a VCALENDAR with one all-day event per scholarship that still has an upcoming deadline date.
 */
export function buildCalendar(scholarships, now = new Date()) {
  const upcoming = scholarships.filter((s) => {
    const days = daysLeft(s, now.getTime());
    return days !== null && days >= 0;
  });
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Civora//Scholarship Deadlines//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Civora scholarship deadlines',
  ];

  for (const s of upcoming) {
    // A ~ marks a date the organiser has not confirmed yet; entries without lastVerified were never confirmed.
    const approximate = s.deadline.includes('~') || !s.lastVerified;
    const reminder = `${s.name} deadline${approximate ? ' (approximate)' : ''}`;
    lines.push(
      'BEGIN:VEVENT',
      `UID:${s.id}-${s.deadlineDate}@civora.me`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(s.deadlineDate)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(s.deadlineDate))}`,
      `SUMMARY:${escapeText(`${approximate ? '(approx.) ' : ''}Deadline: ${s.name}`)}`,
      `DESCRIPTION:${escapeText(
        `Deadline: ${s.deadline}\n` +
        (approximate ? 'This date is not officially confirmed yet.\n' : '') +
        `Always check the official site before applying: ${s.url}`
      )}`,
      `URL:${s.url}`,
      'TRANSP:TRANSPARENT',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(`${reminder} in 14 days`)}`,
      'TRIGGER:-P14D',
      'END:VALARM',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(`${reminder} in 3 days`)}`,
      'TRIGGER:-P3D',
      'END:VALARM',
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}
