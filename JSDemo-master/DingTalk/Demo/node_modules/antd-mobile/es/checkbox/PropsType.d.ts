export interface CheckboxProps {
    style?: {};
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: Function;
    /** web only */
    prefixCls?: string;
    className?: string;
    name?: string;
    wrapLabel?: boolean;
    /** rn only**/
    styles?: any;
}
export interface CheckboxItemProps extends CheckboxProps {
    listPrefixCls?: any;
    children?: any;
    extra?: any;
    onClick?: () => any;
    checkboxStyle?: any;
    checkboxProps?: Object;
}
export interface AgreeItemPropsType extends CheckboxProps {
    children?: any;
    checkboxStyle?: any;
}
