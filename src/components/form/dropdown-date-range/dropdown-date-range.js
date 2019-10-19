$(document).ready(function () {
    var selector = '.dropdown-date-range'
        , $rangeDropdown = $(selector)
    ;

    $rangeDropdown.each(function (i, o) {
        var $inputFrom = $(o).find(selector + '__from').find('input')
            , $dropdownFrom = $(o).find(selector + '__from').find(selector + '__dropdown')
            , $dropdownTo   = $(o).find(selector + '__to').find(selector + '__dropdown')
        ;
        var $datepicker = $inputFrom.datepicker({
            range: true,
            onSelect: function (formattedDate, date, inst) {
                var formattedDates = formattedDate.split(',');
                $dropdownFrom.find('.dropdown__text').text(formattedDates[0]);
                $dropdownFrom.find('.dropdown__input').val(formattedDates[0]);
                if (formattedDates.length > 1) {
                    $dropdownTo.find('.dropdown__text').text(formattedDates[1]);
                    $dropdownTo.find('.dropdown__input').val(formattedDates[1]);
                    $datepicker.hide();
                }
            }
        }).data('datepicker');

        $dropdownFrom.on('click', function () {
            $datepicker.show();
        });

        $dropdownTo.on('click', function () {
            $datepicker.show();
        });
    });
});