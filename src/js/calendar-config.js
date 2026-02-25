const GOOGLE_CALENDAR_API_KEY = 'AIzaSyA5W2MDJs9uknQv6Cn4OZ07K-wtvkoqYwE';

function getEventSources() {
  return [
    {
      googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
      className: 'dlf-community-events',
      color: '#2778c8'
    },
    {
      googleCalendarId: '1nlqihbdhsca7r7npe93so66kk@group.calendar.google.com',
      className: 'dlf-zoom',
      color: '#EF6C00'
    }
  ];
}

function createCalendarOptions(plugins) {
  return {
    plugins,
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    googleCalendarApiKey: GOOGLE_CALENDAR_API_KEY,
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    eventSources: getEventSources()
  };
}

module.exports = {
  GOOGLE_CALENDAR_API_KEY,
  createCalendarOptions,
  getEventSources
};
