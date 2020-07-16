import $ from 'jquery';
import {
  CLASS_LABEL_ACTIVE,
  CLASS_CIRCLE_ACTIVE,
  SELECTOR_DONUT_CHART,
  SELECTOR_LABEL,
  SELECTOR_CIRCLE,
  SELECTOR_COUNTER,
  SELECTOR_COUNTER_VALUE,
} from './const';

const DonutChart = function DonutChart() {
  this.init();
};

DonutChart.prototype.init = function init() {
  this.addEventListeners();
};

DonutChart.prototype.addEventListeners = function addEventListeners() {
  $(SELECTOR_LABEL).on('click', this.handleLabelClick.bind(this));
};

DonutChart.prototype.handleLabelClick = function handleLabelClick(e) {
  const $label = $(e.currentTarget);
  const $chart = $label.closest(SELECTOR_DONUT_CHART);

  $chart.find(SELECTOR_LABEL).removeClass(CLASS_LABEL_ACTIVE);
  $label.addClass(CLASS_LABEL_ACTIVE);

  const grade = $label.attr('data-grade');

  $chart.find(SELECTOR_CIRCLE).removeClass(CLASS_CIRCLE_ACTIVE);
  $chart.find(`.donut-chart__circle_grade_${grade}`).addClass(CLASS_CIRCLE_ACTIVE);

  const count = parseInt($label.data('count'), 10);

  $(SELECTOR_COUNTER_VALUE).text(count);

  $(SELECTOR_COUNTER)
    .removeClass()
    .addClass('donut-chart__counter')
    .addClass('js-donut-chart__counter');
};

$(() => new DonutChart());
