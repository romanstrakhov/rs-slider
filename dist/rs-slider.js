'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import addDOMElement from './helpers.js';

var Slider = function () {
  function Slider(id) {
    _classCallCheck(this, Slider);

    this.slides = []; // list of all slider slides as DOM objects
    this.position = 1;

    this.wrapper = document.getElementById(id);

    // Add images from HTML markup
    this.wrapper.querySelectorAll('.rsslider__item').forEach(function (element) {
      element.classList.add('hidden');
      this.slides.push(element);
    }, this);

    this.addArrows();
    this.addPaginator();
    this.showSlide(this.position);
  }

  // Methods

  /**
   * Add 'prev' and 'next' arrows
   */


  _createClass(Slider, [{
    key: 'addArrows',
    value: function addArrows() {
      var _this = this;

      this.arrows = {};

      this.arrows['prev'] = addDOMElement(this.wrapper, 'button', ['rsslider__prev']);
      this.arrows['next'] = addDOMElement(this.wrapper, 'button', ['rsslider__next']);
      this.updateArrows();

      // Set event listeners
      this.arrows['prev'].addEventListener('click', function () {
        return _this.move(-1);
      });
      this.arrows['next'].addEventListener('click', function () {
        return _this.move(1);
      });
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
          this.showArrows('prev', true);
          break;
        case this.slides.length:
          this.showArrows('next', true);
          break;
      }

      switch (toPosition) {
        case 1:
          this.showArrows('prev', false);
          break;
        case this.slides.length:
          this.showArrows('next', false);
          break;
      }
    }
  }, {
    key: 'addPaginator',
    value: function addPaginator() {
      var _this2 = this;

      this.paginator = addDOMElement(this.wrapper, 'div', ['rsslider__paginator']);
      this.paginatorElements = [];

      this.slides.forEach(function () {
        return _this2.paginatorElements.push(addDOMElement(_this2.paginator, 'button', ['rsslider__paginator__button']));
      });

      // Set event listeners to each paginator element

      this.paginatorElements.forEach(function (element, index) {
        element.addEventListener('click', function () {
          return _this2.jump(index + 1);
        });
      });

      this.updatePaginator();
    }
  }, {
    key: 'updatePaginator',
    value: function updatePaginator() {
      var toPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var fromPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;


      this.paginatorElements[fromPosition - 1].classList.remove('active');
      this.paginatorElements[toPosition - 1].classList.add('active');
    }
  }, {
    key: 'move',
    value: function move(delta) {

      this.setPosition(this.position + delta);
    }
  }, {
    key: 'jump',
    value: function jump(position) {

      this.setPosition(position);
    }

    /**
     * Set new position of slider, update all controls depending on initial and target position
     * @param  {int} position
     */

  }, {
    key: 'setPosition',
    value: function setPosition(position) {

      if (position < 1 || position > this.slides.length) {
        return false; // error, no action
      } else if (position === this.position) {
        return false; // TODO: Decide should we handle this excusively
      }

      var oldPosition = this.position;

      this.showSlide(oldPosition, false); // Note: this.position may be out of range!
      this.position = position;
      this.showSlide();

      this.updateArrows(position, oldPosition);
      this.updatePaginator(position, oldPosition);
    }

    /**
     * Show or hide 'prev'/'next' arrow
     * @param   {String} button 'prev' or 'next'
     * @returns {Boolean} show 
     */

  }, {
    key: 'showArrows',
    value: function showArrows(button, show) {

      if (show) {
        this.arrows[button].classList.remove('hidden');
      } else {
        this.arrows[button].classList.add('hidden');
      }
    }

    /**
     * Show or hide slide of given position. Show current slide by default
     * @param  {} position=this.position
     * @param  {} state=true
     */

  }, {
    key: 'showSlide',
    value: function showSlide() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      if (position < 1 || position > this.slides.length) {
        return false;
      }

      if (state) {
        this.slides[position - 1].classList.remove('hidden');
      } else {
        this.slides[position - 1].classList.add('hidden');
      }
    }
  }]);

  return Slider;
}();

// =================== To be MODULED...

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