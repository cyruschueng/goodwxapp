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
import RcInputNumber from 'rc-input-number';
import Icon from '../icon/index.web';

var Stepper = function (_React$Component) {
    _inherits(Stepper, _React$Component);

    function Stepper() {
        _classCallCheck(this, Stepper);

        return _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).apply(this, arguments));
    }

    _createClass(Stepper, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                className = _a.className,
                showNumber = _a.showNumber,
                restProps = __rest(_a, ["className", "showNumber"]);
            var stepperClass = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'showNumber', !!showNumber), _classNames));
            return React.createElement(RcInputNumber, _extends({ upHandler: React.createElement(Icon, { type: require('./style/assets/plus.svg'), size: 'xxs' }), downHandler: React.createElement(Icon, { type: require('./style/assets/minus.svg'), size: 'xxs' }) }, restProps, { ref: 'inputNumber', className: stepperClass }));
        }
    }]);

    return Stepper;
}(React.Component);

export default Stepper;

Stepper.defaultProps = {
    prefixCls: 'am-stepper',
    step: 1,
    readOnly: false,
    showNumber: false,
    focusOnUpDown: false,
    useTouch: true
};