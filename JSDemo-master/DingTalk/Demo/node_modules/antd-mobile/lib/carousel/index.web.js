'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rmcNukaCarousel = require('rmc-nuka-carousel');

var _rmcNukaCarousel2 = _interopRequireDefault(_rmcNukaCarousel);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Carousel = function (_React$Component) {
    (0, _inherits3['default'])(Carousel, _React$Component);

    function Carousel(props) {
        (0, _classCallCheck3['default'])(this, Carousel);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.onChange = function (index) {
            _this.setState({
                selectedIndex: index
            }, function () {
                if (_this.props.afterChange) {
                    _this.props.afterChange(index);
                }
            });
        };
        _this.state = {
            selectedIndex: _this.props.selectedIndex
        };
        return _this;
    }

    (0, _createClass3['default'])(Carousel, [{
        key: 'render',
        value: function render() {
            var _classNames2;

            var _props = this.props,
                className = _props.className,
                prefixCls = _props.prefixCls,
                dotStyle = _props.dotStyle,
                dotActiveStyle = _props.dotActiveStyle,
                infinite = _props.infinite,
                selectedIndex = _props.selectedIndex,
                beforeChange = _props.beforeChange,
                dots = _props.dots,
                vertical = _props.vertical;

            var restProps = (0, _omit2['default'])(this.props, ['infinite', 'selectedIndex', 'beforeChange', 'afterChange', 'dots']);
            var newProps = (0, _extends3['default'])({}, restProps, { wrapAround: infinite, slideIndex: selectedIndex, beforeSlide: beforeChange });
            var Decorators = [];
            var current = this.state.selectedIndex;
            if (dots) {
                Decorators = [{
                    component: (0, _createReactClass2['default'])({
                        displayName: 'component',
                        render: function render() {
                            var _props2 = this.props,
                                slideCount = _props2.slideCount,
                                slidesToScroll = _props2.slidesToScroll;

                            var arr = [];
                            for (var i = 0; i < slideCount; i += slidesToScroll) {
                                arr.push(i);
                            }
                            var dotDom = arr.map(function (index) {
                                var _classNames;

                                var dotCls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-wrap-dot', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-wrap-dot-active', index === current), _classNames));
                                var _dotStyle = index === current ? dotActiveStyle : dotStyle;
                                return _react2['default'].createElement(
                                    'div',
                                    { className: dotCls, key: index },
                                    _react2['default'].createElement('span', { style: _dotStyle })
                                );
                            });
                            return _react2['default'].createElement(
                                'div',
                                { className: prefixCls + '-wrap' },
                                dotDom
                            );
                        }
                    }),
                    position: 'BottomCenter'
                }];
            }
            var wrapCls = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, className, className), (0, _defineProperty3['default'])(_classNames2, prefixCls, true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-vertical', vertical), _classNames2));
            return _react2['default'].createElement(_rmcNukaCarousel2['default'], (0, _extends3['default'])({}, newProps, { className: wrapCls, decorators: Decorators, afterSlide: this.onChange }));
        }
    }]);
    return Carousel;
}(_react2['default'].Component);

exports['default'] = Carousel;

Carousel.defaultProps = {
    prefixCls: 'am-carousel',
    dots: true,
    arrows: false,
    autoplay: false,
    infinite: false,
    edgeEasing: 'linear',
    cellAlign: 'center',
    selectedIndex: 0,
    dotStyle: {},
    dotActiveStyle: {}
};
module.exports = exports['default'];