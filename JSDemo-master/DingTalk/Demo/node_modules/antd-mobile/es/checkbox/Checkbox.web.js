import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcCheckbox from 'rc-checkbox';
import omit from 'omit.js';
import classNames from 'classnames';

var Checkbox = function (_React$Component) {
    _inherits(Checkbox, _React$Component);

    function Checkbox() {
        _classCallCheck(this, Checkbox);

        return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
    }

    _createClass(Checkbox, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                style = _props.style,
                children = _props.children;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-wrapper', true), _classNames));
            var mark = React.createElement(
                'label',
                { className: wrapCls, style: style },
                React.createElement(RcCheckbox, omit(this.props, ['className', 'style'])),
                children
            );
            if (this.props.wrapLabel) {
                return mark;
            }
            return React.createElement(RcCheckbox, this.props);
        }
    }]);

    return Checkbox;
}(React.Component);

export default Checkbox;

Checkbox.defaultProps = {
    prefixCls: 'am-checkbox',
    wrapLabel: true
};