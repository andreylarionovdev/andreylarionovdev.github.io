import $ from 'jquery';
import Dropdown from '../dropdown/dropdown';
import Calendar from '../calendar/calendar';

require('webpack-jquery-ui/tooltip');

$(() => {
  $('.js-room-book__result-grid').tooltip({
    classes: {
      'ui-tooltip': 'room-book__tooltip',
    },
    position: {
      my: 'center bottom',
      at: 'center top',
    },
  });
  // eslint-disable-next-line no-unused-vars
  const guestsDropdown = new Dropdown($('.js-room-book__dropdown .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
  // eslint-disable-next-line no-unused-vars
  const calendarDoubleDropdown = new Calendar($('.js-room-book__calendar .js-calendar'), {
    type: Calendar.prototype.typeDouble,
  });
});
