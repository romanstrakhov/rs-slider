// import addDOMElement from './helpers.js';

class Slider {

  constructor( id, config = {} ) {
    
    this.id = id;
    
    this.slides = []; // list of all slider slides as DOM objects
    this.position = 1;

    this.wrapper = document.getElementById(this.id);
    this.wrapper.classList.add('rsslider');

    // Add images from HTML markup
    this.wrapper.querySelectorAll('.rsslider__item').forEach( function(element) {
      element.classList.add('hidden');
      this.slides.push(element);
    }, this);

    this.addButtons();
    this.showCurrent();

  }


  // Methods
   
  // Adds 'prev' and 'next' buttons
  addButtons() {

    this.prevButton = addDOMElement(this.wrapper, 'button', ['rsslider__prev']);
    this.nextButton = addDOMElement(this.wrapper, 'button', ['rsslider__next']);
    this.updateArrows();

    // Event listeners
    
    let thisSlider = this;
    this.wrapper.addEventListener('click', function(event){

      if (event.target.classList.contains('rsslider__prev')) {
        thisSlider.shift(-1);
      }

      if (event.target.classList.contains('rsslider__next')) {
        thisSlider.shift(1);
      }

    });

  }

  checkPosition() {

    if (this.position>=this.slides.length) {
      this.position = this.slides.length;
      this.showButton('next', false);
      return;
    } else {
      this.showButton('next', true);
    }

    if (this.position<=1) {
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
  shift(delta) { 

    this.checkPosition();
    this.hideCurrent();
    
    this.position+=delta;

    this.checkPosition();
    this.showCurrent();

  }

  jump(position) {

    this.updateArrows();

  }

  /**
   * Update 'prev'/'next' arrows on sides
   * @param  {int} toPosition 
   * @param  {int} fromPosition optional
   */
  updateArrows(toPosition=this.position, fromPosition=this.position) {

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
  showButton(button, show) {

    if (button=='prev') {
      if (show) {
        this.prevButton.classList.remove('hidden');
      } else {
        this.prevButton.classList.add('hidden');
      }
    }

    if (button=='next') {
      if (show) {
        this.nextButton.classList.remove('hidden');
      } else {
        this.nextButton.classList.add('hidden');
      }
    }


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
    this.slides[this.position-1].classList.add('hidden');
  }

  showCurrent() {
    this.slides[this.position-1].classList.remove('hidden');
  }

}


/**
 * Adds an element to DOM
 * @param   {Node} wrapper 
 * @param   {String} tag Tag for element
 * @param   {Array} classList List of classes
 * @param   {Object} attList List of attributes
 *
 * @returns {Node} DOM object
 */
function addDOMElement( wrapper, tag='div', classList=[], attList={} ) {
    
  let DOMElement = document.createElement(tag);

  // TODO: Проверить classList и attList на типы!

  if (classList.length > 0) {
    classList.forEach( item => DOMElement.classList.add(item));
  }

  if (attList.length > 0) {
    Object.keys(attList).forEach( key  => DOMElement.setAttribute(key, attList[key]) );
  }

  wrapper.appendChild(DOMElement);
  
  return DOMElement;

}
