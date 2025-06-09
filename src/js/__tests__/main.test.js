jest.mock('@fullcalendar/core', () => {
  return { Calendar: jest.fn().mockImplementation(() => ({ render: jest.fn() })) };
});

const { Calendar } = require('@fullcalendar/core');

describe('calendar initialization', () => {
  test('initializes Calendar on DOMContentLoaded', () => {
    document.body.innerHTML = '<div id="calendar"></div>';
    jest.isolateModules(() => {
      require('../main.js');
      document.dispatchEvent(new Event('DOMContentLoaded'));
    });
    expect(Calendar).toHaveBeenCalled();
  });
});

