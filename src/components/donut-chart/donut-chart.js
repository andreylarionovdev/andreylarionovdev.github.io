import $ from 'jquery';
import {
  classLabelActive,
  classCircleActive,
  selectorDonutChart,
  selectorLabel,
  selectorCircle,
  selectorCount,
  selectorCountValue,
} from './const';

const DonutChart = function DonutChart() {
  this.init();
};

DonutChart.prototype.init = function init() {
  this.addEventListeners();
};

DonutChart.prototype.addEventListeners = function addEventListeners() {
  $(selectorLabel).on('click', this.handleLabelClick.bind(this));
};

DonutChart.prototype.handleLabelClick = function handleLabelClick(e) {
  const $label = $(e.currentTarget);
  const $chart = $label.closest(selectorDonutChart);

  $chart.find(selectorLabel).removeClass(classLabelActive);
  $label.addClass(classLabelActive);

  const grade = $label.attr('data-grade');

  $chart.find(selectorCircle).removeClass(classCircleActive);
  $chart.find(`.donut-chart__circle_grade_${grade}`).addClass(classCircleActive);

  const count = parseInt($label.data('count'), 10);

  $(selectorCountValue).text(count);

  $(selectorCount)
    .removeClass()
    .addClass('donut-chart__counter')
    .addClass('js-donut-chart__counter');
};

$(() => new DonutChart());
