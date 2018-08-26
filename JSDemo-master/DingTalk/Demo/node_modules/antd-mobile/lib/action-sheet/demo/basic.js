'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.description = exports.title = undefined;

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

var Test = function (_React$Component) {
    (0, _inherits3['default'])(Test, _React$Component);

    function Test() {
        (0, _classCallCheck3['default'])(this, Test);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));

        _this.state = {
            clicked: 'none',
            text: ''
        };
        _this.showActionSheet = function () {
            var BUTTONS = ['操作一', '操作二', '操作三', '删除', '取消'];
            _antdMobile.ActionSheet.showActionSheetWithOptions({
                title: '标题',
                message: '我是描述我是描述',
                options: BUTTONS,
                cancelButtonIndex: 4,
                destructiveButtonIndex: 3
            }, function (buttonIndex) {
                _this.setState({ clicked: BUTTONS[buttonIndex] });
            });
        };
        _this.showShareActionSheet = function () {
            var opts = {
                url: 'https://www.alipay.com/',
                message: 'message to go with the shared url',
                excludedActivityTypes: [_react2['default'].createElement(
                    _antdMobile.Button,
                    { key: '0', onClick: function onClick() {
                            return _antdMobile.ActionSheet.close();
                        } },
                    'close ActionSheet'
                )],
                subject: null
            };
            if (_reactNative.Platform.OS === 'ios') {
                opts.subject = 'a subject to go in the email heading';
                opts.excludedActivityTypes = ['com.apple.UIKit.activity.PostToTwitter'];
            }
            _antdMobile.ActionSheet.showShareActionSheetWithOptions(opts, function (error) {
                return alert(error);
            }, function (success, method) {
                var text = void 0;
                if (success) {
                    text = '\u901A\u8FC7 ' + method + ' \u5206\u4EAB';
                } else {
                    text = '您没有分享';
                }
                _this.setState({ text: text });
            });
        };
        return _this;
    }

    (0, _createClass3['default'])(Test, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _reactNative.View,
                { style: { marginTop: 30 } },
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: [{ padding: 8 }] },
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.showActionSheet },
                        '\u9ED8\u8BA4\u72B6\u6001\u64CD\u4F5C\u5217\u8868'
                    )
                ),
                _react2['default'].createElement(
                    _reactNative.Text,
                    { style: [{ padding: 8 }] },
                    '\u70B9\u51FB\u8FC7\u7684\u6309\u94AE: ',
                    this.state.clicked
                ),
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: [{ padding: 8 }] },
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.showShareActionSheet },
                        '\u5E26\u5206\u4EAB\u529F\u80FD\u7684\u64CD\u4F5C\u5217\u8868'
                    )
                ),
                _react2['default'].createElement(
                    _reactNative.Text,
                    { style: [{ padding: 8 }] },
                    this.state.text
                )
            );
        }
    }]);
    return Test;
}(_react2['default'].Component);

exports['default'] = Test;
var title = exports.title = 'ActionSheet';
var description = exports.description = 'ActionSheet example';