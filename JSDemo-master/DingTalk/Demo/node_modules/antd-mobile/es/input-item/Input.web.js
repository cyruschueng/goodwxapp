import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import omit from 'omit.js';

var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.onInputBlur = function (e) {
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
        _this.onInputFocus = function (e) {
            if (!('focused' in _this.props)) {
                _this.setState({
                    focused: true
                });
            }
            var value = e.target.value;
            if (_this.props.onFocus) {
                _this.props.onFocus(value);
            }
        };
        _this.focus = function () {
            _this.refs.input.focus();
        };
        _this.state = {
            focused: props.focused || false
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('focused' in nextProps) {
                this.setState({
                    focused: nextProps.focused
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if ((this.props.autoFocus || this.state.focused) && navigator.userAgent.indexOf('AlipayClient') > 0) {
                this.refs.input.focus();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.state.focused) {
                this.refs.input.focus();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var otherProps = omit(this.props, ['onBlur', 'onFocus', 'focused', 'autoFocus']);
            return React.createElement('input', _extends({ ref: 'input', onBlur: this.onInputBlur, onFocus: this.onInputFocus }, otherProps));
        }
    }]);

    return Input;
}(React.Component);

export default Input;