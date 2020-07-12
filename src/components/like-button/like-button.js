import $ from 'jquery';
import {
  classFavorite,
  selectorButton,
  selectorCount,
  selectorIcon,
} from './const';

const LikeButton = function LikeButton() {
  this.init();
};

LikeButton.prototype.init = function init() {
  this.addEventListeners();
};

LikeButton.prototype.addEventListeners = function addEventListeners() {
  $(selectorButton).on('click', this.handleButtonClick.bind(this));
};

LikeButton.prototype.handleButtonClick = function handleButtonClick(e) {
  e.preventDefault();

  $(e.currentTarget).toggleClass(classFavorite);

  const $counter = $(e.currentTarget).find(selectorCount);
  const isFavorite = $(e.currentTarget).hasClass(classFavorite);

  const count = parseInt($counter.text(), 10);
  $counter.text(isFavorite ? count + 1 : count - 1);

  $(e.currentTarget).find(selectorIcon).text(isFavorite ? 'favorite' : 'favorite_border');
};

$(() => new LikeButton());
