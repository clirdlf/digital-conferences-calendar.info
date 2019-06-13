(function() {
    'use strict';

    var z_account = "E17D945D-B632-4031-BDA8-ED8F260A04F0";
    var z_collector = "clir.informz.net";
    var z_cookieDomain = ".digital-conferences-calendar.info";

    (function(e, o, n, r, t, a, s) {
        e[t] || (e.GlobalSnowplowNamespace = e.GlobalSnowplowNamespace || [], e.GlobalSnowplowNamespace.push(t), e[t] = function() {
            (e[t].q = e[t].q || []).push(arguments)
        }, e[t].q = e[t].q || [], a = o.createElement(n), s = o.getElementsByTagName(n)[0], a.async = 1, a.src = r, s.parentNode.insertBefore(a, s))
    }(window, document, "script", "https://" + z_collector + "/web_trk/sp.js", "informz_trk")), informz_trk("newTracker", "infz", z_collector + "/web_trk/collector/", {
        appId: z_account,
        cookieDomain: z_cookieDomain
    }), informz_trk("setUserIdFromLocation", "_zs"), informz_trk("enableActivityTracking", 30, 15);
    informz_trk("trackPageView", null);
})();

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'googleCalendar', 'list', 'bootstrap'],
        googleCalendarApiKey: 'AIzaSyA5W2MDJs9uknQv6Cn4OZ07K-wtvkoqYwE',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth, listDay, listWeek,'
        },
        themeSystem: 'bootstrap',
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
        views: {
            listDay: {
                buttonText: 'list day'
            },
            listWeek: {
                buttonText: 'list week'
            }
        }

    });

    calendar.render();
});