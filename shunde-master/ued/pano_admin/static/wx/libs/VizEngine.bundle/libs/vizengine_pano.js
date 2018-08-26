module("/libs/vizengine_location.js",
    "/libs/vizengine_engine3d.js",
    "/libs/vizengine_engine3d_webgl.js",
    "/libs/vizengine_engine3d_css3d.js",
    function() {
        var Object = com.vizengine.core.Object;
        var View = com.vizengine.view.View;
        var PanGestureDetector = com.vizengine.gesture.PanGestureDetector;
        var SweepGestureDetector = com.vizengine.gesture.SweepGestureDetector;
        var PinchGestureDetector = com.vizengine.gesture.PinchGestureDetector;
        var Animation = com.vizengine.animation.Animation;
        var DecelerateInterpolator = com.vizengine.animation.DecelerateInterpolator;
        // 目前全景引擎依赖了web的three.js库
        // 暂时只支持web版本，不支持移动端原生环境。
    if(com.vizengine.core.Platform.vizengineMobile) {
        // 构造一个假的PanoView，避免解析XML出错
        View.extend("com.vizengine.view.PanoView", {
            setMarkerDragEnable: function (value) {},
            isMarkerDragEnabled: function () {},
            setMarkerDragCallback: function(callback) {},
            setHDEnable: function (value) {},
            setOnScaleCallback: function (callback) {},
            setOnFovChangeCallback :function (callback) {},
            isHDEnabled: function () {},
            setFov: function (fov) {},
            getFov: function () {},
            setZoom: function (zoom) {},
            getZoom: function () {},
            _snapshot: function () {},
            getSnapshotDiv: function () {},
            isVREnabled: function () {},
            setVREnable: function (enableVR) {},
            setPanoId: function (panoId, callback, animation) {},
            getPanoId: function () {},
            setAutoplayLoopTime: function (time) {},
            setAutoplayEnable: function (enable) {},
            isAutoplayEnabled: function () {},
            autoPlay: function () {},
            stopAutoPlay: function () {},
            setGravityEnable: function (enable) {},
            isGravityEnabled: function () {},
            isTrackingDevice: function () {},
            trackingDevice: function () {},
            stopTrackingDevice: function () {},
            setHeading: function (heading) {},
            setPitch: function (pitch) {},
            setRoll: function (roll) {},
            getHeading: function () {},
            getPitch: function () {},
            getRoll: function () {}
        });
        return;
    }



    /**
     * @class com.vizengine.animation.PanoAnimation
     * @extends com.vizengine.animation.Animation
     *
     * 全景pano旋转/缩放动画, 通常旋转heading, pitch, fov用作缩放效果
     *
     */
    Animation.extend("com.vizengine.animation.PanoAnimation", {
        init: function () {
            Animation.prototype.init.apply(this,arguments);
            /** 起始heading */
            this.fromHeading = 0;
            /** 位移pitch */
            this.fromPitch = 0;
            /** 位移roll */
            this.fromRoll = 0;
            /** 起始fov */
            this.fromFov = 0;
            /** 结束heading */
            this.toHeading = 0;
            /** 结束pitch */
            this.toPitch = 0;
            /** 结束roll */
            this.toRoll = 0;
            /** 开关enableHeading */
            this.enableHeading = false;
            /** 开关enablePitch */
            this.enablePitch = false;
            /** 开关enableRoll */
            this.enableRoll = false;
            /** 开关enableFov */
            this.enableFov = false;
        },
        animateFrame: function (view, progress) {
            if (this.enableHeading) {
                var heading = this.fromHeading + (this.toHeading - this.fromHeading) * progress;
                view.panoViewInternal.setHeading(heading);
            }
            if (this.enablePitch) {
                var pitch = this.fromPitch + (this.toPitch - this.fromPitch) * progress;
                view.panoViewInternal.setPitch(pitch);
            }
            if (this.enableRoll) {
                var roll = this.fromRoll + (this.toRoll - this.fromRoll) * progress;
                view.panoViewInternal.setRoll(roll);
            }
            if (this.enableFov) {
                var fov = this.fromFov + (this.toFov - this.fromFov) * progress;
                view.panoViewInternal._setFov(fov);
            }
        }
    });

    var  PanoAnimation = com.vizengine.animation.PanoAnimation;

    /**
     * @class com.vizengine.animation.PanoFlyAnimation
     * @extends com.vizengine.animation.Animation
     *
     * 全景pano旋转动画, 通常旋转heading, pitch
     *
     */
    Animation.extend("com.vizengine.animation.PanoFlyAnimation", {
        init: function () {
            Animation.prototype.init.apply(this,arguments);
            /** 起始heading */
            this.fromHeading = 0;
            /** 位移pitch */
            this.fromPitch = 0;
            /** 位移roll */
            this.fromRoll = 0;
            /** 结束heading */
            this.toHeading = 0;
            /** 结束pitch */
            this.toPitch = 0;
            /** 结束roll */
            this.toRoll = 0;
            /** 开关enableHeading */
            this.enableHeading = true;
            /** enablePitch */
            this.enablePitch = true;
            /** enableRoll */
            this.enableRoll = false;
        },
        animateFrame: function (view, progress) {

            if (this.enableHeading) {
                var heading = this.fromHeading + (this.toHeading - this.fromHeading) * progress;
                view._setHeading(heading);
            }
            if (this.enablePitch) {
                var pitch = this.fromPitch + (this.toPitch - this.fromPitch) * progress;
                view._setPitch(pitch);
            }
            if (this.enableRoll) {
                var roll = this.fromRoll + (this.toRoll - this.fromRoll) * progress;
                view._setRoll(roll);
            }
        }
    });
    var PanoFlyAnimation = com.vizengine.animation.PanoFlyAnimation;

    /**
     * @class com.vizengine.animation.PanoScaleAnimation
     * @extends com.vizengine.animation.Animation
     *
     * 全景pano缩放动画, 通过camera fov控制缩放大小
     *
     */
    Animation.extend("com.vizengine.animation.PanoScaleAnimation", {
        init: function () {
            Animation.prototype.init.apply(this,arguments);
            /** 起始fov */
            this.fromFov = 0;
            /** 结束fov */
            this.toFov = 0;
        },
        animateFrame: function (view, progress) {
            var fov = this.fromFov + (this.toFov - this.fromFov) * progress;
            view._scaleCamera(fov);
        }
    });
    var PanoScaleAnimation = com.vizengine.animation.PanoScaleAnimation;


        var LoadingQueue = function(){
            this.taskQueue = [];
            this.addTask = function(task) {
                this.taskQueue.push(task);
                this.processTask();
            };
            this.runningTaskCount = 0;
            this.maxTaskCount = 2;
            this.processTask = function() {
                if(this.taskQueue.length == 0) {
                    return;
                }
                if(this.runningTaskCount >= this.maxTaskCount) {
                    return;
                }
                var self = this;
                this.runningTaskCount++;
                var task = this.taskQueue.shift();
                task(function(){
                    self.runningTaskCount--;
                    self.processTask();
                });
            }
        };

        var loadingQueue = new LoadingQueue();

    var _loadImage = function (path, success, failed) {
        loadingQueue.addTask(function(callback) {
            var image = new Image();
            image.crossOrigin = "*";
            image.onload = function () {
                success(image);
                callback();
                image = null;
            };
            image.onerror = function () {
                if (failed != null) {
                    failed(null);
                }
                callback();
                image = null;
            };
            var proxy = window.__pano__proxy || window.__vizengine__proxy || "";
            path = proxy + path;
            image.src = path;
        });
    };

    var _markImage = function (image, text) {
        var element = document.createElement("canvas");
        var canvas = element.getContext("2d");
        element.width = image.width;
        element.height = image.height;

        canvas.drawImage(image, 0, 0);

        canvas.fillStyle = "#FF0000";
        canvas.lineWidth = 5;
        // 绘制直线
        canvas.beginPath();
        // 起点
        canvas.moveTo(0, 0);
        // 终点
        canvas.lineTo(0, element.height);
        canvas.lineTo(element.width, element.height);
        canvas.lineTo(element.width, 0);
        canvas.closePath();
        canvas.stroke();
         canvas.font = "26px regular";
         canvas.textBaseline = "top";
         var width = canvas.measureText(text).width;
         canvas.fillText(text, (image.width - width) / 2, (image.height - 60));

        var img = document.createElement("img");
        img.src = element.toDataURL("image/png");
        return img;
    }


    var clipThumb = function (image, width, faceId) {
        var element = document.createElement("canvas");
        var canvas = element.getContext("2d");
        element.width = width;
        element.height = width;
        canvas.drawImage(image, -faceId * width, 0, width * 6, width);
        return element;
    }

    Object.extend("BoxPanoTileLoader", {
        init: function (boxPano, level, column, row) {
            Object.prototype.init.apply(this,arguments);
            this.boxPano = boxPano;
            this.level = level;
            this.column = column;
            this.row = row;
            this.textureLoadCallback = null;
            this.loadState = 0;
            this.mcRow = this.boxPano._mcRow;
            this.position = new THREE.Vector3();
            this._setTilePosition(this.position);

            this.geometry = null;
            this.material = null;
            this.texture = null;
        },
        _getTilePath: function () {
            return "" + this.level + "/" + this.column + "_" + this.row;
        }
        ,
        _generateTileUrl: function () {
            return this.boxPano.urlProvider(this.boxPano.panoView.panoId, this.level, this.row, this.column);
        },
        _getFaceId: function () {
            var faceId = Math.floor(this.column / this._getFaceRowCount());
            return faceId;
        },
        //修改支持512*512的瓦片
        _getFaceRowCount: function () {
            if (this.level == -1) {
                return Math.pow(2, this.level + 1);
            }
            else {
                return (Math.pow(2, this.level)) * this.mcRow;
            }

        },
        _getFaceWidth: function () {
            return 400 - this.level * 2;
        },
        _getCellWidth: function () {
            return this._getFaceWidth() / this._getFaceRowCount();
        },
        _getCellX: function () {
            var faceRowCount = this._getFaceRowCount();
            var faceId = this._getFaceId();
            return this.column - faceRowCount * faceId;
        },
        _getCellY: function () {
            return this.row;
        },
        _setTilePosition: function (pos) {
            var faceWidth = this._getFaceWidth();
            var cellWidth = this._getCellWidth();
            var faceId = this._getFaceId();
            var x = this._getCellX();
            var y = this._getCellY();
            if (faceId == 0) {
                // front
                pos.x = -faceWidth / 2 + cellWidth / 2 + x * cellWidth;
                pos.y = faceWidth / 2;
                pos.z = faceWidth / 2 - cellWidth / 2 - y * cellWidth;
            } else if (faceId == 1) {
                // right
                pos.x = faceWidth / 2;
                pos.y = faceWidth / 2 - cellWidth / 2 - x * cellWidth;
                pos.z = faceWidth / 2 - cellWidth / 2 - y * cellWidth;
            } else if (faceId == 2) {
                // back
                pos.x = faceWidth / 2 - cellWidth / 2 - x * cellWidth;
                pos.y = -faceWidth / 2;
                pos.z = faceWidth / 2 - cellWidth / 2 - y * cellWidth;
            } else if (faceId == 3) {
                // left
                pos.x = -faceWidth / 2;
                pos.y = -faceWidth / 2 + cellWidth / 2 + x * cellWidth;
                pos.z = faceWidth / 2 - cellWidth / 2 - y * cellWidth;
            } else if (faceId == 4) {
                // top
                pos.x = -faceWidth / 2 + cellWidth / 2 + x * cellWidth;
                pos.y = -faceWidth / 2 + cellWidth / 2 + y * cellWidth;
                pos.z = faceWidth / 2;
            } else if (faceId == 5) {
                // bottom
                pos.x = -faceWidth / 2 + cellWidth / 2 + x * cellWidth;
                pos.y = faceWidth / 2 - cellWidth / 2 - y * cellWidth;
                pos.z = -faceWidth / 2;
            }
        },
        _setTileRotation: function (rotation) {
            var faceId = this._getFaceId();
            if (faceId == 0) {
                // front
                rotation.x = (Math.PI / 2);
            } else if (faceId == 1) {
                // right
                rotation.y = -Math.PI / 2;
                rotation.z = -Math.PI / 2;
            } else if (faceId == 2) {
                // back
                rotation.x = -Math.PI / 2;
                rotation.z = Math.PI;
            } else if (faceId == 3) {
                // left
                rotation.y = Math.PI / 2;
                rotation.z = Math.PI / 2;
            } else if (faceId == 4) {
                // top
                rotation.x = Math.PI;
                //rotation.z = Math.PI;
            } else if (faceId == 5) {
                // bottom
                rotation.z = 0;
            }
        },
        _setFaceVertexUVS: function (faceVertexUvs) {
            if (this.level >= 0) {
                return;
            }
            // 到这一步 说明是概略图，需要设置UVS
            var faceId = this._getFaceId();
            faceVertexUvs[0][0][0].x = faceId / 6;
            faceVertexUvs[0][0][1].x = faceId / 6;
            faceVertexUvs[0][0][2].x = (faceId + 1) / 6;
            faceVertexUvs[0][1][0].x = faceId / 6;
            faceVertexUvs[0][1][1].x = (faceId + 1) / 6;
            faceVertexUvs[0][1][2].x = (faceId + 1) / 6;
        }
        ,
        _createMesh: function (image) {
            var self = this;
            if (this.boxPano.panoView._renderType == 0) {
                var cellWidth = this._getCellWidth();
                this.texture = new THREE.Texture();
                this.texture.image = image;
                this.texture.needsUpdate = true;
                this.material = new THREE.MeshBasicMaterial({map: this.texture});
                this.geometry = new THREE.PlaneGeometry(cellWidth, cellWidth, 1);
                this.mesh = new THREE.Mesh(this.geometry, this.material);

                this._setTilePosition(this.mesh.position);
                this._setTileRotation(this.mesh.rotation);
                this._setFaceVertexUVS(this.geometry.faceVertexUvs);

                this.boxPano.rootObject.add(this.mesh);
            } else {
                // css 3d


                this.mesh = new THREE.CSS3DObject(function () {
                    var cellWidth = self._getCellWidth();
                    if (self.level < 0) {
                        // 缩略图
                        image = clipThumb(image, cellWidth, self._getFaceId());
                    } else {
                        image = image.cloneNode(true);
                        image.width = cellWidth;
                        image.height = cellWidth;
                        image.style.width = cellWidth + "px";
                        image.style.height = cellWidth + "px";
                    }
                    return image;
                });
                this._setTilePosition(this.mesh.position);
                this._setTileRotation(this.mesh.rotation);

                this.boxPano.rootObject.add(this.mesh);
            }
        },
        setImage: function (image) {
            this._createMesh(image);
            this.loadState = 2;
            this.textureLoadCallback();
        },
        setImageWithoutCallback: function (image) {
            this._createMesh(image);
            this.loadState = 2;
        }
        ,
        load: function () {
            var self = this;
            this.dispose();
            this.loadState = 1;

            var url = this._generateTileUrl();
            _loadImage(url, function (image) {
                if (self.loadState == 0) {
                    return;
                }
               // image = _markImage(image, self._getTilePath());
                self.setImage(image);
                self = null;
            }, function () {
                this.loadState = 0;
            })
        },
        dispose: function () {
            if (this.boxPano != null) {
                if (this.boxPano.rootObject != null && this.mesh != null) {
                    this.boxPano.rootObject.remove(this.mesh);
                }
            }
            if (this.texture != null) {
                this.texture.dispose();
                this.texture = null;
            }
            if (this.material != null) {
                this.material.dispose();
                this.material = null;
            }
            if (this.geometry != null) {
                this.geometry.dispose();
                this.geometry = null;
            }
            this.mesh = null;
            this.material = null;
            this.texture = null;
            this.geometry = null;
            this.loadState = 0;
        }
    });

    Object.extend("BoxPano", {
        init: function (panoView) {
            Object.prototype.init.apply(this,arguments);

            this.panoId = null;
            this.panoView = panoView;
            this._tileLayerCount = 1;
            if (com.vizengine.core.Platform.mobile) {
                this._maxVisibleTileCount = 44;
                this._maxCacheTileCount = 1536;
            } else {
                this._maxVisibleTileCount = 88;
                this._maxCacheTileCount = 1536;
            }


            this.urlProvider = function (panoId, level, row, column) {
                if (level < 0) {
                    row = 0;
                    column = 0;
                }

                if(panoId && panoId.substring(0,4) == "[QQ]") {
                    return window.location.protocol+"//webapp.visualbusiness.cn/vizengine/v1.0.46/PanoViewer/TileProxy.jsp?panoId=" + panoId + "&level=" + level + "&column=" + column + "&row=" + row;
                }

                var baseUrl = window.location.protocol+"//tiles.pano.visualbusiness.cn/";

                if(panoId && panoId.substring(0,4) == "[TT]") {
                    baseUrl = window.location.protocol+"//tilestest.pano.visualbusiness.cn/";
                    panoId = panoId.substring(4);
                }

                var urlStr = null;
                if(level < -1) {
                    urlStr = baseUrl+panoId+"/sv.xml";
                } else if(level == -1){
                    urlStr = baseUrl+panoId+"/cube/thumb.jpg";
                } else {
                    urlStr = baseUrl+panoId+"/cube/"+level+"_"+row+"_"+column+".jpg";
                }

                return urlStr;
            }

            this.tileLoaders = new Array();

            this._createObjects();


        },
        startCheck : function() {
            if(this.updater != null) {
                return;
            }
            this.updater = {};
            this.contCheck();
        },
        contCheck : function() {
            if(this.updater == null) {
                return;
            }
            this._checkAndLoadTiles();
            var self = this;
            setTimeout(function () {
                self.contCheck();
                self = null;
            }, 3000);
        }
        ,
        stopCheck : function() {
            this.updater = null;
        },
        _createObjects: function () {
            this.loader = new THREE.TextureLoader();
            this.loader.crossOrigin = "*";
        }
        ,
        _createTileLoaders: function () {
            var self = this;
            var total = self._tileLayerCount;
            if (self._tileLayerCount < 1) {
                total = 1;
            }
            if (self._tileLayerCount > 4) {
                total = 4;// 目前最多支持四层
            }
            for (var level = -1; level < total; level++) {
                var rowCount = 1;
                if (level >= 0) {
                    rowCount = (Math.pow(2, level)) * this._mcRow;
                }
                var columnCount = rowCount * 6;
                for (var row = 0; row < rowCount; row++) {
                    for (var column = 0; column < columnCount; column++) {
                        var tileLoader = new BoxPanoTileLoader(this, level, column, row);
                        tileLoader.textureLoadCallback = function () {
                            self.textureLoadCallback();
                            self._onTileLoaded();
                        };
                        tileLoader.loader = this.loader;
                        tileLoader.index = level + "-" + column + "-" + row;
                        this.tileLoaders.push(tileLoader);
                    }
                }
            }
        },
        _checkAndLoadTiles: function () {
            if (this.panoView._userControlling) {
                return;
            }
            this._updateTileLoaderSeq();
            this._loadMoreTiles();
        }
        ,
        _updateTileLoaderSeq: function () {
            var center = new THREE.Vector3(0, 0, -300);
            var rotation = this.panoView.camera.rotation;
            if (rotation != null) {
                center.applyEuler(rotation);
            }
            var suitableLayer = this.panoView._getCurrentSuitableLayer();
            this.tileLoaders.sort(function (left, right) {
                // 缩略图最优先加载
                var leftThumb = left.level < 0;
                var rightThumb = right.level < 0;
                if (leftThumb != rightThumb) {
                    return leftThumb ? -1 : 1;
                }

                // 大于当前适合层级的瓦片总是排在后面
                var leftIn = left.level <= suitableLayer;
                var rightIn = right.level <= suitableLayer;
                if (leftIn != rightIn) {
                    return leftIn ? -1 : 1;
                }

                if (!leftIn) {
                    if (left.level != right.level) {
                        return left.level - right.level;
                    }
                }

                var disLeft = left.position.distanceTo(center);
                var disRight = right.position.distanceTo(center);
                return disLeft - disRight;
            });
        }
        ,
        _onTileLoaded: function () {
            this._checkAndLoadTiles();
        },
        _loadMoreTiles: function () {
            var suitableLayer = this.panoView._getSuitableLayer(this.panoView._fov);
            for (var i = 0; i < this.tileLoaders.length; i++) {
                var tileLoader = this.tileLoaders[i];
                if (i < this._maxVisibleTileCount) {
                    // console.log(tileLoader.index);
                    if (tileLoader.loadState == 0) {
                        tileLoader.load();
                        break;
                    }
                } else if (i > this._maxCacheTileCount - 1 || tileLoader.level > suitableLayer) {
                    tileLoader.dispose();
                }
            }
        },

        _loadThumbImage: function (callback) {
            var url = this.urlProvider(this.panoId, -1, 0, 0);
            _loadImage(url, callback, callback);
        }
        ,
        setPanoId: function (panoId, callback) {
            this.panoId = panoId;
            var self = this;

            this._loadThumbImage(function (image) {
                if (panoId != self.panoId) {
                    callback.call(self);
                    return;
                }
                self.panoView.dispose();
                self.panoView.cleanScene();
                self.rootObject = new THREE.Object3D();
                callback.call(self);
                self._createTileLoaders();
                for (var i = 0; i < 6; i++) {
                    self.tileLoaders[i].setImageWithoutCallback(image);
                }
                self.panoView.requestDraw();
                self._onTileLoaded();
                self._onTileLoaded();
                self._onTileLoaded();

                self.startCheck();
            });
        },
        notifyUserControllEnd: function () {
            this._checkAndLoadTiles();
        },
        dispose: function () {
            for (var i in this.tileLoaders) {
                var tl = this.tileLoaders[i];
                tl.dispose();
            }
            this.tileLoaders.length = 0;
            this.stopCheck();
        }
    });


    Animation.extend("com.vizengine.animation.PanoViewFadeAnimation", {
        animateFrame: function (view, progress) {
            view.snapDiv.style.opacity = 1 - progress;
        }
    });
    var PanoViewFadeAnimation = com.vizengine.animation.PanoViewFadeAnimation;


    Animation.extend("com.vizengine.animation.PanoViewAlphaAnimation", {
        animateFrame: function (view, progress) {
            // $(view.snapDiv).css("-webkit-mask","-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,"+
            //     progress+")))");
            view.snapDiv.style.opacity = 1 - progress;
            $(view.snapDiv).css("filter", "blur(" + (1 - progress) * 5 + "px)");
        }
    });

    var PanoViewAlphaAnimation = com.vizengine.animation.PanoViewAlphaAnimation;

    /**
     * @class com.vizengine.view.PanoView
     * @extends com.vizengine.view.View
     *
     * 全景类PanoView, 使用方式非常简单, 如:
     * @examples
     * 1. 代码添加
     * var panoView = new com.vizengine.view.PanoView();
     * panoView.setPanoId("408E977686DF4370909EC165EBC21955");
     * view.addView(panoView);
     *
     * 2. xml布局:
     * <PanoView id="panoView" panoId="408E977686DF4370909EC165EBC21955"/>
     *
     *
     */
    View.extend("com.vizengine.view.PanoViewInternal", {
        init: function (domElement) {
            View.prototype.init.apply(this,arguments);
            this.scene = new THREE.Scene();
            /** 全景panoId */
            this.panoId = "";
            this.hd = false;
            this.drag = false;
            /**放大缩小回调**/
            this.onScaleCallBack=null;
            /** 触摸开始回调 */
            this.onUserTouchBeginCallback = null;
            /** heading改变回调 */
            this.onHeadingChangeCallback = null;
            /** pitch值改变回调 */
            this.onPitchChangeCallback = null;
            /** fov值改变回调 */
            this.onFovChangeCallback = null;
            this._headingNorthDelta = 0;
            this._dirty = false;
            if (com.vizengine.core.Platform.mobile) {
                this._defaultFov = 100;
            } else {
                this._defaultFov = 80;
            }
            this._fov = this._defaultFov;
            this._defaultTrans = 330;
            this._currentTrans = this._defaultTrans;
            this._deviceOrientationCallback = null;
            this._trackingBaseCameraHeading = 0;
            this._trackingBaseDeviceHeading = 0;
            this._trackingDeviceHeading = 0;
            this._autoPlaying = false;
            this._autoPlayLoopTime = 140000;
            this._needUpdateAnnotations = true;
            this._userControlling = false;
            this.onMarkerDragCallback = null;
            this.panoGestureDetectors = [];
            this.patches = [];// 全景补钉
            var self = this;
            var isDragMarker = false;
            var panGestureDetector = new PanGestureDetector();
           // var width = 0;
           // var height = 0;
            var _view = null;
           // var _dis;

            var isTouchInsideMarker = function(marker,e) {
                var left = marker.translateX + marker.frame.x;
                var top = marker.translateY + marker.frame.y;
                var right = left + marker.frame.width;
                var bottom = top + marker.frame.height;
                var x = e.getX();
                var y = e.getY();
                return x > left && x < right && y > top && y < bottom;
            }

            panGestureDetector.callback = function (translateX, translateY, event) {
                if (self.drag) {
                    // if (width == 0 || height == 0) {
                    //     width = self.measureWidth();
                    //     height = self.measureHeight();
                    //     var _fov = (self.getFov()) * Math.PI / 180;
                    //     var _cur = (height / 2) / (Math.tan(_fov / 2));
                    //     _dis = _cur;
                    // }
                    if (event.state == 0) {
                        self.startAnimation(null);
                        self.initPitch = self._getPitch();
                        self.initHeading = self._getHeading();

                        self._userControllBegin();
                        isDragMarker = false;
                        for (var i = 0; i < self.panoView.leftEye.subViews.length - 1; i++) {
                            var subView = self.panoView.leftEye.subViews[i];
                            var subViewDragable = subView.dragEnable == null || subView.dragEnable;
                            if (isTouchInsideMarker(subView,event) && subView.visible && subViewDragable) {
                                isDragMarker = true;
                                _view = subView;

                                if(self.onMarkerDragCallback != null) {
                                    self.onMarkerDragCallback(_view,0);
                                }
                                // self.initPanoHeading = subView.getPanoHeading();
                                // self.initPanoPitch = subView.getPanoPitch();
                                // self.initX = (Math.tan(self.initPanoHeading * Math.PI / 180)) * _dis;
                                // self.initY = (Math.tan(self.initPanoPitch * Math.PI / 180)) * _dis;
                                subView = null;
                                break;
                            }
                            subView = null;
                        }

                        if(_view != null) {
                            self.deltaDragX = event.getX() - (_view.translateX + _view.frame.x);
                            self.deltaDragY = event.getY() - (_view.translateY + _view.frame.y);
                        }
                    }
                    else {
                        if (isDragMarker) {
                            if (_view != null) {
                                // var alpha = Math.atan(translateX / _dis);
                                // var deta = Math.atan(translateY / _dis);
                                // _view.setPanoHeading((alpha * 180 / Math.PI) + self.initPanoHeading);
                                // _view.setPanoPitch((deta * 180 / Math.PI) + self.initPanoPitch);

                                var x = event.getX() - self.deltaDragX + _view.anchorX * _view.frame.width;
                                var y = event.getY() - self.deltaDragY + _view.anchorY * _view.frame.height;
                                var cameraLen = (self.frame.height / 2) / Math.tan(Math.PI*(self._fov/180)/2);
                                var dx = x - self.frame.width/2 ;
                                var dy = y - self.frame.height/2;
                                var heading = self.getHeading() + 180*Math.atan(dx/cameraLen)/Math.PI;
                                var pitch = self.getPitch() + 180*Math.atan(dy/cameraLen)/Math.PI;
                                _view.panoHeading = heading;
                                _view.panoPitch = pitch;
                                self.panoView._updateAnnotations();
                            }
                            if(event.state == 2) {
                                if(self.onMarkerDragCallback != null) {
                                    self.onMarkerDragCallback(_view,1);
                                }
                            }
                        }
                        else {
                            var heading = self.initHeading + translateX / self._currentTrans;
                            var pitch = self.initPitch + translateY / self._currentTrans;
                            self._setHeading(heading);
                            self._setPitch(pitch);
                        }
                    }
                }
                else {
                    if (event.state == 0) {
                        self.startAnimation(null);
                        self.initPitch = self._getPitch();
                        self.initHeading = self._getHeading();
                        self._userControllBegin();
                    }
                    else {
                        var heading = self.initHeading + translateX / self._currentTrans;
                        var pitch = self.initPitch + translateY / self._currentTrans;
                        self._setHeading(heading);
                        self._setPitch(pitch);
                    }
                }
                self.requestDraw();
                return true;
            };
            this.panoGestureDetectors.push(panGestureDetector);

            var sweepGesture = new SweepGestureDetector();
            sweepGesture.callback = function (vx, vy) {
                if (!isDragMarker) {
                    self._fly(vx, vy);
                }
            };
            sweepGesture.cancelCallback = function(){
                self._userControllEnd(true);
            }
            this.panoGestureDetectors.push(sweepGesture);

            var pinchGesture = new PinchGestureDetector();
            pinchGesture.callback = function (scale, reset) {
                if (reset) {
                    self.initFov = self._getFov();
                } else {
                    self._scaleCamera(self.initFov / scale);
                    if(self.onScaleCallBack!=null)
                    {
                        self.onScaleCallBack();
                    }
                }

            };
            this.panoGestureDetectors.push(pinchGesture);

            this.setVREnable(false);
        },

        /**
         * @method
         * 设置marker是否能拖动
         *
         * @param {boolean} value
         *
         */
        setMarkerDragEnable: function (value) {
            this.drag = View.parseBoolean(value);
        },
        isMarkerDragEnabled: function () {
            return this.drag;
        },
        /**
         * @method
         * 设置marker拖动回调
         *
         * @param {function} callback
         *
         */
        setMarkerDragCallback: function(callback) {
            this.onMarkerDragCallback = callback;
        },
        /**
         * @method
         * 高清模式
         *
         * @param {boolean} value
         *
         */
        setHDEnable: function (value) {
            // depressed
            this.hd = View.parseBoolean(value);
        },
        setOnScaleCallback: function (callback) {
               this.onScaleCallBack=callback;
            }
            ,
        setOnFovChangeCallback :function (callback) {
            this.onFovChangeCallback=callback;
        },
        isHDEnabled: function () {
            return this.hd;
        }
        ,
        _checkIfTryWebgl : function() {
            // 如果有android及对webgl兼容不好，这里可以写入webgl使用的黑名单
            if(com.vizengine.core.Platform.android) {
                // 目前已经发现很多手机对css3d的支持不好，会出现闪屏，大斑块等问题
                // 例如：
                //      红米note(HM NOTE 1TD Build/JDQ39;)
                //      华为    (HUAWEI NXT-UL00 Build/HUAWEINXT-UL00)
                // 但也有一些手机对webgl也有兼容新问题，导致全景拖不动
                // 因此这里默认运行android检测是否支持webgl
                // 如果发现对webgl兼容不好，则采用强制使用css3d的方式
                return true;
            }
            return true;
        }
        ,
        _webglAvailable: function () {
            try {
                if(!this._checkIfTryWebgl()){
                    return false;
                }
                var canvas = document.createElement('canvas');
                return !!( window.WebGLRenderingContext && (
                    canvas.getContext('webgl') ||
                    canvas.getContext('experimental-webgl') )
                    );
            } catch (e) {
                return false;
            }
        },
        _createRender: function () {
            if (this._webglAvailable()) {
                this.leftRenderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
                this.rightRenderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
                this._renderType = 0;
            } else {
                this.leftRenderer = new THREE.CSS3DRenderer();
                this.rightRenderer = new THREE.CSS3DRenderer();
                this._renderType = 1;
            }
        },
        _createPanoModel: function () {
            this.pano = new BoxPano(this);
            var self = this;
            this.textureLoadCallback = function () {
                self.requestDraw();
            };

            this.pano.textureLoadCallback = this.textureLoadCallback;
        }
        ,
        _createNativeView: function () {
            var nativeView = View.prototype._createNativeView.apply(this,arguments);
            this._createPanoModel();
            var container = document.createElement("div");
            container.style.position = "absolute";
            var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.rotation.order = "ZXY";
            camera.rotation.x = Math.PI / 2;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            this._createRender();
            var leftRenderer = this.leftRenderer;
            var rightRenderer = this.rightRenderer;
            if (leftRenderer.setPixelRatio != null) {
                leftRenderer.setPixelRatio(window.devicePixelRatio);
            }
            if (rightRenderer.setPixelRatio != null) {
                rightRenderer.setPixelRatio(window.devicePixelRatio);
            }
            leftRenderer.setClearColor(0xffffff, 1.0);
            rightRenderer.setClearColor(0xffffff, 1.0);
            this.loader = new THREE.TextureLoader();
            this.loader.crossOrigin = "*";
            this.scene = null;
            this.camera = camera;
            this.leftContainer = document.createElement("div");
            this.leftContainer.style.position = "absolute";
            this.rightContainer = document.createElement("div");
            this.rightContainer.style.position = "absolute";

            this.snapDiv = document.createElement("div");
            this.snapDiv.id = "snapshot";
            this.snapDiv.style.position = "absolute";
            this.snapDiv.style.display = "none";
            this.leftContainer.appendChild(this.leftRenderer.domElement);
            this.rightContainer.appendChild(this.rightRenderer.domElement);
            container.appendChild(this.leftContainer);
            container.appendChild(this.rightContainer);
            container.appendChild(this.snapDiv);
            container.style.overflow="hidden";

            nativeView.div = container;
            nativeView.oldAddNativeView = nativeView.addNativeView;
            nativeView.addNativeView = function(view,index) {
                this.oldAddNativeView(view,index+3);
            }
            nativeView.oldRemoveNativeViewAt = nativeView.removeNativeViewAt;
            nativeView.removeNativeViewAt = function(index) {
                this.oldRemoveNativeViewAt(index+3);
            }
            return nativeView;
        },
        _getFov: function () {
            return this._fov;
        },
        _setFov: function (fov) {
            this._fov = fov;
            this._setFovForCamera(this.camera, fov);
            if (this.onFovChangeCallback != null) {
                this.onFovChangeCallback(this.getFov());
            }
            this.requestDraw();
        },
        _setFovForCamera: function (camera, fov) {
            camera.fov = fov;
            camera.updateProjectionMatrix();
        },
        /**
         * @method
         * 设置全景camera fov
         *
         * @param {number} fov
         *
         */
        setFov: function (fov) {
            var defaultFov = this._getDefaultFov();
            var scale = defaultFov / fov;
            this._currentTrans = this._defaultTrans * scale;
            this._setFov(fov);
        },
        getFov: function () {
            return this._getFov();
        },
        _getDefaultFov: function () {
            return this._defaultFov;
        }
        ,
        log2: function (value) {
            return Math.log(value) / Math.log(2);
        },
        _getSuitableFov: function (layer) {
            layer /= 1.5;
            if (layer < 0) {
                layer = 0;
            }

            var df = (this._getDefaultFov() / 360) * Math.PI;
            var fov = 2 * Math.atan(Math.tan(df / 2) / Math.pow(2, layer)) * 360 / Math.PI;

            //var fov =Math.atan(Math.tan((this._getDefaultFov()/360)*Math.PI) / (layer+1)) * 360 / Math.PI;
            return fov;
        },
        _getSuitableLayer: function (fov) {
            var df = (this._getDefaultFov() / 360) * Math.PI;
            var f = (fov / 360) * Math.PI;
            var layer = this.log2(Math.tan(df / 2) / Math.tan(f / 2));//Math.tan((this._getDefaultFov()/360)*Math.PI) / Math.tan((fov/360)*Math.PI) - 1;

            layer *= 1.5;
            return layer;
        }
        ,
        _getCurrentSuitableLayer: function (fov) {
            if (fov == null) {
                fov = this._getFov();
            }
            var layer = this._getSuitableLayer(fov);
            layer = Math.floor(layer);
            if (layer < 0) {
                layer = 0;
            }
            if (layer > this.pano._tileLayerCount - 1) {
                layer = this.pano._tileLayerCount - 1;
            }
            return layer;
        },
        /**
         * @method
         * 设置全景缩放比例
         *
         * @param {number} zoom
         *
         */
        setZoom: function (zoom) {
            var fov = this._getSuitableFov(zoom);
            this._setFov(fov);
        },
        getZoom: function () {
            return this._getSuitableLayer(this._fov);
        }
        ,
        _scaleCamera: function (fov) {
            var defaultFov = this._getDefaultFov();
            if (fov > defaultFov) {
                fov = defaultFov;
            }

            var minFov = this._getSuitableFov(this.pano._tileLayerCount - 0.5);

            if (fov < minFov) {
                fov = minFov;
            }

            // 限制缩放级别
//            var layer = this._getSuitableLayer(fov);
//
//            if (layer > this.pano._tileLayerCount - 1) {
//                fov = this._getSuitableFov(this.pano._tileLayerCount - 1);
//            }
            var scale = defaultFov / fov;
            this._currentTrans = this._defaultTrans * scale;

            this._setFov(fov);
        }
        ,
        _fly: function (vx, vy) {
            var self = this;
            var a = 0.002;
            var tx = Math.abs(vx) / a;
            var sx = 0.5 * a * tx * tx * (vx > 0 ? 1 : -1);
            var anglex = -sx / this._currentTrans;

            var ty = Math.abs(vy) / a;
            var sy = 0.5 * a * ty * ty * (vy > 0 ? 1 : -1);
            var angley = sy / this._currentTrans;

            var timeInterplator = new DecelerateInterpolator(2);


            var duration = tx > ty ? tx : ty;

            var fromPitch = this._getPitch();
            var toPitch = fromPitch + angley;

            if (toPitch > Math.PI) {
                toPitch = Math.PI;
            } else if (toPitch < 0) {
                toPitch = 0;
            }


            var animation = new PanoFlyAnimation();
            animation.fromHeading = this._getHeading();
            animation.toHeading = animation.fromHeading - anglex;
            animation.fromPitch = fromPitch;
            animation.toPitch = toPitch;
            animation.duration = duration;
            animation.callback = function () {
                self._userControllEnd(true);
            }

//            if(this._deviceOrientationCallback != null) {
//                animation.enablePitch = false;
//            }

            animation.timeInterplator = timeInterplator;

            this.startAnimation(animation);
        },
        _userControllBegin: function () {
            this._userControlling = true;
            if (this.onUserTouchBeginCallback != null) {
                this.onUserTouchBeginCallback();
            }
        },
        _userControllEnd: function (fromTouch) {
            this._userControlling = false;
            this._trackingBaseCameraHeading = this._getHeading();
            this._trackingBaseDeviceHeading = this._trackingDeviceHeading;
            if (this._autoPlaying && fromTouch) {
                this.delayAutoplay(1);
            }

            if (this._deviceOrientationCallback != null) {
                var deac = new DecelerateInterpolator(2);
                var animation = new PanoFlyAnimation();
                animation.enableHeading = false;
                animation.enableRoll = true;
                animation.timeInterplator = deac;
                animation.duration = 800;
                animation.fromPitch = this._getPitch();
                animation.toPitch = this._trackingDevicePitch != null ? this._trackingDevicePitch : animation.fromPitch;
                animation.fromRoll = this._getRoll();
                animation.toRoll = this._trackingDeviceRoll != null ? this._trackingDeviceRoll : animation.fromRoll;
                animation.pulling = true;
                this.startAnimation(animation);
            }

            if (this.pano != null) {
                this.pano.notifyUserControllEnd();
            }
        },
        dispatchLayout: function () {
            View.prototype.dispatchLayout.apply(this,arguments);
            var dfov = this._getDefaultFov();
            if (this._fov > dfov) {
                this._fov = dfov;
            }
            this._setFov(this._fov);
            this.camera.near = 1;
            this.camera.far = 40000;
            if (this.enableVR) {
                this.camera.aspect = 0.5 * this.frame.width / this.frame.height;
                var width = this.frame.width / 2;
                var height = this.frame.height;
                this.leftContainer.style.width = width + "px";
                this.leftContainer.style.height = height + "px";
                this.rightContainer.style.left = width + "px";
                this.rightContainer.style.width = width + "px";
                this.rightContainer.style.height = height + "px";
                this.leftRenderer.setSize(this.frame.width / 2, this.frame.height);
                this.rightRenderer.setSize(this.frame.width / 2, this.frame.height);
                if (this.leftRenderer.setViewport != null) {
                    this.leftRenderer.setViewport(0, 0, this.frame.width / 2, this.frame.height);
                }
                if (this.rightRenderer.setViewport != null) {
                    this.rightRenderer.setViewport(0, 0, this.frame.width / 2, this.frame.height);
                }
            }
            else {
                this.camera.aspect = this.frame.width / this.frame.height;
                var width = this.frame.width;
                var height = this.frame.height;
                this.leftContainer.style.width = width + "px";
                this.leftContainer.style.height = height + "px";
                this.leftRenderer.setSize(this.frame.width, this.frame.height);
                if (this.leftRenderer.setViewport != null) {
                    this.leftRenderer.setViewport(0, 0, this.frame.width, this.frame.height);
                }
            }
            this.camera.updateProjectionMatrix();
            this.onDraw();
        },
        cloneCanvas: function (oldCanvas) {
            //create a new canvas
            var newCanvas = document.createElement('canvas');
            var context = newCanvas.getContext('2d');
            //set dimensions
            newCanvas.width = oldCanvas.width;
            newCanvas.height = oldCanvas.height;
            //apply the old canvas to the new one
            context.drawImage(oldCanvas, 0, 0);
            //return the new canvas
            return newCanvas;
        },
        /**
         * @method
         * 全景截图
         * @return {*}
         */
        _snapshot: function () {
            if (this._renderType == 0) {
                var img = this.cloneCanvas(this.leftRenderer.domElement);

                this.snapDiv.style.width = this.frame.width + "px";
                this.snapDiv.style.height = this.frame.height + "px";
                for (var i = this.snapDiv.childNodes.length - 1; i >= 0; i--) {
                    this.snapDiv.removeChild(this.snapDiv.childNodes[i]);
                }
                this.snapDiv.appendChild(img);
                img.style.width = this.frame.width + "px";
                img.style.height = this.frame.height + "px";

                return img;
            }
            else {
                var img = (this._nativeView.div.childNodes[0]).cloneNode(true);
                this.snapDiv.style.width = this.frame.width + "px";
                this.snapDiv.style.height = this.frame.height + "px";
                for (var i = this.snapDiv.childNodes.length - 1; i >= 0; i--) {
                    this.snapDiv.removeChild(this.snapDiv.childNodes[i]);
                }
                this.snapDiv.appendChild(img);
                img.style.width = this.frame.width + "px";
                img.style.height = this.frame.height + "px";

                return img;
            }

        },
        getSnapshotDiv: function () {
            return this.snapDiv;
        }
        ,
        onDraw: function () {
            if (this.scene == null ) {
                return;
            }

            this._dirty = false;
            if (this.enableVR) {
                this.leftRenderer.render(this.scene, this.camera);
                this.rightRenderer.render(this.scene, this.camera);
            }
            else {
                this.leftRenderer.render(this.scene, this.camera);
            }
        },
        removePatch : function(patch) {
            var i = this.patches.indexOf(patch);
            if(i >= 0 && this.patches[i].mesh != null) {
                this.scene.remove(this.patches[i].mesh);
            }
            this.patches.splice(i,1);
        },
        _updatePatches : function() {
            for(var i = 0 ; i < this.patches.length; i++) {
                var patch = this.patches[i];
                this._updatePatch(patch);
            }
        },
        _updatePatch : function(patch) {
            if(patch.mesh != null) {
                var panoPitch = Math.PI * (90 - patch.pitch) / 180;
                var panoHeading = -1 * ((patch.heading + this._headingNorthDelta) / 180) * Math.PI;
                var a = new THREE.Euler(panoPitch, 0, panoHeading, 'ZXY');

                var location = new THREE.Vector3(0,0,-100);
                location.applyEuler(a);

                patch.mesh.position.copy(location);
                patch.mesh.rotation.copy(a);
            }
        }
        ,
        addPatch : function(imageUrl,heading,pitch,width,height) {
            imageUrl =  View.resolvePath(this.getContextPath(),imageUrl);

            var patch = {
                imageUrl : imageUrl,
                heading : heading,
                pitch : pitch,
                width : width,
                height : height,
                mesh : null
            };
            this.patches.push(patch);


            if(imageUrl.substring(0,4) != "http" && imageUrl.substring(0,2) != "//" && imageUrl.substring(0,5) != "data:") {
                imageUrl = window.__app__baseurl + imageUrl;
            }

            var self = this;

            var loader = new THREE.TextureLoader();
            loader.crossOrigin = "*";
            // load a resource
            loader.load(
                // resource URL
                imageUrl,
                // Function when resource is loaded
                function (texture) {
                    var img = texture.image;
                    var index = self.patches.indexOf(patch);
                    if(index < 0) {
                        // 已删除
                        return;
                    }

                    if (self._renderType == 0) {
                        var texture = new THREE.Texture();
                        texture.image = img;
                        texture.needsUpdate = true;
                        var material = new THREE.MeshBasicMaterial({map: texture});
                        material.transparent = true;
                        var width = 200 * Math.tan(patch.width*Math.PI/360);
                        var height = 200 * Math.tan(patch.height*Math.PI/360);
                        var geometry = new THREE.PlaneGeometry(width, height, 1);
                        var mesh = new THREE.Mesh(geometry, material);
                        patch.mesh = mesh;
                        self._updatePatch(patch);
                        self.scene.add(mesh);
                    } else {
                        var width = 200 * Math.tan(patch.width*Math.PI/360);
                        var height = 200 * Math.tan(patch.height*Math.PI/360);
                        // css 3d
                        var mesh = new THREE.CSS3DObject(function () {
                            var imgCopy = img.cloneNode(true);
                            imgCopy.width = width;
                            imgCopy.height = height;
                            imgCopy.style.width = width + "px";
                            imgCopy.style.height = height + "px";

                            return imgCopy;
                        });
                        patch.mesh = mesh;
                        self._updatePatch(patch);
                        self.scene.add(mesh);
                    }
                },
                // Function called when download progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // Function called when download errors
                function (xhr) {
                    console.log('An error happened');
                }
            );

            return patch;
        }
        ,
        isVREnabled: function () {
            return this.enableVR;
        }
        ,
        setVREnable: function (enableVR) {

            if (enableVR) {
                //开启VR模式
                this.trackingDevice();
                this.enableVR = true;
                this.leftContainer.style.display = "block";
                this.rightContainer.style.display = "block";
            }
            else {
                //关闭VR模式
                this.stopTrackingDevice();
                this.enableVR = false;
                this.leftContainer.style.display = "block";
                this.rightContainer.style.display = "none";
            }
            this.requestLayout();
        }
        ,

        _loadMeta: function (callback) {
            var metaUrl = this.pano.urlProvider(this.panoId, -2);
            if (metaUrl == null) {
                callback();
                return;
            }
            var self = this;
            self._headingNorthDelta = 0;

            var proxy = window.__pano__proxy || window.__vizengine__proxy || "";
            metaUrl = proxy + metaUrl;
            loadResource(metaUrl,function(str){
                var json = nativeParseXMLToJson(str);
                var obj = JSON.parse(json);
                var dir = obj.children[0].attributes["dir"];
                if (dir != null) {
                   // var oldHeading = self.getHeading();
                    self._headingNorthDelta = parseFloat(dir);
                   // self.setHeading(oldHeading);
                }
                var mcln = obj.children[0].attributes["mcln"];
                var mclevel0 = obj.children[0].attributes["mclevel0"];
                var mcRow = mclevel0.split("*")[0];
                self.pano._mcRow = parseInt(mcRow);
                self.pano._tileLayerCount = parseInt(mcln);
                self.applyLimitFov();
                self._updatePatches();
                if(callback) {
                    callback();
                }
            });

//            com.vizengine.UPXMLUtil.loadXMLDoc(metaUrl, function (doc) {
//                var basics = doc.getElementsByTagName("basic");
//                if (basics != null && basics.length > 0) {
//                    var dir = basics[0].getAttribute("dir");
//                    if (dir != null) {
//                        var oldHeading = self.getHeading();
//                        self._headingNorthDelta = parseFloat(dir);
//                        self.setHeading(oldHeading);
//                    }
//                    var mcln = basics[0].getAttribute("mcln");
//                    var mclevel0 = basics[0].getAttribute("mclevel0");
//                    var mcRow = mclevel0.split("*")[0];
//                    self.pano._mcRow = parseInt(mcRow);
//                    self.pano._tileLayerCount = parseInt(mcln);
//                    self.applyLimitFov();
//                }
//                callback();
//            });
        },
        applyLimitFov: function () {
            var minFov = this._getSuitableFov(this.pano._tileLayerCount - 1);
            if (this._fov < minFov) {
                this._scaleCamera(minFov);
            } else {
                this._scaleCamera(this._fov);
            }
        }
        ,
        isPatch : function(mesh) {
            for(var i = 0 ; i < this.patches.length; i++) {
                if(mesh == this.patches[i].mesh) {
                    return true;
                }
            }
            return false;
        }
        ,
        cleanScene: function () {
            for (var i = 0; i < this.scene.children.length; i++) {
                var index = this.scene.children.length - i - 1;
                var child = this.scene.children[index];
                if(!this.isPatch(child)) {
                    this.scene.remove(child);
                }
            }
        },
        _isDisablePanoAnimation : function() {
            if(navigator.userAgent.indexOf("HUAWEI NXT-UL00 BUILD") >= 0) {
                // 这款手机截图是反的，动画效果不对，暂时禁用动画
                return true;
            }
            return false;
        }
        ,
        setPanoId: function (panoId, callback, animation) {
            if (panoId == this.panoId) {
                if(callback) {
                    callback.call(this);
                }
                return;
            }


            if (animation == null || animation == true) {
                animation = new PanoViewFadeAnimation();
                animation.duration = 600;
            } else {
                animation = null;
            }

            if(this._isDisablePanoAnimation()) {
                animation = null;
            }

            if(this.enableVR) {
                animation = null;
            }

            this.startAnimation(null);

            var self = this;

            if(animation != null) {
                //动画特效
                self._snapshot();
                self.snapDiv.style.display = "block";
                self.snapDiv.style.opacity = 1;
            }

            this.panoId = panoId;

            this.dispose();

            if (com.vizengine.core.StringUtil.isEmpty(this.panoId)) {
                if(callback) {
                    callback.call(this);
                }
                return;
            }

            this._loadMeta(function () {
                if (panoId != self.panoId) {
                    return;
                }

                self.pano.setPanoId(panoId, function () {
                    if (self.pano.rootObject == null) {
                        return;
                    }
                    self.pano.rootObject.add(self.camera);
                    self.scene.add(self.pano.rootObject);
                    if (animation != null) {
                        animation.callback = function () {
                            self.startAnimation(null);
                            self.snapDiv.style.display = "none";
                            self._userControllEnd(true);
                        };
                        self.startAnimation(animation);
                    } else {
                        self.snapDiv.style.display = "none";
                        self._userControllEnd(false);
                    }
                    if (callback != null) {
                        callback.call(self);
                    }
                });
            });
        },
        getPanoId: function () {
            return this.panoId;
        },
        dispose: function () {
            this.pano.dispose();
        },
        setAutoplayLoopTime: function (time) {
            this._autoPlayLoopTime = time;
        }
        ,
        setAutoplayEnable: function (enable) {
            if (enable) {
                this.autoPlay();
            } else {
                this.stopAutoPlay();
            }
        },
        isAutoplayEnabled: function () {
            return this._autoPlaying;
        },
        /**
         * @method
         * 启动全景自动播放, 默认启动旋转动画(heading)
         *
         */
        autoPlay: function () {
            // if gravity is enable, cannot autoPlay
            if (this.isGravityEnabled()) {
                return;
            }
            this._autoPlaying = true;
            if (this.animation != null) {
                return;
            }
            var animation = new PanoFlyAnimation();
            animation.fps = 24;// 电量优化，在自动旋转动画中无需很高的帧率也能平滑旋转，因为旋转速度并不是很快，这样控制帧率对于省电有着十分重要的作用
            animation.fromHeading = this._getHeading();
            animation.toHeading = this._getHeading() - 2 * Math.PI;
            animation.enablePitch = false;
            animation.duration = this._autoPlayLoopTime * Math.pow(2, this._getSuitableLayer(this._fov));
            animation.repeatCount = 0;
            this.startAnimation(animation);
        },
        /**
         * @method
         * 停止自动播放的动画
         *
         */
        stopAutoPlay: function () {
            this._autoPlaying = false;
            this.startAnimation(null);
        },
        /**
         * @method
         * 设置全景陀螺仪传感器
         *
         * @param {boolean} enable
         *
         */
        setGravityEnable: function (enable) {
            if (enable) {
                this.trackingDevice();
            } else {
                this.stopTrackingDevice();
            }
        },
        isGravityEnabled: function () {
            return this.isTrackingDevice();
        }
        ,
        isTrackingDevice: function () {
            return this._deviceOrientationCallback != null;
        },

        trackingDevice: function () {
            var self = this;
            this.startAnimation(null);
            this.setAutoplayEnable(false);
            if (this._deviceOrientationCallback == null) {
                this._deviceOrientationCallback = function (event) {

                    var roll = (event.gamma / 180) * Math.PI;
                    var pitch = (event.beta / 180) * Math.PI;
                    var heading = (event.alpha / 180) * Math.PI;


                    // 处理设备屏幕旋转
                    if (window.orientation == 90) {
                        var deviceEuler = new THREE.Euler();
                        deviceEuler.set(pitch, roll, heading, "ZXY");
                        deviceEuler.reorder("ZYX");

                        heading = deviceEuler.z - Math.PI / 2;
                        pitch = -deviceEuler.y;
                        roll = deviceEuler.x;
                    } else if (window.orientation == -90) {
                        var deviceEuler = new THREE.Euler();
                        deviceEuler.set(pitch, roll, heading, "ZXY");
                        deviceEuler.reorder("ZYX");

                        heading = deviceEuler.z + Math.PI / 2;
                        pitch = deviceEuler.y;
                        roll = -deviceEuler.x;
                    }

                    self._trackingDeviceHeading = heading;
                    self._trackingDevicePitch = pitch;
                    self._trackingDeviceRoll = roll;
//                    if(self._userControlling) {
//                        return;
//                    }

                    if (!self._autoPlaying && !self._userControlling) {
                        var heading = self._trackingBaseCameraHeading + (self._trackingDeviceHeading - self._trackingBaseDeviceHeading);
                        self._setHeading(heading);
                        if (self.animation != null && self.animation.pulling) {
                            self.animation.toPitch = pitch;
                        } else {
                            self._setPitch(pitch);
                            self._setRoll(roll);
                        }
                    }
                }
                window.addEventListener("deviceorientation", this._deviceOrientationCallback);
            }
            self._userControllEnd(false);
        },
        stopTrackingDevice: function () {
            if (this._deviceOrientationCallback != null) {
                window.removeEventListener("deviceorientation", this._deviceOrientationCallback);
                this._deviceOrientationCallback = null;

                this.setRoll(0);
            }
            this._userControllEnd(false);
        },
        /**
         * @method
         * 设置全景heading, 常用作方位角初始化
         *
         * @param {number} heading
         *
         */
        setHeading: function (heading) {
            heading = parseFloat(heading);
            heading = -1 * ((heading + this._headingNorthDelta) / 180) * Math.PI;
            this._setHeading(heading);
        },
        _setHeading: function (heading) {
            this.camera.rotation.z = heading;
            this.requestDraw();
            if (this.onHeadingChangeCallback != null) {
                this.onHeadingChangeCallback(this.getHeading());
            }
        },
        /**
         * @method
         * 设置全景pitch, 常用作方位角初始化
         *
         * @param {number} pitch
         *
         */
        setPitch: function (pitch) {
            pitch = parseFloat(pitch);
            pitch = Math.PI * (90 - pitch) / 180;
            this._setPitch(pitch);
        },
        _normalPitch: function (pitch) {
            pitch = pitch % (Math.PI * 2);
            if (pitch < 0) {
                pitch += Math.PI * 2;
            }
            if (pitch > Math.PI * 1.5) {
                pitch = 0;
            } else if (pitch > Math.PI) {
                pitch = Math.PI;
            }
            return pitch;
        }
        ,
        _setPitch: function (pitch) {
            if (this._deviceOrientationCallback == null) {
                pitch = this._normalPitch(pitch);
            }

            this.camera.rotation.x = pitch;
            this.requestDraw();
            if (this.onPitchChangeCallback != null) {
                this.onPitchChangeCallback(this.getPitch());
            }
        }
        ,
        delayAutoplay : function(delayTime) {
            var self = this;
            if(self._autoPlaying && self.animation == null) {
                self.setAutoplayEnable(true);
            }
        }
        ,
        requestDraw: function () {
            if(this._dirty) {
                return;
            }
            this._dirty = true;
            var self = this;
            setTimeout(function(){
                self._dirty = false;
                self.onDraw();
            },0);
        }
        ,
        /**
         * @method
         * 设置全景roll, 常用作方位角初始化
         *
         * @param {number} roll
         *
         */
        setRoll: function (roll) {
            roll = Math.PI * roll / 180;
            this._setRoll(roll);
        }
        ,
        _setRoll: function (roll) {
            this.camera.rotation.y = roll;
        },
        getHeading: function () {
            var heading = this._getHeading();
            return -180 * heading / Math.PI - this._headingNorthDelta;
        }
        ,
        _getHeading: function () {
            return this.camera.rotation.z;
        },
        getPitch: function () {
            var pitch = this._getPitch();
            return 90 - (180 * pitch / Math.PI);
        },
        _getPitch: function () {
            return this.camera.rotation.x;
        },
        getRoll: function () {
            var roll = this._getRoll();
            return 180 * roll / Math.PI;
        },
        _getRoll: function () {
            return this.camera.rotation.y;
        }
    });


    var cursorImageSrc = "data:image/png;base64,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";

    View.extend("com.vizengine.view.PanoView", {
        init : function() {
            View.prototype.init.apply(this,arguments);
            var self = this;
            this.onPitchChangeCallback = null;
            this.onHeadingChangeCallback = null;
            this.onFovChangeCallback = null;
            this.panoViewInternal = new com.vizengine.view.PanoViewInternal();
            this.panoViewInternal.panoView = this;
            this.panoViewInternal.onPitchChangeCallback = function() {
                if(self.onPitchChangeCallback) {
                    self.onPitchChangeCallback.apply(self,arguments);
                }
                self._updateAnnotations();
                self._checkUpdateCursorState();
            }
            this.panoViewInternal.onHeadingChangeCallback = function() {
                if(self.onHeadingChangeCallback) {
                    self.onHeadingChangeCallback.apply(self,arguments);
                }
                self._updateAnnotations();
                self._checkUpdateCursorState();
            }
            this.panoViewInternal.onFovChangeCallback = function() {
                if(self.onFovChangeCallback) {
                    self.onFovChangeCallback.apply(self,arguments);
                }
                self._updateAnnotations();
                self._checkUpdateCursorState();
            }
            View.prototype.addView.call(this,this.panoViewInternal);

            this.leftEye = new View();
            this.leftEye.setId("leftEye");
            this.rightEye = new View();
            this.rightEye.setId("rightEye");
            this.leftEye.setClipToBounds(true);
            this.leftEye.setGravity("left");
            this.rightEye.setClipToBounds(true);
            this.rightEye.setGravity("right");

            View.prototype.addView.call(this,this.leftEye);
            View.prototype.addView.call(this,this.rightEye);

            this.mouseWheelEnable = true;
            this.keyEnable = true;

            this._createVRCursor();
            // add vr cursor

            var moushwheeled = function (event) {
                if(!self.touchable || !self.mouseWheelEnable) {
                    return;
                }
                event.preventDefault();
                var e = window.event || event; // old IE sport
                //log("wheelDelta:"+e.wheelDelta+" e.ctrlKey:"+e.ctrlKey+" e.deltaY:"+e.deltaY);
                var delta = 0;
                if(e.ctrlKey) {
                    delta = -e.deltaY/3;
                } else {
                    delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                    delta*=2;
                }

                var deac = new DecelerateInterpolator(2);
                var panoView = self.panoViewInternal;
                panoView.startAnimation(null);
                if (delta < 0) {
                    var animation = new PanoScaleAnimation();
                    animation.fromFov = panoView._getFov();
                    animation.toFov = animation.fromFov -delta;
                    animation.duration = 600;
                    animation.timeInterplator = deac;
                    animation.callback=function () {
                        panoView._scaleCamera(this.toFov);
                        if(self.onScaleCallBack!=null)
                        {
                            self.onScaleCallBack();
                        }
                    };
                    animation.animateFrame(panoView,0);
                    panoView.startAnimation(animation);
                } else if(delta > 0) {
                    var animation = new PanoScaleAnimation();
                    animation.fromFov = panoView._getFov();
                    animation.toFov = animation.fromFov - delta;
                    animation.duration = 600;
                    animation.timeInterplator = deac;
                    animation.callback=function () {
                        panoView._scaleCamera(this.toFov);
                        if(self.onScaleCallBack!=null)
                        {
                            self.onScaleCallBack();
                        }
                    };
                    animation.animateFrame(panoView,0);
                    panoView.startAnimation(animation)
                }
                event.stopPropagation();
            };

            var div = this._nativeView.div;
            if (div.addEventListener) {
                // IE9, Chrome, Safari, Opera
                div.addEventListener("mousewheel", moushwheeled, false);
                // Firefox
                div.addEventListener("DOMMouseScroll", moushwheeled, false);
            } else {
                // IE 6/7/8
                div.attachEvent("onmousewheel", moushwheeled);
            }

            this.setVREnable(false);

            /**
             * 默认的适配器
             */
            this.adaptor = {
                markers : [],
                getView : function(index) {
                    return this.markers[index];
                },
                getCount : function() {
                    return this.markers.length;
                }
            }
            // http://webapp.visualbusiness.cn/lunaeditorserver/api/editor/loadBytes.do?uid=674E70EF-DD7B-4781-922C-5E8F9CE1F280
        },
        dispose: function () {
            this.panoViewInternal.dispose();
        },
        dispatchTouch: function (event) {
            View.prototype.dispatchTouch.apply(this,arguments);
            if(this.touchable)
            {
                for (var i in this.panoViewInternal.panoGestureDetectors) {
                    var gestureDetector = this.panoViewInternal.panoGestureDetectors[i];
                    gestureDetector.detect(event);
                }
            } else {
                window.__preventDefault__ = false;
            }
        },
        setMarkerDragCallback: function(callback) {
            this.panoViewInternal.setMarkerDragCallback(callback);
        }
        ,

        dispatchKey: function(keyEvent) {

            if(!this.keyEnable) {
                return;
            }

            // left : 37
            // top : 38
            // right : 39
            // bottom : 40
            // enter : 13
            // return : 27

            var loopTime = 8000;

            if(keyEvent.state == 0) {
                if(keyEvent.keyCode == 37) {
                    // left
                    this.delayAutoplay(1);
                    var animation = new com.vizengine.animation.Animation();
                    animation.duration = loopTime;
                    animation.repeatCount = 0;
                    animation.fromHeading = this.getHeading();
                    animation.toHeading = animation.fromHeading - 360;
                    animation.animateFrame = function(view,progress) {
                        var heading = this.fromHeading + (this.toHeading - this.fromHeading) * progress;
                        view.setHeading(heading);
                    }
                    this.panoViewInternal.startAnimation(animation);
                } else if(keyEvent.keyCode == 39) {
                    // right
                    this.delayAutoplay(1);
                    var animation = new com.vizengine.animation.Animation();
                    animation.duration = loopTime;
                    animation.repeatCount = 0;
                    animation.fromHeading = this.getHeading();
                    animation.toHeading = animation.fromHeading + 360;
                    animation.animateFrame = function(view,progress) {
                        var heading = this.fromHeading + (this.toHeading - this.fromHeading) * progress;
                        view.setHeading(heading);
                    }
                    this.panoViewInternal.startAnimation(animation);
                } else if(keyEvent.keyCode == 38) {
                    // top
                    this.delayAutoplay(1);
                    var animation = new com.vizengine.animation.Animation();
                    animation.duration = loopTime * ((this.getPitch() + 90)/360);
                    animation.repeatCount = 1;
                    animation.fromPitch = this.getPitch();
                    animation.toPitch = -90;
                    animation.animateFrame = function(view,progress) {
                        var pitch = this.fromPitch + (this.toPitch - this.fromPitch) * progress;
                        view.setPitch(pitch);
                    }
                    this.panoViewInternal.startAnimation(animation);
                } else if(keyEvent.keyCode == 40) {
                    // bottom
                    this.delayAutoplay(1);
                    var animation = new com.vizengine.animation.Animation();
                    animation.duration = loopTime * ((90-this.getPitch())/360);
                    animation.repeatCount = 1;
                    animation.fromPitch = this.getPitch();
                    animation.toPitch = 90;
                    animation.animateFrame = function(view,progress) {
                        var pitch = this.fromPitch + (this.toPitch - this.fromPitch) * progress;
                        view.setPitch(pitch);
                    }
                    this.panoViewInternal.startAnimation(animation);
                }
            } else {
                this.panoViewInternal.startAnimation(null);
                this.delayAutoplay(1);
            }

        },
        delayAutoplay : function(delayTime) {
            this.panoViewInternal.delayAutoplay(delayTime);
        }
        ,
        _createVRCursor : function() {
            var cursorObj = {
                width : "27dp",
                height : "27dp",
                clipToBounds : "true",
                gravity : "center",
                children : [
                    {
                        id : "cursorImg",
                        type : "ImageView",
                        width : "wrap",
                        height : "fill",
                        src : cursorImageSrc
                    }
                ]
            }


            this.leftCursor = View.parse(cursorObj);
            this.leftEye.addView(this.leftCursor);

            this.rightCursor = View.parse(cursorObj);
            this.rightEye.addView(this.rightCursor);
        },
        _setCursorProgress : function(progress) {
            if(progress < 0) {
                this.leftCursor.$("cursorImg").setTranslateX(0);
                this.rightCursor.$("cursorImg").setTranslateX(0);
                return;
            }
            var index = Math.floor(15 * progress) + 1;
            var tx = -27*index;
            this.leftCursor.$("cursorImg").setTranslateX(tx);
            this.rightCursor.$("cursorImg").setTranslateX(tx);
        }
        ,
        _startCursorSelect : function() {
            if(this.cursorAnimation) {
                return;
            }
            var self = this;
            this.cursorAnimation = new Animation();
            this.cursorAnimation.duration = 2000;
            this.cursorAnimation.animateFrame = function(view,progress) {
                self._setCursorProgress(progress);
                if(progress >= 1) {
                    self.cursorAnimation = null;
                    if(self.currentCursorMarker) {
                        self.currentCursorMarker.trigerClick();
                    }
                }
            }
            this.cursorAnimation.callback = function() {
                self._setCursorProgress(-1);
                self.cursorAnimation = null;
            }
            this.cursorAnimation.cancelCallback = function() {
                self._setCursorProgress(-1);
                self.cursorAnimation = null;
            }

            this.leftCursor.startAnimation(this.cursorAnimation);
        },
        _cancelCursorSelect : function() {
            this.leftCursor.startAnimation(null);
        }
        ,
        _updateAnnotationsInEye : function(eye) {
            for (var i = 0; i < eye.subViews.length-1 ; i++) {
                var view = eye.subViews[i];
                if(view.panoPitch==null) {
                    view.panoPitch = 0;
                }
                if(view.panoHeading==null) {
                    view.panoHeading = 0;
                }

                var panoPitch = Math.PI * (90 - view.panoPitch) / 180;
                var panoHeading = -1 * ((view.panoHeading + this.panoViewInternal._headingNorthDelta) / 180) * Math.PI;
                var a = new THREE.Euler(panoPitch, 0, panoHeading, 'ZXY');
                var anchorPoint = new THREE.Vector3(0, 0, -200);
                anchorPoint.applyEuler(a);
                anchorPoint.applyMatrix4(this.panoViewInternal.camera.matrixWorldInverse);
                view.setVisible(anchorPoint.z < 0);
                var viewWidth = view.measureWidth();
                var viewHeight = view.measureHeight();
                anchorPoint.applyMatrix4(this.panoViewInternal.camera.projectionMatrix);
                var tx = anchorPoint.x * eye.frame.width / 2 + eye.frame.width / 2;
                var ty = eye.frame.height / 2 - anchorPoint.y * eye.frame.height / 2;
                view.setTranslateX(tx - view.anchorX * viewWidth);
                view.setTranslateY(ty - view.anchorY * viewHeight);
                var gravityPoint = new THREE.Vector3(0, 0, -1);
                gravityPoint.applyMatrix4(this.panoViewInternal.camera.matrixWorldInverse);
                var x = gravityPoint.x;
                var y = gravityPoint.y;
                var z = Math.sqrt(x * x + y * y);
                var angle = (x < 0 ? -1 : 1) * Math.round((Math.asin(y / z) / Math.PI * 180)) + 90 * (x < 0 ? -1 : 1);
                if (!isNaN(angle)) {
                    view.setRotateZ(-angle);
                }
            }
        },
        _updateAnnotations: function () {
            if(this.vrEnable) {
                this._updateAnnotationsInEye(this.leftEye);
                this._updateAnnotationsInEye(this.rightEye);
            } else {
                this._updateAnnotationsInEye(this.leftEye);
            }
        },
        _checkUpdateCursorState : function() {
            if(!this.vrEnable) {
                return;
            }
            var cursorX = this.leftEye.frame.width / 2;
            var cursorY = this.leftEye.frame.height / 2;
            for(var i = 0 ; i < this.leftEye.subViews.length - 1; i++) {
                var marker = this.leftEye.subViews[i];
                var left = marker.translateX;
                var right = left + marker.frame.width;
                var top = marker.translateY;
                var bottom = top + marker.frame.height;
                if(cursorX > left && cursorX < right && cursorY > top && cursorY < bottom && marker.visible) {
                    this._startCursorSelect();
                    this.currentCursorMarker = marker;
                    return marker;
                }
            }
            this._cancelCursorSelect();
            return null;
        },
        _interceptMarker : function(view) {
//            var self = this;
//            view.interceptMethod("setVisible",function(){
//                var ret = this._origin.apply(this,arguments);
//                if(arguments[0]) {
//                    setTimeout(function(){
//                        self._updateAnnotations();
//                    },50);
//                } else {
//                    this.measuredWidth = this.measuredHeight = null;
//                }
//                return ret;
//            })
        }
        ,
        addView : function(view,index) {
            view.setVisible(false);
            this._interceptMarker(view);
            if(index == null) {
                index = this.adaptor.markers.length;
            }
            if(index < this.adaptor.markers.length) {
                var part1 = this.adaptor.markers.slice(0,index);
                var part2 = this.adaptor.markers.slice(index);
                part1.push(view);
                this.adaptor.markers = part1.concat(part2);
            } else {
                this.adaptor.markers.push(view);
            }
            this.notifyDataChanged();
        },
        clearViews : function() {
            this.adaptor.markers.length = 0;
            this.notifyDataChanged();
        },
        removeViewAt : function(index) {
            this.adaptor.markers.splice(index, 1);
            this.notifyDataChanged();
        },
        removeView : function(marker) {
            var index = -1;
            for(var i = 0 ; i < this.adaptor.markers.length; i++) {
                var m = this.adaptor.markers[i];
                if(m == marker) {
                    index = i;
                    break;
                }
            }
            if(index >= 0) {
                this.removeViewAt(index);
            }
        },
        addPatch : function(imageUrl,heading,pitch,width,height) {
            return this.panoViewInternal.addPatch.apply(this.panoViewInternal,arguments);
        },
        removePatch : function(patch) {
            this.panoViewInternal.removePatch(patch);
        }
        ,
        setAdaptor: function(adaptor) {
            this.adaptor = adaptor;
            this.notifyDataChanged();
        },
        notifyDataChanged : function() {
            if(this.adaptor == null) {
                return;
            }
            while(this.leftEye.subViews.length > 1) {
                this.leftEye.removeViewAt(0);
            }
            while(this.rightEye.subViews.length > 1) {
                this.rightEye.removeViewAt(0);
            }
            var count = this.adaptor.getCount();
            for(var i = count -1 ; i>=0; i--) {
                var marker = this.adaptor.getView(i);
                this._interceptMarker(marker);
                this.leftEye.addView(marker,0);
                if(this.vrEnable) {
                    marker = this.adaptor.getView(i);
                    this._interceptMarker(marker);
                    this.rightEye.addView(marker, 0);
                }
            }
            this._updateAnnotations();
        }
        ,
        setPanoId: function (panoId, callback) {
            var self = this;
            this.panoViewInternal.setPanoId(panoId,function(){
                if(callback) {
                    callback.call(self);
                }
                self._updateAnnotations();
            });
        },
        getPanoId: function() {
            return this.panoViewInternal.panoId;
        },
        setHeading : function(heading) {
            this.panoViewInternal.setHeading(heading);
        },
        setFov : function(fov) {
            this.panoViewInternal.setFov(fov);
        },
        getHeading : function() {
            return this.panoViewInternal.getHeading();
        },
        setPitch : function(pitch) {
            this.panoViewInternal.setPitch(pitch);
        },
        getPitch : function() {
            return this.panoViewInternal.getPitch();
        },
        setVREnable : function(enable) {
            this.vrEnable = View.parseBoolean(enable);
            this.panoViewInternal.setVREnable(this.vrEnable);

            if(this.vrEnable) {
                this.leftEye.setWidth("match 0.5");
                this.rightEye.setWidth("match 0.5");
                this.leftCursor.setVisible(true);
            } else {
                this.leftEye.setWidth("match 1");
                this.rightEye.setWidth("0dp");
                this.leftCursor.setVisible(false);
            }

            this.notifyDataChanged();
            this.requestLayout();
            if(window.rootView) {
                window.rootView.resize();
            }
        },
        setAutoplayEnable : function(enable) {
            this.autoplayEnable = View.parseBoolean(enable);
            this.panoViewInternal.setAutoplayEnable(this.autoplayEnable);
        },
        setMouseWheelEnable : function(enable) {
            this.mouseWheelEnable = View.parseBoolean(enable);
        },
        setKeyEnable : function(enable) {
            this.keyEnable = View.parseBoolean(enable);
        },
        setMarkerDragEnable : function(enable) {
            this.panoViewInternal.setMarkerDragEnable(enable);
        }
    });

    var PanoView = com.vizengine.view.PanoView;

    /**
     * @static
     * @method com.vizengine.UPPanoView.getHeadingByLatLon
     * 根据经纬度计算heading
     *
     * @param {number} fromLat 当前全景所在维度
     * @param {number} fromLon 当前全景所在经度
     * @param {number} toLat 计算的点所在维度
     * @param {number} toLon 计算的点所在维度
     *
     */
    PanoView.getHeadingByLatLon = function (fromLat, fromLon, toLat, toLon) {
        var p1 = new LatLon(fromLat, fromLon);
        var p2 = new LatLon(toLat, toLon);
        var angle = p1.bearingTo(p2);
        return angle;
    };

    /**
     * @static
     * @method com.vizengine.UPPanoView.getPitchByLatLon
     * 根据经纬度计算pitch
     *
     * @param {number} fromLat 当前全景所在维度
     * @param {number} fromLon 当前全景所在经度
     * @param {number} toLat 计算的点所在维度
     * @param {number} toLon 计算的点所在维度
     *
     */
    PanoView.getPitchByLatLon = function (fromLat, fromLon, toLat, toLon) {
        var p1 = new LatLon(fromLat, fromLon);
        var p2 = new LatLon(toLat, toLon);
        var distance = p1.distanceTo(p2);
        return Math.atan(3 / distance);
    };


    var EarthEntryAnimation = Animation.extend({
        init: function (view) {
            Animation.prototype.init.apply(this,arguments);
            this.fromAngle = -Math.PI * 3 / 4;
            this.toAngle = 0;
            this.fromX = view.earthCamera.position.x;
            this.fromY = view.earthCamera.position.y;
            this.fromZ = view.earthCamera.position.z;
            this.toX = view.scene.position.x;
            this.toY = view.scene.position.y;
            this.toZ = view.scene.position.z;

            this.lkFromX = 0;
            this.lkFromY = 10000;
            this.lkFromZ = 0;

            this.lkToX = 0;
            this.lkToY = 20000;
            this.lkToZ = 0;

            this.repeatCount = 1;
            this.duration = 6000;

            this.timeInterplator = new DecelerateInterpolator(2);
        },
        animateFrame: function (view, progress) {
            var angle = this.fromAngle + (this.toAngle - this.fromAngle) * progress;
            var x = this.fromX + (this.toX - this.fromX) * progress;
            var y = this.fromY + (this.toY - this.fromY) * progress;
            var z = this.fromZ + (this.toZ - this.fromZ) * progress;

            var lkx = this.lkFromX + (this.lkToX - this.lkFromX) * progress;
            var lky = this.lkFromY + (this.lkToY - this.lkFromY) * progress;
            var lkz = this.lkFromZ + (this.lkToZ - this.lkFromZ) * progress;

            view.setCameraInfo(angle, x, y, z, lkx, lky, lkz);


            var maxBlur = 10;
            var blur = 0;
            var pstart = 0.94;
            var pstop = 1;


            var pcenter = 0.998;

            if (progress < pstart) {
                blur = 0;
            } else if (progress > pstop) {
                blur = 0;
            } else if (progress < pcenter) {
                blur = maxBlur * ((progress - pstart) / (pcenter - pstart));
            } else {
                blur = maxBlur * (pstop - progress) / (pstop - pcenter);
            }

            view._nativeView.div.style.webkitFilter = "blur(" + blur + "px)";
        }
    });

    PanoView.extend("com.vizengine.view.EarthPanoView", {
        init: function () {
            PanoView.prototype.init.apply(this,arguments);
            var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 30000;
            camera.rotation.order = "ZXY";
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            this.earthCamera = camera;
            this.earthScene = new THREE.Scene();
            //this.earthScene.add(this.scene);

            var hangle = 200;
            var vangle = 23;

            var yr = new THREE.Matrix4();
            yr.makeRotationY((hangle / 180) * Math.PI);
            var xr = new THREE.Matrix4();
            xr.makeRotationX((-vangle / 180) * Math.PI);
            yr.multiplyMatrices(yr, xr);
            var b = new THREE.Vector3(0, 0, 20200);
            b.applyMatrix4(yr);

            var rotation = new THREE.Euler();
            rotation.setFromRotationMatrix(yr, "ZXY");

            this.scene.position.x = b.x;
            this.scene.position.y = b.y;
            this.scene.position.z = b.z;
            this.scene.rotation.x = rotation.x;
            this.scene.rotation.y = rotation.y;
            this.scene.rotation.z = rotation.z;

            this.earthCamera.position.x = b.x * 5;
            this.earthCamera.position.y = b.y * 5;
            this.earthCamera.position.z = b.z * 5;


            this.earthScene.add(this.scene);
            this.createEarth();

            this.animation = new EarthEntryAnimation(this);
        },
        setCameraInfo: function (angle, x, y, z, lkx, lky, lkz) {
            var m = new THREE.Matrix4();
            m.makeRotationY(angle);
            var b = new THREE.Vector3(x, y, z);
            b.applyMatrix4(m);
            this.earthCamera.position.x = b.x;
            this.earthCamera.position.y = b.y;
            this.earthCamera.position.z = b.z;
            this.earthCamera.lookAt(new THREE.Vector3(lkx, lky, lkz));
        }
        ,
        createEarth: function () {
            // earth
            var self = this;
            var loader = new THREE.TextureLoader();
            loader.load('earth.jpg', function (texture) {
                var geometry = new THREE.SphereGeometry(20000, 20, 20);
                var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
                var mesh = new THREE.Mesh(geometry, material);
                self.earthScene.add(mesh);
            });
        }
        ,
        dispatchLayout: function () {
            PanoView.prototype.dispatchLayout.apply(this,arguments);
            this.earthCamera.aspect = this.frame.width / this.frame.height;
            this._setFovForCamera(this.earthCamera, this._fov);
            this.earthCamera.near = 1;
            this.earthCamera.far = 400000;
            this.earthCamera.updateProjectionMatrix();
        },
        onDraw: function () {
            PanoView.prototype.init.apply(this,arguments);
            this.renderer.render(this.earthScene, this.earthCamera);
        }
    });

    }
)
