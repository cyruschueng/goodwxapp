import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';
import Touchable from 'rc-touchable';

var SegmentedControl = function (_React$Component) {
    _inherits(SegmentedControl, _React$Component);

    function SegmentedControl(props) {
        _classCallCheck(this, SegmentedControl);

        var _this = _possibleConstructorReturn(this, (SegmentedControl.__proto__ || Object.getPrototypeOf(SegmentedControl)).call(this, props));

        _this.state = {
            selectedIndex: props.selectedIndex
        };
        return _this;
    }

    _createClass(SegmentedControl, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedIndex !== this.state.selectedIndex) {
                this.setState({
                    selectedIndex: nextProps.selectedIndex
                });
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(e, index, value) {
            var _props = this.props,
                disabled = _props.disabled,
                onChange = _props.onChange,
                onValueChange = _props.onValueChange;

            if (!disabled && this.state.selectedIndex !== index) {
                // just do a mock so that the api to be the same as react-native
                e.nativeEvent = e.nativeEvent ? e.nativeEvent : {};
                e.nativeEvent.selectedSegmentIndex = index;
                e.nativeEvent.value = value;
                if (onChange) {
                    onChange(e);
                }
                if (onValueChange) {
                    onValueChange(value);
                }
                this.setState({
                    selectedIndex: index
                });
            }
        }
    }, {
        key: 'renderSegmentItem',
        value: function renderSegmentItem(idx, value, selected) {
            var _classNames,
                _this2 = this;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                disabled = _props2.disabled,
                tintColor = _props2.tintColor;

            var itemCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-selected', selected), _classNames));
            var itemStyle = {
                color: selected ? '#fff' : tintColor,
                backgroundColor: selected ? tintColor : '#fff',
                borderColor: tintColor
            };
            var activeInnerStyle = tintColor ? {
                backgroundColor: tintColor
            } : {};
            return React.createElement(
                Touchable,
                { key: idx, disabled: disabled, activeClassName: prefixCls + '-item-active' },
                React.createElement(
                    'div',
                    { className: itemCls, style: itemStyle, role: 'tab', 'aria-selected': selected && !disabled, 'aria-disabled': disabled, onClick: disabled ? undefined : function (e) {
                            return _this2.onClick(e, idx, value);
                        } },
                    React.createElement('div', { className: prefixCls + '-item-inner', style: activeInnerStyle }),
                    value
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames2,
                _this3 = this;

            var _props3 = this.props,
                className = _props3.className,
                prefixCls = _props3.prefixCls,
                style = _props3.style,
                disabled = _props3.disabled,
                _props3$values = _props3.values,
                values = _props3$values === undefined ? [] : _props3$values;

            var wrapCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, '' + prefixCls, true), _defineProperty(_classNames2, prefixCls + '-disabled', disabled), _classNames2));
            return React.createElement(
                'div',
                { className: wrapCls, style: style, role: 'tablist' },
                values.map(function (value, idx) {
                    return _this3.renderSegmentItem(idx, value, idx === _this3.state.selectedIndex);
                })
            );
        }
    }]);

    return SegmentedControl;
}(React.Component);

export default SegmentedControl;

SegmentedControl.defaultProps = {
    prefixCls: 'am-segment',
    selectedIndex: 0,
    disabled: false,
    values: [],
    onChange: function onChange() {},
    onValueChange: function onValueChange() {},

    style: {},
    tintColor: ''
};