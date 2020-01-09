$(document).ready(function () {
  const className = 'dropdown';
  const classExpanded = `${className}--expanded`;

  const $select = $(`.${className}__select`);

  $select.on('click', function () {
    const $dropdown = $(this).closest(`.${className}`);
    if ($dropdown.find('.dropdown__menu').length === 1) {
      $dropdown.toggleClass(classExpanded)
    }
  });

  // +/- click handler
  const numberChangerOnClick = function () {
    const $li = $(this).closest(`.${className}__li`);
    const $dropdown = $(this).closest(`.${className}`);
    const $count = $li.find(`.${className}__li-count`);

    let n = parseInt($count.text());
    let operator = $(this).closest(`.${className}__li-dec`).length === 1
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

  const $inc = $(`.${className}__li-inc`);
  const $dec = $(`.${className}__li-dec`);

  $inc.on('click', numberChangerOnClick);
  $dec.on('click', numberChangerOnClick);

  $(`.${className}__li-clear`).on('click', function () {
    $(this).closest(`.${className}`).find(`.${className}__li-count`).each(function (i, o) {
      $(o).text(0);
    })
  });

  $(`.${className}__li-apply`).on('click', function () {
    $(this).closest('.dropdown')
      .removeClass(`${className}--edited`)
      .removeClass(`${className}--expanded`);
  });
});