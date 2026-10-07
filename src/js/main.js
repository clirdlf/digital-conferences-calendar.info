// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"; // https://icons.getbootstrap.com/#usage

import { Calendar } from 'fullcalendar';
import interactionPlugin from 'fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import dayGridPlugin from 'fullcalendar/daygrid';
import timeGridPlugin from 'fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from 'fullcalendar/list';
import 'fullcalendar/skeleton.css';
import '@fullcalendar/bootstrap5/theme.css';
import calendarInit from './calendar-init';

const plugins = [
  interactionPlugin,
  bootstrap5Plugin,
  dayGridPlugin,
  googleCalendarPlugin,
  timeGridPlugin,
  listPlugin
];

calendarInit.registerCalendar(document, Calendar, plugins);
