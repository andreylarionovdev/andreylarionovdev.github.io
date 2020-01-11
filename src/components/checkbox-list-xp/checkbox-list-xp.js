$(document).ready(function () {
  const className = 'checkbox-list-xp';
  const classExpanded = `${className}--expanded`;

  $('.checkbox-list-xp__select').on('click', function () {
    const $dropdown = $(this).closest(`.${className}`);

    $dropdown.toggleClass(classExpanded);
  });
});