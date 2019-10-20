$(document).ready(function () {
    var selector = '.dropdown-date-range'
        , $rangeDropdown = $(selector)
    ;

    $rangeDropdown.each(function (i, o) {
        var $inputFrom = $(o).find(selector + '__from').find('input')
            , $inputTo = $(o).find(selector + '__to').find('input')
            , $dropdownFrom = $(o).find(selector + '__from').find(selector + '__dropdown')
            , $dropdownTo   = $(o).find(selector + '__to').find(selector + '__dropdown')
        ;
        var $datepicker = $inputFrom.datepicker({
            range: true,
            navTitles: {
                days: 'MM <i>yyyy</i>'
            },
            prevHtml: '<i class="material-icons">arrow_back</i>',
            nextHtml: '<i class="material-icons">arrow_forward</i>',
            onShow: function (inst) {
                var parentWidth = $(o).outerWidth();
                resizeDatepicker(parentWidth);
                addActionButtons(inst.$datepicker);
            }
        }).data('datepicker');
        // Handle pre-selected date from input values
        var
              arrIsoFrom    = $inputFrom.val().split('.')
            , arrIsoTo      = $inputTo.val().split('.')
            // Convert to ISO formatted date string
            , strIsoFrom    = arrIsoFrom[2] + '-' + arrIsoFrom[1] + '-' + arrIsoFrom[0]
            , strIsoTo      = arrIsoTo[2] + '-' + arrIsoTo[1] + '-' + arrIsoTo[0]
            // Convert string to date
            , dateFrom      = new Date(strIsoFrom)
            , dateTo        = new Date(strIsoTo)
            , initDates     = []
        ;
        // Add to array if is a valid date
        if (dateFrom instanceof Date && ! isNaN(dateFrom)) {
            initDates.push(dateFrom);
        }
        if (dateTo instanceof Date && ! isNaN(dateTo)) {
            initDates.push(dateTo);
        }
        // Set initially dates from array of Date instances
        if (initDates.length > 0) {
            $datepicker.selectDate(initDates);
        }

        $dropdownFrom.on('click', function () {
            $datepicker.show();
        });
        $dropdownTo.on('click', function () {
            $datepicker.show();
        });

        var resizeDatepicker = function (toWidth) {
            $('.datepicker.active').css('width', toWidth+'px');
        };

        var clearDropdown = function ($dropdown) {
            var emptyValue = 'ДД.ММ.ГГГГ';
            $dropdown.find('.dropdown__text').text(emptyValue);
            $dropdown.find('.dropdown__input').val('');
        };

        var updateDropdown = function (dates, dropdowns) {
            var from = ('0' + dates[0].getDate()).slice(-2) + '.'
                + ('0' + (dates[0].getMonth() + 1)).slice(-2) + '.'
                + dates[0].getFullYear();
            dropdowns[0].find('.dropdown__text').text(from);
            dropdowns[0].find('.dropdown__input').val(from);
            if (dates.length > 1) {
                var to = ('0' + dates[1].getDate()).slice(-2) + '.'
                    + ('0' + (dates[1].getMonth() + 1)).slice(-2) + '.'
                    + dates[1].getFullYear();
                dropdowns[1].find('.dropdown__text').text(to);
                dropdowns[1].find('.dropdown__input').val(to);
            }
        };

        var addActionButtons = function ($_datepicker) {
            var $clearBtn = $('<a class="datepicker--clear-btn">Очистить</a>');
            var $applyBtn = $('<a class="datepicker--apply-btn">Применить</a>');
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