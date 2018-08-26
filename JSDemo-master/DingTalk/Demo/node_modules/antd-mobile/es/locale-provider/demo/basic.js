import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View } from 'react-native';
import { Pagination, LocaleProvider, List, DatePicker, WhiteSpace, Button } from 'antd-mobile';
import moment from 'moment';
import enUS from '../en_US';
var maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
var minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
var Page = function Page() {
    return React.createElement(
        View,
        null,
        React.createElement(Pagination, { total: 5, current: 1 }),
        React.createElement(WhiteSpace, null),
        React.createElement(
            List,
            { style: { backgroundColor: 'white' } },
            React.createElement(
                DatePicker,
                { mode: 'date', title: '\u9009\u62E9\u65E5\u671F', extra: '\u70B9\u51FB\u67E5\u770B\u56FD\u9645\u5316', minDate: minDate, maxDate: maxDate },
                React.createElement(
                    List.Item,
                    { arrow: 'horizontal' },
                    '\u65E5\u671F'
                )
            )
        )
    );
};

var LocaleProviderExample = function (_React$Component) {
    _inherits(LocaleProviderExample, _React$Component);

    function LocaleProviderExample(props) {
        _classCallCheck(this, LocaleProviderExample);

        var _this = _possibleConstructorReturn(this, (LocaleProviderExample.__proto__ || Object.getPrototypeOf(LocaleProviderExample)).call(this, props));

        _this.handleClick = function () {
            _this.setState({
                isEnglish: !_this.state.isEnglish
            });
        };
        _this.state = {
            isEnglish: true
        };
        return _this;
    }

    _createClass(LocaleProviderExample, [{
        key: 'render',
        value: function render() {
            var locale = this.state.isEnglish ? enUS : undefined;
            return React.createElement(
                View,
                { style: { marginTop: 30 } },
                React.createElement(
                    Button,
                    { type: 'primary', onClick: this.handleClick },
                    this.state.isEnglish ? 'change to chinese' : '切换到英文'
                ),
                React.createElement(WhiteSpace, null),
                React.createElement(
                    LocaleProvider,
                    { locale: locale },
                    React.createElement(Page, null)
                )
            );
        }
    }]);

    return LocaleProviderExample;
}(React.Component);

export default LocaleProviderExample;