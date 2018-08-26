import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcInputNumber from 'rc-input-number/lib';
import styles from 'rc-input-number/es/styles';
import { Platform } from 'react-native';
import omit from 'omit.js';

var Stepper = function (_React$Component) {
    _inherits(Stepper, _React$Component);

    function Stepper() {
        _classCallCheck(this, Stepper);

        return _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).apply(this, arguments));
    }

    _createClass(Stepper, [{
        key: 'render',
        value: function render() {
            var inputAndroidStyle = Platform.OS === 'android' ? {
                top: 6,
                paddingTop: 0,
                height: 26
            } : {};
            var inputStyle = _extends({}, inputAndroidStyle, this.props.inputStyle);
            var restProps = omit(this.props, ['inputStyle']);
            return React.createElement(RcInputNumber, _extends({}, restProps, { inputStyle: inputStyle }));
        }
    }]);

    return Stepper;
}(React.Component);

export default Stepper;

Stepper.defaultProps = {
    step: 1,
    readOnly: false,
    disabled: false,
    styles: styles,
    inputStyle: {}
};