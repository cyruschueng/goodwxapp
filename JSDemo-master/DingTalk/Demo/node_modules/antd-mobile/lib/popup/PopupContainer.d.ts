/// <reference types="react" />
import React from 'react';
import PopupProps from './PropsType';
export default class PopupContainer extends React.Component<PopupProps, any> {
    constructor(props: any);
    hide(): void;
    onMaskClose: () => void;
    render(): JSX.Element;
}
