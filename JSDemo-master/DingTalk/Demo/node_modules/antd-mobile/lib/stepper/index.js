'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('rc-input-number/lib');

var _lib2 = _interopRequireDefault(_lib);

var _styles = require('rc-input-number/lib/styles');

var _styles2 = _interopRequireDefault(_styles);

var _reactNative = require('react-native');

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Stepper = function (_React$Component) {
    (0, _inherits3['default'])(Stepper, _React$Component);

    function Stepper() {
        (0, _classCallCheck3['default'])(this, Stepper);
        return (0, _possibleConstructorReturn3['default'])(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Stepper, [{
        key: 'render',
        value: function render() {
            var inputAndroidStyle = _reactNative.Platform.OS === 'android' ? {
                top: 6,
                paddingTop: 0,
                height: 26
            } : {};
            var inputStyle = (0, _extends3['default'])({}, inputAndroidStyle, this.props.inputStyle);
            var restProps = (0, _omit2['default'])(this.props, ['inputStyle']);
            return _react2['default'].createElement(_lib2['default'], (0, _extends3['default'])({}, restProps, { inputStyle: inputStyle }));
        }
    }]);
    return Stepper;
}(_react2['default'].Component);

exports['default'] = Stepper;

Stepper.defaultProps = {
    step: 1,
    readOnly: false,
    disabled: false,
    styles: _styles2['default'],
    inputStyle: {}
};
module.exports = exports['default'];