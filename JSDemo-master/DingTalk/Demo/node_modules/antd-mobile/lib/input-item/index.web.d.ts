/// <reference types="react" />
import React from 'react';
import InputItemProps from './PropsType';
declare class InputItem extends React.Component<InputItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        prefixListCls: string;
        type: string;
        editable: boolean;
        disabled: boolean;
        placeholder: string;
        clear: boolean;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        extra: string;
        onExtraClick: () => void;
        error: boolean;
        onErrorClick: () => void;
        labelNumber: number;
        updatePlaceholder: boolean;
    };
    static contextTypes: {
        antLocale: any;
    };
    debounceTimeout: any;
    scrollIntoViewTimeout: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    onInputChange: (e: any) => void;
    onInputFocus: (value: any) => void;
    onInputBlur: (value: any) => void;
    onExtraClick: (e: any) => void;
    onErrorClick: (e: any) => void;
    clearInput: () => void;
    focus: () => void;
    render(): JSX.Element;
}
export default InputItem;
