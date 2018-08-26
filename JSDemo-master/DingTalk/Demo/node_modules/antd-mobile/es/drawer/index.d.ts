/// <reference types="react" />
import React from 'react';
import tsPropsType from './PropsType';
export default class Drawer extends React.Component<tsPropsType, any> {
    static defaultProps: {
        position: string;
        open: boolean;
        drawerWidth: number;
    };
    drawer: any;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    onOpenChange(isOpen: any): void;
    render(): JSX.Element;
}
