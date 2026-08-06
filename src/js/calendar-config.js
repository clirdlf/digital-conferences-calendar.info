export function getEventSources() {
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

export function createCalendarOptions(plugins, googleCalendarApiKey) {
  return {
    plugins,
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    googleCalendarApiKey,
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    eventSources: getEventSources()
  };
}
