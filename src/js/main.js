import { Calendar } from 'fullcalendar';
import interactionPlugin from 'fullcalendar/interaction';
import classicTheme from 'fullcalendar/themes/classic';

import dayGridPlugin from 'fullcalendar/daygrid';
import timeGridPlugin from 'fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from 'fullcalendar/list';
import 'fullcalendar/skeleton.css';
import 'fullcalendar/themes/classic/theme.css';
import 'fullcalendar/themes/classic/palette.css';
import '../css/styles.css';
import { registerCalendar } from './calendar-init.js';

const plugins = [
  interactionPlugin,
  classicTheme,
  dayGridPlugin,
  googleCalendarPlugin,
  timeGridPlugin,
  listPlugin
];

registerCalendar(document, Calendar, plugins);
