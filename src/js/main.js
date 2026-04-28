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
import calendarConfig from './calendar-config';

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const apiKeyMeta = document.querySelector('meta[name="google-calendar-api-key"]');
  const googleCalendarApiKey = apiKeyMeta ? apiKeyMeta.content : '';
  const plugins = [
    interactionPlugin,
    bootstrap5Plugin,
    dayGridPlugin,
    googleCalendarPlugin,
    timeGridPlugin,
    listPlugin
  ];
  const options = calendarConfig.createCalendarOptions(plugins, googleCalendarApiKey);
  const calendar = new Calendar(calendarEl, options);

  calendar.render();
});
