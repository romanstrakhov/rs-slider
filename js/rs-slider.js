
function Slider ( sliderID, sliderImages ) { // class constructor

  this.id = sliderID;
  this.images = sliderImages;

  let placeholder = document.getElementById(this.id);
  console.log(placeholder);
  // console.info(arguments)

  placeholder.innerHTML = `Script for ${this.id} is loaded.`;


} 