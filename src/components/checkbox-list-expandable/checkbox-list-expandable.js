import $ from 'jquery';

const CheckboxListExpandable = function CheckboxListExpandable() {
  this.init();
};

CheckboxListExpandable.prototype.init = function init() {
  this.classExpanded = 'checkbox-list-expandable_expanded';

  this.selectorToggle = '.js-checkbox-list-expandable__toggle-button';
  this.selectorCheckboxExpandableList = '.js-checkbox-list-expandable';

  this.addEventListeners();
};

CheckboxListExpandable.prototype.addEventListeners = function addEventListeners() {
  $(this.selectorToggle).on('click', this.handleToggleClick.bind(this));
};

CheckboxListExpandable.prototype.handleToggleClick = function handleToggleClick(e) {
  e.preventDefault();

  $(e.currentTarget).closest(this.selectorCheckboxExpandableList).toggleClass(this.classExpanded);
};

$(() => new CheckboxListExpandable());
