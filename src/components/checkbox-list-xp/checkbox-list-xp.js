import $ from 'jquery';

$(() => {
  const classExpanded = 'checkbox-list-xp--expanded';
  $('.js-checkbox-list-xp__toggle').on('click', (e) => {
    $(e.currentTarget).closest('.js-checkbox-list-xp').toggleClass(classExpanded);
  });
});
