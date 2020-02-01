$(document).ready(function () {
  const classExpanded = `checkbox-list-xp--expanded`;

  $(`.js-checkbox-list-xp__toggle`).on('click', function () {
    const $dropdown = $(this).closest(`.js-checkbox-list-xp`);

    $dropdown.toggleClass(classExpanded);
  });
});