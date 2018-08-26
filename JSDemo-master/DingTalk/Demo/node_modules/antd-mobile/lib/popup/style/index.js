'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactNative = require('react-native');

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _reactNative.StyleSheet.create({
    container: {
        zIndex: _default2['default'].popup_zindex
    },
    wrap: {
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    wrapTop: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
});
module.exports = exports['default'];