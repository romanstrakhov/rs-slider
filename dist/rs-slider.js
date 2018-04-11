'use strict';

function Slider(sliderID, sliderImages) {
  // class constructor

  this.id = sliderID;
  this.images = sliderImages;
  this.currentImage = 1;
  this.numImages = sliderImages.length;

  var placeholder = document.getElementById(this.id);

  this.imagesNode = placeholder.querySelectorAll('img.rsslider__image');

  console.log(placeholder);
  // console.info(arguments)

  // placeholder.innerHTML = `Script for ${this.id} is loaded.`;

  placeholder.classList.add('rsslider');

  var thisSlider = this;

  placeholder.addEventListener('click', function (e) {

    // console.log('click:' + this.id);

    if (e.target.classList.contains('rsslider__prev')) {
      console.log('goPrev');
      thisSlider.goPrev();
    }

    if (e.target.classList.contains('rsslider__next')) {
      console.log('goNext');
      thisSlider.goNext();
    }
  });

  Object.defineProperty(this, 'goNext', {
    value: function value() {

      console.log('wentNext');
      // exit 0;	
    },
    enumerable: true,
    configurable: true,
    writable: true
  });

  Object.defineProperty(this, 'goPrev', {
    value: function value() {

      console.log('wentPrev');
      // exit 0;	
    },
    enumerable: true,
    configurable: true,
    writable: true
  });

  /*  this.goNext = function() {
    	console.log('goNext');
    	exit 0;	
    };
  
    this.goPrev = function() {
    	console.log('goPrev');
    	exit 0;	
    };
  */
}