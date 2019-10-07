$(document).ready(function () {
    var $select         = $('.dropdown__select')
        // , $jsonDropdown = $('.dropdown[data-type="json"]')
        , expandedClass = 'dropdown--expanded'
        , $inc          = $('.dropdown__li-inc')
        , $dec          = $('.dropdown__li-dec')
    ;
    //// By click on select ...
    $select.on('click', function () {
        var $dropdown = $(this).closest('.dropdown');
        if ($dropdown.find('.dropdown__menu').length !== 1) {
            return;
        }
        //// ... toggle modifying class on parent dropdown
        if ($dropdown.hasClass(expandedClass)) {
            $dropdown.removeClass(expandedClass);
        } else {
            $dropdown.addClass(expandedClass);
        }
    });

    // +/- click handler
    const numberChangerOnClick = function () {
        var $li         = $(this).closest('.dropdown__li')
            , $dropdown = $(this).closest('.dropdown')
            , $count    = $li.find('.dropdown__li-count')
            , n         = parseInt($count.text())
            , operator  = '+'
        ;
        if ($(this).closest('.dropdown__li-dec').length === 1) {
            operator = '-';
        }
        switch (operator) {
            case '+':
                n++;
                break;
            case '-':
                n--;
                break;
            default:
                n;
        }
        if (n < 0 || n > 5) {
            return;
        }
        $count.text(n);
        $dropdown.addClass('dropdown--edited');
    };
    $inc.on('click', numberChangerOnClick);
    $dec.on('click', numberChangerOnClick);
});