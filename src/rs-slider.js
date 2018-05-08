import { addDOMElement, uniteObjects } from './helpers';

export class Slider {
  constructor(id, config = {}) {
    this.slides = []; // list of all slider slides as DOM objects
    this.position = 1;

    this.parseConfig(config);

    this.wrapper = document.getElementById(id);

    switch (this.config.style) {
      case 'slide-h':
        break;
      case 'slide-v':
        break;
      default:
        this.config.style = 'fade';
    }

    this.wrapper.classList.add(`rsslider_style_${this.config.style}`);

    // Add slides from HTML markup
    this.wrapper.querySelectorAll('.rsslider__item').forEach((element) => {
      switch (this.config.style) {
        case 'slide-h':
          element.classList.add('hidden_right');
          break;
        case 'slide-v':
          element.classList.add('hidden_down');
          break;
        case 'fade':
        default:
          element.classList.add('hidden');
      }
      this.slides.push(element);
    }, this);

    if (this.config.controls.arrows === true) this.addArrows();
    if (this.config.controls.pagination) this.addPaginator(this.config.controls.pagination);
    this.showSlide(this.position);
  }

  // Methods

  parseConfig(config) {
    // Defaults
    const defaults = {
      controls: {
        arrows: true,
        pagination: 'dots',
      },
      style: 'fade',
    };
    if (config) { this.config = uniteObjects(defaults, config); }
  }


  /**
   * Add 'prev' and 'next' arrows
   */
  addArrows() {
    this.arrows = {};
    this.arrows.prev = addDOMElement(this.wrapper, 'button', ['rsslider__prev']);
    this.arrows.next = addDOMElement(this.wrapper, 'button', ['rsslider__next']);
    this.redrawArrowsOnSides();
    // Set event listeners
    this.arrows.prev.addEventListener('click', () => this.move(-1));
    this.arrows.next.addEventListener('click', () => this.move(1));
  }

  /**
   * Update 'prev'/'next' arrows on sides
   * @param  {int} toPosition
   * @param  {int} fromPosition optional
   */
  redrawArrowsOnSides(toPosition = this.position, fromPosition = this.position) {
    // Do nothing with DOM if there is no reason to redraw arrows
    // 'cause their state changes only if toPosition or fromPosition is on side
    // TODO: Make a little test & benchmark it
    if (Math.min(fromPosition, toPosition) > 1 &&
      Math.max(fromPosition, toPosition) < this.slides.length) return;

    // Define conditions to show arrows
    const arrowsStates = [
      {
        name: 'prev',
        show: toPosition !== 1,
      },
      {
        name: 'next',
        show: toPosition !== this.slides.length,
      },
    ];
    arrowsStates.forEach(arrow => this.showArrows(arrow.name, arrow.show));
  }

  addPaginator(style) {
    this.paginator = addDOMElement(this.wrapper, 'div', ['rsslider__paginator']);
    this.paginatorElements = [];
    let num = 1;
    switch (style) {
      case ('numbers'):
        this.slides.forEach(() => {
          this.paginatorElements.push(addDOMElement(this.paginator, 'button', ['rsslider__paginator_numbered__button'], {}, num));
          num += 1;
        });
        break;
      default: // dots
        this.slides.forEach(() =>
          this.paginatorElements.push(addDOMElement(this.paginator, 'button', ['rsslider__paginator__button'])));
    }
    // Set event listeners to each paginator element
    this.paginatorElements.forEach((element, index) => {
      element.addEventListener('click', () => this.jump(index + 1));
    });
    this.updatePaginator();
  }

  /**
   * Redraws paginator
   * @param  {int} toPosition=this.position
   * @param  {int} fromPosition=this.position
   */
  updatePaginator(toPosition = this.position, fromPosition = this.position) {
    this.paginatorElements[fromPosition - 1].classList.remove('active');
    this.paginatorElements[toPosition - 1].classList.add('active');
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
    if (position < 1 || position > this.slides.length) {
      return; // error, no action
    } else if (position === this.position) {
      return; // TODO: Decide should we handle this excusively
    }

    const oldPosition = this.position;
    this.position = position;

    let direction = '';
    let step = 0;

    switch (this.config.style) {
      case 'slide-h':
        if (position !== oldPosition) {
          step = (position > oldPosition) ? 1 : -1;
          direction = (position > oldPosition) ? 'left' : 'right';
        }
        this.showSlide(oldPosition, false, direction);
        if (Math.abs(position - oldPosition) > 1) {
          for (let i = oldPosition + step; i !== position; i += step) {
            this.showSlide(i, true, direction);
            this.showSlide(i, false, direction);
          }
        }
        this.showSlide(position, true, direction);
        break;
      case 'slide-v':
        if (position !== oldPosition) {
          step = (position > oldPosition) ? 1 : -1;
          direction = (position > oldPosition) ? 'up' : 'down';
        }
        this.showSlide(oldPosition, false, direction);
        if (Math.abs(position - oldPosition) > 1) {
          for (let i = oldPosition + step; i !== position; i += step) {
            this.showSlide(i, true, direction);
            this.showSlide(i, false, direction);
          }
        }
        this.showSlide(position, true, direction);
        break;
      case 'fade':
      default:
        this.showSlide(oldPosition, false);
        this.showSlide(position, true);
    } // switch style

    // Update controls
    if (this.config.controls.arrows) this.redrawArrowsOnSides(position, oldPosition);
    if (this.config.controls.pagination && this.config.controls.pagination !== 'none') this.updatePaginator(position, oldPosition);
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
   * @param  {Int} position = this.position
   * @param  {Bool} state = true
   * @param  {String} direction = ''
   */
  showSlide(position = this.position, state = true, direction = '') {
    if (position < 1 || position > this.slides.length) {
      return;
    }

    let indirection = '';

    switch (this.config.style) {
      case 'slide-h':
        direction = (direction === 'right') ? 'right' : 'left'; // set left by default
        indirection = (direction === 'left') ? 'right' : 'left';
        if (state) {
          this.slides[position - 1].classList.remove(`hidden_${indirection}`);
        } else {
          this.slides[position - 1].classList.add(`hidden_${direction}`);
        }
        break;
      case 'slide-v':
        direction = (direction === 'down') ? 'down' : 'up'; // set up by default
        indirection = (direction === 'up') ? 'down' : 'up';
        if (state) {
          this.slides[position - 1].classList.remove(`hidden_${indirection}`);
        } else {
          this.slides[position - 1].classList.add(`hidden_${direction}`);
        }
        break;
      case 'fade':
      default:
        if (state) {
          this.slides[position - 1].classList.remove('hidden');
        } else {
          this.slides[position - 1].classList.add('hidden');
        }
    } // switch style
  }
}
