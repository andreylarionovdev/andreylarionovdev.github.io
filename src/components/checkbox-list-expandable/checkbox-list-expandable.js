import $ from 'jquery';

$(() => {
  const classExpanded = 'checkbox-list-expandable--expanded';
  $('.js-checkbox-list-expandable__toggle').on('click', (e) => {
    $(e.currentTarget).closest('.js-checkbox-list-expandable').toggleClass(classExpanded);
  });
});
