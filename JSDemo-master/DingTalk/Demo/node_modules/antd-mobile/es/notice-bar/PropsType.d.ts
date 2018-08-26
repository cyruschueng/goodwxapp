/// <reference types="react" />
import React from 'react';
interface NoticeBarPropsType {
    mode?: 'closable' | 'link';
    onClick?: () => void;
    icon?: React.ReactNode;
    style?: {};
    className?: string;
    prefixCls?: string;
    marqueeProps?: {};
    styles?: any;
}
export default NoticeBarPropsType;
