/// <reference types="react" />
import React from 'react';
import { ButtonProps } from './PropsType';
declare class Button extends React.Component<ButtonProps, any> {
    static defaultProps: {
        prefixCls: string;
        size: string;
        inline: boolean;
        across: boolean;
        disabled: boolean;
        loading: boolean;
        activeStyle: {};
    };
    render(): JSX.Element;
}
export default Button;
