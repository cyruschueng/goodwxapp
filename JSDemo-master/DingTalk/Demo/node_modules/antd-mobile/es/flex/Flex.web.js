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

var Flex = function (_React$Component) {
    _inherits(Flex, _React$Component);

    function Flex() {
        _classCallCheck(this, Flex);

        return _possibleConstructorReturn(this, (Flex.__proto__ || Object.getPrototypeOf(Flex)).apply(this, arguments));
    }

    _createClass(Flex, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                direction = _a.direction,
                wrap = _a.wrap,
                justify = _a.justify,
                align = _a.align,
                alignContent = _a.alignContent,
                className = _a.className,
                children = _a.children,
                prefixCls = _a.prefixCls,
                style = _a.style,
                restProps = __rest(_a, ["direction", "wrap", "justify", "align", "alignContent", "className", "children", "prefixCls", "style"]);
            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-dir-row', direction === 'row'), _defineProperty(_classNames, prefixCls + '-dir-row-reverse', direction === 'row-reverse'), _defineProperty(_classNames, prefixCls + '-dir-column', direction === 'column'), _defineProperty(_classNames, prefixCls + '-dir-column-reverse', direction === 'column-reverse'), _defineProperty(_classNames, prefixCls + '-nowrap', wrap === 'nowrap'), _defineProperty(_classNames, prefixCls + '-wrap', wrap === 'wrap'), _defineProperty(_classNames, prefixCls + '-wrap-reverse', wrap === 'wrap-reverse'), _defineProperty(_classNames, prefixCls + '-justify-start', justify === 'start'), _defineProperty(_classNames, prefixCls + '-justify-end', justify === 'end'), _defineProperty(_classNames, prefixCls + '-justify-center', justify === 'center'), _defineProperty(_classNames, prefixCls + '-justify-between', justify === 'between'), _defineProperty(_classNames, prefixCls + '-justify-around', justify === 'around'), _defineProperty(_classNames, prefixCls + '-align-top', align === 'top' || align === 'start'), _defineProperty(_classNames, prefixCls + '-align-middle', align === 'middle' || align === 'center'), _defineProperty(_classNames, prefixCls + '-align-bottom', align === 'bottom' || align === 'end'), _defineProperty(_classNames, prefixCls + '-align-baseline', align === 'baseline'), _defineProperty(_classNames, prefixCls + '-align-stretch', align === 'stretch'), _defineProperty(_classNames, prefixCls + '-align-content-start', alignContent === 'start'), _defineProperty(_classNames, prefixCls + '-align-content-end', alignContent === 'end'), _defineProperty(_classNames, prefixCls + '-align-content-center', alignContent === 'center'), _defineProperty(_classNames, prefixCls + '-align-content-between', alignContent === 'between'), _defineProperty(_classNames, prefixCls + '-align-content-around', alignContent === 'around'), _defineProperty(_classNames, prefixCls + '-align-content-stretch', alignContent === 'stretch'), _defineProperty(_classNames, className, className), _classNames));
            return React.createElement(
                'div',
                _extends({ className: wrapCls, style: style }, restProps),
                children
            );
        }
    }]);

    return Flex;
}(React.Component);

export default Flex;

Flex.defaultProps = {
    prefixCls: 'am-flexbox',
    align: 'center'
};