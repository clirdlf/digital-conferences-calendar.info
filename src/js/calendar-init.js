import { createCalendarOptions } from './calendar-config.js';
import { bindEventDetails } from './event-details.js';

function registerCalendar(document, Calendar, plugins) {
  document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const apiKeyMeta = document.querySelector('meta[name="google-calendar-api-key"]');
    const googleCalendarApiKey = apiKeyMeta ? apiKeyMeta.content : '';
    const isMobile = document.defaultView?.matchMedia('(max-width: 767px)').matches ?? false;
    const options = createCalendarOptions(plugins, googleCalendarApiKey, { isMobile });
    const eventClick = bindEventDetails(document);
    if (eventClick) options.eventClick = eventClick;
    const timezoneEl = document.getElementById('calendar-timezone');
    const feedbackEl = document.getElementById('calendar-feedback');
    const statusEl = document.getElementById('calendar-status');
    const recoveryEl = document.getElementById('calendar-recovery');
    const retryEl = document.getElementById('calendar-retry');
    if (timezoneEl) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezoneEl.textContent = `Times shown in your timezone (${timezone.replaceAll('_', ' ')}).`;
    }

    let isLoading = false;
    let hasError = false;
    const showFeedback = () => {
      if (feedbackEl) feedbackEl.hidden = !isLoading && !hasError;
      if (recoveryEl) recoveryEl.hidden = !hasError;
      if (statusEl) statusEl.textContent = hasError
        ? 'Some events could not be loaded. The calendar may be incomplete.'
        : isLoading ? 'Loading events…' : '';
      calendarEl.setAttribute?.('aria-busy', String(isLoading));
    };
    options.loading = (loading) => {
      if (loading) hasError = false;
      isLoading = loading;
      showFeedback();
    };
    options.eventSourceFailure = () => {
      hasError = true;
      showFeedback();
    };
    options.noEventsContent = () => hasError
      ? 'Events are temporarily unavailable. Please try again.'
      : isLoading ? 'Loading events…'
        : 'No events in this date range. Try the next date range.';
    const calendar = new Calendar(calendarEl, options);
    retryEl?.addEventListener('click', () => calendar.refetchEvents());

    calendar.render();
  });
}

export { registerCalendar };
