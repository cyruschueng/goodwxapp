/* tslint:disable:no-switch-case-fall-through */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.web';
export default function prompt(title, message, callbackOrActions) {
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
            inputDom = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', { type: 'text', defaultValue: defaultValue, ref: function ref(input) {
                                return focusFn(input);
                            }, onChange: onChange, placeholder: placeholders[0] })
                    )
                ),
                React.createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', { type: 'password', defaultValue: '', onChange: onChange, placeholder: placeholders[1] })
                    )
                )
            );
            break;
        case 'secure-text':
            inputDom = React.createElement(
                'div',
                { className: prefixCls + '-input' },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'password', defaultValue: '', ref: function ref(input) {
                            return focusFn(input);
                        }, onChange: onChange, placeholder: placeholders[0] })
                )
            );
            break;
        case 'plain-text':
        case 'default':
        default:
            inputDom = React.createElement(
                'div',
                { className: prefixCls + '-input' },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'text', defaultValue: defaultValue, ref: function ref(input) {
                            return focusFn(input);
                        }, onChange: onChange, placeholder: placeholders[0] })
                )
            );
            break;
    }
    var content = React.createElement(
        'div',
        null,
        message,
        inputDom
    );
    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        ReactDOM.unmountComponentAtNode(div);
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
    ReactDOM.render(React.createElement(
        Modal,
        { visible: true, transparent: true, prefixCls: prefixCls, title: title, closable: false, maskClosable: false, transitionName: 'am-zoom', footer: footer, maskTransitionName: 'am-fade' },
        React.createElement(
            'div',
            { style: { zoom: 1, overflow: 'hidden' } },
            content
        )
    ), div);
    return {
        close: close
    };
}