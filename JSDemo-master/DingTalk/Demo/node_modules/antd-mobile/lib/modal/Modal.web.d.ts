/// <reference types="react" />
import { ModalProps, ModalComponent } from './PropsType';
export default class Modal extends ModalComponent<ModalProps, any> {
    static defaultProps: {
        prefixCls: string;
        transparent: boolean;
        animated: boolean;
        style: {};
        onShow(): void;
        footer: never[];
        closable: boolean;
        operation: boolean;
        platform: string;
    };
    constructor(props: any);
    isInModal(e: any): true | undefined;
    renderFooterButton(button: any, prefixCls: any, i: any): JSX.Element;
    componentDidMount(): void;
    render(): JSX.Element;
}
