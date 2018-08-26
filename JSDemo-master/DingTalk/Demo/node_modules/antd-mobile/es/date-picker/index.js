import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import PopupDatePicker from 'rmc-date-picker/es/Popup';
import PickerStyles from '../picker/style';
import { formatFn, getProps as getDefaultProps, getDefaultDate } from './utils';
import RCDatePicker from 'rmc-date-picker/es/DatePicker';
import { getComponentLocale, getLocaleCode } from '../_util/getLocale';
import zh_CN from './locale/zh_CN';

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
                extra = props.extra,
                value = props.value,
                defaultDate = props.defaultDate,
                styles = props.styles;

            var extraProps = {
                extra: value ? formatFn(this, value) : extra
            };
            var locale = getComponentLocale(props, context, 'DatePicker', function () {
                return zh_CN;
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
            var dataPicker = React.createElement(RCDatePicker, { minuteStep: props.minuteStep, locale: DatePickerLocale, mode: props.mode, minDate: props.minDate, maxDate: props.maxDate, defaultDate: value || getDefaultDate(this.props) });
            var newProps = _extends({}, props, { okText: okText,
                dismissText: dismissText });
            return React.createElement(
                PopupDatePicker,
                _extends({ datePicker: dataPicker, styles: styles }, newProps, { date: value || getDefaultDate(this.props) }),
                React.cloneElement(children, extraProps)
            );
        }
    }]);

    return DatePicker;
}(React.Component);

export default DatePicker;

DatePicker.defaultProps = _extends({ triggerType: 'onClick', styles: PickerStyles, minuteStep: 1 }, getDefaultProps());
DatePicker.contextTypes = {
    antLocale: PropTypes.object
};