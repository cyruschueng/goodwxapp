'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactNative = require('react-native');

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _reactNative.StyleSheet.create({
    maximum: {
        color: _default2['default'].border_color_base
    },
    minimum: {
        color: _default2['default'].brand_primary
    }
});
module.exports = exports['default'];