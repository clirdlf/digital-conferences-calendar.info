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

function createCalendarOptions(plugins, googleCalendarApiKey) {
  return {
    plugins,
    toolbarClass: 'calendar-toolbar',
    toolbarSectionClass: 'calendar-toolbar-section',
    toolbarTitleClass: 'calendar-title',
    buttonClass: 'calendar-button',
    buttonGroupClass: 'calendar-button-group',
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

export {
  createCalendarOptions,
  getEventSources
};
