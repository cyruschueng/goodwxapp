'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcNotification = require('rc-notification');

var _rcNotification2 = _interopRequireDefault(_rcNotification);

var _index = require('../icon/index.web');

var _index2 = _interopRequireDefault(_index);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var messageInstance = void 0;
var prefixCls = 'am-toast';
function getMessageInstance(mask) {
    var _classnames;

    if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
    }
    messageInstance = _rcNotification2['default'].newInstance({
        prefixCls: prefixCls,
        style: {},
        transitionName: 'am-fade',
        className: (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-mask', mask), (0, _defineProperty3['default'])(_classnames, prefixCls + '-nomask', !mask), _classnames))
    });
    return messageInstance;
}
function notice(content, type) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var _onClose = arguments[3];
    var mask = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    var iconType = {
        info: '',
        success: require('./style/assets/success.svg'),
        fail: require('./style/assets/fail.svg'),
        offline: require('./style/assets/dislike.svg'),
        loading: 'loading'
    }[type];
    var instance = getMessageInstance(mask);
    instance.notice({
        duration: duration,
        style: {},
        content: !!iconType ? _react2['default'].createElement(
            'div',
            { className: prefixCls + '-text ' + prefixCls + '-text-icon', role: 'alert', 'aria-live': 'assertive' },
            _react2['default'].createElement(_index2['default'], { type: iconType, size: 'lg' }),
            _react2['default'].createElement(
                'div',
                { className: prefixCls + '-text-info' },
                content
            )
        ) : _react2['default'].createElement(
            'div',
            { className: prefixCls + '-text', role: 'alert', 'aria-live': 'assertive' },
            _react2['default'].createElement(
                'div',
                null,
                content
            )
        ),
        onClose: function onClose() {
            if (_onClose) {
                _onClose();
            }
            instance.destroy();
            instance = null;
            messageInstance = null;
        }
    });
}
exports['default'] = {
    SHORT: 3,
    LONG: 8,
    show: function show(content, duration, mask) {
        return notice(content, 'info', duration, function () {}, mask);
    },
    info: function info(content, duration, onClose, mask) {
        return notice(content, 'info', duration, onClose, mask);
    },
    success: function success(content, duration, onClose, mask) {
        return notice(content, 'success', duration, onClose, mask);
    },
    fail: function fail(content, duration, onClose, mask) {
        return notice(content, 'fail', duration, onClose, mask);
    },
    offline: function offline(content, duration, onClose, mask) {
        return notice(content, 'offline', duration, onClose, mask);
    },
    loading: function loading(content, duration, onClose, mask) {
        return notice(content, 'loading', duration, onClose, mask);
    },
    hide: function hide() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
module.exports = exports['default'];