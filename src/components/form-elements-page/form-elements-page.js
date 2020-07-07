import $ from 'jquery';
import '../range-slider/range-slider';
import '../checkbox-list-expandable/checkbox-list-expandable';
import '../pagination/pagination';
import '../calendar/calendar';
import '../like-button/like-button';
import '../feedback/feedback';

import './img/murad.png';

import Dropdown from '../dropdown/dropdown';

$(() => {
  // eslint-disable-next-line no-unused-vars
  const roomsCollapsed = new Dropdown($('.form-elements-page__dropdown_collapsed .js-dropdown'), {
    type: Dropdown.prototype.roomsType,
  });
  // eslint-disable-next-line no-unused-vars
  const roomsExpanded = new Dropdown($('.form-elements-page__dropdown_theme_expanded .js-dropdown'), {
    type: Dropdown.prototype.roomsType,
  });
  // eslint-disable-next-line no-unused-vars
  const guestsEmpty = new Dropdown($('.form-elements-page__dropdown_theme_empty .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
  // eslint-disable-next-line no-unused-vars
  const guestsFilled = new Dropdown($('.form-elements-page__dropdown_theme_filled .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
});
