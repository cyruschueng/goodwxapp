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
import Marquee from './Marquee';

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
            var _classNames;

            var _a = this.props,
                mode = _a.mode,
                icon = _a.icon,
                onClick = _a.onClick,
                children = _a.children,
                className = _a.className,
                prefixCls = _a.prefixCls,
                marqueeProps = _a.marqueeProps,
                restProps = __rest(_a, ["mode", "icon", "onClick", "children", "className", "prefixCls", "marqueeProps"]);
            var extraProps = {};
            var operationDom = null;
            if (mode === 'closable') {
                operationDom = React.createElement(
                    'div',
                    { className: prefixCls + '-operation', onClick: this.onClick, role: 'button', 'aria-label': 'close' },
                    React.createElement(Icon, { type: 'cross', size: 'md' })
                );
            } else {
                if (mode === 'link') {
                    operationDom = React.createElement(
                        'div',
                        { className: prefixCls + '-operation', role: 'button', 'aria-label': 'go to detail' },
                        React.createElement(Icon, { type: 'right', size: 'md' })
                    );
                }
                extraProps.onClick = onClick;
            }
            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _classNames));
            var marquee = _extends({ loop: false, leading: 500, trailing: 800, fps: 40, style: {} }, marqueeProps);
            return this.state.show ? React.createElement(
                'div',
                _extends({ className: wrapCls }, restProps, extraProps, { role: 'alert' }),
                icon ? React.createElement(
                    'div',
                    { className: prefixCls + '-icon', 'aria-hidden': 'true' },
                    ' ',
                    icon,
                    ' '
                ) : null,
                React.createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    React.createElement(Marquee, _extends({ prefixCls: prefixCls, text: children }, marquee))
                ),
                operationDom
            ) : null;
        }
    }]);

    return NoticeBar;
}(React.Component);

export default NoticeBar;

NoticeBar.defaultProps = {
    prefixCls: 'am-notice-bar',
    mode: '',
    icon: React.createElement(Icon, { type: require('./style/assets/trips.svg'), size: 'xxs' }),
    onClick: function onClick() {}
};