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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../icon/index.web');

var _index2 = _interopRequireDefault(_index);

var _rcTouchable = require('rc-touchable');

var _rcTouchable2 = _interopRequireDefault(_rcTouchable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
// Insert one space between two chinese characters automatically.
function insertSpace(child) {
    if (isString(child.type) && isTwoCNChar(child.props.children)) {
        return _react2['default'].cloneElement(child, {}, child.props.children.split('').join(' '));
    }
    if (isString(child)) {
        if (isTwoCNChar(child)) {
            child = child.split('').join(' ');
        }
        return _react2['default'].createElement(
            'span',
            null,
            child
        );
    }
    return child;
}

var Button = function (_React$Component) {
    (0, _inherits3['default'])(Button, _React$Component);

    function Button() {
        (0, _classCallCheck3['default'])(this, Button);
        return (0, _possibleConstructorReturn3['default'])(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Button, [{
        key: 'render',
        value: function render() {
            var _wrapCls;

            var _a = this.props,
                children = _a.children,
                className = _a.className,
                prefixCls = _a.prefixCls,
                type = _a.type,
                size = _a.size,
                inline = _a.inline,
                across = _a.across,
                disabled = _a.disabled,
                icon = _a.icon,
                loading = _a.loading,
                activeStyle = _a.activeStyle,
                activeClassName = _a.activeClassName,
                onClick = _a.onClick,
                delayPressIn = _a.delayPressIn,
                delayPressOut = _a.delayPressOut,
                restProps = __rest(_a, ["children", "className", "prefixCls", "type", "size", "inline", "across", "disabled", "icon", "loading", "activeStyle", "activeClassName", "onClick", "delayPressIn", "delayPressOut"]);
            var wrapCls = (_wrapCls = {}, (0, _defineProperty3['default'])(_wrapCls, className, className), (0, _defineProperty3['default'])(_wrapCls, prefixCls, true), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-primary', type === 'primary'), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-ghost', type === 'ghost'), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-warning', type === 'warning'), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-small', size === 'small'), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-inline', inline), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-across', across), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-loading', loading), _wrapCls);
            var iconType = loading ? 'loading' : icon;
            var kids = _react2['default'].Children.map(children, insertSpace);
            if (iconType) {
                wrapCls[prefixCls + '-icon'] = true;
            }
            var delayProps = {};
            if (delayPressIn) {
                delayProps.delayPressIn = delayPressIn;
            }
            if (delayPressOut) {
                delayProps.delayPressOut = delayPressOut;
            }
            // use div, button native is buggy @yiminghe
            return _react2['default'].createElement(
                _rcTouchable2['default'],
                (0, _extends3['default'])({ activeClassName: activeClassName || (activeStyle ? prefixCls + '-active' : undefined), disabled: disabled, activeStyle: activeStyle }, delayProps),
                _react2['default'].createElement(
                    'a',
                    (0, _extends3['default'])({ role: 'button', className: (0, _classnames2['default'])(wrapCls) }, restProps, { onClick: disabled ? undefined : onClick, 'aria-disabled': disabled }),
                    iconType ? _react2['default'].createElement(_index2['default'], { 'aria-hidden': 'true', type: iconType, size: size === 'small' ? 'xxs' : 'md' }) : null,
                    kids
                )
            );
        }
    }]);
    return Button;
}(_react2['default'].Component);

Button.defaultProps = {
    prefixCls: 'am-button',
    size: 'large',
    inline: false,
    across: false,
    disabled: false,
    loading: false,
    activeStyle: {}
};
exports['default'] = Button;
module.exports = exports['default'];