/// <reference types="react" />
import React from 'react';
import { CheckboxItemProps } from './PropsType';
import { ICheckboxStyle } from './style/index';
export interface ICheckboxItemNativeProps extends CheckboxItemProps {
    styles?: ICheckboxStyle;
}
export default class CheckboxItem extends React.Component<ICheckboxItemNativeProps, any> {
    static defaultProps: {
        styles: any;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
