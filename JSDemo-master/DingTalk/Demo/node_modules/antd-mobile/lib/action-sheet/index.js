'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _rnTopview = require('rn-topview');

var _rnTopview2 = _interopRequireDefault(_rnTopview);

var _AndroidContainer = require('./AndroidContainer');

var _AndroidContainer2 = _interopRequireDefault(_AndroidContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ActionSheet = _reactNative.ActionSheetIOS;
if (_reactNative.Platform.OS !== 'ios') {
    var instance = void 0;
    var saveInstance = function saveInstance(i) {
        instance = i;
    };
    var onAnimationEnd = function onAnimationEnd(visible) {
        if (!visible) {
            _rnTopview2['default'].remove();
        }
    };
    ActionSheet = {
        showActionSheetWithOptions: function showActionSheetWithOptions(config, callback) {
            _rnTopview2['default'].set(_react2['default'].createElement(_AndroidContainer2['default'], { visible: true, ref: saveInstance, onAnimationEnd: onAnimationEnd, config: config, callback: callback }));
        },
        showShareActionSheetWithOptions: function showShareActionSheetWithOptions(config) {
            _rnTopview2['default'].set(_react2['default'].createElement(_AndroidContainer2['default'], { visible: true, ref: saveInstance, onAnimationEnd: onAnimationEnd, config: config, share: true }));
        },
        close: function close() {
            if (instance) {
                instance.close();
            }
        }
    };
}
exports['default'] = ActionSheet;
module.exports = exports['default'];