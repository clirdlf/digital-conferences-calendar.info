# Digital Conferences Calendar

Web interface wrapping the Digital Conferences Google Calendar built using es6 build system.

## CNAME

The `build` script automatically copies the `CNAME` file into `docs/`.

## Development

* Clone the repo
* Install the dependencies (`pnpm install`)
* Start the web server (`pnpm dev`)
* Edit files in the `src/` directory and preview changes via `pnpm dev`
* Run tests (`pnpm test`)
* Build for production (`pnpm build`)
* Push (`git push`)

## Bootstrap

This was the starting template for the Bootstrap 5 build system: <https://getbootstrap.com/docs/5.3/getting-started/webpack/>

Documentation on FullCalendar [bootstrap theme](https://fullcalendar.io/docs/bootstrap5).

And the [FullCalendar Documentation](https://fullcalendar.io/)

## Google Calendar

See [FullCalendar docs](https://fullcalendar.io/docs/google-calendar) (especially the setup for API calls)
Set your Google Calendar API key in the `GOOGLE_CALENDAR_API_KEY` environment variable before running or building the project.
