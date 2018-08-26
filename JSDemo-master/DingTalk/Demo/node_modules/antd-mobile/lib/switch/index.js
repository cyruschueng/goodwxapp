'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AntmSwitch = function (_React$Component) {
    (0, _inherits3['default'])(AntmSwitch, _React$Component);

    function AntmSwitch() {
        (0, _classCallCheck3['default'])(this, AntmSwitch);
        return (0, _possibleConstructorReturn3['default'])(this, (AntmSwitch.__proto__ || Object.getPrototypeOf(AntmSwitch)).apply(this, arguments));
    }

    (0, _createClass3['default'])(AntmSwitch, [{
        key: 'onChange',
        value: function onChange(value) {
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                style = _props.style,
                disabled = _props.disabled,
                checked = _props.checked;

            return _react2['default'].createElement(_reactNative.Switch, { style: style, onValueChange: function onValueChange(value) {
                    _this2.onChange(value);
                }, value: checked, disabled: disabled });
        }
    }]);
    return AntmSwitch;
}(_react2['default'].Component);

exports['default'] = AntmSwitch;

AntmSwitch.defaultProps = {
    name: '',
    checked: false,
    disabled: false,
    onChange: function onChange() {}
};
module.exports = exports['default'];