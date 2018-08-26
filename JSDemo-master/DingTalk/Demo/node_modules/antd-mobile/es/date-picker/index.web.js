import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import PropTypes from 'prop-types';
import PopupDatePicker from 'rmc-date-picker/es/Popup';
import RCDatePicker from 'rmc-date-picker/es/DatePicker';
import { formatFn, getProps, getDefaultDate } from './utils';
import { getComponentLocale, getLocaleCode } from '../_util/getLocale';
function getDefaultProps() {
    return _extends({ prefixCls: 'am-picker', pickerPrefixCls: 'am-picker-col', popupPrefixCls: 'am-picker-popup', minuteStep: 1 }, getProps());
}

var DatePicker = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker() {
        _classCallCheck(this, DatePicker);

        return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
    }

    _createClass(DatePicker, [{
        key: 'render',
        value: function render() {
            var props = this.props,
                context = this.context;
            var children = props.children,
                value = props.value,
                defaultDate = props.defaultDate,
                extra = props.extra,
                popupPrefixCls = props.popupPrefixCls;

            var locale = getComponentLocale(props, context, 'DatePicker', function () {
                return require('./locale/zh_CN');
            });
            var localeCode = getLocaleCode(context);
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
            var dataPicker = React.createElement(RCDatePicker, { minuteStep: props.minuteStep, locale: DatePickerLocale, minDate: props.minDate, maxDate: props.maxDate, mode: props.mode, pickerPrefixCls: props.pickerPrefixCls, prefixCls: props.prefixCls, defaultDate: value || getDefaultDate(this.props) });
            return React.createElement(
                PopupDatePicker,
                _extends({ datePicker: dataPicker, WrapComponent: 'div', transitionName: 'am-slide-up', maskTransitionName: 'am-fade' }, props, { prefixCls: popupPrefixCls, date: value || getDefaultDate(this.props), dismissText: dismissText, okText: okText }),
                children && React.cloneElement(children, { extra: value ? formatFn(this, value) : extra })
            );
        }
    }]);

    return DatePicker;
}(React.Component);

export default DatePicker;

DatePicker.defaultProps = getDefaultProps();
DatePicker.contextTypes = {
    antLocale: PropTypes.object
};