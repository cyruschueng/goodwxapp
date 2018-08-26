/// <reference types="react" />
import React from 'react';
import { INoticeBarStyle } from './style';
import NoticeBarProps from './PropsType';
export interface INoticeNativeProps extends NoticeBarProps {
    styles?: INoticeBarStyle;
}
export default class NoticeBar extends React.Component<INoticeNativeProps, any> {
    static defaultProps: {
        mode: string;
        onClick(): void;
        icon: JSX.Element;
        styles: any;
    };
    constructor(props: any);
    onClick: () => void;
    render(): JSX.Element | null;
}
