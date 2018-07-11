$(document).ready(function() {
    var initialLocaleCode = 'en';

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month, listDay, listWeek,'
        },

        themeSystem: 'bootstrap4',

        // locale: initialLocaleCode, // Internationalization

        // displayEventTime: false, // don't show the time column in list view
        // customize the button names,
          // otherwise they'd all just say "list"
          views: {
            listDay: { buttonText: 'list day' },
            listWeek: { buttonText: 'list week' }
          },
          // navLinks: true,

        // THIS KEY WON'T WORK IN PRODUCTION!!!
        // To make your own Google API key, follow the directions here:
        // http://fullcalendar.io/docs/google_calendar/
        //googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
        googleCalendarApiKey: 'AIzaSyA5W2MDJs9uknQv6Cn4OZ07K-wtvkoqYwE',

        // US Holidays
        // events: 'usa__en@holiday.calendar.google.com',
        // events: {
        //     googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
        //     className: 'community-calendar',
        // },
        // c9n96oka3aaha4499lnq4jma4o%40group.calendar.google.com
        eventSources: [
            {
                googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
                className: 'dlf-community-events',
                // color: 'blue'
            },
            // {
            //     googleCalendarId: 'c9n96oka3aaha4499lnq4jma4o%40group.calendar.google.com',
            //     className: 'dlf-zoom',
            //     color: 'orange',
            // },
            {
                googleCalendarId: '1nlqihbdhsca7r7npe93so66kk@group.calendar.google.com',
                className: 'dlf-zoom',
                color: '#EF6C00',
            }
        ],

        eventClick: function(event) {
            // opens events in a popup window
            window.open(event.url, 'gcalevent', 'width=700,height=600');
            return false;
        },

        loading: function(bool) {
            $('#loading').toggle(bool);
        }

    });


    // build the locale selector's options
    // $.each($.fullCalendar.locales, function(localeCode) {
    //   $('#locale-selector').append(
    //     $('<option/>')
    //       .attr('value', localeCode)
    //       .prop('selected', localeCode == initialLocaleCode)
    //       .text(localeCode)
    //   );
    // });
    //
    // // when the selected option changes, dynamically change the calendar option
    // $('#locale-selector').on('change', function() {
    //   if (this.value) {
    //     $('#calendar').fullCalendar('option', 'locale', this.value);
    //   }
    // });

});
