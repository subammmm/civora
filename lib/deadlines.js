// Deadline helpers shared by the pages, the API and the calendar feed.

const DAY = 24 * 60 * 60 * 1000;

export const DEADLINE_FILTERS = ['open', 'passed', '30d'];

// Whole days until the deadline day ends (UTC): 0 on the day itself, negative once passed.
// null when the scholarship has no single deadline date.
export function daysLeft(scholarship, now) {
  if (!scholarship.deadlineDate) return null;
  return Math.floor((Date.parse(`${scholarship.deadlineDate}T23:59:59Z`) - now) / DAY);
}

// filter is one of DEADLINE_FILTERS. Scholarships without a date count as open, never as closing soon.
export function matchesDeadline(scholarship, filter, now) {
  const days = daysLeft(scholarship, now);
  if (filter === 'passed') return days !== null && days < 0;
  if (filter === '30d') return days !== null && days >= 0 && days <= 30;
  return days === null || days >= 0;
}
