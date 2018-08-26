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

	var IconStar = function (_React$Component) {
	  _inherits(IconStar, _React$Component);

	  function IconStar() {
	    _classCallCheck(this, IconStar);

	    return _possibleConstructorReturn(this, (IconStar.__proto__ || Object.getPrototypeOf(IconStar)).apply(this, arguments));
	  }

	  _createClass(IconStar, [{
	    key: 'render',
	    value: function render() {
	      try {
	        var Svg = __webpack_require__(41);
	        return _react2.default.createElement(Svg, this.props);
	      } catch (e) {
	        console.error('cant\'t find svg: star');
	        return null;
	      }
	    }
	  }]);

	  return IconStar;
	}(_react2.default.Component);

	IconStar.defaultProps = {
	  className: '',
	  name: '',
	  width: '32px',
	  height: '32px',
	  fill: '#000',
	  onClick: function onClick() {}
	};

	// http://facebook.github.io/react/docs/reusable-components.html
	IconStar.propTypes = {
	  className: _react2.default.PropTypes.string,
	  name: _react2.default.PropTypes.string.isRequired,
	  width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  height: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  fill: _react2.default.PropTypes.string,
	  onClick: _react2.default.PropTypes.func
	};

	IconStar.displayName = 'IconStar';

	exports.default = IconStar;
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

/***/ 41:
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

	    displayName: "Star",

	    getDefaultProps: function getDefaultProps() {
	        return { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 1024 1024" };
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
	                    _react2.default.createElement('path', { d: 'M809.6 422.4l-198.4-19.2-70.4-172.8c0-3.2-3.2-3.2-3.2-6.4s-3.2-6.4-6.4-6.4c-3.2-3.2-3.2-6.4-6.4-6.4-3.2-3.2-6.4-3.2-9.6-3.2-9.6 0-16 3.2-19.2 6.4-3.2 6.4-9.6 9.6-9.6 19.2l-73.6 172.8-198.4 19.2c-3.2 0-9.6 3.2-12.8 6.4-6.4 3.2-9.6 6.4-9.6 12.8s0 12.8 3.2 19.2c3.2 6.4 6.4 9.6 12.8 16l6.4 6.4 16 12.8c9.6 6.4 16 12.8 25.6 19.2l25.6 22.4c19.2 16 41.6 38.4 67.2 57.6L326.4 688c-3.2 12.8-6.4 22.4-9.6 35.2-3.2 9.6-6.4 22.4-6.4 32-3.2 9.6-3.2 16-6.4 22.4l-3.2 12.8v12.8c3.2 3.2 3.2 6.4 6.4 9.6 3.2 3.2 6.4 3.2 12.8 6.4h3.2c3.2 0 6.4 0 9.6-3.2 3.2 0 6.4-3.2 12.8-6.4s12.8-6.4 22.4-12.8c9.6-6.4 19.2-9.6 28.8-16 9.6-6.4 22.4-12.8 32-19.2 25.6-12.8 51.2-28.8 83.2-48l166.4 99.2 9.6 3.2c3.2 0 6.4 3.2 9.6 3.2 6.4 0 12.8 0 16-3.2 6.4-3.2 6.4-9.6 6.4-16 0-3.2 0-6.4-3.2-12.8l-6.4-25.6c-3.2-9.6-3.2-19.2-6.4-32s-3.2-22.4-6.4-35.2c-6.4-28.8-12.8-57.6-19.2-92.8L809.6 480c6.4-6.4 9.6-12.8 12.8-16 3.2-3.2 6.4-9.6 6.4-16s-3.2-9.6-6.4-12.8c0-6.4-6.4-9.6-12.8-12.8z' })
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