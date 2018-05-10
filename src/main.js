import Slider from './rs-slider';
import './styles/rs-slider.scss';

const sliderID = 'mySlider';
const sliderConfig = {
  controls: {
    // arrows: false, // true by default
    pagination: 'numbers', // ( 'dots' | 'numbers' | 'none' by default )
  },
  style: 'slide-h', // slide-v | slide-h | fade by default
};
const testSlider = new Slider(sliderID, sliderConfig);
// console.info(testSlider.config);
