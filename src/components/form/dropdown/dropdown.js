$(document).ready(function () {
  const $select = $('.dropdown__select');
  const classExpanded = 'dropdown--expanded';
  const $inc = $('.dropdown__li-inc');
  const $dec = $('.dropdown__li-dec');

  $select.on('click', function () {
    const $dropdown = $(this).closest('.dropdown');
    if ($dropdown.find('.dropdown__menu').length === 1) {
      $dropdown.toggleClass(classExpanded)
    }
  });

  // +/- click handler
  const numberChangerOnClick = function () {
    const $li = $(this).closest('.dropdown__li');
    const $dropdown = $(this).closest('.dropdown');
    const $count = $li.find('.dropdown__li-count');

    let n = parseInt($count.text())
    let operator = $(this).closest('.dropdown__li-dec').length === 1
      ? '-'
      : '+';

    n = operator === '+' ? n + 1 : n - 1;

    if (n < 0 || n > 5) {
      return;
    }
    $count.text(n);
    $dropdown
      .addClass('dropdown--edited')
      .removeClass('dropdown--empty');
  };

  $inc.on('click', numberChangerOnClick);
  $dec.on('click', numberChangerOnClick);

  $('.dropdown__li-clear').on('click', function () {
    $(this).closest('.dropdown').find('.dropdown__li-count').each(function (i, o) {
      $(o).text(0);
    })
  });

  $('.dropdown__li-apply').on('click', function () {
    $(this).closest('.dropdown')
      .removeClass('dropdown--edited')
      .removeClass('dropdown--expanded');
  });
});