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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Popup = require('rmc-date-picker/lib/Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _DatePicker = require('rmc-date-picker/lib/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _utils = require('./utils');

var _getLocale = require('../_util/getLocale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getDefaultProps() {
    return (0, _extends3['default'])({ prefixCls: 'am-picker', pickerPrefixCls: 'am-picker-col', popupPrefixCls: 'am-picker-popup', minuteStep: 1 }, (0, _utils.getProps)());
}

var DatePicker = function (_React$Component) {
    (0, _inherits3['default'])(DatePicker, _React$Component);

    function DatePicker() {
        (0, _classCallCheck3['default'])(this, DatePicker);
        return (0, _possibleConstructorReturn3['default'])(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
    }

    (0, _createClass3['default'])(DatePicker, [{
        key: 'render',
        value: function render() {
            var props = this.props,
                context = this.context;
            var children = props.children,
                value = props.value,
                defaultDate = props.defaultDate,
                extra = props.extra,
                popupPrefixCls = props.popupPrefixCls;

            var locale = (0, _getLocale.getComponentLocale)(props, context, 'DatePicker', function () {
                return require('./locale/zh_CN');
            });
            var localeCode = (0, _getLocale.getLocaleCode)(context);
            var okText = locale.okText,
                dismissText = locale.dismissText,
                DatePickerLocale = locale.DatePickerLocale;

            if (localeCode) {
                if (value) {
                    value.locale(localeCode);
                }
                if (defaultDate) {
                    defaultDate.locale(localeCode);
                }
            }
            var dataPicker = _react2['default'].createElement(_DatePicker2['default'], { minuteStep: props.minuteStep, locale: DatePickerLocale, minDate: props.minDate, maxDate: props.maxDate, mode: props.mode, pickerPrefixCls: props.pickerPrefixCls, prefixCls: props.prefixCls, defaultDate: value || (0, _utils.getDefaultDate)(this.props) });
            return _react2['default'].createElement(
                _Popup2['default'],
                (0, _extends3['default'])({ datePicker: dataPicker, WrapComponent: 'div', transitionName: 'am-slide-up', maskTransitionName: 'am-fade' }, props, { prefixCls: popupPrefixCls, date: value || (0, _utils.getDefaultDate)(this.props), dismissText: dismissText, okText: okText }),
                children && _react2['default'].cloneElement(children, { extra: value ? (0, _utils.formatFn)(this, value) : extra })
            );
        }
    }]);
    return DatePicker;
}(_react2['default'].Component);

exports['default'] = DatePicker;

DatePicker.defaultProps = getDefaultProps();
DatePicker.contextTypes = {
    antLocale: _propTypes2['default'].object
};
module.exports = exports['default'];