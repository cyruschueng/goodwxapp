import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import defaultStyles from './style';

var Tabs = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this.onTabClick = function (_ref) {
            var i = _ref.i;

            var key = _this.getKey(i);
            var _this$props = _this.props,
                onTabClick = _this$props.onTabClick,
                onChange = _this$props.onChange;

            if (onTabClick) {
                onTabClick(key);
            }
            if (_this.activeIndex !== i) {
                if (onChange) {
                    onChange(key);
                }
                _this.activeIndex = i;
            }
        };
        _this.renderTabBar = function () {
            var _this$props2 = _this.props,
                tabBarPosition = _this$props2.tabBarPosition,
                underlineColor = _this$props2.underlineColor,
                activeUnderlineColor = _this$props2.activeUnderlineColor,
                textColor = _this$props2.textColor,
                activeTextColor = _this$props2.activeTextColor,
                styles = _this$props2.styles,
                barStyle = _this$props2.barStyle;

            var barBaseStyle = tabBarPosition === 'top' ? styles.barTop : styles.barBottom;
            var linePosition = tabBarPosition === 'top' ? {} : { top: -1 };
            var underlineStyle = [styles.underline, {
                bottom: tabBarPosition === 'top' ? -1 : null,
                backgroundColor: activeUnderlineColor
            }, linePosition];
            return React.createElement(DefaultTabBar, { activeTextColor: activeTextColor, inactiveTextColor: textColor, style: [barBaseStyle, { borderColor: underlineColor }, barStyle], textStyle: [styles.text], tabStyle: [styles.tab], underlineStyle: underlineStyle });
        };
        _this.activeIndex = 0;
        return _this;
    }

    _createClass(Tabs, [{
        key: 'getContents',
        value: function getContents() {
            var children = this.props.children;

            var newChildren = [];
            React.Children.forEach(children, function (child, idx) {
                newChildren.push(React.cloneElement(child, {
                    key: idx,
                    tabLabel: child.props.tab,
                    children: child.props.children
                }));
            });
            return newChildren;
        }
    }, {
        key: 'getKey',
        value: function getKey(index) {
            var children = this.props.children;
            var key = '';
            React.Children.forEach(children, function (child, idx) {
                if (index === idx) {
                    key = child.key;
                }
            });
            return key;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                tabBarPosition = _props.tabBarPosition,
                defaultActiveKey = _props.defaultActiveKey,
                activeKey = _props.activeKey,
                animated = _props.animated,
                children = _props.children,
                swipeable = _props.swipeable;

            var defaultActiveIndex = 0;
            var activeIndex = 0;
            React.Children.forEach(children, function (child, idx) {
                if (defaultActiveKey === child.key) {
                    defaultActiveIndex = idx;
                }
                if (activeKey === child.key) {
                    activeIndex = idx;
                }
            });
            this.activeIndex = activeIndex;
            return React.createElement(
                ScrollableTabView,
                { tabBarPosition: tabBarPosition, scrollWithoutAnimation: !animated, initialPage: defaultActiveIndex, page: activeIndex, locked: !swipeable, renderTabBar: this.renderTabBar, onChangeTab: this.onTabClick },
                this.getContents()
            );
        }
    }]);

    return Tabs;
}(React.Component);

Tabs.defaultProps = {
    tabBarPosition: 'top',
    animated: true,
    swipeable: true,
    onChange: function onChange() {},
    onTabClick: function onTabClick() {},

    underlineColor: '#ddd',
    activeUnderlineColor: '#108ee9',
    textColor: '#000',
    activeTextColor: '#108ee9',
    styles: defaultStyles,
    barStyle: null
};
export default Tabs;