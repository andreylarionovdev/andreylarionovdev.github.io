import $ from 'jquery';
import {
  classExpanded,
  selectorToggle,
  selectorCheckboxExpandableList,
} from './const';

const CheckboxExpandableList = function CheckboxListExpandable() {
  this.init();
};

CheckboxExpandableList.prototype.init = function init() {
  this.addEventListeners();
};

CheckboxExpandableList.prototype.addEventListeners = function addEventListeners() {
  $(selectorToggle).on('click', this.handleToggleClick.bind(this));
};

CheckboxExpandableList.prototype.handleToggleClick = function handleToggleClick(e) {
  e.preventDefault();

  $(e.currentTarget).closest(selectorCheckboxExpandableList).toggleClass(classExpanded);
};

$(() => new CheckboxExpandableList());
