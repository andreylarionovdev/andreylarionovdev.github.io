import $ from 'jquery';
import '../../utils/app.scss';

import '../../components/body/body.scss';
import '../../components/logo/logo.scss';

import './form-elements.scss';

import '../../components/range-slider/range-slider';
import '../../components/checkbox-expandable-list/checkbox-expandable-list';
import '../../components/pagination/pagination';
import '../../components/like-button/like-button';
import '../../components/feedback/feedback';

import './img/murad.png';

import Dropdown from '../../components/dropdown/dropdown';
import Calendar from '../../components/calendar/calendar';

$(() => {
  // eslint-disable-next-line no-unused-vars
  const roomsCollapsed = new Dropdown($('.js-form-elements__dropdown_collapsed .js-dropdown'), {
    type: Dropdown.prototype.roomsType,
  });
  // eslint-disable-next-line no-unused-vars
  const roomsExpanded = new Dropdown($('.js-form-elements__dropdown_theme_expanded .js-dropdown'), {
    type: Dropdown.prototype.roomsType,
  });
  // eslint-disable-next-line no-unused-vars
  const guestsEmpty = new Dropdown($('.js-form-elements__dropdown_theme_empty .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
  // eslint-disable-next-line no-unused-vars
  const guestsFilled = new Dropdown($('.js-form-elements__dropdown_theme_filled .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
  // eslint-disable-next-line no-unused-vars
  const doubleDatepickerDropdown = new Calendar($('.js-form-elements__dropdown_theme_datepicker .js-calendar'), {
    type: Calendar.prototype.typeDouble,
  });
  // eslint-disable-next-line no-unused-vars
  const singleDatepickerDropdown = new Calendar($('.js-form-elements__dropdown_theme_date-filter .js-calendar'), {
    type: Calendar.prototype.typeSingle,
  });
});
