/// <reference types="react" />
import React from 'react';
import { ListItemProps, BriefProps } from './PropsType';
export declare class Brief extends React.Component<BriefProps, any> {
    render(): JSX.Element;
}
export default class Item extends React.Component<ListItemProps, any> {
    static defaultProps: Partial<ListItemProps>;
    static Brief: typeof Brief;
    render(): JSX.Element;
}
