import _typeof from 'babel-runtime/helpers/typeof';
import moment from 'moment';
function getFormatter(type) {
    var formatter = void 0;
    if (type === 'time') {
        formatter = 'HH:mm';
    } else if (type === 'datetime') {
        formatter = 'YYYY-MM-DD HH:mm';
    } else {
        formatter = 'YYYY-MM-DD';
    }
    return formatter;
}
export function formatFn(instance, value) {
    var format = instance.props.format;

    var type = typeof format === 'undefined' ? 'undefined' : _typeof(format);
    if (type === 'string') {
        return value.format(type);
    }
    if (type === 'function') {
        return format(value);
    }
    return value.format(getFormatter(instance.props.mode));
}
export function getProps() {
    return {
        mode: 'datetime',
        extra: '请选择',
        onChange: function onChange() {},

        title: ''
    };
}
export function getDefaultDate(props) {
    var defaultDate = props.defaultDate,
        minDate = props.minDate,
        maxDate = props.maxDate;

    if (defaultDate) {
        return defaultDate;
    }
    var now = moment();
    if (minDate && now.isBefore(minDate)) {
        return minDate;
    }
    if (maxDate && maxDate.isBefore(now)) {
        return minDate;
    }
    return now;
}