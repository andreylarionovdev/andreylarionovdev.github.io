$(document).ready(function () {
  const className = 'paginator';
  $(`.${className}`).each(function (i, o) {
    const $pager = $(o);

    const dataSource = $pager.data('source') || [];
    const pageSize = $pager.data('page-size') || 12;
    const pageRange = $pager.data('page-range') || 1;

    $pager.pagination({
      dataSource: dataSource,
      pageSize: pageSize,
      pageRange: pageRange,
      autoHidePrevious: true,
      autoHideNext: true,
      showNavigator: true,
      classPrefix: 'paginator',
      activeClassName: 'paginator-page--active',
      disableClassName: 'paginator-page--disabled',
      ulClassName: 'paginator__ul',
      prevText: `<i class="material-icons ${className}__arrow-prev">arrow_back</i>`,
      nextText: `<i class="material-icons ${className}__arrow-next">arrow_forward</i>`,
      formatNavigator: `<%= currentPage %> &ndash; 12 из 100+ вариантов аренды`
    });
  });
});