'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactNative = require('react-native');

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = (0, _createReactClass2['default'])({
    displayName: 'basic',
    getInitialState: function getInitialState() {
        return {
            value: '美食'
        };
    },
    onChange: function onChange(value) {
        this.setState({ value: value });
    },
    clear: function clear() {
        this.setState({ value: '' });
    },
    render: function render() {
        return _react2['default'].createElement(
            _reactNative.View,
            { style: { marginTop: 30 } },
            _react2['default'].createElement(_antdMobile.SearchBar, { defaultValue: '\u521D\u59CB\u503C', placeholder: '\u641C\u7D22' }),
            _react2['default'].createElement(_antdMobile.SearchBar, { value: this.state.value, placeholder: '\u641C\u7D22', onSubmit: function onSubmit(value) {
                    return _reactNative.Alert.alert(value);
                }, onCancel: this.clear, onChange: this.onChange, showCancelButton: true })
        );
    }
});
module.exports = exports['default'];