/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */
import { View, Text, Alert } from 'react-native';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
/* tslint:disable:no-console */
export default (function () {
  return React.createElement(
    View,
    { style: { marginTop: 80 } },
    React.createElement(WhiteSpace, null),
    React.createElement(
      WingBlank,
      null,
      React.createElement(
        Button,
        { onClick: function onClick() {
            Alert.alert('Button', 'button clicked');
          } },
        'default button'
      ),
      React.createElement(WhiteSpace, null),
      React.createElement(
        Button,
        { type: 'primary' },
        'primary button'
      ),
      React.createElement(WhiteSpace, null),
      React.createElement(
        Button,
        { type: 'warning' },
        'warning button'
      ),
      React.createElement(WhiteSpace, null),
      React.createElement(
        Button,
        { disabled: true },
        'disable button'
      ),
      React.createElement(WhiteSpace, null),
      React.createElement(
        Button,
        { activeStyle: false },
        'no feedback'
      ),
      React.createElement(WhiteSpace, null),
      React.createElement(
        Button,
        { activeStyle: { backgroundColor: 'red' } },
        'custom feedback style'
      ),
      React.createElement(WhiteSpace, null),
      React.createElement(
        Button,
        { loading: true },
        'loading button'
      )
    ),
    React.createElement(
      WingBlank,
      { style: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement(
        Text,
        null,
        'small'
      ),
      React.createElement(
        Button,
        { type: 'ghost', size: 'small' },
        'ghost small button'
      )
    )
  );
});