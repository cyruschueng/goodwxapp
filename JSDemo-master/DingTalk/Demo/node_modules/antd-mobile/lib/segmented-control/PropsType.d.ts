interface SegmentedControlProps {
    tintColor?: string;
    disabled?: boolean;
    selectedIndex?: number;
    values?: Array<string>;
    onChange?: (e: any) => void;
    onValueChange?: (value: string) => void;
    style?: any;
    prefixCls?: string;
    className?: string;
    touchFeedback?: boolean;
    styles?: any;
}
export default SegmentedControlProps;
