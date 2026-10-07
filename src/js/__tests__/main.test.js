import test from 'node:test';
import assert from 'node:assert/strict';
import { registerCalendar } from '../calendar-init.js';

for (const apiKey of ['test-api-key', null]) {
  test(`initializes and renders the calendar on DOMContentLoaded ${apiKey ? 'with' : 'without'} an API key`, () => {
    const calendarEl = {};
    const document = new EventTarget();
    document.getElementById = (id) => {
      assert.equal(id, 'calendar');
      return calendarEl;
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
