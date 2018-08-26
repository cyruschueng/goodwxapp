/// <reference types="react" />
import React from 'react';
import { MenuProps } from './PropsType';
export default class Menu extends React.Component<MenuProps, any> {
    static defaultProps: {
        prefixCls: string;
        subMenuPrefixCls: string;
        radioPrefixCls: string;
        multiSelectMenuBtnsCls: string;
        MenuSelectContanerPrefixCls: string;
        data: never[];
        level: number;
        onChange: () => void;
        onOk: () => void;
        onCancel: () => void;
        multiSelect: boolean;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    onMenuOk: () => void;
    onMenuCancel: () => void;
    getNewFsv(props: any): string;
    onClickFirstLevelItem: (dataItem: any) => void;
    getSelectValue: (dataItem: any) => any;
    onClickSubMenuItem: (dataItem: any) => void;
    render(): JSX.Element;
}
