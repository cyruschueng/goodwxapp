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

var _reactNative = require('react-native');

var _PropsType = require('./PropsType');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SearchBar = function (_React$Component) {
    (0, _inherits3['default'])(SearchBar, _React$Component);

    function SearchBar(props) {
        (0, _classCallCheck3['default'])(this, SearchBar);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.onSubmit = function (e) {
            e.preventDefault();
            if (_this.props.onSubmit) {
                _this.props.onSubmit(_this.state.value);
            }
        };
        _this.onChangeText = function (value) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            if (_this.props.onChange) {
                _this.props.onChange(value);
            }
        };
        _this.onCancel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel(_this.state.value);
            }
        };
        _this.onFocus = function () {
            _this.setState({
                focus: true
            });
            if (_this.props.onFocus) {
                _this.props.onFocus();
            }
        };
        _this.onBlur = function () {
            _this.setState({
                focus: false
            });
            if (_this.props.onBlur) {
                _this.props.onBlur();
            }
        };
        var value = void 0;
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            value = '';
        }
        _this.state = {
            value: value,
            focus: false
        };
        return _this;
    }

    (0, _createClass3['default'])(SearchBar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                showCancelButton = _props.showCancelButton,
                cancelText = _props.cancelText,
                disabled = _props.disabled,
                styles = _props.styles;

            var restProps = (0, _omit2['default'])(this.props, ['showCancelButton', 'cancelText', 'styles', 'value', 'onChangeText', 'onChange', 'onSubmitEditing', 'disabled']);
            var _state = this.state,
                value = _state.value,
                focus = _state.focus;

            var _showCancelButton = showCancelButton || focus;
            return _react2['default'].createElement(
                _reactNative.View,
                { style: styles.wrapper },
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: styles.inputWrapper },
                    _react2['default'].createElement(_reactNative.TextInput, (0, _extends3['default'])({ value: value, onChangeText: this.onChangeText, style: styles.input, editable: !disabled, ref: 'searchInput', onSubmitEditing: this.onSubmit, clearButtonMode: 'always', underlineColorAndroid: 'transparent' }, restProps, { onFocus: this.onFocus, onBlur: this.onBlur }))
                ),
                _react2['default'].createElement(_reactNative.Image, { source: require('../style/images/search.png'), style: styles.search, resizeMode: 'stretch' }),
                _showCancelButton && _react2['default'].createElement(
                    _reactNative.View,
                    { style: styles.cancelTextContainer },
                    _react2['default'].createElement(
                        _reactNative.Text,
                        { style: styles.cancelText, onPress: this.onCancel },
                        cancelText
                    )
                )
            );
        }
    }]);
    return SearchBar;
}(_react2['default'].Component); /* tslint:disable:jsx-no-multiline-js */


exports['default'] = SearchBar;

SearchBar.defaultProps = (0, _extends3['default'])({}, _PropsType.defaultProps, { styles: _style2['default'] });
module.exports = exports['default'];