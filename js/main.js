// Файл main.js
'use strict';

var getRandomLike = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var FLOODS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var GUYS = ['Гуша', 'Курепа', 'МКС', 'Коняк', 'Аркан', 'Теплый'];

var uploadPhotoElement = document.querySelector('.pictures');
var uploadPhotoTemplate = document.querySelector('#picture');

var getRandomName = function () {
  return GUYS[Math.floor(Math.random() * GUYS.length)];
};
var getRandomComments = function () {
  return FLOODS[Math.floor(Math.random() * FLOODS.length)];
};
var generateComments = function () {
  var coments = [];
  for (var j = 1; j < 7; j++) {
    var coment = {
      avatar: 'img/avatar-' + j + '.svg',
      message: getRandomComments() + '. ' + getRandomComments(),
      name: getRandomName()
    };
    coments.push(coment);
  }
  return coments;
};

var generatePhotoDescriptions = function () {
  var photos = [];
  for (var i = 1; i < 26; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      description: '...',
      likes: getRandomLike(15, 200),
      comments: generateComments()
    };
    photos.push(photo);
  }
  return photos;
};

var pictures = generatePhotoDescriptions();
var renderPicture = function (picture) {
  var pictureElement = uploadPhotoTemplate.content.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}
uploadPhotoElement.appendChild(fragment);

