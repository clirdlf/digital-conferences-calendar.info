import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createCalendarOptions,
  getEventSources
} from '../src/js/calendar-config.js';

test('getEventSources returns expected calendar feeds', () => {
  const sources = getEventSources();

  assert.equal(Array.isArray(sources), true);
  assert.equal(sources.length, 2);
  assert.deepEqual(sources[0], {
    googleCalendarId: 'g2hval0pee3rmrv4f3n9hp9cok@group.calendar.google.com',
    className: 'dlf-community-events',
    color: '#2778c8'
  });
  assert.deepEqual(sources[1], {
    googleCalendarId: '1nlqihbdhsca7r7npe93so66kk@group.calendar.google.com',
    className: 'dlf-zoom',
    color: '#EF6C00'
  });
});

test('createCalendarOptions preserves expected FullCalendar defaults', () => {
  const plugins = ['plugin-a', 'plugin-b'];
  const apiKey = 'test-api-key';
  const options = createCalendarOptions(plugins, apiKey);

  assert.equal(options.plugins, plugins);
  assert.equal(options.googleCalendarApiKey, apiKey);
  assert.equal(options.navLinks, true);
  assert.equal(options.editable, false);
  assert.equal(options.dayMaxEvents, true);
  assert.deepEqual(options.headerToolbar, {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listUpcoming'
  });
  assert.equal(options.eventSources.length, 2);
});

test('mobile opens a rolling 30-day agenda while desktop keeps the month grid', () => {
  assert.equal(createCalendarOptions([], '').initialView, 'dayGridMonth');
  const mobile = createCalendarOptions([], '', { isMobile: true });
  assert.equal(mobile.initialView, 'listUpcoming');
  assert.deepEqual(mobile.views.listUpcoming.duration, { days: 30 });
  assert.equal(mobile.timeZone, 'local');
});
