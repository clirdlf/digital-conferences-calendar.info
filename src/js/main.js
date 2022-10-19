// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"; // https://icons.getbootstrap.com/#usage

import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from '@fullcalendar/list';

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new Calendar(calendarEl, {
      plugins: [ interactionPlugin, bootstrap5Plugin, dayGridPlugin, googleCalendarPlugin, timeGridPlugin, listPlugin ],
      themeSystem: 'bootstrap5',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      googleCalendarApiKey: 'AIzaSyA5W2MDJs9uknQv6Cn4OZ07K-wtvkoqYwE',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      eventSources: [
        { 
          googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
          className: 'dlf-community-events',
          // color: '#3a87ad'
          // color: '#236DA3;'
          color: '#2778c8'
        },
        {
          googleCalendarId: '1nlqihbdhsca7r7npe93so66kk@group.calendar.google.com',
          className: 'dlf-zoom',
          color: '#EF6C00',
          
        }
      ]
    });
  
    calendar.render();
  });