import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import createReactClass from 'create-react-class';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { RefreshControl } from 'antd-mobile';
var styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5
    },
    text: {
        alignSelf: 'center',
        color: '#fff'
    },
    scrollview: {
        flex: 1
    }
});

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));

        _this.onClick = function () {
            _this.props.onClick(_this.props.data);
        };
        return _this;
    }

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                TouchableWithoutFeedback,
                { onPress: this.onClick },
                React.createElement(
                    View,
                    { style: styles.row },
                    React.createElement(
                        Text,
                        { style: styles.text },
                        this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'
                    )
                )
            );
        }
    }]);

    return Row;
}(React.Component);

export default createReactClass({
    displayName: 'basic',
    getInitialState: function getInitialState() {
        return {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map(function (_val, i) {
                return { text: 'Initial row ' + i, clicks: 0 };
            })
        };
    },
    onClick: function onClick(row) {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData
        });
    },
    render: function render() {
        var _this2 = this;

        var rows = this.state.rowData.map(function (row, ii) {
            return React.createElement(Row, { key: ii, data: row, onClick: _this2.onClick });
        });
        var rcEl = React.createElement(RefreshControl, { refreshing: this.state.isRefreshing, onRefresh: this.onRefresh, tintColor: '#ff0000', title: 'Loading...', titleColor: '#00ff00', colors: ['#ff0000', '#00ff00', '#0000ff'], progressBackgroundColor: '#ffff00' });
        // Todo https://github.com/DefinitelyTyped/DefinitelyTyped
        return React.createElement(
            ScrollView,
            { style: styles.scrollview, refreshControl: rcEl },
            rows
        );
    },
    onRefresh: function onRefresh() {
        var _this3 = this;

        this.setState({ isRefreshing: true });
        setTimeout(function () {
            // prepend 10 items
            var rowData = Array.from(new Array(10)).map(function (_val, i) {
                return {
                    text: 'Loaded row ' + (+_this3.state.loaded + i),
                    clicks: 0
                };
            }).concat(_this3.state.rowData);
            _this3.setState({
                loaded: _this3.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData
            });
        }, 1000);
    }
});
export var title = 'RefreshControl';
export var description = 'RefreshControl example';