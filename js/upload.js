// upload.js
'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var ifErrorExecute = function (xhr, handlerSuccess, handlerError) {
    var error;
    switch (xhr.status) {
      case 200:
        handlerSuccess(xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;

      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      handlerError(error);
    }
  };

  window.upload = {
    loadPhoto: function (handlerSuccess, handlerError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        ifErrorExecute(xhr, handlerSuccess, handlerError);
      });

      xhr.addEventListener('error', function () {
        handlerError('Ошибка с кодом ' + xhr.status);
      });

      xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
      xhr.send();
    },

    uploadPost: function (data, handlerSuccess, handlerError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        ifErrorExecute(xhr, handlerSuccess, handlerError);
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

})();
