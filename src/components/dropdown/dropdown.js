import $ from 'jquery';

const Dropdown = function Dropdown() {
  this.init();
};

Dropdown.prototype.init = function init() {
  this.classExpanded = 'dropdown_expanded';
  this.classEdited = 'dropdown_edited';
  this.classEmpty = 'dropdown_empty';
  this.classChangeCountButtonDisabled = 'dropdown__change-count-btn_disabled';

  this.selectorDropdown = '.js-dropdown';
  this.selectorToggle = '.js-dropdown__toggle';
  this.selectorMenu = '.js-dropdown__menu';
  this.selectorMenuItem = '.js-dropdown__menu-item';
  this.selectorChangeCountButton = '.js-dropdown__change-count-btn';
  this.selectorCount = '.js-dropdown__count';
  this.selectorClearButton = '.js-dropdown__clear-button';
  this.selectorApplyButton = '.js-dropdown__apply-button';

  this.addEventListeners();
};

Dropdown.prototype.addEventListeners = function addEventListeners() {
  $(this.selectorToggle).on('click', this.handleToggleClick.bind(this));
  $(this.selectorChangeCountButton).on('click', this.handleChangeCountButtonClick.bind(this));
  $(this.selectorClearButton).on('click', this.handleClearButtonClick.bind(this));
  $(this.selectorApplyButton).on('click', this.handleApplyButtonClick.bind(this));
};

Dropdown.prototype.handleToggleClick = function handleToggleClick(e) {
  e.preventDefault();

  const $dropdown = $(e.currentTarget).closest(this.selectorDropdown);
  if ($dropdown.find(this.selectorMenu).length === 1) {
    $dropdown.toggleClass(this.classExpanded);
  }
};

Dropdown.prototype.handleChangeCountButtonClick = function handleChangeCountButtonClick(e) {
  e.preventDefault();

  const $button = $(e.currentTarget).closest(this.selectorChangeCountButton);
  const operator = $button.data('op');

  const $li = $(e.currentTarget).closest(this.selectorMenuItem);

  if (operator === '+') {
    $li.find(this.selectorChangeCountButton).removeClass(this.classChangeCountButtonDisabled);
  }
  const changeCount = {
    '+': (x) => x + 1,
    '-': (x) => x - 1,
  };

  const $count = $li.find(this.selectorCount);
  const n = changeCount[operator](parseInt($count.text(), 10));

  if (n < 1) {
    $button.addClass(this.classChangeCountButtonDisabled);
  }

  if (n < 0) {
    return;
  }

  $count.text(n);

  const $dropdown = $(e.currentTarget).closest(this.selectorDropdown);
  $dropdown.addClass(this.classEdited).removeClass(this.classEmpty);
};

Dropdown.prototype.handleClearButtonClick = function handleClearButtonClick(e) {
  e.preventDefault();

  const $counts = $(e.currentTarget).closest(this.selectorDropdown).find(this.selectorCount);
  $counts.each((i, o) => $(o).text(0));
};

Dropdown.prototype.handleApplyButtonClick = function handleApplyButtonClick(e) {
  e.preventDefault();

  $(e.currentTarget).closest(this.selectorDropdown).removeClass(`${this.classEdited} ${this.classExpanded}`);
};

$(() => new Dropdown());
