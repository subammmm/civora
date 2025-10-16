# Utility Functions

This directory contains utility functions and helper modules used throughout the Civora application.

## Directory Structure

```
lib/
├── utils/
│   ├── README.md          # This file
│   ├── formatting.js      # Date, number, and text formatting utilities (to be added)
│   ├── validation.js      # Form validation helpers (to be added)
│   └── constants.js       # Application constants (to be added)
└── monitoring/
    └── sentry.js          # Error monitoring (Sentry)
```

## Purpose

This directory is set up for organizing reusable utility functions. As the application grows, add utility modules here following the patterns described below.

## Creating Utilities

When creating new utility functions:

1. **Keep functions pure** - No side effects when possible
2. **Export named exports** - Easier to tree-shake
3. **Add JSDoc comments** - Document parameters and return values
4. **Write tests** - Ensure reliability
5. **Keep files focused** - One utility type per file

### Example Utility

```javascript
/**
 * Formats a scholarship deadline date
 * @param {Date|string} date - The deadline date
 * @returns {string} Formatted date string
 */
export function formatDeadline(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
```

## Usage in Components

Import utilities in your React components:

```javascript
import { formatDate } from '@/lib/utils/formatting';

export default function ScholarshipCard({ scholarship }) {
  return (
    <div>
      <h3>{scholarship.title}</h3>
      <p>Deadline: {formatDate(scholarship.deadline)}</p>
    </div>
  );
}
```

## Best Practices

### Do ✓
- Keep utilities small and focused
- Use meaningful function names
- Add JSDoc comments
- Handle edge cases
- Export named functions
- Write pure functions when possible

### Don't ✗
- Create god objects with many unrelated utilities
- Mix concerns (e.g., API calls in formatting utils)
- Use default exports
- Mutate input parameters
- Skip error handling

## Contributing

When adding new utilities:

1. Check if similar functionality exists
2. Keep the function focused and reusable
3. Add comprehensive JSDoc comments
4. Update this README with new utilities
5. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for more details.
