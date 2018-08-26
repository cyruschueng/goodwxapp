import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import createReactClass from 'create-react-class';
import classNames from 'classnames';
import ReactCarousel from 'rmc-nuka-carousel';
import omit from 'omit.js';

var Carousel = function (_React$Component) {
    _inherits(Carousel, _React$Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

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

    _createClass(Carousel, [{
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

            var restProps = omit(this.props, ['infinite', 'selectedIndex', 'beforeChange', 'afterChange', 'dots']);
            var newProps = _extends({}, restProps, { wrapAround: infinite, slideIndex: selectedIndex, beforeSlide: beforeChange });
            var Decorators = [];
            var current = this.state.selectedIndex;
            if (dots) {
                Decorators = [{
                    component: createReactClass({
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

                                var dotCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-wrap-dot', true), _defineProperty(_classNames, prefixCls + '-wrap-dot-active', index === current), _classNames));
                                var _dotStyle = index === current ? dotActiveStyle : dotStyle;
                                return React.createElement(
                                    'div',
                                    { className: dotCls, key: index },
                                    React.createElement('span', { style: _dotStyle })
                                );
                            });
                            return React.createElement(
                                'div',
                                { className: prefixCls + '-wrap' },
                                dotDom
                            );
                        }
                    }),
                    position: 'BottomCenter'
                }];
            }
            var wrapCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, className), _defineProperty(_classNames2, prefixCls, true), _defineProperty(_classNames2, prefixCls + '-vertical', vertical), _classNames2));
            return React.createElement(ReactCarousel, _extends({}, newProps, { className: wrapCls, decorators: Decorators, afterSlide: this.onChange }));
        }
    }]);

    return Carousel;
}(React.Component);

export default Carousel;

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