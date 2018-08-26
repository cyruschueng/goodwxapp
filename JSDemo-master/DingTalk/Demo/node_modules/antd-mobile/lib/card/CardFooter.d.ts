/// <reference types="react" />
import React from 'react';
import { CardFooterProps } from './PropsType';
export default class CardFooter extends React.Component<CardFooterProps, any> {
    static defaultProps: {
        style: {};
    };
    render(): JSX.Element;
}
