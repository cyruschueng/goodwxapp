/// <reference types="react" />
import React from 'react';
import SwitchProps from './PropsType';
export default class AntmSwitch extends React.Component<SwitchProps, any> {
    static defaultProps: {
        name: string;
        checked: boolean;
        disabled: boolean;
        onChange(): void;
    };
    onChange(value: any): void;
    render(): JSX.Element;
}
