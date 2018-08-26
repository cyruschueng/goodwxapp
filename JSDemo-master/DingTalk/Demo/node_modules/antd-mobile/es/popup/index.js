import React from 'react';
import topView from 'rn-topview';
import PopupContainer from './PopupContainer';
var popupInstance = void 0;
export default {
    show: function show(content) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            animationType: 'slide-down',
            maskClosable: true,
            onMaskClose: function onMaskClose() {}
        };

        topView.set(React.createElement(
            PopupContainer,
            { ref: function ref(i) {
                    return popupInstance = i;
                }, animationType: options.animationType, maskClosable: options.maskClosable, onMaskClose: options.onMaskClose, onAnimationEnd: function onAnimationEnd(visible) {
                    if (!visible) {
                        topView.remove();
                    }
                }, visible: true },
            content
        ));
    },
    hide: function hide() {
        if (popupInstance) {
            popupInstance.hide();
        }
    }
};