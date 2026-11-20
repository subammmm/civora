// Query-string validation and filtering for GET /api/scholarships.

import { DEADLINE_FILTERS, matchesDeadline } from './deadlines.js';

const CODE_PATTERN = /^[a-z0-9-]{1,40}$/;

// Returns the filters that were given and the names of the ones that are not valid.
export function readFilters(searchParams) {
  const filters = {};
  for (const key of ['country', 'level', 'field', 'deadline']) {
    const value = searchParams.get(key);
    if (value) filters[key] = value;
  }
  const invalid = Object.keys(filters).filter((key) =>
    key === 'deadline' ? !DEADLINE_FILTERS.includes(filters[key]) : !CODE_PATTERN.test(filters[key])
  );
  return { filters, invalid };
}

// level accepts the levelCode (undergraduate | graduate | phd) or a degree level (bachelors | masters | phd).
export function filterScholarships(scholarships, filters, now = Date.now()) {
  return scholarships.filter((s) => {
    if (filters.country && s.countryCode !== filters.country) return false;
    if (filters.level && s.levelCode !== filters.level && !s.level.some((l) => l.toLowerCase() === filters.level)) return false;
    if (filters.field && s.fieldCode !== filters.field) return false;
    if (filters.deadline && !matchesDeadline(s, filters.deadline, now)) return false;
    return true;
  });
}
