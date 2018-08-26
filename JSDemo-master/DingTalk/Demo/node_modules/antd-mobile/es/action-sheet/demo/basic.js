import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { ActionSheet, Button } from 'antd-mobile';

var Test = function (_React$Component) {
    _inherits(Test, _React$Component);

    function Test() {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));

        _this.state = {
            clicked: 'none',
            text: ''
        };
        _this.showActionSheet = function () {
            var BUTTONS = ['操作一', '操作二', '操作三', '删除', '取消'];
            ActionSheet.showActionSheetWithOptions({
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
                excludedActivityTypes: [React.createElement(
                    Button,
                    { key: '0', onClick: function onClick() {
                            return ActionSheet.close();
                        } },
                    'close ActionSheet'
                )],
                subject: null
            };
            if (Platform.OS === 'ios') {
                opts.subject = 'a subject to go in the email heading';
                opts.excludedActivityTypes = ['com.apple.UIKit.activity.PostToTwitter'];
            }
            ActionSheet.showShareActionSheetWithOptions(opts, function (error) {
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

    _createClass(Test, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                View,
                { style: { marginTop: 30 } },
                React.createElement(
                    View,
                    { style: [{ padding: 8 }] },
                    React.createElement(
                        Button,
                        { onClick: this.showActionSheet },
                        '\u9ED8\u8BA4\u72B6\u6001\u64CD\u4F5C\u5217\u8868'
                    )
                ),
                React.createElement(
                    Text,
                    { style: [{ padding: 8 }] },
                    '\u70B9\u51FB\u8FC7\u7684\u6309\u94AE: ',
                    this.state.clicked
                ),
                React.createElement(
                    View,
                    { style: [{ padding: 8 }] },
                    React.createElement(
                        Button,
                        { onClick: this.showShareActionSheet },
                        '\u5E26\u5206\u4EAB\u529F\u80FD\u7684\u64CD\u4F5C\u5217\u8868'
                    )
                ),
                React.createElement(
                    Text,
                    { style: [{ padding: 8 }] },
                    this.state.text
                )
            );
        }
    }]);

    return Test;
}(React.Component);

export default Test;

export var title = 'ActionSheet';
export var description = 'ActionSheet example';