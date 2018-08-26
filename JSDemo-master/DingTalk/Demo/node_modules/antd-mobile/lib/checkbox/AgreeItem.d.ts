/// <reference types="react" />
import React from 'react';
import { AgreeItemPropsType } from './PropsType';
import { ICheckboxStyle } from './style/index';
export interface IAgreeItemNativeProps extends AgreeItemPropsType {
    styles?: ICheckboxStyle;
}
export default class AgreeItem extends React.Component<IAgreeItemNativeProps, any> {
    static defaultProps: {
        styles: any;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
