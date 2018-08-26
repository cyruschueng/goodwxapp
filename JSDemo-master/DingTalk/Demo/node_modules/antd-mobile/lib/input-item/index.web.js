'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

var _Input = require('./Input.web');

var _Input2 = _interopRequireDefault(_Input);

var _CustomInput = require('./CustomInput.web');

var _CustomInput2 = _interopRequireDefault(_CustomInput);

var _getLocale = require('../_util/getLocale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {} /* tslint:disable:jsx-no-multiline-js */

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var InputItem = function (_React$Component) {
    (0, _inherits3['default'])(InputItem, _React$Component);

    function InputItem(props) {
        (0, _classCallCheck3['default'])(this, InputItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (InputItem.__proto__ || Object.getPrototypeOf(InputItem)).call(this, props));

        _this.onInputChange = function (e) {
            var value = e.target.value;
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                type = _this$props.type;

            switch (type) {
                case 'text':
                    break;
                case 'bankCard':
                    value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                    break;
                case 'phone':
                    value = value.replace(/\D/g, '').substring(0, 11);
                    var valueLen = value.length;
                    if (valueLen > 3 && valueLen < 8) {
                        value = value.substr(0, 3) + ' ' + value.substr(3);
                    } else if (valueLen >= 8) {
                        value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7);
                    }
                    break;
                case 'number':
                    value = value.replace(/\D/g, '');
                    break;
                case 'password':
                    break;
                default:
                    break;
            }
            if (onChange) {
                onChange(value);
            }
        };
        _this.onInputFocus = function (value) {
            if (_this.debounceTimeout) {
                clearTimeout(_this.debounceTimeout);
                _this.debounceTimeout = null;
            }
            _this.setState({
                focus: true
            });
            if (document.activeElement.tagName.toLowerCase() === 'input') {
                _this.scrollIntoViewTimeout = setTimeout(function () {
                    try {
                        document.activeElement.scrollIntoViewIfNeeded();
                    } catch (e) {}
                }, 100);
            }
            if (_this.props.onFocus) {
                _this.props.onFocus(value);
            }
        };
        _this.onInputBlur = function (value) {
            _this.debounceTimeout = setTimeout(function () {
                if (document.activeElement !== _this.refs.input.refs.input) {
                    _this.setState({
                        focus: false
                    });
                }
            }, 200);
            if (_this.props.onBlur) {
                _this.props.onBlur(value);
            }
        };
        _this.onExtraClick = function (e) {
            if (_this.props.onExtraClick) {
                _this.props.onExtraClick(e);
            }
        };
        _this.onErrorClick = function (e) {
            if (_this.props.onErrorClick) {
                _this.props.onErrorClick(e);
            }
        };
        _this.clearInput = function () {
            if (_this.props.type !== 'password' && _this.props.updatePlaceholder) {
                _this.setState({
                    placeholder: _this.props.value
                });
            }
            if (_this.props.onChange) {
                _this.props.onChange('');
            }
            _this.focus();
        };
        _this.focus = function () {
            _this.refs.input.focus();
        };
        _this.state = {
            placeholder: props.placeholder
        };
        return _this;
    }

    (0, _createClass3['default'])(InputItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('placeholder' in nextProps && !nextProps.updatePlaceholder) {
                this.setState({
                    placeholder: nextProps.placeholder
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }
            if (this.scrollIntoViewTimeout) {
                clearTimeout(this.scrollIntoViewTimeout);
                this.scrollIntoViewTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames, _classNames2;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                prefixListCls = _props.prefixListCls,
                type = _props.type,
                value = _props.value,
                defaultValue = _props.defaultValue,
                name = _props.name,
                editable = _props.editable,
                disabled = _props.disabled,
                style = _props.style,
                clear = _props.clear,
                children = _props.children,
                error = _props.error,
                className = _props.className,
                extra = _props.extra,
                labelNumber = _props.labelNumber,
                maxLength = _props.maxLength;
            // note: remove `placeholderTextColor` prop for rn TextInput supports placeholderTextColor

            var otherProps = (0, _omit2['default'])(this.props, ['prefixCls', 'prefixListCls', 'editable', 'style', 'clear', 'children', 'error', 'className', 'extra', 'labelNumber', 'onExtraClick', 'onErrorClick', 'updatePlaceholder', 'placeholderTextColor', 'type', 'locale']);
            var locale = (0, _getLocale.getComponentLocale)(this.props, this.context, 'InputItem', function () {
                return require('./locale/zh_CN');
            });
            var confirmLabel = locale.confirmLabel;
            var _state = this.state,
                placeholder = _state.placeholder,
                focus = _state.focus;

            var wrapCls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixListCls + '-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classNames, prefixCls + '-error', error), (0, _defineProperty3['default'])(_classNames, prefixCls + '-focus', focus), (0, _defineProperty3['default'])(_classNames, prefixCls + '-android', focus), (0, _defineProperty3['default'])(_classNames, className, className), _classNames));
            var labelCls = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-2', labelNumber === 2), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-3', labelNumber === 3), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-4', labelNumber === 4), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-5', labelNumber === 5), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-6', labelNumber === 6), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-7', labelNumber === 7), _classNames2));
            var controlCls = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-control', true));
            var inputType = 'text';
            if (type === 'bankCard' || type === 'phone') {
                inputType = 'tel';
            } else if (type === 'password') {
                inputType = 'password';
            } else if (type === 'digit') {
                inputType = 'number';
            } else if (type !== 'text' && type !== 'number') {
                inputType = type;
            }
            var valueProps = void 0;
            if ('value' in this.props) {
                valueProps = {
                    value: fixControlledValue(value)
                };
            } else {
                valueProps = {
                    defaultValue: defaultValue
                };
            }
            var patternProps = void 0;
            if (type === 'number') {
                patternProps = {
                    pattern: '[0-9]*'
                };
            }
            var classNameProps = void 0;
            if (type === 'digit') {
                classNameProps = {
                    className: 'h5numInput'
                };
            }
            return _react2['default'].createElement(
                'div',
                { className: wrapCls, style: style },
                children ? _react2['default'].createElement(
                    'div',
                    { className: labelCls },
                    children
                ) : null,
                _react2['default'].createElement(
                    'div',
                    { className: controlCls },
                    type === 'money' ? _react2['default'].createElement(_CustomInput2['default'], (0, _extends3['default'])({ type: type, ref: 'input', maxLength: maxLength, placeholder: placeholder, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, disabled: disabled, editable: editable, value: fixControlledValue(value) }, this.props.focused !== undefined ? { focused: this.props.focused } : {}, this.props.autoFocus !== undefined ? { autoFocus: this.props.autoFocus } : {}, { prefixCls: prefixCls, confirmLabel: confirmLabel })) : _react2['default'].createElement(_Input2['default'], (0, _extends3['default'])({}, patternProps, otherProps, valueProps, classNameProps, { ref: 'input', type: inputType, maxLength: maxLength, name: name, placeholder: placeholder, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, readOnly: !editable, disabled: disabled }))
                ),
                clear && editable && !disabled && value && value.length > 0 ? _react2['default'].createElement('div', { className: prefixCls + '-clear', onClick: this.clearInput }) : null,
                error ? _react2['default'].createElement('div', { className: prefixCls + '-error-extra', onClick: this.onErrorClick }) : null,
                extra !== '' ? _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-extra', onClick: this.onExtraClick },
                    extra
                ) : null
            );
        }
    }]);
    return InputItem;
}(_react2['default'].Component);

InputItem.defaultProps = {
    prefixCls: 'am-input',
    prefixListCls: 'am-list',
    type: 'text',
    editable: true,
    disabled: false,
    placeholder: '',
    clear: false,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    extra: '',
    onExtraClick: noop,
    error: false,
    onErrorClick: noop,
    labelNumber: 5,
    updatePlaceholder: false
};
InputItem.contextTypes = {
    antLocale: _propTypes2['default'].object
};
exports['default'] = InputItem;
module.exports = exports['default'];