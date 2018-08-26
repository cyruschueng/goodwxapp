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

var BasicModalExample = function (_React$Component) {
    (0, _inherits3['default'])(BasicModalExample, _React$Component);

    function BasicModalExample(props) {
        (0, _classCallCheck3['default'])(this, BasicModalExample);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (BasicModalExample.__proto__ || Object.getPrototypeOf(BasicModalExample)).call(this, props));

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
            _antdMobile.Modal.alert('标题', 'alert 内容内容', [{ text: 'Cancel', onPress: function onPress() {
                    return console.log('cancel');
                }, style: 'cancel' }, { text: 'OK', onPress: function onPress() {
                    return console.log('ok');
                } }]);
        };
        _this.onButtonClick2 = function () {
            _antdMobile.Modal.operation([{ text: '标为未读', onPress: function onPress() {
                    return console.log('标为未读被点击了');
                } }, { text: '置顶聊天', onPress: function onPress() {
                    return console.log('置顶聊天被点击了');
                } }]);
        };
        _this.onButtonClick3 = function () {
            _antdMobile.Modal.prompt('登录', '输入用户名和密码', function (login, password) {
                return console.log('login: ' + login + ', password: ' + password);
            }, 'login-password', null, ['请输入用户名', '请输入密码']);
        };
        _this.onButtonClick4 = function () {
            _antdMobile.Modal.prompt('输入密码', '这是密码message,可以不要', function (password) {
                return console.log('password: ' + password);
            }, 'secure-text', 'defaultValue');
        };
        _this.onButtonClick5 = function () {
            _antdMobile.Modal.prompt('输入姓名', '这是姓名message,可以不要', function (password) {
                return console.log('password: ' + password);
            }, 'default', null, ['请输入姓名']);
        };
        _this.state = {
            visible: false,
            visible2: false
        };
        return _this;
    }

    (0, _createClass3['default'])(BasicModalExample, [{
        key: 'render',
        value: function render() {
            var footerButtons = [{ text: 'Cancel', onPress: function onPress() {
                    return console.log('cancel');
                } }, { text: 'Ok', onPress: function onPress() {
                    return console.log('ok');
                } }];
            return _react2['default'].createElement(
                _reactNative.View,
                { style: { paddingTop: 30, marginTop: 64 } },
                _react2['default'].createElement(
                    _antdMobile.WingBlank,
                    null,
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.showModal },
                        '\u663E\u793A\u5BF9\u8BDD\u6846'
                    ),
                    _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.showModal2 },
                        '\u663E\u793A\u5168\u5C4F\u5BF9\u8BDD\u6846'
                    ),
                    _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.onButtonClick },
                        '\u663E\u793A Modal.alert'
                    ),
                    _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.onButtonClick2 },
                        '\u663E\u793A Modal.opertation'
                    ),
                    _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.onButtonClick5 },
                        '\u663E\u793A Modal.prompt (default)'
                    ),
                    _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.onButtonClick3 },
                        '\u663E\u793A Modal.prompt (login-password)'
                    ),
                    _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { onClick: this.onButtonClick4 },
                        '\u663E\u793A Modal.prompt (secure-text)'
                    )
                ),
                _react2['default'].createElement(
                    _antdMobile.Modal,
                    { transparent: false, visible: this.state.visible2, animationType: 'slide-up', onClose: this.onClose2 },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: { paddingVertical: 220 } },
                        _react2['default'].createElement(
                            _reactNative.Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        ),
                        _react2['default'].createElement(
                            _reactNative.Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        )
                    ),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { type: 'primary', inline: true, onClick: this.onClose2 },
                        'close modal'
                    )
                ),
                _react2['default'].createElement(
                    _antdMobile.Modal,
                    { title: '\u6D4B\u8BD5', transparent: true, onClose: this.onClose, maskClosable: true, visible: this.state.visible, closable: true, footer: footerButtons },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: { paddingVertical: 20 } },
                        _react2['default'].createElement(
                            _reactNative.Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        ),
                        _react2['default'].createElement(
                            _reactNative.Text,
                            { style: { textAlign: 'center' } },
                            '\u8FD9\u662F\u5185\u5BB9...'
                        )
                    ),
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { type: 'primary', inline: true, onClick: this.onClose },
                        'close modal'
                    )
                )
            );
        }
    }]);
    return BasicModalExample;
}(_react2['default'].Component); /* tslint:disable:no-console */


exports['default'] = BasicModalExample;
module.exports = exports['default'];