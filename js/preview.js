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
  var buttonCommentsLoader = document.querySelector('.comments-loader');

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

  var someComments = 0;
  var currentPicture = null;
  
  var commentsLoader = function () {
    var fragmentComent = document.createDocumentFragment();
	var j;
    for (j = someComments; j < (someComments + 5) && j < currentPicture.comments.length; j++) {
      fragmentComent.appendChild(renderComment(currentPicture.comments[j]));
    }
    socialComments.appendChild(fragmentComent);
    if (j === currentPicture.comments.length) {
      buttonCommentsLoader.classList.add('visually-hidden');
	};
    someComments = someComments + 5;
  };
  buttonCommentsLoader.addEventListener('click', commentsLoader);
  window.preview = {
    openBigPicture: function (picture) {
      currentPicture = picture;
      bigPicture.classList.remove('hidden');
      likesCount.textContent = picture.likes;
      commentsCount.textContent = picture.comments.length;
      bigPictureImg.src = picture.url;
      socialComments.innerHTML = '';
      socialCaption.textContent = picture.description;
      socialCommentCount.classList.add('visually-hidden');
	  buttonCommentsLoader.classList.remove('visually-hidden');
	  someComments = 0;
      commentsLoader();
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
