# Digital Conferences Calendar

Web interface wrapping the Digital Conferences Google Calendar.

## Installing

This site uses SCSS for styles. You'll need the `sass` gem.

```
$ gem install sass
```

You can then have the SCSS automagically compile when you save with:

```
$ sass --watch _sass:css
```

## Adding additional calendars

You can add additional `eventSources` to the calendar in `js/main.js`. Find the [eventSources](https://fullcalendar.io/docs/eventSources) and add a new [Event Source Object](https://fullcalendar.io/docs/event-source-object).

```javascript
eventSources: [{
    googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
    className: 'dlf-community-events',
  },
  {
    googleCalendarId: '1nlqihbdhsca7r7npe93so66kk@group.calendar.google.com',
    className: 'dlf-zoom',
    color: '#EF6C00',
  }
],
```
