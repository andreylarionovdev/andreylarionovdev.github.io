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

const RoomFilterPage = function RoomFilterPage() {
  this.init();
};

RoomFilterPage.prototype.init = function init() {
  this.classHiddenShowFilterButton = 'room-filter-page__show-filter-button_hidden';
  this.classVisibleFilter = 'room-filter-page__form_visible';
  this.classHiddenThumbnails = 'room-filter-page__thumbnail-list-wrapper_hidden';
  this.classHiddenFooter = 'footer_hidden';

  this.$showFilterButton = $('.js-room-filter-page__show-filter-button');
  this.$clearFilterButton = $('.js-room-filter-page__clear-filter-button');
  this.$applyFilterButton = $('.js-room-filter-page__apply-filter-button');

  this.$filterForm = $('.js-room-filter-page__form');
  this.$thumbnailsWrapper = $('.js-room-filter-page__thumbnail-list-wrapper');
  this.$footer = $('.js-footer');

  this.addEventListeners();
};

RoomFilterPage.prototype.addEventListeners = function addEventListeners() {
  this.$showFilterButton.on('click', this.handleShowFilterButtonClick.bind(this));
  this.$clearFilterButton.on('click', this.handleClearFilterButtonClick.bind(this));
  this.$applyFilterButton.on('click', this.handleApplyFilterButtonClick.bind(this));
};

RoomFilterPage.prototype.handleShowFilterButtonClick = function handleShowFilterButtonClick(e) {
  e.preventDefault();
  this.toggleFilter();
};

RoomFilterPage.prototype.handleClearFilterButtonClick = function handleClearFilterButtonClick(e) {
  e.preventDefault();
  this.toggleFilter();
};

RoomFilterPage.prototype.handleApplyFilterButtonClick = function handleClearFilterButtonClick(e) {
  e.preventDefault();
  this.toggleFilter();
};

RoomFilterPage.prototype.toggleFilter = function toggleFilter() {
  this.$showFilterButton.toggleClass(this.classHiddenShowFilterButton);
  this.$filterForm.toggleClass(this.classVisibleFilter);
  this.$thumbnailsWrapper.toggleClass(this.classHiddenThumbnails);
  this.$footer.toggleClass(this.classHiddenFooter);
};

$(() => new RoomFilterPage());
