// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
var addDOMElement = exports.addDOMElement = function addDOMElement(wrapper) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var classList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var attList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var value = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  var DOMElement = document.createElement(tag);
  DOMElement.innerHTML = value;

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
  wrapper.appendChild(DOMElement);
  return DOMElement;
};

/**
 * Unites two Objects
 * TODO: Switch to lodash?
 * @param  {Object} first Object (defaults)
 * @param  {Object} second Object (user)
 */
var uniteObjects = exports.uniteObjects = function uniteObjects(first, second) {
  var result = Object.assign({}, first);
  result = Object.assign(result, second);

  Object.keys(result).forEach(function (key) {
    if (first[key] instanceof Array && second[key] instanceof Array) {
      // concatenates and uniques array
      result[key] = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(first[key]), _toConsumableArray(second[key])))));
    } else if (first[key] instanceof Object && second[key] instanceof Object) {
      result[key] = uniteObjects(first[key], second[key]);
    }
  });

  return result;
};
},{}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
  function Slider(id) {
    var _this = this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Slider);

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

    this.wrapper.classList.add('rsslider_style_' + this.config.style);

    // Add slides from HTML markup
    this.wrapper.querySelectorAll('.rsslider__item').forEach(function (element) {
      switch (_this.config.style) {
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
      _this.slides.push(element);
    }, this);

    if (this.config.controls.arrows === true) this.addArrows();
    if (this.config.controls.pagination) this.addPaginator(this.config.controls.pagination);
    this.showSlide(this.position);
  }

  // Methods

  _createClass(Slider, [{
    key: 'parseConfig',
    value: function parseConfig(config) {
      // Defaults
      var defaults = {
        controls: {
          arrows: true,
          pagination: 'dots'
        },
        style: 'fade'
      };
      if (config) {
        this.config = (0, _helpers.uniteObjects)(defaults, config);
      }
    }

    /**
     * Add 'prev' and 'next' arrows
     */

  }, {
    key: 'addArrows',
    value: function addArrows() {
      var _this2 = this;

      this.arrows = {};
      this.arrows.prev = (0, _helpers.addDOMElement)(this.wrapper, 'button', ['rsslider__prev']);
      this.arrows.next = (0, _helpers.addDOMElement)(this.wrapper, 'button', ['rsslider__next']);
      this.redrawArrowsOnSides();
      // Set event listeners
      this.arrows.prev.addEventListener('click', function () {
        return _this2.move(-1);
      });
      this.arrows.next.addEventListener('click', function () {
        return _this2.move(1);
      });
    }

    /**
     * Update 'prev'/'next' arrows on sides
     * @param  {int} toPosition
     * @param  {int} fromPosition optional
     */

  }, {
    key: 'redrawArrowsOnSides',
    value: function redrawArrowsOnSides() {
      var _this3 = this;

      var toPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var fromPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;

      // Do nothing with DOM if there is no reason to redraw arrows
      // 'cause their state changes only if toPosition or fromPosition is on side
      // TODO: Make a little test & benchmark it
      if (Math.min(fromPosition, toPosition) > 1 && Math.max(fromPosition, toPosition) < this.slides.length) return;

      // Define conditions to show arrows
      var arrowsStates = [{
        name: 'prev',
        show: toPosition !== 1
      }, {
        name: 'next',
        show: toPosition !== this.slides.length
      }];
      arrowsStates.forEach(function (arrow) {
        return _this3.showArrows(arrow.name, arrow.show);
      });
    }
  }, {
    key: 'addPaginator',
    value: function addPaginator(style) {
      var _this4 = this;

      this.paginator = (0, _helpers.addDOMElement)(this.wrapper, 'div', ['rsslider__paginator']);
      this.paginatorElements = [];
      var num = 1;
      switch (style) {
        case 'numbers':
          this.slides.forEach(function () {
            _this4.paginatorElements.push((0, _helpers.addDOMElement)(_this4.paginator, 'button', ['rsslider__paginator_numbered__button'], {}, num));
            num += 1;
          });
          break;
        default:
          // dots
          this.slides.forEach(function () {
            return _this4.paginatorElements.push((0, _helpers.addDOMElement)(_this4.paginator, 'button', ['rsslider__paginator__button']));
          });
      }
      // Set event listeners to each paginator element
      this.paginatorElements.forEach(function (element, index) {
        element.addEventListener('click', function () {
          return _this4.jump(index + 1);
        });
      });
      this.updatePaginator();
    }

    /**
     * Redraws paginator
     * @param  {int} toPosition=this.position
     * @param  {int} fromPosition=this.position
     */

  }, {
    key: 'updatePaginator',
    value: function updatePaginator() {
      var toPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var fromPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;

      this.paginatorElements[fromPosition - 1].classList.remove('active');
      this.paginatorElements[toPosition - 1].classList.add('active');
    }
  }, {
    key: 'move',
    value: function move(delta) {
      this.setPosition(this.position + delta);
    }
  }, {
    key: 'jump',
    value: function jump(position) {
      this.setPosition(position);
    }

    /**
     * Set new position of slider, update all controls depending on initial and target position
     * @param  {int} position
     */

  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      if (position < 1 || position > this.slides.length) {
        return; // error, no action
      } else if (position === this.position) {
        return; // TODO: Decide should we handle this excusively
      }

      var oldPosition = this.position;
      this.position = position;

      var direction = '';
      var step = 0;

      switch (this.config.style) {
        case 'slide-h':
          if (position !== oldPosition) {
            step = position > oldPosition ? 1 : -1;
            direction = position > oldPosition ? 'left' : 'right';
          }
          this.showSlide(oldPosition, false, direction);
          if (Math.abs(position - oldPosition) > 1) {
            for (var i = oldPosition + step; i !== position; i += step) {
              this.showSlide(i, true, direction);
              this.showSlide(i, false, direction);
            }
          }
          this.showSlide(position, true, direction);
          break;
        case 'slide-v':
          if (position !== oldPosition) {
            step = position > oldPosition ? 1 : -1;
            direction = position > oldPosition ? 'up' : 'down';
          }
          this.showSlide(oldPosition, false, direction);
          if (Math.abs(position - oldPosition) > 1) {
            for (var _i = oldPosition + step; _i !== position; _i += step) {
              this.showSlide(_i, true, direction);
              this.showSlide(_i, false, direction);
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

  }, {
    key: 'showArrows',
    value: function showArrows(button, show) {
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
     * @param  {String} dir = ''
     */

  }, {
    key: 'showSlide',
    value: function showSlide() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (position < 1 || position > this.slides.length) {
        return;
      }

      var direction = dir;
      var indirection = '';

      switch (this.config.style) {
        case 'slide-h':
          direction = direction === 'right' ? 'right' : 'left'; // set left by default
          indirection = direction === 'left' ? 'right' : 'left';
          if (state) {
            this.slides[position - 1].classList.remove('hidden_' + indirection);
          } else {
            this.slides[position - 1].classList.add('hidden_' + direction);
          }
          break;
        case 'slide-v':
          direction = direction === 'down' ? 'down' : 'up'; // set up by default
          indirection = direction === 'up' ? 'down' : 'up';
          if (state) {
            this.slides[position - 1].classList.remove('hidden_' + indirection);
          } else {
            this.slides[position - 1].classList.add('hidden_' + direction);
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
  }]);

  return Slider;
}();

exports.default = Slider;
},{"./helpers":6}],9:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],5:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":9}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../img/prev.png":[["prev.343a05d8.png",6],6],"./../img/next.png":[["next.9e3d13ce.png",7],7],"_css_loader":5}],2:[function(require,module,exports) {
'use strict';

var _rsSlider = require('./rs-slider');

require('./styles/rs-slider.scss');

var sliderID = 'mySlider';
var sliderConfig = {
  controls: {
    // arrows: false, // true by default
    pagination: 'numbers' // ( 'dots' | 'numbers' | 'none' by default )
  },
  style: 'slide-h' // slide-v | slide-h | fade by default
};
var testSlider = new _rsSlider.Slider(sliderID, sliderConfig);
// console.info(testSlider.config);
},{"./rs-slider":3,"./styles/rs-slider.scss":4}],18:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53996' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[18,2])
//# sourceMappingURL=/main.be9d8573.map