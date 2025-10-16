# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CONTRIBUTING.md with comprehensive contribution guidelines
- CHANGELOG.md to track version history
- Enhanced documentation structure

## [1.0.0] - 2024-10-16

### Major Milestone
- Successfully migrated from static HTML/CSS/JS to Next.js 14
- Full production deployment on Vercel (civora.me)
- Dual deployment strategy (Vercel + GitHub Pages)

### Added
- Next.js 14 with App Router architecture
- TypeScript support and type checking
- ESLint and Prettier for code quality
- GitHub Actions CI/CD pipeline
- Automated deployment to GitHub Pages
- Dependabot for automatic dependency updates
- AI-powered chat assistant (optional, environment-controlled)
- Comprehensive SEO metadata on all pages
- Structured data (JSON-LD) for search engines
- Dynamic scholarship filtering system
- Contact form with validation
- Psychometric quiz for pathway recommendations
- Pathway builder tool
- IELTS preparation resources
- Student stories section
- Blog section
- Roadmap page
- Privacy policy page
- Students supported counter

### Changed
- Converted all static HTML pages to React components
- Migrated to component-based architecture
- Improved navigation with client-side routing
- Enhanced mobile responsiveness
- Optimized asset loading and performance
- Updated deployment process to automated workflow

### Fixed
- 308 redirect issues with API routes (trailing slash handling)
- Mobile menu toggle functionality
- OpenAI API rate limiting (migrated to Gemini + LangSearch)
- Build errors in production deployments
- CORS issues with API routes
- Environment variable handling

### Security
- Removed OpenAI API dependency (cost and security concerns)
- Enhanced API route validation
- Improved error handling with detailed logging
- Secure environment variable management

## [0.9.0] - 2024-09 (Pre-Next.js)

### Added
- Original static HTML/CSS/JS website
- Scholarship database with Google Sheets integration
- Citizenship and visa pathways information
- Application guides and templates
- Multi-language support (English/Nepali)
- Responsive design
- Mobile navigation menu
- Footer with dynamic year
- Basic SEO metadata

### Features (Legacy Static Site)
- 5 main pages (Home, Scholarships, Citizenship, Guides, About)
- Scholarship data embedded via Google Sheets iframe
- Static downloadable resources
- Firebase analytics integration (optional)
- Manual deployment via GitHub Pages

## Version History Summary

| Version | Date | Type | Description |
|---------|------|------|-------------|
| 1.0.0 | 2024-10 | Major | Next.js migration, full production release |
| 0.9.0 | 2024-09 | Beta | Original static site launch |

## Migration Notes

### Breaking Changes in v1.0.0

If you were using the static HTML version:

1. **File Structure**: 
   - HTML files moved to `app/` directory as React components
   - Assets moved to `public/assets/`
   - No more `index.html`, `scholarships.html`, etc.

2. **URLs**: 
   - All URLs now use trailing slashes (e.g., `/scholarships/` not `/scholarships`)
   - No `.html` extension in URLs

3. **JavaScript**:
   - Client-side scripts now in React components
   - Module-based architecture
   - No global `script.js` file

4. **Deployment**:
   - Requires Node.js build process
   - GitHub Actions handles deployment automatically
   - No manual HTML editing

### Upgrade Guide

For developers familiar with the static version:

1. **Clone the repository** and install dependencies:
   ```bash
   git pull origin main
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Learn Next.js basics**:
   - Pages are in `app/` directory
   - Each page is a React component
   - Routing is file-system based
   - See [CONTRIBUTING.md](./CONTRIBUTING.md) for details

4. **Build and deploy**:
   ```bash
   npm run build
   # Deployment happens automatically via GitHub Actions
   ```

## Roadmap

### Planned Features

#### v1.1.0 (Next Release)
- [ ] Enhanced scholarship filtering with saved searches
- [ ] User accounts for personalized recommendations
- [ ] Scholarship application tracking
- [ ] Email notifications for deadlines
- [ ] Mobile app (React Native)

#### v1.2.0
- [ ] Community forum for students
- [ ] Mentor matching system
- [ ] Application review service
- [ ] Scholarship success stories
- [ ] Interview preparation resources

#### v2.0.0
- [ ] Full internationalization (Nepali, Hindi, etc.)
- [ ] Partnership with universities
- [ ] Verified scholarship badges
- [ ] Application analytics dashboard
- [ ] API for third-party integrations

### Performance Goals
- [ ] Lighthouse score 95+ on all metrics
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Core Web Vitals: All green

### Accessibility Goals
- [ ] WCAG 2.1 Level AA compliance
- [ ] Full keyboard navigation
- [ ] Screen reader optimized
- [ ] Multiple language support

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

**Note**: This changelog started with version 1.0.0 (Next.js migration). For changes before that, refer to git history of the static HTML version.

**Legend**:
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes
