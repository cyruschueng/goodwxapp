'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* tslint:disable:jsx-no-multiline-js */
var ActivityIndicator = function (_React$Component) {
    (0, _inherits3['default'])(ActivityIndicator, _React$Component);

    function ActivityIndicator() {
        (0, _classCallCheck3['default'])(this, ActivityIndicator);
        return (0, _possibleConstructorReturn3['default'])(this, (ActivityIndicator.__proto__ || Object.getPrototypeOf(ActivityIndicator)).apply(this, arguments));
    }

    (0, _createClass3['default'])(ActivityIndicator, [{
        key: 'render',
        value: function render() {
            var _classNames, _classNames2;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                animating = _props.animating,
                toast = _props.toast,
                size = _props.size,
                text = _props.text;

            var wrapClass = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, '' + prefixCls, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === 'large'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === 'small'), (0, _defineProperty3['default'])(_classNames, className, !!className), (0, _defineProperty3['default'])(_classNames, prefixCls + '-toast', !!toast), _classNames));
            var spinnerClass = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-spinner', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-spinner-lg', !!toast || size === 'large'), _classNames2));
            if (animating) {
                if (toast) {
                    return _react2['default'].createElement(
                        'div',
                        { className: wrapClass },
                        text ? _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-content' },
                            _react2['default'].createElement('span', { className: spinnerClass, 'aria-hidden': 'true' }),
                            _react2['default'].createElement(
                                'span',
                                { className: prefixCls + '-toast' },
                                text
                            )
                        ) : _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-content' },
                            _react2['default'].createElement('span', { className: spinnerClass, 'aria-label': 'Loading' })
                        )
                    );
                } else {
                    return text ? _react2['default'].createElement(
                        'div',
                        { className: wrapClass },
                        _react2['default'].createElement('span', { className: spinnerClass, 'aria-hidden': 'true' }),
                        _react2['default'].createElement(
                            'span',
                            { className: prefixCls + '-tip' },
                            text
                        )
                    ) : _react2['default'].createElement(
                        'div',
                        { className: wrapClass },
                        _react2['default'].createElement('span', { className: spinnerClass, 'aria-label': 'loading' })
                    );
                }
            } else {
                return null;
            }
        }
    }]);
    return ActivityIndicator;
}(_react2['default'].Component);

exports['default'] = ActivityIndicator;

ActivityIndicator.defaultProps = {
    prefixCls: 'am-activity-indicator',
    animating: true,
    size: 'small',
    panelColor: 'rgba(34,34,34,0.6)',
    toast: false
};
module.exports = exports['default'];