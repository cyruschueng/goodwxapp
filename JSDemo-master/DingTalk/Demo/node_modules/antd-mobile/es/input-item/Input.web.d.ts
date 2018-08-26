/// <reference types="react" />
import React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    focused?: boolean;
}
declare class Input extends React.Component<InputProps, any> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    onInputBlur: (e: any) => void;
    onInputFocus: (e: any) => void;
    focus: () => void;
    render(): JSX.Element;
}
export default Input;
