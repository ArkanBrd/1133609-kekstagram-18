// Файл upload.js
'use strict';

var ESC_KEYBUTTON = 27;

// Поле для загрузки нового изображения на сайт
var uploadField = document.querySelector('#upload-select-image');

// Изначальное состояние поля для загрузки изображения
var firstUploadFieldOpen = uploadField.querySelector('#upload-file');

// Форма редактирования изображения
var editImgFormOpen = uploadField.querySelector('.img-upload__overlay');

// Закрытие формы редактирования изображения
var editImgFormClose = editImgFormOpen.querySelector('#upload-cancel');

// Смена эффекта изображения
var effectList = document.querySelector('.effects__list');
var effectRadio = document.querySelectorAll('.effects__item');
var changedElement = null;

// Изменение глубины эффекта, накладываемого на изображение
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
var imgUploadPreview = editImgFormOpen.querySelector('.img-upload__preview');

var onDifEffects = function (evt) {
  var rectLine = effectLevelLine.getBoundingClientRect ();
  var coordinateX = (evt.clientX - rectLine.left) / rectLine.width;

  if (coordinateX) {
    switch (uploadField.effect.value) {
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(' + coordinateX + ')';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + coordinateX + ')';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + coordinateX * 100 + ')';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + coordinateX * 3 + 'px)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + coordinateX * 2 + ')';
        break;
      case 'none':
        imgUploadPreview.style.filter = null;
        effectLevelLine.classList.add('invisible');
        break;
    }
    effectLevelPin.style.left = coordinateX * 100;
	effectLevelDepth.style.width = coordinateX * 100;
  }
};

// Открытие и закрытие через ESC формы редактирования
firstUploadFieldOpen.addEventListener('change', function () {
  editImgFormOpen.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYBUTTON) {
      editImgFormOpen.classList.add('hidden');
    }
  });
});

// Закрытие формы редактирования
editImgFormClose.addEventListener('click', function () {
  editImgFormOpen.classList.add('hidden');
});

var changeHandler = function (evt) {
  if (changedElement) {
    changedElement.classList.remove('change');
  }
  changedElement = evt.target;
  changedElement.classList.add('change');
};

for (var i = 0; i < effectRadio.length; i++) {
  effectRadio[i].addEventListener('change', changeHandler);
}

// Добавляем пин слайдера
effectLevelLine.addEventListener('mouseup', onDifEffects);
