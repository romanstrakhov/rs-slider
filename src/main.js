import { Slider } from './rs-slider';
import './styles/rs-slider.scss';

var sliderID = 'mySlider';
var sliderConfig = {
  controls: {
    // arrows: false, // true by default
    pagination: 'numbers', // ( 'dots' | 'numbers' | 'none' by default ) 
  },
  style: 'fade' // slide-v | slide-h | fade by default 
};
var testSlider = new Slider(sliderID, sliderConfig);
console.info(testSlider.config);
