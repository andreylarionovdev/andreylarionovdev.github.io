import $ from 'jquery';

const DonutChart = function DonutChart() {
  this.init();
};

DonutChart.prototype.init = function init() {
  this.classLabelActive = 'donut-chart__label--active';
  this.classCircleActive = 'donut-chart__circle--active';

  this.selectorLabel = '.js-donut-chart__label';
  this.selectorDonutChart = '.js-donut-chart';
  this.selectorCircle = '.js-donut-chart__circle';
  this.selectorCount = '.js-donut-chart__count';
  this.selectorCountValue = '.js-donut-chart__count-value';

  this.addEventListeners();
};

DonutChart.prototype.addEventListeners = function addEventListeners() {
  $(this.selectorLabel).on('click', this.handleLabelClick.bind(this));
};

DonutChart.prototype.handleLabelClick = function handleLabelClick(e) {
  const $label = $(e.currentTarget);
  const $chart = $label.closest(this.selectorDonutChart);

  $chart.find(this.selectorLabel).removeClass(this.classLabelActive);
  $label.addClass(this.classLabelActive);

  const voteKey = $label.attr('data-vote-key');

  $chart.find(this.selectorCircle).removeClass(this.classCircleActive);
  $chart.find(`.donut-chart__circle--${voteKey}`).addClass(this.classCircleActive);

  const count = parseInt($label.data('count'), 10);

  $(this.selectorCountValue).text(count);

  $(this.selectorCount)
    .removeClass()
    .addClass('donut-chart__count')
    .addClass('js-donut-chart__count')
    .addClass(`donut-chart__count--${voteKey}`);
};

$(() => new DonutChart());
