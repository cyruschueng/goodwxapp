import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import NoticeStyle from './style';

var NoticeBar = function (_React$Component) {
    _inherits(NoticeBar, _React$Component);

    function NoticeBar(props) {
        _classCallCheck(this, NoticeBar);

        var _this = _possibleConstructorReturn(this, (NoticeBar.__proto__ || Object.getPrototypeOf(NoticeBar)).call(this, props));

        _this.onClick = function () {
            var _this$props = _this.props,
                mode = _this$props.mode,
                onClick = _this$props.onClick;

            if (onClick) {
                onClick();
            }
            if (mode === 'closable') {
                _this.setState({
                    show: false
                });
            }
        };
        _this.state = {
            show: true
        };
        return _this;
    }

    _createClass(NoticeBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                mode = _props.mode,
                icon = _props.icon,
                style = _props.style;

            var styles = this.props.styles;
            var operationDom = null;
            if (mode === 'closable') {
                operationDom = React.createElement(
                    TouchableWithoutFeedback,
                    { onPress: this.onClick },
                    React.createElement(
                        View,
                        null,
                        React.createElement(
                            Text,
                            { style: [styles.close] },
                            '\xD7'
                        )
                    )
                );
            } else if (mode === 'link') {
                operationDom = React.createElement(
                    Text,
                    { style: [styles.link] },
                    '\u221F'
                );
            }
            var iconDom = icon && React.isValidElement(icon) ? React.createElement(
                View,
                { style: [styles.left15] },
                icon
            ) : null;
            var main = React.createElement(
                View,
                { style: [styles.notice, style] },
                iconDom,
                React.createElement(
                    Text,
                    { style: [styles.content, icon ? styles.left6 : styles.left15] },
                    children
                ),
                operationDom
            );
            return this.state.show ? mode === 'closable' ? main : React.createElement(
                TouchableWithoutFeedback,
                { onPress: this.onClick },
                main
            ) : null;
        }
    }]);

    return NoticeBar;
}(React.Component);

export default NoticeBar;

NoticeBar.defaultProps = {
    mode: '',
    onClick: function onClick() {},

    icon: React.createElement(Image, { source: { uri: 'https://zos.alipayobjects.com/rmsportal/UgviADRsIpznkjSEXWEaPTlKtPCMSlth.png' }, style: { width: 14, height: 12 } }),
    styles: NoticeStyle
};