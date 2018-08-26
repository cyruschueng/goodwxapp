/// <reference types="react" />
import React from 'react';
import { ButtonProps } from './PropsType';
export default class Button extends React.Component<ButtonProps, any> {
    static defaultProps: {
        pressIn: boolean;
        disabled: boolean;
        activeStyle: {};
        loading: boolean;
        onClick: (_x?: any) => void;
        onPressIn: (_x?: any) => void;
        onPressOut: (_x?: any) => void;
        onShowUnderlay: (_x?: any) => void;
        onHideUnderlay: (_x?: any) => void;
        styles: any;
    };
    constructor(props: any);
    onPressIn: (...arg: any[]) => void;
    onPressOut: (...arg: any[]) => void;
    onShowUnderlay: (...arg: any[]) => void;
    onHideUnderlay: (...arg: any[]) => void;
    render(): JSX.Element;
}
