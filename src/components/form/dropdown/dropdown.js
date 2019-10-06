$(document).ready(function () {
    var $select = $('.dropdown__select')
        , expandedClass = 'dropdown--expanded'
    ;
    // Dropdown outside click
    $(document).on('click', function (e) {
        return;
        var $dropdown = $(e.target).closest('.dropdown')
            , dropdownIsParentOfThis = $dropdown.length === 1
        ;
        if (dropdownIsParentOfThis) {
            return;
        }
        $('.dropdown').removeClass(expandedClass);
    });
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
});