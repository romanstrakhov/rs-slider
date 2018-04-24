/**
 * Adds an element to DOM
 * @param   {Node} wrapper 
 * @param   {String} tag Tag for element
 * @param   {Array} classList List of classes
 * @param   {Object} attList List of attributes
 *
 * @returns {Node} DOM object
 */
export let addDOMElement = function( wrapper, tag='div', classList=[], attList={} ) {
    
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

};