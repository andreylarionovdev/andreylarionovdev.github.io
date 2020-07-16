import $ from 'jquery';
import '../logo/logo';
import {
  CLASS_NAVIGATION_ACTIVE,
  SELECTOR_HEADER,
  SELECTOR_NAVIGATION,
  SELECTOR_USER_NAVIGATION,
  SELECTOR_NAVIGATION_TOGGLE,
} from './const';

const Header = function Header() {
  this.init();
};

Header.prototype.init = function init() {
  this.addEventListeners();
};

Header.prototype.addEventListeners = function addEventListeners() {
  $(SELECTOR_NAVIGATION_TOGGLE).on('click', this.handleNavigationToggleClick.bind(this));
};

Header.prototype.handleNavigationToggleClick = function handleNavigationToggleClick(e) {
  const $button = $(e.currentTarget);
  $button.text((_, text) => (text === 'menu' ? 'close' : 'menu'));
  const $header = $button.closest(SELECTOR_HEADER);
  $header.find(SELECTOR_NAVIGATION).toggleClass(CLASS_NAVIGATION_ACTIVE);
  $header.find(SELECTOR_USER_NAVIGATION).toggleClass(CLASS_NAVIGATION_ACTIVE);
};

$(() => new Header());
