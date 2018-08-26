/// <reference types="react" />
import React, { ReactNode } from 'react';
export interface ListProps {
    renderHeader?: Function | JSX.Element;
    renderFooter?: Function | JSX.Element;
    children?: JSX.Element | JSX.Element[];
    style?: React.CSSProperties | {} | Array<{}>;
    prefixCls?: string;
    className?: string;
    role?: string;
    styles?: {
        Header?: {};
        Footer?: {};
        Body?: {};
        BodyBottomLine?: {};
    };
}
export interface ListItemProps {
    align?: 'top' | 'middle' | 'bottom';
    disabled?: boolean;
    multipleLine?: boolean;
    children?: ReactNode;
    thumb?: ReactNode | null;
    extra?: ReactNode;
    arrow?: 'horizontal' | 'down' | 'up' | 'empty' | '';
    wrap?: boolean;
    onClick?: (e?: any) => void;
    style?: React.CSSProperties | {} | Array<{}>;
    onLongPress?: () => void;
    prefixCls?: string;
    className?: string;
    role?: string;
    activeStyle?: React.CSSProperties;
    error?: boolean;
    platform?: 'android' | 'ios' | 'cross';
    styles?: {
        underlayColor: {};
        Content: {};
        column: {};
        Extra: {};
        Arrow: {};
        ArrowV: {};
        Item: {};
        Thumb: {};
        multipleThumb: {};
        Line: {};
        multipleLine: {};
    };
    onPressIn?: () => void;
    onPressOut?: () => void;
}
export interface BriefProps {
    children?: ReactNode;
    wrap?: boolean;
    style?: React.CSSProperties | {} | Array<{}>;
    prefixCls?: string;
    className?: string;
    role?: string;
    styles?: {
        Brief: {};
        BriefText: {};
    };
}
