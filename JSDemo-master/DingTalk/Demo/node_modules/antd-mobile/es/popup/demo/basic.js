import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View, Text } from 'react-native';
import { Popup, WhiteSpace, Button, List } from 'antd-mobile';

var PopupExample = function (_React$Component) {
    _inherits(PopupExample, _React$Component);

    function PopupExample(props) {
        _classCallCheck(this, PopupExample);

        var _this = _possibleConstructorReturn(this, (PopupExample.__proto__ || Object.getPrototypeOf(PopupExample)).call(this, props));

        _this.getPopupContent = function (num) {
            return React.createElement(
                View,
                null,
                React.createElement(
                    List,
                    { renderHeader: function renderHeader() {
                            return '委托买入';
                        } },
                    React.createElement(
                        List.Item,
                        null,
                        '\u80A1\u7968\u540D\u79F0'
                    ),
                    React.createElement(
                        List.Item,
                        null,
                        '\u80A1\u7968\u4EE3\u7801'
                    ),
                    React.createElement(
                        List.Item,
                        null,
                        '\u4E70\u5165\u4EF7\u683C'
                    ),
                    React.createElement(
                        List.Item,
                        null,
                        '\u4E70\u5165\u6570\u91CF'
                    )
                ),
                React.createElement(
                    View,
                    { style: { padding: 10 } },
                    React.createElement(
                        Text,
                        { style: { color: 'gray' } },
                        '\u6295\u8D44\u8BF4\u660E\u6295\u8D44\u8BF4\u660E...'
                    ),
                    React.createElement(
                        Text,
                        { style: { color: 'gray' } },
                        '\u4EA4\u6613\u91D1\u989D\u4EE5\u5B9E\u9645\u6210\u4EA4\u4E3A\u51C6'
                    )
                ),
                React.createElement(
                    View,
                    { style: { padding: 6 } },
                    React.createElement(
                        Button,
                        { type: 'primary', onClick: function onClick() {
                                return _this.onClose('cancel', num);
                            } },
                        '\u4E70\u5165'
                    )
                )
            );
        };
        _this.showPopup = function () {
            Popup.show(_this.getPopupContent(1), {
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

    _createClass(PopupExample, [{
        key: 'onClose',
        value: function onClose(sel, num) {
            this.setState(_defineProperty({}, 'sel' + num, sel));
            Popup.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                View,
                { style: { marginTop: 30, paddingHorizontal: 30 } },
                React.createElement(WhiteSpace, null),
                React.createElement(
                    Button,
                    { onClick: function onClick() {
                            return Popup.show(_this2.getPopupContent(0));
                        } },
                    '\u5411\u4E0B\u5F39\u51FA\u6548\u679C'
                ),
                React.createElement(WhiteSpace, null),
                React.createElement(
                    Button,
                    { onClick: this.showPopup },
                    '\u5411\u4E0A\u5F39\u51FA\u6548\u679C'
                )
            );
        }
    }]);

    return PopupExample;
}(React.Component);

export default PopupExample;