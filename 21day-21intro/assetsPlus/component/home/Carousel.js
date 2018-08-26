"use strict";
/**
 * ict主淫部门统一UI库
 * @module ICT-UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SwipeView_1 = require("../../component/container/SwipeView").default;
/**
 * 滑动容器组件
 *
 * @export
 * @class Carousel
 * @extends {React.PureComponent<propsTypes>}
 * @type ICT-UI-Component
 * @author heartblood
 * @param {number} index - [必填] 当前显示index
 * @param {function} handleIndexChangeCallback - [可选] index改变时候会触发该回调函数，必须含有一个参数index，index为 +- 1，表明当前index改变值
 * @param {string} direction - [可选] 表明方向，vertical为垂直，horizontal为水平，默认为垂直
 * @param {string} styleTop - [可选] 顶部slot样式
 * @param {string} styleBottom - [可选] 底部slot样式
 * @param {string} styleRight - [可选] 右部slot样式
 * @param {string} styleLeft - [可选] 左部slot样式
 * @param {JSX.Element} topNode - [可选] 顶部slot
 * @param {JSX.Element} bottomNode - [可选] 底部slot
 * @param {JSX.Element} rightNode - [可选] 右部slot
 * @param {JSX.Element} leftNode - [可选] 左部slot
 */
class Carousel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.touchDistance = 10;
        this.contentBody = this.getContentBody;
        this.touchStartPoint = { screenX: 0, screenY: 0 };
        this.touchStartPointTemp = { screenX: 0, screenY: 0 };
        this.touchLock = true;
        this.swiping = this.swiping.bind(this);
        this.swiped = this.swiped.bind(this);
    }
    /**
     * 获取显示列表元素
     * @func
     * @type get
     * @return Array<JSX.Element>
     */
    get getContentBody() {
        if (Array.isArray(this.props.children)) {
            let returnElement = [];
            this.props.children.forEach((element, index) => {
                if (element.props.hasOwnProperty('data-index')) {
                    returnElement.push(element);
                }
            });
            returnElement.sort((a, b) => {
                return a.props['data-index'] - b.props['data-index'];
            });
            return returnElement;
        }
        else {
            if (this.props.children.props.hasOwnProperty('data-index')) {
                return [this.props.children];
            }
        }
    }
    style(index) {
        return {
            transform: this.props.direction === "vertical" ? `translateY(-${100 * this.props.index}%)` : `translateX(-${100 * this.props.index}%)`,
            padding: this.props.contentPadding,
            paddingTop: this.props.contentPaddingTop,
            paddingBottom: this.props.contentPaddingBottom,
            paddingLeft: this.props.contentPaddingLeft,
            paddingRight: this.props.contentPaddingRight,
            visibility: index == this.props.index || index + 1 == this.props.index || index - 1 == this.props.index ? "visible" : "hidden",
            display: this.props.direction === "vertical" ? "block" : "inline-block",
            verticalAlign: "top"
        };
    }
    swiped() {
        this.touchLock = true;
    }
    swiping(e, deltaX, deltaY, absX, absY, velocity) {
        console.log(velocity);
        if (this.props.direction === "horizontal") {
            if (deltaX > 80 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(1);
            }
            else if (deltaX < -80 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(-1);
            }
        }
        else {
            if (deltaY > 150 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(1);
            }
            else if (deltaY < -100 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(-1);
            }
        }
    }
    render() {
        return (React.createElement(SwipeView_1.default, { preventDefaultTouchmoveEvent: true, onSwiping: this.swiping, className: "carousel-container", onSwiped: this.swiped },
            React.createElement("div", { style: { flexDirection: this.props.direction === "horizontal" ? "column" : "row" }, className: "contentBody" }, this.contentBody.map((element, index) => {
                return React.createElement("div", { key: index, className: "contentPage", style: this.style(index) }, element);
            })),
            React.createElement("div", { className: "contentTop" + ' ' + this.props.styleTop }, this.props.topNode),
            React.createElement("div", { className: "contentBottom" + ' ' + this.props.styleBottom }, this.props.bottomNode),
            React.createElement("div", { className: "contentRight" + ' ' + this.props.styleRight }, this.props.rightNode),
            React.createElement("div", { className: "contentLeft" + ' ' + this.props.styleLeft }, this.props.leftNode)));
    }
}
Carousel.defaultProps = {
    direction: "vertical"
};
exports.default = Carousel;
