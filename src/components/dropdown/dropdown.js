import $ from 'jquery';
import {
  GUEST_TYPE,
  ROOM_TYPE,
  COUNT_MIN_VALUE,
  selectorMenu,
  selectorMenuItem,
  selectorCountButton,
  selectorDecCountButton,
  selectorCount,
  selectorToggleButton,
  selectorTextInput,
  selectorClearButton,
  selectorApplyButton,
  classExpanded,
  classClearButtonHidden,
  classCountButtonDisabled,
} from './const';

const Dropdown = function Dropdown($element, options) {
  this.init($element, options);
};

Dropdown.prototype.guestsType = GUEST_TYPE;
Dropdown.prototype.roomsType = ROOM_TYPE;

Dropdown.prototype.init = function init($element, options) {
  this.$element = $element;
  this.$element.data('api', this);

  this.$toggleButton = this.$element.find(selectorToggleButton);
  this.$input = this.$element.find(selectorTextInput);
  this.$changeCountButton = this.$element.find(selectorCountButton);
  this.$clearButton = this.$element.find(selectorClearButton);
  this.$applyButton = this.$element.find(selectorApplyButton);

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

  if (this.$element.find(selectorMenu).length === 1) {
    this.$element.toggleClass(classExpanded);
  }
};

Dropdown.prototype.handleChangeCountButtonClick = function handleChangeCountButtonClick(e) {
  e.preventDefault();

  const $button = $(e.currentTarget).closest(selectorCountButton);
  const operator = this.parseModifierValue($button, 'js-dropdown__counter-button_type_');

  const $li = $(e.currentTarget).closest(selectorMenuItem);

  if (operator === 'inc') {
    $li.find(selectorCountButton).removeClass(classCountButtonDisabled);
  }
  const changeCount = {
    inc: (value) => value + 1,
    dec: (value) => value - 1,
  };

  const $counter = $li.find(selectorCount);
  const counterValue = changeCount[operator](parseInt($counter.text(), 10));

  if (counterValue === COUNT_MIN_VALUE) {
    $button.addClass(classCountButtonDisabled);
  }

  if (counterValue < COUNT_MIN_VALUE) {
    return;
  }

  $counter.text(counterValue);

  this.$clearButton.removeClass(classClearButtonHidden);

  this.updateState();
  if (this.type === ROOM_TYPE) {
    this.updateValue();
  }
  this.updateView();
};

Dropdown.prototype.handleClearButtonClick = function handleClearButtonClick(e) {
  e.preventDefault();

  const $counters = this.$element.find(selectorCount);
  $counters.each((_, counter) => $(counter).text(0));

  const $decButtons = this.$element.find(selectorDecCountButton);
  $decButtons.each((_, decButton) => $(decButton).addClass(classCountButtonDisabled));

  this.updateState();
  this.updateView();
};

Dropdown.prototype.handleApplyButtonClick = function handleApplyButtonClick(e) {
  e.preventDefault();

  this.updateValue();
  this.$element.removeClass(classExpanded);
};

Dropdown.prototype.updateState = function updateState() {
  this.state.total = 0;
  this.$element.find(selectorMenuItem).each((index, menuItem) => {
    const count = parseInt($(menuItem).find(selectorCount).text(), 10);
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
    this.$clearButton.addClass(classClearButtonHidden);
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
