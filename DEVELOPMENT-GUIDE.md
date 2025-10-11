# Civora Development Guide

> **Quick Start**: This is a Next.js 14 project. Run `npm install` then `npm run dev` to start developing.

## Overview

Civora is built with **Next.js 14** using the App Router architecture. The site is statically exported and deployed to GitHub Pages via automated CI/CD workflows.

**Key Facts**:
- ✅ Next.js 14 with App Router
- ✅ Static site generation (no server required)
- ✅ Automated deployment via GitHub Actions
- ✅ TypeScript support with type checking
- ✅ ESLint and Prettier for code quality
- ✅ Deployed at https://civora.me

## Development Workflow

### Prerequisites

- Node.js 20.x (see `.nvmrc`)
- npm (comes with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/subammmm/civora.git
cd civora

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000/
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Production Build
npm run build            # Build static site to out/
npm run start            # Start Next.js production server (not used for deployment)

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
npm run format           # Check code formatting with Prettier
npm run format:write     # Auto-format code with Prettier
```

### Testing Changes Locally

#### Development Mode
```bash
npm run dev
# Visit http://localhost:3000/
# Changes auto-reload
```

#### Production Build
```bash
npm run build
cd out
python3 -m http.server 8080
# Visit http://localhost:8080/
```

## Project Structure

```
civora/
├── app/                      # Next.js App Router pages
│   ├── layout.js            # Root layout (Header/Footer)
│   ├── page.js              # Homepage
│   ├── globals.css          # Global styles
│   ├── scholarships/        # Scholarships page
│   │   └── page.js
│   ├── citizenship/         # Citizenship page
│   │   └── page.js
│   ├── about/               # About page
│   │   └── page.js
│   └── [other pages]/       # Additional pages
├── public/                  # Static assets (deployed as-is)
│   ├── assets/             # Images, CSS, JS
│   ├── CNAME               # Custom domain config
│   ├── .nojekyll           # GitHub Pages config
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
├── legacy/                  # Archived static HTML (NOT deployed)
├── .github/workflows/       # CI/CD automation
│   ├── ci.yml              # Lint and type-check
│   └── deploy-pages.yml    # Build and deploy
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
└── README.md               # Project overview
```

## Making Changes

### Adding or Editing Pages

Pages are React components in the `app/` directory:

```javascript
// app/new-page/page.js
export const metadata = {
  title: 'New Page - Civora',
  description: 'Description of the new page',
};

export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
      <p>Content goes here</p>
    </main>
  );
}
```

The URL will be: `https://civora.me/new-page/`

### Editing Header/Footer

Header and footer are defined in `app/layout.js`. Changes here affect all pages.

### Adding Static Assets

Place files in `public/` directory:
- Images: `public/assets/images/`
- CSS: `public/assets/` (but prefer CSS modules or globals.css)
- JavaScript: `public/assets/` (but prefer React components)

Reference in code as `/assets/filename.ext`

### Styling

- **Global styles**: Edit `app/globals.css`
- **Component styles**: Use CSS modules or inline styles in React components
- **Existing CSS**: Some CSS is in `public/assets/` for compatibility

## Deployment

### Automatic Deployment (Recommended)

1. Push changes to `main` branch
2. GitHub Actions automatically:
   - Runs linting and type checking
   - Builds the Next.js site
   - Deploys to GitHub Pages
3. Site updates at https://civora.me within 1-2 minutes

### Manual Deployment

```bash
# Build the site
npm run build

# The out/ directory contains the complete static site
# Deploy contents of out/ to any static hosting
```

## Configuration

### Next.js Config (`next.config.js`)

```javascript
{
  output: 'export',           // Static site generation
  trailingSlash: true,        // Directory-style URLs (/page/)
  images: { unoptimized: true }, // GitHub Pages compatibility
  reactStrictMode: true       // React best practices
}
```

### GitHub Pages

The site is configured to deploy from GitHub Actions. The workflow:
1. Triggers on push to `main`
2. Installs dependencies
3. Builds with `npm run build`
4. Uploads `out/` directory
5. Deploys to GitHub Pages

Required files in build output:
- `CNAME` - Custom domain (civora.me)
- `.nojekyll` - Disables Jekyll processing
- `404.html` - Custom 404 page
- All page HTML files
- All assets

## Troubleshooting

### Build Fails

```bash
# Check for linting errors
npm run lint

# Check for type errors
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run build
```

### Local Development Issues

```bash
# Clear all caches and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Deployment Issues

Check the GitHub Actions workflow logs:
- Go to repository → Actions tab
- Click on the latest workflow run
- Review build and deploy logs

## Code Quality

### Before Committing

Always run before creating a pull request:

```bash
npm run lint           # Check for code issues
npm run type-check     # Check for type errors
npm run format         # Verify formatting
npm run build          # Ensure build works
```

### ESLint Configuration

The project uses `eslint-config-next` which includes:
- React best practices
- Next.js specific rules
- Accessibility rules
- Import order rules

Some warnings are expected (e.g., using `<img>` instead of `<Image>`). These are recommendations, not errors.

## Legacy Files

The `legacy/` directory contains the original static HTML files before the Next.js migration. These files:
- Are **NOT deployed** to production
- Are preserved for reference only
- Should **NOT be edited** - make changes in `app/` instead

## Support

For issues or questions:
- Check documentation in this file
- Review README.md for project overview
- Check GitHub Issues for existing problems
- Create a new issue if needed

## Migration History

This project was migrated from static HTML/CSS/JS to Next.js 14 in October 2024. The migration preserved:
- All original content and design
- URL structure (with trailing slashes)
- Custom domain (civora.me)
- All assets and functionality
- SEO metadata and structured data

And improved:
- Modern React-based architecture
- Better build tooling and development experience
- Optimized performance with Next.js
- Automated deployment via GitHub Actions
- Type-safe routing with App Router
- CI/CD with automated quality checks
