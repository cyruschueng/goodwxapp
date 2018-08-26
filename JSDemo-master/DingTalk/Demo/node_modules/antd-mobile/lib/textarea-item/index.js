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

var _default = require('../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
} /* tslint:disable:jsx-no-multiline-js */

var TextAreaItem = function (_React$Component) {
    (0, _inherits3['default'])(TextAreaItem, _React$Component);

    function TextAreaItem(props) {
        (0, _classCallCheck3['default'])(this, TextAreaItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TextAreaItem.__proto__ || Object.getPrototypeOf(TextAreaItem)).call(this, props));

        _this.onChange = function (event) {
            var text = event.nativeEvent.text;
            var height = void 0;
            var _this$props = _this.props,
                autoHeight = _this$props.autoHeight,
                onChange = _this$props.onChange;

            var rows = _this.props.rows;
            if (autoHeight) {
                height = event.nativeEvent.contentSize.height;
            } else if (rows > 1) {
                height = 6 * rows * 4;
            } else {
                height = _default2['default'].list_item_height;
            }
            _this.setState({
                inputCount: text.length,
                height: height
            });
            if (onChange) {
                onChange(text);
            }
        };
        _this.state = {
            inputCount: 0,
            height: props.rows > 1 ? 6 * props.rows * 4 : _default2['default'].list_item_height
        };
        return _this;
    }

    (0, _createClass3['default'])(TextAreaItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var inputCount = this.state.inputCount;
            var _props = this.props,
                value = _props.value,
                defaultValue = _props.defaultValue,
                error = _props.error,
                clear = _props.clear,
                autoHeight = _props.autoHeight,
                last = _props.last,
                onErrorClick = _props.onErrorClick,
                style = _props.style;

            var styles = this.props.styles;
            var rows = this.props.rows;
            var count = this.props.count;
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
                borderBottomWidth: last ? 0 : _default2['default'].border_width_sm
            };
            var textareaStyle = {
                color: error ? '#f50' : _default2['default'].color_text_base,
                paddingRight: error ? 2 * _default2['default'].h_spacing_lg : 0
            };
            var maxLength = count > 0 ? count : undefined;
            var restProps = (0, _omit2['default'])(this.props, ['rows', 'error', 'clear', 'count', 'autoHeight', 'last', 'onErrorClick', 'styles', 'style']);
            return _react2['default'].createElement(
                _reactNative.View,
                { style: [styles.container, containerStyle, style, { position: 'relative' }] },
                _react2['default'].createElement(_reactNative.TextInput, (0, _extends3['default'])({ clearButtonMode: clear ? 'while-editing' : 'never', underlineColorAndroid: 'transparent', style: [styles.input, textareaStyle, { height: Math.max(45, this.state.height) }] }, restProps, valueProps, { onChange: function onChange(event) {
                        return _this2.onChange(event);
                    }, multiline: rows > 1 || autoHeight, numberOfLines: rows, maxLength: maxLength })),
                error ? _react2['default'].createElement(
                    _reactNative.TouchableWithoutFeedback,
                    { onPress: onErrorClick },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: [styles.errorIcon] },
                        _react2['default'].createElement(_reactNative.Image, { source: require('../style/images/error.png'), style: { width: _default2['default'].icon_size_xs, height: _default2['default'].icon_size_xs } })
                    )
                ) : null,
                rows > 1 && count > 0 ? _react2['default'].createElement(
                    _reactNative.View,
                    { style: [styles.count] },
                    _react2['default'].createElement(
                        _reactNative.Text,
                        null,
                        inputCount,
                        ' / ',
                        count
                    )
                ) : null
            );
        }
    }]);
    return TextAreaItem;
}(_react2['default'].Component);

exports['default'] = TextAreaItem;

TextAreaItem.defaultProps = {
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    onErrorClick: function onErrorClick() {},

    clear: true,
    error: false,
    editable: true,
    rows: 1,
    count: 0,
    keyboardType: 'default',
    autoHeight: false,
    last: false,
    styles: _index2['default']
};
module.exports = exports['default'];