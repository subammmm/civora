import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCalendar } from '../lib/ics.js';
import { checkIcs } from '../scripts/check-ics.mjs';
import { scholarships } from '../app/scholarships/scholarships-data.js';

const now = new Date('2026-11-19T12:00:00Z');
const base = { id: 'x', name: 'X', deadline: 'Jan 15, 2027', deadlineDate: '2027-01-15', lastVerified: '2026-11-19', url: 'https://example.org/x' };

test('the calendar built from the real dataset passes the RFC 5545 checks', () => {
  const upcoming = scholarships.filter((s) => s.deadlineDate && s.deadlineDate >= '2026-11-19').length;
  assert.ok(upcoming > 0);
  assert.equal(checkIcs(buildCalendar(scholarships, now)), upcoming);
});

test('passed and undated scholarships produce no event; a deadline today still does', () => {
  const list = [
    { ...base, id: 'passed', deadlineDate: '2026-11-18' },
    { ...base, id: 'today', deadlineDate: '2026-11-19' },
    { ...base, id: 'undated', deadlineDate: null },
  ];
  const ics = buildCalendar(list, now);
  assert.equal(checkIcs(ics), 1);
  assert.match(ics, /UID:today-2026-11-19@civora\.me/);
  assert.match(ics, /DTSTART;VALUE=DATE:20261119\r\nDTEND;VALUE=DATE:20261120/);
});

test('an empty calendar is still a valid VCALENDAR', () => {
  assert.equal(checkIcs(buildCalendar([], now)), 0);
});

test('commas, semicolons, backslashes and long non-ASCII names are escaped and folded', () => {
  const name = 'Türkiye; Bursları, a\\b ' + 'é'.repeat(80);
  const ics = buildCalendar([{ ...base, name }], now);
  assert.equal(checkIcs(ics), 1);
  assert.ok(ics.replace(/\r\n /g, '').includes('Türkiye\\; Bursları\\, a\\\\b'));
});

test('unconfirmed (~) and never-verified deadlines are labelled approximate', () => {
  const ics = buildCalendar([
    { ...base, id: 'tilde', deadline: '~Jan 15, 2027' },
    { ...base, id: 'unverified', lastVerified: undefined },
    { ...base, id: 'firm' },
  ], now).replace(/\r\n /g, '');
  assert.equal(ics.match(/SUMMARY:\(approx\.\) /g).length, 2);
  assert.match(ics, /SUMMARY:Deadline: X\r\n/);
});
