import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';
import List from '../list/index.web';
import Radio from './Radio.web';
import omit from 'omit.js';
var ListItem = List.Item;
function noop() {}

var RadioItem = function (_React$Component) {
    _inherits(RadioItem, _React$Component);

    function RadioItem() {
        _classCallCheck(this, RadioItem);

        return _possibleConstructorReturn(this, (RadioItem.__proto__ || Object.getPrototypeOf(RadioItem)).apply(this, arguments));
    }

    _createClass(RadioItem, [{
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                listPrefixCls = _props.listPrefixCls,
                className = _props.className,
                children = _props.children,
                disabled = _props.disabled,
                _props$radioProps = _props.radioProps,
                radioProps = _props$radioProps === undefined ? {} : _props$radioProps;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-disabled', disabled === true), _defineProperty(_classNames, className, className), _classNames));
            // Note: if not omit `onChange`, it will trigger twice on check listitem
            var otherProps = omit(this.props, ['listPrefixCls', 'onChange', 'disabled', 'radioProps']);
            if (disabled) {
                delete otherProps.onClick;
            } else {
                otherProps.onClick = otherProps.onClick || noop;
            }
            var extraProps = {};
            ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(function (i) {
                if (i in _this2.props) {
                    extraProps[i] = _this2.props[i];
                }
            });
            return React.createElement(
                ListItem,
                _extends({}, otherProps, { prefixCls: listPrefixCls, className: wrapCls, extra: React.createElement(Radio, _extends({}, radioProps, extraProps)) }),
                children
            );
        }
    }]);

    return RadioItem;
}(React.Component);

export default RadioItem;

RadioItem.defaultProps = {
    prefixCls: 'am-radio',
    listPrefixCls: 'am-list'
};