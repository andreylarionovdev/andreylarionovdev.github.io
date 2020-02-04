$(document).ready(function () {
  $('.js-votes-chart__label').on('click', function () {
    const $label = $(this);
    const $chart = $(this).closest('.js-votes-chart');

    const classLabelActive = 'votes-chart__label--active';

    $chart.find('.js-votes-chart__label').removeClass(classLabelActive);
    $label.addClass(classLabelActive);

    const voteKey = $label.attr('data-vote-key');
    const classCircleActive = 'votes-chart__circle--active';

    $chart.find('.js-votes-chart__circle').removeClass(classCircleActive);
    $chart.find(`.votes-chart__circle--${voteKey}`).addClass(classCircleActive);

    const count = parseInt($label.data('count'));

    $('.js-votes-chart__count-value').text(count);

    $('.js-votes-chart__count')
        .removeClass()
        .addClass('votes-chart__count')
        .addClass('js-votes-chart__count')
        .addClass(`votes-chart__count--${voteKey}`);
  });
});