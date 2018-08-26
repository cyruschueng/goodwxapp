import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { TabBarIOS } from 'react-native';
import omit from 'omit.js';

var TabBar = function (_React$Component) {
    _inherits(TabBar, _React$Component);

    function TabBar() {
        _classCallCheck(this, TabBar);

        return _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).apply(this, arguments));
    }

    _createClass(TabBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                barTintColor = _props.barTintColor,
                tintColor = _props.tintColor,
                unselectedTintColor = _props.unselectedTintColor;

            var restProps = omit(this.props, ['barTintColor', 'tintColor', 'unselectedTintColor']);
            return React.createElement(TabBarIOS, _extends({ barTintColor: barTintColor, tintColor: tintColor, unselectedTintColor: unselectedTintColor }, restProps));
        }
    }]);

    return TabBar;
}(React.Component);

TabBar.defaultProps = {
    barTintColor: 'white',
    tintColor: '#108ee9',
    unselectedTintColor: '#888'
};
TabBar.Item = TabBarIOS.Item;
export default TabBar;