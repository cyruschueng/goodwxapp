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
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import classNames from 'classnames';
import Touchable from 'rc-touchable';
import omit from 'omit.js';
export var Brief = function (_React$Component) {
    _inherits(Brief, _React$Component);

    function Brief() {
        _classCallCheck(this, Brief);

        return _possibleConstructorReturn(this, (Brief.__proto__ || Object.getPrototypeOf(Brief)).apply(this, arguments));
    }

    _createClass(Brief, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'am-list-brief', style: this.props.style },
                this.props.children
            );
        }
    }]);

    return Brief;
}(React.Component);

var ListItem = function (_React$Component2) {
    _inherits(ListItem, _React$Component2);

    function ListItem(props) {
        _classCallCheck(this, ListItem);

        var _this2 = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

        _this2.onClick = function (ev) {
            var _this2$props = _this2.props,
                onClick = _this2$props.onClick,
                platform = _this2$props.platform;

            var isAndroid = platform === 'android' || platform === 'cross' && !!navigator.userAgent.match(/Android/i);
            if (!!onClick && isAndroid) {
                if (_this2.debounceTimeout) {
                    clearTimeout(_this2.debounceTimeout);
                    _this2.debounceTimeout = null;
                }
                var Item = ev.currentTarget;
                var RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
                var ClientRect = ev.currentTarget.getBoundingClientRect();
                var pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
                var pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
                var coverRippleStyle = {
                    width: RippleWidth + 'px',
                    height: RippleWidth + 'px',
                    left: pointX + 'px',
                    top: pointY + 'px'
                };
                _this2.setState({
                    coverRippleStyle: coverRippleStyle,
                    RippleClicked: true
                }, function () {
                    _this2.debounceTimeout = setTimeout(function () {
                        _this2.setState({
                            coverRippleStyle: { display: 'none' },
                            RippleClicked: false
                        });
                    }, 1000);
                });
            }
            if (onClick) {
                onClick(ev);
            }
        };
        _this2.state = {
            coverRippleStyle: { display: 'none' },
            RippleClicked: false
        };
        return _this2;
    }

    _createClass(ListItem, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _wrapCls,
                _classNames,
                _classNames2,
                _classNames3,
                _this3 = this;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                className = _a.className,
                activeStyle = _a.activeStyle,
                error = _a.error,
                align = _a.align,
                wrap = _a.wrap,
                disabled = _a.disabled,
                children = _a.children,
                multipleLine = _a.multipleLine,
                thumb = _a.thumb,
                extra = _a.extra,
                arrow = _a.arrow,
                onClick = _a.onClick,
                onLongPress = _a.onLongPress,
                restProps = __rest(_a, ["prefixCls", "className", "activeStyle", "error", "align", "wrap", "disabled", "children", "multipleLine", "thumb", "extra", "arrow", "onClick", "onLongPress"]);var _state = this.state,
                coverRippleStyle = _state.coverRippleStyle,
                RippleClicked = _state.RippleClicked;

            var wrapCls = (_wrapCls = {}, _defineProperty(_wrapCls, className, className), _defineProperty(_wrapCls, prefixCls + '-item', true), _defineProperty(_wrapCls, prefixCls + '-item-disabled', disabled), _defineProperty(_wrapCls, prefixCls + '-item-error', error), _defineProperty(_wrapCls, prefixCls + '-item-top', align === 'top'), _defineProperty(_wrapCls, prefixCls + '-item-middle', align === 'middle'), _defineProperty(_wrapCls, prefixCls + '-item-bottom', align === 'bottom'), _wrapCls);
            var rippleCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-ripple', true), _defineProperty(_classNames, prefixCls + '-ripple-animate', RippleClicked), _classNames));
            var lineCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-line', true), _defineProperty(_classNames2, prefixCls + '-line-multiple', multipleLine), _defineProperty(_classNames2, prefixCls + '-line-wrap', wrap), _classNames2));
            var arrowCls = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-arrow', true), _defineProperty(_classNames3, prefixCls + '-arrow-horizontal', arrow === 'horizontal'), _defineProperty(_classNames3, prefixCls + '-arrow-vertical', arrow === 'down' || arrow === 'up'), _defineProperty(_classNames3, prefixCls + '-arrow-vertical-up', arrow === 'up'), _classNames3));
            var content = React.createElement(
                'div',
                _extends({}, omit(restProps, ['platform']), { onClick: function onClick(ev) {
                        _this3.onClick(ev);
                    }, className: classNames(wrapCls) }),
                thumb ? React.createElement(
                    'div',
                    { className: prefixCls + '-thumb' },
                    typeof thumb === 'string' ? React.createElement('img', { src: thumb }) : thumb
                ) : null,
                React.createElement(
                    'div',
                    { className: lineCls },
                    children !== undefined && React.createElement(
                        'div',
                        { className: prefixCls + '-content' },
                        children
                    ),
                    extra !== undefined && React.createElement(
                        'div',
                        { className: prefixCls + '-extra' },
                        extra
                    ),
                    arrow && React.createElement('div', { className: arrowCls, 'aria-hidden': 'true' })
                ),
                React.createElement('div', { style: coverRippleStyle, className: rippleCls })
            );
            return React.createElement(
                Touchable,
                { disabled: disabled || !onClick && !onLongPress, activeStyle: activeStyle, activeClassName: prefixCls + '-item-active', onLongPress: onLongPress },
                content
            );
        }
    }]);

    return ListItem;
}(React.Component);

ListItem.defaultProps = {
    prefixCls: 'am-list',
    align: 'middle',
    error: false,
    multipleLine: false,
    wrap: false,
    platform: 'cross'
};
ListItem.Brief = Brief;
export default ListItem;