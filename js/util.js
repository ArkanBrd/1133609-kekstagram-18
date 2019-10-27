// Файл util.js
'use strict';

(function () {
  var ESC_KEYBUTTON = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYBUTTON) {
        action();
      }
    }
  };
})();
