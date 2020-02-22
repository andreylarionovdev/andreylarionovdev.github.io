import $ from 'jquery';

$(() => {
  $('.js-header__navigation-toggle').on('click', (e) => {
    const $header = $(e.currentTarget).closest('.js-header');
    $header.find('.js-header__navigation').toggleClass('header__navigation--active');
  });
});
