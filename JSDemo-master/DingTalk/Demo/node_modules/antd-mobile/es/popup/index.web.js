import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _extends from 'babel-runtime/helpers/extends';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
function create(_instanceId, config, content) {
    var afterClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (_x) {};

    var props = _extends({ prefixCls: 'am-popup', animationType: 'slide-down' }, config);
    var prefixCls = props.prefixCls,
        transitionName = props.transitionName,
        animationType = props.animationType,
        maskTransitionName = props.maskTransitionName,
        _props$maskClosable = props.maskClosable,
        maskClosable = _props$maskClosable === undefined ? true : _props$maskClosable,
        onMaskClose = props.onMaskClose,
        className = props.className;

    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        if (div) {
            ReactDOM.unmountComponentAtNode(div);
            div.parentNode.removeChild(div);
            div = null;
        }
        afterClose(_instanceId);
    }
    var transName = 'am-slide-down';
    if (animationType === 'slide-up') {
        transName = 'am-slide-up';
    }
    // 在 iPhone 上拖动 mask 蒙层、会触发最顶部或最底部的、页面回弹后的留白，解决办法是，禁掉 mask 蒙层的 onTouchStart 事件。
    // 但由于以下原因：
    // Popup 组件底层依赖 [rc-dialog](https://github.com/react-component/dialog)
    // 而 rc-dialog 点击 mask 蒙层关闭弹出框的事件是绑定在 classname 为 rc-dialog-wrap 的 dom 节点上，
    // 此节点是弹出层中主要内容的“父节点”，而非正常的“兄弟节点”。相关 issue https://github.com/react-component/dialog/issues/40
    // 所以、相对于 antd-mobile@0.9.8 以及之前的版本的变化是：
    // 去掉 am-popup-wrap 设置的 `position: fixed; top: 0; bottom: 0; ...` 样式，并给 am-popup 设置 z-index .
    // 另外不使用 rc-dialog 提供的 maskClosable 功能，而改为在这里实现
    var maskProps = {
        onClick: function onClick(e) {
            e.preventDefault();
            if (maskClosable) {
                if (onMaskClose && typeof onMaskClose === 'function') {
                    var res = onMaskClose();
                    if (res && res.then) {
                        res.then(function () {
                            close();
                        });
                    } else {
                        close();
                    }
                } else {
                    close();
                }
            }
        }
    };
    var cls = className ? prefixCls + '-' + animationType + ' ' + className : prefixCls + '-' + animationType;
    ReactDOM.render(React.createElement(
        Dialog,
        _extends({}, props, { className: cls, visible: true, title: '', footer: '', transitionName: transitionName || transName, maskTransitionName: maskTransitionName || 'am-fade', maskProps: _extends({}, props.maskProps, maskProps) }),
        content
    ), div);
    return {
        instanceId: instanceId,
        close: close
    };
}
var ins = {
    defaultInstance: null,
    instances: []
};
var instanceId = 1;

var Popup = function Popup() {
    _classCallCheck(this, Popup);
};

export default Popup;

Popup.newInstance = function () {
    var j = void 0;
    return {
        show: function show(content, config) {
            j = create(instanceId++, config, content, function (iId) {
                for (var i = 0; i < ins.instances.length; i++) {
                    if (ins.instances[i].instanceId === iId) {
                        ins.instances.splice(i, 1);
                        return;
                    }
                }
            });
            ins.instances.push(j);
        },
        hide: function hide() {
            j.close();
        }
    };
};
Popup.show = function (content, config) {
    Popup.hide();
    ins.defaultInstance = create('0', config, content, function (iId) {
        if (iId === '0') {
            ins.defaultInstance = null;
        }
    });
};
Popup.hide = function () {
    if (ins.defaultInstance) {
        ins.defaultInstance.close();
    }
};