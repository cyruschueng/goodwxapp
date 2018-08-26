import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';
import List from '../list/index.web';
import Checkbox from './Checkbox.web';
import omit from 'omit.js';
var ListItem = List.Item;
function noop() {}

var CheckboxItem = function (_React$Component) {
    _inherits(CheckboxItem, _React$Component);

    function CheckboxItem() {
        _classCallCheck(this, CheckboxItem);

        return _possibleConstructorReturn(this, (CheckboxItem.__proto__ || Object.getPrototypeOf(CheckboxItem)).apply(this, arguments));
    }

    _createClass(CheckboxItem, [{
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
                _props$checkboxProps = _props.checkboxProps,
                checkboxProps = _props$checkboxProps === undefined ? {} : _props$checkboxProps;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-disabled', disabled === true), _defineProperty(_classNames, className, className), _classNames));
            // Note: if not omit `onChange`, it will trigger twice on check listitem
            var otherProps = omit(this.props, ['listPrefixCls', 'onChange', 'disabled', 'checkboxProps']);
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
                _extends({}, otherProps, { prefixCls: listPrefixCls, className: wrapCls, thumb: React.createElement(Checkbox, _extends({}, checkboxProps, extraProps)) }),
                children
            );
        }
    }]);

    return CheckboxItem;
}(React.Component);

export default CheckboxItem;

CheckboxItem.defaultProps = {
    prefixCls: 'am-checkbox',
    listPrefixCls: 'am-list'
};