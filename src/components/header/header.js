import $ from 'jquery';

const Header = function Header() {
  this.init();
};

Header.prototype.init = function init() {
  this.classNavigationActive = 'header__navigation_active';

  this.selectorHeader = '.js-header';
  this.selectorNavigation = '.js-header__navigation';
  this.selectorUserNavigation = '.js-header__user-navigation';
  this.selectorNavigationToggle = '.js-header__navigation-toggle';

  this.addEventListeners();
};

Header.prototype.addEventListeners = function addEventListeners() {
  $(this.selectorNavigationToggle).on('click', this.handleNavigationToggleClick.bind(this));
};

Header.prototype.handleNavigationToggleClick = function handleNavigationToggleClick(e) {
  const $button = $(e.currentTarget);
  $button.text((_, text) => (text === 'menu' ? 'close' : 'menu'));
  const $header = $button.closest(this.selectorHeader);
  $header.find(this.selectorNavigation).toggleClass(this.classNavigationActive);
  $header.find(this.selectorUserNavigation).toggleClass(this.classNavigationActive);
};

$(() => new Header());
