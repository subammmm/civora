# Civora Static Website Development Guide


**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Quick Setup and Local Development
- No installation required - this is a static HTML/CSS/JavaScript website
- **Local server (recommended)**: `python3 -m http.server 8080` 
  - Server starts instantly (< 1 second)
  - Navigate to `http://localhost:8080/`
  - **ALWAYS** use this method for testing changes
- **Direct file access**: Open `index.html` directly in browser (file:// protocol works but limits some features)
- **Stop server**: Use `Ctrl+C` or `pkill -f "python3 -m http.server"`

### Repository Structure
```
/home/runner/work/civora/civora/
├── index.html              # Homepage
├── about.html             # About page with build instructions
├── scholarships.html      # Scholarships database with Google Sheets embed
├── citizenship.html       # Citizenship & residency pathways
├── guides.html           # Application guides & templates
├── assets/
│   ├── style.css         # Main stylesheet (97 lines)
│   └── script.js         # JavaScript with i18n support (606 lines)
├── .nojekyll            # GitHub Pages configuration
└── README.md            # Basic project documentation
```

### No Build Process Required
- **CRITICAL**: This is a static website with NO build step
- No package.json, no npm install, no compilation needed
- Changes to HTML/CSS/JS are immediately visible when served
- Total repository size: ~296KB

## Validation and Testing

### Manual Validation Requirements
**ALWAYS perform these validation steps after making any changes:**

1. **Start local server**: `python3 -m http.server 8080`
2. **Test all pages load correctly**:
   - Homepage: `http://localhost:8080/`
   - Scholarships: `http://localhost:8080/scholarships.html`
   - Citizenship: `http://localhost:8080/citizenship.html`
   - Guides: `http://localhost:8080/guides.html`
   - About: `http://localhost:8080/about.html`

3. **Test core functionality**:
   - Navigation menu (including mobile toggle)
   - All internal links work
   - External links in scholarships page
   - Responsive design on different screen sizes
   - Multi-language toggle (if implementing i18n features)

4. **Browser testing**: Test in at least one modern browser (Chrome, Firefox, Safari, Edge)

### Validation Commands
```bash
# Verify all HTML files are valid
file *.html

# Check file sizes and line counts
du -sh . && wc -l *.html assets/*

# Test server startup
python3 -m http.server 8080 &
curl -s http://localhost:8080/ | head -10
pkill -f "python3 -m http.server"
```

### Content Validation
- **Google Sheets embed**: Verify the iframe in `scholarships.html` loads correctly
- **All links**: Click through every link to ensure they work
- **Mobile responsive**: Test mobile navigation menu functionality
- **JavaScript features**: Verify footer year updates and mobile menu toggle

## Common Development Tasks

### Making Content Changes
- **Page content**: Edit the respective HTML file directly
- **Styling**: Modify `assets/style.css`
- **Interactive features**: Update `assets/script.js`
- **Navigation**: Update the nav section in each HTML file (keep consistent across pages)

### Adding New Pages
1. Create new HTML file following existing structure
2. Copy header/footer from existing pages
3. Add navigation link to all existing pages
4. Test all internal navigation still works

### Customizing Scholarships
- Replace the Google Sheet iframe `src` in `scholarships.html`
- Instructions are in the README.md and embedded in the page itself

### Styling Changes
- CSS variables are defined in `:root` at top of `assets/style.css`
- Responsive breakpoint: `@media (max-width: 760px)`
- All styles use utility-first approach with semantic class names

## Deployment

### GitHub Pages (Primary Deployment)
- **Automatic deployment**: Pushes to `main` branch auto-deploy
- **URL**: https://subammmm.github.io/civora
- **Configuration**: Already configured (`.nojekyll` file present)
- **No build step required**: GitHub Pages serves static files directly

### Deployment Validation
After pushing changes:
1. Wait 1-2 minutes for GitHub Pages to update
2. Visit the live site URL
3. Test the same validation scenarios as local development
4. Verify all changes are reflected correctly

## Troubleshooting

### Common Issues
- **Port in use**: If `python3 -m http.server 8080` fails, try port 8081 or kill existing processes with `pkill -f "python3 -m http.server"`
- **Google Sheets not loading**: Check iframe src URL and ensure sheet is published to web
- **Mobile menu not working**: Verify JavaScript is loading correctly in browser dev tools
- **Fonts not loading**: Check Google Fonts links in HTML head sections

### File Permissions
- All files should be readable: `chmod 644 *.html assets/*`
- No executable permissions needed for static files

## Key Development Guidelines

### Code Style
- **HTML**: Use semantic HTML5 elements
- **CSS**: Follow existing BEM-like naming conventions
- **JavaScript**: Use vanilla JS (no frameworks)
- **Indentation**: 2 spaces throughout

### Internationalization
- Text content uses `data-i18n` attributes
- Translations defined in `assets/script.js` in the `I18N` object
- Currently supports English with framework for additional languages

### Performance Considerations
- **Images**: Optimize images before adding (site has no images currently)
- **CSS/JS**: Keep files lightweight (current total < 25KB)
- **External dependencies**: Minimize use (only Google Fonts currently)

## Content Guidelines

### Maintaining Accuracy
- **Scholarship links**: Always verify external scholarship links work
- **Visa information**: Keep citizenship/residency information current
- **Templates**: Verify downloadable resources in guides section

### Professional Tone
- Keep content factual and professional
- Avoid marketing language or testimonials (as noted in mission)
- Verify all information with official sources
- Update copyright year automatically (handled by JavaScript)

## Emergency Procedures

### Reverting Changes
```bash
# View recent changes
git log --oneline -10

# Revert specific file
git checkout HEAD~1 -- filename.html

# Revert entire commit
git revert <commit-hash>
```

### Quick Health Check
```bash
# Verify site structure
ls -la *.html assets/

# Test server functionality
python3 -m http.server 8080 &
sleep 2
curl -I http://localhost:8080/
pkill -f "python3 -m http.server"
```

Remember: This is a static website designed for simplicity and reliability. Changes are immediate, testing is manual, and deployment is automatic via GitHub Pages.