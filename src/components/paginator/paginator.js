import $ from 'jquery';
import 'paginationjs';

$(() => {
  $('.paginator').each((i, o) => {
    const $pager = $(o);

    const dataSource = $pager.data('source');
    const pageSize = parseInt($pager.data('page-size'), 10);
    const pageRange = parseInt($pager.data('page-range'), 10);
    const total = dataSource.length > 100 ? '100+' : dataSource.length;

    $pager.pagination({
      dataSource,
      pageSize,
      pageRange,
      autoHidePrevious: true,
      autoHideNext: true,
      showNavigator: true,
      classPrefix: 'paginator',
      activeClassName: 'paginator-page--active',
      disableClassName: 'paginator-page--disabled',
      ulClassName: 'paginator__ul',
      prevText: '<i class="material-icons paginator__arrow-prev">arrow_back</i>',
      nextText: '<i class="material-icons paginator__arrow-next">arrow_forward</i>',
      formatNavigator: `<span class="js-paginator__from"><%= currentPage %></span> &ndash; 
                        <span class="js-paginator__to">${pageSize}</span> из ${total} вариантов аренды`,
      formatResult(data) {
        $pager.find('.js-paginator__from').text(data[0] + 1);
        $pager.find('.js-paginator__to').text(data[data.length - 1] + 1);
      },
    });
  });
});
