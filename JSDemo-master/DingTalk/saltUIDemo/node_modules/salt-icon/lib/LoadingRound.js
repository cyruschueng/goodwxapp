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

	var IconLoadingRound = function (_React$Component) {
	  _inherits(IconLoadingRound, _React$Component);

	  function IconLoadingRound() {
	    _classCallCheck(this, IconLoadingRound);

	    return _possibleConstructorReturn(this, (IconLoadingRound.__proto__ || Object.getPrototypeOf(IconLoadingRound)).apply(this, arguments));
	  }

	  _createClass(IconLoadingRound, [{
	    key: 'render',
	    value: function render() {
	      try {
	        var Svg = __webpack_require__(25);
	        return _react2.default.createElement(Svg, this.props);
	      } catch (e) {
	        console.error('cant\'t find svg: loading-round');
	        return null;
	      }
	    }
	  }]);

	  return IconLoadingRound;
	}(_react2.default.Component);

	IconLoadingRound.defaultProps = {
	  className: '',
	  name: '',
	  width: '32px',
	  height: '32px',
	  fill: '#000',
	  onClick: function onClick() {}
	};

	// http://facebook.github.io/react/docs/reusable-components.html
	IconLoadingRound.propTypes = {
	  className: _react2.default.PropTypes.string,
	  name: _react2.default.PropTypes.string.isRequired,
	  width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  height: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	  fill: _react2.default.PropTypes.string,
	  onClick: _react2.default.PropTypes.func
	};

	IconLoadingRound.displayName = 'IconLoadingRound';

	exports.default = IconLoadingRound;
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

/***/ 25:
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

	    displayName: "LoadingRound",

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
	                    _react2.default.createElement('path', { d: 'M840.397 755.712c3.072 0 5.632-2.662 5.632-5.99a5.786 5.786 0 0 0-5.632-5.94c-3.123 0-5.632 2.663-5.632 5.94 0 3.328 2.509 5.99 5.632 5.99zm-118.58 141.517c6.145 0 11.162-5.274 11.162-11.827a11.52 11.52 0 0 0-11.161-11.828 11.52 11.52 0 0 0-11.213 11.828c0 6.553 5.017 11.827 11.213 11.827zm-161.689 75.776a17.306 17.306 0 0 0 16.794-17.767c0-9.83-7.527-17.817-16.794-17.817a17.306 17.306 0 0 0-16.845 17.817c0 9.83 7.527 17.818 16.845 17.818zm-174.592-3.43a23.04 23.04 0 0 0 22.374-23.706 23.04 23.04 0 0 0-22.374-23.706 23.04 23.04 0 0 0-22.374 23.706 23.04 23.04 0 0 0 22.374 23.705zm-154.112-80.897c15.411 0 27.955-13.312 27.955-29.644 0-16.384-12.544-29.645-28.006-29.645-15.463 0-28.007 13.312-28.007 29.645 0 16.384 12.544 29.644 28.007 29.644zM126.31 747.008c18.535 0 33.588-15.974 33.588-35.635 0-19.661-15.053-35.584-33.588-35.584-18.585 0-33.638 15.923-33.638 35.584 0 19.66 15.053 35.635 33.638 35.635zM90.317 571.597c21.657 0 39.168-18.586 39.168-41.472 0-22.938-17.51-41.472-39.168-41.472-21.607 0-39.168 18.534-39.168 41.472 0 22.886 17.561 41.472 39.168 41.472zm39.782-174.131c24.781 0 44.8-21.248 44.8-47.463s-20.019-47.411-44.8-47.411c-24.73 0-44.8 21.197-44.8 47.411s20.07 47.463 44.8 47.463zm108.135-139.264c27.852 0 50.432-23.91 50.432-53.402 0-29.491-22.528-53.402-50.432-53.402-27.853 0-50.432 23.91-50.432 53.402 0 29.491 22.579 53.402 50.432 53.402zm156.108-77.312c30.925 0 55.962-26.522 55.962-59.29s-25.088-59.29-55.962-59.29c-30.924 0-56.012 26.573-56.012 59.29 0 32.768 25.088 59.29 56.012 59.29zm174.644.819c34.048 0 61.644-29.184 61.644-65.28 0-35.994-27.596-65.229-61.644-65.229-33.997 0-61.594 29.184-61.594 65.229s27.597 65.28 61.594 65.28zm160.358 79.616c37.12 0 67.174-31.847 67.174-71.168 0-39.22-30.054-71.117-67.174-71.117-37.069 0-67.174 31.898-67.174 71.168 0 39.27 30.105 71.168 67.174 71.168zm115.61 144.486c40.192 0 72.806-34.509 72.806-77.056 0-42.598-32.614-77.107-72.806-77.107s-72.756 34.509-72.756 77.107c0 42.547 32.564 77.056 72.756 77.056zm49.408 185.447c43.264 0 78.387-37.223 78.387-83.047 0-45.875-35.123-83.046-78.387-83.046-43.316 0-78.439 37.171-78.439 83.046 0 45.824 35.123 83.047 78.439 83.047z' })
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