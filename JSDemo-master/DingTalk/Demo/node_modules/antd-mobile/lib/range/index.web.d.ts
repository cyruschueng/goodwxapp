/// <reference types="react" />
import React from 'react';
import RangeProps from './PropsType';
export default class Range extends React.Component<RangeProps, any> {
    static defaultProps: {
        prefixCls: string;
    };
    render(): JSX.Element;
}
