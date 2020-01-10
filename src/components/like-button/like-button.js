$(document).ready(function () {
  const className = 'like-button';
  const classFavorite = `${className}--favorite`;
  const classCounter = `${className}__counter`;
  const classHeart = `${className}__heart`;

  $(`.${className}`).on('click', function () {
    $(this).toggleClass(classFavorite);

    const $counter = $(this).find(`.${classCounter}`);
    const $heart = $(this).find(`.${classHeart}`);
    let iconName = '';

    let count = parseInt($counter.text());
    if ($(this).hasClass(classFavorite)) {
      iconName = 'favorite';
      count += 1;
    } else {
      iconName = 'favorite_border';
      count -= 1;
    }
    $counter.text(count);
    $heart.text(iconName);
  });
});