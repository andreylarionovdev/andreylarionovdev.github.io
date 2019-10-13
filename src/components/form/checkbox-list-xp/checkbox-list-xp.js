$(document).ready(function () {
    $('.checkbox-list-xp__select').on('click', function () {
        var $dropdown = $(this).closest('.checkbox-list-xp');
        if ($dropdown.hasClass('checkbox-list-xp--expanded')) {
            $dropdown.removeClass('checkbox-list-xp--expanded');
        } else {
            $dropdown.addClass('checkbox-list-xp--expanded');
        }
        resize($dropdown);
    });

    var resize = function($dropdown) {
        var $drop   = $dropdown.find('.checkbox-list-xp__list')
            , dropH = 0
        ;
        if ($dropdown.hasClass('checkbox-list-xp--expanded')) {
            dropH = $drop.outerHeight() + 'px';
        }
        $dropdown.css('margin-bottom', dropH);
    };

    $('.checkbox-list-xp--expanded').each(function (i, o) {
        resize($(o));
    });
});