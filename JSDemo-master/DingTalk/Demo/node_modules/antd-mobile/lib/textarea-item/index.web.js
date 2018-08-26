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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {} /* tslint:disable:jsx-no-multiline-js */

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;
function countSymbols() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return text.replace(regexAstralSymbols, '_').length;
}

var TextareaItem = function (_React$Component) {
    (0, _inherits3['default'])(TextareaItem, _React$Component);

    function TextareaItem(props) {
        (0, _classCallCheck3['default'])(this, TextareaItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TextareaItem.__proto__ || Object.getPrototypeOf(TextareaItem)).call(this, props));

        _this.onChange = function (e) {
            var value = e.target.value;
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange(value);
            }
            // 设置 defaultValue 时，用户输入不会触发 componentDidUpdate ，此处手工调用
            _this.componentDidUpdate();
        };
        _this.onBlur = function (e) {
            _this.debounceTimeout = setTimeout(function () {
                if (document.activeElement !== _this.refs.textarea) {
                    _this.setState({
                        focus: false
                    });
                }
            }, 100);
            if (!('focused' in _this.props)) {
                _this.setState({
                    focused: false
                });
            }
            var value = e.target.value;
            if (_this.props.onBlur) {
                _this.props.onBlur(value);
            }
        };
        _this.onFocus = function (e) {
            if (_this.debounceTimeout) {
                clearTimeout(_this.debounceTimeout);
                _this.debounceTimeout = null;
            }
            if (!('focused' in _this.props)) {
                _this.setState({
                    focused: true
                });
            }
            _this.setState({
                focus: true
            });
            var value = e.target.value;
            if (_this.props.onFocus) {
                _this.props.onFocus(value);
            }
            if (document.activeElement.tagName.toLowerCase() === 'textarea') {
                _this.scrollIntoViewTimeout = setTimeout(function () {
                    try {
                        document.activeElement.scrollIntoViewIfNeeded();
                    } catch (e) {}
                }, 100);
            }
        };
        _this.onErrorClick = function () {
            if (_this.props.onErrorClick) {
                _this.props.onErrorClick();
            }
        };
        _this.clearInput = function () {
            if (_this.props.onChange) {
                _this.props.onChange('');
            }
        };
        _this.state = {
            focus: false,
            focused: props.focused || false
        };
        return _this;
    }

    (0, _createClass3['default'])(TextareaItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.componentDidUpdate();
            if ((this.props.autoFocus || this.state.focused) && navigator.userAgent.indexOf('AlipayClient') > 0) {
                this.refs.textarea.focus();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.autoHeight && (this.state.focus || this.state.focused)) {
                var textareaDom = this.refs.textarea;
                textareaDom.style.height = ''; // 字数减少时能自动减小高度
                textareaDom.style.height = textareaDom.scrollHeight + 'px';
            }
            if (this.state.focused) {
                this.refs.textarea.focus();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('focused' in nextProps) {
                this.setState({
                    focused: nextProps.focused
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
                style = _props.style,
                title = _props.title,
                value = _props.value,
                defaultValue = _props.defaultValue,
                clear = _props.clear,
                editable = _props.editable,
                disabled = _props.disabled,
                error = _props.error,
                className = _props.className,
                labelNumber = _props.labelNumber,
                autoHeight = _props.autoHeight;

            var count = this.props.count;
            var rows = this.props.rows;
            // note: remove `placeholderTextColor` prop for rn TextInput supports placeholderTextColor
            var otherProps = (0, _omit2['default'])(this.props, ['prefixCls', 'prefixListCls', 'editable', 'style', 'clear', 'children', 'error', 'className', 'count', 'labelNumber', 'title', 'onErrorClick', 'autoHeight', 'autoFocus', 'focused', 'placeholderTextColor']);
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
            var focus = this.state.focus;

            var wrapCls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixListCls + '-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-item', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classNames, prefixCls + '-item-single-line', rows === 1 && !autoHeight), (0, _defineProperty3['default'])(_classNames, prefixCls + '-error', error), (0, _defineProperty3['default'])(_classNames, prefixCls + '-focus', focus), (0, _defineProperty3['default'])(_classNames, className, className), _classNames));
            var labelCls = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-2', labelNumber === 2), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-3', labelNumber === 3), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-4', labelNumber === 4), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-5', labelNumber === 5), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-6', labelNumber === 6), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-label-7', labelNumber === 7), _classNames2));
            var characterLength = countSymbols(value);
            var lengthCtrlProps = {};
            if (count > 0) {
                lengthCtrlProps.maxLength = count - characterLength + (value ? value.length : 0);
            }
            return _react2['default'].createElement(
                'div',
                { className: wrapCls, style: style },
                title && _react2['default'].createElement(
                    'div',
                    { className: labelCls },
                    title
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-control' },
                    _react2['default'].createElement('textarea', (0, _extends3['default'])({ ref: 'textarea' }, lengthCtrlProps, otherProps, valueProps, { onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, readOnly: !editable }))
                ),
                clear && editable && value && characterLength > 0 && _react2['default'].createElement('div', { className: prefixCls + '-clear', onClick: this.clearInput, onTouchStart: this.clearInput }),
                error && _react2['default'].createElement('div', { className: prefixCls + '-error-extra', onClick: this.onErrorClick }),
                count > 0 && rows > 1 && _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-count' },
                    _react2['default'].createElement(
                        'span',
                        null,
                        value ? characterLength : 0
                    ),
                    '/',
                    count
                )
            );
        }
    }]);
    return TextareaItem;
}(_react2['default'].Component);

exports['default'] = TextareaItem;

TextareaItem.defaultProps = {
    prefixCls: 'am-textarea',
    prefixListCls: 'am-list',
    autoHeight: false,
    editable: true,
    disabled: false,
    placeholder: '',
    clear: false,
    rows: 1,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onErrorClick: noop,
    error: false,
    labelNumber: 5
};
module.exports = exports['default'];