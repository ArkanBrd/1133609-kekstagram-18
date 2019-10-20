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

// Смена эффекта изображения
var effectList = document.querySelector('.effects__list');
var effectRadio = document.querySelectorAll('.effects__item');
var changedElement = null;
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

// Изменение глубины эффекта, накладываемого на изображение
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
var imgUploadPreview = editImgFormOpen.querySelector('.img-upload__preview');

var currentEffect = 'none';
var swapFilters = function (effect, depth) {
  if (effect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else {imgUploadEffectLevel.classList.remove('hidden');};

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
  };
  effectLevelPin.style.left = depth * 100 + '%';
  effectLevelDepth.style.width = depth * 100 + '%';
};

var onDifEffects = function (evt) {
  var rectLine = effectLevelLine.getBoundingClientRect ();
  var coordinateX = (evt.clientX - rectLine.left) / rectLine.width;

  swapFilters(uploadForm.effect.value, coordinateX);
};

// Открытие и закрытие через ESC формы редактирования
firstuploadFormOpen.addEventListener('change', function () {
  editImgFormOpen.classList.remove('hidden');
  swapFilters(uploadForm.effect.value, 1);

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
  
  swapFilters(uploadForm.effect.value, 1);
};

for (var i = 0; i < effectRadio.length; i++) {
  effectRadio[i].addEventListener('change', changeHandler);
}

// Добавляем пин слайдера
effectLevelLine.addEventListener('mouseup', onDifEffects);

// Выполняем валидацию
var handlerUplodForm = function (evt) {
  evt.preventDefault();
  var hashtags = uploadForm.hashtags.value;
  var words = hashtags.split(' ');
  for (var i = 0; i < words.length; i++) {
    if (words[i][0] !== '#') {
      uploadForm.hashtags.setCustomValidity ('хэш-тег начинается с символа # (решётка)');
      break};
	if (words[i] === '#') {
      uploadForm.hashtags.setCustomValidity ('хеш-тег не может состоять только из одной решётки');
      break};
	if (words[i] !== words[i]) {
      uploadForm.hashtags.setCustomValidity ('один и тот же хэш-тег не может быть использован дважды');
      break};
    if (words[i] > 5) {
      uploadForm.hashtags.setCustomValidity ('нельзя указать больше пяти хэш-тегов');
      break};
	if (words[i].length > 20) {
      uploadForm.hashtags.setCustomValidity ('максимальная длина одного хэш-тега 20 символов, включая решётку');
      break};
    if (words[i] ) {
		
	
  };
};

uploadForm.addEventListener('submit', handlerUplodForm);




