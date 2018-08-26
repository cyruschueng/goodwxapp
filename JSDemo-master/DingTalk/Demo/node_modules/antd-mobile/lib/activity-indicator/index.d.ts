/// <reference types="react" />
import React from 'react';
import { IActivityIndicatorStyle } from './style';
import PropTypes from './PropsType';
export interface IActivityIndicatorNativeProps extends PropTypes {
    styles?: IActivityIndicatorStyle;
}
export default class RNActivityIndicator extends React.Component<IActivityIndicatorNativeProps, any> {
    static defaultProps: {
        animating: boolean;
        color: string;
        size: string;
        toast: boolean;
        styles: any;
    };
    _renderToast(): JSX.Element;
    _renderSpinner(): JSX.Element;
    render(): JSX.Element | null;
}
