'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import addDOMElement from './helpers.js';

var Slider = function () {
  function Slider(id) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Slider);

    this.id = id;

    this.slides = []; // list of all slider slides as DOM objects
    this.position = 1;

    this.wrapper = document.getElementById(this.id);
    this.wrapper.classList.add('rsslider');

    // Add images from HTML markup
    this.wrapper.querySelectorAll('.rsslider__item').forEach(function (element) {
      element.classList.add('hidden');
      this.slides.push(element);
    }, this);

    this.addButtons();
    this.showCurrent();
  }

  // Methods

  // Adds 'prev' and 'next' buttons


  _createClass(Slider, [{
    key: 'addButtons',
    value: function addButtons() {

      this.prevButton = addDOMElement(this.wrapper, 'button', ['rsslider__prev']);
      this.nextButton = addDOMElement(this.wrapper, 'button', ['rsslider__next']);
      this.updateArrows();

      // Event listeners

      var thisSlider = this;
      this.wrapper.addEventListener('click', function (event) {

        if (event.target.classList.contains('rsslider__prev')) {
          thisSlider.shift(-1);
        }

        if (event.target.classList.contains('rsslider__next')) {
          thisSlider.shift(1);
        }
      });
    }
  }, {
    key: 'checkPosition',
    value: function checkPosition() {

      if (this.position >= this.slides.length) {
        this.position = this.slides.length;
        this.showButton('next', false);
        return;
      } else {
        this.showButton('next', true);
      }

      if (this.position <= 1) {
        this.position = 1;
        this.showButton('prev', false);
        return;
      } else {
        this.showButton('prev', true);
      }
    }
    /**
     * @param  {int} delta Jumps by [delta] slides
     */

  }, {
    key: 'shift',
    value: function shift(delta) {

      this.checkPosition();
      this.hideCurrent();

      this.position += delta;

      this.checkPosition();
      this.showCurrent();
    }
  }, {
    key: 'jump',
    value: function jump(position) {

      this.updateArrows();
    }

    /**
     * Update 'prev'/'next' arrows on sides
     * @param  {int} toPosition 
     * @param  {int} fromPosition optional
     */

  }, {
    key: 'updateArrows',
    value: function updateArrows() {
      var toPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var fromPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;


      switch (fromPosition) {
        case 1:
          this.showButton('prev', true);
          break;
        case this.slides.length:
          this.showButton('next', true);
          break;
      }

      switch (toPosition) {
        case 1:
          this.showButton('prev', false);
          break;
        case this.slides.length:
          this.showButton('next', false);
          break;
      }
    }

    /**
     * Shows or hides control buttons
     * @param   {String} button 
     * @param   {String} tag Tag for element
     * @param   {Array} classList List of classes
     * @param   {Object} attList List of attributes
     *
     * @returns {Node} DOM object
     */

  }, {
    key: 'showButton',
    value: function showButton(button, show) {

      if (button == 'prev') {
        if (show) {
          this.prevButton.classList.remove('hidden');
        } else {
          this.prevButton.classList.add('hidden');
        }
      }

      if (button == 'next') {
        if (show) {
          this.nextButton.classList.remove('hidden');
        } else {
          this.nextButton.classList.add('hidden');
        }
      }
    }
  }, {
    key: 'hideNextButton',
    value: function hideNextButton() {
      this.nextButton.classList.add('hidden');
    }
  }, {
    key: 'hidePrevButton',
    value: function hidePrevButton() {
      this.prevButton.classList.add('hidden');
    }
  }, {
    key: 'showNextButton',
    value: function showNextButton() {
      this.nextButton.classList.remove('hidden');
    }
  }, {
    key: 'showPrevButton',
    value: function showPrevButton() {
      this.prevButton.classList.remove('hidden');
    }
  }, {
    key: 'hideCurrent',
    value: function hideCurrent() {
      this.slides[this.position - 1].classList.add('hidden');
    }
  }, {
    key: 'showCurrent',
    value: function showCurrent() {
      this.slides[this.position - 1].classList.remove('hidden');
    }
  }]);

  return Slider;
}();

/**
 * Adds an element to DOM
 * @param   {Node} wrapper 
 * @param   {String} tag Tag for element
 * @param   {Array} classList List of classes
 * @param   {Object} attList List of attributes
 *
 * @returns {Node} DOM object
 */


function addDOMElement(wrapper) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var classList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var attList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


  var DOMElement = document.createElement(tag);

  // TODO: Проверить classList и attList на типы!

  if (classList.length > 0) {
    classList.forEach(function (item) {
      return DOMElement.classList.add(item);
    });
  }

  if (attList.length > 0) {
    Object.keys(attList).forEach(function (key) {
      return DOMElement.setAttribute(key, attList[key]);
    });
  }

  wrapper.appendChild(DOMElement);

  return DOMElement;
}