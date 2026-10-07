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

function createCalendarOptions(plugins, googleCalendarApiKey, { isMobile = false } = {}) {
  return {
    plugins,
    initialView: isMobile ? 'listUpcoming' : 'dayGridMonth',
    timeZone: 'local',
    height: 'auto',
    buttons: { listUpcoming: { text: 'Agenda', hint: 'Agenda view' } },
    todayHint: 'Return to today',
    prevHint: 'Previous date range',
    nextHint: 'Next date range',
    views: {
      listUpcoming: {
        type: 'list',
        duration: { days: 30 },
        dateIncrement: { days: 30 }
      },
      list: {
        listItemEventClass: 'agenda-event',
        listItemEventTimeClass: 'agenda-event-time',
        listItemEventTitleClass: 'agenda-event-title'
      }
    },
    toolbarClass: 'calendar-toolbar',
    toolbarSectionClass: 'calendar-toolbar-section',
    toolbarTitleClass: 'calendar-title',
    buttonClass: 'calendar-button',
    buttonGroupClass: 'calendar-button-group',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listUpcoming'
    },
    googleCalendarApiKey,
    navLinks: true,
    editable: false,
    dayMaxEvents: true,
    eventSources: getEventSources()
  };
}

export {
  createCalendarOptions,
  getEventSources
};
