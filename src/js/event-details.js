export function formatEventWhen(event, { locale, timeZone } = {}) {
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeZone });
  if (event.allDay) {
    if (!event.startStr) return { date: 'Date to be confirmed', time: 'All-day' };
    // All-day dates float across timezones; Google Calendar end dates are exclusive.
    const allDayFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeZone: 'UTC' });
    const start = new Date(`${event.startStr.slice(0, 10)}T12:00:00Z`);
    const end = event.endStr ? new Date(`${event.endStr.slice(0, 10)}T12:00:00Z`) : new Date(start);
    if (event.endStr) end.setUTCDate(end.getUTCDate() - 1);
    return {
      date: allDayFormat.format(start) + (end > start ? ` – ${allDayFormat.format(end)}` : ''),
      time: 'All-day'
    };
  }
  if (!event.start) return { date: 'Date to be confirmed', time: '' };
  const timeFormat = new Intl.DateTimeFormat(locale, {
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone
  });
  const startDate = dateFormat.format(event.start);
  const endDate = event.end ? dateFormat.format(event.end) : startDate;
  return {
    date: startDate + (endDate !== startDate ? ` – ${endDate}` : ''),
    time: timeFormat.format(event.start) + (event.end ? ` – ${timeFormat.format(event.end)}` : '')
  };
}

export function getSafeEventUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function bindEventDetails(document) {
  const dialog = document.getElementById('event-details');
  if (!dialog) return null;
  let trigger;
  dialog.querySelector('[data-close-event]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => trigger?.isConnected && trigger.focus());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  return ({ event, jsEvent, el }) => {
    // Keep modifier clicks available for opening the original event in another tab.
    if (jsEvent.ctrlKey || jsEvent.metaKey || jsEvent.shiftKey || jsEvent.altKey) return;
    jsEvent.preventDefault();
    trigger = el;
    const when = formatEventWhen(event);
    document.getElementById('event-title').textContent = event.title || 'Untitled event';
    document.getElementById('event-date').textContent = when.date;
    document.getElementById('event-time').textContent = when.time;
    const location = event.extendedProps?.location;
    document.getElementById('event-location-row').hidden = !location;
    document.getElementById('event-location').textContent = location || '';

    // Feed descriptions may contain HTML. Parse in an inert template, then display text only.
    const template = document.createElement('template');
    template.innerHTML = String(event.extendedProps?.description || '')
      .replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/(p|div|li|h[1-6])\s*>/gi, '\n');
    template.content.querySelectorAll('script, style').forEach(node => node.remove());
    document.getElementById('event-description').textContent = template.content.textContent.trim() || 'No description has been provided. Open the event in Google Calendar for more information.';
    const link = document.getElementById('event-original-link');
    const url = getSafeEventUrl(event.url);
    link.hidden = !url;
    if (url) link.href = url;
    else link.removeAttribute('href');
    if (!dialog.open) dialog.showModal();
  };
}
