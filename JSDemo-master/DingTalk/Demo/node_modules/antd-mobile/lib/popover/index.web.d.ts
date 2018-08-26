/// <reference types="react" />
import React from 'react';
import Item from './Item.web';
import tsPropsType from './PropsType';
export default class Popover extends React.Component<tsPropsType, any> {
    static defaultProps: {
        prefixCls: string;
        placement: string;
        align: {
            overflow: {
                adjustY: number;
                adjustX: number;
            };
        };
        trigger: string[];
    };
    static Item: typeof Item;
    render(): JSX.Element;
}
