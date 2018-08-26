'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rcTouchable = require('rc-touchable');

var _rcTouchable2 = _interopRequireDefault(_rcTouchable);

var _PropsType = require('./PropsType');

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function checkIfAndroid(platform) {
    return platform === 'android' || platform === 'cross' && typeof window !== 'undefined' && !!navigator.userAgent.match(/Android/i);
}

var Modal = function (_ModalComponent) {
    (0, _inherits3['default'])(Modal, _ModalComponent);

    function Modal(props) {
        (0, _classCallCheck3['default'])(this, Modal);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.state = {
            // in ssr, just set isAndroid false
            // since modal normally won't show at first render, componentDidMount will do double check
            isAndroid: checkIfAndroid(props.platform)
        };
        return _this;
    }

    (0, _createClass3['default'])(Modal, [{
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
            return _react2['default'].createElement(
                _rcTouchable2['default'],
                { activeClassName: prefixCls + '-button-active', key: i },
                _react2['default'].createElement(
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

            var wrapCls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, className, !!className), (0, _defineProperty3['default'])(_classNames, prefixCls + '-transparent', transparent), (0, _defineProperty3['default'])(_classNames, prefixCls + '-android', isAndroid), _classNames));
            var anim = transitionName || (animated ? transparent ? 'am-fade' : 'am-slide-up' : null);
            var maskAnim = maskTransitionName || (animated ? transparent ? 'am-fade' : 'am-slide-up' : null);
            var btnGroupClass = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-button-group-' + (footer.length === 2 && !operation ? 'h' : 'v'), true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-button-group-' + (operation ? 'operation' : 'normal'), true), _classNames2));
            var footerDom = footer.length ? _react2['default'].createElement(
                'div',
                { className: btnGroupClass, role: 'group' },
                footer.map(function (button, i) {
                    return _this2.renderFooterButton(button, prefixCls, i);
                })
            ) : null;
            // transparent 模式下, 内容默认居中
            var rootStyle = transparent ? (0, _extends3['default'])({ width: '5.4rem', height: 'auto' }, style) : (0, _extends3['default'])({ width: '100%', height: '100%' }, style);
            var restProps = (0, _omit2['default'])(this.props, ['prefixCls', 'className', 'transparent', 'animated', 'transitionName', 'maskTransitionName', 'style', 'footer', 'touchFeedback', 'wrapProps']);
            var wrapProps = { onTouchStart: function onTouchStart(e) {
                    return _this2.isInModal(e);
                } };
            return _react2['default'].createElement(_rcDialog2['default'], (0, _extends3['default'])({ prefixCls: prefixCls, className: wrapCls, transitionName: anim, maskTransitionName: maskAnim, style: rootStyle, footer: footerDom, wrapProps: wrapProps, closable: closable }, restProps));
        }
    }]);
    return Modal;
}(_PropsType.ModalComponent);

exports['default'] = Modal;

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
module.exports = exports['default'];