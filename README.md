# Digital Conferences Calendar

Web interface wrapping the Digital Conferences Google Calendar built using es6 build system.

## Deployment output

The `build` script recreates `docs/` from scratch and copies `CNAME` and `.nojekyll` into it. Do not edit files in `docs/` directly; make changes in `src/` or the root deployment files and rebuild instead.

## Development

This project uses pnpm. The supported pnpm version is declared in `package.json` and can be activated with [Corepack](https://nodejs.org/api/corepack.html):

```sh
corepack enable
corepack install
```

* Clone the repo
* Install the dependencies (`pnpm install --frozen-lockfile`)
* Start the web server (`pnpm start`)
* Edit files in the `src/` directory and preview changes via `pnpm start`
* Run the tests (`pnpm test`)
* Build for production (`pnpm build`)
* Push (`git push`)

## Bootstrap

This was the starting template for the Bootstrap 5 build system: <https://getbootstrap.com/docs/5.3/getting-started/webpack/>

Documentation on FullCalendar [bootstrap theme](https://fullcalendar.io/docs/bootstrap5).

And the [FullCalendar Documentation](https://fullcalendar.io/)

## Google Calendar

See [FullCalendar docs](https://fullcalendar.io/docs/google-calendar) (especially the setup for API calls)
Set your Google Calendar API key in the `GOOGLE_CALENDAR_API_KEY` environment variable before running or building the project.
