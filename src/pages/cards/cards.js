import $ from 'jquery';
import '../../utils/app.scss';

import '../../components/body/body.scss';
import '../../components/logo/logo.scss';

import './cards.scss';

import '../../components/room-search/room-search';
import '../../components/room-book/room-book';

import Calendar from '../../components/calendar/calendar';

import './img/room-888.jpg';
import './img/room-840.jpg';

$(() => {
  // eslint-disable-next-line no-unused-vars
  const calendarDoubleDropdown = new Calendar($('.js-calendar_theme_inline.js-calendar'), {
    type: Calendar.prototype.typeDouble,
  });
});
