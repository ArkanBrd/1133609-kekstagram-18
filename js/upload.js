// Файл upload.js
'use strict';

var ESC_KEYBUTTON = 27;

// Поле для загрузки нового изображения на сайт
var uploadForm = document.querySelector('#upload-select-image');

// Изначальное состояние поля для загрузки изображения
var firstuploadFormOpen = uploadForm.querySelector('#upload-file');

// Форма редактирования изображения
var editImgFormOpen = uploadForm.querySelector('.img-upload__overlay');

// Закрытие формы редактирования изображения
var editImgFormClose = editImgFormOpen.querySelector('#upload-cancel');

// Изменение масштаба
var buttonMinus = document.querySelector('.scale__control--smaller');
var buttonPlus = document.querySelector('.scale__control--bigger');
var scaleControl = document.querySelector('.scale__control--value');

// Смена эффекта изображения
var effectRadio = document.querySelectorAll('.effects__item');
var changedElement = null;
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

// Изменение глубины эффекта, накладываемого на изображение
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
var imgUploadPreview = editImgFormOpen.querySelector('.img-upload__preview');

var swapFilters = function (effect, depth) {
  if (effect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }

  switch (effect) {
    case 'chrome':
      imgUploadPreview.style.filter = 'grayscale(' + depth + ')';
      break;
    case 'sepia':
      imgUploadPreview.style.filter = 'sepia(' + depth + ')';
      break;
    case 'marvin':
      imgUploadPreview.style.filter = 'invert(' + depth * 100 + '%)';
      break;
    case 'phobos':
      imgUploadPreview.style.filter = 'blur(' + depth * 3 + 'px)';
      break;
    case 'heat':
      imgUploadPreview.style.filter = 'brightness(' + depth * 2 + ')';
      break;
    case 'none':
      imgUploadPreview.style.filter = null;
      break;
  }
  effectLevelPin.style.left = depth * 100 + '%';
  effectLevelDepth.style.width = depth * 100 + '%';
};

var onDifEffects = function (evt) {
  var rectLine = effectLevelLine.getBoundingClientRect();
  var coordinateX = (evt.clientX - rectLine.left) / rectLine.width;

  swapFilters(uploadForm.effect.value, coordinateX);
};

// Открытие и закрытие через ESC формы редактирования
firstuploadFormOpen.addEventListener('change', function () {
  editImgFormOpen.classList.remove('hidden');
  swapFilters(uploadForm.effect.value, 1);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYBUTTON && document.activeElement !== uploadForm.hashtags) {
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

  swapFilters(uploadForm.effect.value, 1);
};

for (var i = 0; i < effectRadio.length; i++) {
  effectRadio[i].addEventListener('change', changeHandler);
}

// Добавляем пин слайдера
effectLevelLine.addEventListener('mouseup', onDifEffects);

// Функция нажатия на "-" и "+"
var SCALEDEFAULT = 1;
var STEPSCALE = 0.25;
var currentScale = SCALEDEFAULT;
var onButtonMinusClick = function () {
  if (currentScale > 0.25) {
    currentScale = currentScale - STEPSCALE;
    scaleControl.value = currentScale * 100 + '%';
    imgUploadPreview.style.transform = 'scale(' + currentScale + ')';
  }
};

var onButtonPlusClick = function () {
  scaleControl.scale = SCALEDEFAULT;
  if (currentScale < 1) {
    currentScale = currentScale + STEPSCALE;
    scaleControl.value = currentScale * 100 + '%';
    imgUploadPreview.style.transform = 'scale(' + currentScale + ')';
  }
};

// Событие по нажатию "-" и "+"
buttonMinus.addEventListener('click', onButtonMinusClick);
buttonPlus.addEventListener('click', onButtonPlusClick);

// Выполняем валидацию
var handlerUplodForm = function () {
  var hashtags = uploadForm.hashtags.value;
  var words = hashtags.split(/ +/);
  var wordsMap = {};
  if (words.length > 5) {
    uploadForm.hashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  }
  for (var j = 0; j < words.length; j++) {
    if (words[j][0] !== '#') {
      uploadForm.hashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      return;
    }
    if (words[j] === '#') {
      uploadForm.hashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      return;
    }
    if (words[j].length > 20) {
      uploadForm.hashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      return;
    }
    if (words[j].indexOf('#', 1) >= 0) {
      uploadForm.hashtags.setCustomValidity('хэш-теги разделяются пробелами');
      return;
    }
    if (wordsMap.hasOwnProperty(words[j].toLowerCase())) {
      uploadForm.hashtags.setCustomValidity('теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом');
      return;
    }
    wordsMap[words[j].toLowerCase()] = true;
  }
  uploadForm.hashtags.setCustomValidity('');
};

uploadForm.hashtags.addEventListener('change', handlerUplodForm);
