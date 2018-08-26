'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Marquee = (0, _createReactClass2['default'])({
    displayName: 'Marquee',
    getDefaultProps: function getDefaultProps() {
        return {
            text: '',
            loop: false,
            leading: 500,
            trailing: 800,
            fps: 40,
            className: ''
        };
    },
    getInitialState: function getInitialState() {
        return {
            animatedWidth: 0,
            overflowWidth: 0
        };
    },
    componentDidMount: function componentDidMount() {
        this._measureText();
        this._startAnimation();
    },
    componentDidUpdate: function componentDidUpdate() {
        this._measureText();
        if (!this._marqueeTimer) {
            this._startAnimation();
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        clearTimeout(this._marqueeTimer);
    },
    render: function render() {
        var _props = this.props,
            prefixCls = _props.prefixCls,
            className = _props.className,
            text = _props.text;

        var style = (0, _extends3['default'])({ position: 'relative', right: this.state.animatedWidth, whiteSpace: 'nowrap', display: 'inline-block' }, this.props.style);
        return _react2['default'].createElement(
            'div',
            { className: prefixCls + '-marquee-wrap ' + className, style: { overflow: 'hidden' }, role: 'marquee' },
            _react2['default'].createElement(
                'div',
                { ref: 'text', className: prefixCls + '-marquee', style: style },
                text,
                ' '
            )
        );
    },
    _startAnimation: function _startAnimation() {
        var _this = this;

        clearTimeout(this._marqueeTimer);
        var TIMEOUT = 1 / this.props.fps * 1000;
        var isLeading = this.state.animatedWidth === 0;
        var timeout = isLeading ? this.props.leading : TIMEOUT;
        var animate = function animate() {
            var overflowWidth = _this.state.overflowWidth;

            var animatedWidth = _this.state.animatedWidth + 1;
            var isRoundOver = animatedWidth > overflowWidth;
            if (isRoundOver) {
                if (_this.props.loop) {
                    animatedWidth = 0;
                } else {
                    return;
                }
            }
            if (isRoundOver && _this.props.trailing) {
                _this._marqueeTimer = setTimeout(function () {
                    _this.setState({
                        animatedWidth: animatedWidth
                    });
                    _this._marqueeTimer = setTimeout(animate, TIMEOUT);
                }, _this.props.trailing);
            } else {
                _this.setState({
                    animatedWidth: animatedWidth
                });
                _this._marqueeTimer = setTimeout(animate, TIMEOUT);
            }
        };
        if (this.state.overflowWidth !== 0) {
            this._marqueeTimer = setTimeout(animate, timeout);
        }
    },
    _measureText: function _measureText() {
        var container = _reactDom2['default'].findDOMNode(this);
        var node = _reactDom2['default'].findDOMNode(this.refs.text);
        if (container && node) {
            var containerWidth = container.offsetWidth;
            var textWidth = node.offsetWidth;
            var overflowWidth = textWidth - containerWidth;
            if (overflowWidth !== this.state.overflowWidth) {
                this.setState({
                    overflowWidth: overflowWidth
                });
            }
        }
    }
}); /*
     * https://github.com/jasonslyvia/react-marquee
     * remove PC
     * support React Element for text prop
    */
exports['default'] = Marquee;
module.exports = exports['default'];