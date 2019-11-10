// popup.js
'use strict';

(function () {
  
  var errorLoad = document.querySelector('#error');
  var mainPhoto = document.querySelector('main');
  var successLoad = document.querySelector('#success');
  

  window.popup = {
    errorShow: function (error) {
      var escClose = function (evt) {
        window.util.isEscEvent(evt, errorClose);
      };
	  
	  var clickClose = function (evt) {
        if (!errorInner.contains(evt.target)){
          errorClose();
		};
	  };

      var errorClose = function () {
        mainPhoto.removeChild(errorElement);
		document.removeEventListener('keydown', escClose);
		document.removeEventListener('click', clickClose);
      };

      document.addEventListener('keydown', escClose);
	  document.addEventListener('click', clickClose);

      var errorElement = errorLoad.content.cloneNode(true).querySelector('.error');
	  var errorInner = errorElement.querySelector('.error__inner');
      var buttonError = errorElement.querySelectorAll('.error__button');
      errorElement.querySelector('.error__title').textContent = error;
      for (var i = 0; i < buttonError.length; i++) {
        buttonError[i].addEventListener('click', function () {
          errorClose();
	    });
	  };
      mainPhoto.appendChild(errorElement);
    },

    successShow: function (data) {
      var successElement = successLoad.content.cloneNode(true);
	  var buttonSuccess = successElement.querySelector('.success__button');
	  buttonSuccess.addEventListener('click', function () {
        mainPhoto.removeChild(successElement);
	  });
      mainPhoto.appendChild(successElement);
    }
  }
})();