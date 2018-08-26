'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = prompt;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Modal = require('./Modal.web');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function prompt(title, message, callbackOrActions) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'default';
    var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var placeholders = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ['', ''];

    if (!callbackOrActions) {
        // console.log('Must specify callbackOrActions');
        return {
            close: function close() {}
        };
    }
    var prefixCls = 'am-modal';
    var data = {};
    function onChange(e) {
        var target = e.target;
        var inputType = target.getAttribute('type');
        data[inputType] = target.value;
    }
    var inputDom = void 0;
    var focusFn = function focusFn(input) {
        setTimeout(function () {
            if (input) {
                input.focus();
            }
        }, 500);
    };
    switch (type) {
        case 'login-password':
            inputDom = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    _react2['default'].createElement(
                        'label',
                        null,
                        _react2['default'].createElement('input', { type: 'text', defaultValue: defaultValue, ref: function ref(input) {
                                return focusFn(input);
                            }, onChange: onChange, placeholder: placeholders[0] })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    _react2['default'].createElement(
                        'label',
                        null,
                        _react2['default'].createElement('input', { type: 'password', defaultValue: '', onChange: onChange, placeholder: placeholders[1] })
                    )
                )
            );
            break;
        case 'secure-text':
            inputDom = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-input' },
                _react2['default'].createElement(
                    'label',
                    null,
                    _react2['default'].createElement('input', { type: 'password', defaultValue: '', ref: function ref(input) {
                            return focusFn(input);
                        }, onChange: onChange, placeholder: placeholders[0] })
                )
            );
            break;
        case 'plain-text':
        case 'default':
        default:
            inputDom = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-input' },
                _react2['default'].createElement(
                    'label',
                    null,
                    _react2['default'].createElement('input', { type: 'text', defaultValue: defaultValue, ref: function ref(input) {
                            return focusFn(input);
                        }, onChange: onChange, placeholder: placeholders[0] })
                )
            );
            break;
    }
    var content = _react2['default'].createElement(
        'div',
        null,
        message,
        inputDom
    );
    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        _reactDom2['default'].unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    function getArgs(func) {
        var text = data.text || '';
        var password = data.password || '';
        if (type === 'login-password') {
            return func(text, password);
        } else if (type === 'secure-text') {
            return func(password);
        }
        return func(text);
    }
    var actions = void 0;
    if (typeof callbackOrActions === 'function') {
        actions = [{ text: '取消' }, { text: '确定', onPress: function onPress() {
                getArgs(callbackOrActions);
            } }];
    } else {
        actions = callbackOrActions.map(function (item) {
            return {
                text: item.text,
                onPress: function onPress() {
                    if (item.onPress) {
                        return getArgs(item.onPress);
                    }
                }
            };
        });
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
    _reactDom2['default'].render(_react2['default'].createElement(
        _Modal2['default'],
        { visible: true, transparent: true, prefixCls: prefixCls, title: title, closable: false, maskClosable: false, transitionName: 'am-zoom', footer: footer, maskTransitionName: 'am-fade' },
        _react2['default'].createElement(
            'div',
            { style: { zoom: 1, overflow: 'hidden' } },
            content
        )
    ), div);
    return {
        close: close
    };
} /* tslint:disable:no-switch-case-fall-through */
module.exports = exports['default'];