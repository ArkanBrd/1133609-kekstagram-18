// Файл main.js
'use strict';

// Файл data.js

var ESC_KEYBUTTON = 27;


var FLOODS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var GUYS = ['Гуша', 'Курепа', 'МКС', 'Коняк', 'Аркан', 'Теплый'];

var uploadPhotoElement = document.querySelector('.pictures');
var uploadPhotoTemplate = document.querySelector('#picture');

// Файл gallery.js

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
// Файл picture.js

var pictures = generatePhotoDescriptions();
var renderPicture = function (picture, index) {
  var pictureElement = uploadPhotoTemplate.content.cloneNode(true);
  pictureElement.querySelector('a.picture').dataset['index'] = index;

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i], i));
}
uploadPhotoElement.appendChild(fragment);

// Файл data.js

// Полноэкранный режим
var picturesContainerImg = document.querySelector('.pictures.container');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img img');
var pictureCancel = document.querySelector('#picture-cancel');
var bigPictureSocial = document.querySelector('.big-picture__social');

var likesCount = bigPictureSocial.querySelector('.likes-count');
var commentsCount = bigPictureSocial.querySelector('.comments-count');
var socialComments = bigPictureSocial.querySelector('.social__comments');
var socialCaption = bigPictureSocial.querySelector('.social__caption');
var socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
var commentsLoader = bigPictureSocial.querySelector('.comments-loader');

// Файл preview.js

var renderComment = function (coment) {
  var temp = document.createElement('template');
  temp.innerHTML = '<li class="social__comment">' +
  ' <img' +
    ' class="social__picture"' +
    ' src=""' +
    ' alt=""' +
    ' width="35" height="35">' +
  ' <p class="social__text"></p>' +
  ' </li>';
  var socialPicture = temp.content.querySelector('.social__picture');
  socialPicture.src = coment.avatar;
  socialPicture.alt = coment.name;
  var socialText = temp.content.querySelector('.social__text');
  socialText.textContent = coment.message;

  return temp.content;
};

var handlerBigPicture = function (picture) {
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  bigPictureImg.src = picture.url;
  socialComments.innerHTML = '';
  socialCaption.textContent = picture.description;
  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  var fragmentComent = document.createDocumentFragment();
  for (var j = 0; j < picture.comments.length; j++) {
    fragmentComent.appendChild(renderComment(picture.comments[j]));
  }
  socialComments.appendChild(fragmentComent);
};

picturesContainerImg.addEventListener('click', function (evt) {
  var aPicture = evt.target.closest('a.picture');
  if (aPicture !== null) {
    bigPicture.classList.remove('hidden');
    evt.preventDefault();
    var index = evt.target.closest('a.picture').dataset['index'];
    handlerBigPicture(pictures[index]);
  }
});

pictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYBUTTON) {
    bigPicture.classList.add('hidden');
  }
});
