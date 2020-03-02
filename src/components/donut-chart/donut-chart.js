import $ from 'jquery';

const DonutChart = function DonutChart() {
  this.init();
};

DonutChart.prototype.init = function init() {
  this.classLabelActive = 'donut-chart__label_active';
  this.classCircleActive = 'donut-chart__circle_active';

  this.selectorDonutChart = '.js-donut-chart';
  this.selectorLabel = '.js-donut-chart__label';
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

  const grade = $label.attr('data-grade');

  $chart.find(this.selectorCircle).removeClass(this.classCircleActive);
  $chart.find(`.donut-chart__circle_grade_${grade}`).addClass(this.classCircleActive);

  const count = parseInt($label.data('count'), 10);

  $(this.selectorCountValue).text(count);

  $(this.selectorCount)
    .removeClass()
    .addClass('donut-chart__count')
    .addClass('js-donut-chart__count')
    .addClass(`donut-chart__count_grade_${grade}`);
};

$(() => new DonutChart());
