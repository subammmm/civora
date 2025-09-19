# 🌍 Civora — Static Website

This repository contains a simple, responsive static site with the exact content you specified:
- Home
- Scholarships
- Citizenship & Residency
- IELTS & Prep
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