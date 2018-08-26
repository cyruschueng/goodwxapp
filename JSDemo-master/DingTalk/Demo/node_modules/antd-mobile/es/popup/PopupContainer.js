import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View } from 'react-native';
import styles from './style/index';
import Modal from 'rc-dialog/es/Modal';

var PopupContainer = function (_React$Component) {
    _inherits(PopupContainer, _React$Component);

    function PopupContainer(props) {
        _classCallCheck(this, PopupContainer);

        var _this = _possibleConstructorReturn(this, (PopupContainer.__proto__ || Object.getPrototypeOf(PopupContainer)).call(this, props));

        _this.onMaskClose = function () {
            var onMaskClose = _this.props.onMaskClose;
            if (onMaskClose) {
                var res = onMaskClose();
                if (res && res.then) {
                    res.then(function () {
                        _this.hide();
                    });
                } else {
                    _this.hide();
                }
            }
        };
        _this.state = {
            visible: props.visible || false
        };
        return _this;
    }

    _createClass(PopupContainer, [{
        key: 'hide',
        value: function hide() {
            this.setState({
                visible: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                View,
                { style: styles.container },
                React.createElement(
                    Modal,
                    { style: this.props.style, animateAppear: true, onAnimationEnd: this.props.onAnimationEnd, animationType: this.props.animationType, wrapStyle: this.props.animationType === 'slide-up' ? styles.wrap : styles.wrapTop, visible: this.state.visible, maskClosable: this.props.maskClosable, onClose: this.onMaskClose },
                    this.props.children
                )
            );
        }
    }]);

    return PopupContainer;
}(React.Component);

export default PopupContainer;