/// <reference types="react" />
import React from 'react';
import tsPropsType from './PropsType';
export default class DatePicker extends React.Component<tsPropsType, any> {
    static defaultProps: {
        mode: string;
        extra: string;
        onChange(): void;
        title: string;
        prefixCls: string;
        pickerPrefixCls: string;
        popupPrefixCls: string;
        minuteStep: number;
    };
    static contextTypes: {
        antLocale: any;
    };
    render(): JSX.Element;
}
