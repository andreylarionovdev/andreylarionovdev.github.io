$(document).ready(function () {
  $('.js-header__nav-toggle').on('click', function () {
    const $header = $(this).closest('.js-header');
    $header.find('.js-header__nav').toggleClass('header__nav--active')
  });
});