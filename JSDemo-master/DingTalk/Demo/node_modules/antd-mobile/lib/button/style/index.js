'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _reactNative.StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    defaultHighlight: {
        backgroundColor: _default2['default'].fill_tap,
        borderColor: _default2['default'].border_color_base
    },
    primaryHighlight: {
        backgroundColor: _default2['default'].primary_button_fill_tap,
        borderColor: _default2['default'].primary_button_fill
    },
    ghostHighlight: {
        backgroundColor: _default2['default'].ghost_button_fill_tap,
        borderColor: _default2['default'].ghost_button_color
    },
    warningHighlight: {
        backgroundColor: _default2['default'].brand_warning,
        borderColor: _default2['default'].brand_warning
    },
    wrapperStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: _default2['default'].radius_md,
        borderWidth: 1
    },
    largeRaw: {
        height: _default2['default'].button_height,
        paddingLeft: _default2['default'].h_spacing_lg,
        paddingRight: _default2['default'].h_spacing_lg
    },
    smallRaw: {
        height: _default2['default'].button_height_sm,
        paddingLeft: _default2['default'].h_spacing_sm,
        paddingRight: _default2['default'].h_spacing_sm
    },
    defaultRaw: {
        backgroundColor: _default2['default'].fill_base,
        borderColor: _default2['default'].border_color_base
    },
    primaryRaw: {
        backgroundColor: _default2['default'].primary_button_fill,
        borderColor: _default2['default'].primary_button_fill
    },
    ghostRaw: {
        backgroundColor: 'transparent',
        borderColor: _default2['default'].ghost_button_color
    },
    warningRaw: {
        backgroundColor: _default2['default'].fill_base,
        borderColor: _default2['default'].brand_warning
    },
    disabledRaw: {
        backgroundColor: _default2['default'].fill_disabled,
        borderColor: _default2['default'].fill_disabled
    },
    defaultHighlightText: {
        color: _default2['default'].color_text_base
    },
    primaryHighlightText: {
        color: _default2['default'].color_text_base_inverse
    },
    ghostHighlightText: {
        color: _default2['default'].color_text_base_inverse
    },
    warningHighlightText: {
        color: _default2['default'].color_text_base_inverse
    },
    largeRawText: {
        fontSize: _default2['default'].button_font_size
    },
    smallRawText: {
        fontSize: _default2['default'].button_font_size_sm
    },
    defaultRawText: {
        color: _default2['default'].color_text_base
    },
    primaryRawText: {
        color: _default2['default'].color_text_base_inverse
    },
    ghostRawText: {
        color: _default2['default'].ghost_button_color
    },
    warningRawText: {
        color: _default2['default'].brand_warning
    },
    disabledRawText: {
        color: _default2['default'].color_text_disabled
    },
    indicator: {
        marginRight: _default2['default'].h_spacing_md
    }
});
module.exports = exports['default'];