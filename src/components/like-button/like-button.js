$(document).ready(function () {
  const classFavorite = 'like-button--favorite';

  $(`.js-like-button`).on('click', function () {
    $(this).toggleClass(classFavorite);

    const $counter = $(this).find(`.js-like-button__count`);

    let count = parseInt($counter.text());
    let iconName = '';

    if ($(this).hasClass(classFavorite)) {
      iconName = 'favorite';
      count += 1;
    } else {
      iconName = 'favorite_border';
      count -= 1;
    }

    $counter.text(count);
    $(this).find('.js-like-button__heart').text(iconName);
  });
});