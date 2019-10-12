$(document).ready(function () {
    $('.exp-check-list__select').on('click', function () {
        var $dropdown = $(this).closest('.exp-check-list');
        if ($dropdown.hasClass('exp-check-list--expanded')) {
            $dropdown.removeClass('exp-check-list--expanded');
        } else {
            $dropdown.addClass('exp-check-list--expanded');
        }
        resize($dropdown);
    });

    var resize = function($dropdown) {
        var $drop   = $dropdown.find('.exp-check-list__list')
            , dropH = 0
        ;
        if ($dropdown.hasClass('exp-check-list--expanded')) {
            dropH = $drop.outerHeight() + 'px';
        }
        $dropdown.css('margin-bottom', dropH);
    };

    $('.exp-check-list--expanded').each(function (i, o) {
        resize($(o));
    });
});