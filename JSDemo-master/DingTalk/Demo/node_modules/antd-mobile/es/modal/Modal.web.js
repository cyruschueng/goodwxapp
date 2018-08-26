import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Dialog from 'rc-dialog';
import classNames from 'classnames';
import Touchable from 'rc-touchable';
import { ModalComponent } from './PropsType';
import omit from 'omit.js';
function checkIfAndroid(platform) {
    return platform === 'android' || platform === 'cross' && typeof window !== 'undefined' && !!navigator.userAgent.match(/Android/i);
}

var Modal = function (_ModalComponent) {
    _inherits(Modal, _ModalComponent);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.state = {
            // in ssr, just set isAndroid false
            // since modal normally won't show at first render, componentDidMount will do double check
            isAndroid: checkIfAndroid(props.platform)
        };
        return _this;
    }

    _createClass(Modal, [{
        key: 'isInModal',
        value: function isInModal(e) {
            if (!/\biPhone\b|\biPod\b/i.test(navigator.userAgent)) {
                return;
            }
            // fix touch to scroll background page on iOS
            var prefixCls = this.props.prefixCls;
            var pNode = function (node) {
                while (node.parentNode && node.parentNode !== document.body) {
                    if (node.classList.contains(prefixCls)) {
                        return node;
                    }
                    node = node.parentNode;
                }
            }(e.target);
            if (!pNode) {
                e.preventDefault();
            }
            return true;
        }
    }, {
        key: 'renderFooterButton',
        value: function renderFooterButton(button, prefixCls, i) {
            var buttonStyle = {};
            if (button.style) {
                buttonStyle = button.style;
                if (typeof buttonStyle === 'string') {
                    var styleMap = {
                        cancel: {},
                        'default': {},
                        destructive: { color: 'red' }
                    };
                    buttonStyle = styleMap[buttonStyle] || {};
                }
            }
            var onClickFn = function onClickFn(e) {
                e.preventDefault();
                if (button.onPress) {
                    button.onPress();
                }
            };
            return React.createElement(
                Touchable,
                { activeClassName: prefixCls + '-button-active', key: i },
                React.createElement(
                    'a',
                    { className: prefixCls + '-button', role: 'button', style: buttonStyle, onClick: onClickFn },
                    button.text || 'Button'
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var isAndroid = checkIfAndroid(this.props.platform);
            if (isAndroid !== this.state.isAndroid) {
                this.setState({
                    isAndroid: isAndroid
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _classNames2,
                _this2 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                transparent = _props.transparent,
                animated = _props.animated,
                transitionName = _props.transitionName,
                maskTransitionName = _props.maskTransitionName,
                style = _props.style,
                _props$footer = _props.footer,
                footer = _props$footer === undefined ? [] : _props$footer,
                closable = _props.closable,
                operation = _props.operation;
            var isAndroid = this.state.isAndroid;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-transparent', transparent), _defineProperty(_classNames, prefixCls + '-android', isAndroid), _classNames));
            var anim = transitionName || (animated ? transparent ? 'am-fade' : 'am-slide-up' : null);
            var maskAnim = maskTransitionName || (animated ? transparent ? 'am-fade' : 'am-slide-up' : null);
            var btnGroupClass = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-button-group-' + (footer.length === 2 && !operation ? 'h' : 'v'), true), _defineProperty(_classNames2, prefixCls + '-button-group-' + (operation ? 'operation' : 'normal'), true), _classNames2));
            var footerDom = footer.length ? React.createElement(
                'div',
                { className: btnGroupClass, role: 'group' },
                footer.map(function (button, i) {
                    return _this2.renderFooterButton(button, prefixCls, i);
                })
            ) : null;
            // transparent 模式下, 内容默认居中
            var rootStyle = transparent ? _extends({ width: '5.4rem', height: 'auto' }, style) : _extends({ width: '100%', height: '100%' }, style);
            var restProps = omit(this.props, ['prefixCls', 'className', 'transparent', 'animated', 'transitionName', 'maskTransitionName', 'style', 'footer', 'touchFeedback', 'wrapProps']);
            var wrapProps = { onTouchStart: function onTouchStart(e) {
                    return _this2.isInModal(e);
                } };
            return React.createElement(Dialog, _extends({ prefixCls: prefixCls, className: wrapCls, transitionName: anim, maskTransitionName: maskAnim, style: rootStyle, footer: footerDom, wrapProps: wrapProps, closable: closable }, restProps));
        }
    }]);

    return Modal;
}(ModalComponent);

export default Modal;

Modal.defaultProps = {
    prefixCls: 'am-modal',
    // transparent change to transparent by yiminghe
    transparent: false,
    animated: true,
    style: {},
    onShow: function onShow() {},

    footer: [],
    closable: false,
    operation: false,
    platform: 'cross'
};