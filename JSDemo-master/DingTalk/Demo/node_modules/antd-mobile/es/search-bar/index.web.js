import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classNames from 'classnames';
import { defaultProps } from './PropsType';
import getDataAttr from '../_util/getDataAttr';

var SearchBar = function (_React$Component) {
    _inherits(SearchBar, _React$Component);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.onSubmit = function (e) {
            e.preventDefault();
            if (_this.props.onSubmit) {
                _this.props.onSubmit(_this.state.value);
            }
            _this.refs.searchInput.blur();
        };
        _this.onChange = function (e) {
            if (!_this.state.focus) {
                _this.setState({
                    focus: true
                });
            }
            var value = e.target.value;
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            if (_this.props.onChange) {
                _this.props.onChange(value);
            }
        };
        _this.onFocus = function () {
            _this.setState({
                focus: true
            });
            _this.firstFocus = true;
            if (!('focused' in _this.props)) {
                _this.setState({
                    focused: true
                });
            }
            if (_this.props.onFocus) {
                _this.props.onFocus();
            }
            if (document.activeElement.tagName.toLowerCase() === 'input') {
                _this.scrollIntoViewTimeout = setTimeout(function () {
                    try {
                        document.activeElement.scrollIntoViewIfNeeded();
                    } catch (e) {}
                }, 100);
            }
        };
        _this.onBlur = function () {
            _this.onBlurTimeout = setTimeout(function () {
                if (!_this.blurFromOnClear) {
                    if (document.activeElement !== _this.refs.search) {
                        _this.setState({
                            focus: false
                        });
                    }
                }
                _this.blurFromOnClear = false;
            }, 50);
            if (!('focused' in _this.props)) {
                _this.setState({
                    focused: false
                });
            }
            if (_this.props.onBlur) {
                _this.props.onBlur();
            }
        };
        _this.onClear = function () {
            _this.doClear();
        };
        _this.doClear = function () {
            var blurFromOnClear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            _this.blurFromOnClear = blurFromOnClear;
            if (!('value' in _this.props)) {
                _this.setState({ value: '' });
            }
            if (_this.props.onClear) {
                _this.props.onClear('');
            }
            if (_this.props.onChange) {
                _this.props.onChange('');
            }
            if (blurFromOnClear) {
                _this.refs.searchInput.focus();
            }
        };
        _this.onCancel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel(_this.state.value);
            } else {
                _this.doClear(false);
            }
        };
        var value = void 0;
        if ('value' in props) {
            value = props.value || '';
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            value = '';
        }
        _this.state = {
            value: value,
            focus: false,
            focused: props.focused || false
        };
        return _this;
    }

    _createClass(SearchBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var initBtn = window.getComputedStyle(this.refs.rightBtn);
            this.rightBtnInitMarginleft = initBtn['margin-left'];
            if ((this.props.autoFocus || this.state.focused) && navigator.userAgent.indexOf('AlipayClient') > 0) {
                this.refs.searchInput.focus();
            }
            this.componentDidUpdate();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // 检测是否包含名为 ${this.props.prefixCls}-start 样式，生成动画
            // offsetWidth 某些时候是向上取整，某些时候是向下取整，不能用
            var realWidth = this.refs.syntheticPhContainer.getBoundingClientRect().width; // 包含小数
            if (this.refs.searchInputContainer.className.indexOf(this.props.prefixCls + '-start') > -1) {
                this.refs.syntheticPh.style.width = Math.ceil(realWidth) + 'px';
                if (!this.props.showCancelButton) {
                    this.refs.rightBtn.style.marginRight = 0;
                }
            } else {
                this.refs.syntheticPh.style.width = '100%';
                if (!this.props.showCancelButton) {
                    this.refs.rightBtn.style.marginRight = '-' + (this.refs.rightBtn.offsetWidth + parseInt(this.rightBtnInitMarginleft, 10)) + 'px';
                }
            }
            if (this.state.focused) {
                this.refs.searchInput.focus();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
            if ('focused' in nextProps) {
                this.setState({
                    focused: nextProps.focused
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollIntoViewTimeout) {
                clearTimeout(this.scrollIntoViewTimeout);
                this.scrollIntoViewTimeout = null;
            }
            if (this.onBlurTimeout) {
                clearTimeout(this.onBlurTimeout);
                this.onBlurTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames, _classNames2, _classNames3;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                showCancelButton = _props.showCancelButton,
                disabled = _props.disabled,
                placeholder = _props.placeholder,
                cancelText = _props.cancelText,
                className = _props.className,
                style = _props.style,
                maxLength = _props.maxLength;
            var _state = this.state,
                value = _state.value,
                focus = _state.focus;

            var wrapCls = classNames((_classNames = {}, _defineProperty(_classNames, '' + prefixCls, true), _defineProperty(_classNames, prefixCls + '-start', focus || value && value.length > 0), _defineProperty(_classNames, className, className), _classNames));
            var clearCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-clear', true), _defineProperty(_classNames2, prefixCls + '-clear-show', focus && value && value.length > 0), _classNames2));
            var cancelCls = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls + '-cancel', true), _defineProperty(_classNames3, prefixCls + '-cancel-show', showCancelButton || focus || value && value.length > 0), _defineProperty(_classNames3, prefixCls + '-cancel-anim', this.firstFocus), _classNames3));
            return React.createElement(
                'form',
                { onSubmit: this.onSubmit, className: wrapCls, style: style, ref: 'searchInputContainer', action: '#' },
                React.createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-synthetic-ph', ref: 'syntheticPh' },
                        React.createElement(
                            'span',
                            { className: prefixCls + '-synthetic-ph-container', ref: 'syntheticPhContainer' },
                            React.createElement('i', { className: prefixCls + '-synthetic-ph-icon' }),
                            React.createElement(
                                'span',
                                { className: prefixCls + '-synthetic-ph-placeholder', style: { visibility: placeholder && !value ? 'visible' : 'hidden' } },
                                placeholder
                            )
                        )
                    ),
                    React.createElement('input', _extends({ type: 'search', className: prefixCls + '-value', value: value, disabled: disabled, placeholder: placeholder, onChange: this.onChange, onFocus: this.onFocus, onBlur: this.onBlur, ref: 'searchInput', maxLength: maxLength }, getDataAttr(this.props))),
                    React.createElement('a', { onClick: this.onClear, className: clearCls })
                ),
                React.createElement(
                    'div',
                    { className: cancelCls, onClick: this.onCancel, ref: 'rightBtn' },
                    cancelText
                )
            );
        }
    }]);

    return SearchBar;
}(React.Component);

export default SearchBar;

SearchBar.defaultProps = defaultProps;