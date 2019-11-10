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

  var onSuccess = function (data) {
    pictures = data;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.picture.renderPicture(pictures[i], i));
    }
    uploadPhotoElement.appendChild(fragment);
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
