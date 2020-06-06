import $ from 'jquery';

import '../dropdown/dropdown';
import '../range-slider/range-slider';
import '../checkbox-list-expandable/checkbox-list-expandable';
import '../pagination/pagination';

import './img/room-thumb-1.png';
import './img/room-thumb-2.png';
import './img/room-thumb-3.png';
import './img/room-thumb-4.png';
import './img/room-thumb-5.png';
import './img/room-thumb-6.png';
import './img/room-thumb-7.png';
import './img/room-thumb-8.png';
import './img/room-thumb-9.png';
import './img/room-thumb-10.png';
import './img/room-thumb-11.png';
import './img/room-thumb-12.png';

const SearchPage = function SearchPage() {
  this.init();
};

SearchPage.prototype.init = function init() {
  this.classHiddenFilterButton = 'search-page__button_hidden';
  this.classVisibleFilter = 'search-page__form_visible';
  this.classHiddenThumbnails = 'search-page__search-result_hidden';
  this.classHiddenFooter = 'footer_hidden';

  this.$showFilterButton = $('.js-search-page__button_type_show-filter');
  this.$clearFilterButton = $('.js-search-page__button_type_clear');
  this.$applyFilterButton = $('.js-search-page__button_type_apply');

  this.$filterForm = $('.js-search-page__form');
  this.$thumbnailsWrapper = $('.js-search-page__search-result');
  this.$footer = $('.js-footer');

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

SearchPage.prototype.handleClearFilterButtonClick = function handleClearFilterButtonClick(e) {
  e.preventDefault();
  this.resetForm();
};

SearchPage.prototype.handleApplyFilterButtonClick = function handleClearFilterButtonClick(e) {
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
  this.$filterForm.find('.js-dropdown').each((_, dropdown) => {
    if (['rooms', 'guests'].includes($(dropdown).data('type'))) {
      $(dropdown).data('api').clear();
    }
    $(dropdown).find('.js-dropdown__text-input').val('');
  });
  this.$filterForm.find('.js-checkbox__input').each((_, checkboxInput) => $(checkboxInput).attr('checked', false));

  const rangeSliderApi = this.$filterForm.find('.js-range-slider__input').data('ionRangeSlider');
  rangeSliderApi.reset();
};

$(() => new SearchPage());
