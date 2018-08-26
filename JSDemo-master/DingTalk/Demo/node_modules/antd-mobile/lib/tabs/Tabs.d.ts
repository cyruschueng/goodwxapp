/// <reference types="react" />
import React from 'react';
import TabsProps from './PropsType';
declare class Tabs extends React.Component<TabsProps, any> {
    static defaultProps: {
        tabBarPosition: string;
        animated: boolean;
        swipeable: boolean;
        onChange(): void;
        onTabClick(): void;
        underlineColor: string;
        activeUnderlineColor: string;
        textColor: string;
        activeTextColor: string;
        styles: any;
        barStyle: null;
    };
    static TabPane: any;
    activeIndex: number;
    constructor(props: any);
    onTabClick: ({i}: {
        i: any;
    }) => void;
    getContents(): any[];
    getKey(index: any): string;
    renderTabBar: () => JSX.Element;
    render(): JSX.Element;
}
export default Tabs;
