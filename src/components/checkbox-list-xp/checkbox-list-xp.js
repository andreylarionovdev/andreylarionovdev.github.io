$(document).ready(function () {
  const className = 'checkbox-list-xp';
  const classExpanded = `${className}--expanded`;

  $(`.${className}__toggle`).on('click', function () {
    const $dropdown = $(this).closest(`.${className}`);

    $dropdown.toggleClass(classExpanded);
  });
});