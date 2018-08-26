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

var _reactNative = require('react-native');

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SegmentedControl = function (_React$Component) {
    (0, _inherits3['default'])(SegmentedControl, _React$Component);

    function SegmentedControl() {
        (0, _classCallCheck3['default'])(this, SegmentedControl);
        return (0, _possibleConstructorReturn3['default'])(this, (SegmentedControl.__proto__ || Object.getPrototypeOf(SegmentedControl)).apply(this, arguments));
    }

    (0, _createClass3['default'])(SegmentedControl, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                tintColor = _props.tintColor,
                selectedIndex = _props.selectedIndex,
                disabled = _props.disabled;

            var restProps = (0, _omit2['default'])(this.props, ['tintColor', 'disabled', 'selectedIndex']);
            return _react2['default'].createElement(_reactNative.SegmentedControlIOS, (0, _extends3['default'])({ tintColor: tintColor, selectedIndex: selectedIndex }, restProps, { enabled: !disabled }));
        }
    }]);
    return SegmentedControl;
}(_react2['default'].Component);

exports['default'] = SegmentedControl;

SegmentedControl.defaultProps = {
    tintColor: '#108ee9',
    selectedIndex: 0
};
module.exports = exports['default'];