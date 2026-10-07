import test from 'node:test';
import assert from 'node:assert/strict';
import { formatEventWhen, getSafeEventUrl, bindEventDetails } from '../src/js/event-details.js';

const format = { locale: 'en-US', timeZone: 'America/New_York' };

test('all-day dates display an inclusive range without shifting the final day', () => {
  const single = formatEventWhen({ allDay: true, startStr: '2026-10-14', endStr: '2026-10-15' }, format);
  assert.equal(single.date, 'Wednesday, October 14, 2026');
  assert.equal(single.time, 'All-day');
  const farTimezone = formatEventWhen({ allDay: true, startStr: '2026-10-14', endStr: '2026-10-15' }, { locale: 'en-US', timeZone: 'Pacific/Kiritimati' });
  assert.equal(farTimezone.date, single.date);
  const multiple = formatEventWhen({ allDay: true, startStr: '2026-10-14', endStr: '2026-10-16' }, format);
  assert.equal(multiple.date, 'Wednesday, October 14, 2026 – Thursday, October 15, 2026');
});

test('timed events include both dates when crossing midnight and local timezone abbreviations', () => {
  const when = formatEventWhen({ allDay: false, start: new Date('2026-10-15T03:30:00Z'), end: new Date('2026-10-15T05:00:00Z') }, format);
  assert.equal(when.date, 'Wednesday, October 14, 2026 – Thursday, October 15, 2026');
  assert.match(when.time, /11:30 PM EDT.*1:00 AM EDT/);
  assert.equal(formatEventWhen({ allDay: false, start: null }, format).date, 'Date to be confirmed');
});

test('original event links only accept absolute HTTP or HTTPS URLs', () => {
  assert.equal(getSafeEventUrl('https://calendar.google.com/event?eid=example'), 'https://calendar.google.com/event?eid=example');
  for (const value of ['javascript:alert(1)', 'data:text/html,test', '/relative', '', null]) {
    assert.equal(getSafeEventUrl(value), null);
  }
});


test('event dialog preserves modifier clicks, clears stale fields, and restores focus', () => {
  const closeButton = new EventTarget();
  const dialog = new EventTarget();
  let focused = false;
  dialog.querySelector = () => closeButton;
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; dialog.dispatchEvent(new Event('close')); };
  const fields = Object.fromEntries([
    'event-title', 'event-date', 'event-time', 'event-location-row', 'event-location',
    'event-description', 'event-original-link'
  ].map(id => [id, { textContent: '', hidden: false, removeAttribute(name) { delete this[name]; } }]));
  for (const field of Object.values(fields)) {
    Object.defineProperty(field, 'innerHTML', { set() { throw new Error('Live content must use textContent'); } });
  }
  const document = {
    getElementById: id => id === 'event-details' ? dialog : fields[id],
    createElement: () => ({
      content: { textContent: '', querySelectorAll: () => [] },
      set innerHTML(value) { this.content.textContent = value; }
    })
  };
  const open = bindEventDetails(document);
  const trigger = { isConnected: true, focus() { focused = true; } };
  const event = {
    title: '<img src=x onerror=alert(1)>', allDay: true,
    startStr: '2026-10-14', endStr: '2026-10-15',
    url: 'https://calendar.google.com/event?eid=example',
    extendedProps: { description: 'Event description', location: 'Online' }
  };
  let prevented = false;
  open({ event, el: trigger, jsEvent: { metaKey: true, preventDefault() { prevented = true; } } });
  assert.equal(prevented, false);
  assert.equal(dialog.open, undefined);
  open({ event, el: trigger, jsEvent: { preventDefault() { prevented = true; } } });
  assert.equal(prevented, true);
  assert.equal(dialog.open, true);
  assert.equal(fields['event-title'].textContent, event.title);
  assert.equal(fields['event-location-row'].hidden, false);
  assert.equal(fields['event-description'].textContent, 'Event description');
  assert.equal(fields['event-original-link'].href, event.url);
  closeButton.dispatchEvent(new Event('click'));
  assert.equal(dialog.open, false);
  assert.equal(focused, true);

  open({ event: { ...event, url: 'javascript:alert(1)', extendedProps: {} }, el: trigger, jsEvent: { preventDefault() {} } });
  assert.equal(fields['event-location-row'].hidden, true);
  assert.equal(fields['event-location'].textContent, '');
  assert.equal(fields['event-original-link'].hidden, true);
  assert.equal(fields['event-original-link'].href, undefined);
  assert.match(fields['event-description'].textContent, /No description has been provided/);
});
