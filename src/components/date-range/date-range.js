$(document).ready(function () {

  $('.js-date-range').each(function (i, o) {
    const $inputFrom = $(o).find(`.js-date-range__from input`);

    const $datepicker = $inputFrom.datepicker({
      range: true,
      navTitles: {
        days: 'MM <i>yyyy</i>'
      },
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      onShow: function (inst) {
        inst.$datepicker.addClass('card').css('position', 'absolute');
        inst.$datepicker.css('width', `${$(o).outerWidth()}px`);
        addActionButtons(inst.$datepicker);
      }
    }).data('datepicker');

    const $inputTo = $(o).find(`.js-date-range__to input`);

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

    const $dropdownFrom = $(o).find('.js-date-range__from .js-date-range__dropdown');
    const $dropdownTo = $(o).find('.js-date-range__to .js-date-range__dropdown');

    $dropdownFrom.on('click', function () {
      $datepicker.show();
    });
    $dropdownTo.on('click', function () {
      $datepicker.show();
    });

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

      dropdowns[0].find('.js-dropdown__text').text(from);
      dropdowns[0].find('.js-dropdown__data-input').val(from);

      if (dates.length > 1) {
        const to = ('0' + dates[1].getDate()).slice(-2) + '.'
          + ('0' + (dates[1].getMonth() + 1)).slice(-2) + '.'
          + dates[1].getFullYear();

        dropdowns[1].find(`.js-dropdown__text`).text(to);
        dropdowns[1].find(`.js-dropdown__input`).val(to);
      }
    };

    const addActionButtons = function ($_datepicker) {
      const $clearBtn = $('<a class="datepicker__clear-btn js-datepicker__clear-btn">Очистить</a>');
      const $applyBtn = $('<a class="datepicker__apply-btn js-datepicker__apply-btn">Применить</a>');
      if ($_datepicker.find('.js-datepicker__clear-btn').length === 0) {
        $clearBtn.on('click', function () {
          $datepicker.clear();
          clearDropdown($dropdownFrom);
          clearDropdown($dropdownTo);
        });
      }
      if ($_datepicker.find('.js-datepicker__apply-btn').length === 0) {
        $applyBtn.on('click', function () {
          $datepicker.selectDate($datepicker.selectedDates);
          updateDropdown($datepicker.selectedDates, [$dropdownFrom, $dropdownTo]);
          $datepicker.hide();
        });
      }
      if ($_datepicker.find('.js-datepicker__footer').length === 0) {
        const $footer = $('<div class="datepicker__footer js-datepicker__footer"></div>');
        $footer.append($clearBtn).append($applyBtn);
        $_datepicker.append($footer);
      }
    };
  });
});