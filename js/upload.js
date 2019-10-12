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

// Радио кнопки
var effectRadio = effectList.querySelector('.effects__radio');
var effectForm = uploadField.querySelector('#upload-select-image');

//Изменение глубины эффекта, накладываемого на изображение
var effectLevelPin = editImgFormOpen.querySelector('.effect-level__pin');
var effectLevelValue = editImgFormOpen.querySelector('.effect-level__value');
var imgUploadPreview = editImgFormOpen.querySelector('.img-upload__preview');

// Функция определения эффекта
var onEditEffect = function () {
  switch (effectForm.effect.value) {
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

var onDifEffects = function () {
  switch (effectForm.effect.value) {
    case 'chrome':
      effectLevelValue.filter: grayscale(0..1);
      break;
    case 'sepia':
      effectLevelValue.filter: sepia(0..1);
      break;
    case 'marvin':
      effectLevelValue.filter: invert(0..100%);
      break;
    case 'phobos':
      effectLevelValue.filter: blur(0..3px);
      break;
    case 'heat':
      effectLevelValue.filter: brightness(1..3);
      break;
    case 'none':
      effectLevelValue.filter: remove;
      break;
  };
};
//Открытие и закрытие через ESC формы редактирования
firstUploadFieldOpen.addEventListener('change', function () {
  editImgFormOpen.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYBUTTON) {
      editImgFormOpen.classList.add('hidden');
    }
  });
});

//Закрытие формы редактирования
editImgFormClose.addEventListener('click', function () {
  editImgFormOpen.classList.add('hidden');
});

effectRadio.addEventListener('click', onEditEffect);

//Добавляем пин слайдера
effectLevelPin.addEventListener('mouseup', );
