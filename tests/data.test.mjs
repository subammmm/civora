import test from 'node:test';
import assert from 'node:assert/strict';
import { scholarships } from '../app/scholarships/scholarships-data.js';
import { buildFeed } from '../lib/feed.js';
import { siteUrl } from '../lib/site.js';

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const isDate = (v) => ISO.test(v) && !Number.isNaN(Date.parse(v));

test('ids are unique, URL-safe slugs', () => {
  const ids = scholarships.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]{1,60}$/);
});

test('every entry has the fields the pages, feed and calendar read', () => {
  for (const s of scholarships) {
    for (const key of ['name', 'country', 'countryCode', 'countryFlag', 'organizer', 'field', 'deadline', 'description']) {
      assert.ok(typeof s[key] === 'string' && s[key].length > 0, `${s.id}.${key}`);
    }
    // Other labels exist (Postdoc, Certificate), but the level filter needs at least one degree level.
    assert.ok(s.level.some((l) => ['Bachelors', 'Masters', 'PhD'].includes(l)), `${s.id}.level`);
    assert.ok(['undergraduate', 'graduate', 'phd'].includes(s.levelCode), `${s.id}.levelCode`);
    assert.ok(['fully-funded', 'partial', 'stipend'].includes(s.fundingType), `${s.id}.fundingType`);
    assert.match(s.countryCode, /^[a-z0-9-]{1,40}$/, `${s.id}.countryCode`);
    assert.match(s.fieldCode, /^[a-z0-9-]{1,40}$/, `${s.id}.fieldCode`);
    assert.ok(s.covers.length > 0 && s.eligibility.length > 0, `${s.id} covers/eligibility`);
    assert.ok(s.deadlineDate === null || isDate(s.deadlineDate), `${s.id}.deadlineDate`);
    assert.ok(s.lastVerified === undefined || isDate(s.lastVerified), `${s.id}.lastVerified`);
    for (const key of ['url', 'source']) {
      if (s[key] !== undefined) assert.equal(new URL(s[key]).protocol, 'https:', `${s.id}.${key}`);
    }
    assert.ok(s.url, `${s.id}.url`);
  }
});

test('siteUrl: NEXT_PUBLIC_SITE_URL wins, then the Vercel production host, then civora.me; no trailing slash', () => {
  assert.equal(siteUrl({ NEXT_PUBLIC_SITE_URL: 'https://example.org/', VERCEL_PROJECT_PRODUCTION_URL: 'x.vercel.app' }), 'https://example.org');
  assert.equal(siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'civora.vercel.app' }), 'https://civora.vercel.app');
  assert.equal(siteUrl({ NEXT_PUBLIC_SITE_URL: '' }), 'https://civora.me');
  assert.equal(siteUrl({}), 'https://civora.me');
});

test('Atom feed: one well-formed entry per verified scholarship, newest verification first, then open deadlines before undated and passed ones', () => {
  const list = [
    { id: 'old', name: 'Old & <Co>', organizer: 'O', deadline: 'd', description: 'x', lastVerified: '2026-01-01', deadlineDate: null },
    { id: 'never', name: 'Never', organizer: 'O', deadline: 'd', description: 'x', deadlineDate: '2027-01-01' },
    { id: 'late', name: 'Late', organizer: 'O', deadline: 'd', description: 'x', lastVerified: '2026-11-19', deadlineDate: '2027-03-01' },
    { id: 'soon', name: 'Soon', organizer: 'O', deadline: 'd', description: 'x', lastVerified: '2026-11-19', deadlineDate: '2026-12-01' },
    { id: 'passed', name: 'Passed', organizer: 'O', deadline: 'd', description: 'x', lastVerified: '2026-11-19', deadlineDate: '2026-05-01' },
    { id: 'undated', name: 'Undated', organizer: 'O', deadline: 'd', description: 'x', lastVerified: '2026-11-19', deadlineDate: null },
  ];
  const xml = buildFeed(list, 'https://example.org', Date.parse('2026-11-19T12:00:00Z'));
  assert.deepEqual([...xml.matchAll(/<id>https:\/\/example\.org\/scholarships\/([a-z]+)<\/id>/g)].map((m) => m[1]), ['soon', 'late', 'undated', 'passed', 'old']);
  assert.match(xml, /<title>Old &amp; &lt;Co&gt;<\/title>/);
  assert.match(xml, /<feed xmlns="http:\/\/www\.w3\.org\/2005\/Atom">/);
  assert.match(xml, /<link rel="self" href="https:\/\/example\.org\/feed\.xml"\/>/);
  assert.match(xml, /<updated>2026-11-19T00:00:00Z<\/updated>/);
  assert.equal(xml.match(/<entry>/g).length, 5);
  assert.equal(xml.match(/<updated>/g).length, 6);
});

test('the real feed has an entry for every verified scholarship', () => {
  assert.equal(buildFeed(scholarships, 'https://example.org').match(/<entry>/g).length, scholarships.filter((s) => s.lastVerified).length);
});
