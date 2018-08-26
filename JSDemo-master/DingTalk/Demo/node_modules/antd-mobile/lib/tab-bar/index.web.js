'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = undefined;

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

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _Tab = require('./Tab.web');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabContent = require('rc-tabs/lib/TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var _TabBar = require('rc-tabs/lib/TabBar');

var _TabBar2 = _interopRequireDefault(_TabBar);

var _getDataAttr = require('../_util/getDataAttr');

var _getDataAttr2 = _interopRequireDefault(_getDataAttr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Item = exports.Item = function (_React$Component) {
    (0, _inherits3['default'])(Item, _React$Component);

    function Item() {
        (0, _classCallCheck3['default'])(this, Item);
        return (0, _possibleConstructorReturn3['default'])(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Item, [{
        key: 'render',
        value: function render() {
            return null;
        }
    }]);
    return Item;
}(_react2['default'].Component);

var AntTabBar = function (_React$Component2) {
    (0, _inherits3['default'])(AntTabBar, _React$Component2);

    function AntTabBar() {
        (0, _classCallCheck3['default'])(this, AntTabBar);

        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (AntTabBar.__proto__ || Object.getPrototypeOf(AntTabBar)).apply(this, arguments));

        _this2.onChange = function (key) {
            _react2['default'].Children.forEach(_this2.props.children, function (c) {
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
            return _react2['default'].createElement(_TabBar2['default'], { className: barCls, style: { backgroundColor: barTintColor } });
        };
        _this2.renderTabContent = function () {
            return _react2['default'].createElement(_TabContent2['default'], { animated: false });
        };
        return _this2;
    }

    (0, _createClass3['default'])(AntTabBar, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var activeKey = void 0;
            var children = [];
            var _allKeys = [];
            _react2['default'].Children.forEach(this.props.children, function (c) {
                var hasKey = !!c.key;
                var isUnique = _allKeys.indexOf(c.key) === -1;
                (0, _warning2['default'])(hasKey && isUnique, 'TabBar.Item must have a unique key!');
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
                var tab = _react2['default'].createElement(_Tab2['default'], { prefixCls: _this3.props.prefixCls + '-tab', badge: cProps.badge, dot: cProps.dot, selected: cProps.selected, icon: cProps.icon, selectedIcon: cProps.selectedIcon, title: cProps.title, tintColor: tintColor, unselectedTintColor: unselectedTintColor, dataAttrs: (0, _getDataAttr2['default'])(cProps) });
                return _react2['default'].createElement(
                    _rcTabs.TabPane,
                    { placeholder: _this3.props.placeholder, tab: tab, key: c.key },
                    cProps.children
                );
            });
            return _react2['default'].createElement(
                _rcTabs2['default'],
                { renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent, tabBarPosition: 'bottom', prefixCls: this.props.prefixCls, activeKey: activeKey, onChange: this.onChange },
                panels
            );
        }
    }]);
    return AntTabBar;
}(_react2['default'].Component);

AntTabBar.defaultProps = {
    prefixCls: 'am-tab-bar',
    barTintColor: 'white',
    tintColor: '#108ee9',
    hidden: false,
    unselectedTintColor: '#888',
    placeholder: '正在加载'
};
AntTabBar.Item = Item;
exports['default'] = AntTabBar;