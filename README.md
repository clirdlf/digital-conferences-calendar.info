# Digital Conferences Calendar

A static web interface for the Digital Conferences Google Calendar, built with Vite, vanilla JavaScript, and Tailwind CSS.

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

## Styling

Tailwind styling and theme tokens are defined in `src/css/styles.css`. The breakpoints, container widths, typography, and button colors preserve the original page design. Vite serves `src/` during development and generates the production site in `docs/`. Each build replaces the previous output, copies the social preview image from `public/`, and emits `CNAME` and `.nojekyll`.

On initial load, small screens open a rolling 30-day agenda; larger screens open the month grid. Visitors can switch views freely. Event times use the visitor’s local timezone, and the legend identifies the two feeds. Events are read-only. Select an event to read its full details in a local dialog; its Google Calendar link remains available. Modifier clicks still open the original event directly. Loading failures show a retry control and a Google Calendar fallback.

The calendar uses FullCalendar’s bundled Classic theme, with public palette variables and render-class hooks customized in `src/css/styles.css` and `src/js/calendar-config.js`. Inline SVG icons retain their original shapes without an icon font dependency; their license is in `public/icons-LICENSE.txt`.

And the [FullCalendar Documentation](https://fullcalendar.io/)

## Google Calendar

See [FullCalendar docs](https://fullcalendar.io/docs/google-calendar) (especially the setup for API calls)
Copy `.env.example` to `.env` and set `GOOGLE_CALENDAR_API_KEY`, or provide that variable in the shell/build environment. Shell variables take precedence over `.env` files. Vite also supports mode-specific files such as `.env.production`. Restart the development server after changing these values.

This key is included in the public page to access the public Google Calendar feeds. Restrict it to the Google Calendar API and the appropriate website referrers in Google Cloud.
