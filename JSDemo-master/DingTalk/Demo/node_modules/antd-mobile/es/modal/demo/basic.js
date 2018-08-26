import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:no-console */
import React from 'react';
import { View, Text } from 'react-native';
import { Modal, Button, WingBlank, WhiteSpace } from 'antd-mobile';

var BasicModalExample = function (_React$Component) {
    _inherits(BasicModalExample, _React$Component);

    function BasicModalExample(props) {
        _classCallCheck(this, BasicModalExample);

        var _this = _possibleConstructorReturn(this, (BasicModalExample.__proto__ || Object.getPrototypeOf(BasicModalExample)).call(this, props));

        _this.showModal = function () {
            _this.setState({
                visible: true
            });
        };
        _this.showModal2 = function () {
            _this.setState({
                visible2: true
            });
        };
        _this.onClose = function () {
            _this.setState({
                visible: false
            });
        };
        _this.onClose2 = function () {
            _this.setState({
                visible2: false
            });
        };
        _this.onButtonClick = function () {
            Modal.alert('标题', 'alert 内容内容', [{ text: 'Cancel', onPress: function onPress() {
                    return console.log('cancel');
                }, style: 'cancel' }, { text: 'OK', onPress: function onPress() {
                    return console.log('ok');
                } }]);
        };
        _this.onButtonClick2 = function () {
            Modal.operation([{ text: '标为未读', onPress: function onPress() {
                    return console.log('标为未读被点击了');
                } }, { text: '置顶聊天', onPress: function onPress() {
                    return console.log('置顶聊天被点击了');
                } }]);
        };
        _this.onButtonClick3 = function () {
            Modal.prompt('登录', '输入用户名和密码', function (login, password) {
                return console.log('login: ' + login + ', password: ' + password);
            }, 'login-password', null, ['请输入用户名', '请输入密码']);
        };
        _this.onButtonClick4 = function () {
            Modal.prompt('输入密码', '这是密码message,可以不要', function (password) {
                return console.log('password: ' + password);
            }, 'secure-text', 'defaultValue');
        };
        _this.onButtonClick5 = function () {
            Modal.prompt('输入姓名', '这是姓名message,可以不要', function (password) {
                return console.log('password: ' + password);
            }, 'default', null, ['请输入姓名']);
        };
        _this.state = {
            visible: false,
            visible2: false
        };
        return _this;
    }

    _createClass(BasicModalExample, [{
        key: 'render',
        value: function render() {
            var footerButtons = [{ text: 'Cancel', onPress: function onPress() {
                    return console.log('cancel');
                } }, { text: 'Ok', onPress: function onPress() {
                    return console.log('ok');
                } }];
            return React.createElement(
                View,
                { style: { paddingTop: 30, marginTop: 64 } },
                React.createElement(
                    WingBlank,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.showModal },
                        '\u663E\u793A\u5BF9\u8BDD\u6846'
                    ),
                    React.createElement(WhiteSpace, null),
                    React.createElement(
                        Button,
                        { onClick: this.showModal2 },
                        '\u663E\u793A\u5168\u5C4F\u5BF9\u8BDD\u6846'
                    ),
                    React.createElement(WhiteSpace, null),
                    React.createElement(
                        Button,
                        { onClick: this.onButtonClick },
                        '\u663E\u793A Modal.alert'
                    ),
                    React.createElement(WhiteSpace, null),
                    React.createElement(
                        Button,
                        { onClick: this.onButtonClick2 },
                        '\u663E\u793A Modal.opertation'
                    ),
                    React.createElement(WhiteSpace, null),
                    React.createElement(
                        Button,
                        { onClick: this.onButtonClick5 },
                        '\u663E\u793A Modal.prompt (default)'
                    ),
                    React.createElement(WhiteSpace, null),
                    React.createElement(
                        Button,
                        { onClick: this.onButtonClick3 },
                        '\u663E\u793A Modal.prompt (login-password)'
                    ),
                    React.createElement(WhiteSpace, null),
                    React.createElement(
                        Button,
                        { onClick: this.onButtonClick4 },
                        '\u663E\u793A Modal.prompt (secure-text)'
                    )
                ),
                React.createElement(
                    Modal,
                    { transparent: false, visible: this.state.visible2, animationType: 'slide-up', onClose: this.onClose2 },
                    React.createElement(
                        View,
                        { style: { paddingVertical: 220 } },
                        React.createElement(
                            Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        ),
                        React.createElement(
                            Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        )
                    ),
                    React.createElement(
                        Button,
                        { type: 'primary', inline: true, onClick: this.onClose2 },
                        'close modal'
                    )
                ),
                React.createElement(
                    Modal,
                    { title: '\u6D4B\u8BD5', transparent: true, onClose: this.onClose, maskClosable: true, visible: this.state.visible, closable: true, footer: footerButtons },
                    React.createElement(
                        View,
                        { style: { paddingVertical: 20 } },
                        React.createElement(
                            Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        ),
                        React.createElement(
                            Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        )
                    ),
                    React.createElement(
                        Button,
                        { type: 'primary', inline: true, onClick: this.onClose },
                        'close modal'
                    )
                )
            );
        }
    }]);

    return BasicModalExample;
}(React.Component);

export default BasicModalExample;