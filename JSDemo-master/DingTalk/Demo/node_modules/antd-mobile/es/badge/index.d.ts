/// <reference types="react" />
import React from 'react';
import { IBadgeStyle } from './style/index';
import BadgeProps from './PropsType';
export interface IBadgeNativeProps extends BadgeProps {
    styles?: IBadgeStyle;
}
export default class Badge extends React.Component<IBadgeNativeProps, any> {
    static defaultProps: {
        size: string;
        overflowCount: number;
        dot: boolean;
        corner: boolean;
        styles: any;
    };
    render(): JSX.Element;
}
