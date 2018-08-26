import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import CustomKeyboard from './CustomKeyboard.web';
import { addClass, removeClass } from '../_util/class';

var NumberInput = function (_React$Component) {
    _inherits(NumberInput, _React$Component);

    function NumberInput(props) {
        _classCallCheck(this, NumberInput);

        var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

        _this.getComponent = function () {
            var _this$props = _this.props,
                keyboardPrefixCls = _this$props.keyboardPrefixCls,
                confirmLabel = _this$props.confirmLabel;

            return React.createElement(CustomKeyboard, { onClick: _this.onKeyboardClick, preixCls: keyboardPrefixCls, confirmLabel: confirmLabel });
        };
        _this.renderCustomKeyboard = function () {
            var container = document.querySelector('#' + _this.props.keyboardPrefixCls + '-container');
            if (!container) {
                container = document.createElement('div');
                container.setAttribute('id', _this.props.keyboardPrefixCls + '-container');
                document.body.appendChild(container);
                window.antmCustomKeyboard = ReactDOM.unstable_renderSubtreeIntoContainer(_this, _this.getComponent(), container);
            }
        };
        _this._blurEventListener = function (ev) {
            var value = _this.props.value;

            if (ev.target !== _this.refs['input-container']) {
                _this.onInputBlur(value);
            }
        };
        _this.unLinkInput = function () {
            var antmCustomKeyboard = window.antmCustomKeyboard;
            if (antmCustomKeyboard.linkedInput === _this) {
                antmCustomKeyboard.linkedInput = null;
                addClass(antmCustomKeyboard.antmKeyboard, _this.props.keyboardPrefixCls + '-wrapper-hide');
            }
        };
        _this.onInputBlur = function (value) {
            var focused = _this.state.focused;

            if (focused) {
                _this.setState({
                    focused: false
                });
                _this.props.onBlur(value);
                setTimeout(function () {
                    _this.unLinkInput();
                }, 50);
            }
        };
        _this.onInputFocus = function (value) {
            _this.props.onFocus(value);
            _this.setState({
                focused: true
            }, function () {
                var antmCustomKeyboard = window.antmCustomKeyboard;
                antmCustomKeyboard.linkedInput = _this;
                removeClass(antmCustomKeyboard.antmKeyboard, _this.props.keyboardPrefixCls + '-wrapper-hide');
                antmCustomKeyboard.confirmDisabled = value === '';
                if (value === '') {
                    addClass(antmCustomKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                } else {
                    removeClass(antmCustomKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                }
            });
        };
        _this.onKeyboardClick = function (KeyboardItemValue) {
            var _this$props2 = _this.props,
                value = _this$props2.value,
                onChange = _this$props2.onChange,
                maxLength = _this$props2.maxLength;

            var valueAfterChange = void 0;
            // 删除键
            if (KeyboardItemValue === 'delete') {
                valueAfterChange = value.substring(0, value.length - 1);
                onChange({ target: { value: valueAfterChange } });
                // 确认键
            } else if (KeyboardItemValue === 'confirm') {
                valueAfterChange = value;
                onChange({ target: { value: valueAfterChange } });
                _this.onInputBlur(value);
                // 收起键
            } else if (KeyboardItemValue === 'hide') {
                valueAfterChange = value;
                _this.onInputBlur(valueAfterChange);
            } else {
                if (maxLength !== undefined && +maxLength >= 0 && (value + KeyboardItemValue).length > maxLength) {
                    valueAfterChange = (value + KeyboardItemValue).substr(0, maxLength);
                    onChange({ target: { value: valueAfterChange } });
                } else {
                    valueAfterChange = value + KeyboardItemValue;
                    onChange({ target: { value: valueAfterChange } });
                }
            }
            var antmCustomKeyboard = window.antmCustomKeyboard;
            antmCustomKeyboard.confirmDisabled = valueAfterChange === '';
            if (valueAfterChange === '') {
                addClass(antmCustomKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
            } else {
                removeClass(antmCustomKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
            }
        };
        _this.onFakeInputClick = function () {
            var value = _this.props.value;
            var focused = _this.state.focused;

            if (!focused) {
                _this.onInputFocus(value);
            }
        };
        _this.focus = function () {
            document.removeEventListener('click', _this._blurEventListener, false);
            _this.onFakeInputClick();
            setTimeout(function () {
                document.addEventListener('click', _this._blurEventListener, false);
            }, 50);
        };
        _this.state = {
            focused: props.focused || false
        };
        return _this;
    }

    _createClass(NumberInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if ('focused' in nextProps && nextProps.focused !== this.state.focused) {
                this.debounceFocusTimeout = setTimeout(function () {
                    var _props = _this2.props,
                        disabled = _props.disabled,
                        editable = _props.editable;

                    if (nextProps.focused && !disabled && editable) {
                        _this2.onInputFocus(_this2.props.value);
                    }
                }, 10);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!window.antmCustomKeyboard) {
                this.renderCustomKeyboard();
            }
            var _props2 = this.props,
                autoFocus = _props2.autoFocus,
                focused = _props2.focused,
                value = _props2.value,
                disabled = _props2.disabled,
                editable = _props2.editable;

            if ((autoFocus || focused) && !disabled && editable) {
                this.onInputFocus(value);
            }
            document.addEventListener('click', this._blurEventListener, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this._blurEventListener, false);
            if (this.debounceFocusTimeout) {
                clearTimeout(this.debounceFocusTimeout);
                this.debounceFocusTimeout = null;
            }
            this.unLinkInput();
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props3 = this.props,
                placeholder = _props3.placeholder,
                value = _props3.value,
                disabled = _props3.disabled,
                editable = _props3.editable;
            var focused = this.state.focused;

            var preventKeyboard = disabled || !editable;
            var fakeInputCls = classNames((_classNames = {}, _defineProperty(_classNames, 'fake-input', true), _defineProperty(_classNames, 'focus', focused), _defineProperty(_classNames, 'fake-input-disabled', disabled), _classNames));
            return React.createElement(
                'div',
                { className: 'fake-input-container' },
                value === '' && React.createElement(
                    'div',
                    { className: 'fake-input-placeholder' },
                    placeholder
                ),
                React.createElement(
                    'div',
                    { className: fakeInputCls, ref: 'input-container', onClick: preventKeyboard ? function () {} : this.onFakeInputClick },
                    value
                )
            );
        }
    }]);

    return NumberInput;
}(React.Component);

NumberInput.defaultProps = {
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    placeholder: '',
    value: '',
    disabled: false,
    editable: true,
    prefixCls: 'am-input',
    keyboardPrefixCls: 'am-number-keyboard'
};
export default NumberInput;