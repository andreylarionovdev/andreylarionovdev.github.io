$(document).ready(function () {
  const className = 'header';
  const classNav = `${className}__nav`;
  const classNavActive = `${classNav}--active`;
  const classToggleBtn = `${className}__nav-toggle`;

  $(`.${classToggleBtn}`).on('click', function () {
    const $header = $(this).closest(`.${className}`);
    $header.find(`.${classNav}`).toggleClass(classNavActive)
  });
});