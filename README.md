# Digital Conferences Calendar

A static web interface for the Digital Conferences Google Calendar, built with Vite, vanilla JavaScript, and Tailwind CSS.

## Local development

### 1. Install the tools and clone the repository

Install Node.js **24.21.0** using your preferred Node version manager. The version is pinned in `.node-version` so local development and CI can use the same runtime. Install pnpm **12.9.1**, matching the `packageManager` field in `package.json`:

```sh
npm install --global pnpm@12.9.1
node --version
pnpm --version
```

The version checks should print `v24.21.0` and `12.9.1`. Alternative installation methods are covered in the [pnpm installation guide](https://pnpm.io/installation).

```sh
git clone https://github.com/clirdlf/digital-conferences-calendar.info.git
cd digital-conferences-calendar.info
pnpm install --frozen-lockfile
```

Use pnpm for dependency changes and commit the updated `pnpm-lock.yaml` with them. A frozen install deliberately fails if `package.json` and the lockfile disagree; after an intentional dependency change, run `pnpm install` to update the lockfile.

### 2. Configure the calendar feeds

Create a local environment file:

```sh
cp .env.example .env
```

In `.env`, replace `your-google-calendar-api-key` with a Google Calendar API key:

```dotenv
GOOGLE_CALENDAR_API_KEY=your-google-calendar-api-key
```

Enable the [Google Calendar API](https://developers.google.com/workspace/calendar/api/quickstart/js#enable_the_api) for the key's Google Cloud project. Allow your local development URL in its website referrer restrictions, such as `http://localhost:8080/*`. If you use `127.0.0.1` or a different port, allow that URL too. For a production preview, allow the URL printed by the preview server. Keep the API restriction limited to the Google Calendar API.

The key is included in the browser page to read the public feeds. `.env` is ignored by Git; do not commit it. The GitHub Actions repository variable does not automatically populate your local environment.

You can run tests and work on the page layout without a valid key, but loading live events requires one. Calendar setup is described in the [FullCalendar Google Calendar documentation](https://fullcalendar.io/docs/google-calendar).

### 3. Start the development server

```sh
pnpm dev
```

Vite opens the site in your browser and serves it on port **8080**. Use the URL printed in the terminal if that port is occupied. Edit files in `src/`; the browser updates as you save. Stop the server with **Ctrl+C**.

Restart the development server after changing `.env`. Shell environment variables override `.env` values; mode-specific files such as `.env.production` can provide separate build configuration.

### 4. Test and preview a production build

```sh
pnpm test
pnpm build
pnpm preview
```

Open the URL printed by the preview server. Preview serves the generated `dist/` output, so run `pnpm build` again after changing source files or the build-time calendar key.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start development with live updates |
| `pnpm test` | Run the Node.js test suite |
| `pnpm build` | Generate the production site in `dist/` |
| `pnpm preview` | Serve the latest production build locally |
| `pnpm clean` | Remove the generated `dist/` directory |

Open a pull request into `main` when your changes are ready. CI runs tests and a production build; merging to `main` deploys the site automatically.

## Deployment

`.github/workflows/ci.yml` installs the pinned tools, installs dependencies from the lockfile, runs tests, and builds the site. Pull requests into `main` are checked without deploying. Pushes to `main` upload `dist/` as a Pages artifact and deploy after the checks pass. The workflow can also be run manually; only runs on `main` deploy.

Build output in `dist/` is ignored by Git. Commit source changes and `pnpm-lock.yaml`; generated assets no longer need to be rebuilt and committed locally. `pnpm clean` removes the local build output.

In GitHub **Settings → Secrets and variables → Actions → Variables**, set the repository variable `GOOGLE_CALENDAR_API_KEY`. This is the browser-visible key for the public calendar feeds, not a server credential. Production deployment fails if the variable is missing; PRs can still validate the build without it. Restrict the key to the Google Calendar API and the site's referrers in Google Cloud.

In **Settings → Pages**, use **GitHub Actions** as the publishing source and keep the custom domain `digital-conferences-calendar.info`. Enable this before merging the migration that removes the legacy `docs/` output. The existing published site remains in place until an Actions deployment succeeds. Set the `github-pages` environment's deployment branch policy to `main` if managing environment protection rules; the workflow itself also restricts deployment to `main`.

The build copies the root `CNAME` file into `dist/` and emits `.nojekyll`. The custom domain must also be configured in GitHub Pages settings.

## Styling

Tailwind styling and theme tokens are defined in `src/css/styles.css`. ABCOtto is served from local font assets for headings; Instrument Sans is loaded through Google Fonts for body text and controls. Vite serves `src/` during development and generates the production site in `dist/`. Each build replaces the previous output, copies the social preview image from `public/`, and emits `CNAME` and `.nojekyll`.

On initial load, small screens open a rolling 30-day agenda; larger screens open the month grid. Visitors can switch views freely. Event times use the visitor’s local timezone, and the legend identifies the two feeds. Events are read-only. Select an event to read its full details in a local dialog; its Google Calendar link remains available. Modifier clicks still open the original event directly. Loading failures show a retry control and a Google Calendar fallback.

The calendar uses FullCalendar’s bundled Classic theme, with public palette variables and render-class hooks customized in `src/css/styles.css` and `src/js/calendar-config.js`. Inline SVG icons retain their original shapes without an icon font dependency; their license is in `public/icons-LICENSE.txt`.

For calendar customization, see the [FullCalendar documentation](https://fullcalendar.io/).
