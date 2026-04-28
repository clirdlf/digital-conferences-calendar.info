const test = require('node:test');
const assert = require('node:assert/strict');

const {
  createCalendarOptions,
  getEventSources
} = require('../src/js/calendar-config');

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
  assert.equal(options.themeSystem, 'bootstrap5');
  assert.equal(options.googleCalendarApiKey, apiKey);
  assert.equal(options.navLinks, true);
  assert.equal(options.editable, true);
  assert.equal(options.dayMaxEvents, true);
  assert.deepEqual(options.headerToolbar, {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  });
  assert.equal(options.eventSources.length, 2);
});
