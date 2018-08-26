module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IconFieldRequired = function (_React$Component) {
	  _inherits(IconFieldRequired, _React$Component);

	  function IconFieldRequired() {
	    _classCallCheck(this, IconFieldRequired);

	    return _possibleConstructorReturn(this, (IconFieldRequired.__proto__ || Object.getPrototypeOf(IconFieldRequired)).apply(this, arguments));
	  }

	  _createClass(IconFieldRequired, [{
	    key: 'render',
	    value: function render() {
	      try {
	        var Svg = __webpack_require__(21);
	        return _react2.default.createElement(Svg, this.props);
	      } catch (e) {
	        console.error('cant\'t find svg: field-required');
	        return null;
	      }
	    }
	  }]);

	  return IconFieldRequired;
	}(_react2.default.Component);

	IconFieldRequired.defaultProps = {
	  className: '',
	  name: '',
	  width: '32px',
	  height: '32px',
	  fill: '#000',
	  onClick: function onClick() {}
	};

	// http://facebook.github.io/react/docs/reusable-components.html
	IconFieldRequired.propTypes = {
	  className: _react2.default.PropTypes.string,
	  name: _react2.default.PropTypes.string.isRequired,
	  width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  height: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  fill: _react2.default.PropTypes.string,
	  onClick: _react2.default.PropTypes.func
	};

	IconFieldRequired.displayName = 'IconFieldRequired';

	exports.default = IconFieldRequired;
	module.exports = exports['default'];

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = require("classnames");

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(2);

	var _classnames3 = _interopRequireDefault(_classnames2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var webkitUA = /\bAppleWebKit\/(\d+)\b/;

	module.exports = _react2.default.createClass({

	    displayName: "FieldRequired",

	    getDefaultProps: function getDefaultProps() {
	        return { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 200 200" };
	    },
	    render: function render() {
	        var _props = this.props,
	            onClick = _props.onClick,
	            className = _props.className,
	            others = _objectWithoutProperties(_props, ['onClick', 'className']);

	        return _react2.default.createElement(
	            'div',
	            {
	                onClick: onClick,
	                style: {
	                    display: 'inline-block',
	                    lineHeight: 0
	                },
	                className: (0, _classnames3.default)('t-icon t-svg', _defineProperty({}, className, !!className))
	            },
	            _react2.default.createElement(
	                'div',
	                { style: { position: 'relative' } },
	                _react2.default.createElement(
	                    'svg',
	                    others,
	                    _react2.default.createElement('path', { d: 'M141.362 86.037L104.838 100l36.512 13.963c9.3 3.587 14.675 6.45 16.113 8.6 1.425 2.15 2.15 4.3 2.15 6.45 0 5.737-1.088 8.962-3.263 9.662a20.358 20.358 0 0 1-6.5 1.075c-2.187 0-4.35-.538-6.512-1.613-2.175-1.075-4.7-2.687-7.588-4.837l-33.587-30.075 7.6 45.112c.712 2.15 1.075 4.125 1.075 5.913v3.762c0 4.3-1.075 7.35-3.25 9.125-2.175 1.8-4.7 2.688-7.588 2.688-2.212 0-4.6-.713-7.187-2.15-2.588-1.425-3.863-4.65-3.863-9.663 0-1.425.188-2.862.55-4.3.375-1.425.55-3.225.55-5.375l8.825-45.112L64.65 133.3a121.392 121.392 0 0 1-7.187 4.3c-2.588 1.437-4.963 2.15-7.163 2.15-2.212 0-4.412-.713-6.625-2.15-2.212-1.425-3.312-4.3-3.312-8.6 0-2.863 1.075-5.375 3.225-7.525s7.15-4.65 15.037-7.525L95.175 100 58.65 86.037c-5.012-2.15-9.312-4.112-12.887-5.912-3.588-1.788-5.375-4.838-5.375-9.125 0-3.575 1.075-6.263 3.237-8.063 2.175-1.775 4.325-2.687 6.513-2.687 2.162 0 4.512.537 7.05 1.612 2.512 1.075 4.862 2.688 7.05 4.838l33.6 30.075-7.588-45.113c0-2.15-.187-3.925-.55-5.375a16.822 16.822 0 0 1-.537-4.3c0-2.862 1.075-5.537 3.25-8.062 2.175-2.488 4.712-3.75 7.587-3.75 4.425 0 7.338 1.437 8.838 4.3 1.462 2.862 2.212 5.375 2.212 7.525v4.837c0 1.8-.375 3.4-1.112 4.838l-8.825 45.1L135.325 66.7c2.938-2.863 5.5-4.65 7.725-5.375 2.213-.713 4.413-1.075 6.625-1.075 2.938 0 5.325 1.075 7.163 3.225s2.787 4.662 2.787 7.525c0 2.862-.725 5.2-2.15 6.987-1.45 1.788-6.812 4.475-16.112 8.05z' })
	                ),
	                _react2.default.createElement('div', {
	                    style: {
	                        position: 'absolute',
	                        top: 0,
	                        left: 0,
	                        width: '100%',
	                        height: '100%'
	                    },
	                    className: 't-icon-mask'
	                })
	            )
	        );
	    }
	});

/***/ })

/******/ });