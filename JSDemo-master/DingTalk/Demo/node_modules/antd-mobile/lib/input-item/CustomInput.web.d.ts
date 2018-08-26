/// <reference types="react" />
import React from 'react';
declare class NumberInput extends React.Component<any, any> {
    static defaultProps: {
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        placeholder: string;
        value: string;
        disabled: boolean;
        editable: boolean;
        prefixCls: string;
        keyboardPrefixCls: string;
    };
    debounceFocusTimeout: any;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getComponent: () => JSX.Element;
    renderCustomKeyboard: () => void;
    _blurEventListener: (ev: any) => void;
    unLinkInput: () => void;
    onInputBlur: (value: any) => void;
    onInputFocus: (value: any) => void;
    onKeyboardClick: (KeyboardItemValue: any) => void;
    onFakeInputClick: () => void;
    focus: () => void;
    render(): JSX.Element;
}
export default NumberInput;
