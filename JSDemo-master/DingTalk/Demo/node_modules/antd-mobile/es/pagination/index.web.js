import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/index.web';
import Flex from '../flex/index.web';
import { getComponentLocale } from '../_util/getLocale';

var Pagination = function (_React$Component) {
    _inherits(Pagination, _React$Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this.state = {
            current: props.current
        };
        return _this;
    }

    _createClass(Pagination, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                current: nextProps.current
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(p) {
            this.setState({
                current: p
            });
            if (this.props.onChange) {
                this.props.onChange(p);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this,
                _classNames2;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                style = _props.style,
                mode = _props.mode,
                total = _props.total,
                simple = _props.simple;

            var current = this.state.current;
            var locale = getComponentLocale(this.props, this.context, 'Pagination', function () {
                return require('./locale/zh_CN');
            });
            var prevText = locale.prevText,
                nextText = locale.nextText;

            var markup = React.createElement(
                Flex,
                null,
                React.createElement(
                    Flex.Item,
                    { className: prefixCls + '-wrap-btn ' + prefixCls + '-wrap-btn-prev' },
                    React.createElement(
                        Button,
                        { inline: true, disabled: current <= 0, onClick: function onClick() {
                                return _this2.onChange(current - 1);
                            } },
                        prevText
                    )
                ),
                this.props.children ? React.createElement(
                    Flex.Item,
                    null,
                    this.props.children
                ) : !simple && React.createElement(
                    Flex.Item,
                    { className: prefixCls + '-wrap', 'aria-live': 'assertive' },
                    React.createElement(
                        'span',
                        { className: 'active' },
                        current + 1
                    ),
                    '/',
                    React.createElement(
                        'span',
                        null,
                        total
                    )
                ),
                React.createElement(
                    Flex.Item,
                    { className: prefixCls + '-wrap-btn ' + prefixCls + '-wrap-btn-next' },
                    React.createElement(
                        Button,
                        { inline: true, disabled: current >= total - 1, onClick: function onClick() {
                                return _this2.onChange(_this2.state.current + 1);
                            } },
                        nextText
                    )
                )
            );
            if (mode === 'number') {
                markup = React.createElement(
                    'div',
                    { className: prefixCls + '-wrap' },
                    React.createElement(
                        'span',
                        { className: 'active' },
                        current + 1
                    ),
                    '/',
                    React.createElement(
                        'span',
                        null,
                        total
                    )
                );
            } else if (mode === 'pointer') {
                var arr = [];
                for (var i = 0; i < total; i++) {
                    var _classNames;

                    arr.push(React.createElement(
                        'div',
                        { key: 'dot-' + i, className: classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-wrap-dot', true), _defineProperty(_classNames, prefixCls + '-wrap-dot-active', i === current), _classNames)) },
                        React.createElement('span', null)
                    ));
                }
                markup = React.createElement(
                    'div',
                    { className: prefixCls + '-wrap' },
                    arr
                );
            }
            var cls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls, true), _defineProperty(_classNames2, className, !!className), _classNames2));
            return React.createElement(
                'div',
                { className: cls, style: style },
                markup
            );
        }
    }]);

    return Pagination;
}(React.Component);

export default Pagination;

Pagination.defaultProps = {
    prefixCls: 'am-pagination',
    mode: 'button',
    current: 0,
    simple: false,
    onChange: function onChange() {}
};
Pagination.contextTypes = {
    antLocale: PropTypes.object
};