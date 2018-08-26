/// <reference types="react" />
import React from 'react';
export interface SliderProps {
    onChange?: (value?: number) => void;
    onAfterChange?: (value?: number) => void;
    defaultValue?: number;
    tipFormatter?: Function | null;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    maximumTrackTintColor?: string;
    minimumTrackTintColor?: string;
    prefixCls?: string;
    handle?: any;
    maximumTrackStyle?: React.CSSProperties;
    minimumTrackStyle?: React.CSSProperties;
    handleStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    railStyle?: React.CSSProperties;
}
export default SliderProps;
