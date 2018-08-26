/// <reference types="react" />
import React from 'react';
import { CardHeaderProps } from './PropsType';
export default class CardHeader extends React.Component<CardHeaderProps, any> {
    static defaultProps: {
        prefixCls: string;
        thumbStyle: {};
    };
    render(): JSX.Element;
}
