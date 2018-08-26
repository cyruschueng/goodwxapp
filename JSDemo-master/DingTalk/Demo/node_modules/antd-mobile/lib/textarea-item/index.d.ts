/// <reference types="react" />
import React from 'react';
import TextAreaItemProps from './PropsType';
import { ITextareaItemStyle } from './style/index';
export interface ITextareaItemNativeProps extends TextAreaItemProps {
    styles?: ITextareaItemStyle;
}
export default class TextAreaItem extends React.Component<ITextareaItemNativeProps, any> {
    static defaultProps: {
        onChange(): void;
        onFocus(): void;
        onBlur(): void;
        onErrorClick(): void;
        clear: boolean;
        error: boolean;
        editable: boolean;
        rows: number;
        count: number;
        keyboardType: string;
        autoHeight: boolean;
        last: boolean;
        styles: any;
    };
    constructor(props: any);
    onChange: (event: any) => void;
    render(): JSX.Element;
}
