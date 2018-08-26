'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

var _Modal = require('rc-dialog/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PopupContainer = function (_React$Component) {
    (0, _inherits3['default'])(PopupContainer, _React$Component);

    function PopupContainer(props) {
        (0, _classCallCheck3['default'])(this, PopupContainer);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (PopupContainer.__proto__ || Object.getPrototypeOf(PopupContainer)).call(this, props));

        _this.onMaskClose = function () {
            var onMaskClose = _this.props.onMaskClose;
            if (onMaskClose) {
                var res = onMaskClose();
                if (res && res.then) {
                    res.then(function () {
                        _this.hide();
                    });
                } else {
                    _this.hide();
                }
            }
        };
        _this.state = {
            visible: props.visible || false
        };
        return _this;
    }

    (0, _createClass3['default'])(PopupContainer, [{
        key: 'hide',
        value: function hide() {
            this.setState({
                visible: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _reactNative.View,
                { style: _index2['default'].container },
                _react2['default'].createElement(
                    _Modal2['default'],
                    { style: this.props.style, animateAppear: true, onAnimationEnd: this.props.onAnimationEnd, animationType: this.props.animationType, wrapStyle: this.props.animationType === 'slide-up' ? _index2['default'].wrap : _index2['default'].wrapTop, visible: this.state.visible, maskClosable: this.props.maskClosable, onClose: this.onMaskClose },
                    this.props.children
                )
            );
        }
    }]);
    return PopupContainer;
}(_react2['default'].Component);

exports['default'] = PopupContainer;
module.exports = exports['default'];