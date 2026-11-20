// Self-check for the calendar output: parses an .ics file/URL and asserts the RFC 5545 basics.
// Usage: node scripts/check-ics.mjs <file-or-url> [expected-event-count]
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const [source, expected] = process.argv.slice(2);
const raw = /^https?:/.test(source)
  ? Buffer.from(await (await fetch(source)).arrayBuffer())
  : readFileSync(source);
const text = raw.toString('utf8');

// Every line ends in CRLF and no bare LF or CR exists.
assert.ok(text.endsWith('\r\n'), 'file must end with CRLF');
assert.equal(text.replace(/\r\n/g, '').search(/[\r\n]/), -1, 'bare CR or LF found');

const physical = text.split('\r\n').slice(0, -1);
for (const line of physical) {
  assert.ok(Buffer.byteLength(line) <= 75, `line longer than 75 octets: ${line}`);
}

// Unfold, then split into name / params / value.
const lines = text.replace(/\r\n[ \t]/g, '').split('\r\n').filter(Boolean).map((line) => {
  const [, name, params = '', value] = line.match(/^([A-Z-]+)((?:;[^:]+)?):(.*)$/) || assert.fail(`bad line: ${line}`);
  return { name, params, value };
});

assert.deepEqual([lines[0].name, lines[0].value], ['BEGIN', 'VCALENDAR']);
assert.deepEqual([lines.at(-1).name, lines.at(-1).value], ['END', 'VCALENDAR']);
assert.ok(lines.some((l) => l.name === 'VERSION' && l.value === '2.0'), 'VERSION:2.0');
assert.ok(lines.some((l) => l.name === 'PRODID'), 'PRODID');

// BEGIN/END nesting, collecting events.
const stack = [];
const events = [];
for (const line of lines) {
  if (line.name === 'BEGIN') {
    stack.push(line.value);
    if (line.value === 'VEVENT') events.push({ props: [], alarms: [] });
    if (line.value === 'VALARM') events.at(-1).alarms.push([]);
  } else if (line.name === 'END') {
    assert.equal(stack.pop(), line.value, `unbalanced END:${line.value}`);
  } else if (stack.at(-1) === 'VEVENT') {
    events.at(-1).props.push(line);
  } else if (stack.at(-1) === 'VALARM') {
    events.at(-1).alarms.at(-1).push(line);
  }
}
assert.equal(stack.length, 0, 'unclosed component');

const uids = new Set();
for (const { props, alarms } of events) {
  const get = (name) => props.filter((p) => p.name === name);
  for (const name of ['UID', 'DTSTAMP', 'DTSTART', 'DTEND', 'SUMMARY', 'DESCRIPTION']) {
    assert.equal(get(name).length, 1, `exactly one ${name}`);
  }
  const uid = get('UID')[0].value;
  assert.ok(!uids.has(uid), `duplicate UID ${uid}`);
  uids.add(uid);
  assert.match(get('DTSTAMP')[0].value, /^\d{8}T\d{6}Z$/);
  const [start, end] = [get('DTSTART')[0], get('DTEND')[0]];
  for (const d of [start, end]) {
    assert.equal(d.params, ';VALUE=DATE');
    assert.match(d.value, /^\d{8}$/);
  }
  const day = (v) => Date.UTC(v.slice(0, 4), v.slice(4, 6) - 1, v.slice(6, 8));
  assert.equal(day(end.value) - day(start.value), 86400000, 'all-day event spans exactly one day');
  // TEXT values: every comma, semicolon and backslash must be escaped.
  for (const name of ['SUMMARY', 'DESCRIPTION']) {
    const rest = get(name)[0].value.replace(/\\[\\;,nN]/g, '');
    assert.equal(rest.search(/[\\;,]/), -1, `unescaped character in ${name}: ${get(name)[0].value}`);
  }
  assert.deepEqual(alarms.map((a) => a.find((p) => p.name === 'TRIGGER').value).sort(), ['-P14D', '-P3D']);
  for (const alarm of alarms) {
    assert.ok(alarm.some((p) => p.name === 'ACTION' && p.value === 'DISPLAY'));
    assert.ok(alarm.some((p) => p.name === 'DESCRIPTION'));
  }
}
if (expected !== undefined) assert.equal(events.length, Number(expected), 'event count');
console.log(`OK: ${events.length} event(s), ${physical.length} lines`);
