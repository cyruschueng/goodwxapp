import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:no-console */
import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'antd-mobile';
var TabPane = Tabs.TabPane;
function onChange(key) {
  console.log('onChange', key);
}
function onTabClick(key) {
  console.log('onTabClick', key);
}

var BasicTabsExample = function (_React$Component) {
  _inherits(BasicTabsExample, _React$Component);

  function BasicTabsExample() {
    _classCallCheck(this, BasicTabsExample);

    return _possibleConstructorReturn(this, (BasicTabsExample.__proto__ || Object.getPrototypeOf(BasicTabsExample)).apply(this, arguments));
  }

  _createClass(BasicTabsExample, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        View,
        { style: { flex: 1, paddingTop: 20 } },
        React.createElement(
          Tabs,
          { defaultActiveKey: '1', onChange: onChange, onTabClick: onTabClick },
          React.createElement(
            TabPane,
            { tab: '\u9009\u9879\u5361\u4E00', key: '1' },
            React.createElement(
              View,
              { style: { alignItems: 'center', justifyContent: 'center', height: 100 } },
              React.createElement(
                Text,
                null,
                '\u9009\u9879\u5361\u4E00\u5185\u5BB9'
              )
            )
          ),
          React.createElement(
            TabPane,
            { tab: '\u9009\u9879\u5361\u4E8C', key: '2' },
            React.createElement(
              View,
              { style: { alignItems: 'center', justifyContent: 'center', height: 100 } },
              React.createElement(
                Text,
                null,
                '\u9009\u9879\u5361\u4E8C\u5185\u5BB9'
              )
            )
          ),
          React.createElement(
            TabPane,
            { tab: '\u9009\u9879\u5361\u4E09', key: '3' },
            React.createElement(
              View,
              { style: { alignItems: 'center', justifyContent: 'center', height: 100 } },
              React.createElement(
                Text,
                null,
                '\u9009\u9879\u5361\u4E09\u5185\u5BB9'
              )
            )
          )
        )
      );
    }
  }]);

  return BasicTabsExample;
}(React.Component);

export default BasicTabsExample;