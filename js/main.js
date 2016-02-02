$(document).ready(function() {

  $('#calendar').fullCalendar({

    // THIS KEY WON'T WORK IN PRODUCTION!!!
    // To make your own Google API key, follow the directions here:
    // http://fullcalendar.io/docs/google_calendar/
    googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    // googleCalendarApiKey: 'g2hval0pee3rmrv4f3n9hp9cok',

    // US Holidays
    // events: 'usa__en@holiday.calendar.google.com',

    eventClick: function(event) {
      // opens events in a popup window
      window.open(event.url, 'gcalevent', 'width=100%,height=600');
      return false;
    },

    loading: function(bool) {
      $('#loading').toggle(bool);
    }

  });

});
