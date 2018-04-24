import { addDOMElement } from './helpers.js';

export class Slider {

  constructor( id ) {
    
    this.slides = []; // list of all slider slides as DOM objects
    this.position = 1;

    this.wrapper = document.getElementById(id);

    // Add images from HTML markup
    this.wrapper.querySelectorAll('.rsslider__item').forEach( function(element) {
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
  addArrows() {

    this.arrows = {};

    this.arrows['prev'] = addDOMElement(this.wrapper, 'button', ['rsslider__prev']);
    this.arrows['next'] = addDOMElement(this.wrapper, 'button', ['rsslider__next']);
    this.updateArrows();

    // Set event listeners
    this.arrows['prev'].addEventListener( 'click', () => this.move(-1) );
    this.arrows['next'].addEventListener( 'click', () => this.move(1) );

  }

  /**
   * Update 'prev'/'next' arrows on sides
   * @param  {int} toPosition 
   * @param  {int} fromPosition optional
   */
  updateArrows(toPosition=this.position, fromPosition=this.position) {

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

  addPaginator() {

    this.paginator = addDOMElement(this.wrapper, 'div', ['rsslider__paginator']);
    this.paginatorElements = [];

    this.slides.forEach( () => 
      this.paginatorElements.push(addDOMElement(this.paginator, 'button', ['rsslider__paginator__button'])) );

    // Set event listeners to each paginator element

    this.paginatorElements.forEach( (element, index) => {
      element.addEventListener( 'click', () => this.jump(index+1));
    });

    this.updatePaginator();

  }

  updatePaginator(toPosition=this.position, fromPosition=this.position) {

    this.paginatorElements[fromPosition-1].classList.remove('active');
    this.paginatorElements[toPosition-1].classList.add('active');

  }


  move(delta) { 

    this.setPosition(this.position + delta);

  }

  jump(position) {

    this.setPosition(position);

  }


  /**
   * Set new position of slider, update all controls depending on initial and target position
   * @param  {int} position
   */
  setPosition(position) {

    if( position < 1 || position > this.slides.length) {
      return false; // error, no action
    } else if(position===this.position) {
      return false; // TODO: Decide should we handle this excusively
    }

    let oldPosition = this.position;

    this.showSlide(oldPosition,false); // Note: this.position may be out of range!
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
  showArrows(button, show) {

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
  showSlide(position=this.position, state=true) {

    if (position<1 || position>this.slides.length) {
      return false;
    }

    if(state) {
      this.slides[position-1].classList.remove('hidden');
    } else {
      this.slides[position-1].classList.add('hidden');
    }
  }
}
