'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTabs = require('rc-tabs');

var _rcTabs2 = _interopRequireDefault(_rcTabs);

var _SwipeableTabContent = require('rc-tabs/lib/SwipeableTabContent');

var _SwipeableTabContent2 = _interopRequireDefault(_SwipeableTabContent);

var _TabContent = require('rc-tabs/lib/TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var _InkTabBar = require('rc-tabs/lib/InkTabBar');

var _InkTabBar2 = _interopRequireDefault(_InkTabBar);

var _SwipeableInkTabBar = require('rc-tabs/lib/SwipeableInkTabBar');

var _SwipeableInkTabBar2 = _interopRequireDefault(_SwipeableInkTabBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tabs = function (_React$Component) {
    (0, _inherits3['default'])(Tabs, _React$Component);

    function Tabs() {
        (0, _classCallCheck3['default'])(this, Tabs);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));

        _this.renderTabBar = function () {
            var _this$props = _this.props,
                children = _this$props.children,
                animated = _this$props.animated,
                speed = _this$props.speed,
                pageSize = _this$props.pageSize,
                tabBarhammerOptions = _this$props.tabBarhammerOptions,
                onTabClick = _this$props.onTabClick;

            if (children.length > pageSize) {
                return _react2['default'].createElement(_SwipeableInkTabBar2['default'], { onTabClick: onTabClick, speed: speed, pageSize: pageSize, hammerOptions: tabBarhammerOptions });
            }
            return _react2['default'].createElement(_InkTabBar2['default'], { inkBarAnimated: animated, onTabClick: onTabClick });
        };
        _this.renderTabContent = function () {
            var _this$props2 = _this.props,
                animated = _this$props2.animated,
                swipeable = _this$props2.swipeable,
                hammerOptions = _this$props2.hammerOptions;

            return swipeable ? _react2['default'].createElement(_SwipeableTabContent2['default'], { animated: animated, hammerOptions: hammerOptions }) : _react2['default'].createElement(_TabContent2['default'], { animated: animated });
        };
        return _this;
    }

    (0, _createClass3['default'])(Tabs, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_rcTabs2['default'], (0, _extends3['default'])({ renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent }, this.props));
        }
    }]);
    return Tabs;
}(_react2['default'].Component);

exports['default'] = Tabs;

Tabs.TabPane = _rcTabs.TabPane;
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
module.exports = exports['default'];