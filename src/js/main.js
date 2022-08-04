import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from '@fullcalendar/list';
import 'bootstrap';


// import './main.scss';

document.addEventListener('DOMContentLoaded', () => {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
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