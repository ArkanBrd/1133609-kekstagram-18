// preview.js
'use strict';

(function () {

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
  window.preview = {
    openBigPicture: function (picture) {
      bigPicture.classList.remove('hidden');
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
    }
  };

  pictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      bigPicture.classList.add('hidden');
    });
  });
})();
