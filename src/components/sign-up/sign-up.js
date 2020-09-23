import $ from 'jquery';

import TextInput from '../text-input/text-input';

$(() => {
  // eslint-disable-next-line no-unused-vars
  const birthdayMaskedInput = new TextInput($('.js-text-input_has-mask'), {
    hasDateMask: true,
  });
});
