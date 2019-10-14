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
var effectLevelPin = document.querySelector('.effect-level__pin');
var imgUploadPreview = editImgFormOpen.querySelector('.img-upload__preview');

// Функция определения эффекта
var onEditEffect = function () {
  switch (uploadField.effect.value) {
    case 'chrome':
      effectList.className = 'effects__preview  effects__preview--chrome';
      break;
    case 'sepia':
      effectList.className = 'effects__preview  effects__preview--sepia';
      break;
    case 'marvin':
      effectList.className = 'effects__preview  effects__preview--marvin';
      break;
    case 'phobos':
      effectList.className = 'effects__preview  effects__preview--phobos';
      break;
    case 'heat':
      effectList.className = 'effects__preview  effects__preview--heat';
      break;
    case 'none':
      effectList.className = 'effects__preview  effects__preview--none';
      break;
  }
};

var onDifEffects = function (evt) {
  var rect = effectLevelPin.getBoundingClientRect ();
  var COORD_X = (evt.clientX - rect.left) / rect.width;
  if (COORD_X) {
    switch (uploadField.effect.value) {
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(COORD_X)';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(COORD_X)';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(COORD_X)';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(COORD_X * 3)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(COORD_X * 2)';
        break;
      case 'none':
        imgUploadPreview.style.filter = null;
        break;
    }
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
  effectRadio[i].addEventListener('change', onEditEffect);
  effectRadio[i].addEventListener('change', changeHandler);
}

// Добавляем пин слайдера
effectLevelPin.addEventListener('mouseup', onDifEffects);
