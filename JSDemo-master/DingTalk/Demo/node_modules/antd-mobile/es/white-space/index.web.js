import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';

var WhiteSpace = function (_React$Component) {
    _inherits(WhiteSpace, _React$Component);

    function WhiteSpace() {
        _classCallCheck(this, WhiteSpace);

        return _possibleConstructorReturn(this, (WhiteSpace.__proto__ || Object.getPrototypeOf(WhiteSpace)).apply(this, arguments));
    }

    _createClass(WhiteSpace, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                size = _props.size,
                className = _props.className,
                style = _props.style,
                onClick = _props.onClick;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, '' + prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + size, true), _defineProperty(_classNames, className, !!className), _classNames));
            return React.createElement('div', { className: wrapCls, style: style, onClick: onClick });
        }
    }]);

    return WhiteSpace;
}(React.Component);

export default WhiteSpace;

WhiteSpace.defaultProps = {
    prefixCls: 'am-whitespace',
    size: 'md'
};