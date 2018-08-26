import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcTabs, { TabPane } from 'rc-tabs';
import SwipeableTabContent from 'rc-tabs/es/SwipeableTabContent';
import TabContent from 'rc-tabs/es/TabContent';
import InkTabBar from 'rc-tabs/es/InkTabBar';
import SwipeableInkTabBar from 'rc-tabs/es/SwipeableInkTabBar';

var Tabs = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs() {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));

        _this.renderTabBar = function () {
            var _this$props = _this.props,
                children = _this$props.children,
                animated = _this$props.animated,
                speed = _this$props.speed,
                pageSize = _this$props.pageSize,
                tabBarhammerOptions = _this$props.tabBarhammerOptions,
                onTabClick = _this$props.onTabClick;

            if (children.length > pageSize) {
                return React.createElement(SwipeableInkTabBar, { onTabClick: onTabClick, speed: speed, pageSize: pageSize, hammerOptions: tabBarhammerOptions });
            }
            return React.createElement(InkTabBar, { inkBarAnimated: animated, onTabClick: onTabClick });
        };
        _this.renderTabContent = function () {
            var _this$props2 = _this.props,
                animated = _this$props2.animated,
                swipeable = _this$props2.swipeable,
                hammerOptions = _this$props2.hammerOptions;

            return swipeable ? React.createElement(SwipeableTabContent, { animated: animated, hammerOptions: hammerOptions }) : React.createElement(TabContent, { animated: animated });
        };
        return _this;
    }

    _createClass(Tabs, [{
        key: 'render',
        value: function render() {
            return React.createElement(RcTabs, _extends({ renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent }, this.props));
        }
    }]);

    return Tabs;
}(React.Component);

export default Tabs;

Tabs.TabPane = TabPane;
Tabs.defaultProps = {
    prefixCls: 'am-tabs',
    animated: true,
    swipeable: true,
    tabBarPosition: 'top',
    hammerOptions: {},
    tabBarhammerOptions: {},
    pageSize: 5,
    speed: 10,
    onChange: function onChange() {},
    onTabClick: function onTabClick() {}
};