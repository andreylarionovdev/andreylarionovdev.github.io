import $ from 'jquery';
import 'paginationjs';

const Paginator = function Paginator() {
  this.init();
};

Paginator.prototype.init = function init() {
  this.classPrefix = 'paginator';
  this.activeClassName = 'paginator-page--active';
  this.disableClassName = 'paginator-page--disabled';
  this.ulClassName = 'paginator__ul';

  this.selectorPaginator = '.js-paginator';

  $(this.selectorPaginator).each((i, o) => this.initPaginationJsInstance($(o)));
};

Paginator.prototype.initPaginationJsInstance = function initPaginationJsInstance($element) {
  const that = this;

  const dataSource = $element.data('source');
  const pageSize = parseInt($element.data('page-size'), 10);
  const pageRange = parseInt($element.data('page-range'), 10);
  const total = dataSource.length > 100 ? '100+' : dataSource.length;

  $element.pagination({
    dataSource,
    pageSize,
    pageRange,
    autoHidePrevious: true,
    autoHideNext: true,
    showNavigator: true,
    classPrefix: that.classPrefix,
    activeClassName: that.activeClassName,
    disableClassName: that.disableClassName,
    ulClassName: that.ulClassName,
    prevText: '<i class="material-icons paginator__arrow-prev">arrow_back</i>',
    nextText: '<i class="material-icons paginator__arrow-next">arrow_forward</i>',
    formatNavigator: `<span class="js-paginator__from"><%= currentPage %></span> &ndash; 
                      <span class="js-paginator__to">${pageSize}</span> из ${total} вариантов аренды`,
    formatResult(data) {
      $element.find('.js-paginator__from').text(data[0] + 1);
      $element.find('.js-paginator__to').text(data[data.length - 1] + 1);
    },
  });
};

$(() => new Paginator());
