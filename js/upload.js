// upload.js
'use strict';

(function () {
  window.upload = {
    loadPhoto: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onSuccess(JSON.parse(xhr.responseText));
            break;
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не фвторизован';
            break;
          case 404:
            error = 'Ничего не найдено';
            break;

          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка с кодом ' + xhr.status);
      });

      xhr.open('GET', 'https://js.dump.academy/kekstagram/data2');
      xhr.send();
    }

  };

})();
