import $ from 'jquery';
import '../range-slider/range-slider';
import '../checkbox-expandable-list/checkbox-expandable-list';
import '../pagination/pagination';
import '../like-button/like-button';
import '../feedback/feedback';

import './img/murad.png';

import Dropdown from '../dropdown/dropdown';
import Calendar from '../calendar/calendar';

$(() => {
  // eslint-disable-next-line no-unused-vars
  const roomsCollapsed = new Dropdown($('.js-form-elements-page__dropdown_collapsed .js-dropdown'), {
    type: Dropdown.prototype.roomsType,
  });
  // eslint-disable-next-line no-unused-vars
  const roomsExpanded = new Dropdown($('.js-form-elements-page__dropdown_theme_expanded .js-dropdown'), {
    type: Dropdown.prototype.roomsType,
  });
  // eslint-disable-next-line no-unused-vars
  const guestsEmpty = new Dropdown($('.js-form-elements-page__dropdown_theme_empty .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
  // eslint-disable-next-line no-unused-vars
  const guestsFilled = new Dropdown($('.js-form-elements-page__dropdown_theme_filled .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
  // eslint-disable-next-line no-unused-vars
  const doubleDatepickerDropdown = new Calendar($('.js-form-elements-page__dropdown_theme_datepicker .js-calendar'), {
    type: Calendar.prototype.typeDouble,
  });
  // eslint-disable-next-line no-unused-vars
  const singleDatepickerDropdown = new Calendar($('.js-form-elements-page__dropdown_theme_date-filter .js-calendar'), {
    type: Calendar.prototype.typeSingle,
  });
});
