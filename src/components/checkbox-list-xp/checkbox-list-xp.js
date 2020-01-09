$(document).ready(function () {
  const className = 'checkbox-list-xp';
  const classExpanded = `${className}--expanded`;

  $('.checkbox-list-xp__select').on('click', function () {
    const $dropdown = $(this).closest(`.${className}`);

    $dropdown.toggleClass(classExpanded);
    resize($dropdown);
  });

  const resize = function ($dropdown) {
    const $drop = $dropdown.find('.checkbox-list-xp__list');
    let dropH = 0;

    if ($dropdown.hasClass(classExpanded)) {
      dropH = $drop.outerHeight() + 'px';
    }
    $dropdown.css('margin-bottom', dropH);
  };

  $(`.${classExpanded}`).each(function (i, o) {
    resize($(o));
  });
});