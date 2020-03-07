import $ from 'jquery';
import 'air-datepicker';

const DatepickerDateRange = function DatepickerDateRange($element) {
  this.init($element);
};

DatepickerDateRange.prototype.init = function init($element) {
  this.emptyValue = 'ДД.ММ.ГГГГ';

  this.selectorDropdownFrom = '.js-datepicker-date-range__dropdown-group-from .js-datepicker-date-range__dropdown';
  this.selectorInputFrom = '.js-datepicker-date-range__dropdown-group-from input';
  this.selectorDropdownTo = '.js-datepicker-date-range__dropdown-group-to .js-datepicker-date-range__dropdown';
  this.selectorInputTo = '.js-datepicker-date-range__dropdown-group-to input';

  this.selectorClearButton = '[data-action="clear"]';
  this.selectorApplyButton = '[data-action="apply"]';

  this.$inputFrom = $element.find(this.selectorInputFrom);
  this.$inputTo = $element.find(this.selectorInputTo);

  this.$dropdownFrom = $element.find(this.selectorDropdownFrom);
  this.$dropdownTo = $element.find(this.selectorDropdownTo);

  this.initDatepicker($element);

  this.setDates();
  this.addEventListeners();
};

DatepickerDateRange.prototype.initDatepicker = function initDatepicker($element) {
  const that = this;

  this.$datepickerApi = this.$inputFrom.datepicker({
    range: true,
    navTitles: {
      days: 'MM <i>yyyy</i>',
    },
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>',
    onShow(inst) {
      inst.$datepicker.css('position', 'absolute');
      inst.$datepicker.css('width', `${$element.outerWidth()}px`);
      that.addButtons(inst.$datepicker);

      const pixelPerfectTop = parseInt(inst.$datepicker.css('top'), 10) - 6; // ;)
      inst.$datepicker.css('top', `${pixelPerfectTop}px`);
    },
  }).data('datepicker');
};

DatepickerDateRange.prototype.addEventListeners = function addEventListeners() {
  this.$dropdownFrom.on('click', this.handleDropdownClick.bind(this));
  this.$dropdownTo.on('click', this.handleDropdownClick.bind(this));
};

DatepickerDateRange.prototype.handleDropdownClick = function handleDropdownClick() {
  this.$datepickerApi.show();
};

DatepickerDateRange.prototype.setDates = function setDates() {
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

DatepickerDateRange.prototype.clear = function clear() {
  this.$dropdownFrom.find('.dropdown__selection').text(this.emptyValue);
  this.$dropdownFrom.find('.dropdown__input').val('');
  this.$dropdownTo.find('.dropdown__selection').text(this.emptyValue);
  this.$dropdownTo.find('.dropdown__input').val('');
};

DatepickerDateRange.prototype.update = function update() {
  const dates = this.$datepickerApi.selectedDates;

  if (dates.length === 0) return;

  const ddFrom = `0${dates[0].getDate()}`.slice(-2);
  const mmFrom = `0${dates[0].getMonth() + 1}`.slice(-2);
  const yyyyFrom = dates[0].getFullYear();

  const formatFrom = `${ddFrom}.${mmFrom}.${yyyyFrom}`;

  this.$dropdownFrom.find('.js-dropdown__selection').text(formatFrom);
  this.$dropdownFrom.find('.js-dropdown__input').val(formatFrom);

  if (dates.length > 1) {
    const ddTo = `0${dates[1].getDate()}`.slice(-2);
    const mmTo = `0${dates[1].getMonth() + 1}`.slice(-2);
    const yyyyTo = dates[1].getFullYear();

    const formatTo = `${ddTo}.${mmTo}.${yyyyTo}`;

    this.$dropdownTo.find('.js-dropdown__selection').text(formatTo);
    this.$dropdownTo.find('.js-dropdown__input').val(formatTo);
  }
};

DatepickerDateRange.prototype.addButtons = function addButtons($dpElement) {
  const $clearBtn = this.createButton('clear', 'Очистить');
  const $applyBtn = this.createButton('apply', 'Применить');
  if ($dpElement.find(this.selectorClearButton).length === 0) {
    $clearBtn.on('click', this.handleClearButtonClick.bind(this));
  }
  if ($dpElement.find(this.selectorApplyButton).length === 0) {
    $applyBtn.on('click', this.handleApplyButtonClick.bind(this));
  }
  if ($dpElement.find('.js-datepicker__footer').length === 0) {
    const $footer = $('<div class="datepicker__footer js-datepicker__footer"></div>');
    $footer.append($clearBtn).append($applyBtn);
    $dpElement.append($footer);
  }
};

DatepickerDateRange.prototype.createButton = function createButton(action, caption) {
  const clearClass = action === 'clear' ? 'button_color_gray' : '';
  const template = `<button class="button button_theme_textual ${clearClass}" type="button" data-action="${action}">
                      <div class="button__inner-wrapper">
                        <span class="button__caption">${caption}</span>
                      </div>
                    </button>`;
  return $(template);
};

DatepickerDateRange.prototype.handleClearButtonClick = function handleClearButtonClick() {
  this.$datepickerApi.clear();
  this.clear();
};

DatepickerDateRange.prototype.handleApplyButtonClick = function handleApplyButtonClick() {
  this.$datepickerApi.hide();
  this.update();
};

$(() => $('.js-datepicker-date-range').each((i, o) => new DatepickerDateRange($(o))));
