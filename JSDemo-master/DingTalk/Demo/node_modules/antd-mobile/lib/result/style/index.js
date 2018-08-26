'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _reactNative.StyleSheet.create({
    result: {
        alignItems: 'center',
        paddingVertical: _default2['default'].v_spacing_xl,
        backgroundColor: _default2['default'].fill_base,
        borderBottomColor: _default2['default'].border_color_base
    },
    imgWrap: {
        margin: 0
    },
    img: {
        width: 60,
        height: 60
    },
    title: {
        marginTop: _default2['default'].v_spacing_lg,
        paddingHorizontal: _default2['default'].h_spacing_lg
    },
    titleText: {
        fontSize: _default2['default'].font_size_display_md,
        color: _default2['default'].color_text_base
    },
    message: {
        marginTop: _default2['default'].v_spacing_lg,
        paddingHorizontal: _default2['default'].h_spacing_lg
    },
    messageText: {
        fontSize: _default2['default'].font_size_caption,
        color: _default2['default'].color_text_caption
    },
    buttonWrap: {
        flexDirection: 'row',
        marginTop: _default2['default'].v_spacing_lg,
        paddingHorizontal: _default2['default'].h_spacing_lg
    },
    button: {
        flex: 1
    }
});
module.exports = exports['default'];