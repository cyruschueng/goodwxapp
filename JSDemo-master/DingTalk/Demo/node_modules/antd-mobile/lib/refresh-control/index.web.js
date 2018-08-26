'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rmcListView = require('rmc-list-view');

var _rmcListView2 = _interopRequireDefault(_rmcListView);

var _index = require('../icon/index.web');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var dpr = typeof window !== 'undefined' && window.devicePixelRatio || 2;
_rmcListView2['default'].RefreshControl.defaultProps = (0, _extends3['default'])({}, _rmcListView2['default'].RefreshControl.defaultProps, { prefixCls: 'am-refresh-control', icon: [_react2['default'].createElement(
        'div',
        { key: '0', className: 'am-refresh-control-pull' },
        _react2['default'].createElement(
            'span',
            null,
            '\u4E0B\u62C9\u53EF\u4EE5\u5237\u65B0'
        )
    ), _react2['default'].createElement(
        'div',
        { key: '1', className: 'am-refresh-control-release' },
        _react2['default'].createElement(
            'span',
            null,
            '\u677E\u5F00\u7ACB\u5373\u5237\u65B0'
        )
    )], loading: _react2['default'].createElement(_index2['default'], { type: 'loading' }), refreshing: false, distanceToRefresh: 50 / 2 * dpr });
exports['default'] = _rmcListView2['default'].RefreshControl;
module.exports = exports['default'];