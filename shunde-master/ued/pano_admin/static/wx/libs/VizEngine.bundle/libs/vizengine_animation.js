module("/libs/vizengine_gesture.js", function () {
    com.vizengine.animation = {};

    var Object = com.vizengine.core.Object;
    var Point = com.vizengine.gesture.Point;

    /**
     * @class com.vizengine.animation.TimeInterplator
     * 时间拦截器。可以改变动画的运行方式，例如线性变化，加速变化，减速变化等。
     *
     */
    Object.extend("com.vizengine.animation.TimeInterceptor", {
        /**
         * @method
         * 获取拦截进度值。
         * @param progress 输入的进度值(0-1)
         * @returns {number} 输出的进度值(0-1)
         */
        getInterception: function (progress) {
            return progress;
        }
    });
    var TimeInterceptor = com.vizengine.animation.TimeInterceptor;
    // depressed
    com.vizengine.animation.TimeInterplator = TimeInterceptor;

    /**
     * @class com.vizengine.animation.DecelerateInterpolator
     * 减速拦截器。可以让动画先快后慢的运行。
     */
    TimeInterceptor.extend("com.vizengine.animation.DecelerateInterceptor", {
        init: function (factor) {
            TimeInterceptor.prototype.init.apply(this, arguments);
            if (factor != null) {
                this.factor = factor;
            } else {
                this.factor = 1;
            }
        },
        /**
         * @method
         * 获取减速拦截进度值。
         * @param input
         * @returns {number}
         */
        getInterception: function (input) {
            var result = 0;
            if (this.factor == 1.0) {
                result = (1.0 - (1.0 - input) * (1.0 - input));
            } else {
                result = (1.0 - Math.pow((1.0 - input), 2 * this.factor));
            }
            return result;
        }
    });
    var DecelerateInterceptor = com.vizengine.animation.DecelerateInterceptor;
    // depress
    com.vizengine.animation.DecelerateInterpolator = DecelerateInterceptor;
    /**
     * @class com.vizengine.animation.Animation
     * @extends com.vizengine.core.Object
     * 动画基类。
     */
    Object.extend("com.vizengine.animation.Animation", {
        init: function () {
            Object.prototype.init.apply(this, arguments);
            this.callback = null;
            this._beginTime = 0;
            //延迟动画时间
            this.delay = 0;
            this.duration = 1000;
            this.timeInterceptor = null;
            // depressed
            this.timeInterplator = null;
            this.repeatCount = 1; // 重复次数，默认只播放一遍, 0表示无限循环
            this._repeated = 0; // 已经播放过的次数
        },
        animate: function (view) {
            var now = new Date().getTime();
            var progress = 0;
            if (this._beginTime == 0) {
                this._beginTime = now;
            } else {
                var deltaTime = now - this._beginTime - this.delay;
                this._repeated = Math.floor(deltaTime / this.duration);
                deltaTime %= this.duration;
                if (deltaTime < this.duration) {
                    progress = deltaTime / this.duration;
                } else {
                    progress = 1;
                }
            }

            //延迟阶段
            if (this.delay > now - this._beginTime) {
                return true;
            }


            var isFinished = false;
            if (this.repeatCount > 0 && this._repeated >= this.repeatCount) {
                isFinished = true;
            }

            if (isFinished) {
                progress = 1;
            }

            var interplateProgress = progress;
            // 保持兼容
            var timeInterceptor = this.timeInterceptor != null ? this.timeInterceptor : this.timeInterplator;
            if (timeInterceptor != null) {
                interplateProgress = timeInterceptor.getInterception(progress);
            }

            if (interplateProgress > 1) {
                interplateProgress = 1;
            }
            this.animateFrame(view, interplateProgress);
            if (isFinished) {
                if (this.callback != null) {
                    var callback = this.callback;
                    callback.target = this;
                    this.callback = null;
                    if (callback) {
                        setTimeout(function () {
                            callback.call(callback.target,false);
                            callback.target = null;
                            callback = null;
                        });
                    }
                }
                return false;
            }

            return true;
        },
        /**
         * @method
         * 如果动画还未终止，终止之。
         */
        terminateIfNotFinished: function () {
            if (this.callback != null) {
                var callback = this.callback;
                this.callback = null;
                callback.call(this,true);
            }
        },
        /**
         * @method
         * 子类集成此方法实现动画
         * @param view
         * @param progress
         */
        animateFrame: function (view, progress) {
        }
    });
    var Animation = com.vizengine.animation.Animation;


    Animation.animationViews = [];
    Animation.animating = false;
    Animation.animateFrame = function () {
        var fps = 0;
        var start = new Date().getTime();
        for (var i = Animation.animationViews.length - 1; i >= 0; i--) {
            var view = Animation.animationViews[i];
            if (view.animation == null) {
                Animation.animationViews.splice(i, 1);
                view = null;
                continue;
            }
            if (!view.animation.animate(view)) {
                view.animation = null;
                Animation.animationViews.splice(i, 1);
            } else {
                var myFPS = 60;
                if(view.animation.fps != null) {
                    myFPS = view.animation.fps;
                }
                if(myFPS > fps) {
                    fps = myFPS;
                }
            }
            view = null;
        }
        var frameMinTime = 1000 / fps;
        var end = new Date().getTime();

        var delay = 0;
        var delta = end - start;
        if(delta < frameMinTime) {
            delay = frameMinTime - delta;
        }

        if (Animation.animationViews.length > 0) {
            setTimeout(Animation.animateFrame, delay);
        } else {
            Animation.animating = false;
        }
    }
    Animation.requestAnimation = function (view) {
        Animation.animationViews.push(view);
        if (Animation.animating) {
            return;
        }
        Animation.animating = true;
        Animation.animateFrame();
    }
    Animation.terminateAnimation = function (view) {
        for (var i = 0; i < Animation.animationViews.length; i++) {
            var aview = Animation.animationViews[i];
            if (aview == view) {
                if(aview.animation != null) {
                    aview.animation.terminateIfNotFinished();
                    aview.animation = null;
                }
                return;
            }
        }
    }


    /**
     * @class com.vizengine.animation.AnimationSet
     * @extends com.vizengine.animation.Animation
     * 同时运行多个动画的动画集合类。
     */
    Animation.extend("com.vizengine.animation.AnimationSet", {
        init: function () {
            Animation.prototype.init.apply(this, arguments);
            this.animations = new Array();
        },
        /**
         * @method
         * 添加子动画
         * @param animation
         */
        addAnimation: function (animation) {
            this.animations.push(animation);
            this._updateAnimations();
        },
        _updateAnimations: function () {
            var maxDuration = 0;
            for (var i in this.animations) {
                var animation = this.animations[i];
                if (animation.repeatCount == 0) {
                    this.repeatCount = 0;
                    break;
                }
                if (animation.duration + animation.delay > maxDuration) {
                    maxDuration = animation.duration * animation.repeatCount + animation.delay;
                }
            }


            //所有动画里面最长的，就是set的动画时长。
            this.duration = maxDuration;

            for (var i in this.animations) {
                var animation = this.animations[i];
                var delayProgress = animation.delay / maxDuration;
                animation.startProgress = delayProgress;
                animation.endProgress = delayProgress + animation.duration / maxDuration;
            }
        },
        animateFrame: function (view, progress) {
            var cont = false;
            for (var i in this.animations) {
                var animation = this.animations[i];
                //各自处理即可，每个动画内部有自己的时间、进度、延迟、重复等操作。
                animation.animate(view);
            }
            return cont;
        }
    });
    var AnimationSet = com.vizengine.animation.AnimationSet


    /**
     * @class com.vizengine.animation.AnimationList
     * @extends com.vizengine.animation.Animation
     * 依次运行多个动画的集合类。
     */
    Animation.extend("com.vizengine.animation.AnimationList", {
        init: function () {
            Animation.prototype.init.apply(this, arguments);
            this.animations = new Array();
        },
        /**
         * @method 添加子动画
         * @param animation
         */
        addAnimation: function (animation) {
            this.animations.push(animation);
            this._updateAnimations();
        },
        _updateAnimations: function () {
            var totalDuration = 0;
            for (var i in this.animations) {
                var animation = this.animations[i];
                totalDuration += animation.duration;
            }
            var currentTotalDuration = 0;
            for (var i in this.animations) {
                var animation = this.animations[i];
                animation.startProgress = currentTotalDuration / totalDuration;
                animation.endProgress = (currentTotalDuration + animation.duration) / totalDuration;
                currentTotalDuration += animation.duration;
            }
        },
        animateFrame: function (view, progress) {
            for (var i in this.animations) {
                var animation = this.animations[i];
                if (progress <= animation.endProgress) {
                    var localProgress = (progress - animation.startProgress) / (animation.endProgress - animation.startProgress);
                    if (animation.timeInterplator != null) {
                        localProgress = animation.timeInterplator.getInterpolation(localProgress);
                    }
                    return animation.animateFrame(view, localProgress);
                }
            }
            return false;
        }
    });
    var AnimationList = com.vizengine.animation.AnimationList;


    /**
     * @class com.vizengine.animation.TranslateAnimation
     * @extends com.vizengine.animation.Animation
     * 平移动画。通过指定移动的起点和终点来控制View的移动。
     */
    Animation.extend("com.vizengine.animation.TranslateAnimation", {
        /**
         * 动画移动的起点x坐标
         */
        fromTranslateX: null,
        /**
         * 动画移动的起点y坐标
         */
        fromTranslateY: null,
        /**
         * 动画移动的终点x坐标
         */
        toTranslateX: null,
        /**
         * 动画移动的终点y坐标
         */
        toTranslateY: null,
        animateFrame: function (view, progress) {
            if (this.fromTranslateX != null && this.toTranslateX != null) {
                var translateX = this.fromTranslateX + (this.toTranslateX - this.fromTranslateX) * progress;
                view.setTranslateX(translateX);
            }

            if (this.fromTranslateY != null && this.toTranslateY != null) {
                var translateY = this.fromTranslateY + (this.toTranslateY - this.fromTranslateY) * progress;
                view.setTranslateY(translateY);
            }
        }
    });
    var TranslateAnimation = com.vizengine.animation.TranslateAnimation;

    /**
     * @class com.vizengine.animation.RotateAnimation
     * @extends com.vizengine.animation.Animation
     * 旋转动画
     */
    Animation.extend("com.vizengine.animation.RotateAnimation", {
        /**
         * 绕x轴旋转的起始角度
         */
        fromRotateX: null,
        /**
         * 绕x轴旋转的终止角度
         */
        toRotateX: null,
        /**
         * 绕y轴旋转的起始角度
         */
        fromRotateY: null,
        /**
         * 绕y轴旋转的终止角度
         */
        toRotateY: null,
        /**
         * 绕z轴旋转的起始角度
         */
        fromRotateZ: null,
        /**
         * 绕z轴旋转的终止角度
         */
        toRotateZ: null,
        animateFrame: function (view, progress) {
            var rotateX = null;
            var rotateY = null;
            var rotateZ = null;
            if (this.fromRotateX != null && this.toRotateX != null) {
                rotateX = this.fromRotateX + (this.toRotateX - this.fromRotateX) * progress;
            }
            if (this.fromRotateY != null && this.toRotateY != null) {
                rotateY = this.fromRotateY + (this.toRotateY - this.fromRotateY) * progress;
            }
            if (this.fromRotateZ != null && this.toRotateZ != null) {
                rotateZ = this.fromRotateZ + (this.toRotateZ - this.fromRotateZ) * progress;
            }
            if (rotateX != null) {
                view.setRotateX(rotateX);
            }
            if (rotateY != null) {
                view.setRotateY(rotateY);
            }
            if (rotateZ != null) {
                view.setRotateZ(rotateZ);
            }
        }
    });
    var RotateAnimation = com.vizengine.animation.RotateAnimation;

    /**
     * @class com.vizengine.animation.ScaleAnimation
     * @extends com.vizengine.animation.Animation
     * 缩放动画
     */
    Animation.extend("com.vizengine.animation.ScaleAnimation", {
        /**
         * x轴缩放的起始比例
         */
        fromScaleX: null,
        /**
         * y轴缩放的起始比例
         */
        fromScaleY: null,
        /**
         * x轴缩放的终止比例
         */
        toScaleX: null,
        /**
         * y轴缩放的终止比例
         */
        toScaleY: null,
        animateFrame: function (view, progress) {
            if (this.fromScaleX != null && this.toScaleX != null) {
                var scaleX = this.fromScaleX + (this.toScaleX - this.fromScaleX) * progress;
                view.setScaleX(scaleX);
            }
            if (this.fromScaleY != null && this.toScaleY != null) {
                var scaleY = this.fromScaleY + (this.toScaleY - this.fromScaleY) * progress;
                view.setScaleY(scaleY);
            }
        }
    });
    var ScaleAnimation = com.vizengine.animation.ScaleAnimation;


    Animation.extend("com.vizengine.animation.BezierAnimation", {
        init: function () {
            Animation.prototype.init.apply(this, arguments);
            this.bezierPoints = new Array();
            this.bezierPoints[0] = new UPPoint();
            this.bezierPoints[1] = new UPPoint();
            this.bezierPoints[2] = new UPPoint();
            this.bezierPoints[3] = new UPPoint();
            this.bezierPoints[0].x = 0;
            this.bezierPoints[0].y = 0;
            this.bezierPoints[1].x = 0;
            this.bezierPoints[1].y = 0.7;
            this.bezierPoints[2].x = 0.3;
            this.bezierPoints[2].y = 1;
            this.bezierPoints[3].x = 1;
            this.bezierPoints[3].y = 1;
        },
        setBezierCP1: function (x, y) {
            this.bezierPoints[1].x = x;
            this.bezierPoints[1].y = y;
        },

        setBezierCP2: function (x, y) {
            this.bezierPoints[2].x = x;
            this.bezierPoints[2].y = y;
        },
        getPointFromBezier: function (t) {
            var cp = this.bezierPoints;
            var ax, bx, cx;
            var ay, by, cy;
            var tSquared, tCubed;
            var result = new UPPoint();


            cx = 3.0 * (cp[1].x - cp[0].x);
            bx = 3.0 * (cp[2].x - cp[1].x) - cx;
            ax = cp[3].x - cp[0].x - cx - bx;

            cy = 3.0 * (cp[1].y - cp[0].y);
            by = 3.0 * (cp[2].y - cp[1].y) - cy;
            ay = cp[3].y - cp[0].y - cy - by;

            tSquared = t * t;
            tCubed = tSquared * t;

            result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
            result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;

            return result;
        },


        animateFrame: function (view, progress) {
            var point = this.getPointFromBezier(progress);
            view.setTranslate(point.x, point.y, 0);
        }

    });
    var BezierAnimation = com.vizengine.animation.BezierAnimation;

    /**
     * @class com.vizengine.animation.AlphaAnimation
     * @extends com.vizengine.animation.Animation
     * 透明度动画
     */
    Animation.extend("com.vizengine.animation.AlphaAnimation", {
        /**
         * 动画起始的透明度
         */
        fromAlpha: null,
        /**
         * 动画终止的透明度
         */
        toAlpha: null,
        animateFrame: function (view, progress) {
            var alpha = this.fromAlpha + (this.toAlpha - this.fromAlpha) * progress;
            view.setAlpha(alpha);
        }
    });
    var AlphaAnimation = com.vizengine.animation.AlphaAnimation;

})