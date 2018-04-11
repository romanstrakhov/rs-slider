
const DEBUG = true;

function Slider ( sliderID, sliderImages ) { // class constructor

  this.id = sliderID;
  this.images = sliderImages;

  this.numImages = sliderImages.length;
  this.listImages = [];
  this.currentImage = 1;

  if (this.numImages<=0) {
    return false;
  }

  let placeholder = document.getElementById(this.id);

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
  sliderImages.forEach( function(e, i, a) {
    let imageItem = document.createElement('img');
    imageItem.setAttribute('src', e);
    imageItem.classList.add('rsslider__image');
    placeholder.appendChild(imageItem);
    this.listImages.push(imageItem);
  }, this);


  Object.defineProperty( this, 'updateView', { 
    value: function () {

    if (this.currentImage<1) {
      this.currentImage = 1;
    } else if (this.currentImage>this.numImages) {
      this.currentImage = this.numImages;
    }

    this.arrowPrev.classList.remove('hidden');
    this.arrowNext.classList.remove('hidden');

    if (this.currentImage==1) {
      this.arrowPrev.classList.add('hidden');
    } 
    if (this.currentImage==this.numImages) {
      this.arrowNext.classList.add('hidden');
    }
    
    this.listImages.forEach( function(e, i, a) {
      if ( i + 1 !== this.currentImage ) {
        e.classList.add('hidden');
      } else {
        e.classList.remove('hidden');
      }
    }, this);

    return this;

    },
  enumerable: true,
  configurable: true,
  writable: true
  });

  
  placeholder.classList.add('rsslider');

  this.updateView();
  
  var thisSlider = this;
  placeholder.addEventListener('click', function(e){

  	if (e.target.classList.contains('rsslider__prev')) {
  		thisSlider.goPrev();
  	}

  	if (e.target.classList.contains('rsslider__next')) {
  		thisSlider.goNext();
  	}

  });


  Object.defineProperty( this, 'goNext', { 
    
    value: function () {

    this.currentImage++;
    this.updateView();
    return this;

    },
  enumerable: true,
  configurable: true,
  writable: true
  });


  Object.defineProperty( this, 'goPrev', { 
    value: function () {

      this.currentImage--;
      this.updateView();
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  });

};


function debuglog(item) {
  if ( DEBUG ) {
    console.log(item);
    return 1;
  } else {
    return 0;
  }
};
