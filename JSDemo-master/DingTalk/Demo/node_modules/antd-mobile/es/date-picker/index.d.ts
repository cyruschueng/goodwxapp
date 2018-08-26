/// <reference types="react" />
import React from 'react';
import { IPickerStyle } from '../picker/style';
import tsPropsType from './PropsType';
export interface IDatePickerNativeProps extends tsPropsType {
    styles?: IPickerStyle;
}
export default class DatePicker extends React.Component<IDatePickerNativeProps, any> {
    static defaultProps: {
        mode: string;
        extra: string;
        onChange(): void;
        title: string;
        triggerType: string;
        styles: any;
        minuteStep: number;
    };
    static contextTypes: {
        antLocale: any;
    };
    render(): JSX.Element;
}
