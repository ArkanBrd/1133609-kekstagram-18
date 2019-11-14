// Файл gallery.js
'use strict';

(function () {
  var uploadPhotoElement = document.querySelector('.pictures');
  var picturesContainerImg = document.querySelector('.pictures.container');
  var firstuploadFormOpen = document.querySelector('#upload-file');
  var errorLoad = document.querySelector('#error');
  var mainPhoto = document.querySelector('main');

  var onError = function (error) {
    var errorElement = errorLoad.content.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = error;
    mainPhoto.appendChild(errorElement);
  };

  var filterName = 'popular';
  var filterPopular = function () {
    return pictures;
  };
  var filterRandom = function () {
    var pictureRandom = [];
    var picturesCopy = pictures.slice();
    for (var i = 0; i < 10 && picturesCopy.length > 0; i++) {
      var randomNumber = Math.floor(Math.random() * picturesCopy.length);
      pictureRandom.push(picturesCopy[randomNumber]);
      picturesCopy.splice(randomNumber, 1);
    }
    return pictureRandom;
  };
  var filterDiscussed = function () {
    var picturesCopy = pictures.slice();
    picturesCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return picturesCopy;
  };

  var buttonFilter = {
    popular: {
      element: document.querySelector('#filter-popular'),
      method: filterPopular,
    },
    random: {
      element: document.querySelector('#filter-random'),
      method: filterRandom,
    },
    discussed: {
      element: document.querySelector('#filter-discussed'),
      method: filterDiscussed,
    },
  };

  var forButton = function (argument) {
    var classPicture = uploadPhotoElement.querySelectorAll('.picture');
    for (var j = 0; j < classPicture.length; j++) {
      uploadPhotoElement.removeChild(classPicture[j]);
    }
    buttonFilter[filterName].element.classList.remove('img-filters__button--active');
    var newPicture = buttonFilter[argument].method();
    filterName = argument;
    buttonFilter[argument].element.classList.add('img-filters__button--active');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < newPicture.length; i++) {
      fragment.appendChild(window.picture.renderPicture(newPicture[i], i));
    }
    uploadPhotoElement.appendChild(fragment);
  };

  var lastTimeout;

  var timeButton = function (argument) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      forButton(argument);
      lastTimeout = null;
    }, 500);
  };

  var filterButtonPopular = function () {
    timeButton('popular');
  };

  var filterButtonRandom = function () {
    timeButton('random');
  };

  var filterButtonDiscussed = function () {
    timeButton('discussed');
  };


  var onSuccess = function (data) {
    pictures = data;
    forButton('popular');
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    buttonFilter.popular.element.addEventListener('click', filterButtonPopular);
    buttonFilter.random.element.addEventListener('click', filterButtonRandom);
    buttonFilter.discussed.element.addEventListener('click', filterButtonDiscussed);
  };

  var pictures = [];

  window.upload.loadPhoto(onSuccess, onError);

  picturesContainerImg.addEventListener('click', function (evt) {
    var aPicture = evt.target.closest('a.picture');
    if (aPicture !== null) {
      evt.preventDefault();
      var index = evt.target.closest('a.picture').dataset['index'];
      window.preview.openBigPicture(pictures[index]);
    }
  });

  firstuploadFormOpen.addEventListener('change', window.form.uploadFormOpen);


})();
