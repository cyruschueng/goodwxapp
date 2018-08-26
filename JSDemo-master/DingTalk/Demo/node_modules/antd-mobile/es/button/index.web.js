import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon/index.web';
import Touchable from 'rc-touchable';
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
// Insert one space between two chinese characters automatically.
function insertSpace(child) {
    if (isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {}, child.props.children.split('').join(' '));
    }
    if (isString(child)) {
        if (isTwoCNChar(child)) {
            child = child.split('').join(' ');
        }
        return React.createElement(
            'span',
            null,
            child
        );
    }
    return child;
}

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    _createClass(Button, [{
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
            var wrapCls = (_wrapCls = {}, _defineProperty(_wrapCls, className, className), _defineProperty(_wrapCls, prefixCls, true), _defineProperty(_wrapCls, prefixCls + '-primary', type === 'primary'), _defineProperty(_wrapCls, prefixCls + '-ghost', type === 'ghost'), _defineProperty(_wrapCls, prefixCls + '-warning', type === 'warning'), _defineProperty(_wrapCls, prefixCls + '-small', size === 'small'), _defineProperty(_wrapCls, prefixCls + '-inline', inline), _defineProperty(_wrapCls, prefixCls + '-across', across), _defineProperty(_wrapCls, prefixCls + '-disabled', disabled), _defineProperty(_wrapCls, prefixCls + '-loading', loading), _wrapCls);
            var iconType = loading ? 'loading' : icon;
            var kids = React.Children.map(children, insertSpace);
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
            return React.createElement(
                Touchable,
                _extends({ activeClassName: activeClassName || (activeStyle ? prefixCls + '-active' : undefined), disabled: disabled, activeStyle: activeStyle }, delayProps),
                React.createElement(
                    'a',
                    _extends({ role: 'button', className: classNames(wrapCls) }, restProps, { onClick: disabled ? undefined : onClick, 'aria-disabled': disabled }),
                    iconType ? React.createElement(Icon, { 'aria-hidden': 'true', type: iconType, size: size === 'small' ? 'xxs' : 'md' }) : null,
                    kids
                )
            );
        }
    }]);

    return Button;
}(React.Component);

Button.defaultProps = {
    prefixCls: 'am-button',
    size: 'large',
    inline: false,
    across: false,
    disabled: false,
    loading: false,
    activeStyle: {}
};
export default Button;