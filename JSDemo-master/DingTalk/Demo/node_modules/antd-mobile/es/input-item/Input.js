import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { TextInput } from 'react-native';

var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

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
            if (nextProps.focused !== this.state.focused) {
                this.setState({
                    focused: nextProps.focused
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.autoFocus || this.props.focused) {
                this.refs.input.focus();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.focused) {
                this.refs.input.focus();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(TextInput, _extends({ ref: 'input', underlineColorAndroid: 'transparent' }, this.props));
        }
    }]);

    return Input;
}(React.Component);

export default Input;