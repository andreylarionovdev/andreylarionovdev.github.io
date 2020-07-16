import $ from 'jquery';
import 'paginationjs';
import {
  CLASS_PREFIX,
  ACTIVE_CLASS_NAME,
  DISABLE_CLASS_NAME,
  UL_CLASS_NAME,
  SELECTOR_PAGINATION,
} from './const';

const Pagination = function pagination() {
  this.init();
};

Pagination.prototype.init = function init() {
  $(SELECTOR_PAGINATION).each((_, paginationElement) => this.createInstance($(paginationElement)));
};

Pagination.prototype.createInstance = function createInstance($element) {
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
    classPrefix: CLASS_PREFIX,
    activeClassName: ACTIVE_CLASS_NAME,
    disableClassName: DISABLE_CLASS_NAME,
    ulClassName: UL_CLASS_NAME,
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
