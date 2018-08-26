/// <reference types="react" />
import React from 'react';
import tsPropsType from './PropsType';
import IndexedList from './Indexed.web';
export default class ListView extends React.Component<tsPropsType, any> {
    static defaultProps: {
        prefixCls: string;
        listPrefixCls: string;
    };
    static DataSource: any;
    static IndexedList: typeof IndexedList;
    scrollTo: (...args: any[]) => any;
    getInnerViewNode: () => any;
    render(): JSX.Element;
}
