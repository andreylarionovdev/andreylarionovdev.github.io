import $ from 'jquery';
import {
  GUEST_TYPE,
  ROOM_TYPE,
  COUNT_MIN_VALUE,
} from './const';

const Dropdown = function Dropdown($element) {
  this.init($element);
};

Dropdown.prototype.init = function init($element) {
  this.$element = $element;

  this.classExpanded = 'dropdown_expanded';
  this.classClearButtonHidden = 'dropdown__clear-button_hidden';
  this.classCountButtonDisabled = 'dropdown__count-button_disabled';

  this.selectorMenu = '.js-dropdown__menu';
  this.selectorMenuItem = '.js-dropdown__menu-item';
  this.selectorCountButton = '.js-dropdown__count-button';
  this.selectorDecCountButton = '.js-dropdown__count-button_type_dec';
  this.selectorCount = '.js-dropdown__count';

  this.$toggleButton = this.$element.find('.js-dropdown__toggle-button');
  this.$input = this.$element.find('.js-dropdown__text-input');
  this.$changeCountButton = this.$element.find(this.selectorCountButton);
  this.$clearButton = this.$element.find('.js-dropdown__clear-button');
  this.$applyButton = this.$element.find('.js-dropdown__apply-button');

  this.parseProperties();
  this.addEventListeners();
};

Dropdown.prototype.parseProperties = function parseProperties() {
  this.type = this.$element.attr('data-type');

  if ([GUEST_TYPE, ROOM_TYPE].includes(this.type)) {
    this.initState();
    this.updateState();
    this.updateValue();
    this.updateView();
  }
};

Dropdown.prototype.initState = function initType() {
  const stateTemplates = {
    [GUEST_TYPE]: {
      total: 0,
      emptyValue: 'Сколько гостей',
      categories: [
        { count: 0, wordForms: ['гость', ...new Array(3).fill('гостя'), 'гостей'] },
        { count: 0, wordForms: ['гость', ...new Array(3).fill('гостя'), 'гостей'] },
        { count: 0, wordForms: ['младенец', ...new Array(3).fill('младенца'), 'младенцев'] },
      ],
    },
    [ROOM_TYPE]: {
      total: 0,
      emptyValue: 'Сколько комнат',
      categories: [
        { count: 0, wordForms: ['спальня', ...new Array(3).fill('спальни'), 'спален'] },
        { count: 0, wordForms: ['кровать', ...new Array(3).fill('кровати'), 'кроватей'] },
        { count: 0, wordForms: ['ванная комната', ...new Array(3).fill('ванные комнаты'), 'ванных комнат'] },
      ],
    },
  };

  this.state = stateTemplates[this.type];
};

Dropdown.prototype.addEventListeners = function addEventListeners() {
  this.$toggleButton.on('click', this.handleToggleButtonClick.bind(this));
  this.$changeCountButton.on('click', this.handleChangeCountButtonClick.bind(this));
  this.$clearButton.on('click', this.handleClearButtonClick.bind(this));
  this.$applyButton.on('click', this.handleApplyButtonClick.bind(this));
};

Dropdown.prototype.handleToggleButtonClick = function handleToggleButtonClick(e) {
  e.preventDefault();

  if (this.$element.find(this.selectorMenu).length === 1) {
    this.$element.toggleClass(this.classExpanded);
  }
};

Dropdown.prototype.handleChangeCountButtonClick = function handleChangeCountButtonClick(e) {
  e.preventDefault();

  const $button = $(e.currentTarget).closest(this.selectorCountButton);
  const operator = $button.data('operator');

  const $li = $(e.currentTarget).closest(this.selectorMenuItem);

  if (operator === '+') {
    $li.find(this.selectorCountButton).removeClass(this.classCountButtonDisabled);
  }
  const changeCount = {
    '+': (x) => x + 1,
    '-': (x) => x - 1,
  };

  const $count = $li.find(this.selectorCount);
  const n = changeCount[operator](parseInt($count.text(), 10));

  if (n === COUNT_MIN_VALUE) {
    $button.addClass(this.classCountButtonDisabled);
  }

  if (n < COUNT_MIN_VALUE) {
    return;
  }

  $count.text(n);

  this.$clearButton.removeClass(this.classClearButtonHidden);

  this.updateState();
  if (this.type === ROOM_TYPE) {
    this.updateValue();
  }
  this.updateView();
};

Dropdown.prototype.handleClearButtonClick = function handleClearButtonClick(e) {
  e.preventDefault();

  const $counts = this.$element.find(this.selectorCount);
  $counts.each((i, o) => $(o).text(0));

  const $decButtons = this.$element.find(this.selectorDecCountButton);
  $decButtons.each((i, o) => {
    $(o).addClass(this.classCountButtonDisabled);
  });

  this.updateState();
  this.updateView();
};

Dropdown.prototype.handleApplyButtonClick = function handleApplyButtonClick(e) {
  e.preventDefault();

  this.updateValue();
  this.$element.removeClass(this.classExpanded);
};

Dropdown.prototype.updateState = function updateState() {
  this.state.total = 0;
  this.$element.find(this.selectorMenuItem).each((i, o) => {
    const count = parseInt($(o).find(this.selectorCount).text(), 10);
    this.state.categories[i].count = count;
    this.state.total += count;
  });
};

Dropdown.prototype.updateValue = function updateValue() {
  const countsWithCategories = this.state.categories.map((category) => {
    const { count, wordForms } = category;

    if (count === 0) return '';

    const wordForm = wordForms[count - 1] || wordForms[wordForms.length - 1];

    return `${count} ${wordForm}`;
  });

  this.$input.val(this.buildValue(countsWithCategories));
};

Dropdown.prototype.updateView = function updateView() {
  if (this.state.total === 0) {
    this.$clearButton.addClass(this.classClearButtonHidden);
  }
};

Dropdown.prototype.buildValue = function buildValue(countsWithCategories) {
  if (this.state.total === 0) {
    return this.state.emptyValue;
  }

  if (this.type === GUEST_TYPE) {
    const { wordForms } = this.state.categories[0];
    const wordForm = wordForms[this.state.total - 1] || wordForms[wordForms.length - 1];

    const guests = `${this.state.total} ${wordForm}`;
    const babies = countsWithCategories[countsWithCategories.length - 1];

    return babies ? `${guests}, ${babies}` : guests;
  }

  return countsWithCategories.filter(Boolean).join(', ');
};

$(() => $('.js-dropdown').each((i, o) => new Dropdown($(o))));
