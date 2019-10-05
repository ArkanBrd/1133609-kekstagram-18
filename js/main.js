// Файл main.js
'use strict';

var getRandomLike = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var FLOODS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var GUYS = ['Гуша', 'Курепа', 'МКС', 'Коняк', 'Аркан', 'Теплый'];

var housePriceField = document.querySelector('#picture');

var getRandomName = function () {
  return GUYS[Math.floor(Math.random() * GUYS.length)];
};
var getRandomComments = function () {
  return FLOODS[Math.floor(Math.random() * FLOODS.length)];
  return FLOODS[Math.floor(Math.random() * FLOODS.length)];
};
 var generateComments = function () {
  var coments = [];
  for (var j = 0; j < 6 ; j++) {
    coment = {
      avatar: "img/avatar-" + j + ".svg";
      message: getRandomComments();
      name: getRandomName();
	};
	return coments;
  };
 };
 
var generatePhotoDescriptions = function () {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    var photo = {
      url: "photos/" + i + ".jpg";
      description: '...';
      likes: getRandomLike(15, 200);
      comments: generateComments();
	};
  };
  return photos;
};

var picture = generatePhotoDescriptions();
