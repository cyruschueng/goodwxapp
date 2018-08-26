module("vizengine_animation.js",function(){
    com.vizengine.view = {};

    var Object = com.vizengine.core.Object;
    var StringUtil = com.vizengine.core.StringUtil;
    var TouchPoint = com.vizengine.gesture.TouchPoint;
    var TouchEvent = com.vizengine.gesture.TouchEvent;
    var TapGestureDetector = com.vizengine.gesture.TapGestureDetector;
    var Animation = com.vizengine.animation.Animation;
    var TranslateAnimation = com.vizengine.animation.TranslateAnimation;
    var PanGestureDetector = com.vizengine.gesture.PanGestureDetector;
    var SweepGestureDetector = com.vizengine.gesture.SweepGestureDetector;
    var DecelerateInterpolator = com.vizengine.animation.DecelerateInterpolator;


    /**
     * @class
     * <pre>
     * View的布局方式。
     * 一共四种布局：分层布局(frame)，垂直布局(vertical)，水平布局(horizontal)，流式布局(flow)
     * (1)分层布局: 子View在父View中一层一层堆叠，子View之间相互不影响各自的尺寸。
     * (2)垂直布局: 子View在父View中从上往下一个个排开。子View之间可能存在垂直方向的空间竞争关系。
     * (3)水平布局: 子View在父View中从左向右排开。子View之间可能存在水平方向的空间竞争关系。
     * (4)流式布局: 子View在父View中从左向右布局，当满一行后自动换行，继续从左向右布局，一次类推。
     * </pre>
     */
    com.vizengine.view.Layout = {
        /** 垂直布局*/
        VERTICAL : 0,
        /** 水平布局*/
        HORIZONTAL : 1,
        /** 分层布局*/
        FRAME : 2,
        /** 流式布局*/
        FLOW : 3,
        /**
         * @static @method

         * 将表示布局方式的字符串解析为枚举变量
         *
         * @param {string} value 带解析的表示布局方式的字符串,取值包括:"frame","vertical","horizontal","flow"
         * @returns {number} 返回解析后的枚举变量
         */
        parse: function (value) {
            if ("horizontal" == value) {
                return Layout.HORIZONTAL;
            }
            if ("vertical" == value) {
                return Layout.VERTICAL;
            }
            if ("flow" == value) {
                return Layout.FLOW;
            }
            return Layout.FRAME;
        },
        /**
         * @static @method
         * 将代表布局的枚举变量转换为字符串
         *
         * @param {number} value 需要转换的布局枚举变量
         * @returns {string} 返回转换后的字符串
         */
        toString: function (value) {
            if (value == Layout.VERTICAL) {
                return "vertical";
            }
            if (value == Layout.HORIZONTAL) {
                return "horizontal";
            }
            if (value == Layout.FLOW) {
                return "flow";
            }
            return "frame";
        }
    };
    var Layout = com.vizengine.view.Layout;


    /**
     * @class
     * <pre>
     * View的宽高布局约束。
     * 约束是直接存储在view.layoutParam中的尺寸变量。
     * 该变量如果为负整数（-6至-1）会有特殊的布局意义，
     * 如果变量为大于等于9的数则表示固定的dip像素值。
     * (1) fill (-1) : 表示控件需要和他的兄弟去竞争父亲的剩余空间。
     * (2) match (-2) : 表示控件直接和父亲的相应控件做匹配。
     * (3) wrap (-3) : 表示控件需要包裹子View。
     * (4) matchHeight (-4) : 表示控件的宽度需要和自己的高度做匹配。
     * (5) matchWidth (-5) : 表示控件的高度需要和自己的宽度做匹配。
     * </pre>
     */
    com.vizengine.view.LayoutConstrain = {
        /**
         * 填充慢父亲的剩余空间
         */
        FILL            : -1,
        /**
         * 匹配父亲的绝对空间
         */
        MATCH           : -2,
        /**
         * 匹配孩子的空间
         */
        WRAP            : -3,
        /**
         * 匹配自己的高度
         */
        MATCH_HEIGHT    : -4,
        /**
         * 匹配自己的宽度
         */
        MATCH_WIDTH     : -5,
        /**
         * 绝对像素值
         */
        NUMBER          : -6,
        /**
         * @static @method
         * 将字符串解析为枚举变量
         *
         * @param {string} value 需要转换的枚举变量
         * @returns {number}
         */
        parse : function(value) {
            if("fill" == value) {
                return LayoutConstrain.FILL;
            }
            if ("match" == value) {
                return LayoutConstrain.MATCH;
            }
            if ("wrap" == value) {
                return LayoutConstrain.WRAP;
            }
            if ("matchWidth" == value) {
                return LayoutConstrain.MATCH_WIDTH;
            }
            if ("matchHeight" == value) {
                return LayoutConstrain.MATCH_HEIGHT;
            }
            return LayoutConstrain.NUMBER;
        },
        /**
         * @method
         * 将布局约束枚举转换为字符串
         *
         * @param {number} value 需要
         * @returns {string}
         */
        toString: function (value) {
            if (value == LayoutConstrain.FILL) {
                return "fill";
            }
            if (value == LayoutConstrain.MATCH) {
                return "match";
            }
            if (value == LayoutConstrain.WRAP) {
                return "wrap";
            }
            if (value == LayoutConstrain.MATCH_WIDTH) {
                return "matchWidth";
            }
            if (value == LayoutConstrain.MATCH_HEIGHT) {
                return "matchHeight";
            }
            return value + "";
        }
    }
    var LayoutConstrain = com.vizengine.view.LayoutConstrain;

    /**
     *  @class com.vizengine.view.Gravity
     *  View的对齐方式
     */
    com.vizengine.view.Gravity = {
        /** 不指定对其方式 */
        NONE                : 0,
        /** 左对齐 */
        LEFT                : 1 << 0,
        /** 上对其 */
        TOP                 : 1 << 1,
        /** 右对齐 */
        RIGHT               : 1 << 2,
        /** 下对其 */
        BOTTOM              : 1 << 3,
        /** 水平居中对其 */
        CENTER_HORIZONTAL   : 1 << 4,
        /** 垂直居中对其 */
        CENTER_VERTICAL     : 1 << 5,
        /** 居中对其 */
        CENTER              : 1 << 6,
        isAlignLeft: function (gravity) {
            if ((gravity & Gravity.LEFT) != 0) {
                return true;
            }
            if ((gravity & Gravity.RIGHT) != 0
                || (gravity & Gravity.CENTER_HORIZONTAL) != 0
                || (gravity & Gravity.CENTER) != 0) {
                return false;
            }
            return true;
        },
        isAlignRight : function(gravity) {
            if ((gravity & Gravity.RIGHT) != 0) {
                return true;
            }
            return false;
        },
        isAlignCenterHorizontal : function(gravity) {
            if(Gravity.isAlignLeft(gravity)) {
                return false;
            }
            if(Gravity.isAlignRight(gravity)) {
                return false;
            }
            return true;
        },
        isAlignTop: function (gravity) {
            if ((gravity & Gravity.TOP) != 0) {
                return true;
            }
            if ((gravity & Gravity.BOTTOM) != 0
                || (gravity & Gravity.CENTER_VERTICAL) != 0
                || (gravity & Gravity.CENTER) != 0) {
                return false;
            }
            return true;
        },
        isAlignBottom : function(gravity) {
            if ((gravity & Gravity.BOTTOM) != 0) {
                return true;
            }
            return false;
        },
        isAlignCenterVertical : function(gravity) {
            if(Gravity.isAlignTop(gravity)) {
                return false;
            }
            if(Gravity.isAlignBottom(gravity)) {
                return false;
            }
            return true;
        },
        /**
         * @static @method
         * 解析对其字符串
         *
         * @param {string} value
         * @return {com.vizengine.view.Gravity}
         */
        parseElement : function(value) {
            if ("top" == value) {
                return com.vizengine.view.Gravity.TOP;
            }
            if ("right" == value) {
                return com.vizengine.view.Gravity.RIGHT;
            }
            if ("bottom" == value) {
                return Gravity.BOTTOM;
            }
            if ("left" == value) {
                return Gravity.LEFT;
            }
            if ("centerHorizontal" == value) {
                return Gravity.CENTER_HORIZONTAL;
            }
            if ("centerVertical" == value) {
                return Gravity.CENTER_VERTICAL;
            }
            if ("center" == value) {
                return Gravity.CENTER;
            }
            return Gravity.NONE;
        },
        /**
         * @static @method
         * 将对齐方式变量转换为字符串表达式
         *
         * @param {number} value
         * @return {string}
         */
        toString: function (value) {
            var words = [];
            if ((Gravity.TOP & value) != 0) {
                words.push("top");
            }
            if ((Gravity.RIGHT & value) != 0) {
                words.push("right");
            }
            if ((Gravity.BOTTOM & value) != 0) {
                words.push("bottom");
            }
            if ((Gravity.LEFT & value) != 0) {
                words.push("left");
            }
            if ((Gravity.CENTER_HORIZONTAL & value) != 0) {
                words.push("centerHorizontal");
            }
            if ((Gravity.CENTER_VERTICAL & value) != 0) {
                words.push("centerVertical");
            }
            if ((Gravity.CENTER & value) != 0) {
                words.push("center");
            }
            var str = "";
            for (var i = 0; i < words.length; i++) {
                if (i > 0) {
                    str += "|";
                }
                str += words[i];
            }
            return str;
        },
        /**
         * @static @method
         * 解析字符串到枚举变量
         *
         * @param {string} value
         * @return {number}
         */
        parse: function (value) {
            if (value == null) {
                return Gravity.NONE;
            }
            var words = value.split(/\|/);
            var gravity = Gravity.NONE;
            for (var index in words) {
                var word = words[index];
                gravity |= Gravity.parseElement(word);
            }
            return gravity;
        }
    }
    var Gravity = com.vizengine.view.Gravity;

    /**
     * @class com.vizengine.view.Rect
     * @extends com.vizengine.core.Object
     * 表示一个二维的矩形区域
     */
    Object.extend("com.vizengine.view.Rect",{
        init: function () {
            var x, y, width, height;
            if(arguments.length == 4) {
                x = arguments[0];
                y = arguments[1];
                width = arguments[2];
                height = arguments[3];
            } else if(arguments.length == 1){
                x = arguments[0].x;
                y = arguments[0].y;
                width = arguments[0].width;
                height = arguments[0].height;
            } else {
                x = y = width = height = 0;
            }

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        /**
         * @method
         * 获取矩形左边坐标
         *
         * @return {number}
         */
        getLeft: function () {
            return this.x;
        },
        /**
         * @method
         * 获取矩形上边坐标
         * @return {number}
         */
        getTop: function () {
            return this.y;
        },
        /**
         * @method
         * 获取矩形右边坐标
         * @return {number}
         */
        getRight: function () {
            return this.x + this.width;
        },
        /**
         * @method
         * 获取矩形底边坐标
         * @return {number}
         */
        getBottom: function () {
            return this.y + this.height;
        },
        /**
         * @method
         * 相交检测
         *
         * @param x 待检测点的x坐标
         * @param y 待检测点的y坐标
         * @returns {boolean} 是否相交
         *
         */
        hitTest: function (x, y) {
            return x >= this.x && x <= (this.x + this.width) && y >= this.y
                && y <= (this.y + this.height);
        }
    });
    var Rect = com.vizengine.view.Rect;

    /**
     * @class com.vizengine.view.Space
     * @extends com.vizengine.core.Object
     * 描述Margin或者Padding的空间数据
     */
    Object.extend("com.vizengine.view.Space",{
        init: function () {
            this.left = 0;
            this.top = 0;
            this.right = 0;
            this.bottom = 0;
        },
        /**
         * 通过Top-Right-Bottom-Left的顺序以空格隔开多个值的形式设置边距
         * @param {string} value Top-Right-Bottom-Left的顺序以空格隔开的多个值
         */
        setTRBL: function (value) {
            if (value == null) {
                return;
            }
            var eles = value.split(/\s+/);
            if (eles == null || eles.length == 0) {
                return;
            }

            if (eles.length > 0) {
                this.top = View.parseSize(eles[0]);
            } else {
                this.top = 0;
            }

            if (eles.length > 1) {
                this.right = View.parseSize(eles[1]);
            } else {
                this.right = this.top;
            }

            if (eles.length > 2) {
                this.bottom = View.parseSize(eles[2]);
            } else {
                this.bottom = this.right;
            }

            if (eles.length > 3) {
                this.left = View.parseSize(eles[3]);
            } else {
                this.left = this.bottom;
            }
        },
        /**
         * @method
         * 获取水平间距
         *
         * @return {number} 水平方向的间距
         */
        hspace: function () {
            return this.left + this.right;
        },
        /**
         * @method
         * 获取垂直方向的间距
         *
         * @returns {number}
         */
        vspace: function () {
            return this.top + this.bottom;
        }
    });
    var Space = com.vizengine.view.Space;

    /**
     * @class com.vizengine.view.LayoutParam
     * @extends com.vizengine.core.Object
     * View的布局参数
     */
    Object.extend("com.vizengine.view.LayoutParam",{
        init: function () {
            /**
             * @property {com.vizengine.view.Layout} layout 布局类型
             */
            this.layout = com.vizengine.view.Layout.FRAME;
            /**
             * @property {com.vizengine.view.Layout} layout 在父亲基础上定制布局类型
             */
            this.layoutInParent = null;
            /**
             * @property {com.vizengine.view.LayoutConstrain} width 视图宽度
             */
            this.width = com.vizengine.view.LayoutConstrain.FILL;
            /**
             * @property {number} widthWeight 视图宽度比重
             */
            this.widthWeight = 1;
            /**
             * @property {com.vizengine.view.LayoutConstrain} height 视图高度
             */
            this.height = com.vizengine.view.LayoutConstrain.FILL;
            /**
             * @property {number} heightWeight 视图宽度比重
             */
            this.heightWeight = 1;
            /**
             * @property {com.vizengine.view.Space} margin 视图外边距
             */
            this.margin = new com.vizengine.view.Space();
            /**
             * @property {com.vizengine.view.Space} padding 视图内边距
             */
            this.padding = new com.vizengine.view.Space();
            /**
             * @property {com.vizengine.view.Gravity} gravity 视图在父视图中的对齐方式
             */
            this.gravity = com.vizengine.view.Gravity.NONE;
            /**
             * @property {com.vizengine.view.Gravity} contentGravity 视图中的子视图中的对齐方式
             */
            this.contentGravity = com.vizengine.view.Gravity.NONE;
        }
    });
    var LayoutParam = com.vizengine.view.LayoutParam;

    /**
     * @class com.vizengine.view.VelocityTracker
     * @extends com.vizengine.core.Object
     * 速度追踪器
     * 可以最终手势滑动或者任意变化的数值的瞬时速率
     *
     */
    Object.extend("com.vizengine.view.VelocityTracker",{
        init: function () {
            Object.prototype.init.apply(this,arguments);
            this.tracks = new Array();
        },
        /**
         * @method
         * 实时调用此函数将需要追踪的值传给VelocityTracker实例
         *
         * @param {number} value
         */
        track: function (value) {
            var now = new Date().getTime();
            this.tracks.push({time: now, value: value});
            while (true) {
                var item = this.tracks[0];
                if (now - item.time > 1000) {
                    this.tracks.shift();
                } else {
                    break;
                }
            }
        },
        /**
         * @method
         * 获取实时速率
         *
         * @returns {number} 实时速率
         */
        getVelocity: function () {
            if (this.tracks.length == 0) {
                return 0;
            }
            var minDeltaTime = 50;
            var lastItem = this.tracks[this.tracks.length - 1];
            var firstItem = lastItem;
            for (var i = 1; i < this.tracks.length; i++) {
                firstItem = this.tracks[this.tracks.length - 1 - i];
                if (lastItem.time - firstItem.time > minDeltaTime) {
                    break;
                }
            }
            var deltaTime = lastItem.time - firstItem.time;
            if (deltaTime > 0) {
                return (lastItem.value - firstItem.value) / (lastItem.time - firstItem.time);
            }
            return 0;
        }
    });
    var VelocityTracker = com.vizengine.view.VelocityTracker;

    /**
     * @class com.vizengine.view.Color
     * @extends com.vizengine.core.Object
     * 颜色
     */
    Object.extend("com.vizengine.view.Color",{
        init: function () {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
        },
        /**
         * @method
         * 通过颜色字符串设置颜色值
         * 例如红色: #FF0000
         *
         * @param {string} value 颜色字符串,需#号开头,如果带透明度信息则前两位为透明度值.定义类似android的颜色定义。
         */
        setByHex: function (value) {
            if (value.length == 7) {
                this.r = parseInt(value.substring(1, 3), 16);
                this.g = parseInt(value.substring(3, 5), 16);
                this.b = parseInt(value.substring(5, 7), 16);
                this.a = 255;
            } else if (value.length == 9) {
                this.a = parseInt(value.substring(1, 3), 16);
                this.r = parseInt(value.substring(3, 5), 16);
                this.g = parseInt(value.substring(5, 7), 16);
                this.b = parseInt(value.substring(7, 9), 16);
            }
        },
        /**
         * @method
         * 将颜色值转换为字符串
         *
         * @returns {string} 颜色值字符串
         */
        toString: function () {
            var to2HexStr = function (value) {
                return value < 10 ? "0" + value : value.toString(16);
            };
            return '#' + to2HexStr(this.a) + to2HexStr(this.r) + to2HexStr(this.g) + to2HexStr(this.b);
        }
    });

    var Color = com.vizengine.view.Color;

    /**
     * @static @method
     * 解析颜色字符串
     *
     * @param {string} value 颜色值字符串.如#FF0000
     * @return {com.vizengine.view.Color} 颜色
     */
    Color.parse = function (value) {
        var color = new Color();
        color.setByHex(value);
        return color;
    };

    /**
     * @class com.vizengine.view.View
     * @extends com.vizengine.core.Object
     * View是所有视图控件的基类，View实现了基本的Component设计模式，通过
     * View形成视图的树状结构，在这个结构基础之上分发手势事件，动画事件，以及
     * 布局事件。通过在View中实现的手势处理，动画处理和布局功能代替原生的相应功能
     * 来彻底的支撑跨平台开发能力。而最基本的视图组件如文本控件，图片控件输入框
     * 等又是直接基于原生控件封装，因此确保了原生渲染带来的高帧率和细腻的交互和动画体验。
     *
     */
    Object.extend("com.vizengine.view.View",{
        init : function(nativeView) {
            if(nativeView == null){
                nativeView = this._createNativeView();
            }
            nativeView.setVirtualView(this);
            this._nativeView = nativeView;
            this.id = null;
            this.parentView = null;
            this.subViews = new Array();
            this.frame = new Rect();
            this.layoutParam = new LayoutParam();
            this.gone = false;
            this.touchable = true;
            this.visible = true;
            this.opaque = false;
            this.gestureDetectors = [];
            this.onTapGestureDetector = null;
            this.onClickCallback = null;
            this.onScrollCallback = null;
            this.onSizeChangeCallback = null;
            this.translateX = 0;
            this.translateY = 0;
            this.anchorX = 0;
            this.anchorY = 0;
            this.alpha = 1;
            this.blur = 0;
            this.animation = null;
            this.contextPath = null;
            this.velocityTrackerX = new VelocityTracker();
            this.velocityTrackerY = new VelocityTracker();
            this.measuredWidth = null;
            this.measuredHeight = null;
            this.isLayoutDirty = true;
            this.isLayouting = false;
            this.zorder = 0;
            this.zorderUpdateRequested= false;
            this.scaleX = 1;
            this.scaleY = 1;
            this.focus = false;
            this.focusable = false;
            this.setHover(false);
        },
        _createNativeView : function(){
            return createNativeObject("NativeView");
        },
        snapshot : function(callback) {
            this._nativeView.snapshot(callback);
        }
        ,
        getContextPath : function() {
            if(this.contextPath != null) {
                return this.contextPath;
            }
            if(this.parentView != null) {
                return this.parentView.getContextPath();
            }
            return null;
        },
        resolvePath : function(src) {
            src = View.resolvePath(this.getContextPath(),src);
            return src;
        },
        setHover : function(value) {
            this.hover = View.parseBoolean(value);
            if(this.hover) {
                this.setVisible(false);
            }
        },
        getHover : function() {
            return this.hover;
        },
        setFocus : function(value) {
            this.focus = View.parseBoolean(value);
            this._requestFocus(this,this.focus);
        },
        onFocusChanged : function() {
            this.setVisible(this.focus);
        },
        _requestFocus : function(target,focus) {
            if(focus) {
                if(window.rootView.focusedView != target) {
                    if(window.rootView.focusedView != null) {
                        window.rootView.focusedView.focus = false;
                        window.rootView.focusedView.onFocusChanged();
                    }
                    window.rootView.focusedView = target;
                    target.onFocusChanged();
                }
            } else {
                if(window.rootView.focusedView == target) {
                    window.rootView.focusedView = null;
                    target.onFocusChanged();
                }
            }
        }
        ,
        setFocusable  : function(value) {
            this.focusable = View.parseBoolean(value);
            if(this.focusable) {
                this.setVisible(false);
            }
        }
        ,
        /**
         * @method
         * 设置视图id
         * @param id
         */
        setId : function(id) {
            this.id = id;
            this._nativeView.setId(id);
        },
        setTouchable : function(touchable) {
            this.touchable = View.parseBoolean(touchable);
        },
        setOpaque : function(opaque) {
            this.opaque = View.parseBoolean(opaque);
            this._nativeView.setOpaque(this.opaque?1:0);
        }
        ,
        /**
         * @method
         * 获取视图id
         * @returns {string}
         */
        getId : function() {
            return this.id;
        },
        setLatitude : function(latitude) {
            this.latitude = latitude;
        },
        setLongitude : function(longitude) {
            this.longitude = longitude;
        }
        ,
        setBlur : function(blur) {
            blur = View.parseFloat(blur);
            this.blur = blur;
            this._nativeView.setBlur(blur);
        },
        /**
         * @method
         * 设置三维动画的摄像机距离(单位为dp)
         * @param distance
         */
        setCameraDistance : function(distance) {
            distance = View.parseSize(distance);
            this._nativeView.setCameraDistance(distance);
        },
        /**
         * @method
         * 设置动画的锚点x坐标
         * @param anchorX
         */
        setAnchorX : function(anchorX) {
            anchorX = View.parseFloat(anchorX);
            this.anchorX = anchorX;
            this._nativeView.setAnchorX(anchorX);
        },
        /**
         * @method
         * 设置动画的锚点y坐标
         * @param anchorY
         */
        setAnchorY : function(anchorY) {
            anchorY = View.parseFloat(anchorY);
            this.anchorY = anchorY;
            this._nativeView.setAnchorY(anchorY);
        }
        ,
        /**
         * @method
         * 设置绕x轴的旋转角度。
         * @param rotateX
         */
        setRotateX : function(rotateX) {
            rotateX = View.parseFloat(rotateX);
            this._nativeView.setRotateX(rotateX);
        }
        ,
        /**
         * @method
         * 设置绕y轴的旋转角度
         * @param rotateY
         */
        setRotateY : function(rotateY) {
            rotateY = View.parseFloat(rotateY);
            this._nativeView.setRotateY(rotateY);
        }
        ,
        /**
         * @method
         * 设置绕z轴的旋转角度
         * @param rotateZ
         */
        setRotateZ : function(rotateZ) {
            rotateZ = View.parseFloat(rotateZ);
            this._nativeView.setRotateZ(rotateZ);
        },
        /**
         * @method
         * 设置x轴方向的缩放系数
         * @param scaleX
         */
        setScaleX : function(scaleX) {
            scaleX = View.parseFloat(scaleX);
            this.scaleX = scaleX;
            this._nativeView.setScaleX(scaleX);
        }
        ,
        /**
         * @method
         * 设置y轴方向的缩放系数
         * @param scaleY
         */
        setScaleY : function(scaleY) {
            scaleY = View.parseFloat(scaleY);
            this.scaleY = scaleY;
            this._nativeView.setScaleY(scaleY);
        },
        /**
         * @method
         * 设置透明度
         * @param alpha
         */
        setAlpha : function(alpha) {
            alpha = View.parseFloat(alpha);
            this.alpha = alpha;
            this._nativeView.setAlpha(alpha);
        }
        ,
        setBorderCorner : function(corner)
        {
            corner = View.parseSize(corner);
            this._nativeView.setBorderCorner(corner);
        }
        ,
        setBorderWidth : function(width) {
            width = View.parseSize(width);
            this._nativeView.setBorderWidth(width);
        }
        ,
        setBorderColor : function(color) {
            this._nativeView.setBorderColor(color);
        }
        ,
        setClipToBounds : function(clip) {
            clip = View.parseBoolean(clip);
            this._nativeView.setClipToBounds(clip?1:0);
        }
        ,
        onScroll : function(deltaX,deltaY){
            if(this.onScrollCallback != null) {
                this.onScrollCallback(deltaX,deltaY);
            }
        }
        ,
        /**
         * @method
         * 设置x轴方向上的移动距离
         * @param translateX
         */
        setTranslateX : function(translateX) {
            translateX = View.parseSize(translateX);
            this.velocityTrackerX.track(translateX);
            var oldX = this.translateX;
            this.translateX = translateX;
            this._nativeView.setTranslateX(translateX);
            this.onScroll(this.translateX-oldX,0);
        },
        /**
         * @method
         * 设置y轴方向上移动距离
         * @param translateY
         */
        setTranslateY : function(translateY) {
            translateY = View.parseSize(translateY);
            this.velocityTrackerY.track(translateY);
            var oldY = this.translateY;
            this.translateY = translateY;
            this._nativeView.setTranslateY(translateY);
            this.onScroll(0,this.translateY-oldY);
        },
        /**
         * @method
         * 设置视图是否可见
         * @param visible
         */
        setVisible : function(visible) {
            this.visible = View.parseBoolean(visible);
            this._nativeView.setVisible(this.visible?1:0);
            this.requestDraw();

        }
        ,
        setGone : function(gone) {
            this.gone = View.parseBoolean(gone);
            this.setVisible(this.gone?false:true);
            this.requestLayout();
        }
        ,
        /**
         * @method
         * 设置布局类型。frame,horizontal,vertical
         * @param value frame,horizontal,vertical
         */
        setLayout: function (value) {
            this.layoutParam.layout = Layout.parse(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取布局类型。
         * @returns {string}
         */
        getLayout: function() {
            return Layout.toString(this.layoutParam.layout);
        }
        ,
        /**
         * @method
         * 设置宽度。宽度值可以为固定像素，如100px,100dp；也可以为弹性值，如fill,wrap,match,matchWidth,matchHeight.
         * 并且可以用空格隔开，在后面追加权重。例如"fill 0.3"
         * @param value
         */
        setWidth: function (value) {
            var words = value.split(/\s+/);
            if (words == null || words.length < 1) {
                return;
            }
            // 尝试解析weight
            if(words.length > 1) {
                this.layoutParam.widthWeight = View.parseFloat(words[1],1);
            } else {
                this.layoutParam.widthWeight = 1;
            }

            this.layoutParam.width = View.parseSize(words[0]);

            this.requestLayout();
        },
        /**
         * @method
         * 获取宽度信息
         * @returns {string}
         */
        getWidth : function () {
            return View.sizeToString(this.layoutParam.width)+ (this.layoutParam.widthWeight != 1 ? " "+this.layoutParam.widthWeight : "");
        },
        /**
         * @method
         * 设置高度。高度值可以为固定像素，如100px,100dp；也可以为弹性值，如fill,wrap,match,matchWidth,matchHeight.
         * 并且可以用空格隔开，在后面追加权重。例如"fill 0.3"
         * @param value
         */
        setHeight: function (value) {
            var words = value.split(/\s+/);
            if (words == null || words.length < 1) {
                return;
            }

            // 尝试解析weight
            if(words.length > 1) {
                this.layoutParam.heightWeight = View.parseFloat(words[1],1);
            } else {
                this.layoutParam.heightWeight = 1;
            }
            this.layoutParam.height = View.parseSize(words[0]);
            this.requestLayout();
        },
        /**
         * @method
         * 获取高度信息
         * @returns {string}
         */
        getHeight : function () {
            return View.sizeToString(this.layoutParam.height)+ (this.layoutParam.heightWeight != 1 ? " "+this.layoutParam.heightWeight : "");
        },
        /**
         * @method
         * 设置margin.
         * @param value
         */
        setMargin: function (value) {
            this.layoutParam.margin.setTRBL(value);
            this.requestLayout();
        },
        /**
         * @method
         * 设置marginTop
         * @param value
         */
        setMarginTop: function (value) {
            this.layoutParam.margin.top = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取marginTop
         * @returns {string}
         */
        getMarginTop: function () {
            return this.layoutParam.margin.top + "";
        },
        /**
         * @method
         * 设置marginRight
         * @param value
         */
        setMarginRight: function (value) {
            this.layoutParam.margin.right = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取marginRight
         * @returns {string}
         */
        getMarginRight: function () {
            return this.layoutParam.margin.right + "";
        },
        /**
         * @method
         * 设置marginBottom
         * @param value
         */
        setMarginBottom: function (value) {
            this.layoutParam.margin.bottom = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取marginBottom
         * @returns {string}
         */
        getMarginBottom: function () {
            return this.layoutParam.margin.bottom + "";
        },
        /**
         * @method
         * 设置marginLeft
         * @param value
         */
        setMarginLeft: function (value) {
            this.layoutParam.margin.left = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取marginLeft
         * @returns {string}
         */
        getMarginLeft: function () {
            return this.layoutParam.margin.left + "";
        },
        /**
         * @method
         * 设置padding
         * @param value
         */
        setPadding: function (value) {
            this.layoutParam.padding.setTRBL(value);
            this.requestLayout();
        },
        /**
         * @method
         * 设置paddingTop
         * @param value
         */
        setPaddingTop: function (value) {
            this.layoutParam.padding.top = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取paddingTop
         * @returns {string}
         */
        getPaddingTop: function () {
            return this.layoutParam.padding.top + "";
        },
        /**
         * @method
         * 设置paddingRight
         * @param value
         */
        setPaddingRight: function (value) {
            this.layoutParam.padding.right = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取paddingRight
         * @returns {string}
         */
        getPaddingRight: function () {
            return this.layoutParam.padding.right + "";
        },
        /**
         * @method
         * 设置paddingBottom
         * @param value
         */
        setPaddingBottom: function (value) {
            this.layoutParam.padding.bottom = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取paddingBottom
         * @returns {string}
         */
        getPaddingBottom: function () {
            return this.layoutParam.padding.bottom + "";
        },
        /**
         * @method
         * 设置paddingLeft
         * @param value
         */
        setPaddingLeft: function (value) {
            this.layoutParam.padding.left = View.parseSize(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取paddingLeft
         * @returns {string}
         */
        getPaddingLeft: function () {
            return this.layoutParam.padding.left + "";
        },
        /**
         * @method
         * 设置当前View在父View中的对其方式
         * @param value
         */
        setGravity: function (value) {
            this.layoutParam.gravity = Gravity.parse(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取对齐方式
         * @returns {string}
         */
        getGravity: function () {
            return Gravity.toString(this.layoutParam.gravity);
        },
        /**
         * @method
         * 设置内容对其方式
         * @param value
         */
        setContentGravity: function (value) {
            this.layoutParam.contentGravity = Gravity.parse(value);
            this.requestLayout();
        },
        /**
         * @method
         * 获取内容对其方式
         * @returns {string}
         */
        getContentGravity: function () {
            return Gravity.toString(this.layoutParam.contentGravity);
        },
        /**
         * @method
         * 查找指定id的子View
         * @param id
         * @returns {*}
         */
        $ : function(id) {
            if(this._index_cache == null) {
                this._index_cache = {}
            }
            if(this._index_cache[id] != null) {
                return this._index_cache[id];
            }
            return this._index_cache[id] = this.findViewById(id);
        },
        /**
         * 按照指定的坐标查找可见的叶子节点view
         * @param x
         * @param y
         * @returns {*}
         */
        findViewByXY : function(x,y) {
            for(var i = this.subViews.length - 1 ; i >= 0; i--) {
                var view = this.subViews[i];
                var test = view.hitTest(x,y);
                if(test && view.visible) {
                    return view.findViewByXY(x-view.frame.x-view.translateX,y-view.frame.y-view.translateY);
                }
            }
            return this;
        },
        findViewsByXY : function(x,y,output) {
            for(var i = this.subViews.length - 1 ; i >= 0; i--) {
                var view = this.subViews[i];
                var test = view.hitTest(x,y);
                if(test) {
                    output.push(view);
                    view.findViewsByXY(x-view.frame.x-view.translateX,y-view.frame.y-view.translateY,output);
                }
            }
        },
        _findViewByIdInParentExceptMe : function(id) {
            if(this.parentView == null) {
                return null;
            }
            for(var i = 0 ; i < this.parentView.subViews.length ; i++) {
                var child = this.parentView.subViews[i];
                if(child.id == id) {
                    return child;
                }
                if(child != this) {
                    var finded = child.findViewByIdInMyScope(id);
                    if(finded != null) {
                        return finded;
                    }
                }
            }
            return this.parentView._findViewByIdInParentExceptMe(id);
        },
        /**
         * @method
         * 在当前View的子孙中查找指定id的子View
         * @param id
         * @returns {*}
         */
        findViewByIdInMyScope : function(id) {
            if(this.id == id) {
                return this;
            }
            for(var i = 0 ; i < this.subViews.length; i++) {
                var subview = this.subViews[i];
                if(subview.id == id) {
                    return subview;
                }
                var finded = this.subViews[i].findViewByIdInMyScope(id);
                if(finded != null) {
                    return finded;
                }
            }
            return null;
        }
        ,
        /**
         * @method
         * 查找指定id的View
         * @param id
         * @returns {*}
         */
        findViewById : function(id) {
            var finded = this.findViewByIdInMyScope(id);
            return finded;
        },
        findViewByIdInTree : function(id) {
            var finded = this.findViewByIdInMyScope(id);
            if(finded == null) {
                finded = this._findViewByIdInParentExceptMe(id);
            }
            return finded;
        }
        ,
        /**
         * @method
         * 增加子View
         * @param view
         * @param index
         * @param requestLayout
         */
        addView : function(view,index,requestLayout) {
            if(view == null) {
                return;
            }
            if(index == null) {
                index = this.subViews.length;
            }
            if(requestLayout == null) {
                requestLayout = true;
            }
            view.parentView = this;
            if(index < this.subViews.length) {
                var part1 = this.subViews.slice(0,index);
                var part2 = this.subViews.slice(index);
                part1.push(view);
                this.subViews = part1.concat(part2);
            } else {
                this.subViews.push(view);
            }

            this._nativeView.addNativeView(view._nativeView,index);
            if(requestLayout) {
                this.requestLayout();
            }
            return this;
        },
        /**
         * @method
         * 删除指定位置的子View
         * @param index
         * @returns {*}
         */
        removeViewAt : function(index,requestLayout) {
            if(index < 0 || index >= this.subViews.length) {
                return null;
            }
            if(requestLayout == null) {
                requestLayout = true;
            }
            var toBeRemove = this.subViews[index];
            this._nativeView.removeNativeViewAt(index);
            this.subViews.splice(index, 1);
            if(requestLayout) {
                this.requestLayout();
            }
            this._index_cache = {}; // 清除查询缓存
            return toBeRemove;
        }
        ,
        /**
         * @method
         * 删除指定的子View
         * @param view
         * @returns {*}
         */
        removeView : function (view,requestLayout) {
            var index = -1;
            for (var i in this.subViews) {
                var v = this.subViews[i];
                if (v == view) {
                    index = i;
                    break;
                }
            }
            return this.removeViewAt(index,requestLayout);
        },
        /**
         * @method
         * 删除所有子Views
         * @param requestLayout
         */
        clearViews : function(requestLayout) {
            while(this.subViews.length > 0) {
                this.removeViewAt(0,requestLayout);
            }
        }
        ,
        /**
         * @method
         * 设置背景颜色
         * @param background
         */
        setBackground : function(background) {
            this.background = background;
            this._nativeView.setBackground(background);
        },
        getBackground : function() {
            return this.background;
        },
        setZorder : function(zorder) {
            this.zorder = zorder;
            if(this.parentView) {
                this.parentView._requestUpdateChildrenByZorder();
            }
        },
        _requestUpdateChildrenByZorder : function() {
            if(this.zorderUpdateRequested) {
                return;
            }
            this.zorderUpdateRequested = true;
            var self = this;
            setTimeout(function(){
                self._updateChildrenByZorder();
            },0);
        },
        _bubbleSort : function(arr,compare){
            var len=arr.length,j;
            var temp;
            while(len>0){
                for(j=0;j<len-1;j++){
                    if(compare(arr[j],arr[j+1]) > 0){
                        temp=arr[j];
                        arr[j]=arr[j+1];
                        arr[j+1]=temp;
                    }
                }
                len--;
            }
            return arr;
        },
        _updateChildrenByZorder: function () {
            this.zorderUpdateRequested = false;
            var childArr = this.subViews.concat([]);
            this._bubbleSort(childArr,function (left, right) {
                return left.zorder - right.zorder;
            });

            this.clearViews(false);
            for (var i = 0; i < childArr.length; i++) {
                this.addView(childArr[i], i, false);
            }
        }
        ,
        /**
         * 开始播放动画
         * @param animation
         * @param terminateCurrent
         */
        startAnimation : function(animation,terminateCurrent) {
            if(terminateCurrent == null) {
                terminateCurrent = true;
            }
            if(terminateCurrent && this.animation != null) {
                com.vizengine.animation.Animation.terminateAnimation(this);
            }
            this.animation = animation;
            if(this.animation != null) {
                com.vizengine.animation.Animation.requestAnimation(this);
            }
        },
        dispatchDraw : function() {

        },
        /**
         * @method
         * 触发点击事件
         * @depressed 使用triggerClick代替
         * @returns {boolean}
         */
        trigerClick: function (e) {
            return this.triggerClick(e);
        },
        /**
         * @method
         * 触发点击事件
         * @returns {boolean}
         */
        triggerClick: function(e){
            var consumed = false;
            if(this.onClickCallback != null) {
                consumed = true;
                var self = this;
                // 视频播放需要在手势的当前loop里调用video.play才能唤起播放，因此这里不再使用setTimeout来延迟出发点击事件了
                //setTimeout(function(){
                self.onClickCallback.call(self,e);
                //},0);
            }
            //this._checkLinkAndForward();
            return consumed;
        }
        ,
        /**
         * @method
         * 设置点击处理回调函数
         * @param value 回调处理函数
         */
        setOnClick: function (value) {
            if(value == null) {
                if(this.onTapGestureDetector != null) {
                    this.removeGestureDetector(this.onTapGestureDetector);
                    this.onTapGestureDetector = null;
                }
                this.onClickCallback = null;
                return;
            }
            if (value instanceof Function) {
                this.onClickCallback = value;
                if(this._nativeView.div != null) {
                    this._nativeView.div.style.cursor = "pointer";
                }
            }
            var self = this;
            if (this.onTapGestureDetector == null) {
                this.onTapGestureDetector = new TapGestureDetector();
                this.onTapGestureDetector.callback = function (e) {
                    return self.triggerClick(e);
                };
                this.gestureDetectors.push(this.onTapGestureDetector);
            }
        },
        /**
         * @method
         * 添加手势识别器
         * @param detector
         */
        addGestureDetector : function(detector) {
            this.gestureDetectors.push(detector);
        },
        /**
         * @method
         * 删除手势识别器
         * @param gestureDetector
         */
        removeGestureDetector : function(gestureDetector) {
            for(var i = 0 ; i < this.gestureDetectors; i++) {
                if(this.gestureDetectors[i] == gestureDetector) {
                    this.gestureDetectors.splice(i,1);
                    return;
                }
            }
        },
        onTouch: function (event) {
            var consumed = false;
            for (var i in this.gestureDetectors) {
                var gestureDetector = this.gestureDetectors[i];
                if (gestureDetector.detect(event)) {
                    consumed = true;
                }
            }
            return consumed;
        },
        /**
         * 获取当前View相对于指定View中的坐标
         * @param view
         * @returns {*}
         */
        getFrameInView : function(view) {
            var myFrameInRoot = this.getFrameInRootView();
            var targetFrameInRoot = view.getFrameInRootView();
            myFrameInRoot.x -= targetFrameInRoot.x;
            myFrameInRoot.y -= targetFrameInRoot.y;
            return myFrameInRoot;
        },
        getRootView : function() {
            var view = this;
            while(view.parentView != null) {
                view = view.parentView;
            }
            return view;
        }
        ,
        /**
         * 获取当前View相对于根View的坐标
         * @returns {com.vizengine.view.Rect}
         */
        getFrameInRootView : function() {
            var frame = new Rect(this.frame);
            var view = this;
            while(view.parentView != null) {
                frame.x += (view.translateX+view.parentView.frame.x);
                frame.y += (view.translateY+view.parentView.frame.y);
                view = view.parentView;
            }
            return frame;
        },
        _transformEventToChild : function(subview,touchEvent) {
            var matrix = new com.vizengine.math.Matrix4();
            matrix.identity();

            var anchorTrans = new com.vizengine.math.Matrix4();
            anchorTrans.setTranslation(subview.frame.width*subview.anchorX,subview.frame.height*subview.anchorY,0);
            matrix.multiply(anchorTrans);
            var scale = new com.vizengine.math.Matrix4();
            scale.setScale(1/subview.scaleX,1/subview.scaleY,1);
            matrix.multiply(scale);
            var translate = new com.vizengine.math.Matrix4();
            translate.setTranslation(-subview.frame.x - subview.translateX - subview.frame.width * subview.anchorX , -subview.frame.y - subview.translateY - subview.frame.height * subview.anchorY,0);
            matrix.multiply(translate);

            var subViewTouchEvent = touchEvent.applyMartix4(matrix);
            return subViewTouchEvent;
        },
        dispatchKey: function(keyEvent) {
            if (!this.visible) {
                return false;
            }
            for(var i = 0 ; i < this.subViews.length ; i++) {
                var child = this.subViews[i];
                if(!child.visible){
                    continue;
                }
                child.dispatchKey(keyEvent);
            }
        }
        ,
        dispatchTouch: function (touchEvent) {
            if (!this.touchable) {
                return false;
            }

            if (!this.visible) {
                return false;
            }

            if (this.isTouchInside(touchEvent)) {
                if (!this.touching && touchEvent.state == 1) {
                    touchEvent = touchEvent.offsetCopy(0, 0); // 改为touchDown继续下传
                    //touchEvent.state = 0;
                }

                this.touching = touchEvent.state < 2;
                var selfProcessed = false;
                var childProcessed = false;
                var length = this.subViews.length;
                for (var i = 0; i < length; i++) {
                    var subview = this.subViews[length - 1 - i];
                    if (!subview.visible) {
                        continue;
                    }
                    var subViewTouchEvent = this._transformEventToChild(subview,touchEvent);
                    if (subview.dispatchTouch(subViewTouchEvent)) {
                        childProcessed = true;
                        break;
                    }
                }

                if (!childProcessed) {
                    selfProcessed = this.onTouch(touchEvent);
                }

                // return childProcessed;
                return selfProcessed || childProcessed;
            } else if (this.touching) {
                this.touching = false;
                touchEvent = touchEvent.offsetCopy(0, 0);
                touchEvent.state = 3;

                //this._setBackground(this.backgroundNormal);

                var selfProcessed = false;
                var childProcessed = false;
                var length = this.subViews.length;
                for (var i = 0; i < length; i++) {
                    var subview = this.subViews[length - 1 - i];
                    if (!subview.visible) {
                        continue;
                    }
                    var subViewTouchEvent = touchEvent.offsetCopy(-subview.frame.x - subview.translateX, -subview.frame.y - subview.translateY);
                    if (subview.dispatchTouch(subViewTouchEvent)) {
                        childProcessed = true;
                        break;
                    }
                }

                if (!childProcessed) {
                    selfProcessed = this.onTouch(touchEvent);
                }

                return selfProcessed || childProcessed;
            }
        },
        isTouchInside: function (touchEvent) {
            var left = 0;
            var top = 0;
            var right = left + this.frame.width;
            var bottom = top + this.frame.height;
            for (var i in touchEvent.touchPoints) {
                var point = touchEvent.touchPoints[i];
                if (point.x > left && point.y > top && point.x < right && point.y < bottom) {
                    return true;
                }
            }
            return false;
        },
        /**
         * 此方法用于其父亲确认当前view是否和某个坐标相交
         * 因此，参数坐标是基于父亲的坐标。
         * @param x
         * @param y
         * @returns {boolean|*}
         */
        hitTest: function (x, y) {
            return this.frame.hitTest(x - this.translateX, y - this.translateY);
        }
        ,
        dispatchLayout : function() {
            if(this.gone) {
                return;
            }
            this._nativeView.setFrame(this.frame.x,this.frame.y,this.frame.width,this.frame.height);
            if(this.subViews.length > 0) {
                if (this.layoutParam.layout == Layout.FRAME) {
                    this.layoutChildrenByFrame();
                } else if (this.layoutParam.layout == Layout.VERTICAL) {
                    this.layoutChildrenByVertical();
                } else if(this.layoutParam.layout == Layout.FLOW) {
                    this.layoutChildrenByFlow();
                } else {
                    this.layoutChildrenByHorizontal();
                }
            }

            if(this.onSizeChangeCallback != null) {
                this.onSizeChangeCallback.call(this,this.frame.width,this.frame.height);
            }
        },
        layoutChildrenByFlow : function() {
            var frameWidth = this.frame.width;
            var frameHeight = this.frame.height;
            var contentWidth = frameWidth - this.layoutParam.padding.hspace();
            var contentHeight = frameHeight - this.layoutParam.padding.vspace();
            var subUPViews = this.subViews;

            var offsetX = this.layoutParam.padding.left;
            var offsetY = this.layoutParam.padding.top;
            var maxLineHeight = 0;
            var lines = [[]];
            for (var i in subUPViews) {
                var subview = subUPViews[i];
                var subviewWidth = subview.measureWidth();
                var subviewHeight = subview.measureHeight();
                var subviewBoxWidth = subviewWidth + subview.layoutParam.margin.hspace();
                var subviewBoxHeight = subviewHeight + subview.layoutParam.margin.vspace();
                if(offsetX + subviewBoxWidth > contentWidth || (subviewBoxWidth > contentWidth && offsetX == this.layoutParam.padding.left)) {
                    lines[lines.length-1].maxLineHeight = maxLineHeight;
                    lines[lines.length-1].offsetY = offsetY;
                    lines[lines.length-1].offsetX = offsetX;
                    offsetX = this.layoutParam.padding.left;
                    offsetY += maxLineHeight;
                    maxLineHeight = 0;
                    lines.push([]);
                }

                if(subviewBoxHeight > maxLineHeight) {
                    maxLineHeight = subviewBoxHeight;
                }

                subview.frame.x = offsetX + subview.layoutParam.margin.left;
                subview.frame.y = offsetY + subview.layoutParam.margin.top;
                subview.frame.width = subviewWidth;
                subview.frame.height = subviewHeight;
                lines[lines.length-1].push(subview);


                offsetX += subviewBoxWidth;
            }

            if(lines[lines.length-1].maxLineHeight == null) {
                lines[lines.length-1].maxLineHeight = maxLineHeight;
                lines[lines.length-1].offsetY = offsetY;
                lines[lines.length-1].offsetX = offsetX;
            }

            // 调整纵向位置
            if ((this.layoutParam.contentGravity & Gravity.BOTTOM) != 0) {
                var deltaY = this.frame.height - this.layoutParam.padding.bottom - (lines[lines.length-1].maxLineHeight+lines[lines.length-1].offsetY);
                for(var i = 0 ; i < lines.length ; i++) {
                    for(var j = 0 ; j < lines[i].length; j++) {
                        var view = lines[i][j];
                        view.frame.y += deltaY;
                    }
                }
            } else if ((this.layoutParam.contentGravity & Gravity.CENTER) != 0
                || (this.layoutParam.contentGravity & Gravity.CENTER_VERTICAL) != 0) {
                var deltaY = this.frame.height - this.layoutParam.padding.bottom - (lines[lines.length-1].maxLineHeight+lines[lines.length-1].offsetY);
                deltaY /= 2;
                for(var i = 0 ; i < lines.length ; i++) {
                    for(var j = 0 ; j < lines[i].length; j++) {
                        var view = lines[i][j];
                        view.frame.y += deltaY;
                    }
                }
            }

            // 调整横向位置
            if ((this.layoutParam.contentGravity & Gravity.RIGHT) != 0) {
                // 右对齐
                for(var i = 0 ; i < lines.length; i++) {
                    var line = lines[i];
                    var deltaX = this.frame.width - this.layoutParam.padding.right - line.offsetX;
                    for(var j = 0 ; j < line.length; j++) {
                        line[j].frame.x += deltaX;
                    }
                }
            } else if ((this.layoutParam.contentGravity & Gravity.CENTER) != 0
                || (this.layoutParam.contentGravity & Gravity.CENTER_HORIZONTAL) != 0) {
                // 水平居中对齐
                for(var i = 0 ; i < lines.length; i++) {
                    var line = lines[i];
                    var deltaX = this.frame.width - this.layoutParam.padding.right - line.offsetX;
                    deltaX /= 2;
                    for(var j = 0 ; j < line.length; j++) {
                        line[j].frame.x += deltaX;
                    }
                }
            }

            for(var i = 0 ; i < this.subViews.length; i++){
                var subview = this.subViews[i];
                subview.dispatchLayout();
            }
        }
        ,
        layoutChildrenByFrame: function () {
            var frameWidth = this.frame.width;
            var frameHeight = this.frame.height;
            var contentWidth = frameWidth - this.layoutParam.padding.hspace();
            var contentHeight = frameHeight - this.layoutParam.padding.vspace();
            var subUPViews = this.subViews;
            for (var i in subUPViews) {
                var subview = subUPViews[i];
                if(subview.gone) {
                    continue;
                }
                var subviewWidth = subview.measureWidth();
                var subviewHeight = subview.measureHeight();

                var x = 0;
                var y = 0;

                // set x
                if (subview.isAlignLeft()) {
                    x = this.layoutParam.padding.left + subview.layoutParam.margin.left;
                } else if (subview.isAlignRight()) {
                    x = frameWidth - this.layoutParam.padding.right - subview.layoutParam.margin.right - subviewWidth;
                } else {
                    x = this.layoutParam.padding.left + (contentWidth - subviewWidth - subview.layoutParam.margin.hspace()) / 2 + subview.layoutParam.margin.left;
                }

                // set y
                if (subview.isAlignTop()) {
                    y = subview.layoutParam.margin.top + this.layoutParam.padding.top;
                } else if (subview.isAlignBottom()) {
                    y = frameHeight - this.layoutParam.padding.bottom - subview.layoutParam.margin.bottom - subviewHeight;
                } else {
                    y = this.layoutParam.padding.top + (contentHeight - subviewHeight - subview.layoutParam.margin.vspace()) / 2 + subview.layoutParam.margin.top;
                }

                subview.frame.x = x;
                subview.frame.y = y;
                subview.frame.width = subviewWidth;
                subview.frame.height = subviewHeight;
                subview.dispatchLayout();
            }
        },
        layoutChildrenByVertical: function () {
            var frameWidth = this.frame.width;
            var frameHeight = this.frame.height;
            var contentWidth = frameWidth - this.layoutParam.padding.hspace();
            var contentHeight = frameHeight - this.layoutParam.padding.vspace();

            var offsetY = this.layoutParam.padding.top;

            var subUPViews = this.subViews;
            for (var i in subUPViews) {
                var subview = subUPViews[i];

                if(subview.gone) {
                    continue;
                }

                var subviewWidth = subview.measureWidth();
                var subviewHeight = subview.measureHeight();

                subview.frame.width = subviewWidth;
                subview.frame.height = subviewHeight;

                // set y
                subview.frame.y = offsetY + subview.layoutParam.margin.top;
                offsetY += subviewHeight + subview.layoutParam.margin.vspace();

                // set x
                if (subview.isAlignLeft()) {
                    subview.frame.x = this.layoutParam.padding.left + subview.layoutParam.margin.left;
                } else if (subview.isAlignRight()) {
                    subview.frame.x = frameWidth - this.layoutParam.padding.right - subview.layoutParam.margin.right - subviewWidth;
                } else {
                    subview.frame.x = this.layoutParam.padding.left + (contentWidth - subviewWidth - subview.layoutParam.margin.hspace()) / 2 + subview.layoutParam.margin.left;
                }
            }

            if ((this.layoutParam.contentGravity & Gravity.TOP) != 0) {
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    if(!view.gone)
                        view.dispatchLayout();
                }
                return;
            }

            if ((this.layoutParam.contentGravity & Gravity.BOTTOM) != 0) {
                var deltaY = frameHeight - this.layoutParam.padding.bottom - offsetY;
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    view.frame.y += deltaY;
                }
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    if(!view.gone)
                        view.dispatchLayout();
                }
                return;
            }

            if ((this.layoutParam.contentGravity & Gravity.CENTER) != 0
                || (this.layoutParam.contentGravity & Gravity.CENTER_VERTICAL) != 0) {
                var deltaY = (contentHeight - offsetY + this.layoutParam.padding.top) / 2;
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    view.frame.y += deltaY;
                }
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    if(!view.gone)
                        view.dispatchLayout();
                }
                return;
            }

            for (var i in subUPViews) {
                var view = subUPViews[i];
                if(!view.gone)
                    view.dispatchLayout();
            }
        },
        layoutChildrenByHorizontal: function () {
            var frameWidth = this.frame.width;
            var frameHeight = this.frame.height;
            var contentWidth = frameWidth - this.layoutParam.padding.hspace();
            var contentHeight = frameHeight - this.layoutParam.padding.vspace();

            var offsetX = this.layoutParam.padding.left;

            var subUPViews = this.subViews;
            for (var i in subUPViews) {
                var subview = subUPViews[i];
                if(subview.gone) {
                    continue;
                }
                var subviewWidth = subview.measureWidth();
                var subviewHeight = subview.measureHeight();

                subview.frame.width = subviewWidth;
                subview.frame.height = subviewHeight;

                // set x
                subview.frame.x = offsetX + subview.layoutParam.margin.left;
                offsetX += subviewWidth + subview.layoutParam.margin.hspace();

                // set y
                if (subview.isAlignTop()) {
                    subview.frame.y = this.layoutParam.padding.top + subview.layoutParam.margin.top;
                } else if (subview.isAlignBottom()) {
                    subview.frame.y = frameHeight - this.layoutParam.padding.bottom - subview.layoutParam.margin.bottom - subviewHeight;
                } else {
                    subview.frame.y = this.layoutParam.padding.top + (contentHeight - subviewHeight - subview.layoutParam.margin.vspace()) / 2 + subview.layoutParam.margin.top;
                }
            }

            if ((this.layoutParam.contentGravity & Gravity.LEFT) != 0) {
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    if(!view.gone)
                        view.dispatchLayout();
                }
                return;
            }

            if ((this.layoutParam.contentGravity & Gravity.RIGHT) != 0) {
                var deltaX = frameWidth - this.layoutParam.padding.right - offsetX;
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    view.frame.x += deltaX;
                }
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    if(!view.gone)
                        view.dispatchLayout();
                }
                return;
            }

            if ((this.layoutParam.contentGravity & Gravity.CENTER) != 0
                || (this.layoutParam.contentGravity & Gravity.CENTER_HORIZONTAL) != 0) {
                var deltaX = (contentWidth - offsetX + this.layoutParam.padding.left) / 2;
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    view.frame.x += deltaX;
                }
                for (var i in subUPViews) {
                    var view = subUPViews[i];
                    if(!view.gone)
                        view.dispatchLayout();
                }
                return;
            }

            for (var i in subUPViews) {
                var view = subUPViews[i];
                if(!view.gone)
                    view.dispatchLayout();
            }
        }
        ,
        isAlignLeft: function () {
            if ((this.layoutParam.gravity & Gravity.LEFT) != 0) {
                return true;
            }
            if ((this.layoutParam.gravity & Gravity.RIGHT) != 0
                || (this.layoutParam.gravity & Gravity.CENTER_HORIZONTAL) != 0
                || (this.layoutParam.gravity & Gravity.CENTER) != 0) {
                return false;
            }
            var superView = this.parentView;
            if (superView == null) {
                return true;
            }
            if ((superView.layoutParam.contentGravity & Gravity.LEFT) != 0) {
                return true;
            }
            if ((superView.layoutParam.contentGravity & Gravity.RIGHT) != 0
                || (superView.layoutParam.contentGravity & Gravity.CENTER_HORIZONTAL) != 0
                || (superView.layoutParam.contentGravity & Gravity.CENTER) != 0) {
                return false;
            }
            return true;
        },
        isAlignTop: function () {
            if ((this.layoutParam.gravity & Gravity.TOP) != 0) {
                return true;
            }
            if ((this.layoutParam.gravity & Gravity.BOTTOM) != 0
                || (this.layoutParam.gravity & Gravity.CENTER_VERTICAL) != 0
                || (this.layoutParam.gravity & Gravity.CENTER) != 0) {
                return false;
            }

            var superView = this.parentView;
            if (superView == null) {
                return true;
            }

            if ((superView.layoutParam.contentGravity & Gravity.TOP) != 0) {
                return true;
            }

            if ((superView.layoutParam.contentGravity & Gravity.BOTTOM) != 0
                || (superView.layoutParam.contentGravity & Gravity.CENTER_VERTICAL) != 0
                || (superView.layoutParam.contentGravity & Gravity.CENTER) != 0) {
                return false;
            }

            return true;
        },
        isAlignRight: function () {
            if ((this.layoutParam.gravity & Gravity.RIGHT) != 0) {
                return true;
            }
            if ((this.layoutParam.gravity & Gravity.LEFT) != 0
                || (this.layoutParam.gravity & Gravity.CENTER_HORIZONTAL) != 0
                || (this.layoutParam.gravity & Gravity.CENTER) != 0) {
                return false;
            }
            var superView = this.parentView;
            if (superView == null) {
                return false;
            }
            if ((superView.layoutParam.contentGravity & Gravity.RIGHT) != 0) {
                return true;
            }

            return false;
        },
        isAlignBottom: function () {
            if ((this.layoutParam.gravity & Gravity.BOTTOM) != 0) {
                return true;
            }
            if ((this.layoutParam.gravity & Gravity.TOP) != 0
                || (this.layoutParam.gravity & Gravity.CENTER_VERTICAL) != 0
                || (this.layoutParam.gravity & Gravity.CENTER) != 0) {
                return false;
            }
            var superView = this.parentView;
            if (superView == null) {
                return false;
            }
            if ((superView.layoutParam.contentGravity & Gravity.BOTTOM) != 0) {
                return true;
            }
            return false;
        },
        /**
         * 设置最小宽度
         * @param minWidth
         */
        setMinWidth : function(minWidth) {
            this.minWidth = minWidth != null ? View.parseSize(minWidth) : null;
            this.requestLayout();
        },
        /**
         * 设置最大宽度
         * @param maxWidth
         */
        setMaxWidth : function(maxWidth) {
            this.maxWidth = maxWidth != null ? View.parseSize(maxWidth) : null;
            this.requestLayout();
        },
        setMaxHeight : function(maxHeight) {
            this.maxHeight = maxHeight != null ? View.parseSize(maxHeight) : null;
            this.requestLayout();
        },
        /**
         * @method
         * 测量宽度
         * @returns {*}
         */
        measureWidth: function(){
            if(this.measuredWidth != null) {
                return this.measuredWidth;
            }

            var width = this._measureWidth();
            if(this.minWidth != null && width < this.minWidth) {
                width = this.minWidth;
            }
            if(this.maxWidth != null && width > this.maxWidth) {
                width = this.maxWidth;
            }
            return this.measuredWidth = width;
        }
        ,

        _measureWidth: function () {
            var superUPView = this.parentView;
            var subupViews = this.subViews;
            var superSubviews = superUPView == null ? null : superUPView.subViews;

            if(this.gone) {
                return 0;
            }

            var layout = (superUPView != null?superUPView.layoutParam.layout:LayoutConstrain.FRAME);
            if(this.layoutParam.layoutInParent != null) {
                layout = this.layoutParam.layoutInParent;
            }

            if (this.layoutParam.width == LayoutConstrain.MATCH) {
                if (superUPView == null) {
                    return this.measuredWidth = this.frame.width;
                }
                return superUPView.measureWidth() * this.layoutParam.widthWeight;
            }

            if (this.layoutParam.width == LayoutConstrain.FILL) {
                if (superUPView == null) {
                    return this.frame.width;
                }
                if (superUPView.layoutParam.layout == Layout.FRAME
                    || superUPView.layoutParam.layout == Layout.VERTICAL) {
                    return superUPView.measureContentWidth() - this.layoutParam.margin.hspace();
                }

                // it has to be horizontal
                var totalWidth = superUPView.measureContentWidth();
                var fixedWidth = 0;
                var totalWeight = 0;

                for (var i in superSubviews) {
                    var subview = superSubviews[i];
                    if (subview.gone) {
                        continue;
                    }
                    if (subview.layoutParam.width == LayoutConstrain.FILL) {
                        totalWeight += subview.layoutParam.widthWeight;
                        fixedWidth += subview.layoutParam.margin.hspace();
                    } else {
                        fixedWidth += subview.measureBoxWidth();
                    }
                }
                return (totalWidth - fixedWidth) * this.layoutParam.widthWeight / totalWeight;
            }

            if (this.layoutParam.width == LayoutConstrain.WRAP) {
                var mwidth = 0;
                if (this.layoutParam.layout == Layout.FRAME
                    || this.layoutParam.layout == Layout.VERTICAL) {
                    var widthCalculated = false;
                    for (var i in subupViews) {
                        var subview = subupViews[i];
                        if(subview.gone) {
                            continue;
                        }
                        if (subview.layoutParam.width != LayoutConstrain.FILL
                            && subview.layoutParam.width != LayoutConstrain.MATCH) {
                            var boxWidth = subview.measureBoxWidth();
                            widthCalculated = true;
                            if (boxWidth > mwidth) {
                                mwidth = boxWidth;
                            }
                        }
                    }

                    if (!widthCalculated) {
                        // TODO: log error
                    }
                    return mwidth + this.layoutParam.padding.hspace();
                }

                // it has to be horizontal
                for (var i in subupViews) {
                    var subview = subupViews[i];
                    if(subview.gone) {
                        continue;
                    }
                    if (subview.layoutParam.width != LayoutConstrain.FILL
                        && subview.layoutParam.width != LayoutConstrain.MATCH) {
                        var boxWidth = subview.measureBoxWidth();
                        mwidth += boxWidth;
                    } else {
                        // TODO: log error
                    }
                }
                return mwidth + this.layoutParam.padding.hspace();
            }

            if (this.layoutParam.width == LayoutConstrain.MATCH_HEIGHT) {
                var mheight = this.measureHeight();
                return mheight * this.layoutParam.widthWeight;
            }

            return this.layoutParam.width;
        },
        /**
         * @method
         * 测量宽度
         * @returns {*}
         */
        measureHeight: function(){
            if(this.measuredHeight != null) {
                return this.measuredHeight;
            }

            var height = this._measureHeight();
            if(this.minHeight != null && height < this.minHeight) {
                height = this.minHeight;
            }
            if(this.maxHeight != null && height > this.maxHeight) {
                height = this.maxHeight;
            }
            return this.measuredHeight = height;
        },
        /**
         * @method
         * 测量高度
         * @returns {*}
         */
        _measureHeight: function () {
            if(this.measuredHeight != null) {
                return this.measuredHeight;
            }

            var superUPView = this.parentView;
            var subupViews = this.subViews;
            var superSubviews = superUPView == null ? null : superUPView.subViews;

            if(this.gone) {
                return 0;
            }

            if (this.layoutParam.height == LayoutConstrain.MATCH) {
                if (superUPView == null) {
                    return this.measuredHeight = this.frame.height;
                }
                return this.measuredHeight = superUPView.measureHeight() * this.layoutParam.heightWeight;
            }

            if (this.layoutParam.height == LayoutConstrain.FILL) {
                if (superUPView == null) {
                    return this.frame.height;
                }
                if (superUPView.layoutParam.layout == Layout.FRAME
                    || superUPView.layoutParam.layout == Layout.HORIZONTAL) {
                    return this.measuredHeight = superUPView.measureContentHeight() - this.layoutParam.margin.vspace();
                }
                // it has to be vertical
                var totalHeight = superUPView.measureContentHeight();
                var fixedHeight = 0;
                var totalWeight = 0;
                for (var i in superSubviews) {
                    var subview = superSubviews[i];
                    if (subview.gone) {
                        continue;
                    }
                    if (subview.layoutParam.height == LayoutConstrain.FILL) {
                        totalWeight += subview.layoutParam.heightWeight;
                        fixedHeight += subview.layoutParam.margin.vspace();
                    } else {
                        fixedHeight += subview.measureBoxHeight();
                    }
                }
                return this.measuredHeight = (totalHeight - fixedHeight) * this.layoutParam.heightWeight / totalWeight;
            }

            if (this.layoutParam.height == LayoutConstrain.WRAP) {
                var mheight = 0;
                if (this.layoutParam.layout == Layout.FRAME
                    || this.layoutParam.layout == Layout.HORIZONTAL) {
                    var heightCalculated = false;
                    for (var i in subupViews) {
                        var subview = subupViews[i];
                        if (subview.layoutParam.height != LayoutConstrain.FILL
                            && subview.layoutParam.height != LayoutConstrain.MATCH) {
                            var boxHeight = subview.measureBoxHeight();
                            heightCalculated = true;
                            if (boxHeight > mheight) {
                                mheight = boxHeight;
                            }
                        }
                    }
                    if (!heightCalculated) {
                        // TODO: log error
                    }
                    return this.measuredHeight = mheight + this.layoutParam.padding.vspace();
                }

                if(this.layoutParam.layout == Layout.FLOW) {
                    var mwidth = this.measureContentWidth();
                    var measuredHeight = this.layoutParam.padding.vspace();
                    var measuredWidth = 0;
                    var lineMaxHeight = 0;
                    for (var i in subupViews) {
                        var subview = subupViews[i];
                        var boxWidth = subview.measureBoxWidth();
                        var boxHeight = subview.measureBoxHeight();
                        measuredWidth += boxWidth;
                        if(measuredWidth > mwidth || (boxWidth > mwidth && measuredWidth==0)) {
                            measuredHeight += lineMaxHeight;
                            lineMaxHeight = boxHeight;
                            measuredWidth = boxWidth;
                        }

                        if(boxHeight > lineMaxHeight) {
                            lineMaxHeight = boxHeight;
                        }
                    }
                    measuredHeight += lineMaxHeight;
                    return this.measuredHeight = measuredHeight;
                }

                // it has to be vertical
                for (var i in subupViews) {
                    var subview = subupViews[i];
                    if (subview.layoutParam.height != LayoutConstrain.FILL
                        && subview.layoutParam.height != LayoutConstrain.MATCH) {
                        var boxHeight = subview.measureBoxHeight();
                        mheight += boxHeight;
                    } else {
                        // TODO: log error
                    }
                }
                return this.measuredHeight = mheight + this.layoutParam.padding.vspace();
            }

            if (this.layoutParam.height == LayoutConstrain.MATCH_WIDTH) {
                var mwidth = this.measureWidth();
                return this.measuredHeight = mwidth * this.layoutParam.heightWeight;
            }

            return this.measuredHeight = this.layoutParam.height;
        }
        ,
        measureContentWidth: function () {
            if(this.gone) {
                return 0;
            }
            return this.measureWidth() - this.layoutParam.padding.hspace();
        },
        measureContentHeight: function () {
            if(this.gone) {
                return 0;
            }
            return this.measureHeight() - this.layoutParam.padding.vspace();
        },
        measureBoxWidth: function () {
            if(this.gone) {
                return 0;
            }
            return this.measureWidth() + this.layoutParam.margin.hspace();
        },
        measureBoxHeight: function () {
            if(this.gone) {
                return 0;
            }
            return this.measureHeight() + this.layoutParam.margin.vspace();
        },
        /**
         * @method
         * 触发UI在下一个loop布局
         */
        requestLayout: function () {
            this.resetMeasureCache();
            if (this.parentView != null) {
                this.parentView.requestLayout();
            }
        },
        resetMeasureCache : function() {
            // 已经reset过了
            if(this.measuredWidth == null && this.measuredHeight == null) {
                return;
            }
            this.measuredWidth = null;
            this.measuredHeight = null;
            for(var i = 0 ; i < this.subViews.length; i++) {
                var view = this.subViews[i];
                if(view.layoutParam.height == LayoutConstrain.FILL
                    || view.layoutParam.height == LayoutConstrain.MATCH
                    || view.layoutParam.width == LayoutConstrain.FILL
                    || view.layoutParam.width == LayoutConstrain.MATCH
                ) {
                    view.resetMeasureCache();
                }
            }
        }
        ,
        /**
         * @method
         * 触发UI在下一个loop里绘制
         */
        requestDraw: function () {
//            if (this.parentView != null) {
//                this.parentView.requestDraw();
//            }
        },
        getPage : function() {
            if(this instanceof Page) {
                return this;
            }
            if(this.parentView != null) {
                return this.parentView.getPage();
            }
            return null;
        },

        set__template__path__ : function(path) {
            var module = com.vizengine.moduleManager[path];
            if(module != null) {
                module.applyTemplateScripts(this);
            }
        }
    });
    var View = com.vizengine.view.View;


    View.dip2px = function (dipValue) {
        return Math.round(dipValue * window.devicePixelRatio);
    },
        View.px2dip = function (pxValue) {
            return Math.round(pxValue / window.devicePixelRatio);
        }

    View.parseFloat = function(value,defaultValue) {
        if(defaultValue == null) {
            defaultValue = 0;
        }
        var fvalue = parseFloat(value);
        if(isNaN(fvalue)) {
            return defaultValue;
        }
        return fvalue;
    }

    View.parseInt = function(value,defaultValue) {
        if(defaultValue == null) {
            defaultValue = 0;
        }
        var fvalue = parseInt(value);
        if(isNaN(fvalue)) {
            return defaultValue;
        }
        return fvalue;
    }

    /**
     * @static @method parseSize
     * 此处特别需要注意:
     * 对于dom中，所有style用到的px实质上是dip, 但是app中往往需要真正的
     * @param value
     * @returns {*}
     */
    View.parseSize = function(value) {
        if(value == null || value == "") {
            return 0;
        }

        if(typeof value == "number") {
            return value;
        }

        var layoutConstrain = LayoutConstrain.parse(value);
        if (layoutConstrain != LayoutConstrain.NUMBER) {
            return layoutConstrain;
        }

        if(StringUtil.endsWith(value,"px") || StringUtil.endsWith(value,"PX")) {
            return View.px2dip(View.parseFloat(value.substring(0,value.length-2)));
        }
        if(StringUtil.endsWith(value,"dp") || StringUtil.endsWith(value,"DP")) {
            return View.parseFloat(value.substring(0,value.length-2)) ;
        }
        return View.parseFloat(value) ;
    };

    View.sizeToString = function (value) {
        return LayoutConstrain.toString(value);
    };


    View.parseBoolean = function (value) {
        if(value == null) {
            return false;
        }
        if ("string" == typeof value) {
            return "true" == value;
        }
        return value;
    }

    View.deleteComment = function(str) {

        if(str == null) {
            return str;
        }

        var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;

        return str.replace(reg, function(word) {
            // 去除注释后的文本
            return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
        });
    }

    View.parseJson = function(value) {
        var deleteValue = View.deleteComment(value);
        return JSON.parse(deleteValue);
    }

    View.inject = function(view,key,value) {
        if(view == null) {
            return;
        }
        // key = decodeURIComponent(key);
        //value = decodeURIComponent(value);
        // 优先采用setter注入
        var setter = view["set"+StringUtil.firstToUpper(key)];
        if(setter != null && setter instanceof Function) {
            setter.call(view,value);
            return;
        }

        // 如果没有setter直接将值拷贝过去
        view[key] = value;
    }
    View._resolveClass = function(className) {
        if(className instanceof Function) {
            return className;
        }
        var classInFramework = eval("try{eval('com.vizengine.view."+className+"')}catch(e){}");
        if(classInFramework != null && classInFramework instanceof Function) {
            return classInFramework;
        }
        var classCustom = eval("try{eval('"+className+"')}catch(e){}");
        if(classCustom != null && classCustom instanceof Function) {
            return classCustom;
        }
        return null;
    }
    View.resolvePath = function(contextPath,relativePath) {
        if(contextPath == null) {
            return relativePath;
        }
        if(relativePath == null || relativePath == "")
        {
            return relativePath;
        }
        if(StringUtil.startsWith(relativePath,"http")) {
            return relativePath;
        }
        if(StringUtil.startsWith(relativePath,"/")) {
            return relativePath;
        }
        if(StringUtil.startsWith(relativePath,"data:")) {
            return relativePath;
        }
        if(StringUtil.endsWith(contextPath,"/")) {
            contextPath = contextPath.substring(0,contextPath.length-1);
        }
        var stub = contextPath.lastIndexOf("/");
        if(stub >= 0) {
            contextPath = contextPath.substring(0,stub+1);
        }
        return contextPath + relativePath;
    }

    var getAttribute = function(json,name) {
        var attrs = json["attributes"];
        if(attrs != null && attrs[name] != null) {
            return attrs[name];
        }
        return json[name];
    }

    var deleteAttribute = function(json,name) {
        var attrs = json["attributes"];
        if(attrs != null && attrs[name] != null) {
            delete attrs[name];
        }
        delete json[name];
    }

    View._resolveInstance = function(type,instance) {
        if (type == null) {
            type = "View";
        }

        if(type == "include") {
            return null;
        }

        var clazz = View._resolveClass(type);
        if (clazz == null) {
            throw new TypeError("can't resolve class :" + type);
        }
        if(instance instanceof clazz) {
            return instance;
        }
        var newinstance = new clazz();
        if (newinstance == null) {
            throw new TypeError("can't make instance for class :" + type);
        }
        if(instance != null) {
            for(var key in instance) {
                var value = instance[key];
                if(!(value instanceof Function)){
                    View.inject(newinstance,key,instance[key]);
                }
            }
        }
        return newinstance;
    }


    /**
     * 将json解析为View
     * 注意：第二个instance参数默认为空，如果提供了instance, 一般需要instance的类型和json根View的类型一致，否则函数任然会创建新的根View, 只拷贝instance的属性。
     * @param json
     * @param instance 默认为空，View.parse会自动创建实例。如果instance不为空，则View.parse不会创建实例，直接使用instance作为根View
     * @returns {clazz}
     */
    View.parse = function(json,instance,data,contextPath) {
        if(typeof json == "string") {
            json = View.parseJson(json);
        }

        var type = json["type"];
        if(type == null) {
            type = "View";
        }

        if(type == "include") {
            var src = getAttribute(json,"src");
            var attData = getAttribute(json,"data");
            deleteAttribute(json,"src");
            deleteAttribute(json,"data");
            if(attData != null) {
                attData = attData.replace(/\'/g,'"');
                attData = View.parseJson(attData);
                data = com.vizengine.mergeObject(data,attData);
            }
            if(com.vizengine.Module.isViewTemplate(src)) {
                var path = com.vizengine.view.View.resolvePath(contextPath,src);
                var module = com.vizengine.moduleManager[path];
                instance = module.packageObject(data);
                for(var key in json.attributes) {
                    if(key == "src" || key == "data") {
                        continue;
                    }
                    View.inject(instance,key,json.attributes[key]);
                }
            }
        } else {
            instance = View._resolveInstance(type,instance);
        }

        // 解析直接属性
        for(var field in json) {
            if(field == "type" || field == "children" || field == "__template__path__"){
                continue;
            }
            if(field == "attributes") {
                var attrs = json[field];
                for(var key in attrs) {
                    var value = attrs[key];
                    View.inject(instance,key,value);
                }
            } else {
                var value = json[field];
                View.inject(instance,field,value);
            }
        }

        // 解析子View
        for(var field in json) {
            if(field == "type" || field == "style"){
                continue;
            }
            if(field == "children") {
                var children = json[field];
                if(children instanceof Array) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var type = child["type"];
                        var subView = View._resolveInstance(type);
                        if (subView != null) {
                            instance.addView(subView);
                            View.parse(child,subView,data,contextPath);
                        } else {
                            subView = View.parse(child,null,data,contextPath);
                            instance.addView(subView);
                        }
                    }
                } else {
                    var child = children;
                    var type = child["type"];
                    var subView = View._resolveInstance(type);
                    if (subView != null) {
                        instance.addView(subView);
                        View.parse(child,subView,data,contextPath);
                    } else {
                        subView = View.parse(child,null,data,contextPath);
                        instance.addView(subView);
                    }
                }
                continue;
            }
        }


        // 运用模板脚本
        if(json["__template__path__"] != null) {
            var value = json["__template__path__"];
            View.inject(instance,"__template__path__",value);
        }

        return instance;
    }


    /**
     * @class com.vizengine.view.ImageView
     * @extends com.vizengine.view.View
     * 图片控件。支持显示本地或者网络的图片内容
     * 支持指定横向和纵向拉伸区域进行屏幕适配，
     * 支持指定图片像素(px)与设备独立像素的比例(通过在图片文件名增加后缀如@2x.png来实现)
     */
    View.extend("com.vizengine.view.ImageView", {
        init: function () {
            View.prototype.init.apply(this,arguments);
            this.crop = 0;
            this.src = null;
        },
        _createNativeView: function () {
            return createNativeObject("NativeImageView");
        },
        dispatchLayout : function() {
            this._nativeView.setPadding(this.layoutParam.padding.left,this.layoutParam.padding.top,this.layoutParam.padding.right,this.layoutParam.padding.bottom);
            View.prototype.dispatchLayout.apply(this,arguments);
        },
        setRatio : function(ratio) {
            this._nativeView.setRatio(View.parseFloat(ratio));
            this.requestLayout();
        },
        _measureWidth: function () {
            if (this.layoutParam.width == LayoutConstrain.WRAP) {
                var imageWidth = this._nativeView.getImageWidth();
                var imageHeight = this._nativeView.getImageHeight();
                if (this.layoutParam.height == LayoutConstrain.WRAP) {
                    // 如果宽度也是wrap 则返回图片实际高度
                    var targetHeight = imageHeight;
                    var targetWidth = imageWidth;
                    if(this.maxHeight && targetHeight > this.maxHeight) {
                        targetHeight = this.maxHeight;
                    }
                    if(this.maxWidth && targetWidth > this.maxWidth) {
                        targetWidth = this.maxWidth;
                    }
                    var targetRate = targetHeight / targetWidth;
                    var imageRate = imageHeight / imageWidth;
                    if(targetRate < imageRate) {
                        targetWidth = targetHeight / imageRate;
                    }
                    return targetWidth + this.layoutParam.padding.hspace();
                }
                if (imageHeight == 0 || imageWidth == 0) {
                    return 0;
                }
                var height = this.measureHeight();
                var imageRate = imageHeight / imageWidth;
                var width = height / imageRate;
                return width;
            }
            if (this.layoutParam.width == LayoutConstrain.FILL && this.crop) {
                var containerWidth = this.parentView.measureContentWidth();
                var containerHeight = this.parentView.measureContentHeight();
                var imageWidth = this._nativeView.getImageWidth();
                var imageHeight = this._nativeView.getImageHeight();
                if(containerHeight == 0 || imageHeight == 0) {
                    return 0;
                }

                var containerRate = containerWidth / containerHeight;
                var imageRate = imageWidth / imageHeight;
                if(containerRate > imageRate) {
                    if(this.crop == 1) {
                        return containerWidth;
                    } else {
                        return containerHeight * imageRate;
                    }
                } else {
                    if(this.crop == 1) {
                        return containerHeight * imageRate;
                    } else {
                        return containerWidth;
                    }
                }
            }
            return View.prototype._measureWidth.apply(this,arguments);
        },
        _measureHeight: function () {
            if (this.layoutParam.height == LayoutConstrain.WRAP) {
                var imageWidth = this._nativeView.getImageWidth();
                var imageHeight = this._nativeView.getImageHeight();
                if (this.layoutParam.width == LayoutConstrain.WRAP) {
                    // 如果宽度也是wrap 则返回图片实际高度
                    var targetHeight = imageHeight;
                    var targetWidth = imageWidth;
                    if(this.maxHeight && targetHeight > this.maxHeight) {
                        targetHeight = this.maxHeight;
                    }
                    if(this.maxWidth && targetWidth > this.maxWidth) {
                        targetWidth = this.maxWidth;
                    }
                    var targetRate = targetHeight / targetWidth;
                    var imageRate = imageHeight / imageWidth;

                    if(targetRate > imageRate) {
                        targetHeight = targetWidth * imageRate;
                    }

                    return targetHeight + this.layoutParam.padding.vspace();
                }
                if (imageHeight == 0 || imageWidth == 0) {
                    return 0;
                }
                var width = this.measureWidth();
                var imageRate = imageHeight / imageWidth;
                var height = width * imageRate;
                return height;
            }
            if (this.layoutParam.height == LayoutConstrain.FILL && this.crop) {
                var containerWidth = this.parentView.measureContentWidth();
                var containerHeight = this.parentView.measureContentHeight();
                var imageWidth = this._nativeView.getImageWidth();
                var imageHeight = this._nativeView.getImageHeight();
                if(containerHeight == 0 || imageHeight == 0) {
                    return 0;
                }

                var containerRate = containerWidth / containerHeight;
                var imageRate = imageWidth / imageHeight;
                if(containerRate > imageRate) {
                    if(this.crop == 1) {
                        return containerWidth / imageRate;
                    } else {
                        return containerHeight;
                    }
                } else {
                    if(this.crop == 1) {
                        return containerHeight;
                    } else {
                        return containerWidth / imageRate;
                    }
                }
            }
            return View.prototype._measureHeight.apply(this,arguments);
        }
        ,
        setDefaultSrc : function(defaultSrc) {
            var self = this;
            this._nativeView.setDefaultSrc(View.resolvePath(this.getContextPath(),defaultSrc),function(){
                self.requestLayout();
            });
        }
        ,
        /**
         * @method
         * 设置图片路径。可以是Bundle中的图片，需要以"/"从跟开始的路径,也可以网络中的图片，需要http开头.
         * @param src
         */
        setSrc : function(src,callback) {
            src = src ? src.replace("http:", window.location.protocol): src
            src = View.resolvePath(this.getContextPath(),src);
            if(src == this.src) {
                return;
            }
            this.src = src;
            var self = this;
            this._nativeView.setSrc(src,function(){
                self.requestLayout();
                if(callback) {
                    callback();
                }
            });
        },
        getSrc : function() {
            return this.src;
        }
        ,
        /**
         * corp为1代表保持比例外部填满(超出部分裁剪)
         * corp为2代表保持比例内部填满(不会有超出部分)
         * @param crop
         */
        setCrop : function(crop) {
            this.crop = View.parseInt(crop);
        },
        getCrop : function() {
            return this.crop;
        }
        ,
        /**
         * @method
         * 设置图片x轴方向拉伸区域的起始坐标。（需要以px结尾,表示在原始图片中的像素位置）
         * @param x
         */
        setStretchX : function(x) {
            if(!StringUtil.endsWith(x,"px")) {
                throw new TypeError("stretch should specified by px");
            }
            x = View.parseInt(x.substring(0, x.length-2));
            this._nativeView.setStretchX(x);
        },
        /**
         * @method
         * 设置图片在x轴方向拉伸区域的像素宽度。（默认值为1px,需要以px结尾,表示在原始图片中的像素位置）
         *
         * @param width
         */
        setStretchWidth : function(width) {
            if(!StringUtil.endsWith(width,"px")) {
                throw new TypeError("stretch should specified by px");
            }
            width = View.parseInt(width.substring(0, width.length-2));
            this._nativeView.setStretchWidth(width);
        },
        /**
         * @method
         * 设置图片y轴方向拉伸区域的起始坐标。（需要以px结尾,表示在原始图片中的像素位置）
         *
         * @param y
         */
        setStretchY : function(y) {
            if(!StringUtil.endsWith(y,"px")) {
                throw new TypeError("stretch should specified by px");
            }
            y = View.parseInt(y.substring(0, y.length-2));
            this._nativeView.setStretchY(y);
        },
        /**
         * @method
         * 设置图片在y轴方向拉伸区域的像素宽度。（默认值为1px,需要以px结尾,表示在原始图片中的像素位置）
         *
         * @param height
         */
        setStretchHeight : function(height){
            if(!StringUtil.endsWith(height,"px")) {
                throw new TypeError("stretch should specified by px");
            }
            height = View.parseInt(height.substring(0, height.length-2));
            this._nativeView.setStretchHeight(height);
        }
    });
    ImageView = com.vizengine.view.ImageView;

    /**
     * @class com.vizengine.view.Button
     * @extends com.vizengine.view.View
     * 按钮类, 支持指定按下和抬起的背景。
     */
    View.extend("com.vizengine.view.Button",{
        init : function() {
            View.prototype.init.apply(this,arguments);
            this.setLayout("frame");
        },
        /**
         * @method
         * 设置普通状态(背景)下的背景颜色。
         * 说明：Button的第二个子View是普通状态下显示的视图，因此，如果需要更加深度的
         * 背景设置，可以不通过此函数，直接为Button添加两个子View,最下层的两个子View第一个是背景，第二个是前景。
         * @param color
         */
        setBackgroundNormal : function(color){
            var normal = new View();
            normal.setBackground(color);
            if(this.subViews.length == 0) {
                this.addView(normal,0);
            } else {
                this.addView(normal, 1);
            }
        },
        /**
         * @method
         * 设置按下状态(前景)下的背景颜色。
         * 说明：Button的第第一个子View是普通状态下显示的视图，因此，如果需要更加深度的
         * 背景设置，可以不通过此函数，直接为Button添加两个子View,最下层的两个子View第一个是背景，第二个是前景。
         * @param color
         */
        setBackgroundPressed : function(color){
            var normal = new View();
            normal.setBackground(color);
            this.addView(normal,0);
        },
        addView : function() {
            var ret = View.prototype.addView.apply(this,arguments);
            if (this.subViews.length > 1) {
                this.subViews[1].setVisible(true);
                this.subViews[0].setVisible(false);
            }
            return ret;
        }
        ,
        dispatchTouch : function(e) {
            var ret = View.prototype.dispatchTouch.apply(this,arguments);
            if (this.isTouchInside(e) || e.state >= 2) {
                if (this.subViews.length > 1) {
                    if (e.state == 0) {
                        this.subViews[1].setVisible(false);
                        this.subViews[0].setVisible(true);
                    } else if (e.state >= 2) {
                        this.subViews[1].setVisible(true);
                        this.subViews[0].setVisible(false);
                    }
                }
            }
            return ret;
        }
    });
    var Button = com.vizengine.view.Button;

    /**
     * @class com.vizengine.view.ToggleButton
     * @extends com.vizengine.view.View
     * 开关按钮。支持第一次点击按下，第二次点击抬起的效果。
     * 还可以和com.vizengine.view.ToggleButtonGroup组合
     * 使用实现底部Tabbar的功能。
     */
    View.extend("com.vizengine.view.ToggleButton",{
        init : function() {
            View.prototype.init.apply(this,arguments);
            this.setLayout("frame");
            this.toggle = false;
            this.onToggleChangeCallback = null;
        },
        /**
         * @method
         * 设置开关切换回调函数
         * @param callback
         */
        setToggleChangeCallback : function(callback) {
            this.onToggleChangeCallback = callback;
        }
        ,
        /**
         * @method
         * 设置开关状态
         * @param state
         */
        setToggle : function(state) {
            this.toggle = View.parseBoolean(state);
            if(this.onToggleChangeCallback != null) {
                this.onToggleChangeCallback(this.toggle);
            }
            this.updateVisible();
        },
        /**
         * @method
         * 获取开关状态
         */
        getToggle : function() {
            return this.toggle;
        },
        updateVisible : function() {
            if (this.subViews.length > 1) {
                if (this.toggle) {
                    this.subViews[0].setVisible(true);
                    this.subViews[1].setVisible(false);
                } else {
                    this.subViews[0].setVisible(false);
                    this.subViews[1].setVisible(true);
                }
            }
        },
        dispatchTouch : function(e) {
            var ret = View.prototype.dispatchTouch.apply(this,arguments);
            if(!this.touchable) {
                return ret;
            }
            if(!(this.parentView instanceof ToggleButtonGroup)){
                if (this.isTouchInside(e)) {
                    if (e.state >= 2) {
                        this.setToggle(!this.toggle);
                    }
                }
            }
            return ret;
        }
    });
    var ToggleButton = com.vizengine.view.ToggleButton;

    /**
     * @class com.vizengine.view.ToggleButtonGroup
     * @extends com.vizengine.view.View
     * TaggleButtonGroup作为TaggleButton的父结点，实现了
     * 同一时刻只有一个button被按下的效果，当另一个button被按下
     * 时，当前已经按下的tagglebutton会立即抬起。这样配合使用
     * 可以实现底部Tabbar或者单选框的功能。
     */
    View.extend("com.vizengine.view.ToggleButtonGroup",{
        init : function() {
            View.prototype.init.apply(this,arguments);
            this.onToggleChangeCallback = null;
            this.toggle = -1;
        },
        dispatchLayout : function(e) {
            View.prototype.dispatchLayout.apply(this,arguments);
            if(this.toggle < 0) {
                this.setToggle(0);
            }
        },
        /**
         * @method
         * 设置分组中toggleButton切换的回调函数
         * @param callback
         */
        setOnToggleChangeCallback : function(callback) {
            this.onToggleChangeCallback = callback;
        },
        /**
         * @method
         * 设置第几个子view处于打开状态。(其他子View将自动关闭)
         * @param index
         */
        setToggle : function(index) {
            var tIndex = 0;
            for(var i = 0 ; i < this.subViews.length; i++) {
                var subView = this.subViews[i];
                if(!(subView instanceof ToggleButton)) {
                    continue;
                }
                if(tIndex == index) {
                    subView.setToggle(true);
                    this.toggle = index;
                    if(this.onToggleChangeCallback != null) {
                        this.onToggleChangeCallback(index);
                    }
                } else {
                    subView.setToggle(false);
                }
                tIndex++;
            }
        },
        getToggle : function() {
            return this.toggle;
        }
        ,
        dispatchTouch: function (e) {
            var ret = View.prototype.dispatchTouch.apply(this, arguments);
            var maxMove = 50;
            //0 down 1 move  2 up 
            var index = 0;
            for (var i = 0; e.status != 1 && i < this.subViews.length; i++) {
                var subView = this.subViews[i];
                if (!(subView instanceof ToggleButton)) {
                    continue;
                }
                if (e.state == 0) {
                    subView.preTouchX = e.getAbsX();
                    subView.preTouchY = e.getAbsY();
                }
                if (e.state == 2) {
                    var x = e.getX();
                    var y = e.getY();
                    var currentTouchX = e.getAbsX();
                    var currentTouchY = e.getAbsY();
                    var isMoved = (Math.abs(currentTouchX - subView.preTouchX) > maxMove) || (Math.abs(currentTouchY - subView.preTouchY) > maxMove);
                    if (subView.hitTest(x, y) && !isMoved) {
                        this.setToggle(index);
                    }
                }
                index++;
            }
            return ret;
        }

    });
    var ToggleButtonGroup = com.vizengine.view.ToggleButtonGroup;


    /**
     * @class com.vizengine.view.SelectView
     * @extends com.vizengine.view.View
     * 选择视图。同一时间该视图的子View只有一个处于可见状态，
     * 当通过select方法将某一个子View显示出来时，其余子View
     * 将自动隐藏。
     */
    View.extend("com.vizengine.view.SelectView",{
        /**
         * @method
         * 选择可见的子View
         * @param index
         */
        select : function(index) {
            for(var i = 0 ; i < this.subViews.length; i++) {
                var subView = this.subViews[i];
                if(i == index) {
                    subView.setVisible(true);
                    if(subView.onSelected != null) {
                        subView.onSelected();
                    }
                } else {
                    subView.setVisible(false);
                }
            }
        }
    });
    var SelectView = com.vizengine.view.SelectView;

    /**
     * @class com.vizengine.view.TextView
     * @extends com.vizengine.view.View
     * 文本控件。实现了基本的纯文本展示和html文本展示。
     *
     */
    View.extend("com.vizengine.view.TextView", {
        text : null,
        html : null,
        init: function () {
            View.prototype.init.apply(this,arguments);
            this.setFontColor("#000000");
            this.setFontSize("14dp");
            this.setFontBold(false);
            this.setLineSpace("4dp");
            this.setWordSpace("0dp");
            this.copyEnable = !com.vizengine.core.Platform.mobile;
        },
        _createNativeView: function () {
            return createNativeObject("NativeTextView");
        },
        setCopyEnable : function(enable) {
            this.copyEnable = View.parseBoolean(enable);
        }
        ,
        dispatchTouch : function() {
            var ret = View.prototype.dispatchTouch.apply(this,arguments);
            if(this.copyEnable) {
                //window.__preventDefault__ = false;
            }
            return ret;
        }
        ,
        dispatchLayout : function() {
            this._nativeView.setPadding(this.layoutParam.padding.left,this.layoutParam.padding.top,this.layoutParam.padding.right,this.layoutParam.padding.bottom);
            View.prototype.dispatchLayout.apply(this,arguments);
        },
        setContentGravity : function(gravity) {
            View.prototype.setContentGravity.apply(this,arguments);
            this._nativeView.setContentGravity(this.layoutParam.contentGravity);
            this.requestLayout();
        },
        setMaxLine : function(maxLine) {
            this.maxLine = maxLine;
            this._nativeView.setMaxLine(maxLine);
            this.requestLayout();
        },
        /**
         * @method
         * 设置文本内容
         * @param text
         */
        setText : function(text) {
            if(text == this.text) {
                return;
            }
            this.text = text;
            this._nativeView.setText(text);
            this.requestLayout();
        },
        getText : function() {
            return this.text;
        },
        /**
         * @method
         * 设置html内容
         *      由于跨平台限制，目前支持的标签包含<br/>
         *      span: 无样式标签。可通过style指定color,font-size,font-style(italic),font-weight(bold),line-height(如1.2),background(如#FF0000)<br/>
         *      br: 换行标签<br/>
         *      i: 斜体<br/>
         *      s: 删除样式<br/>
         *      u: 下划线<br/>
         * @param html
         */
        setHtml : function(html) {
            if(this.html == html) {
                return;
            }
            this._nativeView.setHtml(html);
            this.requestLayout();
        },
        _checkColor : function(color) {
            if(color == null || color.length < 7 || color[0] != '#') {
                return false;
            }
            return true;
        },
        setFontFamily : function(family) {
            this.fontFamily = family;
            this._nativeView.setFontFamily(family);
        }
        ,
        /**
         * @method
         * 设置文本颜色
         * @param color
         */
        setFontColor : function(color) {
            if(!this._checkColor(color)) {
                return;
            }
            this.fontColor = color;
            this._nativeView.setFontColor(color);
        },
        getFontColor : function() {
            return this.fontColor;
        },
        /**
         * @method
         * 设置字号大小
         * @param size
         */
        setFontSize : function(size) {
            this.fontSize = View.parseSize(size);
            this._nativeView.setFontSize(this.fontSize);
            this.requestLayout();
        },
        getFontSize : function() {
            return this.fontSize;
        }
        ,
        setWordSpace : function(space) {
            this.wordSpace = View.parseSize(space);
            this._nativeView.setWordSpace(this.wordSpace);
            this.requestLayout();
        },
        getWordSpace : function() {
            return this.wordSpace;
        }
        ,
        /**
         * @method
         * 设置行间距（单位px）
         * @param space
         */
        setLineSpace : function(space) {
            this.lineSpace = View.parseSize(space);
            this._nativeView.setLineSpace(this.lineSpace);
        },
        getLineSpace : function() {
            return this.lineSpace;
        },
        /**
         * @method
         * 设置是否粗体显示
         * @param bold
         */
        setFontBold : function(bold) {
            this.fontBold = View.parseBoolean(bold);
            this._nativeView.setFontBold(this.fontBold?1:0);
        },
        getFontBold : function() {
            return this.fontBold;
        }
        ,
        measureWidth: function () {
            if (this.layoutParam.width == LayoutConstrain.WRAP) {
                var width = this._nativeView.measureTextWidth() + this.layoutParam.padding.hspace();
                if(this.maxWidth != null && width > this.maxWidth) {
                    return this.maxWidth;
                }
                return width;
            }
            return View.prototype.measureWidth.apply(this,arguments);
        },
        measureHeight: function () {
            if (this.layoutParam.height == LayoutConstrain.WRAP) {
                // TODO: use dom element measure heightUPT
                var width = this.measureWidth();
                var height = this._nativeView.measureTextHeight(width) + this.layoutParam.padding.vspace();
                if(this.maxHeight != null && height > this.maxHeight) {
                    return this.maxHeight;
                }
                return height;
            }
            return View.prototype.measureHeight.apply(this,arguments);
        }
    });



    /**
     * @class com.vizengine.view.TextareaView
     * @extends com.vizengine.view.View
     * 文本域视图
     */
    View.extend("com.vizengine.view.TextareaView", {
        init: function () {
            View.prototype.init.apply(this,arguments);
            this.setFontSize("14dp");
            this.setFontColor("#000000");
            this.setFontBold(false);
        },
        _createNativeView: function () {
            return createNativeObject("NativeTextareaView");
        },
        dispatchTouch : function(e) {
            var ret = View.prototype.dispatchTouch.apply(this,arguments);
            if(this.isTouchInside(e)) {
                window.__preventDefault__ = false;
            }
            return ret;
        },

        setOnInputCallback : function(callback) {
            this.onInputCallback = callback;
            this._nativeView.setOnInputCallback(callback);
        },

        _checkColor : function(color) {
            if(color == null || color.length < 7 || color[0] != '#') {
                return false;
            }
            return true;
        },
        /**
         * @method
         * 设置文本内容
         * @param text
         */
        setText : function(text) {
            this.text = text;
            this._nativeView.setText(text);
            this.requestLayout();
        },
        getText : function() {
            this.text=this._nativeView.getText();
            return this.text;

        },
        /**
         * @method
         * 设置文本颜色
         * @param color
         */
        setFontColor : function(color) {
            if(!this._checkColor(color)) {
                return;
            }
            this.fontColor = color;
            this._nativeView.setFontColor(color);
        },
        getFontColor : function() {
            return this.fontColor;
        },

        // 设置最大输入文字个数
        setMaxLength: function(value) {
            this.maxLength = parseInt(value);
            this._nativeView.setMaxLength(this.maxLength);
        },
        /**
         * @method
         * 设置字号大小
         * @param size
         */
        setFontSize : function(size) {
            this.fontSize = View.parseSize(size);
            this._nativeView.setFontSize(this.fontSize);
        },
        getFontSize : function() {
            return this.fontSize;
        }
        ,
        setWordSpace : function(space) {
            this.wordSpace = View.parseSize(space);
            this._nativeView.setWordSpace(this.wordSpace);
        },
        getWordSpace : function() {
            return this.wordSpace;
        },

        setHint : function(hint) {
            this._nativeView.setHint(hint);
        },
        /**
         * @method
         * 设置提示颜色
         * @param color
         */
        setHintColor : function(color) {
            this._nativeView.setHintColor(color);
        }
        ,
        /**
         * @method
         * 设置行间距（单位px）
         * @param space
         */
        setLineSpace : function(space) {
            this.lineSpace = View.parseSize(space);
            this._nativeView.setLineSpace(this.lineSpace);
        },
        getLineSpace : function() {
            return this.lineSpace;
        },
        /**
         * @method
         * 设置是否粗体显示
         * @param bold
         */
        setFontBold : function(bold) {
            this.fontBold = View.parseBoolean(bold);
            this._nativeView.setFontBold(this.fontBold?1:0);
        },
        getFontBold : function() {
            return this.fontBold;
        }
    });
    var TextareaView = com.vizengine.view.TextareaView;



    /**
     * @class com.vizengine.view.InputView
     * @extends com.vizengine.view.View
     * 输入框控件。支持文本，数字，密码等内容输入。
     */
    View.extend("com.vizengine.view.InputView", {
        init: function () {
            View.prototype.init.apply(this,arguments);
            this.onInputCallback = null;
            this.onFocusChangeCallback = null;
            this.onConfirmCallback = null;

            var self = this;
            this._nativeView.setOnFocusChangeCallback(function(focus){
                if(focus){
                    InputView.focusedInputView = self;
                }
                if(self.onFocusChangeCallback != null) {
                    self.onFocusChangeCallback(focus);
                }
            });

            this.setFontSize("18dp");
            this.setFontColor("#000000");
            this.setContentGravity("centerVertical");
            this.setFontBold(false);
        },
        _createNativeView: function () {
            return createNativeObject("NativeInputView");
        },
        measureHeight : function() {
            if(this.layoutParam.height == LayoutConstrain.WRAP) {
                return this._nativeView.measureContentHeight();
            }
            return View.prototype.measureHeight.apply(this,arguments);
        },
        setContentGravity : function(gravity) {
            View.prototype.setContentGravity.apply(this,arguments);
            this._nativeView.setContentGravity(this.layoutParam.contentGravity);
            this.requestLayout();
        }
        ,
        dispatchTouch : function(e) {
            var ret = View.prototype.dispatchTouch.apply(this,arguments);
            if(this.isTouchInside(e) && this.touchable) {
                window.__preventDefault__ = false;
            }
            return ret;
        },
        dispatchLayout : function() {
            this._nativeView.setPadding(this.layoutParam.padding.left,this.layoutParam.padding.top,this.layoutParam.padding.right,this.layoutParam.padding.bottom);
            View.prototype.dispatchLayout.apply(this,arguments);
        },
        /**
         * @method
         * 设置输入时的回调方法，用于监听输入框输入事件。
         * @param callback
         */
        setOnInputCallback : function(callback) {
            this.onInputCallback = callback;
            this._nativeView.setOnInputCallback(callback);
        },
        setOnFocusChangeCallback : function(callback) {
            this.onFocusChangeCallback = callback;
        },
        /**
         * @method
         * 当软键盘点击完成时回调
         * @param callback
         */
        setOnConfirmCallback : function(callback) {
            this.onConfirmCallback = callback;
            this._nativeView.setOnConfirmCallback(callback);
        }
        ,
        clearFocus : function() {
            this._nativeView.setFocus(0);
        },
        setFocus : function(focus) {
            focus = View.parseBoolean(focus);
            this._nativeView.setFocus(focus?1:0);
        }
        ,
        /**
         * @method
         * 设置输入框的文本内容
         * @param text
         */
        setText : function(text) {
            this.text = text;
            this._nativeView.setText(text);
        },
        /**
         * 获取文本框内容
         */
        getText : function() {
            return '' + this._nativeView.getText();
        },
        /**
         * @method
         * 设置输入框的提示内容
         * @param hint
         */
        setHint : function(hint) {
            this._nativeView.setHint(hint);
        },
        /**
         * @method
         * 设置提示颜色
         * @param color
         */
        setHintColor : function(color) {
            this._nativeView.setHintColor(color);
        }
        ,
        /**
         * @method
         * 设置文本颜色
         * @param color
         */
        setFontColor : function(color) {
            this._nativeView.setFontColor(color);
        },
        /**
         * @method
         * 设置字号大小
         * @param size
         */
        setFontSize : function(size) {
            this._nativeView.setFontSize(View.parseSize(size));
        },
        /**
         * @method
         * 设置是否粗体显示
         * @param bold
         */
        setFontBold : function(bold) {
            this.fontBold = View.parseBoolean(bold);
            this._nativeView.setFontBold(this.fontBold?1:0);
        },
        getFontBold : function() {
            return this.fontBold;
        },
        /**
         * @method
         * 设置输入框类型
         * @param type text,password
         */
        setInputType : function(type) {
            this._nativeView.setInputType(type);
        }
    });
    var InputView = com.vizengine.view.InputView;

    InputView.focusedInputView = null;

    InputView.clearFocus = function() {
        if(InputView.focusedInputView != null) {
            InputView.focusedInputView.clearFocus();
        }
    }

    var CustomScrollViewTranslateAnimation = TranslateAnimation.extend({
        init : function(){
            TranslateAnimation.prototype.init.apply(this,arguments);
        },
        animateFrame: function (view, progress) {
            TranslateAnimation.prototype.animateFrame.apply(this,arguments);
            if (!view.verticalScroll) {
                var minScrollX = view.getMinTranslateX();
                var maxScrollX = view.getMaxTranslateX();
                if (view.translateX > maxScrollX || view.translateX < minScrollX) {
                    view.startAnimation(null);
                    var v = view.velocityTrackerX.getVelocity();
                    view.forceMove(v, 0);
                }
            } else {
                var minScrollY = view.getMinTranslateY();
                var maxScrollY = view.getMaxTranslateY();

                if (view.translateY > maxScrollY || view.translateY < minScrollY) {
                    view.startAnimation(null);
                    var v = view.velocityTrackerY.getVelocity();
                    view.forceMove(0, v);
                }
            }
        }
    });

    /**
     * @class com.vizengine.view.ScrollView
     * @extends com.vizengine.view.View
     * 滚动视图。
     * 允许水平或者垂直滚动内容。支持翻页模式。
     *
     */
    View.extend("com.vizengine.view.ScrollView",{
        init: function () {
            View.prototype.init.apply(this,arguments);
            this.verticalScroll = true;
            this.layoutParam.layout = Layout.VERTICAL;
            this.pageScrollEnable = false;
            // test Gesture Detector
            this.myGestureDetectors = new Array();
            this.maxTranslateX = 0;
            this.maxTranslateY = 0;
            this.onScrollEndCallback = null;
            var self = this;
            var panGestureDetector = new PanGestureDetector();
            panGestureDetector.callback = function (translateX, translateY, event) {
                if(!self.gestureEnable) {
                    return;
                }
                var _minThresValue = 10;
                if (event.state == 0) {
                    self.startAnimation(null,false);
                    this.initTranslateY = self.translateY;
                    this.initTranslateX = self.translateX;
                    self.interceptState = 0;
                } else {
                    if (self.interceptState == 2) {
                        return false;
                    }
                    if(!self.verticalScroll) {
                        if(self.interceptState == 0) {
                            var absX = Math.abs(translateX);
                            var absY = Math.abs(translateY);
                            var max = absX > absY ? absX : absY;
                            if(max < _minThresValue) {
                                return true;
                            }

                            if (Math.abs(translateX) > Math.abs(translateY)) {
                                self.interceptState = 1;
                            } else {
                                self.interceptState = 2;
                                return false;
                            }
                        }
                        var minScrollTranslateX = self.getMinTranslateX();
                        var maxScrollTranslateX = self.getMaxTranslateX();
                        var currentX = this.initTranslateX + translateX;
                        if(currentX > maxScrollTranslateX) {
                            var delta =  currentX - maxScrollTranslateX;
                            delta *=  0.3 + (0.2 - 0.2*delta/self.frame.width);
                            currentX = maxScrollTranslateX + delta;
                        }
                        if(currentX < minScrollTranslateX) {
                            var delta = minScrollTranslateX - currentX;
                            delta *=  0.3 + (0.2 - 0.2*delta/self.frame.width);
                            currentX = minScrollTranslateX - delta;
                        }
                        self.setTranslateX(currentX);
                    } else {
                        if(self.interceptState == 0) {

                            var absX = Math.abs(translateX);
                            var absY = Math.abs(translateY);
                            var max = absX > absY ? absX : absY;
                            if(max < _minThresValue) {
                                return true;
                            }

                            if (Math.abs(translateY) > Math.abs(translateX)) {
                                self.interceptState = 1;
                            } else {
                                self.interceptState = 2;
                                return false;
                            }
                        }
                        var minScrollTranslateY = self.getMinTranslateY();
                        var maxScrollTranslateY = self.getMaxTranslateY();
                        var currentY = this.initTranslateY + translateY;

                        if(currentY > maxScrollTranslateY) {
                            var delta =  currentY - maxScrollTranslateY;
                            delta *=  0.3 + (0.2 - 0.2*delta/self.frame.height);
                            currentY = maxScrollTranslateY + delta;
                        }

                        if(currentY < minScrollTranslateY) {
                            var delta = minScrollTranslateY - currentY;
                            delta *=  0.3 + (0.2 - 0.2*delta/self.frame.height);
                            currentY = minScrollTranslateY - delta;
                        }
                        self.setTranslateY(currentY);
                    }
                    self.requestDraw();
                }
                return true;
            };


            this.myGestureDetectors.push(panGestureDetector);

            var sweepGesture = new SweepGestureDetector();
            sweepGesture.callback = function (vx, vy,e) {
//                if (self.interceptState == 1) {
//                    self.fly(vx, vy);
//                }
                if(!self.gestureEnable) {
                    return;
                }
                if (self.interceptState == 1) {
                    self.fly(vx, vy);
                } else {
                    self.fly(0,0);
                }
            };

            this.myGestureDetectors.push(sweepGesture);

            this.gestureEnable = true;
        },
        setLayout : function(layout) {
            View.prototype.setLayout.apply(this,arguments);
            if(layout == "horizontal") {
                this.verticalScroll = false;
            } else {
                this.verticalScroll = true;
            }
        },
        setGestureEnable : function(enable) {
            this.gestureEnable = View.parseBoolean(enable);
        }
        ,
        hitTest: function (x, y) {
            return this.frame.hitTest(x, y);
        },
        dispatchTouch: function (event) {
            var touching = this.touching;
            var processed = View.prototype.dispatchTouch.apply(this,arguments);
            if (this.isTouchInside(event)) {
                for (var i in this.myGestureDetectors) {
                    if (this.myGestureDetectors[i].detect(event)) {
                        processed = true;
                    }
                }
            } else if(touching){
                event.state = 3;
                for (var i in this.myGestureDetectors) {
                    if (this.myGestureDetectors[i].detect(event)) {
                        processed = true;
                    }
                }
            }
            return processed;
        }
        ,
        isTouchInside: function (touchEvent) {
            var left = this.verticalScroll ? 0 : -this.translateX ;
            var top = this.verticalScroll ? -this.translateY : 0;
            var right = left + this.frame.width;
            var bottom = top + this.frame.height;
            for (var i in touchEvent.touchPoints) {
                var point = touchEvent.touchPoints[i];
                if (point.x > left && point.y > top && point.x < right && point.y < bottom) {
                    return true;
                }
            }
            return false;
        },
        /**
         * @method
         * 设置是否支持翻页模式
         * @param value
         */
        setPageScrollEnable: function (value) {
            this.pageScrollEnable = View.parseBoolean(value);
        }
        ,
        _pullback: function () {
            var duration = 800;
            var self = this;
            if (!this.verticalScroll) {
                var maxScrollX = this.getMaxTranslateX();
                if (this.translateX > maxScrollX) {
                    // 回弹
                    var inter = new DecelerateInterpolator();
                    inter.factor = 2;
                    var trans = new TranslateAnimation();
                    trans.timeInterplator = inter;
                    trans.fromTranslateX = this.translateX;
                    trans.toTranslateX = maxScrollX;
                    trans.duration = duration;
                    trans.callback = function() {
                        self.onScrollEnd();
                    }
                    this.startAnimation(trans);
                    return;
                }
                var minScrollX = this.getMinTranslateX();
                if (this.translateX < minScrollX) {
                    // 回弹
                    var inter = new DecelerateInterpolator();
                    inter.factor = 2;
                    var trans = new TranslateAnimation();
                    trans.timeInterplator = inter;
                    trans.fromTranslateX = this.translateX;
                    trans.toTranslateX = minScrollX;
                    trans.duration = duration;
                    trans.callback = function() {
                        self.onScrollEnd();
                    }
                    this.startAnimation(trans);
                    return;
                }
            } else {
                var maxScrollY = this.getMaxTranslateY();
                if (this.translateY > maxScrollY) {
                    // 回弹
                    var inter = new DecelerateInterpolator();
                    inter.factor = 2;
                    var trans = new TranslateAnimation();
                    trans.timeInterplator = inter;
                    trans.fromTranslateY = this.translateY;
                    trans.toTranslateY = maxScrollY;
                    trans.duration = duration;
                    trans.callback = function() {
                        self.onScrollEnd();
                    }
                    this.startAnimation(trans);
                    this.requestDraw();
                    return;
                }
                var minScrollY = this.getMinTranslateY();
                if (this.translateY < minScrollY) {
                    // 回弹
                    var inter = new DecelerateInterpolator();
                    inter.factor = 2;
                    var trans = new TranslateAnimation();
                    trans.timeInterplator = inter;
                    trans.fromTranslateY = this.translateY;
                    trans.toTranslateY = minScrollY;
                    trans.duration = duration;
                    trans.callback = function() {
                        self.onScrollEnd();
                    }
                    this.startAnimation(trans);
                    this.requestDraw();
                    return;
                }
            }
        },
        forceMove: function (vx, vy) {
            if (!this.verticalScroll) {
                var a = 0.03;
                var t = Math.abs(vx) * 0.5 / a;
                var s = 0.5 * a * t * t * (vx > 0 ? 1 : -1);

                var fromTranslateX = this.translateX;
                var toTranslateX = fromTranslateX + s;

                var self = this;
                var inter = new DecelerateInterpolator();
                var trans = new TranslateAnimation();
                trans.timeInterplator = inter;
                trans.fromTranslateX = fromTranslateX;
                trans.toTranslateX = toTranslateX;
                trans.duration = t;
                trans.callback = function () {
                    self._pullback();
                }
                this.startAnimation(trans);
            } else {
                var a = 0.03;
                var t = Math.abs(vy) * 0.5 / a;
                var s = 0.5 * a * t * t * (vy > 0 ? 1 : -1);

                var fromTranslateY = this.translateY;
                var toTranslateY = fromTranslateY + s;

                var self = this;
                var inter = new DecelerateInterpolator();
                var trans = new TranslateAnimation();
                trans.timeInterplator = inter;
                trans.fromTranslateY = fromTranslateY;
                trans.toTranslateY = toTranslateY;
                trans.duration = t;
                trans.callback = function () {
                    self._pullback();
                }
                this.startAnimation(trans);
            }

            this.requestDraw();
        },
        fly: function (vx, vy) {
            if(!this.verticalScroll) {

            }
            var self = this;
            if (!this.verticalScroll) {
                var minScrollX = this.getMinTranslateX();
                var maxScrollX = this.getMaxTranslateX();
                if (this.translateX > maxScrollX || this.translateX < minScrollX) {
                    this.forceMove(vx, vy);
                    return;
                }

                var a = 0.001;
                var t = Math.abs(vx) / a;
                var s = 0.5 * a * t * t * (vx > 0 ? 1 : -1);
                var toTranslateX = this.translateX + s;
                if (this.pageScrollEnable) {
                    if (s > 0) {
                        toTranslateX = Math.ceil((this.translateX / this.frame.width)) * this.frame.width;
                    } else if(s <0){
                        toTranslateX = Math.floor((this.translateX / this.frame.width)) * this.frame.width;
                    } else {
                        toTranslateX = (Math.round(this.translateX / this.frame.width)) * this.frame.width;
                    }
                    t = 500;
                }
                var trans = new CustomScrollViewTranslateAnimation();
                trans.timeInterplator = new DecelerateInterpolator(2);
                trans.fromTranslateX = this.translateX;
                trans.toTranslateX = toTranslateX;
                trans.duration = t;
                trans.callback = function() {
                    self.onScrollEnd();
                }
                this.startAnimation(trans);
            } else {
                var minScrollY = this.getMinTranslateY();
                var maxScrollY = this.getMaxTranslateY();
                if (this.translateY > maxScrollY || this.translateY < minScrollY) {
                    this.forceMove(vx, vy);
                    return;
                }

                var a = 0.001;
                var t = Math.abs(vy) / a;
                var s = 0.5 * a * t * t * (vy > 0 ? 1 : -1);
                var toTranslateY = this.translateY + s;
                if (this.pageScrollEnable) {
                    if (s > 0) {
                        toTranslateY = Math.ceil((this.translateY / this.frame.height)) * this.frame.height;
                    } else {
                        toTranslateY = Math.floor((this.translateY / this.frame.height)) * this.frame.height;
                    }
                    t = 500;
                }

                var trans = new CustomScrollViewTranslateAnimation();
                trans.timeInterplator = new DecelerateInterpolator(2);
                trans.fromTranslateY = this.translateY;
                trans.toTranslateY = toTranslateY;
                trans.duration = t;
                trans.callback = function() {
                    self.onScrollEnd();
                }
                this.startAnimation(trans);
            }
            this.requestDraw();

        },
        onScrollEnd : function() {
            if(this.onScrollEndCallback != null) {
                this.onScrollEndCallback();
            }
        },
        getMaxTranslateX: function() {
            return this.maxTranslateX;
        },
        getMaxTranslateY: function() {
            return this.maxTranslateY;
        }
        ,
        getMinTranslateY: function () {
            var min = 0;
            for (var i in this.subViews) {
                var subView = this.subViews[i];
                var current = -(subView.frame.getBottom()+subView.layoutParam.margin.bottom) + this.frame.height - this.layoutParam.padding.bottom;
                if (current < min) {
                    min = current;
                }
            }
            return min;
        },
        getMinTranslateX: function () {
            var min = 0;
            for (var i in this.subViews) {
                var subView = this.subViews[i];
                var current = -(subView.frame.getRight()+subView.layoutParam.margin.right) + this.frame.width - this.layoutParam.padding.right;
                if (current < min) {
                    min = current;
                }
            }
            return min;
        },
        pageScrollForward : function() {

            if(!this.verticalScroll) {
                var fromX = this.translateX;
                if(this.animation != null && this.animation.toTranslateX != null) {
                    fromX = this.animation.toTranslateX;
                }
                this.scrollToSmoothly(fromX-this.frame.width);
            } else {
                var fromY = this.translateY;
                if(this.animation != null && this.animation.toTranslateY != null) {
                    fromY = this.animation.toTranslateY;
                }
                this.scrollToSmoothly(fromY-this.frame.width);
            }
        },
        pageScrollBackward : function() {
            if(!this.verticalScroll) {
                var fromX = this.translateX;
                if(this.animation != null && this.animation.toTranslateX != null) {
                    fromX = this.animation.toTranslateX;
                }
                this.scrollToSmoothly(fromX+this.frame.width);
            } else {
                var fromY = this.translateY;
                if(this.animation != null && this.animation.toTranslateY != null) {
                    fromY = this.animation.toTranslateY;
                }
                this.scrollToSmoothly(fromY+this.frame.height);
            }
        },
        startAnimation : function() {
            //log("cxx start Animation");
            var ret = View.prototype.startAnimation.apply(this,arguments);
            return ret;
        }
        ,
        /**
         * @method
         * 平滑滚动视图
         * @param distance
         */
        scrollToSmoothly : function (toTranslate,callback) {
            var self = this;
            if(!this.verticalScroll) {

                if (this.pageScrollEnable) {
                    if (this.translateX < toTranslate) {
                        toTranslate = Math.ceil((toTranslate / this.frame.width)) * this.frame.width;
                    } else if(this.translateX > toTranslate){
                        toTranslate = Math.floor((toTranslate / this.frame.width)) * this.frame.width;
                    } else {
                        toTranslate = (Math.round(toTranslate / this.frame.width)) * this.frame.width;
                    }
                }

                var minTX = this.getMinTranslateX();
                var maxTX = this.getMaxTranslateX();
                var fromTranslate = this.translateX;
                if(fromTranslate < minTX) {
                    fromTranslate = minTX;
                }
                if(fromTranslate > maxTX) {
                    fromTranslate = maxTX;
                }
                if(toTranslate < minTX) {
                    toTranslate = minTX;
                }
                if(toTranslate > maxTX){
                    toTranslate = maxTX;
                }
                if(toTranslate == fromTranslate) {
                    log("not start anim due to not change:"+toTranslate);
                    this.startAnimation(null);
                    if(callback) {
                        callback.call(self,false);
                    }
                    return;
                }

                var trans = new CustomScrollViewTranslateAnimation();
                trans.timeInterplator = new DecelerateInterpolator(2);
                trans.fromTranslateX = fromTranslate;
                trans.toTranslateX = toTranslate;
                trans.duration = 500;

                trans.callback = function(cancel) {
                    self.onScrollEnd();
                    if(callback) {
                        callback.call(self,cancel);
                    }
                }
                log("start anim to :"+toTranslate);
                this.startAnimation(trans);
            } else {

                if (this.pageScrollEnable) {
                    if (this.translateY < toTranslate) {
                        toTranslate = Math.ceil((toTranslate / this.frame.height)) * this.frame.height;
                    } else if(this.translateX > toTranslate){
                        toTranslate = Math.floor((toTranslate / this.frame.height)) * this.frame.height;
                    } else {
                        toTranslate = (Math.round(toTranslate / this.frame.height)) * this.frame.height;
                    }
                }

                var fromTranslate = this.translateY;
                var minTY = this.getMinTranslateY();
                var maxTY = this.getMaxTranslateY();
                if(toTranslate < minTY) {
                    toTranslate = minTY;
                }
                if(toTranslate > maxTY){
                    toTranslate > maxTY;
                }
                if(fromTranslate < minTY) {
                    fromTranslate = minTY;
                }
                if(fromTranslate > maxTY) {
                    fromTranslate = maxTY;
                }
                if(toTranslate == fromTranslate) {
                    if(callback) {
                        callback.call(self,false);
                    }
                    return;
                }

                var trans = new CustomScrollViewTranslateAnimation();
                trans.timeInterplator = new DecelerateInterpolator(2);
                trans.fromTranslateY = fromTranslate;
                trans.toTranslateY = toTranslate;
                trans.duration = 500;
                trans.callback = function(cancel) {
                    self.onScrollEnd();
                    if(callback) {
                        callback.call(self,cancel);
                    }
                }
                this.startAnimation(trans,false);
            }
        }
    });

    var ScrollView = com.vizengine.view.ScrollView;


    /**
     * @class com.vizengine.view.ListViewAdaptor
     * @extends com.vizengine.core.Object
     * ListViewAdaptor是ListView数据源
     */
    Object.extend("com.vizengine.view.ListViewAdaptor",{
        /**
         * @method
         * 需要子类重写此方法提供CellView
         * @param reuseView
         * @param index
         * @returns {*}
         */
        getCellView: function (reuseView, index) {
            if(reuseView == null) {
                reuseView = new View();
                reuseView.setHeight("100dp");
            }
            return reuseView;
        },
        /**
         * @method
         * 获取cell的数量
         * @returns {number}
         */
        getCount: function () {
            return 0;
        }
    });
    var ListViewAdaptor = com.vizengine.view.ListViewAdaptor;

    /**
     * @class com.vizengine.view.ListView
     * @extends com.vizengine.view.ScrollView
     * 列表类
     */
    ScrollView.extend("com.vizengine.view.ListView",{
        init : function() {
            ScrollView.prototype.init.apply(this,arguments);
            this.adaptor = new ListViewAdaptor();
            this.layoutParam.layout = Layout.FRAME;
            this.cellInfos = [];
            this.reuseCells = [];
            this.firstVisiblePosition = -1;
            this.lastVisiblePosition = -1;

            this.minTranslateX = Math.MIN_VALUE;
            this.maxTranslateX = 0;
            this.minTranslateY = Math.MIN_VALUE;
            this.maxTranslateY = 0;
        },
        /**
         * @method
         * 设置ListView数据源
         * @param adaptor
         */
        setAdaptor : function(adaptor) {
            this.adaptor = adaptor;
        },
        setLayout: function (value) {
            // TODO: 支持横向滚动列表
            if(value == "horizontal") {
                this.verticalScroll = false;
            } else {
                this.verticalScroll = true;
            }
        },
        onScroll: function () {
            this.updateMinTranslateY();
            ScrollView.prototype.onScroll.apply(this,arguments);
            this.checkCells();
        },
        getMinTranslateY: function () {
            return this.minTranslateY;
        },
        getMinTranslateX: function() {
            return this.minTranslateX;
        },
        dispatchLayout : function() {
            ScrollView.prototype.dispatchLayout.apply(this,arguments);
            this.checkCells();
        },
        _getLastVisibleCellTop : function() {
            if(this.lastVisiblePosition < 0) {
                return 0;
            }
            return this.cellInfos[this.lastVisiblePosition].top;
        },
        _getLastVisibleCellHeight : function() {
            if(this.lastVisiblePosition < 0) {
                return 0;
            }
            return this.cellInfos[this.lastVisiblePosition].height;
        }
        ,
        _getContentBottom : function() {
            var bottom = this._getLastVisibleCellTop() + this._getLastVisibleCellHeight();
            var fheight = 0;
            if(this.verticalScroll) {
                fheight = this.frame.height;
            } else {
                fheight = this.frame.width;
            }
            if(bottom < fheight) {
                bottom = fheight;
            }
            return bottom;
        }
        ,
        updateMinTranslateY : function() {
            var count = this.adaptor.getCount();
            if(this.lastVisiblePosition == count - 1) {
                if(this.verticalScroll) {
                    this.minTranslateY = -(this._getContentBottom()+this.layoutParam.padding.bottom) + this.frame.height;
                } else {
                    this.minTranslateX = -(this._getContentBottom()+this.layoutParam.padding.right) + this.frame.width;
                }
            } else {
                if(this.verticalScroll) {
                    this.minTranslateY = Math.MIN_VALUE;
                } else {
                    this.minTranslateX = Math.MIN_VALUE;
                }
            }
        }
        ,
        checkCells : function() {
            this.packPreCells();
            this.packPostCells();
            this.addPreCells();
            this.addPostCells();
        },
        updateCellInfo: function (position) {
            var count = this.adaptor.getCount();
            for (var pos = 0 ; pos <= position && this.cellInfos.length < count ; pos++) {
                var cellView = this.adaptor.getCellView(this.reuseCells.pop(), pos);
                this.reuseCells.push(cellView);
                var cellHeight = this._measureCellHeight(cellView);
                var top = 0;
                if (pos == 0) {
                    if(this.verticalScroll) {
                        top = this.layoutParam.padding.top;
                    } else {
                        top = this.layoutParam.padding.left;
                    }
                } else {
                    var last = this.cellInfos[pos - 1];
                    top = last.top + last.height;
                }

                if(pos < this.cellInfos.length) {
                    this.cellInfos[pos].top = top;
                    this.cellInfos[pos].height = cellHeight;
                } else {
                    this.cellInfos.push({top: top, height: cellHeight});
                }
            }

        }
        ,
        ensureCellInfo: function (position) {
            var count = this.adaptor.getCount();
            while (position >= this.cellInfos.length) {
                var pos = this.cellInfos.length;
                if(pos >= count) {
                    break;
                }
                var cellView = this.adaptor.getCellView(this.reuseCells.pop(), pos);
                this.reuseCells.push(cellView);
                var cellHeight = this._measureCellHeight(cellView);
                var top = 0;
                if (pos == 0) {
                    if(this.verticalScroll) {
                        top = this.layoutParam.padding.top;
                    } else {
                        top = this.layoutParam.padding.left;
                    }
                } else {
                    var last = this.cellInfos[this.cellInfos.length - 1];
                    top = last.top + last.height;
                }

                this.cellInfos.push({top: top, height: cellHeight});
            }
        },
        getFirstVisiblePosition : function() {
            return this.firstVisiblePosition;
        }
        ,
        getLastVisiblePosition : function() {
            return this.lastVisiblePosition;
        },
        packPreCells : function() {
            if(this.firstVisiblePosition < 0) {
                return;
            }
            var currentTopCellBottom = 0;
            var top = this.getScrollTop();
            while(this.firstVisiblePosition < this.cellInfos.length) {
                currentTopCellBottom = this.cellInfos[this.firstVisiblePosition].top +this.cellInfos[this.firstVisiblePosition].height;
                if(currentTopCellBottom > top) {
                    break;
                }

                this._removeCellView(this.firstVisiblePosition);
                this.firstVisiblePosition++;
            }
        },
        packPostCells : function() {
            if(this.lastVisiblePosition < 0) {
                return;
            }
            var currentTopCellTop = 0;
            var bottom = this.getScrollBottom();
            while(this.lastVisiblePosition >= 0) {
                currentTopCellTop = this.cellInfos[this.lastVisiblePosition].top ;
                if(currentTopCellTop < bottom) {
                    break;
                }

                this._removeCellView(this.lastVisiblePosition);
                this.lastVisiblePosition--;
            }
        },
        _removeCellView : function(position) {
            var view = this.cellInfos[position].view;
            if(view == null) {
                return;
            }
            this.reuseCells.push(view);
            if(this.verticalScroll) {
                view.setTranslateY(this.cellInfos[position].height*-10);
            } else {
                view.setTranslateX(this.cellInfos[position].height*-10);
            }
            this.cellInfos[position].view = null;
        },
        addPreCells: function() {
            var count = this.adaptor.getCount();
            if(count == 0) {
                return;
            }

            var offsetY = 0;
            var currentFirstVP = this.getFirstVisiblePosition();

            if(currentFirstVP >= 0) {
                this.ensureCellInfo(currentFirstVP);
                offsetY = this.cellInfos[currentFirstVP].top;
            }

            var scrollTop = this.getScrollTop();
            while(offsetY > scrollTop) {
                // 如果offsetY 大于scrollTop，需要一直补充
                var position = currentFirstVP - 1;
                if (position < 0) {
                    break;
                }
                this.ensureCellInfo(position);
                var cellView = this.adaptor.getCellView(this.reuseCells.pop(), position);
                offsetY = this.cellInfos[position].top;
                var cellHeight = this.cellInfos[position].height;
                this._addCellView(cellView,position,offsetY,cellHeight);


                currentFirstVP--;

                // 更新visiblePosition位置
                this.firstVisiblePosition--;
            }

        }
        ,
        addPostCells: function () {
            var count = this.adaptor.getCount();
            if(count == 0) {
                return;
            }

            var offsetY = 0;

            var currentLastVP = this.getLastVisiblePosition();

            if(currentLastVP >= 0) {
                this.ensureCellInfo(currentLastVP);
                offsetY = this.cellInfos[currentLastVP].top + this.cellInfos[currentLastVP].height;
            }

            var scrollBottom = this.getScrollBottom();
            while (offsetY < scrollBottom) {
                // 如果offsetY 小于scrollBottom，需要一直补充
                var position = currentLastVP + 1;
                if (position >= this.adaptor.getCount()) {
                    break;
                }
                this.ensureCellInfo(position);
                var cellView = this.adaptor.getCellView(this.reuseCells.pop(), position);
                var cellHeight = this.cellInfos[position].height;
                offsetY = this.cellInfos[position].top;
                this._addCellView(cellView,position,offsetY,cellHeight);
                offsetY += cellHeight;

                currentLastVP++;

                // 更新visiblePosition位置
                if(this.firstVisiblePosition < 0) {
                    this.firstVisiblePosition = 0;
                }
                this.lastVisiblePosition++;
            }
        },
        _addCellView : function(cellView,position,top,height) {
            this.cellInfos[position].view = cellView;
            cellView._top_ = top;
            cellView._height_ = height;
            if(cellView.parentView == null) {
                this.addView(cellView,null,false);
                var self = this;
                cellView._requestedLayout_ = false;
                cellView._dispatchLayout_ = function() {
                    this._requestedLayout_ = false;
                    if(self.verticalScroll) {
                        this.frame.x = self.layoutParam.padding.left + this.layoutParam.margin.left;
                        this.frame.y = self.layoutParam.padding.top + this.layoutParam.margin.top;
                        this.frame.width = this.measureWidth();
                        this.frame.height = this._height_ - this.layoutParam.margin.vspace();;
                        this.dispatchLayout();
                        this.setTranslateY(this._top_+this.layoutParam.margin.top-this.frame.y);
                    } else {
                        this.frame.x = self.layoutParam.padding.left + this.layoutParam.margin.left;
                        this.frame.y = self.layoutParam.padding.top + this.layoutParam.margin.top;
                        this.frame.height = this.measureHeight();
                        this.frame.width = this._height_ - this.layoutParam.margin.hspace();
                        this.dispatchLayout();
                        this.setTranslateX(this._top_+this.layoutParam.margin.left-this.frame.x);
                    }

                }
                cellView.requestLayout = function() {
                    if(this._requestedLayout_) {
                        return;
                    }
                    this._requestedLayout_ = true;

                    setTimeout(function(){
                        cellView._dispatchLayout_();
                    },0);
                }
            }
            cellView.requestLayout();
        }
        ,
        _measureCellHeight : function(cellView) {
            var mheight = 0;
            if(cellView.parentView == null){
                cellView.parentView = this;
                if(this.verticalScroll) {
                    mheight = cellView.measureBoxHeight();
                } else {
                    mheight = cellView.measureBoxWidth();
                }
                cellView.parentView = null;
            } else {
                if(this.verticalScroll) {
                    mheight = cellView.measureBoxHeight();
                } else {
                    mheight = cellView.measureBoxWidth();
                }
            }
            return mheight;
        },
        getScrollTop: function() {
            if(this.verticalScroll) {
                return -this.translateY;
            }
            return -this.translateX;
        }
        ,
        getScrollBottom: function () {
            if(this.verticalScroll) {
                return -this.translateY + this.frame.height;
            }
            return -this.translateX + this.frame.width;
        },
        /**
         * @method
         * 通知ListView数据变化
         */
        notifyDataChanged: function () {
            var count = this.adaptor.getCount();
            if(this.lastVisiblePosition >= count) {
                this.lastVisiblePosition = count - 1;
                if(this.firstVisiblePosition >= this.lastVisiblePosition) {
                    this.firstVisiblePosition = this.lastVisiblePosition;
                }
            }
            this.updateCellInfo(this.lastVisiblePosition);
            var vset = [];
            for(var i = this.firstVisiblePosition ; i <= this.lastVisiblePosition && i >= 0;i++) {
                var view = this.adaptor.getCellView(this.cellInfos[i].view,i);
                this._addCellView(view,i,this.cellInfos[i].top,this.cellInfos[i].height);
                vset.push(view);
            }
            for(var i = this.subViews.length-1; i >= 0; i--) {
                if(vset.indexOf(this.subViews[i]) < 0) {
                    this.subViews[i].setTranslateY(-1024);
                }
            }
            this.checkCells();
            if(this.frame.width > 0 && this.frame.height > 0) {
                this.fly(0, 0);
            }
        },
        reset: function() {
            this.firstVisiblePosition = this.lastVisiblePosition = -1;
            this.clearViews();
            this.cellInfos.length = 0;
            this.checkCells();
        }
    })

    var ListView = com.vizengine.view.ListView;

    /**
     * @class com.vizengine.view.PullToRefreshView
     * @extends com.vizengine.view.View
     * 下拉刷新控件。
     */
    View.extend("com.vizengine.view.PullToRefreshView",{
        init : function(){
            View.prototype.init.apply(this,arguments);
            this.headerViewContainer = new View();
            this.addView(this.headerViewContainer);
            this.headerView = null;
            this.listView = new ListView();
            this.addView(this.listView);
            var self = this;
            this.listView.onScrollCallback = function() {
                self.headerViewContainer.setTranslateY(self.listView.translateY);
                if(self.listView.adaptor != null && self.listView.adaptor.onPull != null) {
                    if(self.listView.translateY >= 0 && self.listView.maxTranslateY == 0) {
                        self.listView.adaptor.onPull(self.listView.translateY, 1);
                    }
                }
            }
        },
        setLayout : function(layout) {
            // 目前下拉刷新只支持竖版
            View.prototype.setLayout.call(this,"frame");
        }
        ,
        dispatchTouch : function(e) {
            View.prototype.dispatchTouch.apply(this,arguments);
            if(this.listView.maxTranslateY == 0){
                if(e.state == 0) {
                    if(this.listView.adaptor != null && this.listView.adaptor.onPull != null) {
                        this.listView.adaptor.onPull(this.listView.translateY, 0);
                    }
                } else if(e.state >= 2) {
                    if(this.listView.adaptor != null && this.listView.adaptor.onPull != null) {
                        var state = this.listView.translateY > this.headerView.frame.height ? 2 : 3;
                        if(state == 2) {
                            this.listView.maxTranslateY = this.headerView.frame.height;
                        }
                        this.listView.adaptor.onPull(this.listView.translateY, state);
                    }
                }
            }
        },
        /**
         * @method
         * 设置下拉刷新头部视图
         * @param view
         */
        setHeaderView : function(view) {
            var height = view.measureBoxHeight();
            view.layoutParam.margin.top = view.layoutParam.margin.top - height;
            this.headerView = view;
            this.headerViewContainer.addView(view);
        },
        /**
         * @method
         * 获取头部视图
         * @returns {com.vizengine.view.View}
         */
        getHeaderView : function() {
            return this.headerView;
        }
        ,
        /**
         * @method
         * 设置下拉刷新数据适配器
         * @param adaptor
         */
        setAdaptor : function(adaptor) {
            this.listView.setAdaptor(adaptor);
        },
        /**
         * @method
         * 通知下拉刷新控件数据变化
         */
        notifyDataChanged : function(){
            this.listView.notifyDataChanged();
            this.listView.maxTranslateY = 0;
            if(this.listView.translateY > 0) {
                this.listView._pullback();
            }
        }
    });
    var PullToRefreshView = com.vizengine.view.PullToRefreshView;


    /**
     * @class com.vizengine.view.ScannerView
     */
    View.extend("com.vizengine.view.ScannerView",{
        init :function () {
            View.prototype.init.apply(this,arguments);
        },
        _createNativeView :function () {
            return createNativeObject("NativeScannerView");
        },
        setScannerRect :function (left,top,right,bottom) {
            this._nativeView.setScannerRect(left,top,right,bottom);
        },
        scan : function(callback) {
            this._nativeView.scan(callback);
        }
    });


    /**
     * @class com.vizengine.view.WebView
     */
    View.extend("com.vizengine.view.WebView",{
        _createNativeView: function () {
            return createNativeObject("NativeWebView");
        },
        setSrc : function(url, callback) {
            this._nativeView.setSrc(url, function () {
                if(callback) {
                    callback();
                }
            });
        },
        /**
         * 设置html片段
         * 注意：data里面应该是一个片段，而不是整个html文档，不应该包含html,head,body标签
         * @param data
         */
        setData : function(data) {
            this._nativeView.setData(data);
            this.requestLayout();
        },
        measureHeight : function() {
            if(this.layoutParam.height == LayoutConstrain.WRAP) {
                var width = this.measureWidth();
                return this._nativeView.measureContentHeight(width);
            }
            return View.prototype.measureHeight.apply(this,arguments);
        }
    });


    View.extend("com.vizengine.view.Page", {
        _backPage : null,
        init : function() {
            View.prototype.init.apply(this,arguments);
        },
        updateStatusBarLight : function() {
            var light = Page.defaultStatusBarLight;
            if(this.statusBarLight != null) {
                light = this.statusBarLight;
            }
            com.vizengine.$.setStatusBarLight(light);

            com.vizengine.$.setStatusBarHidden((this.statusBarHidden && this.statusBarHidden=="true")?1:0);
        }
        ,
        onPageWillShown : function(isForward){},
        onPageDidShown : function(isForward){},
        onPageWillHidden : function(isForward){},
        onPageDidHidden : function(isForward){},
        backward : function(paramStr) {
            var pageStack = this._getPageStack();
            if(pageStack.length < 2) {
                return;
            }
            if(this.peek().pageInstance != this) {
                return;
            }
            if(this.parentView._switching) {
                log("WARN: backward when page swithing");
                return;
            }
            this.parentView._switching = true;
            this.pop();
            var backPage = this.peekAndRestore();

            var param = com.vizengine.core.RequestUtil.getRequestParam("?"+paramStr);
            var animationProvider = Page.getPageAnimation(param.frameworkParams["animation"],false);

            this._cancelPageAnimation();
            var parentView = this.parentView;
            parentView.addView(backPage.pageInstance,0);

            backPage.pageInstance.updateStatusBarLight();
            this.onPageWillHidden(false);
            backPage.pageInstance.onPageWillShown(false);
            var self = this;
            if(animationProvider != null) {
                parentView.touchable = false;
                animationProvider(this,backPage.pageInstance,function(){
                    parentView.touchable = true;
                    parentView.removeView(self);
                    self.onPageDidHidden(false);
                    backPage.pageInstance.onPageDidShown(false);
                    if(Page.navigationListener) {
                        Page.navigationListener(backPage.pageInstance);
                    }
                    parentView._switching = false;
                })
            } else {
                parentView.removeView(this);
                this.onPageDidHidden(false);
                backPage.pageInstance.onPageDidShown(false);
                parentView._switching = false;
            }
        },
        forwardTo : function(path,callback) {
            var parentView = this.parentView;
            if(parentView._switching) {
                log("WARN: forward To \""+path+"\" when page swithing");
                return;
            }
            parentView._switching = true;
            path = View.resolvePath(this.getContextPath(),path);
            var self = this;
            this.loadPage(path,callback,function(page){
                self._forwardToPage(page);
            });
        },
        _forwardToPage : function(page) {
            var animationProvider = Page.getPageAnimation(page.pageParam.frameworkParams["animation"],true);
            this._cancelPageAnimation();
            this.push(page);
            var parentView = this.parentView;
            parentView.addView(page);
            var self = this;
            page.updateStatusBarLight();
            this.onPageWillHidden(true);
            page.onPageWillShown(true);

            if(animationProvider != null) {
                parentView.touchable = false;
                animationProvider(this,page,function(){
                    parentView.touchable = true;
                    parentView.removeView(self);
                    self.onPageDidHidden(true);
                    page.onPageDidShown(true);
                    if(Page.navigationListener) {
                        Page.navigationListener(page);
                    }
                    parentView._switching = false;
                });
            } else {
                parentView.removeView(this);
                this.onPageDidHidden(true);
                page.onPageDidShown(true);
                if(Page.navigationListener) {
                    Page.navigationListener(page);
                }
                parentView._switching = false;
                this.requestLayout();
            }
        },
        _cancelPageAnimation : function() {
            var parentView = this.parentView;
            for(var i = 0 ; i < parentView.subViews.length ; i++) {
                parentView.subViews[i].startAnimation(null);
            }
        },
        _getPageStack : function() {
            if(this.parentView.pageStack == null) {
                this.parentView.pageStack = [];
            }
            return this.parentView.pageStack;
        }
        ,
        push : function(page) {
            var pageStack = this._getPageStack();
            pageStack.push({
                pageInstance : page,
                pageParam : page.pageParam,
                pageCallback : page.pageCallback
            });
        },
        peek : function(index) {
            if(index == null) {
                index = 0;
            }
            var pageStack = this._getPageStack();
            if(pageStack.length == 0) {
                return null;
            }
            var page = pageStack[pageStack.length-1-index];
            return page;
        },
        peekAndRestore : function(index) {
            var page = this.peek(index);
            page.pageInstance.pageParam = page.pageParam;
            page.pageInstance.pageCallback = page.pageCallback;
            return page;
        },
        pop : function() {
            var pageStack = this._getPageStack();
            if(pageStack.length == 0) {
                return null;
            }
            var page = pageStack.pop();
            return page;
        },
        loadPage : function(path,pageCallback,loadCallback) {
            var param = com.vizengine.core.RequestUtil.getRequestParam(path);
            var stub = path.indexOf("?");
            if(stub >= 0) {
                path = path.substring(0,stub);
            }
            //log("CXXDT loadPage => "+path);
            module(path,function(page){
                //log("CXXDT loadPageCallback => "+path);
                var pageinstance = null;
                if(page instanceof Page) {
                    pageinstance = page;
                } else if(page instanceof Function) {
                    if(View.parseBoolean(param.frameworkParams["singleInstance"])) {
                        if (page.instance == null) {
                            page.instance = page(param);
                        }
                        pageinstance = page.instance;
                    } else {
                        pageinstance = page(param);
                    }
                }
                if(pageinstance.contextPath == null) {
                    pageinstance.contextPath = path;
                }
                pageinstance.pageParam = param;
                pageinstance.pageCallback = pageCallback;

                if(param.frameworkParams["launchMode"] == "clearTop") {
                    var pageStack = pageinstance._getPageStack();
                    for(var i = 0 ; i < pageStack.length; i++) {
                        if(pageStack[i].pageInstance.getContextPath() == pageinstance.getContextPath()) {
                            pageStack.length = i;
                            break;
                        }
                    }
                }

                loadCallback(pageinstance);
            })
        }
    })
    var Page = com.vizengine.view.Page;

    Page.loadPage = function(path,pageCallback,loadCallback) {
        var param = com.vizengine.core.RequestUtil.getRequestParam(path);
        var stub = path.indexOf("?");
        if (stub >= 0) {
            path = path.substring(0, stub);
        }
        //log("CXXDT loadPage => " + path);
        module(path, function (page) {
            //log("CXXDT loadPageCallback => " + path);
            var pageinstance = null;
            if (page instanceof Page) {
                pageinstance = page;
            } else if (page instanceof Function) {
                if (View.parseBoolean(param.frameworkParams["singleInstance"])) {
                    if (page.instance == null) {
                        page.instance = page(param);
                    }
                    pageinstance = page.instance;
                } else {
                    pageinstance = page(param);
                }
            }
            if (pageinstance.contextPath == null) {
                pageinstance.contextPath = path;
            }
            pageinstance.pageParam = param;
            pageinstance.pageCallback = pageCallback;

            loadCallback(pageinstance);
        })
    }

    Page.navigationListener = null;

    Page.defaultStatusBarLight = false;

    Page.getPageAnimation = function(name,forward) {
        var animation = Page.pageAnimaions[name];
        if(animation) {
            return animation;
        }
        if(forward) {
            return Page.pageAnimaions["pushLeft"];
        }
        return Page.pageAnimaions["popRight"];
    }

    Page.registAnimation = function(name,animationProvider) {
        Page.pageAnimaions[name] = animationProvider;
    }

    Page.pageAnimaions = {
        "null" : function(fromPage,toPage,callback) {
            callback();
        },
        "pushLeft" : function(fromPage,toPage,callback) {
            var duration = 700;

            var interceptor = new DecelerateInterpolator(2);

            fromPage.setTranslateX(0);
            toPage.setTranslateX(fromPage.frame.width);

            var fromAni = new Animation();
            fromAni.animateFrame = function(view,progress) {
                fromPage.setTranslateX(0-fromPage.frame.width*progress);
                toPage.setTranslateX(fromPage.frame.width*(1-progress));
                //fromPage.parentView.setTranslateX(-fromPage.frame.width*progress);
            };
            fromAni.duration = duration;
            fromAni.timeInterplator = interceptor;
            fromAni.callback = function(){
                callback();
                fromPage.setTranslateX(0);
                toPage.setTranslateX(0);
            };
            fromPage.startAnimation(fromAni);
        },
        "popRight" : function(fromPage,toPage,callback) {
            var duration = 700;

            var interceptor = new DecelerateInterpolator(2);

            var fromAni = new Animation();
            fromAni.animateFrame = function(view,progress) {
                fromPage.setTranslateX(fromPage.frame.width*progress);
                toPage.setTranslateX(fromPage.frame.width*(progress-1));
            };
            fromAni.duration = duration;
            fromAni.timeInterplator = interceptor;
            fromAni.callback = function() {
                callback();
                fromPage.setTranslateX(0);
                toPage.setTranslateX(0);
            };
            fromPage.setTranslateX(0);
            toPage.setTranslateX(-fromPage.frame.width);
            fromPage.startAnimation(fromAni);
        },
        "pushTop" : function(fromPage,toPage,callback) {
            var duration = 700;

            var interceptor = new DecelerateInterpolator(2);

            fromPage.setTranslateX(0);
            toPage.setTranslateX(0);
            fromPage.setTranslateY(0);
            toPage.setTranslateY(fromPage.frame.height);

            var fromAni = new Animation();
            fromAni.animateFrame = function(view,progress) {
                toPage.setTranslateY(fromPage.frame.height*(1-progress));
            };
            fromAni.duration = duration;
            fromAni.timeInterplator = interceptor;
            fromAni.callback = function(){
                callback();
                toPage.setTranslateY(0);
            };
            fromPage.startAnimation(fromAni);
        },
        "popBottom" : function(fromPage,toPage,callback) {
            var duration = 700;
            var interceptor = new DecelerateInterpolator(2);

            fromPage.setTranslateX(0);
            toPage.setTranslateX(0);
            fromPage.setTranslateY(0);
            toPage.setTranslateY(0);

            var fromAni = new Animation();
            fromAni.animateFrame = function(view,progress) {
                fromPage.setTranslateY(fromPage.frame.height*progress);
            };
            fromAni.duration = duration;
            fromAni.timeInterplator = interceptor;
            fromAni.callback = function() {
                callback();
                toPage.setTranslateX(0);
            };
            fromPage.startAnimation(fromAni);
        },
        "alpha" : function(fromPage,toPage,callback) {
            var duration = 700;

            var interceptor = new DecelerateInterpolator(2);

            var alpha = new Animation();
            alpha.animateFrame = function(view,progress) {
                fromPage.setAlpha(1-progress);
                toPage.setAlpha(progress);
            };
            alpha.duration = duration;
            alpha.timeInterplator = interceptor;
            alpha.callback = function(){
                callback();
                fromPage.setAlpha(1)
                toPage.setAlpha(1);
            };
            fromPage.startAnimation(alpha);
        },
    };

    View.extend("com.vizengine.view.MapViewInternal",{
        _createNativeView: function () {
            return createNativeObject("NativeMapView");
        }
    });


    /**
     *
     */
    View.extend("com.vizengine.view.MapView",{
        init : function() {
            View.prototype.init.apply(this,arguments);
            this.viewportChangeCallback = null;
            this.innerMapView = new com.vizengine.view.MapViewInternal();
            this.addView(this.innerMapView);

            var self = this;
            this.innerMapView._nativeView.setViewportChangeCallback(function(){
                if(self.viewportChangeCallback) {
                    self.viewportChangeCallback();
                }
            });
        },
        clearViews : function(requestLayout) {
            while(this.subViews.length > 1) {
                this.removeViewAt(1,requestLayout);
            }
        },
        start : function() {
            this.innerMapView._nativeView.start();
        },
        stop : function() {
            this.innerMapView._nativeView.stop();
        },
        addView : function(view, index, requestLayout) {
            if(view != this.innerMapView) {
                view._nativeView.setTouchable(0);
            }
            if(typeof index == 'undefined') {
                return View.prototype.addView.apply(this, arguments);
            }
            return View.prototype.addView.call(this, view, index + 1, requestLayout);
        },
        addMarker: function(marker) {
            this.innerMapView._nativeView.addMarker(marker._nativeView, marker);
        },
        removeMarker: function(marker) {
            this.innerMapView._nativeView.removeMarker(marker);
        },
        clearMarkers: function() {
            this.innerMapView._nativeView.clearMarkers();
        },
        selectMarker: function(marker) {
            this.innerMapView._nativeView.selectMarker(marker);
        },
        updateMarker: function(marker) {
            this.innerMapView._nativeView.updateMarker(marker._nativeView, marker);
        },
        getCoordinate : function(point) {
            return this.innerMapView._nativeView.getCoordinate(point);
        },
        getPoint : function(coordinate) {
            return this.innerMapView._nativeView.getPoint(coordinate);
        },
        setMapCenter : function(coordinate,animate) {
            if(animate == null) {
                animate = false;
            }
            this.innerMapView._nativeView.setMapCenter(coordinate,animate?1:0);
        },
        setZoom : function(level,animate) {
            if(animate == null) {
                animate = false;
            }
            this.innerMapView._nativeView.setZoom(level,animate?1:0);
        },
        setMapBound : function(bound,animate) {
            if(animate == null) {
                animate = false;
            }
            this.innerMapView._nativeView.setMapBound(bound,animate?1:0);
        }
        ,
        getZoom : function() {
            return this.innerMapView._nativeView.getZoom();
        },
        getMapCenter : function() {
            return this.getCoordinate({x:this.frame.width/2,y:this.frame.height/2});
        },
        disableRotateCamera : function() {
            this.innerMapView._nativeView.disableRotateCamera();
        }
    });




    window.createRootView = function(nativeRootView) {
        var rootView = new View(nativeRootView);

        rootView.checkAndHideKeyboard = function(absX,absY) {
            var fInputView = com.vizengine.view.InputView.focusedInputView;
            if(fInputView == null) {
                return;
            }
            var frame = fInputView.getFrameInRootView();
            if(absX < frame.x || absX > (frame.x+frame.width) || absY < frame.y || absY > (frame.y+frame.height)) {
                com.vizengine.view.InputView.clearFocus();
            }
        }
        rootView.latestEvent = null;
        rootView.nativeTouch = function(state,points) {
            var TouchEvent = com.vizengine.gesture.TouchEvent;
            var lightappevent = null;
            switch (state) {
                case 0:
                    lightappevent = latestEvent = new TouchEvent();
                    lightappevent.state = 0;
                    for (var i = 0; i < points.length/2; i++) {
                        var vp = new TouchPoint();
                        vp.absX = vp.x = points[i*2];
                        vp.absY = vp.y = points[i*2+1];
                        lightappevent.touchPoints[i] = vp;
                    }
                    return rootView.dispatchTouch(lightappevent);
                case 2:
                    lightappevent = new TouchEvent();
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
                    rootView.checkAndHideKeyboard(lightappevent.getAbsX(),lightappevent.getAbsY());
                    return ret;
                case 1:
                    lightappevent = latestEvent = new TouchEvent();
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

        rootView.onKeyboardChange = function(keyboardHeight) {
            var inputView = InputView.focusedInputView;
            if(inputView != null) {
                if(keyboardHeight > 0){
                    var rootFrame = this.frame;
                    var frame = inputView.getFrameInRootView();
                    var currentBottom = frame.getBottom();
                    var targetBottom = rootFrame.getBottom() - keyboardHeight - 20;
                    if(currentBottom > targetBottom) {
                        var animation = new com.vizengine.animation.TranslateAnimation();
                        animation.fromTranslateY = 0;
                        animation.toTranslateY = targetBottom-currentBottom;
                        animation.duration = 300;
                        animation.timeInterplator = new com.vizengine.animation.DecelerateInterpolator(2);
                        animation.callback = function() {
                            window.rootView.subViews[0].requestLayout();
                        }
                        this.subViews[0].startAnimation(animation);
                    }
                } else {
                    var animation = new com.vizengine.animation.TranslateAnimation();
                    animation.fromTranslateY = this.subViews[0].translateY;
                    animation.toTranslateY = 0;
                    animation.duration = 300;
                    animation.timeInterplator = new com.vizengine.animation.DecelerateInterpolator(2);
                    animation.callback = function() {
                        rootView.subViews[0].requestLayout();
                    }
                    this.subViews[0].startAnimation(animation);
                }
            }
        }


        rootView.initRootView = function(view) {
            if(view instanceof Function) {
                view = view();
            }
            view.setClipToBounds(true);
            rootView.clearViews();
            rootView.addView(view);
            rootView.resize();
            if(view instanceof Page) {
                view.push(view);
                view.updateStatusBarLight();
                view.onPageWillShown(true);
                view.onPageDidShown(true);
                if(Page.navigationListener) {
                    Page.navigationListener(view);
                }
            }
        }

        rootView.isLayouting = false;
        rootView.isLayoutDirty = true;
        rootView.resize = function() {
            this.isLayoutDirty = false;
            this.isLayouting = true;

            var targetWidth = window.nativeRootView.getViewportWidth();
            var targetHeight = window.nativeRootView.getViewportHeight();

            if(targetWidth>0 && targetHeight>0) {
                this.frame.width = targetWidth;
                this.frame.height = targetHeight;
                this.dispatchLayout();
                this.requestDraw();
                this.setVisible(true);
            }


            this.isLayouting = false;
            if(this.isLayoutDirty) {
                this.resize();
            }
        }

        rootView.interceptMethod("requestLayout",function() {
            var ret = this._origin.apply(this,arguments);
            if(this.isLayouting) {
                this.isLayoutDirty = true;
            } else {
                this.isLayouting = true;
                setTimeout(function(){
                    rootView.resize();
                },0);
            }
            return ret;
        });

        return rootView;
    }
})
