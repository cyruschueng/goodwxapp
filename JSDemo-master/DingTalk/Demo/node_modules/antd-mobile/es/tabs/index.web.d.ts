/// <reference types="react" />
import React from 'react';
import TabsProps from './PropsType';
export default class Tabs extends React.Component<TabsProps, any> {
    static TabPane: any;
    static defaultProps: {
        prefixCls: string;
        animated: boolean;
        swipeable: boolean;
        tabBarPosition: string;
        hammerOptions: {};
        tabBarhammerOptions: {};
        pageSize: number;
        speed: number;
        onChange(): void;
        onTabClick(): void;
    };
    renderTabBar: () => JSX.Element;
    renderTabContent: () => JSX.Element;
    render(): JSX.Element;
}
