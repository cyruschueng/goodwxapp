/// <reference types="react" />
import React from 'react';
import SliderProps from './PropsType';
export default class SliderAntm extends React.Component<SliderProps, any> {
    static defaultProps: {
        onChange(): void;
        onAfterChange(): void;
        defaultValue: number;
        disabled: boolean;
        maximumTrackTintColor: any;
        minimumTrackTintColor: any;
    };
    render(): JSX.Element;
}
