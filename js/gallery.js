// Файл gallery.js
'use strict';

(function () {
  var uploadPhotoElement = document.querySelector('.pictures');
  var picturesContainerImg = document.querySelector('.pictures.container');
  var firstuploadFormOpen = document.querySelector('#upload-file');

  var pictures = window.data.generatePhotoDescriptions();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(window.picture.renderPicture(pictures[i], i));
  }
  uploadPhotoElement.appendChild(fragment);

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
