import $ from 'jquery';

const Header = function Header() {
  this.init();
};

Header.prototype.init = function init() {
  this.classNavigationActive = 'header__navigation--active';

  this.selectorHeader = '.js-header';
  this.selectorNavigation = '.js-header__navigation';
  this.selectorNavigationToggle = '.js-header__navigation-toggle';

  this.addEventListeners();
};

Header.prototype.addEventListeners = function addEventListeners() {
  $(this.selectorNavigationToggle).on('click', this.handleNavigationToggleClick.bind(this));
};

Header.prototype.handleNavigationToggleClick = function handleNavigationToggleClick(e) {
  const $header = $(e.currentTarget).closest(this.selectorHeader);
  $header.find(this.selectorNavigation).toggleClass(this.classNavigationActive);
};

$(() => new Header());
