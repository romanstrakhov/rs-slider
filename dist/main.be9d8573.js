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
})({8:[function(require,module,exports) {
'use strict';

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
var addDOMElement = exports.addDOMElement = function addDOMElement(wrapper) {
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

  wrapper.appendChild(DOMElement);

  return DOMElement;
};
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = exports.Slider = function () {
  function Slider(id) {
    _classCallCheck(this, Slider);

    this.slides = []; // list of all slider slides as DOM objects
    this.position = 1;

    this.wrapper = document.getElementById(id);

    // Add images from HTML markup
    this.wrapper.querySelectorAll('.rsslider__item').forEach(function (element) {
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


  _createClass(Slider, [{
    key: 'addArrows',
    value: function addArrows() {
      var _this = this;

      this.arrows = {};

      this.arrows['prev'] = (0, _helpers.addDOMElement)(this.wrapper, 'button', ['rsslider__prev']);
      this.arrows['next'] = (0, _helpers.addDOMElement)(this.wrapper, 'button', ['rsslider__next']);
      this.updateArrows();

      // Set event listeners
      this.arrows['prev'].addEventListener('click', function () {
        return _this.move(-1);
      });
      this.arrows['next'].addEventListener('click', function () {
        return _this.move(1);
      });
    }

    /**
     * Update 'prev'/'next' arrows on sides
     * @param  {int} toPosition 
     * @param  {int} fromPosition optional
     */

  }, {
    key: 'updateArrows',
    value: function updateArrows() {
      var toPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var fromPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;


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
  }, {
    key: 'addPaginator',
    value: function addPaginator() {
      var _this2 = this;

      this.paginator = (0, _helpers.addDOMElement)(this.wrapper, 'div', ['rsslider__paginator']);
      this.paginatorElements = [];

      this.slides.forEach(function () {
        return _this2.paginatorElements.push((0, _helpers.addDOMElement)(_this2.paginator, 'button', ['rsslider__paginator__button']));
      });

      // Set event listeners to each paginator element

      this.paginatorElements.forEach(function (element, index) {
        element.addEventListener('click', function () {
          return _this2.jump(index + 1);
        });
      });

      this.updatePaginator();
    }
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
        return false; // error, no action
      } else if (position === this.position) {
        return false; // TODO: Decide should we handle this excusively
      }

      var oldPosition = this.position;

      this.showSlide(oldPosition, false); // Note: this.position may be out of range!
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
     * @param  {} position=this.position
     * @param  {} state=true
     */

  }, {
    key: 'showSlide',
    value: function showSlide() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      if (position < 1 || position > this.slides.length) {
        return false;
      }

      if (state) {
        this.slides[position - 1].classList.remove('hidden');
      } else {
        this.slides[position - 1].classList.add('hidden');
      }
    }
  }]);

  return Slider;
}();
},{"./helpers.js":8}],11:[function(require,module,exports) {
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
},{}],7:[function(require,module,exports) {
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
},{"./bundle-url":11}],6:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../img/prev.png":[["prev.343a05d8.png",9],9],"./../img/next.png":[["next.9e3d13ce.png",10],10],"_css_loader":7}],4:[function(require,module,exports) {
'use strict';

var _rsSlider = require('./rs-slider');

require('./styles/rs-slider.scss');

var sliderID = 'mySlider';
var testSlider = new _rsSlider.Slider(sliderID);
},{"./rs-slider":5,"./styles/rs-slider.scss":6}],16:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62390' + '/');
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
},{}]},{},[16,4])
//# sourceMappingURL=/main.be9d8573.map