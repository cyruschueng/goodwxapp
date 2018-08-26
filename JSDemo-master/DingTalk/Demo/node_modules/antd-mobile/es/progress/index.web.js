import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';

var Progress = function (_React$Component) {
    _inherits(Progress, _React$Component);

    function Progress() {
        _classCallCheck(this, Progress);

        return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    _createClass(Progress, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.noAppearTransition = true;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.appearTransition) {
                setTimeout(function () {
                    _this2.refs.bar.style.width = _this2.props.percent + '%';
                }, 10);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                className = _props.className,
                prefixCls = _props.prefixCls,
                position = _props.position,
                unfilled = _props.unfilled,
                _props$style = _props.style,
                style = _props$style === undefined ? {} : _props$style,
                _props$wrapStyle = _props.wrapStyle,
                wrapStyle = _props$wrapStyle === undefined ? {} : _props$wrapStyle;

            var percentStyle = {
                width: this.noAppearTransition || !this.props.appearTransition ? this.props.percent + '%' : 0,
                height: 0
            };
            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, className, className), _defineProperty(_classNames, prefixCls + '-outer', true), _defineProperty(_classNames, prefixCls + '-fixed-outer', position === 'fixed'), _defineProperty(_classNames, prefixCls + '-hide-outer', unfilled === 'hide'), _classNames));
            // TODO 2.0 整理 style， api 变更 style, barStyle, remove wrapStyle(不添入文档， for tiny)
            return React.createElement(
                'div',
                { style: wrapStyle, className: wrapCls, role: 'progressbar', 'aria-valuenow': this.props.percent, 'aria-valuemin': '0', 'aria-valuemax': '100' },
                React.createElement('div', { ref: 'bar', className: prefixCls + '-bar', style: _extends({}, style, percentStyle) })
            );
        }
    }]);

    return Progress;
}(React.Component);

export default Progress;

Progress.defaultProps = {
    prefixCls: 'am-progress',
    percent: 0,
    position: 'fixed',
    unfilled: 'show',
    appearTransition: false
};