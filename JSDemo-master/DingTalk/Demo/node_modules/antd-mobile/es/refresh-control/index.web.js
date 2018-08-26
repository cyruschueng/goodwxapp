import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import ListView from 'rmc-list-view';
import Icon from '../icon/index.web';
var dpr = typeof window !== 'undefined' && window.devicePixelRatio || 2;
ListView.RefreshControl.defaultProps = _extends({}, ListView.RefreshControl.defaultProps, { prefixCls: 'am-refresh-control', icon: [React.createElement(
        'div',
        { key: '0', className: 'am-refresh-control-pull' },
        React.createElement(
            'span',
            null,
            '\u4E0B\u62C9\u53EF\u4EE5\u5237\u65B0'
        )
    ), React.createElement(
        'div',
        { key: '1', className: 'am-refresh-control-release' },
        React.createElement(
            'span',
            null,
            '\u677E\u5F00\u7ACB\u5373\u5237\u65B0'
        )
    )], loading: React.createElement(Icon, { type: 'loading' }), refreshing: false, distanceToRefresh: 50 / 2 * dpr });
export default ListView.RefreshControl;