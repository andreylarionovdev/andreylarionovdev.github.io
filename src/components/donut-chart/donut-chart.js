import $ from 'jquery';

$(() => {
  $('.js-donut-chart__label').on('click', (e) => {
    const $label = $(e.currentTarget);
    const $chart = $label.closest('.js-donut-chart');

    const classLabelActive = 'donut-chart__label--active';

    $chart.find('.js-donut-chart__label').removeClass(classLabelActive);
    $label.addClass(classLabelActive);

    const voteKey = $label.attr('data-vote-key');
    const classCircleActive = 'donut-chart__circle--active';

    $chart.find('.js-donut-chart__circle').removeClass(classCircleActive);
    $chart.find(`.donut-chart__circle--${voteKey}`).addClass(classCircleActive);

    const count = parseInt($label.data('count'), 10);

    $('.js-donut-chart__count-value').text(count);

    $('.js-donut-chart__count')
      .removeClass()
      .addClass('donut-chart__count')
      .addClass('js-donut-chart__count')
      .addClass(`donut-chart__count--${voteKey}`);
  });
});
