import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View } from 'react-native';

var TabPane = function (_React$Component) {
    _inherits(TabPane, _React$Component);

    function TabPane() {
        _classCallCheck(this, TabPane);

        return _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).apply(this, arguments));
    }

    _createClass(TabPane, [{
        key: 'render',
        value: function render() {
            var children = this.props.children;

            return React.createElement(
                View,
                null,
                children
            );
        }
    }]);

    return TabPane;
}(React.Component);

export default TabPane;