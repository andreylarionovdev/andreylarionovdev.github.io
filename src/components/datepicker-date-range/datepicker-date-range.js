import $ from 'jquery';
import 'air-datepicker';

$(() => {
  function clearDropdown($dropdown) {
    const emptyValue = 'ДД.ММ.ГГГГ';
    $dropdown.find('.dropdown__text').text(emptyValue);
    $dropdown.find('.dropdown__input').val('');
  }

  function updateDropdown(dates, dropdowns) {
    if (dates.length === 0) return;

    const ddFrom = `0${dates[0].getDate()}`.slice(-2);
    const mmFrom = `0${dates[0].getMonth() + 1}`.slice(-2);
    const yyyyFrom = dates[0].getFullYear();

    const formatFrom = `${ddFrom}.${mmFrom}.${yyyyFrom}`;

    dropdowns[0].find('.js-dropdown__text').text(formatFrom);
    dropdowns[0].find('.js-dropdown__data-input').val(formatFrom);

    if (dates.length > 1) {
      const ddTo = `0${dates[1].getDate()}`.slice(-2);
      const mmTo = `0${dates[1].getMonth() + 1}`.slice(-2);
      const yyyyTo = dates[1].getFullYear();

      const formatTo = `${ddTo}.${mmTo}.${yyyyTo}`;

      dropdowns[1].find('.js-dropdown__text').text(formatTo);
      dropdowns[1].find('.js-dropdown__input').val(formatTo);
    }
  }

  function addActionButtons($dpApi, $dpElement, $dropdownFrom, $dropdownTo) {
    const $clearBtn = $('<a class="datepicker__clear-btn js-datepicker__clear-btn">Очистить</a>');
    const $applyBtn = $('<a class="datepicker__apply-btn js-datepicker__apply-btn">Применить</a>');
    if ($dpElement.find('.js-datepicker__clear-btn').length === 0) {
      $clearBtn.on('click', () => {
        $dpApi.clear();
        clearDropdown($dropdownFrom);
        clearDropdown($dropdownTo);
      });
    }
    if ($dpElement.find('.js-datepicker__apply-btn').length === 0) {
      $applyBtn.on('click', () => {
        // $dpApi.selectDate($dpApi.selectedDates);
        updateDropdown($dpApi.selectedDates, [$dropdownFrom, $dropdownTo]);
        $dpApi.hide();
      });
    }
    if ($dpElement.find('.js-datepicker__footer').length === 0) {
      const $footer = $('<div class="datepicker__footer js-datepicker__footer"></div>');
      $footer.append($clearBtn).append($applyBtn);
      $dpElement.append($footer);
    }
  }

  function selectDates($dpApi, $inputFrom, $inputTo) {
    // Handle pre-selected date from input values
    const arrIsoFrom = $inputFrom.val().split('.');
    const arrIsoTo = $inputTo.val().split('.');

    // Convert to ISO formatted date string
    const strIsoFrom = `${arrIsoFrom[2]}-${arrIsoFrom[1]}-${arrIsoFrom[0]}`;
    const strIsoTo = `${arrIsoTo[2]}-${arrIsoTo[1]}-${arrIsoTo[0]}`;

    // Convert string to date
    const dateFrom = new Date(strIsoFrom);
    const dateTo = new Date(strIsoTo);
    const initDates = [];

    // Add to array if is a valid date
    if (dateFrom instanceof Date && !Number.isNaN(dateFrom.getTime())) {
      initDates.push(dateFrom);
    }
    if (dateTo instanceof Date && !Number.isNaN(dateTo.getTime())) {
      initDates.push(dateTo);
    }

    if (initDates.length > 0) {
      $dpApi.selectDate(initDates);
    }
  }

  function initEventListeners($dpApi, $dropdownFrom, $dropdownTo) {
    $dropdownFrom.on('click', () => {
      $dpApi.show();
    });
    $dropdownTo.on('click', () => {
      $dpApi.show();
    });
  }

  function createDateRangeInstance($element) {
    const $inputFrom = $element.find('.js-datepicker-date-range__dropdown-group-from input');
    const $inputTo = $element.find('.js-datepicker-date-range__dropdown-group-to input');

    const $dropdownFrom = $element.find('.js-datepicker-date-range__dropdown-group-from .js-datepicker-date-range__dropdown');
    const $dropdownTo = $element.find('.js-datepicker-date-range__dropdown-group-to .js-datepicker-date-range__dropdown');

    const $datepickerApi = $inputFrom.datepicker({
      range: true,
      navTitles: {
        days: 'MM <i>yyyy</i>',
      },
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      onShow(inst) {
        inst.$datepicker.css('position', 'absolute');
        inst.$datepicker.css('width', `${$element.outerWidth()}px`);
        addActionButtons($datepickerApi, inst.$datepicker, $dropdownFrom, $dropdownTo);
      },
    }).data('datepicker');

    selectDates($datepickerApi, $inputFrom, $inputTo);
    initEventListeners($datepickerApi, $dropdownFrom, $dropdownFrom);
  }

  $('.js-datepicker-date-range').each((i, o) => {
    createDateRangeInstance($(o));
  });
});
