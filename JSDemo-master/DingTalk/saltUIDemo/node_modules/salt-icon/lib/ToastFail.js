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

	var IconToastFail = function (_React$Component) {
	  _inherits(IconToastFail, _React$Component);

	  function IconToastFail() {
	    _classCallCheck(this, IconToastFail);

	    return _possibleConstructorReturn(this, (IconToastFail.__proto__ || Object.getPrototypeOf(IconToastFail)).apply(this, arguments));
	  }

	  _createClass(IconToastFail, [{
	    key: 'render',
	    value: function render() {
	      try {
	        var Svg = __webpack_require__(47);
	        return _react2.default.createElement(Svg, this.props);
	      } catch (e) {
	        console.error('cant\'t find svg: toast-fail');
	        return null;
	      }
	    }
	  }]);

	  return IconToastFail;
	}(_react2.default.Component);

	IconToastFail.defaultProps = {
	  className: '',
	  name: '',
	  width: '32px',
	  height: '32px',
	  fill: '#000',
	  onClick: function onClick() {}
	};

	// http://facebook.github.io/react/docs/reusable-components.html
	IconToastFail.propTypes = {
	  className: _react2.default.PropTypes.string,
	  name: _react2.default.PropTypes.string.isRequired,
	  width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  height: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  fill: _react2.default.PropTypes.string,
	  onClick: _react2.default.PropTypes.func
	};

	IconToastFail.displayName = 'IconToastFail';

	exports.default = IconToastFail;
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

/***/ 47:
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

	    displayName: "ToastFail",

	    getDefaultProps: function getDefaultProps() {
	        return { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 108.364 108.364" };
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
	                    _react2.default.createElement('path', { d: 'M54.182 0C24.258 0 0 24.258 0 54.182c0 29.924 24.258 54.183 54.182 54.183 29.923 0 54.182-24.259 54.182-54.183S84.105 0 54.182 0zm14.531 33.622a6.202 6.202 0 1 1-.002 12.404 6.202 6.202 0 0 1 .002-12.404zm-28.119 0a6.202 6.202 0 1 1-.003 12.403 6.202 6.202 0 0 1 .003-12.403zm36.013 45.476a2.997 2.997 0 0 1-3.944-1.562c-2.894-6.689-9.731-11.012-17.421-11.012-7.868 0-14.747 4.32-17.523 11.005a3.002 3.002 0 0 1-3.921 1.621 3.002 3.002 0 0 1-1.62-3.922c3.71-8.932 12.764-14.703 23.064-14.703 10.084 0 19.084 5.742 22.928 14.63a3 3 0 0 1-1.563 3.943z' })
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