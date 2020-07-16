import $ from 'jquery';
import {
  GUEST_TYPE,
  ROOM_TYPE,
  COUNT_MIN_VALUE,
  SELECTOR_MENU,
  SELECTOR_MENU_ITEM,
  SELECTOR_COUNTER_BUTTON,
  SELECTOR_DEC_COUNTER_BUTTON,
  SELECTOR_COUNTER,
  SELECTOR_TOGGLE_BUTTON,
  SELECTOR_TEXT_INPUT,
  SELECTOR_CLEAR_BUTTON,
  SELECTOR_APPLY_BUTTON,
  CLASS_EXPANDED,
  CLASS_CLEAR_BUTTON_HIDDEN,
  CLASS_COUNT_BUTTON_DISABLED,
} from './const';

const Dropdown = function Dropdown($element, options) {
  this.init($element, options);
};

Dropdown.prototype.guestsType = GUEST_TYPE;
Dropdown.prototype.roomsType = ROOM_TYPE;

Dropdown.prototype.init = function init($element, options) {
  this.$element = $element;
  this.$element.data('api', this);

  this.$toggleButton = this.$element.find(SELECTOR_TOGGLE_BUTTON);
  this.$input = this.$element.find(SELECTOR_TEXT_INPUT);
  this.$changeCountButton = this.$element.find(SELECTOR_COUNTER_BUTTON);
  this.$clearButton = this.$element.find(SELECTOR_CLEAR_BUTTON);
  this.$applyButton = this.$element.find(SELECTOR_APPLY_BUTTON);

  this.parseOptions(options);
  this.addEventListeners();
};

Dropdown.prototype.parseOptions = function parseOptions({ type }) {
  this.type = type;

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
      categories: [
        { count: 0, wordForms: ['гость', ...new Array(3).fill('гостя'), 'гостей'] },
        { count: 0, wordForms: ['гость', ...new Array(3).fill('гостя'), 'гостей'] },
        { count: 0, wordForms: ['младенец', ...new Array(3).fill('младенца'), 'младенцев'] },
      ],
    },
    [ROOM_TYPE]: {
      total: 0,
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

  if (this.$element.find(SELECTOR_MENU).length === 1) {
    this.$element.toggleClass(CLASS_EXPANDED);
  }
};

Dropdown.prototype.handleChangeCountButtonClick = function handleChangeCountButtonClick(e) {
  e.preventDefault();

  const $button = $(e.currentTarget).closest(SELECTOR_COUNTER_BUTTON);
  const operator = this.parseModifierValue($button, 'js-dropdown__counter-button_type_');

  const $li = $(e.currentTarget).closest(SELECTOR_MENU_ITEM);

  if (operator === 'inc') {
    $li.find(SELECTOR_COUNTER_BUTTON).removeClass(CLASS_COUNT_BUTTON_DISABLED);
  }
  const changeCount = {
    inc: (value) => value + 1,
    dec: (value) => value - 1,
  };

  const $counter = $li.find(SELECTOR_COUNTER);
  const counterValue = changeCount[operator](parseInt($counter.text(), 10));

  if (counterValue === COUNT_MIN_VALUE) {
    $button.addClass(CLASS_COUNT_BUTTON_DISABLED);
  }

  if (counterValue < COUNT_MIN_VALUE) {
    return;
  }

  $counter.text(counterValue);

  this.$clearButton.removeClass(CLASS_CLEAR_BUTTON_HIDDEN);

  this.updateState();
  if (this.type === ROOM_TYPE) {
    this.updateValue();
  }
  this.updateView();
};

Dropdown.prototype.handleClearButtonClick = function handleClearButtonClick(e) {
  e.preventDefault();

  const $counters = this.$element.find(SELECTOR_COUNTER);
  $counters.each((_, counter) => $(counter).text(0));

  const $decButtons = this.$element.find(SELECTOR_DEC_COUNTER_BUTTON);
  $decButtons.each((_, decButton) => $(decButton).addClass(CLASS_COUNT_BUTTON_DISABLED));

  this.updateState();
  this.updateView();
};

Dropdown.prototype.handleApplyButtonClick = function handleApplyButtonClick(e) {
  e.preventDefault();

  this.updateValue();
  this.$element.removeClass(CLASS_EXPANDED);
};

Dropdown.prototype.updateState = function updateState() {
  this.state.total = 0;
  this.$element.find(SELECTOR_MENU_ITEM).each((index, menuItem) => {
    const count = parseInt($(menuItem).find(SELECTOR_COUNTER).text(), 10);
    this.state.categories[index].count = count;
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
  const value = this.buildValue(countsWithCategories);
  this.$input.val(value);
};

Dropdown.prototype.updateView = function updateView() {
  if (this.state.total === 0) {
    this.$clearButton.addClass(CLASS_CLEAR_BUTTON_HIDDEN);
  }
};

Dropdown.prototype.buildValue = function buildValue(countsWithCategories) {
  if (this.state.total === 0) {
    return '';
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

Dropdown.prototype.parseModifierValue = function parseModifierValue($element, startsWith) {
  const modifierClass = $element.attr('class')
    .split(' ')
    .find((className) => className.startsWith(startsWith));

  return modifierClass ? modifierClass.split('_').pop() : null;
};

export default Dropdown;
