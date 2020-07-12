import $ from 'jquery';
import '../logo/logo';
import {
  classNavigationActive,
  selectorHeader,
  selectorNavigation,
  selectorUserNavigation,
  selectorNavigationToggle,
} from './const';

const Header = function Header() {
  this.init();
};

Header.prototype.init = function init() {
  this.addEventListeners();
};

Header.prototype.addEventListeners = function addEventListeners() {
  $(selectorNavigationToggle).on('click', this.handleNavigationToggleClick.bind(this));
};

Header.prototype.handleNavigationToggleClick = function handleNavigationToggleClick(e) {
  const $button = $(e.currentTarget);
  $button.text((_, text) => (text === 'menu' ? 'close' : 'menu'));
  const $header = $button.closest(selectorHeader);
  $header.find(selectorNavigation).toggleClass(classNavigationActive);
  $header.find(selectorUserNavigation).toggleClass(classNavigationActive);
};

$(() => new Header());
