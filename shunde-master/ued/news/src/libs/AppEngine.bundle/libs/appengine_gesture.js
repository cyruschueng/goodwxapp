/*
 * Created by chenxinxin on 10/12/16.
 */
module("appengine_math.js",function(){
    var Object = com.appengine.core.Object;

    com.appengine.gesture = {};

    /**
     * @class com.appengine.gesture.Point
     * @extends com.appengine.core.Object
     * 坐标类
     */
    Object.extend("com.appengine.gesture.Point",{
        init: function (x, y) {
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
        },
        // 横坐标
        x : 0,
        // 纵坐标
        y : 0,
        /**
         * @method
         * 获取两个点的直线距离
         * @param point
         * @returns {number}
         */
        distanceTo: function (point) {
            return Math.sqrt(Math.pow(point.x - this.x, 2)
                + Math.pow(point.y - this.y, 2));
        }
    });
    var Point = com.appengine.gesture.Point;

    /**
     * @class com.appengine.gesture.TouchPoint
     * @extends com.appengine.core.Object
     * 触控点
     */
    Point.extend("com.appengine.gesture.TouchPoint",{
        init: function (x, y) {
            Point.prototype.init.apply(this,arguments);
            this.absX = this.x;
            this.absY = this.y;
        }
    });
    var TouchPoint = com.appengine.gesture.TouchPoint;


    /**
     * @class com.appengine.gesture.TouchEvent
     * @extends com.appengine.core.Object
     * 触控事件
     */
    Object.extend("com.appengine.gesture.TouchEvent",{
        init: function () {
            this.state = 0;
            this.touchPoints = new Array();
        },
        /**
         * @method
         * 获取触控多个手指的中心点坐标
         * @returns {*}
         */
        getCenter : function () {
            if (this.touchPoints == null || this.touchPoints.length < 1) {
                return null;
            }
            var totalX = 0;
            var totalY = 0;
            for (var i in this.touchPoints) {
                var point = this.touchPoints[i];
                totalX += point.x;
                totalY += point.y;
            }
            var centerX = totalX / this.touchPoints.length;
            var centerY = totalY / this.touchPoints.length;
            return new Point(centerX, centerY);
        },
        /**
         * @method
         * 获取触控多个手指距离中心点的平均半径
         * @returns {number}
         */
        getRadius: function () {
            if (this.touchPoints.length <= 1) {
                return 0;
            }
            var center = this.getCenter();
            var totalRadius = 0;
            for (var i in this.touchPoints) {
                var point = this.touchPoints[i];
                totalRadius += point.distanceTo(center);
            }
            return totalRadius / this.touchPoints.length;
        }
        ,
        /**
         * @method
         * 获取指定手指的x坐标，不指定代表获取多个手指中心点的x坐标
         * @param index
         * @returns {*}
         */
        getX: function (index) {
            if (index == null) {
                if (this.touchPoints.length == 1) {
                    return this.touchPoints[0].x;
                }
                var sum = 0;
                for (var i = 0; i < this.touchPoints.length; i++) {
                    sum += this.touchPoints[i].x;
                }
                return sum / this.touchPoints.length;
            }
            if (this.touchPoints.length > index) {
                var point = this.touchPoints[index];
                return point.x;
            }
            return 0;
        },
        /**
         * @method
         * 获取指定手指的屏幕x坐标，不指定代表获取多个手指的中心点屏幕x坐标
         * @param index
         * @returns {*}
         */
        getAbsX: function (index) {
            if (index == null) {
                if (this.touchPoints.length == 1) {
                    return this.touchPoints[0].absX;
                }
                var sum = 0;
                for (var i = 0; i < this.touchPoints.length; i++) {
                    sum += this.touchPoints[i].absX;
                }
                return sum / this.touchPoints.length;
            }
            if (this.touchPoints.length > index) {
                var point = this.touchPoints[index];
                return point.absX;
            }
            return 0;
        },
        /**
         * @method
         * 获取指定手指的y坐标, 不指定代表获取多个手指中心的的y坐标
         * @param index
         * @returns {*}
         */
        getY: function (index) {
            if (index == null) {
                if (this.touchPoints.length == 1) {
                    return this.touchPoints[0].y;
                }
                var sum = 0;
                for (var i = 0; i < this.touchPoints.length; i++) {
                    sum += this.touchPoints[i].y;
                }
                return sum / this.touchPoints.length;
            }
            if (this.touchPoints.length > index) {
                var point = this.touchPoints[index];
                return point.y;
            }
            return 0;
        },
        /**
         * @method
         * 获取指定手指的屏幕y坐标，不指定代表获取多个手指的中心点屏幕y坐标
         * @param index
         * @returns {*}
         */
        getAbsY: function (index) {
            if (index == null) {
                if (this.touchPoints.length == 1) {
                    return this.touchPoints[0].absY;
                }
                var sum = 0;
                for (var i = 0; i < this.touchPoints.length; i++) {
                    sum += this.touchPoints[i].absY;
                }
                return sum / this.touchPoints.length;
            }
            if (this.touchPoints.length > index) {
                var point = this.touchPoints[index];
                return point.absY;
            }
            return 0;
        },
        /**
         * @method
         * 获取手指数量
         * @returns {Number}
         */
        getCount: function () {
            return this.touchPoints.length;
        },
        /**
         * @method
         * 获取触控点数组
         * @returns {Array|*}
         */
        getTouchPoints: function () {
            return this.touchPoints;
        },
        offsetCopy: function (offsetX, offsetY) {
            var copy = new TouchEvent();
            copy.state = this.state;
            copy.ghost = this.ghost;
            for (var i in this.touchPoints) {
                var ori = this.touchPoints[i];
                var point = new TouchPoint();
                point.x = ori.x + offsetX;
                point.y = ori.y + offsetY;
                point.absX = ori.absX;
                point.absY = ori.absY;
                copy.touchPoints[i] = point;
            }
            return copy;
        },
        applyMartix4: function(martix) {
            var copy = new TouchEvent();
            copy.state = this.state;
            copy.ghost = this.ghost;
            for (var i in this.touchPoints) {
                var ori = this.touchPoints[i];
                var point = new TouchPoint();
                var vec = new com.appengine.math.Vector3(ori.x,ori.y,0);
                vec.applyMatrix4(martix);
                point.x = vec.x;
                point.y = vec.y;
                point.absX = ori.absX;
                point.absY = ori.absY;
                copy.touchPoints[i] = point;
            }
            return copy;
        }
    });
    var TouchEvent = com.appengine.gesture.TouchEvent;

    /**
     * @class com.appengine.gesture.GestureDetector
     * @extends com.appengine.core.Object
     * 手势识别类
     */
    Object.extend("com.appengine.gesture.GestureDetector",{
        /**
         * @method
         * 识别手势的基类方法
         * @param touchEvent
         * @returns {boolean}
         */
        detect : function(touchEvent) {
            return false;
        }
    });
    var GestureDetector = com.appengine.gesture.GestureDetector;

    /**
     * @class com.appengine.gesture.TapGestureDetector
     * @extends com.appengine.gesture.GestureDetector
     * 点击手势识别器
     */
    GestureDetector.extend("com.appengine.gesture.TapGestureDetector",{
        init : function() {
            GestureDetector.prototype.init(this,arguments);
            this.downPoint = null;
            this.downTime = 0;
        },
        /**
         * 点击识别的回调
         */
        callback : null,
        getPointInRoot : function(touchEvent) {
            var tx = touchEvent.getAbsX();
            var ty = touchEvent.getAbsY();
            return new TouchPoint(tx,ty);
        },
        detect : function(touchEvent) {
            if (this.callback == null) {
                return false;
            }
            if (touchEvent.state == 0) {
                this.downTime = new Date().getTime();
                this.downPoint = this.getPointInRoot(touchEvent);
            } else if (touchEvent.state == 2) {
                var upTime = new Date().getTime();
                var upPoint = this.getPointInRoot(touchEvent);
                if(this.downPoint == null) {
                    return false;
                }
                var deltaTime = upTime - this.downTime;
                if (deltaTime < 200) {
                    var distance = this.downPoint.distanceTo(upPoint);
                    if (distance < 6) {
                        return this.callback(touchEvent);
                    }
                }
                this.downPoint = null;
            }
            return true;
        }
    });
    var TapGestureDetector = com.appengine.gesture.TapGestureDetector;

    /**
     * @class com.appengine.gesture.SweepGestureDetector
     * @extends com.appengine.gesture.GestureDetector
     * 甩动手势的识别器
     */
    GestureDetector.extend("com.appengine.gesture.SweepGestureDetector",{
        init : function() {
            GestureDetector.prototype.init.apply(this,arguments);
            this.cancelCallback = null;
            this.touchTrack = new Array();
            this.mutiTouch = false;
        },
        /**
         * 甩动手势识别的回调
         */
        callback : null,
        detect : function(touchEvent) {
            if (this.callback == null) {
                return false;
            }

            if(touchEvent.state == 0 && touchEvent.touchPoints.length == 1) {
                this.mutiTouch = false;
            }

            if(touchEvent.touchPoints.length > 1) {
                this.mutiTouch = true;
            }

            if(this.mutiTouch) {
                if(touchEvent.ghost && this.cancelCallback!=null) {
                    this.cancelCallback();
                }

                if(touchEvent.state == 2) {
                    this.callback(0,0,touchEvent);
                }
                return;
            }

            if (touchEvent.state == 0) {
                var downTime = new Date().getTime();
                var downPoint = touchEvent.touchPoints[0];
                downPoint.time = downTime;
                this.touchTrack.length = 0;
                this.touchTrack[0] = downPoint;
            } else if (touchEvent.state == 1) {
                var moveTime = new Date().getTime();
                var movePoint = touchEvent.touchPoints[0];
                movePoint.time = moveTime;
                this.touchTrack[this.touchTrack.length] = movePoint;
            } else if (touchEvent.state >= 2) {
                var upTime = new Date().getTime();
                var upPoint = touchEvent.touchPoints[0];
                upPoint.time = upTime;
                var minDeltaTime = 50;
                var stubPoint = null;
                for ( var i = this.touchTrack.length - 1; i >= 0; i--) {
                    var point = this.touchTrack[i];
                    if (upTime - point.time > minDeltaTime) {
                        stubPoint = point;
                    }
                }
                if (stubPoint == null && this.touchTrack.length > 0) {
                    stubPoint = this.touchTrack[0];
                }

                this.touchTrack.length = 0;

                if(stubPoint != null) {
                    var deltaTime = upTime - stubPoint.time;
                    if (deltaTime > 0) {
                        var deltaY = upPoint.absY - stubPoint.absY;
                        var deltaX = upPoint.absX - stubPoint.absX;
                        var vY = deltaY / deltaTime;
                        var vX = deltaX / deltaTime;

                        var absY = Math.abs(vY);
                        var absX = Math.abs(vX);

                        var maxSpeed = 3.4;

                        if(absX > maxSpeed) {
                            var scale = maxSpeed / absX;
                            vX *= scale;
                            vY *= scale;
                        }

                        if(absY > maxSpeed) {
                            var scale = maxSpeed / absY;
                            vX *= scale;
                            vY *= scale;
                        }
                        return this.callback(vX, vY,touchEvent);
                    }
                }
                return this.callback(0,0,touchEvent);

            }
            return false;
        }
    });
    var SweepGestureDetector = com.appengine.gesture.SweepGestureDetector;

    /**
     * @class com.appengine.gesture.PanGestureDetector
     * @extends com.appengine.gesture.GestureDetector
     * 拖动手势识别器
     */
    GestureDetector.extend("com.appengine.gesture.PanGestureDetector",{
        init : function() {
            GestureDetector.prototype.init.apply(this,arguments);
            this.touchDownX = 0;
            this.touchDownY = 0;
            this.touching = false;
            this.fingerCount = 0;
            this.draging = false;
        },
        // 拖动手势识别时的回调
        callback : null,
        detect : function(touchEvent) {
            var ret = false;
            if(this.callback == null) {
                return ret;
            }
            var offsetX = 0;
            var offsetY = 0;

            if(this.fingerCount != touchEvent.touchPoints.length) {
                this.fingerCount = touchEvent.touchPoints.length;
                this.touching = false;
            }

            if(this.touching == false) {
                touchEvent = touchEvent.offsetCopy(0,0);
                touchEvent.state = 0;
            }

            if(touchEvent.state == 0) {
                this.touching = true;
                this.touchDownX = touchEvent.getAbsX();
                this.touchDownY = touchEvent.getAbsY();
            } else {
                offsetX = touchEvent.getAbsX() - this.touchDownX;
                offsetY = touchEvent.getAbsY() - this.touchDownY;
            }

            if(touchEvent.state == 1) {
                this.draging = true;
            }

            if(this.draging || touchEvent.state == 0) {
                ret = this.callback(offsetX, offsetY, touchEvent);
            }

            if(touchEvent.state == 2) {
                this.touching = false;
                this.draging = false;
            }
            return ret;
        }
    });
    var PanGestureDetector = com.appengine.gesture.PanGestureDetector;

    /**
     * @class com.appengine.gesture.TwistGestureDetector
     * @extends com.appengine.gesture.GestureDetector
     * 转动手势识别器
     */
    GestureDetector.extend("com.appengine.gesture.TwistGestureDetector",{
        init : function() {
            GestureDetector.prototype.init.apply(this,arguments);
            this.touching = false;
            this.fingerCount = 0;
        },
        /**
         * 转动手势识别时的回调
         */
        callback : null,
        getRotation: function(touchEvent) {
            var fingerCount = touchEvent.touchPoints.length;
            if(fingerCount < 2) {
                return 0;
            }
            var dx = touchEvent.touchPoints[0].x - touchEvent.touchPoints[1].x;
            var dy = touchEvent.touchPoints[0].y - touchEvent.touchPoints[1].y;
            return Math.atan2(dx, dy);
        },
        detect : function(touchEvent) {
            if(this.callback == null) {
                return false;
            }
            var rotation = 0;
            var fingerCount = touchEvent.touchPoints.length;
            var center = touchEvent.getCenter();

            if(this.fingerCount != fingerCount) {
                this.fingerCount = fingerCount;
                this.touching = false;
            }

            if(this.touching == false && touchEvent.state == 1) {
                touchEvent = touchEvent.offsetCopy(0,0);
                touchEvent.state = 0;
            }

            if(touchEvent.state == 0) {
                this.touching = true;
                this.initRotation = this.getRotation(touchEvent);
            } else {
                rotation = this.getRotation(touchEvent) - this.initRotation;
            }
            if(touchEvent.state == 2) {
                this.touching = false;
            } else {
                return this.callback(center, rotation, touchEvent);
            }
            return false;
        }
    });
    var TwistGestureDetector = com.appengine.gesture.TwistGestureDetector;

    /**
     * @class com.appengine.gesture.PinchGestureDetector
     * @extends com.appengine.gesture.GestureDetector
     * 捏合手势识别器
     */
    GestureDetector.extend("com.appengine.gesture.PinchGestureDetector",{
        init : function() {
            GestureDetector.prototype.init.apply(this,arguments);
            this.initRadius = 0;
            this.fingerCount = 0;
        },
        /**
         * 捏合手势识别时的回调
         */
        callback : null,
        detect : function(touchEvent) {
            if(this.callback == null) {
                return false;
            }

            if(touchEvent.touchPoints.length < 2) {
                return false;
            }

            var reset = false;

            if( touchEvent.state == 0 || this.fingerCount != touchEvent.touchPoints.length) {
                this.initRadius = touchEvent.getRadius();
                this.fingerCount = touchEvent.touchPoints.length;
                reset = true;
            }

            var radius = touchEvent.getRadius();
            var scale = radius / this.initRadius;
            if(touchEvent.state < 2) {
                return this.callback(scale, reset, touchEvent);
            }
            return false;
        }
    });
    var PinchGestureDetector = com.appengine.gesture.PinchGestureDetector;


    var checkAndHideKeyboard = function(absX,absY) {
        var fInputView = com.appengine.view.InputView.focusedInputView;
        if(fInputView == null) {
            return;
        }
        var frame = fInputView.getFrameInRootView();
        if(absX < frame.x || absX > (frame.x+frame.width) || absY < frame.y || absY > (frame.y+frame.height)) {
            com.appengine.view.InputView.clearFocus();
        }
    }

    var latestEvent = null;
    window.nativeTouch = function(state,points) {
        var rootView = window.rootView;
        switch (state) {
            case 0:
                var lightappevent = latestEvent = new TouchEvent();
                lightappevent.state = 0;
                for (var i = 0; i < points.length/2; i++) {
                    var vp = new TouchPoint();
                    vp.absX = vp.x = points[i*2];
                    vp.absY = vp.y = points[i*2+1];
                    lightappevent.touchPoints[i] = vp;
                }
                return rootView.dispatchTouch(lightappevent);
            case 2:
                var lightappevent = new TouchEvent();
                lightappevent.state = 2;
                for (var i = 0; i < points.length/2; i++) {
                    var vp = new TouchPoint();
                    vp.absX = vp.x = points[i*2];
                    vp.absY = vp.y = points[i*2+1];
                    lightappevent.touchPoints[i] = vp;
                }

                if (lightappevent.touchPoints.length == 0) {
                    lightappevent.touchPoints = latestEvent.touchPoints;
                    lightappevent.ghost = true;
                }
                var ret = rootView.dispatchTouch(lightappevent);
                checkAndHideKeyboard(lightappevent.getAbsX(),lightappevent.getAbsY());
                return ret;
            case 1:
                var lightappevent = latestEvent = new TouchEvent();
                lightappevent.state = 1;
                for (var i = 0; i < points.length/2; i++) {
                    var vp = new TouchPoint();
                    vp.absX = vp.x = points[i*2];
                    vp.absY = vp.y = points[i*2+1];
                    lightappevent.touchPoints[i] = vp;
                }
                return rootView.dispatchTouch(lightappevent);
        }
        return false;
    }

})
