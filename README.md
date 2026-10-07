# Digital Conferences Calendar

A static web interface for the Digital Conferences Google Calendar, built with Vite, vanilla JavaScript, and Bootstrap.

## CNAME

The `build` script automatically copies the `CNAME` file into `docs/`.

## Development

* Use Node.js 22.12+ and pnpm
* Clone the repo
* Install the dependencies (`pnpm install`)
* Start the web server (`pnpm dev`)
* Edit files in the `src/` directory and preview changes via `pnpm dev`
* Run tests (`pnpm test`)
* Build for production (`pnpm build`)
* Preview the production build (`pnpm preview`)
* Push (`git push`)

## Bootstrap

Bootstrap styling is compiled from `src/scss/styles.scss`. Vite serves `src/` during development and generates the production site in `docs/`. Each build replaces the previous output, copies the social preview image from `public/`, and emits `CNAME` and `.nojekyll`.

Documentation on FullCalendar [bootstrap theme](https://fullcalendar.io/docs/bootstrap5).

And the [FullCalendar Documentation](https://fullcalendar.io/)

## Google Calendar

See [FullCalendar docs](https://fullcalendar.io/docs/google-calendar) (especially the setup for API calls)
Copy `.env.example` to `.env` and set `GOOGLE_CALENDAR_API_KEY`, or provide that variable in the shell/build environment. Shell variables take precedence over `.env` files. Vite also supports mode-specific files such as `.env.production`. Restart the development server after changing these values.

This key is included in the public page to access the public Google Calendar feeds. Restrict it to the Google Calendar API and the appropriate website referrers in Google Cloud.
