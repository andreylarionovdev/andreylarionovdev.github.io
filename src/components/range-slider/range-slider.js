import $ from 'jquery';

$(() => {
  function render(data) {
    const range = `${data.from.toLocaleString('ru-RU')}₽ - ${data.to.toLocaleString('ru-RU')}₽`;

    $('.range-slider .label__hint').text(range);
  }

  const $slider = $('.js-range-slider__input');
  $slider.ionRangeSlider({
    hide_min_max: true,
    hide_from_to: true,
    onStart: render,
    onChange: render,
  });
});
