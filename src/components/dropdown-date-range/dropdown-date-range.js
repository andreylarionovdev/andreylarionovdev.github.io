$(document).ready(function () {
  const className = 'dropdown-date-range';
  const $rangeDropdown = $(`.${className}`);

  $rangeDropdown.each(function (i, o) {
    const $inputFrom = $(o).find(`.${className}__from input`);

    const $datepicker = $inputFrom.datepicker({
      range: true,
      navTitles: {
        days: 'MM <i>yyyy</i>'
      },
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      onShow: function (inst) {
        inst.$datepicker.addClass('card');
        const parentWidth = $(o).outerWidth();
        resizeDatepicker(inst.$datepicker, parentWidth);
        addActionButtons(inst.$datepicker);
      }
    }).data('datepicker');

    const $inputTo = $(o).find(`.${className}__to input`);

    // Handle pre-selected date from input values
    const arrIsoFrom = $inputFrom.val().split('.');
    const arrIsoTo = $inputTo.val().split('.');

    // Convert to ISO formatted date string
    const strIsoFrom = arrIsoFrom[2] + '-' + arrIsoFrom[1] + '-' + arrIsoFrom[0]
    const strIsoTo = arrIsoTo[2] + '-' + arrIsoTo[1] + '-' + arrIsoTo[0]

    // Convert string to date
    const dateFrom = new Date(strIsoFrom);
    const dateTo = new Date(strIsoTo);
    const initDates = [];

    // Add to array if is a valid date
    if (dateFrom instanceof Date && !isNaN(dateFrom)) {
      initDates.push(dateFrom);
    }
    if (dateTo instanceof Date && !isNaN(dateTo)) {
      initDates.push(dateTo);
    }

    // Set initially dates from array of Date instances
    if (initDates.length > 0) {
      $datepicker.selectDate(initDates);
    }

    const $dropdownFrom = $(o).find(`.${className}__from .${className}__dropdown`);
    const $dropdownTo = $(o).find(`.${className}__to .${className}__dropdown`);

    $dropdownFrom.on('click', function () {
      $datepicker.show();
    });
    $dropdownTo.on('click', function () {
      $datepicker.show();
    });

    const resizeDatepicker = function ($datepicker, toWidth) {
      $datepicker.css('width', toWidth + 'px');
    };

    const clearDropdown = function ($dropdown) {
      const emptyValue = 'ДД.ММ.ГГГГ';
      $dropdown.find('.dropdown__text').text(emptyValue);
      $dropdown.find('.dropdown__input').val('');
    };

    const updateDropdown = function (dates, dropdowns) {
      if (dates.length === 0) return;

      const from = ('0' + dates[0].getDate()).slice(-2) + '.'
        + ('0' + (dates[0].getMonth() + 1)).slice(-2) + '.'
        + dates[0].getFullYear();

      dropdowns[0].find('.dropdown__text').text(from);
      dropdowns[0].find('.dropdown__input').val(from);
      if (dates.length > 1) {
        const to = ('0' + dates[1].getDate()).slice(-2) + '.'
          + ('0' + (dates[1].getMonth() + 1)).slice(-2) + '.'
          + dates[1].getFullYear();

        dropdowns[1].find(`.dropdown__text`).text(to);
        dropdowns[1].find(`.dropdown__input`).val(to);
      }
    };

    const addActionButtons = function ($_datepicker) {
      const $clearBtn = $('<a class="datepicker--clear-btn">Очистить</a>');
      const $applyBtn = $('<a class="datepicker--apply-btn">Применить</a>');
      if ($_datepicker.find('.datepicker--clear-btn').length === 0) {
        $_datepicker.append($clearBtn);
        $_datepicker.find('.datepicker--clear-btn').on('click', function () {
          $datepicker.clear();
          clearDropdown($dropdownFrom);
          clearDropdown($dropdownTo);
        });
      }
      if ($_datepicker.find('.datepicker--apply-btn').length === 0) {
        $_datepicker.append($applyBtn);
        $_datepicker.find('.datepicker--apply-btn').on('click', function () {
          $datepicker.selectDate($datepicker.selectedDates);
          updateDropdown($datepicker.selectedDates, [$dropdownFrom, $dropdownTo]);
          $datepicker.hide();
        });
      }
    };
  });
});