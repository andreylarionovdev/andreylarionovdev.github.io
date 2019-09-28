$(document).ready(function() {
    var render = function (data) {
        var $label  = $('.label--for-range-slider').find('.label__right');
        var from    = data.from;
        var to      = data.to;
        var range   = from.toLocaleString('ru-RU') + '₽ - ' + to.toLocaleString('ru-RU') + '₽';

        $label.text(range);
    };

    var $slider = $('.range-slider__input');
    $slider.ionRangeSlider({
        type: 'double',
        skin: 'big',
        min: 0,
        max: 16000,
        from: 5000,
        to: 10000,
        hide_min_max: true,
        hide_from_to: true,
        onStart: render,
        onChange: render
    });
});