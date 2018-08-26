import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';
import Checkbox from './Checkbox.web';
import getDataAttr from '../_util/getDataAttr';
import omit from 'omit.js';

var AgreeItem = function (_React$Component) {
    _inherits(AgreeItem, _React$Component);

    function AgreeItem() {
        _classCallCheck(this, AgreeItem);

        return _possibleConstructorReturn(this, (AgreeItem.__proto__ || Object.getPrototypeOf(AgreeItem)).apply(this, arguments));
    }

    _createClass(AgreeItem, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                style = _props.style,
                className = _props.className;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-agree', true), _defineProperty(_classNames, className, className), _classNames));
            return React.createElement(
                'div',
                _extends({}, getDataAttr(this.props), { className: wrapCls, style: style }),
                React.createElement(Checkbox, _extends({}, omit(this.props, ['style']), { className: prefixCls + '-agree-label' }))
            );
        }
    }]);

    return AgreeItem;
}(React.Component);

export default AgreeItem;

AgreeItem.defaultProps = {
    prefixCls: 'am-checkbox'
};