// Файл gallery.js
'use strict';

(function () {
  var uploadPhotoElement = document.querySelector('.pictures');
  var picturesContainerImg = document.querySelector('.pictures.container');
  var firstUploadFormOpen = document.querySelector('#upload-file');
  var errorLoad = document.querySelector('#error');
  var mainPhoto = document.querySelector('main');

  var handlerError = function (error) {
    var errorElement = errorLoad.content.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = error;
    mainPhoto.appendChild(errorElement);
  };

  var filterName = 'popular';
  var filterPopular = function () {
    return pictures;
  };
  var filterRandom = function () {
    var randomPictures = [];
    var picturesCopy = pictures.slice();
    for (var i = 0; i < 10 && picturesCopy.length > 0; i++) {
      var randomNumber = Math.floor(Math.random() * picturesCopy.length);
      randomPictures.push(picturesCopy[randomNumber]);
      picturesCopy.splice(randomNumber, 1);
    }
    return randomPictures;
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

  var pressButton = function (argument) {
    var classPicture = uploadPhotoElement.querySelectorAll('.picture');
    for (var j = 0; j < classPicture.length; j++) {
      uploadPhotoElement.removeChild(classPicture[j]);
    }
    buttonFilter[filterName].element.classList.remove('img-filters__button--active');
    displayingPictures = buttonFilter[argument].method();
    filterName = argument;
    buttonFilter[argument].element.classList.add('img-filters__button--active');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < displayingPictures.length; i++) {
      fragment.appendChild(window.picture.render(displayingPictures[i], i));
    }
    uploadPhotoElement.appendChild(fragment);
  };

  var lastTimeout;

  var setTimeButton = function (argument) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      pressButton(argument);
      lastTimeout = null;
    }, 500);
  };

  var filterButtonPopular = function () {
    setTimeButton('popular');
  };

  var filterButtonRandom = function () {
    setTimeButton('random');
  };

  var filterButtonDiscussed = function () {
    setTimeButton('discussed');
  };


  var handlerSuccess = function (data) {
    pictures = data;
    pressButton('popular');
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    buttonFilter.popular.element.addEventListener('click', filterButtonPopular);
    buttonFilter.random.element.addEventListener('click', filterButtonRandom);
    buttonFilter.discussed.element.addEventListener('click', filterButtonDiscussed);
  };

  var pictures = [];
  var displayingPictures = [];

  window.upload.loadPhoto(handlerSuccess, handlerError);

  picturesContainerImg.addEventListener('click', function (evt) {
    var aPicture = evt.target.closest('a.picture');
    if (aPicture) {
      evt.preventDefault();
      var index = aPicture.dataset['index'];
      window.preview.openBigPicture(displayingPictures[index]);
    }
  });

  firstUploadFormOpen.addEventListener('change', window.form.uploadFormOpen);


})();
