class Slider {

  constructor( id, items ) {
    
    this.id = id;

    this.items = []; // list of all slider items as DOM objects
    this.position = 1;
    
    this.container = document.getElementById(this.id);

    this.container.classList.add('rsslider');

    this.prevButton = this.addElement('button', 'rsslider__prev');
    this.nextButton = this.addElement('button', 'rsslider__next');

    // Add images from HTML markup
    let embedded = this.container.querySelectorAll('img.rsslider__item');
    embedded.forEach( function(element) {
      element.classList.add('hidden');
      this.items.push(element);
    }, this);

    // Add addition images via Javascript
    items.forEach( function(element) {
      this.items.push(this.addElement('img', ['rsslider__item', 'hidden'], { src: element }));
    }, this);
  
    this.showCurrent();

    if (this.position===1) {
      this.hidePrevButton();
    }
    if (this.position===this.items.length) {
      this.hideNextButton();
    }

    // Event listeners
    
    let thisSlider = this;
    this.container.addEventListener('click', function(event){

      if (event.target.classList.contains('rsslider__prev')) {
        thisSlider.prev();
      }

      if (event.target.classList.contains('rsslider__next')) {
        thisSlider.next();
      }

    });

  }

  next() {

    if (this.position>=this.items.length) {
      this.position = this.items.length;
      return;
    }

    if (this.position===1) {
      this.showPrevButton();
    }
    
    this.hideCurrent();
    this.position++;
    this.showCurrent();

    if (this.position===this.items.length) {
      this.hideNextButton();
    }

  }

  prev() {

    if (this.position<=1) {
      this.position = 1;
      return;
    }

    if (this.position===this.items.length) {
      this.showNextButton();
    }
    
    this.hideCurrent();
    this.position--;
    this.showCurrent();

    if (this.position===1) {
      this.hidePrevButton();
    }

  }

  // Internal functions
   
  /**
   * Adds an element to slider
   * @param   {String} element tag
   * @param   {String} or {Array} elementClass or array of classes
   * @param   {Object} elementAttributes 
   *
   * @returns {Node} DOM object
   */
  addElement() {

    if ( arguments.length < 2 ) {
      return false;
    }

    let item = document.createElement(arguments[0]);
    
    if (arguments[1] instanceof Array) {
      arguments[1].forEach( function(element){
        item.classList.add(element);
      });
    } else {
      item.classList.add(arguments[1]);
    }
    
    if ( arguments.length > 2 ) {
      
      let attributes  = arguments[2];
      Object.keys(attributes).forEach( function(key) {
        item.setAttribute(key, attributes[key]);
      });

    }
    
    this.container.appendChild(item);
    return item;
  }

  hideNextButton() {
    this.nextButton.classList.add('hidden');
  }

  hidePrevButton() {
    this.prevButton.classList.add('hidden');
  }

  showNextButton() {
    this.nextButton.classList.remove('hidden');
  }

  showPrevButton() {
    this.prevButton.classList.remove('hidden');
  }

  hideCurrent() {
    this.items[this.position-1].classList.add('hidden');
  }

  showCurrent() {
    this.items[this.position-1].classList.remove('hidden');
  }

}
