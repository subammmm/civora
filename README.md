# 🌍 Civora — Static Website

This repository contains a simple, responsive static site with the exact content you specified:
- Home
- Scholarships
- Citizenship & Residency
- Application Guides & Templates
- About (with Quick Build Steps and Minerva documentation notes)

## Quick Start

1. Enable GitHub Pages:
   - Go to Settings → Pages → Source: Deploy from a branch → Branch: `main` (root) → Save.
2. Visit the published URL (it will appear in the Pages section). It should be: https://subammmm.github.io/civora

## Customize

- Scholarships page:
  - Replace the Google Sheet iframe `src` with your own embed link:
    - In Google Sheets: File → Share → Publish to the web → Embed → copy the URL and paste into `scholarships.html`.

- Branding:
  - Update the site title in each HTML `<title>` tag.
  - Replace the emoji favicon by updating the `<link rel="icon">` in `index.html` (and others if you prefer a file-based favicon).

- Styling:
  - Edit `assets/style.css` to adjust colors, spacing, or layout.

## Local Preview

You can open `index.html` directly in your browser.
For a local server, use:

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```

## Content Sources

All textual content reflects your provided content pack, renamed to "Civora".

## Spotify Integration


### Features:
- **Three curated playlists**: Focus & Concentration, Instrumental Study, and Ambient Sounds
- **Responsive design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Multi-language support**: Translated into all supported languages

### Implementation:
- Embedded Spotify iframe players using official Spotify embed API
- Custom CSS styling that matches the site's design language
- Dedicated JavaScript module (`spotify-integration.js`) for enhanced functionality
- Analytics-ready playlist tracking (console logging for development)

### Usage:

### Technical Details:
- Uses Spotify's official embed URLs with `utm_source=generator` for tracking
- Implements lazy loading for improved page performance  
- Includes proper iframe attributes for security and accessibility
- Responsive grid layout that adapts to different screen sizes