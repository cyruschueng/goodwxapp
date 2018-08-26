/// <reference types="react" />
import React from 'react';
import { SearchBarProps, SearchBarState } from './PropsType';
import { ISearchBarStyle } from './style';
export interface ISearchBarNativeProps extends SearchBarProps {
    styles: ISearchBarStyle;
}
export default class SearchBar extends React.Component<ISearchBarNativeProps, SearchBarState> {
    static defaultProps: {
        styles: any;
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
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    onSubmit: (e: any) => void;
    onChangeText: (value: any) => void;
    onCancel: () => void;
    onFocus: () => void;
    onBlur: () => void;
    render(): JSX.Element;
}
