import $ from 'jquery';
import 'ion-rangeslider';

const RangeSlider = function RangeSlider($element) {
  this.init($element);
};

RangeSlider.prototype.init = function init($element) {
  this.$element = $element;

  this.$element.ionRangeSlider({
    hide_min_max: true,
    hide_from_to: true,
    onStart: this.render.bind(this),
    onChange: this.render.bind(this),
    onUpdate: this.render.bind(this),
  });
};

RangeSlider.prototype.render = function render(data) {
  const range = `${data.from.toLocaleString('ru-RU')}₽ - ${data.to.toLocaleString('ru-RU')}₽`;
  this.$element.closest('.js-range-slider').find('.js-range-slider__label-hint').text(range);
};

$(() => $('.js-range-slider__input').each((_, rangeSliderElement) => new RangeSlider($(rangeSliderElement))));
