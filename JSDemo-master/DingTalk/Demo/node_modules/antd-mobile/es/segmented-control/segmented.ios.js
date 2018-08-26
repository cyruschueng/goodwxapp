import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { SegmentedControlIOS } from 'react-native';
import omit from 'omit.js';

var SegmentedControl = function (_React$Component) {
    _inherits(SegmentedControl, _React$Component);

    function SegmentedControl() {
        _classCallCheck(this, SegmentedControl);

        return _possibleConstructorReturn(this, (SegmentedControl.__proto__ || Object.getPrototypeOf(SegmentedControl)).apply(this, arguments));
    }

    _createClass(SegmentedControl, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                tintColor = _props.tintColor,
                selectedIndex = _props.selectedIndex,
                disabled = _props.disabled;

            var restProps = omit(this.props, ['tintColor', 'disabled', 'selectedIndex']);
            return React.createElement(SegmentedControlIOS, _extends({ tintColor: tintColor, selectedIndex: selectedIndex }, restProps, { enabled: !disabled }));
        }
    }]);

    return SegmentedControl;
}(React.Component);

export default SegmentedControl;

SegmentedControl.defaultProps = {
    tintColor: '#108ee9',
    selectedIndex: 0
};