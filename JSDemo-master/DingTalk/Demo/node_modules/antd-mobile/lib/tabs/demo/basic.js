'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactNative = require('react-native');

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TabPane = _antdMobile.Tabs.TabPane; /* tslint:disable:no-console */

function onChange(key) {
  console.log('onChange', key);
}
function onTabClick(key) {
  console.log('onTabClick', key);
}

var BasicTabsExample = function (_React$Component) {
  (0, _inherits3['default'])(BasicTabsExample, _React$Component);

  function BasicTabsExample() {
    (0, _classCallCheck3['default'])(this, BasicTabsExample);
    return (0, _possibleConstructorReturn3['default'])(this, (BasicTabsExample.__proto__ || Object.getPrototypeOf(BasicTabsExample)).apply(this, arguments));
  }

  (0, _createClass3['default'])(BasicTabsExample, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _reactNative.View,
        { style: { flex: 1, paddingTop: 20 } },
        _react2['default'].createElement(
          _antdMobile.Tabs,
          { defaultActiveKey: '1', onChange: onChange, onTabClick: onTabClick },
          _react2['default'].createElement(
            TabPane,
            { tab: '\u9009\u9879\u5361\u4E00', key: '1' },
            _react2['default'].createElement(
              _reactNative.View,
              { style: { alignItems: 'center', justifyContent: 'center', height: 100 } },
              _react2['default'].createElement(
                _reactNative.Text,
                null,
                '\u9009\u9879\u5361\u4E00\u5185\u5BB9'
              )
            )
          ),
          _react2['default'].createElement(
            TabPane,
            { tab: '\u9009\u9879\u5361\u4E8C', key: '2' },
            _react2['default'].createElement(
              _reactNative.View,
              { style: { alignItems: 'center', justifyContent: 'center', height: 100 } },
              _react2['default'].createElement(
                _reactNative.Text,
                null,
                '\u9009\u9879\u5361\u4E8C\u5185\u5BB9'
              )
            )
          ),
          _react2['default'].createElement(
            TabPane,
            { tab: '\u9009\u9879\u5361\u4E09', key: '3' },
            _react2['default'].createElement(
              _reactNative.View,
              { style: { alignItems: 'center', justifyContent: 'center', height: 100 } },
              _react2['default'].createElement(
                _reactNative.Text,
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
}(_react2['default'].Component);

exports['default'] = BasicTabsExample;
module.exports = exports['default'];