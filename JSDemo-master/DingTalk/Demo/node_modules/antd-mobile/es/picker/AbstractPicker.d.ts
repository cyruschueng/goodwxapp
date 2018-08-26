/// <reference types="react" />
import React from 'react';
import tsPropsType from './PropsType';
export declare function getDefaultProps(): {
    triggerType: string;
    prefixCls: string;
    pickerPrefixCls: string;
    popupPrefixCls: string;
    format: (values: any) => any;
    cols: number;
    cascade: boolean;
    extra: string;
    okText: string;
    dismissText: string;
    title: string;
};
export default abstract class AbstractPicker extends React.Component<tsPropsType, any> {
    protected abstract popupProps: {};
    getSel: () => void | undefined;
    getPickerCol: () => any;
    render(): JSX.Element;
}
