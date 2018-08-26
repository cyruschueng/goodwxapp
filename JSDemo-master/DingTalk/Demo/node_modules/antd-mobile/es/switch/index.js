import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Switch } from 'react-native';

var AntmSwitch = function (_React$Component) {
    _inherits(AntmSwitch, _React$Component);

    function AntmSwitch() {
        _classCallCheck(this, AntmSwitch);

        return _possibleConstructorReturn(this, (AntmSwitch.__proto__ || Object.getPrototypeOf(AntmSwitch)).apply(this, arguments));
    }

    _createClass(AntmSwitch, [{
        key: 'onChange',
        value: function onChange(value) {
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                style = _props.style,
                disabled = _props.disabled,
                checked = _props.checked;

            return React.createElement(Switch, { style: style, onValueChange: function onValueChange(value) {
                    _this2.onChange(value);
                }, value: checked, disabled: disabled });
        }
    }]);

    return AntmSwitch;
}(React.Component);

export default AntmSwitch;

AntmSwitch.defaultProps = {
    name: '',
    checked: false,
    disabled: false,
    onChange: function onChange() {}
};