/// <reference types="react" />
import React from 'react';
import { CardBodyProps } from './PropsType';
export default class CardBody extends React.Component<CardBodyProps, any> {
    static defaultProps: {
        style: {};
    };
    render(): JSX.Element;
}
