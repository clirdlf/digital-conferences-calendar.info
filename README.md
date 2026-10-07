# Digital Conferences Calendar

A static web interface for the Digital Conferences Google Calendar, built with Vite, vanilla JavaScript, and Tailwind CSS.

## CNAME

The `build` script automatically copies the `CNAME` file into `dist/`. The custom domain is also configured in the repository's GitHub Pages settings.

## Development

* Use Node.js 24.21.0 (pinned in `.node-version`) and pnpm 12.9.1 (pinned in `package.json`)
* Clone the repo
* Install the dependencies (`pnpm install --frozen-lockfile`)
* Start the web server (`pnpm dev`)
* Edit files in the `src/` directory and preview changes via `pnpm dev`
* Run tests (`pnpm test`)
* Build for production (`pnpm build`)
* Preview the production build (`pnpm preview`)
* Open a pull request into `main`; CI runs tests and a production build
* Merge to `main` to deploy automatically to GitHub Pages

## Deployment

`.github/workflows/ci.yml` installs the pinned tools, installs dependencies from the lockfile, runs tests, and builds the site. Pull requests into `main` are checked without deploying. Pushes to `main` upload `dist/` as a Pages artifact and deploy after the checks pass. The workflow can also be run manually; only runs on `main` deploy.

Build output in `dist/` is ignored by Git. Commit source changes and `pnpm-lock.yaml`; generated assets no longer need to be rebuilt and committed locally. `pnpm clean` removes the local build output.

In GitHub **Settings → Secrets and variables → Actions → Variables**, set the repository variable `GOOGLE_CALENDAR_API_KEY`. This is the browser-visible key for the public calendar feeds, not a server credential. Production deployment fails if the variable is missing; PRs can still validate the build without it. Restrict the key to the Google Calendar API and the site's referrers in Google Cloud.

In **Settings → Pages**, use **GitHub Actions** as the publishing source and keep the custom domain `digital-conferences-calendar.info`. Enable this before merging the migration that removes the legacy `docs/` output. The existing published site remains in place until an Actions deployment succeeds. Set the `github-pages` environment's deployment branch policy to `main` if managing environment protection rules; the workflow itself also restricts deployment to `main`.

## Styling

Tailwind styling and theme tokens are defined in `src/css/styles.css`. ABCOtto is served from local font assets for headings; Instrument Sans is loaded through Google Fonts for body text and controls. Vite serves `src/` during development and generates the production site in `dist/`. Each build replaces the previous output, copies the social preview image from `public/`, and emits `CNAME` and `.nojekyll`.

On initial load, small screens open a rolling 30-day agenda; larger screens open the month grid. Visitors can switch views freely. Event times use the visitor’s local timezone, and the legend identifies the two feeds. Events are read-only. Select an event to read its full details in a local dialog; its Google Calendar link remains available. Modifier clicks still open the original event directly. Loading failures show a retry control and a Google Calendar fallback.

The calendar uses FullCalendar’s bundled Classic theme, with public palette variables and render-class hooks customized in `src/css/styles.css` and `src/js/calendar-config.js`. Inline SVG icons retain their original shapes without an icon font dependency; their license is in `public/icons-LICENSE.txt`.

And the [FullCalendar Documentation](https://fullcalendar.io/)

## Google Calendar

See [FullCalendar docs](https://fullcalendar.io/docs/google-calendar) (especially the setup for API calls)
Copy `.env.example` to `.env` and set `GOOGLE_CALENDAR_API_KEY`, or provide that variable in the shell/build environment. Shell variables take precedence over `.env` files. Vite also supports mode-specific files such as `.env.production`. Restart the development server after changing these values.

This key is included in the public page to access the public Google Calendar feeds. Restrict it to the Google Calendar API and the appropriate website referrers in Google Cloud.
