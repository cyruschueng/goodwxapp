'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rnTopview = require('rn-topview');

var _rnTopview2 = _interopRequireDefault(_rnTopview);

var _PopupContainer = require('./PopupContainer');

var _PopupContainer2 = _interopRequireDefault(_PopupContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var popupInstance = void 0;
exports['default'] = {
    show: function show(content) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            animationType: 'slide-down',
            maskClosable: true,
            onMaskClose: function onMaskClose() {}
        };

        _rnTopview2['default'].set(_react2['default'].createElement(
            _PopupContainer2['default'],
            { ref: function ref(i) {
                    return popupInstance = i;
                }, animationType: options.animationType, maskClosable: options.maskClosable, onMaskClose: options.onMaskClose, onAnimationEnd: function onAnimationEnd(visible) {
                    if (!visible) {
                        _rnTopview2['default'].remove();
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
module.exports = exports['default'];