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

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactNative = require('react-native');

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var styles = _reactNative.StyleSheet.create({
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
    (0, _inherits3['default'])(Row, _React$Component);

    function Row() {
        (0, _classCallCheck3['default'])(this, Row);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));

        _this.onClick = function () {
            _this.props.onClick(_this.props.data);
        };
        return _this;
    }

    (0, _createClass3['default'])(Row, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _reactNative.TouchableWithoutFeedback,
                { onPress: this.onClick },
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: styles.row },
                    _react2['default'].createElement(
                        _reactNative.Text,
                        { style: styles.text },
                        this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'
                    )
                )
            );
        }
    }]);
    return Row;
}(_react2['default'].Component);

exports['default'] = (0, _createReactClass2['default'])({
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
            return _react2['default'].createElement(Row, { key: ii, data: row, onClick: _this2.onClick });
        });
        var rcEl = _react2['default'].createElement(_antdMobile.RefreshControl, { refreshing: this.state.isRefreshing, onRefresh: this.onRefresh, tintColor: '#ff0000', title: 'Loading...', titleColor: '#00ff00', colors: ['#ff0000', '#00ff00', '#0000ff'], progressBackgroundColor: '#ffff00' });
        // Todo https://github.com/DefinitelyTyped/DefinitelyTyped
        return _react2['default'].createElement(
            _reactNative.ScrollView,
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
var title = exports.title = 'RefreshControl';
var description = exports.description = 'RefreshControl example';