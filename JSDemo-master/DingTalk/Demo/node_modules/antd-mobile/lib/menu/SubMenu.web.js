'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports['default'] = SubMenu;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../list/index.web');

var _index2 = _interopRequireDefault(_index);

var _Radio = require('../radio/Radio.web');

var _Radio2 = _interopRequireDefault(_Radio);

var _index3 = require('../checkbox/index.web');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function SubMenu(props) {
    var onClick = function onClick(dataItem) {
        if (props.onSel) {
            props.onSel(dataItem);
        }
    };
    var subMenuPrefixCls = props.subMenuPrefixCls,
        radioPrefixCls = props.radioPrefixCls,
        subMenuData = props.subMenuData,
        showSelect = props.showSelect,
        selItem = props.selItem,
        multiSelect = props.multiSelect;

    var selected = function selected(dataItem) {
        return showSelect && selItem.length > 0 && selItem.indexOf(dataItem.value) !== -1;
    };
    return _react2['default'].createElement(
        _index2['default'],
        { style: { paddingTop: 0 }, className: subMenuPrefixCls },
        subMenuData.map(function (dataItem, idx) {
            var _classNames;

            return _react2['default'].createElement(
                _index2['default'].Item,
                { className: (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, radioPrefixCls + '-item', true), (0, _defineProperty3['default'])(_classNames, subMenuPrefixCls + '-item-selected', selected(dataItem)), (0, _defineProperty3['default'])(_classNames, subMenuPrefixCls + '-item-disabled', dataItem.disabled), _classNames)), key: idx, extra: !multiSelect ? _react2['default'].createElement(_Radio2['default'], { checked: selected(dataItem), disabled: dataItem.disabled, onChange: function onChange() {
                            return onClick(dataItem);
                        } }) : _react2['default'].createElement(_index4['default'], { checked: selected(dataItem), disabled: dataItem.disabled, onChange: function onChange() {
                            return onClick(dataItem);
                        } }) },
                dataItem.label
            );
        })
    );
} /* tslint:disable:jsx-no-multiline-js */
module.exports = exports['default'];