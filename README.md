# Civora

A scholarship-discovery site for Nepali students: a curated list of scholarships a Nepali citizen can actually apply to, with deadlines, eligibility, coverage and links to the official application pages. Entries checked against their official source carry the date they were verified.

## What it does

- **Scholarship list** (`/scholarships`) with search and filters for level, country, funding type and deadline. Filters live in the URL, so a view can be shared (`?level=masters&deadline=open`).
- **A page per scholarship** (`/scholarships/[id]`) with eligibility, coverage, the official link and when it was last verified.
- **Deadlines in your calendar:** an `.ics` download per scholarship, and a feed of every open deadline at `/api/scholarships/calendar.ics`.
- **Atom feed** of verified entries at `/feed.xml`.
- **Saved scholarships**, kept in the browser, exportable to a calendar file.
- **Read API** at `/api/scholarships` (see [API_DOCS.md](API_DOCS.md)).

## Running it

Needs Node 20.9 or later.

```bash
npm ci
cp .env.example .env   # every value is optional for local use
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |
| `npm test` | Unit tests (Node's built-in test runner) |

## Data

The scholarships live in [`app/scholarships/scholarships-data.js`](app/scholarships/scholarships-data.js). That file is the single source of truth for reads. To add or correct an entry, edit it there, set `lastVerified` to the date you checked the official page, and put that page in `source`.

Supabase is optional and off by default. Reads only use it when `USE_SUPABASE_READS=true`; see [docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md).

## Configuration

All variables are documented in [`.env.example`](.env.example). The ones that matter in production:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Origin used for canonical tags, the sitemap, robots.txt and feeds. Defaults to the Vercel production host, then `https://civora.me`. |
| `ADMIN_API_TOKEN` | Enables the write API (`x-admin-token` header). Unset means the write routes return 404. |
| `NEXT_PUBLIC_FORMSPREE_ID` | Form ID for the contact and footer forms. |

## Deployment

Deployed on Vercel from `main`. CI (`.github/workflows/ci.yml`) runs lint, type check and tests on every push and pull request.

## Repository notes

- `docs/archive/` holds old status and implementation notes from earlier versions of the project.
- `frontend/`, `python_backend/` and most of `public/assets/` belong to earlier versions and are not used by the current app.

## License

See [LICENSE](LICENSE).
