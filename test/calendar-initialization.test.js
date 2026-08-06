import test from 'node:test';
import assert from 'node:assert/strict';

import { initializeCalendar } from '../src/js/calendar-initialization.js';

test('initializeCalendar creates and renders a configured calendar', () => {
  const calendarEl = { id: 'calendar' };
  const plugins = ['plugin-a', 'plugin-b'];
  const googleCalendarApiKey = 'test-api-key';
  let constructorArguments;
  let renderCalls = 0;

  class FakeCalendar {
    constructor(...args) {
      constructorArguments = args;
    }

    render() {
      renderCalls += 1;
    }
  }

  const calendar = initializeCalendar({
    Calendar: FakeCalendar,
    calendarEl,
    plugins,
    googleCalendarApiKey
  });

  assert.equal(calendar instanceof FakeCalendar, true);
  assert.equal(constructorArguments[0], calendarEl);
  assert.equal(constructorArguments[1].plugins, plugins);
  assert.equal(constructorArguments[1].googleCalendarApiKey, googleCalendarApiKey);
  assert.equal(renderCalls, 1);
});
