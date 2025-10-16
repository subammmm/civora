# React Components

This directory contains reusable React components used throughout the Civora application.

## Directory Structure

```
app/
├── components/
│   ├── README.md              # This file
│   └── AIChatInterface.js     # AI chat component
└── ...
```

## Purpose

This directory houses shared React components that are used across multiple pages. As the application grows, add new reusable components here.

## Component Guidelines

### Creating New Components

1. **One component per file** - Keep components focused and maintainable
2. **Use descriptive names** - Component names should be clear (e.g., `ScholarshipCard`, `NavigationMenu`)
3. **Export named exports** - Use `export function ComponentName()` for better tree-shaking
4. **Add PropTypes or TypeScript** - Document expected props
5. **Keep components pure** - Minimize side effects
6. **Make components reusable** - Avoid hardcoding values

### Example Component

```javascript
/**
 * Scholarship card component
 * @param {Object} props
 * @param {string} props.title - Scholarship title
 * @param {string} props.country - Country offering scholarship
 * @param {Date} props.deadline - Application deadline
 * @param {string} props.url - Link to scholarship details
 */
export function ScholarshipCard({ title, country, deadline, url }) {
  return (
    <div className="card scholarship-card">
      <h3>{title}</h3>
      <p className="country">{country}</p>
      <p className="deadline">
        Deadline: {new Date(deadline).toLocaleDateString()}
      </p>
      <a href={url} className="button">
        Learn More
      </a>
    </div>
  );
}
```

### Using Components

Import and use components in your pages:

```javascript
import { ScholarshipCard } from '@/app/components/ScholarshipCard';

export default function ScholarshipsPage() {
  return (
    <div>
      <h1>Scholarships</h1>
      <ScholarshipCard
        title="Fulbright Program"
        country="United States"
        deadline="2024-10-31"
        url="/scholarships/fulbright"
      />
    </div>
  );
}
```

## Component Categories

### Layout Components
Components for page structure (headers, footers, sidebars):
- Currently in `app/layout.js` (Header, Footer)

### UI Components
Reusable UI elements (buttons, cards, modals):
- To be added as needed

### Feature Components
Complex components with specific functionality:
- `AIChatInterface.js` - AI-powered chat assistant

### Form Components
Form inputs, validation, and submission:
- To be added as needed

## Best Practices

### Do ✓
- Keep components small and focused
- Use semantic HTML elements
- Add proper ARIA labels for accessibility
- Handle loading and error states
- Use CSS classes from `globals.css`
- Document component props
- Test components thoroughly

### Don't ✗
- Create overly complex components
- Hardcode values that should be props
- Skip accessibility attributes
- Ignore error handling
- Mix styling approaches (use CSS classes)

## Styling Components

Use existing CSS classes from `app/globals.css`:

```javascript
export function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button 
      className={variant === 'primary' ? 'linear-button' : 'linear-button secondary'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## Testing Components

Test components to ensure they work correctly:

```javascript
// Example test (using Jest + React Testing Library)
import { render, screen } from '@testing-library/react';
import { ScholarshipCard } from './ScholarshipCard';

test('renders scholarship card with title', () => {
  render(
    <ScholarshipCard
      title="Test Scholarship"
      country="USA"
      deadline="2024-12-31"
      url="/test"
    />
  );
  
  expect(screen.getByText('Test Scholarship')).toBeInTheDocument();
});
```

## Accessibility

Ensure all components are accessible:

- Add `aria-label` to buttons without text
- Use semantic HTML (`<button>` not `<div onClick>`)
- Ensure keyboard navigation works
- Test with screen readers
- Add `alt` text to images
- Use proper heading hierarchy

## Performance

Optimize component performance:

- Use `React.memo()` for expensive components
- Avoid inline function definitions
- Lazy load heavy components
- Optimize re-renders

## Contributing

When adding new components:

1. Check if similar component exists
2. Keep component focused and reusable
3. Add comprehensive documentation
4. Test thoroughly
5. Update this README
6. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for more details.

---

**Note**: This is a structural directory for future component organization. As the application grows, move reusable components here for better maintainability.
