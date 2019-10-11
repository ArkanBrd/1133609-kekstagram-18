// Файл upload.js
'use strict';

var ESC_KEYBUTTON = 27;

var uploadFileOpen = document.getElementById('upload-file');

var editImgUploadOpen = document.querySelector('.img-upload__overlay');
var editImgUploadClose = uploadFileOpen.getElementById('upload-cancel');

uploadFileOpen.addEventListener('click', function() {
  editImgUploadOpen.classList.remove('hidden');
  
  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ESC_KEYBUTTON) {
      editImgUploadOpen.classList.add('hidden');
    }
  });
});

editImgUploadClose.addEventListener('click', function() {
  editImgUploadOpen.classList.add('hidden');
});

