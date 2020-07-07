import $ from 'jquery';
import '../calendar/calendar';
import Dropdown from '../dropdown/dropdown';

$(() => {
  // eslint-disable-next-line no-unused-vars
  const guestsDropdown = new Dropdown($('.room-search__dropdown .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
});
