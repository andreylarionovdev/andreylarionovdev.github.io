import $ from 'jquery';

import '../../utils/app.scss';
import '../../components/body/body.scss';

import '../../components/header/header.scss';
import '../../components/header/header';
import '../../components/footer/footer.scss';

import '../../components/range-slider/range-slider';
import '../../components/checkbox-expandable-list/checkbox-expandable-list';
import '../../components/pagination/pagination';

import './img/room-888.jpg';
import './img/room-840.jpg';
import './img/room-980.jpg';
import './img/room-856.jpg';
import './img/room-740.jpg';
import './img/room-982.jpg';
import './img/room-678.jpg';
import './img/room-450.jpg';
import './img/room-350.jpg';
import './img/room-666.jpg';
import './img/room-444.jpg';
import './img/room-352.jpg';

import './search.scss';

import Dropdown from '../../components/dropdown/dropdown';
import Calendar from '../../components/calendar/calendar';

const SearchPage = function SearchPage() {
  this.init();
};

SearchPage.prototype.init = function init() {
  this.classHiddenFilterButton = 'search__button_hidden';
  this.classVisibleFilter = 'search__form_visible';
  this.classHiddenThumbnails = 'search__search-result_hidden';
  this.classHiddenFooter = 'footer_hidden';

  this.$showFilterButton = $('.js-search__button_action_show-filter');
  this.$clearFilterButton = $('.js-search__button_action_clear');
  this.$applyFilterButton = $('.js-search__button_action_apply');

  this.$filterForm = $('.js-search__form');
  this.$thumbnailsWrapper = $('.js-search__search-result');
  this.$footer = $('.js-footer');

  this.guestsDropdown = new Dropdown($('.js-search__guests-dropdown .js-dropdown'), {
    type: Dropdown.prototype.guestsType,
  });
  this.roomsDropdown = new Dropdown($('.js-search__feature-dropdown .js-dropdown'), {
    type: Dropdown.prototype.roomsType,
  });
  this.calendarDropdown = new Calendar($('.js-search__date-dropdown .js-calendar'), {
    type: Calendar.prototype.typeSingle,
  });

  this.addEventListeners();
};

SearchPage.prototype.addEventListeners = function addEventListeners() {
  this.$showFilterButton.on('click', this.handleShowFilterButtonClick.bind(this));
  this.$clearFilterButton.on('click', this.handleClearFilterButtonClick.bind(this));
  this.$applyFilterButton.on('click', this.handleApplyFilterButtonClick.bind(this));
};

SearchPage.prototype.handleShowFilterButtonClick = function handleShowFilterButtonClick(e) {
  e.preventDefault();
  this.toggleFilter();
};

SearchPage.prototype.handleClearFilterButtonClick = function handleClearFilterButtonClick() {
  this.resetForm();
};

SearchPage.prototype.handleApplyFilterButtonClick = function handleApplyFilterButtonClick(e) {
  e.preventDefault();
  this.toggleFilter();
};

SearchPage.prototype.toggleFilter = function toggleFilter() {
  this.$showFilterButton.toggleClass(this.classHiddenFilterButton);
  this.$filterForm.toggleClass(this.classVisibleFilter);
  this.$thumbnailsWrapper.toggleClass(this.classHiddenThumbnails);
  this.$footer.toggleClass(this.classHiddenFooter);
};

SearchPage.prototype.resetForm = function resetForm() {
  const rangeSliderApi = this.$filterForm.find('.js-range-slider__input').data('ionRangeSlider');
  rangeSliderApi.reset();
};

$(() => new SearchPage());
