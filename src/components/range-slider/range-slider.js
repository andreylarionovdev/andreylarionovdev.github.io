import $ from 'jquery';
import 'ion-rangeslider';

const RangeSlider = function RangeSlider($element) {
  this.init($element);
};

RangeSlider.prototype.init = function init($element) {
  this.$element = $element;
  this.selectorRangeSlider = '.js-range-slider';

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
  this.$element.closest(this.selectorRangeSlider).find('.label__hint').text(range);
};

$(() => $('.js-range-slider__input').each((i, o) => new RangeSlider($(o))));
