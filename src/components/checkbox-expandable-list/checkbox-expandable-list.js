import $ from 'jquery';
import {
  CLASS_EXPANDED,
  SELECTOR_TOGGLE,
  SELECTOR_CHECKBOX_EXPANDABLE_LIST,
} from './const';

const CheckboxExpandableList = function CheckboxListExpandable() {
  this.init();
};

CheckboxExpandableList.prototype.init = function init() {
  this.addEventListeners();
};

CheckboxExpandableList.prototype.addEventListeners = function addEventListeners() {
  $(SELECTOR_TOGGLE).on('click', this.handleToggleClick.bind(this));
};

CheckboxExpandableList.prototype.handleToggleClick = function handleToggleClick(e) {
  e.preventDefault();

  $(e.currentTarget).closest(SELECTOR_CHECKBOX_EXPANDABLE_LIST).toggleClass(CLASS_EXPANDED);
};

$(() => new CheckboxExpandableList());
