import AbstractPicker from './AbstractPicker';
import { IPickerStyle } from './style';
import tsPropsType from './PropsType';
export interface IPickerNativeProps extends tsPropsType {
    styles?: IPickerStyle;
}
export default class Picker extends AbstractPicker {
    static defaultProps: {
        styles: any;
        triggerType: string;
        prefixCls: string;
        pickerPrefixCls: string;
        popupPrefixCls: string;
        format: (values: any) => any;
        cols: number;
        cascade: boolean;
        extra: string;
        okText: string;
        dismissText: string;
        title: string;
    };
    protected popupProps: {};
}
