import test from 'node:test';
import assert from 'node:assert/strict';
import { rejectUnlessAdmin } from '../lib/admin-auth.js';

const request = (token) =>
  new Request('http://localhost/api/scholarships', { method: 'POST', headers: token === undefined ? {} : { 'x-admin-token': token } });

test.afterEach(() => { delete process.env.ADMIN_API_TOKEN; });

test('without ADMIN_API_TOKEN the write API answers 404, even to a caller who sends a token', async () => {
  delete process.env.ADMIN_API_TOKEN;
  const res = rejectUnlessAdmin(request('anything'));
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { success: false, error: 'Not found' });
});

test('an empty ADMIN_API_TOKEN does not let an empty header through', () => {
  process.env.ADMIN_API_TOKEN = '';
  assert.equal(rejectUnlessAdmin(request('')).status, 404);
});

test('missing, wrong, prefix and longer tokens are rejected with 401', () => {
  process.env.ADMIN_API_TOKEN = 'correct-horse';
  for (const token of [undefined, '', 'wrong', 'correct', 'correct-horse-battery']) {
    assert.equal(rejectUnlessAdmin(request(token)).status, 401, `token ${JSON.stringify(token)}`);
  }
});

test('the exact token passes (null means: go ahead)', () => {
  process.env.ADMIN_API_TOKEN = 'correct-horse';
  assert.equal(rejectUnlessAdmin(request('correct-horse')), null);
});
