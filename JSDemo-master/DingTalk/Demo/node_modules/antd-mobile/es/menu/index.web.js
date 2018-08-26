import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import classNames from 'classnames';
import List from '../list/index.web';
import Flex from '../flex/index.web';
import SubMenu from './SubMenu.web';
import Button from '../button/index.web';

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.onMenuOk = function () {
            var onOk = _this.props.onOk;

            if (onOk) {
                onOk(_this.state.value);
            }
        };
        _this.onMenuCancel = function () {
            var onCancel = _this.props.onCancel;

            if (onCancel) {
                onCancel();
            }
        };
        _this.onClickFirstLevelItem = function (dataItem) {
            var onChange = _this.props.onChange;

            _this.setState({
                firstLevelSelectValue: dataItem.value
            });
            if (dataItem.isLeaf && onChange) {
                onChange([dataItem.value]);
            }
        };
        _this.getSelectValue = function (dataItem) {
            var _this$props = _this.props,
                level = _this$props.level,
                multiSelect = _this$props.multiSelect;

            if (multiSelect) {
                var _this$state = _this.state,
                    value = _this$state.value,
                    firstLevelSelectValue = _this$state.firstLevelSelectValue;

                if (value && value.length > 0) {
                    if (level === 2 && value[0] !== firstLevelSelectValue) {
                        /* if level is 2, when first level is reselect, reset submenu array */
                        return [firstLevelSelectValue, [dataItem.value]];
                    } else {
                        /* if level is 1, or first level isn't changed when level is 2, just do add or delete for submenu array  */
                        var chosenValues = level === 2 ? value[1] : value;
                        var existIndex = chosenValues.indexOf(dataItem.value);
                        if (existIndex === -1) {
                            chosenValues.push(dataItem.value);
                        } else {
                            chosenValues.splice(existIndex, 1);
                        }
                        return value;
                    }
                } else {
                    /* if value is not exist before, init value */
                    return level === 2 ? [firstLevelSelectValue, [dataItem.value]] : [dataItem.value];
                }
            }
            return level === 2 ? [_this.state.firstLevelSelectValue, dataItem.value] : [dataItem.value];
        };
        _this.onClickSubMenuItem = function (dataItem) {
            var onChange = _this.props.onChange;

            var value = _this.getSelectValue(dataItem);
            _this.setState({ value: value });
            setTimeout(function () {
                // if onChange will close the menu, set a little time to show its selection state.
                if (onChange) {
                    onChange(value);
                }
            }, 300);
        };
        _this.state = {
            firstLevelSelectValue: _this.getNewFsv(props),
            value: props.value
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value !== this.props.value) {
                this.setState({
                    firstLevelSelectValue: this.getNewFsv(nextProps),
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'getNewFsv',
        value: function getNewFsv(props) {
            var value = props.value,
                data = props.data;

            var firstValue = '';
            if (value && value.length) {
                firstValue = value[0];
            } else if (!data[0].isLeaf) {
                firstValue = data[0].value;
            }
            return firstValue;
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var _props = this.props,
                className = _props.className,
                height = _props.height,
                _props$data = _props.data,
                data = _props$data === undefined ? [] : _props$data,
                prefixCls = _props.prefixCls,
                level = _props.level,
                multiSelect = _props.multiSelect,
                multiSelectMenuBtnsCls = _props.multiSelectMenuBtnsCls,
                MenuSelectContanerPrefixCls = _props.MenuSelectContanerPrefixCls;
            var _state = this.state,
                firstLevelSelectValue = _state.firstLevelSelectValue,
                value = _state.value;

            var subMenuData = data; // menu only has one level as init
            if (level === 2) {
                var parent = data;
                if (firstLevelSelectValue && firstLevelSelectValue !== '') {
                    parent = data.filter(function (dataItem) {
                        return dataItem.value === firstLevelSelectValue;
                    });
                }
                if (parent[0] && parent[0].children && parent[0].isLeaf !== true) {
                    subMenuData = parent[0].children;
                } else {
                    subMenuData = [];
                }
            }
            var subValue = value && value.length > 0 && [].concat(_toConsumableArray(value)) || [];
            if (level === 2 && subValue.length > 1) {
                subValue.shift();
                if (multiSelect) {
                    /* example: [[1,2,3]] -> [1,2,3] */
                    subValue = subValue[0];
                }
            }
            var parentValue = value && value.length > 1 && level === 2 ? value[0] : null;
            var subSelInitItem = subMenuData.filter(function (dataItem) {
                return subValue.indexOf(dataItem.value) !== -1;
            }).map(function (item) {
                return item.value;
            });
            var showSelect = true;
            if (level === 2 && parentValue !== firstLevelSelectValue) {
                showSelect = false;
            }
            var menuHeight = Math.round(height || document.documentElement.clientHeight / 2);
            return React.createElement(
                Flex,
                { className: classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _classNames)), style: {
                        height: menuHeight + 'px'
                    }, direction: 'column', align: 'stretch' },
                React.createElement(
                    Flex,
                    { align: 'top', className: classNames(_defineProperty({}, MenuSelectContanerPrefixCls, true)) },
                    level === 2 && React.createElement(
                        Flex.Item,
                        null,
                        React.createElement(
                            List,
                            { role: 'tablist' },
                            data.map(function (dataItem, index) {
                                return React.createElement(
                                    List.Item,
                                    { className: dataItem.value === firstLevelSelectValue ? prefixCls + '-selected' : '', onClick: function onClick() {
                                            return _this2.onClickFirstLevelItem(dataItem);
                                        }, key: 'listitem-1-' + index, role: 'tab', 'aria-selected': dataItem.value === firstLevelSelectValue },
                                    dataItem.label
                                );
                            })
                        )
                    ),
                    React.createElement(
                        Flex.Item,
                        { role: 'tabpanel', 'aria-hidden': 'false', className: classNames(_defineProperty({}, MenuSelectContanerPrefixCls + '-submenu', true)) },
                        React.createElement(SubMenu, { subMenuPrefixCls: this.props.subMenuPrefixCls, radioPrefixCls: this.props.radioPrefixCls, subMenuData: subMenuData, selItem: subSelInitItem, onSel: this.onClickSubMenuItem, showSelect: showSelect, multiSelect: multiSelect })
                    )
                ),
                multiSelect && React.createElement(
                    'div',
                    { className: classNames(_defineProperty({}, multiSelectMenuBtnsCls, true)) },
                    React.createElement(
                        Button,
                        { inline: true, className: classNames(_defineProperty({}, multiSelectMenuBtnsCls + '-btn', true)), onClick: this.onMenuCancel },
                        '\u53D6\u6D88'
                    ),
                    React.createElement(
                        Button,
                        { inline: true, type: 'primary', className: classNames(_defineProperty({}, multiSelectMenuBtnsCls + '-btn', true)), onClick: this.onMenuOk },
                        '\u786E\u5B9A'
                    )
                )
            );
        }
    }]);

    return Menu;
}(React.Component);

export default Menu;

Menu.defaultProps = {
    prefixCls: 'am-menu',
    subMenuPrefixCls: 'am-sub-menu',
    radioPrefixCls: 'am-radio',
    multiSelectMenuBtnsCls: 'am-multi-select-btns',
    MenuSelectContanerPrefixCls: 'am-menu-select-container',
    data: [],
    level: 2,
    onChange: function onChange() {},
    onOk: function onOk() {},
    onCancel: function onCancel() {},
    multiSelect: false
};