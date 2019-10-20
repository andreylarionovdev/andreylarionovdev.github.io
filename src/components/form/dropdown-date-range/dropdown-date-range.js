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
            autoClose: true,
            navTitles: {
                days: 'MM <i>yyyy</i>'
            },
            prevHtml: '<i class="material-icons">arrow_back</i>',
            nextHtml: '<i class="material-icons">arrow_forward</i>',
            onSelect: function (formattedDate, date, inst) {
                var formattedDates = formattedDate.split(',');
                $dropdownFrom.find('.dropdown__text').text(formattedDates[0]);
                $dropdownFrom.find('.dropdown__input').val(formattedDates[0]);
                if (formattedDates.length > 1) {
                    $dropdownTo.find('.dropdown__text').text(formattedDates[1]);
                    $dropdownTo.find('.dropdown__input').val(formattedDates[1]);
                }
            },
            onShow: function () {
                var parentWidth = $(o).outerWidth();
                resizeDatepicker(parentWidth);
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
    });
});