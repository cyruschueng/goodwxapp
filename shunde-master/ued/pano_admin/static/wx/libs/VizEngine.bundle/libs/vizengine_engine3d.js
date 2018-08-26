module("/libs/vizengine_core.js","/libs/vizengine_math.js",function(){
    var Object = com.vizengine.core.Object;
    var Matrix4 = com.vizengine.math.Matrix4;

    /**
     * @class com.vizengine.engine3d.DataBuffer
     *
     */
    Object.extend("com.vizengine.engine3d.DataBuffer",{
        init : function(numUnit) {
            this.dataArray = [];
            this.dataUnit = numUnit;
        },
        isEmpty : function() {
            return this.dataArray.length == 0;
        }
    })
    var DataBuffer = com.vizengine.engine3d.DataBuffer;

    /**
     * @class com.vizengine.engine3d.Object3D
     */
    Object.extend("com.vizengine.engine3d.Object3D",{
        init : function() {
            Object.prototype.init.apply(this,arguments);
            this.matrix = new Matrix4();
            this.geometryBuffer = {
                indices: new DataBuffer(1),
                vertices: new DataBuffer(3),
                normals: new DataBuffer(3),
                uvs: new DataBuffer(2),
                colors: new DataBuffer(3)
            };
            this.texture = {
                image : null
            }
            this.children = [];
        },
        add : function(obj) {
            obj.parent = this;
            this.children.push(obj);
        },
        remove : function(obj) {
            for(var i = 0 ; i < this.children.length; i++) {
                if(obj == this.children[i]) {
                    this.children.splice(i,1);
                    return obj;
                }
            }
        },
        removeAt : function(index) {
            this.children.splice(index,1);
        }
        ,
        /**
         * 获取当前对象相对于世界坐标系的变换矩阵
         * @returns {com.vizengine.math.Matrix4}
         */
        getWorldMatrix : function() {
            var matrix = new Matrix4();
            var obj = this;
            while(obj != null) {
                matrix.multiply(obj.matrix,matrix);
                obj = obj.parent;
            }
            return matrix;
        }
    });
    var Object3D = com.vizengine.engine3d.Object3D;

    /**
     * @class com.vizengine.engine3d.Camera
     */
    Object3D.extend("com.vizengine.engine3d.Camera",{
        init : function() {
            Object3D.prototype.init.apply(this,arguments);
            this.projectionMatrix = new Matrix4();
        }
    });
    var Camera = com.vizengine.engine3d.Camera;

    /**
     * @class com.vizengine.engine3d.Plane
     */
    Object3D.extend("com.vizengine.engine3d.Plane",{
        init : function() {
            Object3D.prototype.init.apply(this,arguments);
        },
        setSize : function(width,height) {
            this.width = width;
            this.height = height;
            var halfWidth = width / 2;
            var halfHeight = height / 2;
            this.geometryBuffer.vertices.dataArray = [
                -1*halfWidth,-1*halfHeight,0,
                halfWidth,-1*halfHeight,0,
                halfWidth,halfHeight,0,
                -1*halfWidth,halfHeight,0
            ];
            this.geometryBuffer.vertices.dataUnit = 3;

             this.geometryBuffer.uvs.dataArray = [
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0
             ]
             this.geometryBuffer.uvs.dataUnit = 2;

            this.geometryBuffer.indices.dataArray = [
                0,1,2,
                0,2,3
            ]
            this.geometryBuffer.indices.dataUnit = 1;
        }
    })

    /**
     * @class com.vizengine.engine3d.Render
     * 渲染器的基类
     */
    Object.extend("com.vizengine.engine3d.Render",{
        init : function() {
            Object.prototype.init.apply(this,arguments);
            if(Render.instanceCount == null) {
                Render.instanceCount = 1;
            } else {
                Render.instanceCount++;
            }
            this.id = "render_"+Render.instanceCount;
        },
        render : function(world,camera){}
    });
    var Render = com.vizengine.engine3d.Render;

    return {};
})