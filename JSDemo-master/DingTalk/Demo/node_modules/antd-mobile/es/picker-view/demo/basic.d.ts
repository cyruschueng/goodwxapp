/// <reference types="react" />
import React from 'react';
export default class PickerViewExample extends React.Component<any, any> {
    state: {
        value: null;
    };
    onChange: (value: any) => void;
    render(): JSX.Element;
}
