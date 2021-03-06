/**
 * Adds an element to DOM
 * @param   {Node} wrapper
 * @param   {String} tag Tag for element
 * @param   {Array} classList List of classes
 * @param   {Object} attList List of attributes
 * @param   {String} value Inner HTML
 *
 * @returns {Node} DOM object
 */
export const addDOMElement = function addDOMElement(
  wrapper,
  tag = 'div',
  classList = [], // TODO: Check types
  attList = {}, // TODO: Check types
  value = '',
) {
  const DOMElement = document.createElement(tag);
  DOMElement.innerHTML = value;

  if (classList.length > 0) {
    classList.forEach(item => DOMElement.classList.add(item));
  }

  if (attList.length > 0) {
    Object.keys(attList).forEach(key => DOMElement.setAttribute(key, attList[key]));
  }
  wrapper.appendChild(DOMElement);
  return DOMElement;
};

/**
 * Unites two Objects
 * TODO: Switch to lodash?
 * @param  {Object} first Object (defaults)
 * @param  {Object} second Object (user)
 */
export const uniteObjects = function uniteObjects(first, second) {
  let result = Object.assign({}, first);
  result = Object.assign(result, second);

  Object.keys(result).forEach((key) => {
    if (first[key] instanceof Array && second[key] instanceof Array) {
      // concatenates and uniques array
      result[key] = [...new Set([...first[key], ...second[key]])];
    } else if (first[key] instanceof Object && second[key] instanceof Object) {
      result[key] = uniteObjects(first[key], second[key]);
    }
  });

  return result;
};
