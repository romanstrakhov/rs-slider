'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEBUG = true;

var Slider = function () {
  function Slider(id, items) {
    _classCallCheck(this, Slider);

    this.id = id;
    this.count = items.length; // number of items

    this.items = []; // list of all slider items as DOM objects
    this.position = 1; // 

    this.container = document.getElementById(this.id);

    this.container.classList.add('rsslider');

    this.prevButton = this.addElement('button', 'rsslider__prev');
    this.nextButton = this.addElement('button', 'rsslider__next');

    items.forEach(function (element) {
      this.items.push(this.addElement('img', ['rsslider__item', 'hidden'], { src: element }));
    }, this);

    this.showCurrent();

    if (this.position === 1) {
      this.hidePrevButton();
    }
    if (this.position === this.count) {
      this.hideNextButton();
    }

    // Event listeners

    var thisSlider = this;
    this.container.addEventListener('click', function (event) {

      if (event.target.classList.contains('rsslider__prev')) {
        thisSlider.prev();
      }

      if (event.target.classList.contains('rsslider__next')) {
        thisSlider.next();
      }
    });
  }

  _createClass(Slider, [{
    key: 'next',
    value: function next() {

      if (this.position >= this.count) {
        this.position = this.count;
        return;
      }

      if (this.position === 1) {
        this.showPrevButton();
      }

      this.hideCurrent();
      this.position++;
      this.showCurrent();

      if (this.position === this.count) {
        this.hideNextButton();
      }
    }
  }, {
    key: 'prev',
    value: function prev() {

      if (this.position <= 1) {
        this.position = 1;
        return;
      }

      if (this.position === this.count) {
        this.showNextButton();
      }

      this.hideCurrent();
      this.position--;
      this.showCurrent();

      if (this.position === 1) {
        this.hidePrevButton();
      }
    }

    //
    // arguments: element(tag), elementClass, elementAttributes(Object)
    // returns: DOM element
    //

  }, {
    key: 'addElement',
    value: function addElement() {

      if (arguments.length < 2) {
        return false;
      }

      var item = document.createElement(arguments[0]);

      if (arguments[1] instanceof Array) {
        arguments[1].forEach(function (element) {
          item.classList.add(element);
        });
      } else {
        item.classList.add(arguments[1]);
      }

      if (arguments.length > 2) {

        var attributes = arguments[2];
        Object.keys(attributes).forEach(function (key) {
          item.setAttribute(key, attributes[key]);
        });
      }

      this.container.appendChild(item);
      return item;
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
      this.items[this.position - 1].classList.add('hidden');
    }
  }, {
    key: 'showCurrent',
    value: function showCurrent() {
      this.items[this.position - 1].classList.remove('hidden');
    }
  }]);

  return Slider;
}();

function debuglog(item) {
  if (DEBUG) {
    console.log(item);
    return 1;
  } else {
    return 0;
  }
}