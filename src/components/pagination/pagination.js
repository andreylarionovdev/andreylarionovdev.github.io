import $ from 'jquery';
import 'paginationjs';

const Pagination = function pagination() {
  this.init();
};

Pagination.prototype.init = function init() {
  this.classPrefix = 'pagination';
  this.activeClassName = 'pagination-page_active';
  this.disableClassName = 'pagination-page_disabled';
  this.ulClassName = 'pagination__ul';

  this.selectorpagination = '.js-pagination';

  $(this.selectorpagination).each((i, o) => this.initPaginationJsInstance($(o)));
};

Pagination.prototype.initPaginationJsInstance = function initPaginationJsInstance($element) {
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
    prevText: '<i class="material-icons pagination__arrow-prev">arrow_back</i>',
    nextText: '<i class="material-icons pagination__arrow-next">arrow_forward</i>',
    formatNavigator: `<span class="js-pagination__from"><%= currentPage %></span> &ndash; 
                      <span class="js-pagination__to">${pageSize}</span> из ${total} вариантов аренды`,
    formatResult(data) {
      $element.find('.js-pagination__from').text(data[0] + 1);
      $element.find('.js-pagination__to').text(data[data.length - 1] + 1);
    },
  });
};

$(() => new Pagination());