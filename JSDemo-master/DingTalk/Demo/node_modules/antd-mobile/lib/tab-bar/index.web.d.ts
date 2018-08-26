/// <reference types="react" />
import React from 'react';
import { TabBarProps, TabBarItemProps } from './PropsType';
export declare class Item extends React.Component<TabBarItemProps, any> {
    render(): null;
}
declare class AntTabBar extends React.Component<TabBarProps, any> {
    static defaultProps: {
        prefixCls: string;
        barTintColor: string;
        tintColor: string;
        hidden: boolean;
        unselectedTintColor: string;
        placeholder: string;
    };
    static Item: typeof Item;
    onChange: (key: any) => void;
    renderTabBar: () => JSX.Element;
    renderTabContent: () => JSX.Element;
    render(): JSX.Element;
}
export default AntTabBar;
