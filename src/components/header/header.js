import $ from 'jquery';

$(() => {
  $('.js-header__nav-toggle').on('click', (e) => {
    const $header = $(e.currentTarget).closest('.js-header');
    $header.find('.js-header__nav').toggleClass('header__nav--active');
  });
});
