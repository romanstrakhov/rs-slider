"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Adds an element to DOM
 * @param   {Node} wrapper 
 * @param   {String} tag Tag for element
 * @param   {Array} classList List of classes
 * @param   {Object} attList List of attributes
 *
 * @returns {Node} DOM object
 */
var addDOMElement = function addDOMElement(wrapper) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var classList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var attList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


  var DOMElement = document.createElement(tag);

  // TODO: Проверить classList и attList на типы!

  if (classList.length > 0) {
    classList.forEach(function (item) {
      return DOMElement.classList.add(item);
    });
  }

  if (attList.length > 0) {
    Object.keys(attList).forEach(function (key) {
      return DOMElement.setAttribute(key, attList[key]);
    });
  }

  // if (wrapper instanceof )
  console.log("wrapper:");
  console.info(wrapper);

  wrapper.appendChild(DOMElement);

  return DOMElement;
};

exports.default = { addDOMElement: addDOMElement };