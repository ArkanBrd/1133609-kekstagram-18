// form.js
'use strict';

(function () {
  var SCALEDEFAULT = 1;
  var STEPSCALE = 0.25;

  // Поле для загрузки нового изображения на сайт
  var uploadForm = document.querySelector('#upload-select-image');

  // Изначальное состояние поля для загрузки изображения


  // Форма редактирования изображения
  var editImgFormOpen = uploadForm.querySelector('.img-upload__overlay');

  // Закрытие формы редактирования изображения
  var editImgFormClose = editImgFormOpen.querySelector('#upload-cancel');

  // Изменение масштаба
  var buttonMinus = document.querySelector('.scale__control--smaller');
  var buttonPlus = document.querySelector('.scale__control--bigger');
  var scaleControl = document.querySelector('.scale__control--value');

  // Смена эффекта изображения
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
        imgUploadPreview.classList.add('effect__preview--chrome');
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + depth + ')';
        imgUploadPreview.classList.add('effect__preview--sepia');
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + depth * 100 + '%)';
        imgUploadPreview.classList.add('effect__preview--marvin');
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + (depth * 2) + 1 + 'px)';
        imgUploadPreview.classList.add('effect__preview--phobos');
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + depth * 2 + ')';
        imgUploadPreview.classList.add('effect__preview--heat');
        break;
      case 'none':
        imgUploadPreview.style.filter = null;
        break;
    }
    effectLevelPin.style.left = depth * 100 + '%';
    effectLevelDepth.style.width = depth * 100 + '%';
  };

  var closeMouseClick = function () {
    document.removeEventListener('mousemove', onDifEffects);
    document.removeEventListener('mouseup', closeMouseClick);

  };
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    document.addEventListener('mousemove', onDifEffects);
    document.addEventListener('mouseup', closeMouseClick);

  });


  var onDifEffects = function (evt) {
    var rectLine = effectLevelLine.getBoundingClientRect();
    var coordinateX = (evt.clientX - rectLine.left) / rectLine.width;
    if (coordinateX < 0) {
      coordinateX = 0;
    }
    if (coordinateX > 1) {
      coordinateX = 1;
    }
    swapFilters(uploadForm.effect.value, coordinateX);
  };
  effectLevelLine.addEventListener('mouseup', onDifEffects);

  var uploadEscClose = function (evt) {
    window.util.isEscEvent(evt, function () {
      if (document.activeElement !== uploadForm.hashtags && document.activeElement !== uploadForm.description) {
        uploadCancel();
      }
    });
  };

  var uploadOpen = function () {
    editImgFormOpen.classList.remove('hidden');
  };
  window.form = {
    uploadFormOpen: function () {
      uploadOpen();
      swapFilters(uploadForm.effect.value, 1);
      scaleControl.value = SCALEDEFAULT * 100 + '%';

      document.addEventListener('keydown', uploadEscClose);

      editImgFormClose.addEventListener('click', uploadCancel);
    }
  };

  // Открытие и закрытие через ESC формы редактирования


  var uploadCancel = function () {
    editImgFormOpen.classList.add('hidden');
    editImgFormClose.removeEventListener('click', uploadCancel);
    document.removeEventListener('keydown', uploadEscClose);
  };

  var changeHandlerEffect = function (evt) {
    if (changedElement) {
      changedElement.classList.remove('change');
    }
    changedElement = evt.target;
    changedElement.classList.add('change');

    swapFilters(uploadForm.effect.value, 1);
  };

  var effectList = document.querySelector('.effects__list');
  effectList.addEventListener('change', changeHandlerEffect);

  // Функция нажатия на "-" и "+"
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

  var handlerDescriptionUplodForm = function () {
    var textDescription = uploadForm.description.value;
    if (textDescription.length > 140) {
      uploadForm.description.setCustomValidity('длина комментария не может составлять больше 140 символов');
      return;
    }
  };
  uploadForm.hashtags.addEventListener('change', handlerUplodForm);

  uploadForm.description.addEventListener('change', handlerDescriptionUplodForm);

})();
