$(document).ready(function () {
    $('.exp-check-list__select').on('click', function () {
        var $dropdown = $(this).closest('.exp-check-list');
        if ($dropdown.hasClass('exp-check-list--expanded')) {
            $dropdown.removeClass('exp-check-list--expanded');
        } else {
            $dropdown.addClass('exp-check-list--expanded');
        }
    });
});