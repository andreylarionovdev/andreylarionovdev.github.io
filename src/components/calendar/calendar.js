import $ from 'jquery';
import 'air-datepicker';
import {
  selectorDropdown,
  selectorToggleButton,
  selectorDropdownInput,
  selectorClearButton,
  selectorApplyButton,
  selectorContainer,
  classThemeInline,
} from './const';

const Calendar = function Calendar($element) {
  this.init($element);
};

Calendar.prototype.init = function init($element) {
  this.emptyValue = '';

  this.$dropdownFrom = $element.find(selectorDropdown).eq(0);
  this.$dropdownTo = $element.find(selectorDropdown).eq(1);

  this.$inputFrom = this.$dropdownFrom.find('input');
  this.$inputTo = this.$dropdownTo.find('input');

  this.$datepickerContainer = $element.find(selectorContainer);

  this.currentInputValues = [];
  this.isInline = $element.hasClass(classThemeInline);

  this.initDatepicker($element);

  this.setDates();
  this.addEventListeners();

  if (this.isInline) {
    this.$datepickerApi.show();
  }
};

Calendar.prototype.initDatepicker = function initDatepicker() {
  const that = this;
  this.$datepickerApi = this.$datepickerContainer.datepicker({
    range: true,
    minDate: new Date(),
    navTitles: {
      days: 'MM <i>yyyy</i>',
    },
    prevHtml: '<span class="material-icons">arrow_back</span>',
    nextHtml: '<span class="material-icons">arrow_forward</span>',
    onShow(inst) {
      that.addButtons(inst.$datepicker);
    },
    onSelect() {
      // We shouldn't change input values immediately
      that.$inputFrom.val(that.currentInputValues[0]);
      that.$inputTo.val(that.currentInputValues[1]);
      that.toggleClearButton();
    },
  }).data('datepicker');
};

Calendar.prototype.addEventListeners = function addEventListeners() {
  this.$dropdownFrom.find(selectorToggleButton).on('click', this.handleToggleButtonClick.bind(this));
  this.$dropdownTo.find(selectorToggleButton).on('click', this.handleToggleButtonClick.bind(this));
};

Calendar.prototype.handleToggleButtonClick = function handleToggleButtonClick() {
  const isVisible = this.$datepickerApi.$el.find('.datepicker').is(':visible');
  if (isVisible) {
    this.$datepickerApi.hide();
  } else {
    this.$datepickerApi.show();
  }
};

Calendar.prototype.setDates = function setDates() {
  this.currentInputValues[0] = this.$inputFrom.val();
  this.currentInputValues[1] = this.$inputTo.val();

  const arrIsoFrom = this.$inputFrom.val().split('.');
  const arrIsoTo = this.$inputTo.val().split('.');

  const dateFrom = new Date(`${arrIsoFrom[2]}-${arrIsoFrom[1]}-${arrIsoFrom[0]}`);
  const dateTo = new Date(`${arrIsoTo[2]}-${arrIsoTo[1]}-${arrIsoTo[0]}`);

  const initDates = [];

  if (dateFrom instanceof Date && !Number.isNaN(dateFrom.getTime())) {
    initDates.push(dateFrom);
  }
  if (dateTo instanceof Date && !Number.isNaN(dateTo.getTime())) {
    initDates.push(dateTo);
  }

  if (initDates.length > 0) {
    this.$datepickerApi.selectDate(initDates);
  }
};

Calendar.prototype.clear = function clear() {
  this.$dropdownFrom.find(selectorDropdownInput).val(this.emptyValue);
  this.$dropdownTo.find(selectorDropdownInput).val(this.emptyValue);
  this.currentInputValues = [this.emptyValue, this.emptyValue];
};

Calendar.prototype.update = function update() {
  const dates = this.$datepickerApi.selectedDates;

  if (dates.length === 0) return;

  const ddFrom = `0${dates[0].getDate()}`.slice(-2);
  const mmFrom = `0${dates[0].getMonth() + 1}`.slice(-2);
  const yyyyFrom = dates[0].getFullYear();

  const formatFrom = `${ddFrom}.${mmFrom}.${yyyyFrom}`;

  this.$dropdownFrom.find(selectorDropdownInput).val(formatFrom);
  this.currentInputValues[0] = formatFrom;

  if (dates.length > 1) {
    const ddTo = `0${dates[1].getDate()}`.slice(-2);
    const mmTo = `0${dates[1].getMonth() + 1}`.slice(-2);
    const yyyyTo = dates[1].getFullYear();

    const formatTo = `${ddTo}.${mmTo}.${yyyyTo}`;

    this.$dropdownTo.find(selectorDropdownInput).val(formatTo);
    this.currentInputValues[1] = formatTo;
  }
};

Calendar.prototype.addButtons = function addButtons($dpElement) {
  const $clearBtn = this.createButton('clear', 'Очистить');
  const $applyBtn = this.createButton('apply', 'Применить');
  if ($dpElement.find(selectorClearButton).length === 0) {
    $clearBtn.on('click', this.handleClearButtonClick.bind(this));
  }
  if ($dpElement.find(selectorApplyButton).length === 0) {
    $applyBtn.on('click', this.handleApplyButtonClick.bind(this));
  }
  if ($dpElement.find('.js-datepicker__footer').length === 0) {
    const $footer = $('<div class="datepicker__footer js-datepicker__footer"></div>');
    $footer.append($clearBtn).append($applyBtn);
    $dpElement.append($footer);
  }
  this.toggleClearButton();
};

Calendar.prototype.toggleClearButton = function toggleClearButton() {
  const isClearButtonDisabled = this.$datepickerApi.selectedDates.length < 2;
  this.$datepickerContainer.find(selectorClearButton).toggleClass('button_hidden', isClearButtonDisabled);
};

Calendar.prototype.createButton = function createButton(action, caption) {
  const clearClass = action === 'clear' ? 'button_hovered' : '';
  const template = `<button class="button button_theme_textual ${clearClass}" type="button" data-action="${action}">
                      <div class="button__inner-wrapper">
                        <span class="button__caption">${caption}</span>
                      </div>
                    </button>`;
  return $(template);
};

Calendar.prototype.handleClearButtonClick = function handleClearButtonClick() {
  if (this.isInline) return;

  this.$datepickerApi.clear();
  this.clear();
};

Calendar.prototype.handleApplyButtonClick = function handleApplyButtonClick() {
  if (this.isInline) return;

  this.$datepickerApi.hide();
  this.update();
};

$(() => $('.js-calendar').each((_, calendarElement) => new Calendar($(calendarElement))));
