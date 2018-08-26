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

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _default = require('../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* tslint:disable:jsx-no-multiline-js */
var noop = function noop() {};
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var InputItem = function (_React$Component) {
    (0, _inherits3['default'])(InputItem, _React$Component);

    function InputItem() {
        (0, _classCallCheck3['default'])(this, InputItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (InputItem.__proto__ || Object.getPrototypeOf(InputItem)).apply(this, arguments));

        _this.onChange = function (text) {
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                type = _this$props.type;

            var maxLength = _this.props.maxLength;
            switch (type) {
                case 'bankCard':
                    text = text.replace(/\D/g, '');
                    if (maxLength > 0) {
                        text = text.substring(0, maxLength);
                    }
                    text = text.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                    break;
                case 'phone':
                    text = text.replace(/\D/g, '');
                    if (maxLength > 0) {
                        text = text.substring(0, 11);
                    }
                    var valueLen = text.length;
                    if (valueLen > 3 && valueLen < 8) {
                        text = text.substr(0, 3) + ' ' + text.substr(3);
                    } else if (valueLen >= 8) {
                        text = text.substr(0, 3) + ' ' + text.substr(3, 4) + ' ' + text.substr(7);
                    }
                    break;
                case 'password':
                    break;
                default:
                    break;
            }
            if (onChange) {
                onChange(text);
            }
        };
        _this.onInputBlur = function () {
            if (_this.props.onBlur) {
                _this.props.onBlur(_this.props.value);
            }
        };
        _this.onInputFocus = function () {
            if (_this.props.onFocus) {
                _this.props.onFocus(_this.props.value);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(InputItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                value = _props.value,
                defaultValue = _props.defaultValue,
                type = _props.type,
                style = _props.style,
                clear = _props.clear,
                children = _props.children,
                error = _props.error,
                extra = _props.extra,
                last = _props.last,
                _props$onExtraClick = _props.onExtraClick,
                onExtraClick = _props$onExtraClick === undefined ? noop : _props$onExtraClick,
                _props$onErrorClick = _props.onErrorClick,
                onErrorClick = _props$onErrorClick === undefined ? noop : _props$onErrorClick,
                styles = _props.styles;

            var labelNumber = this.props.labelNumber;
            var valueProps = void 0;
            if ('value' in this.props) {
                valueProps = {
                    value: fixControlledValue(value)
                };
            } else {
                valueProps = {
                    defaultValue: defaultValue
                };
            }
            var containerStyle = {
                borderBottomWidth: last ? 0 : _reactNative.StyleSheet.hairlineWidth
            };
            var textStyle = {
                width: _default2['default'].font_size_heading * labelNumber * 1.05
            };
            var extraStyle = {
                width: typeof extra === 'string' && extra.length > 0 ? extra.length * _default2['default'].font_size_heading : 0
            };
            var restProps = (0, _omit2['default'])(this.props, ['type', 'clear', 'children', 'error', 'extra', 'labelNumber', 'last', 'onExtraClick', 'onErrorClick', 'styles']);
            var keyboardTypeArray = ['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search'];
            var keyboardType = 'default';
            if (type === 'number') {
                keyboardType = 'numeric';
            } else if (type === 'bankCard') {
                keyboardType = 'number-pad'; // 不带小数点
            } else if (type === 'phone') {
                keyboardType = 'phone-pad';
            } else if (type && keyboardTypeArray.indexOf(type) > -1) {
                keyboardType = type;
            }
            return _react2['default'].createElement(
                _reactNative.View,
                { style: [styles.container, containerStyle, style] },
                children ? typeof children === 'string' ? _react2['default'].createElement(
                    _reactNative.Text,
                    { style: [styles.text, textStyle] },
                    children
                ) : _react2['default'].createElement(
                    _reactNative.View,
                    { style: textStyle },
                    children
                ) : null,
                _react2['default'].createElement(_Input2['default'], (0, _extends3['default'])({ clearButtonMode: clear ? 'while-editing' : 'never', underlineColorAndroid: 'transparent' }, restProps, valueProps, { ref: 'inputWrap', style: [styles.input, error ? { color: '#f50' } : null], keyboardType: keyboardType, onChange: function onChange(event) {
                        return _this2.onChange(event.nativeEvent.text);
                    }, secureTextEntry: type === 'password', onBlur: this.onInputBlur, onFocus: this.onInputFocus })),
                extra ? _react2['default'].createElement(
                    _reactNative.TouchableWithoutFeedback,
                    { onPress: onExtraClick },
                    _react2['default'].createElement(
                        _reactNative.View,
                        null,
                        typeof extra === 'string' ? _react2['default'].createElement(
                            _reactNative.Text,
                            { style: [styles.extra, extraStyle] },
                            extra
                        ) : extra
                    )
                ) : null,
                error && _react2['default'].createElement(
                    _reactNative.TouchableWithoutFeedback,
                    { onPress: onErrorClick },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: [styles.errorIcon] },
                        _react2['default'].createElement(_reactNative.Image, { source: require('../style/images/error.png'), style: { width: _default2['default'].icon_size_xs, height: _default2['default'].icon_size_xs } })
                    )
                )
            );
        }
    }]);
    return InputItem;
}(_react2['default'].Component);

exports['default'] = InputItem;

InputItem.defaultProps = {
    type: 'text',
    editable: true,
    clear: false,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    extra: '',
    onExtraClick: noop,
    error: false,
    onErrorClick: noop,
    size: 'large',
    labelNumber: 4,
    labelPosition: 'left',
    textAlign: 'left',
    last: false,
    styles: _index2['default'],
    focused: false
};
module.exports = exports['default'];