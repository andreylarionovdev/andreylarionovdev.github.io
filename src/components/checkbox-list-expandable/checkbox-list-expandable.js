import $ from 'jquery';
import {
  classExpanded,
  selectorToggle,
  selectorCheckboxExpandableList,
} from './const';

const CheckboxListExpandable = function CheckboxListExpandable() {
  this.init();
};

CheckboxListExpandable.prototype.init = function init() {
  this.addEventListeners();
};

CheckboxListExpandable.prototype.addEventListeners = function addEventListeners() {
  $(selectorToggle).on('click', this.handleToggleClick.bind(this));
};

CheckboxListExpandable.prototype.handleToggleClick = function handleToggleClick(e) {
  e.preventDefault();

  $(e.currentTarget).closest(selectorCheckboxExpandableList).toggleClass(classExpanded);
};

$(() => new CheckboxListExpandable());
