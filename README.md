# Digital Conferences Calendar

Web interface wrapping the Digital Conferences Google Calendar.

## Installing

This uses `jekyll` for the build (but there's only one page).

    jekyll serve -l

## Adding additional calendars

You can add additional `eventSources` to the calendar in `js/main.js`. Find the [eventSources](https://fullcalendar.io/docs/eventSources) and add a new [Event Source Object](https://fullcalendar.io/docs/event-source-object).

```javascript
eventSources: [{
    googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
    className: 'dlf-community-events',
    color: '#3a87ad'
  },
  {
    googleCalendarId: '1nlqihbdhsca7r7npe93so66kk@group.calendar.google.com',
    className: 'dlf-zoom',
    color: '#EF6C00',
  }
],
```
