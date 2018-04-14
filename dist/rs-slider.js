'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEBUG = true;

var Slider = function () {
  function Slider(sliderID, sliderImages) {
    _classCallCheck(this, Slider);

    this.id = sliderID;
    this.images = sliderImages;

    this.numImages = sliderImages.length;
    this.listImages = [];
    this.currentImage = 1;

    if (this.numImages <= 0) {
      return false;
    }

    var placeholder = document.getElementById(this.id);

    if (!placeholder) {
      return false;
    }

    //  add arrows

    this.arrowPrev = document.createElement('div');
    this.arrowPrev.classList.add('rsslider__prev');
    placeholder.appendChild(this.arrowPrev);

    this.arrowNext = document.createElement('div');
    this.arrowNext.classList.add('rsslider__next');
    placeholder.appendChild(this.arrowNext);

    // add images
    sliderImages.forEach(function (e) {
      var imageItem = document.createElement('img');
      imageItem.setAttribute('src', e);
      imageItem.classList.add('rsslider__image');
      placeholder.appendChild(imageItem);
      this.listImages.push(imageItem);
    }, this);

    placeholder.classList.add('rsslider');

    this.updateView();

    var thisSlider = this;
    placeholder.addEventListener('click', function (e) {

      if (e.target.classList.contains('rsslider__prev')) {
        thisSlider.goPrev();
      }

      if (e.target.classList.contains('rsslider__next')) {
        thisSlider.goNext();
      }
    });
  }

  _createClass(Slider, [{
    key: 'updateView',
    value: function updateView() {

      if (this.currentImage < 1) {
        this.currentImage = 1;
      } else if (this.currentImage > this.numImages) {
        this.currentImage = this.numImages;
      }

      this.arrowPrev.classList.remove('hidden');
      this.arrowNext.classList.remove('hidden');

      if (this.currentImage == 1) {
        this.arrowPrev.classList.add('hidden');
      }
      if (this.currentImage == this.numImages) {
        this.arrowNext.classList.add('hidden');
      }

      this.listImages.forEach(function (e, i) {
        if (i + 1 !== this.currentImage) {
          e.classList.add('hidden');
        } else {
          e.classList.remove('hidden');
        }
      }, this);
    }
  }, {
    key: 'goNext',
    value: function goNext() {

      this.currentImage++;
      this.updateView();
      // return this;
    }
  }, {
    key: 'goPres',
    value: function goPres() {

      this.currentImage--;
      this.updateView();
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