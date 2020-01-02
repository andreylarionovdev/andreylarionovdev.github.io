$(document).ready(function () {
  const className = 'header';
  const classExpanded = `${className}--expanded`;
  const classMenuBtn = `${className}__menu-button`;
  const classCloseBtn = `${className}__close-button`;

  $(`.${classMenuBtn}`).on('click', function () {
    const $header = $(this).closest(`.${className}`);
    $header.toggleClass(classExpanded)
  });
  $(`.${classCloseBtn}`).on('click', function () {
    const $header = $(this).closest(`.${className}`);
    $header.removeClass(classExpanded);
  });
});