(function(){
  'use strict';

  var z_account = "E17D945D-B632-4031-BDA8-ED8F260A04F0";
  var z_collector = "clir.informz.net";
  var z_cookieDomain = ".digital-conferences-calendar.info";

  (function (e, o, n, r, t, a, s) { e[t] || (e.GlobalSnowplowNamespace = e.GlobalSnowplowNamespace || [], e.GlobalSnowplowNamespace.push(t), e[t] = function () { (e[t].q = e[t].q || []).push(arguments) }, e[t].q = e[t].q || [], a = o.createElement(n), s = o.getElementsByTagName(n)[0], a.async = 1, a.src = r, s.parentNode.insertBefore(a, s)) }(window, document, "script", "https://"+z_collector+"/web_trk/sp.js", "informz_trk")), informz_trk("newTracker", "infz", z_collector + "/web_trk/collector/", { appId: z_account, cookieDomain: z_cookieDomain }), informz_trk("setUserIdFromLocation", "_zs"), informz_trk("enableActivityTracking", 30, 15); informz_trk("trackPageView", null);
})();

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
            listDay: {
                buttonText: 'list day'
            },
            listWeek: {
                buttonText: 'list week'
            }
        },
        // navLinks: true,

        // THIS KEY WON'T WORK IN PRODUCTION!!!
        // To make your own Google API key, follow the directions here:
        // http://fullcalendar.io/docs/google_calendar/
        //googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
        googleCalendarApiKey: 'AIzaSyA5W2MDJs9uknQv6Cn4OZ07K-wtvkoqYwE',

        // US Holidays
        // events: 'usa__en@holiday.calendar.google.com',
        eventSources: [{
                googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
                className: 'dlf-community-events',
                // color: 'blue'
            },
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
