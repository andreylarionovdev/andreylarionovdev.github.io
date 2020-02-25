import $ from 'jquery';
import 'ion-rangeslider';

const RangeSlider = function RangeSlider() {
  this.init();
};

RangeSlider.prototype.init = function init() {
  this.selectorRangeSlider = '.js-range-slider__input';
  this.selectorRangeSliderHint = '.js-range-slider .label__hint';

  $(this.selectorRangeSlider).each((i, o) => this.initIonRangeSliderInstance($(o)));
};

RangeSlider.prototype.initIonRangeSliderInstance = function initIonRangeSliderInstance($element) {
  $element.ionRangeSlider({
    hide_min_max: true,
    hide_from_to: true,
    onStart: this.render.bind(this),
    onChange: this.render.bind(this),
  });
};

RangeSlider.prototype.render = function render(data) {
  const range = `${data.from.toLocaleString('ru-RU')}₽ - ${data.to.toLocaleString('ru-RU')}₽`;
  $(this.selectorRangeSliderHint).text(range);
};

$(() => new RangeSlider());
