import $ from 'jquery';
import 'paginationjs';
import {
  classPrefix,
  activeClassName,
  disableClassName,
  ulClassName,
  selectorPagination,
} from './const';

const Pagination = function pagination() {
  this.init();
};

Pagination.prototype.init = function init() {
  $(selectorPagination).each((_, paginationElement) => this.initPaginationJsInstance($(paginationElement)));
};

Pagination.prototype.initPaginationJsInstance = function initPaginationJsInstance($element) {
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
    classPrefix,
    activeClassName,
    disableClassName,
    ulClassName,
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
