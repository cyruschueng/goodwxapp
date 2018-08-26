/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */
import ReactDOM from 'react-dom';
import Modal from './Modal.web';
export default function a() {
    var actions = (arguments.length <= 0 ? undefined : arguments[0]) || [{ text: '确定' }];
    var prefixCls = 'am-modal';
    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    var footer = actions.map(function (button) {
        var orginPress = button.onPress || function () {};
        button.onPress = function () {
            var res = orginPress();
            if (res && res.then) {
                res.then(function () {
                    close();
                });
            } else {
                close();
            }
        };
        return button;
    });
    ReactDOM.render(React.createElement(Modal, { visible: true, operation: true, transparent: true, prefixCls: prefixCls, transitionName: 'am-zoom', closable: false, maskClosable: true, onClose: close, footer: footer, maskTransitionName: 'am-fade', className: 'am-modal-operation' }), div);
    return {
        close: close
    };
}