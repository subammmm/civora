import test from 'node:test';
import assert from 'node:assert/strict';
import { readFilters, filterScholarships } from '../lib/scholarship-filters.js';

const read = (query) => readFilters(new URLSearchParams(query));
const now = Date.parse('2026-11-19T12:00:00Z');
const list = [
  { id: 'a', countryCode: 'japan', level: ['Bachelors', 'Masters', 'PhD'], levelCode: 'undergraduate', fieldCode: 'all', deadlineDate: '2026-12-01' },
  { id: 'b', countryCode: 'uk', level: ['Masters'], levelCode: 'graduate', fieldCode: 'all', deadlineDate: '2026-10-01' },
  { id: 'c', countryCode: 'uk', level: ['PhD'], levelCode: 'phd', fieldCode: 'engineering', deadlineDate: null },
];
const ids = (filters) => filterScholarships(list, filters, now).map((s) => s.id);

test('no query string means no filters and nothing invalid', () => {
  assert.deepEqual(read(''), { filters: {}, invalid: [] });
});

test('valid codes and deadline values are passed through; unknown parameters are ignored', () => {
  assert.deepEqual(read('country=south-korea&level=phd&field=all&deadline=30d&utm_source=x'), {
    filters: { country: 'south-korea', level: 'phd', field: 'all', deadline: '30d' },
    invalid: [],
  });
});

test('deadline must be one of open | passed | 30d', () => {
  for (const value of ['closing', 'future', 'OPEN', '30', '30d ']) {
    assert.deepEqual(read(`deadline=${encodeURIComponent(value)}`).invalid, ['deadline'], value);
  }
});

test('code filters reject uppercase, spaces, injection attempts and over-long values', () => {
  for (const value of ['USA', 'new zealand', "uk'--", 'a,b', '%', 'x'.repeat(41)]) {
    assert.deepEqual(read(`country=${encodeURIComponent(value)}`).invalid, ['country'], value);
  }
  assert.deepEqual(read('country=UK&level=P.hD&field=all').invalid, ['country', 'level']);
});

test('empty values count as not given', () => {
  assert.deepEqual(read('country=&deadline='), { filters: {}, invalid: [] });
});

test('country, field and deadline filters combine', () => {
  assert.deepEqual(ids({}), ['a', 'b', 'c']);
  assert.deepEqual(ids({ country: 'uk' }), ['b', 'c']);
  assert.deepEqual(ids({ country: 'uk', field: 'engineering' }), ['c']);
  assert.deepEqual(ids({ deadline: 'open' }), ['a', 'c']);
  assert.deepEqual(ids({ deadline: 'passed' }), ['b']);
  assert.deepEqual(ids({ deadline: '30d' }), ['a']);
});

test('level matches the legacy levelCode and every degree level an entry actually offers', () => {
  assert.deepEqual(ids({ level: 'undergraduate' }), ['a']);
  assert.deepEqual(ids({ level: 'bachelors' }), ['a']);
  assert.deepEqual(ids({ level: 'masters' }), ['a', 'b']);
  assert.deepEqual(ids({ level: 'phd' }), ['a', 'c']);
});
