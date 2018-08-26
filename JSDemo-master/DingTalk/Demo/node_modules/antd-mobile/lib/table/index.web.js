'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _rcTable = require('rc-table');

var _rcTable2 = _interopRequireDefault(_rcTable);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Table = function (_React$Component) {
    (0, _inherits3['default'])(Table, _React$Component);

    function Table() {
        (0, _classCallCheck3['default'])(this, Table);
        return (0, _possibleConstructorReturn3['default'])(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Table, [{
        key: 'render',
        value: function render() {
            (0, _warning2['default'])(false, 'Table is going to be deprecated at antd-mobile@2.0. see https://goo.gl/xb0YEX');
            var _props = this.props,
                prefixCls = _props.prefixCls,
                columns = _props.columns,
                dataSource = _props.dataSource,
                direction = _props.direction,
                scrollX = _props.scrollX,
                titleFixed = _props.titleFixed;

            var newProps = (0, _extends3['default'])({}, this.props, { data: dataSource });
            var table = void 0;
            // 默认纵向
            if (!direction || direction === 'vertical') {
                if (titleFixed) {
                    table = _react2['default'].createElement(_rcTable2['default'], (0, _extends3['default'])({}, newProps, { columns: columns, scroll: { x: true }, showHeader: false }));
                } else {
                    table = _react2['default'].createElement(_rcTable2['default'], (0, _extends3['default'])({}, newProps, { columns: columns, scroll: { x: scrollX } }));
                }
                // 横向
            } else if (direction === 'horizon') {
                columns[0].className = prefixCls + '-horizonTitle';
                table = _react2['default'].createElement(_rcTable2['default'], (0, _extends3['default'])({}, newProps, { columns: columns, showHeader: false, scroll: { x: scrollX } }));
                // 混合
            } else if (direction === 'mix') {
                columns[0].className = prefixCls + '-horizonTitle';
                table = _react2['default'].createElement(_rcTable2['default'], (0, _extends3['default'])({}, newProps, { columns: columns, scroll: { x: scrollX } }));
            }
            return table;
        }
    }]);
    return Table;
}(_react2['default'].Component);

exports['default'] = Table;

Table.defaultProps = {
    dataSource: [],
    prefixCls: 'am-table'
};
module.exports = exports['default'];