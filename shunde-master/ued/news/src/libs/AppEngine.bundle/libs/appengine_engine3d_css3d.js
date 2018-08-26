module("/libs/appengine_engine3d.js",function(){
    var Render = com.appengine.engine3d.Render;
    var Plane = com.appengine.engine3d.Plane;
    var Matrix4 = com.appengine.math.Matrix4;


    var epsilon = function ( value ) {
        return value.toFixed(6);
    };

    var getMatrixString = function ( matrix ) {
        var elements = matrix.elements;
        return 'matrix3d(' +
            epsilon( elements[ 0 ] ) + ',' +
            epsilon( elements[ 1 ] ) + ',' +
            epsilon( elements[ 2 ] ) + ',' +
            epsilon( elements[ 3 ] ) + ',' +
            epsilon( elements[ 4 ] ) + ',' +
            epsilon( elements[ 5 ] ) + ',' +
            epsilon( elements[ 6 ] ) + ',' +
            epsilon( elements[ 7 ] ) + ',' +
            epsilon( elements[ 8 ] ) + ',' +
            epsilon( elements[ 9 ] ) + ',' +
            epsilon( elements[ 10 ] ) + ',' +
            epsilon( elements[ 11 ] ) + ',' +
            epsilon( elements[ 12 ] ) + ',' +
            epsilon( elements[ 13 ] ) + ',' +
            epsilon( elements[ 14 ] ) + ',' +
            epsilon( elements[ 15 ] ) +
            ')';
    };
    /**
     * @class com.appengine.engine3d.RenderCSS3D
     * 基于CSS3D实现的3维渲染引擎
     */
    Render.extend("com.appengine.engine3d.RenderCSS3D",{
        init : function(view) {
            Render.prototype.init.apply(this,arguments);
            this.view = view;
            this.renderCount = 0;
            this.contextArray = []; //用来保存每个3d对象的数组
        },
        render : function(world,camera) {
            if(this.view.frame.width == 0 || this.view.frame.height == 0) {
                return;
            }
            this.world = world;
            this.camera = camera;
            var matrix = new com.appengine.math.Matrix4();
           // matrix.scale(1/this.view.frame.width,1/this.view.frame.height,1);
           // matrix.multiply(camera.projectionMatrix);
            // 坐标系移动至屏幕中心
            matrix.translate(this.view.frame.width/2,this.view.frame.height/2,0);
            matrix.scale(1,-1,1)
            var scaleHeight =  this.view.frame.height / 2;
            var scaleWidth = this.view.frame.width / 2;

            matrix.scale(scaleWidth,scaleHeight,1);

            matrix.multiply(camera.projectionMatrix);

            var cameraInverse = camera.getWorldMatrix().getInverse();
            matrix.multiply(cameraInverse);

            this._renderObject3D(world,matrix);

            this.releaseResource();
            this.renderCount++;
        },
        releaseResource : function() {
            for(var i = this.contextArray.length - 1 ; i >= 0; i--) {
                var context = this.contextArray[i];
                if(context.renderCount != this.renderCount) {
                    this.releaseContext(context);
                    this.contextArray.splice(i,1);
                }
            }
        },
        releaseContext : function(context) {
            if(context.div != null) {
                this.view._nativeView.div.removeChild(context.div);
                context.div = null;
            }
        }
        ,
        _renderObject3D : function(object,matrix) {
            if(object instanceof Plane) {
                this._renderPlane(object,matrix);
            }
            for(var i = 0 ; i < object.children.length; i++) {
                var child = object.children[i];

                var copy = matrix.clone();
                copy.multiply(child.matrix);

                this._renderObject3D(child,copy);
            }
        },
        _renderPlane : function(object,matrix) {
            if(object.width == null || object.height == null || object.texture.image == null) {
                return;
            }
            var context = this._getOrCreateContext(object);
            if(context.div == null) {
                context.div = object.texture.image.cloneNode();
                context.div.style.position = "absolute";
                context.div.style.transformOrigin = "0px 0px 0px";
                this.view._nativeView.div.appendChild(context.div);
            }

            context.div.style.width = object.texture.image.width + "px";
            context.div.style.height = object.texture.image.height +"px";


            var scale = object.width / object.texture.image.width;
            matrix.scale(scale,-scale,1);
            matrix.translate(-object.texture.image.width/2,-object.texture.image.height/2,0);

            var style = getMatrixString(matrix);
            context.div.style.webkitTransform = style;
            context.div.style.WebkitTransform = style;
            context.div.style.MozTransform = style;
            context.div.style.oTransform = style;
            context.div.style.transform = style;
        }
        ,
        _getOrCreateContext : function(object) {
            if(object.css3DContext == null) {
                object.css3DContext = {};
            }
            if(object.css3DContext[this.id] == null) {
                var context = {};
                object.css3DContext[this.id] = context;
                this.contextArray.push(context);
            }
            object.css3DContext[this.id].renderCount = this.renderCount;
            return object.css3DContext[this.id];
        }
    })
})