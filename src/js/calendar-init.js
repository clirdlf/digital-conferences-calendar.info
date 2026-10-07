const { createCalendarOptions } = require('./calendar-config');

function registerCalendar(document, Calendar, plugins) {
  document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const apiKeyMeta = document.querySelector('meta[name="google-calendar-api-key"]');
    const googleCalendarApiKey = apiKeyMeta ? apiKeyMeta.content : '';
    const options = createCalendarOptions(plugins, googleCalendarApiKey);
    const calendar = new Calendar(calendarEl, options);

    calendar.render();
  });
}

module.exports = { registerCalendar };
