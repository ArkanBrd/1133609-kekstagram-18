// Файл util.js
'use strict';

(function () {
  var ESC_KEY_BUTTON = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY_BUTTON) {
        action();
      }
    }
  };
})();
