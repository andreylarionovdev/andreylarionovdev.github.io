import $ from 'jquery';

$(() => {
  const classFavorite = 'like-button--favorite';

  $('.js-like-button').on('click', (e) => {
    $(e.currentTarget).toggleClass(classFavorite);

    const $counter = $(e.currentTarget).find('.js-like-button__count');

    const isFavorite = $(e.currentTarget).hasClass(classFavorite);

    let count = parseInt($counter.text(), 10);
    const iconName = isFavorite ? 'favorite' : 'favorite_border';
    count = isFavorite ? count + 1 : count - 1;

    $counter.text(count);
    $(e.currentTarget).find('.js-like-button__icon').text(iconName);
  });
});
