/// <reference types="react" />
import React from 'react';
import { SearchBarProps, SearchBarState } from './PropsType';
export default class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    static defaultProps: {
        prefixCls: string;
        placeholder: string;
        onSubmit: () => void;
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        onClear: () => void;
        showCancelButton: boolean;
        cancelText: string;
        disabled: boolean;
    };
    refs: any;
    rightBtnInitMarginleft: any;
    firstFocus: any;
    scrollIntoViewTimeout: any;
    blurFromOnClear: any;
    onBlurTimeout: any;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    onSubmit: (e: any) => void;
    onChange: (e: any) => void;
    onFocus: () => void;
    onBlur: () => void;
    onClear: () => void;
    doClear: (blurFromOnClear?: boolean) => void;
    onCancel: () => void;
    render(): JSX.Element;
}
