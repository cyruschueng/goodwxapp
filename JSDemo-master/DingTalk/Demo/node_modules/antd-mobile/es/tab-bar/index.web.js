import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import warning from 'warning';
import Tab from './Tab.web';
import TabContent from 'rc-tabs/es/TabContent';
import TabBar from 'rc-tabs/es/TabBar';
import getDataAttr from '../_util/getDataAttr';
export var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return Item;
}(React.Component);

var AntTabBar = function (_React$Component2) {
    _inherits(AntTabBar, _React$Component2);

    function AntTabBar() {
        _classCallCheck(this, AntTabBar);

        var _this2 = _possibleConstructorReturn(this, (AntTabBar.__proto__ || Object.getPrototypeOf(AntTabBar)).apply(this, arguments));

        _this2.onChange = function (key) {
            React.Children.forEach(_this2.props.children, function (c) {
                if (c.key === key && c.props.onPress) {
                    c.props.onPress();
                }
            });
        };
        _this2.renderTabBar = function () {
            var _this2$props = _this2.props,
                barTintColor = _this2$props.barTintColor,
                hidden = _this2$props.hidden,
                prefixCls = _this2$props.prefixCls;

            var barCls = hidden ? prefixCls + '-bar-hidden' : '';
            return React.createElement(TabBar, { className: barCls, style: { backgroundColor: barTintColor } });
        };
        _this2.renderTabContent = function () {
            return React.createElement(TabContent, { animated: false });
        };
        return _this2;
    }

    _createClass(AntTabBar, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var activeKey = void 0;
            var children = [];
            var _allKeys = [];
            React.Children.forEach(this.props.children, function (c) {
                var hasKey = !!c.key;
                var isUnique = _allKeys.indexOf(c.key) === -1;
                warning(hasKey && isUnique, 'TabBar.Item must have a unique key!');
                _allKeys.push(c.key);
                if (c.props.selected) {
                    activeKey = c.key;
                }
                children.push(c);
            });
            var _props = this.props,
                tintColor = _props.tintColor,
                unselectedTintColor = _props.unselectedTintColor;

            var panels = children.map(function (c) {
                var cProps = c.props;
                var tab = React.createElement(Tab, { prefixCls: _this3.props.prefixCls + '-tab', badge: cProps.badge, dot: cProps.dot, selected: cProps.selected, icon: cProps.icon, selectedIcon: cProps.selectedIcon, title: cProps.title, tintColor: tintColor, unselectedTintColor: unselectedTintColor, dataAttrs: getDataAttr(cProps) });
                return React.createElement(
                    TabPane,
                    { placeholder: _this3.props.placeholder, tab: tab, key: c.key },
                    cProps.children
                );
            });
            return React.createElement(
                Tabs,
                { renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent, tabBarPosition: 'bottom', prefixCls: this.props.prefixCls, activeKey: activeKey, onChange: this.onChange },
                panels
            );
        }
    }]);

    return AntTabBar;
}(React.Component);

AntTabBar.defaultProps = {
    prefixCls: 'am-tab-bar',
    barTintColor: 'white',
    tintColor: '#108ee9',
    hidden: false,
    unselectedTintColor: '#888',
    placeholder: '正在加载'
};
AntTabBar.Item = Item;
export default AntTabBar;