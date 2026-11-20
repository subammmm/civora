import test from 'node:test';
import assert from 'node:assert/strict';
import { daysLeft, matchesDeadline, DEADLINE_FILTERS } from '../lib/deadlines.js';

const at = (iso) => Date.parse(iso);
const s = { deadlineDate: '2027-01-15' };
const undated = { deadlineDate: null };

test('daysLeft is 0 for the whole deadline day (UTC) and negative right after it', () => {
  assert.equal(daysLeft(s, at('2027-01-15T00:00:00Z')), 0);
  assert.equal(daysLeft(s, at('2027-01-15T23:59:59Z')), 0);
  assert.equal(daysLeft(s, at('2027-01-16T00:00:00Z')), -1);
});

test('daysLeft counts whole days before the deadline and is null without a date', () => {
  assert.equal(daysLeft(s, at('2027-01-14T12:00:00Z')), 1);
  assert.equal(daysLeft(s, at('2026-12-16T00:00:00Z')), 30);
  assert.equal(daysLeft(undated, at('2027-01-01T00:00:00Z')), null);
});

test('open: includes the deadline day itself and undated entries, excludes the day after', () => {
  assert.equal(matchesDeadline(s, 'open', at('2027-01-15T23:00:00Z')), true);
  assert.equal(matchesDeadline(s, 'open', at('2027-01-16T00:00:00Z')), false);
  assert.equal(matchesDeadline(undated, 'open', at('2027-01-16T00:00:00Z')), true);
});

test('passed: only dated entries whose day is over', () => {
  assert.equal(matchesDeadline(s, 'passed', at('2027-01-15T23:59:59Z')), false);
  assert.equal(matchesDeadline(s, 'passed', at('2027-01-16T00:00:00Z')), true);
  assert.equal(matchesDeadline(undated, 'passed', at('2030-01-01T00:00:00Z')), false);
});

test('30d: 30 days out is in, 31 days out is out, closing today is in, passed and undated are out', () => {
  assert.equal(matchesDeadline(s, '30d', at('2026-12-16T00:00:00Z')), true);
  assert.equal(matchesDeadline(s, '30d', at('2026-12-15T23:59:58Z')), false);
  assert.equal(matchesDeadline(s, '30d', at('2027-01-15T10:00:00Z')), true);
  assert.equal(matchesDeadline(s, '30d', at('2027-01-16T00:00:00Z')), false);
  assert.equal(matchesDeadline(undated, '30d', at('2027-01-01T00:00:00Z')), false);
});

test('the advertised filter list is exactly what matchesDeadline understands', () => {
  assert.deepEqual(DEADLINE_FILTERS, ['open', 'passed', '30d']);
});
