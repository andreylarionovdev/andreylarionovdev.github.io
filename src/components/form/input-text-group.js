$(document).ready(function () {
    var $inputText                  = $('.input-text-group__input-text')
        ,inputSubmitSelector        = '.input-text-group__input-submit'
        ,inputSubmitClass           = 'input-text-group__input-submit--focused'
    ;
    $inputText.on('focus', function () {
        $(this).next(inputSubmitSelector).addClass(inputSubmitClass);
    });
    $inputText.on('blur', function () {
        $(this).next(inputSubmitSelector).removeClass(inputSubmitClass);
    });
});