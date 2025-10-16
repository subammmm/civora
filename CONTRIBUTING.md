# Contributing to Civora

Thank you for your interest in contributing to Civora! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Code Style Guidelines](#code-style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive in all interactions
- Focus on constructive feedback
- Accept criticism gracefully
- Prioritize what's best for the community and students we serve

## Getting Started

Civora is a Next.js 14 application that helps students from Nepal and underrepresented countries find scholarships, citizenship pathways, and application resources.

### Prerequisites

- Node.js 18.17.0 or higher (Node 20 recommended - see `.nvmrc`)
- npm (comes with Node.js)
- Git
- A text editor (VS Code recommended)

### First-Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/civora.git
   cd civora
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/subammmm/civora.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env if you need to work with AI features
   ```
6. **Start development server**:
   ```bash
   npm run dev
   ```
7. Open http://localhost:3000/ in your browser

## Development Setup

### Project Structure

```
civora/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.js          # Root layout with Header/Footer
│   ├── page.js            # Homepage
│   ├── globals.css        # Global styles
│   ├── scholarships/      # Scholarships page
│   ├── citizenship/       # Citizenship page
│   └── ...                # Other pages
├── public/                # Static assets
│   ├── assets/           # Images, CSS, JS, data files
│   ├── CNAME             # Custom domain config
│   └── ...               # Other static files
├── lib/                   # Utility functions and helpers
├── .github/               # GitHub Actions and configuration
└── scripts/               # Build and utility scripts
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Production build (for Vercel)
npm run build:static     # Static export (for GitHub Pages)
npm run start            # Start production server

# Quality Checks
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm run format           # Check code formatting
npm run format:write     # Auto-format code with Prettier

# Utilities
npm run sitemap          # Generate sitemap
npm run link:check       # Check for broken links
```

## How to Contribute

### Types of Contributions

1. **Bug Reports** - Found a bug? Open an issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

2. **Feature Requests** - Have an idea? Open an issue with:
   - Clear description of the feature
   - Why it would be useful for students
   - Possible implementation approach
   - Mockups or examples if applicable

3. **Documentation** - Improve docs by:
   - Fixing typos or unclear sections
   - Adding examples
   - Translating content (especially to Nepali)
   - Updating outdated information

4. **Code Contributions** - Submit a PR to:
   - Fix bugs
   - Implement new features
   - Improve performance
   - Enhance accessibility
   - Add tests

5. **Scholarship Data** - Help maintain accuracy by:
   - Adding new scholarships
   - Updating existing scholarship info
   - Verifying application deadlines
   - Adding application tips

## Code Style Guidelines

### General Principles

- **Write clear, readable code** - Code is read more often than written
- **Keep it simple** - Avoid over-engineering solutions
- **Be consistent** - Follow existing patterns in the codebase
- **Comment when necessary** - Explain "why", not "what"
- **Test your changes** - Ensure nothing breaks

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Keep components small and focused
- Extract reusable logic into custom hooks

```javascript
// Good ✓
function ScholarshipCard({ scholarship }) {
  const { title, country, deadline } = scholarship;
  
  return (
    <div className="scholarship-card">
      <h3>{title}</h3>
      <p>Country: {country}</p>
      <p>Deadline: {deadline}</p>
    </div>
  );
}

// Avoid ✗
function Card({ s }) {
  return <div><h3>{s.t}</h3><p>{s.c}</p></div>;
}
```

### CSS

- Use semantic class names
- Follow BEM-like naming convention
- Keep specificity low
- Use CSS variables for colors and spacing
- Mobile-first responsive design

```css
/* Good ✓ */
.scholarship-card {
  padding: var(--spacing-md);
  background: var(--color-background);
}

.scholarship-card__title {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}

/* Avoid ✗ */
div.card > h3 {
  font-size: 20px;
  color: #333;
}
```

### File Organization

- One component per file
- Name files after their primary export
- Group related files in directories
- Keep files focused and under 300 lines

### Accessibility

- Always include alt text for images
- Use semantic HTML elements
- Ensure keyboard navigation works
- Add ARIA labels where appropriate
- Test with screen readers when possible

```javascript
// Good ✓
<button 
  aria-label="Close dialog"
  onClick={handleClose}
>
  <CloseIcon />
</button>

// Avoid ✗
<div onClick={handleClose}>
  <CloseIcon />
</div>
```

## Pull Request Process

### Before Submitting

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following code style guidelines

3. **Test thoroughly**:
   ```bash
   npm run dev          # Test in development
   npm run lint         # Check for linting errors
   npm run type-check   # Check for type errors
   npm run format       # Check formatting
   npm run build        # Ensure production build works
   ```

4. **Commit your changes** with clear messages (see below)

5. **Update documentation** if needed

### Submitting a Pull Request

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Link to related issue (if applicable)
   - Screenshots for UI changes
   - Checklist of what was tested

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Code refactoring
   
   ## Testing
   - [ ] Tested locally in development
   - [ ] Tested production build
   - [ ] Ran linting and type-check
   - [ ] Tested on mobile devices
   - [ ] Verified accessibility
   
   ## Screenshots
   (if applicable)
   
   ## Related Issues
   Fixes #123
   ```

4. **Address review feedback** promptly and professionally

5. **Keep PR updated** with upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   git push --force-with-lease origin feature/your-feature-name
   ```

### PR Review Process

- A maintainer will review your PR within 1-3 days
- Address all feedback before the PR can be merged
- At least one approval is required
- All CI checks must pass (lint, type-check, build)
- Squash commits when merging (done by maintainer)

## Testing Guidelines

### Manual Testing

Before submitting a PR, test these scenarios:

1. **Page Loading**:
   - All pages load without errors
   - No console errors or warnings
   - Images and assets load correctly

2. **Responsive Design**:
   - Test on desktop (1920px, 1366px)
   - Test on tablet (768px)
   - Test on mobile (375px, 414px)
   - Test landscape and portrait

3. **Navigation**:
   - All links work correctly
   - Navigation menu works on mobile
   - Back button works as expected

4. **Forms** (if applicable):
   - Form validation works
   - Error messages display correctly
   - Success states work

5. **Browser Testing**:
   - Chrome/Edge (Chromium)
   - Firefox
   - Safari (if available)

### Automated Testing

Run these commands before submitting:

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build test
npm run build

# Format check
npm run format
```

## Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Good ✓
feat(scholarships): add filter by deadline
fix(nav): mobile menu not closing on route change
docs(readme): update deployment instructions
style(css): improve button hover effects
refactor(components): extract Header component
perf(images): add lazy loading to gallery
test(api): add tests for scholarship API
chore(deps): update Next.js to 15.0.0
ci(actions): add automated testing workflow

# Avoid ✗
update stuff
fixed bug
changes
wip
```

### Best Practices

- Use imperative mood ("add" not "added" or "adds")
- Keep subject line under 50 characters
- Capitalize first letter of subject
- No period at end of subject
- Separate subject from body with blank line
- Wrap body at 72 characters
- Explain what and why, not how

## Questions?

If you have questions:

1. Check existing [Issues](https://github.com/subammmm/civora/issues)
2. Search [Discussions](https://github.com/subammmm/civora/discussions) (if enabled)
3. Open a new issue with the "question" label
4. Email: [Contact through website](https://civora.me/contact/)

## Recognition

All contributors will be recognized in:
- GitHub contributors page
- Future CONTRIBUTORS.md file
- Project documentation

Thank you for helping make education accessible to students worldwide! 🎓🌍
