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
var changeEffect = editImgFormOpen.querySelector('.img-upload__preview-container');

// Радио кнопки
var effectRadio = changeEffect.querySelector('.effects__radio');
var effectForm = changeEffect.querySelector('.effects__list');

// Функция определения эффекта
var onEditEffect = function () {
  switch (effectForm.effect.value) {
    case 'chrome':
      changeEffect.className = 'effects__preview  effects__preview--chrome';
      break;
    case 'sepia':
      changeEffect.className = 'effect-sepia';
      break;
    case 'marvin':
      changeEffect.className = 'effect-marvin';
      break;
    case 'phobos':
      changeEffect.className = 'effect-phobos';
      break;
    case 'heat':
      changeEffect.className = 'effect-heat';
      break;
  }
};

firstUploadFieldOpen.addEventListener('change', function () {
  editImgFormOpen.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYBUTTON) {
      editImgFormOpen.classList.add('hidden');
    }
  });
});

editImgFormClose.addEventListener('click', function () {
  editImgFormOpen.classList.add('hidden');
});

effectRadio.addEventListener('change', onEditEffect);
