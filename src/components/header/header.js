$(document).ready(function () {
    $('.header__menu-button').on('click', function () {
        var $header = $(this).closest('.header');
        if ($header.hasClass('header--expanded')) {
            $header.removeClass('header--expanded');
        } else {
            $header.addClass('header--expanded');
        }
    });
    $('.header__close-button').on('click', function () {
        var $header = $(this).closest('.header');
            $header.removeClass('header--expanded');
    });
});