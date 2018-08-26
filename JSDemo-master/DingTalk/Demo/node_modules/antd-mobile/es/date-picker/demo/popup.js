import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:no-console */
import { View } from 'react-native';
import { DatePicker, List } from 'antd-mobile';
import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
var defaultDate = moment().locale('zh-cn').utcOffset(8);

var PopupExample = function (_React$Component) {
    _inherits(PopupExample, _React$Component);

    function PopupExample(props) {
        _classCallCheck(this, PopupExample);

        var _this = _possibleConstructorReturn(this, (PopupExample.__proto__ || Object.getPrototypeOf(PopupExample)).call(this, props));

        _this.onChange = function (value) {
            _this.setState({ value: value });
        };
        _this.state = {
            value: undefined
        };
        return _this;
    }

    _createClass(PopupExample, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                View,
                null,
                React.createElement(
                    List,
                    null,
                    React.createElement(
                        DatePicker,
                        { defaultDate: defaultDate, value: this.state.value, mode: 'date', minDate: this.date1MinDate || (this.date1MinDate = moment('2015-08-06', 'YYYY-MM-DD')), maxDate: this.date1MaxDate || (this.date1MaxDate = moment('2016-12-06', 'YYYY-MM-DD')), onChange: this.onChange, format: function format(val) {
                                return val.fromNow();
                            } },
                        React.createElement(
                            List.Item,
                            { arrow: 'horizontal' },
                            '\u9009\u62E9\u65F6\u95F4'
                        )
                    )
                )
            );
        }
    }]);

    return PopupExample;
}(React.Component);

export default PopupExample;