import test from 'node:test';
import assert from 'node:assert/strict';
import { registerCalendar } from '../calendar-init.js';

for (const apiKey of ['test-api-key', null]) {
  test(`initializes and renders the calendar on DOMContentLoaded ${apiKey ? 'with' : 'without'} an API key`, () => {
    const calendarEl = {};
    const document = new EventTarget();
    document.getElementById = (id) => {
      return id === 'calendar' ? calendarEl : null;
    };
    document.querySelector = (selector) => {
      assert.equal(selector, 'meta[name="google-calendar-api-key"]');
      return apiKey === null ? null : { content: apiKey };
    };

    const plugins = ['plugin-a', 'plugin-b'];
    const instances = [];
    let renderCount = 0;
    class Calendar {
      constructor(element, options) {
        instances.push({ element, options });
      }

      render() {
        renderCount += 1;
      }
    }

    registerCalendar(document, Calendar, plugins);
    assert.equal(instances.length, 0);
    assert.equal(renderCount, 0);

    document.dispatchEvent(new Event('DOMContentLoaded'));

    assert.equal(instances.length, 1);
    assert.equal(instances[0].element, calendarEl);
    assert.equal(instances[0].options.plugins, plugins);
    assert.equal(instances[0].options.googleCalendarApiKey, apiKey ?? '');
    assert.equal(instances[0].options.eventSources.length, 2);
    assert.equal(renderCount, 1);
  });
}

test('mobile defaults, loading, partial failure, retry, and recovery remain consistent', () => {
  const elements = Object.fromEntries([
    'calendar', 'calendar-timezone', 'calendar-feedback', 'calendar-status',
    'calendar-recovery', 'calendar-retry'
  ].map(id => [id, Object.assign(new EventTarget(), { hidden: true, textContent: '' })]));
  const attributes = {};
  elements.calendar.setAttribute = (name, value) => { attributes[name] = value; };
  const document = new EventTarget();
  document.defaultView = { matchMedia: () => ({ matches: true }) };
  document.getElementById = id => elements[id];
  document.querySelector = () => ({ content: 'test-key' });
  let options;
  let retries = 0;
  class Calendar {
    constructor(element, input) { options = input; }
    render() {}
    refetchEvents() { retries += 1; }
  }
  registerCalendar(document, Calendar, []);
  document.dispatchEvent(new Event('DOMContentLoaded'));
  assert.equal(options.initialView, 'listUpcoming');
  assert.match(elements['calendar-timezone'].textContent, /Times shown in your timezone/);

  options.loading(true);
  assert.equal(attributes['aria-busy'], 'true');
  assert.equal(elements['calendar-feedback'].hidden, false);
  assert.equal(options.noEventsContent(), 'Loading events…');
  options.eventSourceFailure(new Error('one feed failed'));
  options.loading(false);
  assert.equal(attributes['aria-busy'], 'false');
  assert.equal(elements['calendar-recovery'].hidden, false);
  assert.match(elements['calendar-status'].textContent, /may be incomplete/);
  assert.match(options.noEventsContent(), /temporarily unavailable/);

  elements['calendar-retry'].dispatchEvent(new Event('click'));
  assert.equal(retries, 1);
  options.loading(true);
  assert.equal(elements['calendar-recovery'].hidden, true);
  options.loading(false);
  assert.equal(elements['calendar-feedback'].hidden, true);
  assert.match(options.noEventsContent(), /No events in this date range/);
});
