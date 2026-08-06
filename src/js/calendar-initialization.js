import { createCalendarOptions } from './calendar-config.js';

export function initializeCalendar({
  Calendar,
  calendarEl,
  plugins,
  googleCalendarApiKey
}) {
  const options = createCalendarOptions(plugins, googleCalendarApiKey);
  const calendar = new Calendar(calendarEl, options);

  calendar.render();

  return calendar;
}
