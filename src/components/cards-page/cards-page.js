import $ from 'jquery';
import '../room-search/room-search';
import '../room-book/room-book';

import Calendar from '../calendar/calendar';

import './img/room-888.jpg';
import './img/room-840.jpg';

$(() => {
  // eslint-disable-next-line no-unused-vars
  const calendarDoubleDropdown = new Calendar($('.js-calendar_theme_inline.js-calendar'), {
    type: Calendar.prototype.typeDouble,
  });
});
