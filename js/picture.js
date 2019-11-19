// piture.js
'use strict';

(function () {
  var uploadPhotoTemplate = document.querySelector('#picture');
  window.picture = {
    render: function (picture, index) {
      var pictureElement = uploadPhotoTemplate.content.cloneNode(true);
      pictureElement.querySelector('a.picture').dataset['index'] = index;

      pictureElement.querySelector('.picture__img').src = picture.url;
      pictureElement.querySelector('.picture__likes').textContent = picture.likes;
      pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

      return pictureElement;
    }
  };
})();
