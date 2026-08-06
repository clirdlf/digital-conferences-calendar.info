# DLF Community Calendar

A static web interface for the Digital Library Federation community Google Calendars. It uses FullCalendar, Bootstrap, Sass, and Webpack and is published through GitHub Pages from `docs/`.

## Requirements

- Node.js 24 or newer
- pnpm 11.20.0, as declared by the `packageManager` field in `package.json`
- A Google Calendar API key for loading calendar events

Activate the repository's pinned pnpm version with Corepack:

```sh
corepack enable
corepack install
```

## Setup

Clone the repository, install the locked dependencies, and create the local environment file:

```sh
pnpm install --frozen-lockfile
cp .env.example .env
```

Set `GOOGLE_CALENDAR_API_KEY` in `.env`. Because the key is embedded in a browser application, restrict it in Google Cloud to the required API and the application's allowed HTTP referrers.

Start the development server at <http://localhost:8080>:

```sh
pnpm start
```

## Development commands

| Command             | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| `pnpm start`        | Start the Webpack development server and open the site. |
| `pnpm lint`         | Check maintained JavaScript with ESLint.                |
| `pnpm format`       | Format maintained files with Prettier.                  |
| `pnpm format:check` | Verify formatting without changing files.               |
| `pnpm test`         | Run the Node test suite.                                |
| `pnpm build`        | Recreate the production site in `docs/`.                |

Before opening a pull request, run:

```sh
pnpm lint
pnpm format:check
pnpm test
pnpm build
```

The same checks run in GitHub Actions for pushes and pull requests.

## Project structure

| Path                 | Contents                                           |
| -------------------- | -------------------------------------------------- |
| `src/index.html`     | Source HTML template.                              |
| `src/js/`            | Calendar configuration and browser initialization. |
| `src/scss/`          | Bootstrap customization and site styles.           |
| `test/`              | Unit tests using Node's built-in test runner.      |
| `webpack.config.cjs` | Development and production build configuration.    |
| `docs/`              | Generated GitHub Pages deployment output.          |

## Calendar configuration

Calendar feed IDs, colors, and class names are defined in `src/js/calendar-config.js`. FullCalendar options are assembled in the same module and covered by unit tests.

Useful upstream documentation:

- [FullCalendar Google Calendar integration](https://fullcalendar.io/docs/google-calendar)
- [FullCalendar Bootstrap theme](https://fullcalendar.io/docs/bootstrap5)
- [Bootstrap Webpack guide](https://getbootstrap.com/docs/5.3/getting-started/webpack/)

## Deployment output

`pnpm build` cleans and recreates `docs/`, including `CNAME` and `.nojekyll`. Never edit generated files in `docs/` directly; change files under `src/` or the root deployment files and rebuild.

Commit the regenerated `docs/` output with the source changes that produced it so the GitHub Pages site remains synchronized with the application.
