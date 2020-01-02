$(document).ready(function () {
  const className = 'range-slider';

  const render = function (data) {
    const $label = $(`.${className} .label__right`);
    const range = data.from.toLocaleString('ru-RU') + '₽ - ' + data.to.toLocaleString('ru-RU') + '₽';

    $label.text(range);
  };

  const $slider = $(`.${className}__input`);
  $slider.ionRangeSlider({
    hide_min_max: true,
    hide_from_to: true,
    onStart: render,
    onChange: render
  });
});