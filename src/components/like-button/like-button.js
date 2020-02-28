import $ from 'jquery';

const LikeButton = function LikeButton() {
  this.init();
};

LikeButton.prototype.init = function init() {
  this.classFavorite = 'like-button_favorite';
  this.selectorButton = '.js-like-button';
  this.selectorCount = '.js-like-button__count';
  this.selectorIcon = '.js-like-button__icon';

  this.addEventListeners();
};

LikeButton.prototype.addEventListeners = function addEventListeners() {
  $(this.selectorButton).on('click', this.handleButtonClick.bind(this));
};

LikeButton.prototype.handleButtonClick = function handleButtonClick(e) {
  e.preventDefault();

  $(e.currentTarget).toggleClass(this.classFavorite);

  const $counter = $(e.currentTarget).find(this.selectorCount);
  const isFavorite = $(e.currentTarget).hasClass(this.classFavorite);

  const count = parseInt($counter.text(), 10);
  $counter.text(isFavorite ? count + 1 : count - 1);

  $(e.currentTarget).find(this.selectorIcon).text(isFavorite ? 'favorite' : 'favorite_border');
};

$(() => new LikeButton());
