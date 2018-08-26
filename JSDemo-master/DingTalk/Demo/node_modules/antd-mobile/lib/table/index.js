'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Table = function (_React$Component) {
    (0, _inherits3['default'])(Table, _React$Component);

    function Table() {
        (0, _classCallCheck3['default'])(this, Table);
        return (0, _possibleConstructorReturn3['default'])(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Table, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.warn('Table does not support react-native and will be removed in version 2.0');
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);
    return Table;
}(_react2['default'].Component);

exports['default'] = Table;
module.exports = exports['default'];