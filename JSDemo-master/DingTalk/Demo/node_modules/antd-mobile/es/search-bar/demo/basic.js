import React from 'react';
import createReactClass from 'create-react-class';
import { View, Alert } from 'react-native';
import { SearchBar } from 'antd-mobile';
export default createReactClass({
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
        return React.createElement(
            View,
            { style: { marginTop: 30 } },
            React.createElement(SearchBar, { defaultValue: '\u521D\u59CB\u503C', placeholder: '\u641C\u7D22' }),
            React.createElement(SearchBar, { value: this.state.value, placeholder: '\u641C\u7D22', onSubmit: function onSubmit(value) {
                    return Alert.alert(value);
                }, onCancel: this.clear, onChange: this.onChange, showCancelButton: true })
        );
    }
});