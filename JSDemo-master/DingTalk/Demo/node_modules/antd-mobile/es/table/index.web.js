import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import RcTable from 'rc-table';
import warning from 'warning';

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table() {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
    }

    _createClass(Table, [{
        key: 'render',
        value: function render() {
            warning(false, 'Table is going to be deprecated at antd-mobile@2.0. see https://goo.gl/xb0YEX');
            var _props = this.props,
                prefixCls = _props.prefixCls,
                columns = _props.columns,
                dataSource = _props.dataSource,
                direction = _props.direction,
                scrollX = _props.scrollX,
                titleFixed = _props.titleFixed;

            var newProps = _extends({}, this.props, { data: dataSource });
            var table = void 0;
            // 默认纵向
            if (!direction || direction === 'vertical') {
                if (titleFixed) {
                    table = React.createElement(RcTable, _extends({}, newProps, { columns: columns, scroll: { x: true }, showHeader: false }));
                } else {
                    table = React.createElement(RcTable, _extends({}, newProps, { columns: columns, scroll: { x: scrollX } }));
                }
                // 横向
            } else if (direction === 'horizon') {
                columns[0].className = prefixCls + '-horizonTitle';
                table = React.createElement(RcTable, _extends({}, newProps, { columns: columns, showHeader: false, scroll: { x: scrollX } }));
                // 混合
            } else if (direction === 'mix') {
                columns[0].className = prefixCls + '-horizonTitle';
                table = React.createElement(RcTable, _extends({}, newProps, { columns: columns, scroll: { x: scrollX } }));
            }
            return table;
        }
    }]);

    return Table;
}(React.Component);

export default Table;

Table.defaultProps = {
    dataSource: [],
    prefixCls: 'am-table'
};