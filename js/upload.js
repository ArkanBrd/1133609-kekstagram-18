// upload.js
'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var ifErrorExecute = function () {
    var xhr = new XMLHttpRequest();
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
      xhr.responseType = 'json';

      xhr.addEventListener('load', ifErrorExecute);

      xhr.addEventListener('error', function () {
        handlerError('Ошибка с кодом ' + xhr.status);
      });

      xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
      xhr.send();
    },

    uploadPost: function (data, handlerSuccess, handlerError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', ifErrorExecute);
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

})();
