$(document).ready(function () {
    $('.paginator').pagination({
        dataSource: [...Array(180).keys()],
        pageSize: 12,
        pageRange: 1,
        autoHidePrevious: true,
        autoHideNext: true,
        showNavigator: true,
        classPrefix: 'paginator',
        activeClassName: 'paginator-page--active',
        disableClassName: 'paginator-page--disabled',
        ulClassName: 'paginator__ul',
        prevText: '<i class="material-icons paginator__arrow-prev">arrow_back</i>',
        nextText: '<i class="material-icons paginator__arrow-next">arrow_forward</i>',
        formatNavigator: '<%= currentPage %> &ndash; 12 из 100+ вариантов аренды'
    });
});