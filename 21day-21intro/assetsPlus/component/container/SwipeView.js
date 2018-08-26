"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * react触摸适配view，用于任意点击，滑动事件，滑动加速矢量获取等
 *
 * @export
 * @class SwipeView
 * @extends {React.Component<SwipeViewPropsTypes, StateTypes>}
 */
class SwipeView extends React.Component {
    constructor(props) {
        super(props);
        this.swipeable = {
            x: null,
            y: null,
            swiping: false,
            start: 0,
        };
        this.preventDefaultTouchmoveEventListener = function (ev) {
            event.preventDefault();
        };
        this.eventStart = this.eventStart.bind(this);
        this.eventMove = this.eventMove.bind(this);
        this.eventEnd = this.eventEnd.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.state = {
            x: null,
            y: null,
            swiping: false,
            start: 0,
        };
    }
    componentWillMount() {
        // setup internal swipeable state
        this.swipeable = this.state;
        if (this.props.preventDefaultTouchmoveEvent) {
            document.body.addEventListener('touchstart', this.preventDefaultTouchmoveEventListener);
        }
    }
    componentWillUnmount() {
        if (this.props.trackMouse) {
            // just to be safe attempt removal
            document.removeEventListener('mousemove', this.mouseMove);
            document.removeEventListener('mouseup', this.mouseUp);
        }
        if (this.props.preventDefaultTouchmoveEvent) {
            document.body.removeEventListener('touchstart', this.preventDefaultTouchmoveEventListener);
        }
    }
    mouseDown(e) {
        if (!this.props.trackMouse || e.type !== 'mousedown') {
            return;
        }
        // allow 'orig' onMouseDown's to fire also
        // eslint-disable-next-line react/prop-types
        if (typeof this.props.onMouseDown === 'function')
            this.props.onMouseDown(e);
        this.eventStart(e);
        // setup document listeners to track mouse movement outside <Swipeable>'s area
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }
    mouseMove(e) {
        this.eventMove(e);
    }
    mouseUp(e) {
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUp);
        this.eventEnd(e);
    }
    eventStart(e) {
        // if more than a single touch don't track, for now...
        if (e.touches && e.touches.length > 1)
            return;
        const { x, y } = getPosition(e);
        if (this.props.stopPropagation)
            e.stopPropagation();
        this.swipeable = { start: Date.now(), x, y, swiping: false };
    }
    eventMove(e) {
        const { stopPropagation, delta, onSwiping, onSwipingLeft, onSwipedLeft, onSwipingRight, onSwipedRight, onSwipingUp, onSwipedUp, onSwipingDown, onSwipedDown, preventDefaultTouchmoveEvent, } = this.props;
        if (!this.swipeable.x || !this.swipeable.y || e.touches && e.touches.length > 1) {
            return;
        }
        const pos = calculatePos(e, this.swipeable);
        // if swipe is under delta and we have not already started to track a swipe: return
        if (pos.absX < delta && pos.absY < delta && !this.swipeable.swiping)
            return;
        if (stopPropagation)
            e.stopPropagation();
        if (onSwiping) {
            onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity);
        }
        let cancelablePageSwipe = false;
        if (pos.absX > pos.absY) {
            if (pos.deltaX > 0) {
                if (onSwipingLeft || onSwipedLeft) {
                    onSwipingLeft && onSwipingLeft(e, pos.absX);
                    cancelablePageSwipe = true;
                }
            }
            else if (onSwipingRight || onSwipedRight) {
                onSwipingRight && onSwipingRight(e, pos.absX);
                cancelablePageSwipe = true;
            }
        }
        else if (pos.deltaY > 0) {
            if (onSwipingUp || onSwipedUp) {
                onSwipingUp && onSwipingUp(e, pos.absY);
                cancelablePageSwipe = true;
            }
        }
        else if (onSwipingDown || onSwipedDown) {
            onSwipingDown && onSwipingDown(e, pos.absY);
            cancelablePageSwipe = true;
        }
        this.swipeable.swiping = true;
        if (cancelablePageSwipe && preventDefaultTouchmoveEvent) {
            e.preventDefault();
            e.nativeEvent.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
        }
    }
    eventEnd(e) {
        const { stopPropagation, flickThreshold, onSwiped, onSwipedLeft, onSwipedRight, onSwipedUp, onSwipedDown, onTap, } = this.props;
        if (this.swipeable.swiping) {
            const pos = calculatePos(e, this.swipeable);
            if (stopPropagation)
                e.stopPropagation();
            const isFlick = pos.velocity > flickThreshold;
            onSwiped && onSwiped(e, pos.deltaX, pos.deltaY, isFlick, pos.velocity);
            if (pos.absX > pos.absY) {
                if (pos.deltaX > 0) {
                    onSwipedLeft && onSwipedLeft(e, pos.deltaX, isFlick);
                }
                else {
                    onSwipedRight && onSwipedRight(e, pos.deltaX, isFlick);
                }
            }
            else if (pos.deltaY > 0) {
                onSwipedUp && onSwipedUp(e, pos.deltaY, isFlick);
            }
            else {
                onSwipedDown && onSwipedDown(e, pos.deltaY, isFlick);
            }
        }
        else {
            onTap && onTap(e);
        }
        // finished swipe tracking, reset swipeable state
        this.swipeable = this.state;
    }
    render() {
        const newProps = Object.assign({}, this.props, { onTouchStart: this.eventStart, onTouchMove: this.eventMove, onTouchEnd: this.eventEnd, onMouseDown: this.mouseDown });
        // clean up swipeable's props to avoid react warning
        delete newProps.onSwiped;
        delete newProps.onSwiping;
        delete newProps.onSwipingUp;
        delete newProps.onSwipingRight;
        delete newProps.onSwipingDown;
        delete newProps.onSwipingLeft;
        delete newProps.onSwipedUp;
        delete newProps.onSwipedRight;
        delete newProps.onSwipedDown;
        delete newProps.onSwipedLeft;
        delete newProps.onTap;
        delete newProps.flickThreshold;
        delete newProps.delta;
        delete newProps.preventDefaultTouchmoveEvent;
        delete newProps.stopPropagation;
        delete newProps.nodeName;
        delete newProps.children;
        delete newProps.trackMouse;
        return React.createElement(this.props.nodeName, newProps, this.props.children);
    }
}
SwipeView.defaultProps = {
    flickThreshold: 0.6,
    delta: 10,
    preventDefaultTouchmoveEvent: false,
    stopPropagation: false,
    nodeName: 'div',
};
exports.default = SwipeView;
function getMovingPosition(e) {
    // If not a touch, determine point from mouse coordinates
    return 'changedTouches' in e
        ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
        : { x: e.clientX, y: e.clientY };
}
function getPosition(e) {
    // If not a touch, determine point from mouse coordinates
    return 'touches' in e
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };
}
function calculatePos(e, state) {
    const { x, y } = getMovingPosition(e);
    const deltaX = state.x - x;
    const deltaY = state.y - y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const time = Date.now() - state.start;
    const velocity = Math.sqrt(absX * absX + absY * absY) / time;
    return { deltaX, deltaY, absX, absY, velocity };
}
