import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import { View, Image, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import variables from '../style/themes/default';
import TextAreaItemStyle from './style/index';
import omit from 'omit.js';
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var TextAreaItem = function (_React$Component) {
    _inherits(TextAreaItem, _React$Component);

    function TextAreaItem(props) {
        _classCallCheck(this, TextAreaItem);

        var _this = _possibleConstructorReturn(this, (TextAreaItem.__proto__ || Object.getPrototypeOf(TextAreaItem)).call(this, props));

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
                height = variables.list_item_height;
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
            height: props.rows > 1 ? 6 * props.rows * 4 : variables.list_item_height
        };
        return _this;
    }

    _createClass(TextAreaItem, [{
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
                borderBottomWidth: last ? 0 : variables.border_width_sm
            };
            var textareaStyle = {
                color: error ? '#f50' : variables.color_text_base,
                paddingRight: error ? 2 * variables.h_spacing_lg : 0
            };
            var maxLength = count > 0 ? count : undefined;
            var restProps = omit(this.props, ['rows', 'error', 'clear', 'count', 'autoHeight', 'last', 'onErrorClick', 'styles', 'style']);
            return React.createElement(
                View,
                { style: [styles.container, containerStyle, style, { position: 'relative' }] },
                React.createElement(TextInput, _extends({ clearButtonMode: clear ? 'while-editing' : 'never', underlineColorAndroid: 'transparent', style: [styles.input, textareaStyle, { height: Math.max(45, this.state.height) }] }, restProps, valueProps, { onChange: function onChange(event) {
                        return _this2.onChange(event);
                    }, multiline: rows > 1 || autoHeight, numberOfLines: rows, maxLength: maxLength })),
                error ? React.createElement(
                    TouchableWithoutFeedback,
                    { onPress: onErrorClick },
                    React.createElement(
                        View,
                        { style: [styles.errorIcon] },
                        React.createElement(Image, { source: require('../style/images/error.png'), style: { width: variables.icon_size_xs, height: variables.icon_size_xs } })
                    )
                ) : null,
                rows > 1 && count > 0 ? React.createElement(
                    View,
                    { style: [styles.count] },
                    React.createElement(
                        Text,
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
}(React.Component);

export default TextAreaItem;

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
    styles: TextAreaItemStyle
};