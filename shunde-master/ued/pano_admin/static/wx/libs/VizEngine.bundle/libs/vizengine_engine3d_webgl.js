module("/libs/vizengine_engine3d.js",function(){
    var Render = com.vizengine.engine3d.Render;


    /**
     * @class com.vizengine.engine3d.RenderWebGL
     * 基于WebGL实现的3维渲染引擎
     */
    Render.extend("com.vizengine.engine3d.RenderWebGL",{
        init : function(view) {
            Render.prototype.init.apply(this,arguments);
            this.canvas = document.createElement("canvas");
            this.canvas.id="webglcanvas"+this.id;
            this.canvas.style.width = "100%";
            this.canvas.style.height = "100%";
            this.contextArray = []; //用来保存每个3d对象的数组
            this.view = view;
            this.renderCount = 0;
            view._nativeView.div.appendChild(this.canvas);

            this.initGL(this.canvas);
            this.initShaders();
            var self = this;
            view.interceptMethod("dispatchLayout",function(){
               var ret = this._origin.apply(this,arguments);
               self.canvas.width = this.frame.width * window.devicePixelRatio;
               self.canvas.height = this.frame.height * window.devicePixelRatio;
               self.gl.viewportWidth = self.canvas.width;
               self.gl.viewportHeight = self.canvas.height;
               return ret;
            });
        },
        _renderObject3D : function(object,matrix) {
            this._checkAndSendVertices(object);
            this._checkAndSendTexture(object);

            var gl = this.gl;


            gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, new Float32Array(matrix.elements));

            this._renderObject3DNode(object);

            for(var i = 0 ; i < object.children.length; i++) {
                var child = object.children[i];

                var copy = matrix.clone();
                copy.multiply(child.matrix);

                this._renderObject3D(child,copy);
            }
        },
        _renderObject3DNode : function(object) {
            var webglContext = this._getOrCreateWebGLContext(object);
            if(webglContext.texture == null) {
                return;
            }
            var gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, webglContext.vertexPositionBuffer);
            gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, webglContext.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, webglContext.vertexTextureCoordBuffer);
            gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, webglContext.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, webglContext.texture);
            gl.uniform1i(this.shaderProgram.samplerUniform, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webglContext.vertexIndexBuffer);

            gl.drawElements(gl.TRIANGLES, webglContext.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        },
        _getOrCreateWebGLContext : function(object) {
            if(object.webglContext == null) {
                object.webglContext = {};
            }
            if(object.webglContext[this.id] == null) {
                var context = {};
                object.webglContext[this.id] = context;
                this.contextArray.push(context);
            }
            object.webglContext[this.id].renderCount = this.renderCount;
            return object.webglContext[this.id];
        }
        ,
        _checkAndSendTexture : function(object) {
            var webglContext = this._getOrCreateWebGLContext(object);

            if(webglContext.texture != null) {
                // already sended
                return;
            }
            if(object.texture.image == null) {
                // no image
                return;
            }

            var gl = this.gl;

            var texture = gl.createTexture();
            webglContext.texture = texture;
            texture.image = object.texture.image;

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
        },

        _checkAndSendVertices : function(object) {
            var webglContext = this._getOrCreateWebGLContext(object);
            if(webglContext.vertexPositionBuffer != null) {
                // aready inited
                return;
            }

            if(object.geometryBuffer.vertices.isEmpty()) {
                // not need send data to gpu
                return;
            }

            // send data to gpu
            var webglContext = this._getOrCreateWebGLContext(object);

            var gl = this.gl;
            var vertexPositionBuffer = gl.createBuffer();
            webglContext.vertexPositionBuffer = vertexPositionBuffer;
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
            var vertices = object.geometryBuffer.vertices.dataArray;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            vertexPositionBuffer.itemSize = object.geometryBuffer.vertices.dataUnit;
            vertexPositionBuffer.numItems = vertices.length / object.geometryBuffer.vertices.dataUnit;

            var vertexTextureCoordBuffer = gl.createBuffer();
            webglContext.vertexTextureCoordBuffer = vertexTextureCoordBuffer;
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
            var textureCoords = object.geometryBuffer.uvs.dataArray;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
            vertexTextureCoordBuffer.itemSize = object.geometryBuffer.uvs.dataUnit;
            vertexTextureCoordBuffer.numItems = textureCoords.length / object.geometryBuffer.uvs.dataUnit;

            var vertexIndexBuffer = gl.createBuffer();
            webglContext.vertexIndexBuffer = vertexIndexBuffer;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
            var vertexIndices = object.geometryBuffer.indices.dataArray;
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
            vertexIndexBuffer.itemSize = object.geometryBuffer.indices.dataUnit;
            vertexIndexBuffer.numItems = vertexIndices.length / object.geometryBuffer.indices.dataUnit;
        }
        ,
        render : function(world,camera) {
            var shaderProgram = this.shaderProgram;

            var gl = this.gl;
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);

            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, new Float32Array(camera.projectionMatrix.elements));

            var matrix = new com.vizengine.math.Matrix4();
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
            if(context.texture != null){
                this.gl.deleteTexture(context.texture);
                context.texture = null;
            }
            if(context.vertexPositionBuffer != null) {
                this.gl.deleteBuffer(context.vertexPositionBuffer);
                context.vertexPositionBuffer = null;
            }
            if(context.vertexTextureCoordBuffer != null) {
                this.gl.deleteBuffer(context.vertexTextureCoordBuffer);
                context.vertexTextureCoordBuffer = null;
            }
            if(context.vertexIndexBuffer != null) {
                this.gl.deleteBuffer(context.vertexIndexBuffer);
                context.vertexIndexBuffer = null;
            }
        }
        ,
        initGL : function(canvas) {
            try {
                this.gl = canvas.getContext("experimental-webgl");
                this.gl.viewportWidth = canvas.width;
                this.gl.viewportHeight = canvas.height;
            } catch (e) {
            }
            if (!this.gl) {
                alert("Could not initialise WebGL, sorry :-(");
            }
        },
        initShaders : function () {
            var gl = this.gl;
            var fragmentShader = this.getShader(gl, gl.FRAGMENT_SHADER);
            var vertexShader = this.getShader(gl, gl.VERTEX_SHADER);

            var shaderProgram = gl.createProgram();
            this.shaderProgram = shaderProgram;
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                alert("Could not initialise shaders");
            }

            gl.useProgram(shaderProgram);

            shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
            gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

            shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
            shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        },
        getShader : function(gl,shaderType) {
            var str = null;
            var shader = null;

            if(shaderType == gl.FRAGMENT_SHADER) {
                str = [
                    "precision mediump float;",
                    "varying vec2 vTextureCoord;",
                    "uniform sampler2D uSampler;",
                    "void main(void) {",
                    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));",
                    "}"
                ].join("\n");

                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if(shaderType == gl.VERTEX_SHADER) {
                str = [
                    "attribute vec3 aVertexPosition;",
                    "attribute vec2 aTextureCoord;",
                    "uniform mat4 uMVMatrix;",
                    "uniform mat4 uPMatrix;",
                    "varying vec2 vTextureCoord;",
                    "void main(void) {",
                    "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
                    "vTextureCoord = aTextureCoord;",
                    "}"
                ].join("\n");
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                return null;
            }

            gl.shaderSource(shader, str);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        }
    })
})