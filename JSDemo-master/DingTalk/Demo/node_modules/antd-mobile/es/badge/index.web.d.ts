/// <reference types="react" />
import React from 'react';
import BadgeProps from './PropsType';
export default class Badge extends React.Component<BadgeProps, any> {
    static defaultProps: {
        prefixCls: string;
        size: string;
        overflowCount: number;
        dot: boolean;
        corner: boolean;
    };
    render(): JSX.Element;
}
