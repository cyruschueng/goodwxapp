/// <reference types="react" />
import React from 'react';
import CardHeader from './CardHeader.web';
import CardBody from './CardBody.web';
import CardFooter from './CardFooter.web';
import { CardProps } from './PropsType';
export default class Card extends React.Component<CardProps, any> {
    static defaultProps: {
        prefixCls: string;
        full: boolean;
    };
    static Header: typeof CardHeader;
    static Body: typeof CardBody;
    static Footer: typeof CardFooter;
    render(): JSX.Element;
}
