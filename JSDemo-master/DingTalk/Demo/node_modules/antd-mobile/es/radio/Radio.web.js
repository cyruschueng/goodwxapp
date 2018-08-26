import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcCheckbox from 'rc-checkbox';
import omit from 'omit.js';
import classNames from 'classnames';

var Radio = function (_React$Component) {
    _inherits(Radio, _React$Component);

    function Radio() {
        _classCallCheck(this, Radio);

        return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
    }

    _createClass(Radio, [{
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
                React.createElement(RcCheckbox, _extends({}, omit(this.props, ['className', 'style']), { type: 'radio' })),
                children
            );
            if (this.props.wrapLabel) {
                return mark;
            }
            return React.createElement(RcCheckbox, _extends({}, this.props, { type: 'radio' }));
        }
    }]);

    return Radio;
}(React.Component);

export default Radio;

Radio.defaultProps = {
    prefixCls: 'am-radio',
    wrapLabel: true
};