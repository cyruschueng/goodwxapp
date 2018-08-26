/// <reference types="react" />
import React from 'react';
import { TextInputProperties } from 'react-native';
export interface TextInputProps extends TextInputProperties {
    ref?: any;
    focused?: boolean;
}
declare class Input extends React.Component<TextInputProps, any> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    focus: () => void;
    render(): JSX.Element;
}
export default Input;
