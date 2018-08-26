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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Popup = require('rmc-date-picker/lib/Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _style = require('../picker/style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('./utils');

var _DatePicker = require('rmc-date-picker/lib/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _getLocale = require('../_util/getLocale');

var _zh_CN = require('./locale/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
                extra = props.extra,
                value = props.value,
                defaultDate = props.defaultDate,
                styles = props.styles;

            var extraProps = {
                extra: value ? (0, _utils.formatFn)(this, value) : extra
            };
            var locale = (0, _getLocale.getComponentLocale)(props, context, 'DatePicker', function () {
                return _zh_CN2['default'];
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
            var dataPicker = _react2['default'].createElement(_DatePicker2['default'], { minuteStep: props.minuteStep, locale: DatePickerLocale, mode: props.mode, minDate: props.minDate, maxDate: props.maxDate, defaultDate: value || (0, _utils.getDefaultDate)(this.props) });
            var newProps = (0, _extends3['default'])({}, props, { okText: okText,
                dismissText: dismissText });
            return _react2['default'].createElement(
                _Popup2['default'],
                (0, _extends3['default'])({ datePicker: dataPicker, styles: styles }, newProps, { date: value || (0, _utils.getDefaultDate)(this.props) }),
                _react2['default'].cloneElement(children, extraProps)
            );
        }
    }]);
    return DatePicker;
}(_react2['default'].Component);

exports['default'] = DatePicker;

DatePicker.defaultProps = (0, _extends3['default'])({ triggerType: 'onClick', styles: _style2['default'], minuteStep: 1 }, (0, _utils.getProps)());
DatePicker.contextTypes = {
    antLocale: _propTypes2['default'].object
};
module.exports = exports['default'];