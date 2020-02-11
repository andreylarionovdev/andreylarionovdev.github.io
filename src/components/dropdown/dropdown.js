import $ from 'jquery';

$(() => {
  const classExpanded = 'dropdown--expanded';
  const classEdited = 'dropdown--edited';
  const classEmpty = 'dropdown--empty';

  $('.js-dropdown__toggle').on('click', (e) => {
    e.preventDefault();
    const $dropdown = $(e.currentTarget).closest('.js-dropdown');
    if ($dropdown.find('.js-dropdown__menu').length === 1) {
      $dropdown.toggleClass(classExpanded);
    }
  });

  function numberChangerOnClick(e) {
    const $li = $(e.currentTarget).closest('.js-dropdown__menu-item');

    const $btn = $(e.currentTarget).closest('.js-dropdown__change-count-btn');
    const classBtnDisabled = 'dropdown__change-count-btn--disabled';
    const operator = $btn.data('op');

    if (operator === '+') {
      $li.find('.js-dropdown__change-count-btn').removeClass(classBtnDisabled);
    }
    const changeCount = {
      '+': (x) => x + 1,
      '-': (x) => x - 1,
    };

    const $count = $li.find('.js-dropdown__count');
    const n = changeCount[operator](parseInt($count.text(), 10));

    if (n < 1) {
      $btn.addClass(classBtnDisabled);
    }
    if (n < 0) {
      return;
    }

    $count.text(n);

    const $dropdown = $(e.currentTarget).closest('.js-dropdown');

    $dropdown
      .addClass(classEdited)
      .removeClass(classEmpty);
  }

  $('.js-dropdown__change-count-btn').on('click', numberChangerOnClick);

  $('.js-dropdown__clear-button').on('click', (e) => {
    const $counts = $(e.currentTarget).closest('.js-dropdown').find('.js-dropdown__count');
    $counts.each((i, o) => {
      $(o).text(0);
    });
  });

  $('.js-dropdown__apply-button').on('click', (e) => {
    $(e.currentTarget).closest('.js-dropdown')
      .removeClass(classEdited)
      .removeClass(classExpanded);
  });
});
