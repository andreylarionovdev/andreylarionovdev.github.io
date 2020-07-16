import $ from 'jquery';
import {
  CLASS_FAVORITE,
  SELECTOR_BUTTON,
  SELECTOR_COUNT,
  SELECTOR_ICON,
} from './const';

const LikeButton = function LikeButton() {
  this.init();
};

LikeButton.prototype.init = function init() {
  this.addEventListeners();
};

LikeButton.prototype.addEventListeners = function addEventListeners() {
  $(SELECTOR_BUTTON).on('click', this.handleButtonClick.bind(this));
};

LikeButton.prototype.handleButtonClick = function handleButtonClick(e) {
  e.preventDefault();

  $(e.currentTarget).toggleClass(CLASS_FAVORITE);

  const $counter = $(e.currentTarget).find(SELECTOR_COUNT);
  const isFavorite = $(e.currentTarget).hasClass(CLASS_FAVORITE);

  const count = parseInt($counter.text(), 10);
  $counter.text(isFavorite ? count + 1 : count - 1);

  $(e.currentTarget).find(SELECTOR_ICON).text(isFavorite ? 'favorite' : 'favorite_border');
};

$(() => new LikeButton());
