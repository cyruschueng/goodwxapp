'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var PopupExample = function (_React$Component) {
    (0, _inherits3['default'])(PopupExample, _React$Component);

    function PopupExample(props) {
        (0, _classCallCheck3['default'])(this, PopupExample);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (PopupExample.__proto__ || Object.getPrototypeOf(PopupExample)).call(this, props));

        _this.getPopupContent = function (num) {
            return _react2['default'].createElement(
                _reactNative.View,
                null,
                _react2['default'].createElement(
                    _antdMobile.List,
                    { renderHeader: function renderHeader() {
                            return '委托买入';
                        } },
                    _react2['default'].createElement(
                        _antdMobile.List.Item,
                        null,
                        '\u80A1\u7968\u540D\u79F0'
                    ),
                    _react2['default'].createElement(
                        _antdMobile.List.Item,
                        null,
                        '\u80A1\u7968\u4EE3\u7801'
                    ),
                    _react2['default'].createElement(
                        _antdMobile.List.Item,
                        null,
                        '\u4E70\u5165\u4EF7\u683C'
                    ),
                    _react2['default'].createElement(
                        _antdMobile.List.Item,
                        null,
                        '\u4E70\u5165\u6570\u91CF'
                    )
                ),
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: { padding: 10 } },
                    _react2['default'].createElement(
                        _reactNative.Text,
                        { style: { color: 'gray' } },
                        '\u6295\u8D44\u8BF4\u660E\u6295\u8D44\u8BF4\u660E...'
                    ),
                    _react2['default'].createElement(
                        _reactNative.Text,
                        { style: { color: 'gray' } },
                        '\u4EA4\u6613\u91D1\u989D\u4EE5\u5B9E\u9645\u6210\u4EA4\u4E3A\u51C6'
                    )
                ),
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: { padding: 6 } },
                    _react2['default'].createElement(
                        _antdMobile.Button,
                        { type: 'primary', onClick: function onClick() {
                                return _this.onClose('cancel', num);
                            } },
                        '\u4E70\u5165'
                    )
                )
            );
        };
        _this.showPopup = function () {
            _antdMobile.Popup.show(_this.getPopupContent(1), {
                maskClosable: true,
                animationType: 'slide-up',
                onMaskClose: function onMaskClose() {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1000);
                    });
                }
            });
        };
        _this.state = {
            sel0: '',
            sel1: ''
        };
        return _this;
    }

    (0, _createClass3['default'])(PopupExample, [{
        key: 'onClose',
        value: function onClose(sel, num) {
            this.setState((0, _defineProperty3['default'])({}, 'sel' + num, sel));
            _antdMobile.Popup.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2['default'].createElement(
                _reactNative.View,
                { style: { marginTop: 30, paddingHorizontal: 30 } },
                _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                _react2['default'].createElement(
                    _antdMobile.Button,
                    { onClick: function onClick() {
                            return _antdMobile.Popup.show(_this2.getPopupContent(0));
                        } },
                    '\u5411\u4E0B\u5F39\u51FA\u6548\u679C'
                ),
                _react2['default'].createElement(_antdMobile.WhiteSpace, null),
                _react2['default'].createElement(
                    _antdMobile.Button,
                    { onClick: this.showPopup },
                    '\u5411\u4E0A\u5F39\u51FA\u6548\u679C'
                )
            );
        }
    }]);
    return PopupExample;
}(_react2['default'].Component);

exports['default'] = PopupExample;
module.exports = exports['default'];