$(document).ready(function () {
  const className = 'dropdown';
  const classExpanded = `${className}--expanded`;

  const $toggle = $(`.${className}__toggle`);

  $toggle.on('click', function () {
    const $dropdown = $(this).closest(`.${className}`);
    if ($dropdown.find('.dropdown__menu').length === 1) {
      $dropdown.toggleClass(classExpanded)
    }
  });

  // +/- click handler
  const numberChangerOnClick = function () {
    const $li = $(this).closest(`.${className}__li`);
    const $dropdown = $(this).closest(`.${className}`);
    const $count = $li.find(`.${className}__count`);

    let n = parseInt($count.text());
    let operator = $(this).closest(`.${className}__dec-button`).length === 1
      ? '-'
      : '+';

    n = operator === '+' ? n + 1 : n - 1;

    if (n < 0 || n > 5) {
      return;
    }
    $count.text(n);
    $dropdown
      .addClass(`${className}--edited`)
      .removeClass(`${className}--empty`);
  };

  const $incBtn = $(`.${className}__inc-button`);
  const $decBtn = $(`.${className}__dec-button`);

  $incBtn.on('click', numberChangerOnClick);
  $decBtn.on('click', numberChangerOnClick);

  $(`.${className}__clear-button`).on('click', function () {
    $(this).closest(`.${className}`).find(`.${className}__count`).each(function (i, o) {
      $(o).text(0);
    })
  });

  $(`.${className}__apply-button`).on('click', function () {
    $(this).closest('.dropdown')
      .removeClass(`${className}--edited`)
      .removeClass(`${className}--expanded`);
  });
});