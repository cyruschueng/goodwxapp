define("js/block.js", (require, dataAndEvents, obj) => {
    /**
     * @param {?} dataAndEvents
     * @param {Function} init
     * @return {undefined}
     */
    function animate(dataAndEvents, init) {
        if (!(dataAndEvents instanceof init)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    Object.defineProperty(obj, "__esModule", {
        value: true
    });
    /** @type {function (?): ?} */
    const processJqueryArgs = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? dataAndEvents => typeof dataAndEvents : b => b && ("function" == typeof Symbol && (b.constructor === Symbol && b !== Symbol.prototype)) ? "symbol" : typeof b;
    const make = (() => {
        /**
         * @param {Function} object
         * @param {?} d
         * @return {undefined}
         */
        function defineProperty(object, d) {
            /** @type {number} */
            let i = 0;
            for (; i < d.length; i++) {
                const desc = d[i];
                desc.enumerable = desc.enumerable || false;
                /** @type {boolean} */
                desc.configurable = true;
                if ("value" in desc) {
                    /** @type {boolean} */
                    desc.writable = true;
                }
                Object.defineProperty(object, desc.key, desc);
            }
        }
        return (x, current, a) => (current && defineProperty(x.prototype, current), a && defineProperty(x, a), x);
    })();
    const THREE = (source => {
        if (source && source.__esModule) {
            return source;
        }
        const obj = {};
        if (null != source) {
            let prop;
            for (prop in source) {
                if (Object.prototype.hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj.default = source, obj;
    })(require("./lib/three"));
    const info = require("./config");
    const properties = require("./lib/animation");
    const a = require("./random");
    const other = {
        green: 6393958,
        white: 15658734,
        lightGreen: 8104320,
        gray: 10395294,
        black: 7171437,
        lightGray: 14408667,
        lightBlack: 13355979,
        brown: 6776679,
        middleLightGreen: 125084537,
        middleLightGray: 12303291,
        middleLightBlack: 8947848
    };
    const legMaterial = new THREE.MeshBasicMaterial({
        map: info.loader.load("res/cylinder_shadow.png"),
        transparent: true,
        alphaTest: 0.01
    });
    const markMaterial = new THREE.MeshBasicMaterial({
        map: info.loader.load("res/desk_shadow.png"),
        transparent: true,
        alphaTest: 0.01
    });
    const eyeMaterial = new THREE.MeshBasicMaterial({
        map: info.loader.load("res/shadow.png"),
        transparent: true,
        alphaTest: 0.01
    });
    const charMaterial = new THREE.MeshLambertMaterial({
        map: info.loader.load("res/gray.png")
    });
    const materials = new THREE.MeshLambertMaterial({
        map: info.loader.load("res/number.png"),
        alphaTest: 0.6
    });
    const geometryLightSphere = new THREE.BoxGeometry(2 * info.BLOCK.radius + 0.02, info.BLOCK.height + 0.04, 2 * info.BLOCK.radius + 0.02);
    const three_model = new THREE.BoxGeometry(2 * info.BLOCK.radius, info.BLOCK.height, 2 * info.BLOCK.radius);
    const geo = new THREE.PlaneGeometry(11, 11);
    const YY_START = new THREE.MeshBasicMaterial({
        map: info.loader.load("res/stripe.png")
    });
    const Promise = info.GAME.canShadow ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial;
    const value = (() => {
        /**
         * @param {number} method
         * @param {number} index
         * @return {undefined}
         */
        function init(method, index) {
            const self = this;
            if (animate(this, init), this.radius = info.BLOCK.radius, this.status = "stop", this.scale = 1, this.type = "green", this.types = ["green", "black", "gray"], this.radiusScale = 1, this.obj = new THREE.Object3D, this.obj.name = "block", this.body = new THREE.Object3D, (method <= 8 || 27 == method) && (this.greenMaterial = new THREE.MeshLambertMaterial({
                    color: other.green
                }), this.whiteMaterial = new THREE.MeshLambertMaterial({
                    color: other.white
                })), 32 != method && (33 != method && (34 != method && 35 != method)) || (this.greenMaterial = new THREE.MeshLambertMaterial({
                    color: other.white
                }), this.whiteMaterial = new THREE.MeshLambertMaterial({
                    color: other.gray
                })), this.shadowWidth = 11, 2 == method || 7 == method ? (this.shadow = new THREE.Mesh(geo, markMaterial), this.shadow.position.set(0, -info.BLOCK.height / 2 - 0.001 * method, -4.5), this.shadow.scale.y = 1.2) : 3 == method || (21 == method || (27 == method || (28 == method || 29 == method))) ? (this.shadow = new THREE.Mesh(geo, legMaterial), this.shadow.position.set(-0.1, -info.BLOCK.height / 2 - 0.001 * method, -2.8), this.shadow.scale.y = 1.4, this.shadow.scale.x = 1) : (this.shadow = new THREE.Mesh(geo,
                    eyeMaterial), this.shadow.position.set(-0.74, -info.BLOCK.height / 2 - 0.001 * method, -2.73), this.shadow.scale.y = 1.4), this.shadow.rotation.x = -Math.PI / 2, this.order = method, this.radiusSegments = 4, this.height = info.BLOCK.height, this.canChange = true, 0 == method) {
                /** @type {Array} */
                var name = [this.greenMaterial, this.whiteMaterial];
                var sphere = new THREE.Geometry;
                /** @type {number} */
                var description = 3;
                /** @type {number} */
                var gm = (info.BLOCK.height - description) / 2;
                var re = new THREE.BoxGeometry(2 * info.BLOCK.radius, gm, 2 * info.BLOCK.radius);
                this.geometry = re;
                suite = new THREE.BoxGeometry(2 * info.BLOCK.radius, description, 2 * info.BLOCK.radius);
                this.merge(sphere, re, 0, [{
                    x: 0,
                    y: -description / 2 - gm / 2,
                    z: 0
                }, {
                    x: 0,
                    y: description / 2 + gm / 2,
                    z: 0
                }]);
                this.merge(sphere, suite, 1, [{
                    x: 0,
                    y: 0,
                    z: 0
                }]);
                this.hitObj = new THREE.Mesh(sphere, name);
            } else {
                if (1 == method) {
                    /** @type {Array} */
                    name = [this.greenMaterial, this.whiteMaterial];
                    sphere = new THREE.Geometry;
                    /** @type {number} */
                    var y = info.BLOCK.height / 5;
                    var geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, y, 2 * info.BLOCK.radius);
                    this.geometry = geometry;
                    this.merge(sphere, geometry, 0, [{
                        x: 0,
                        y: 0,
                        z: 0
                    }, {
                        x: 0,
                        y: -2 * y,
                        z: 0
                    }, {
                        x: 0,
                        y: 2 * y,
                        z: 0
                    }]);
                    this.merge(sphere, geometry, 1, [{
                        x: 0,
                        y: -y,
                        z: 0
                    }, {
                        x: 0,
                        y,
                        z: 0
                    }]);
                    this.hitObj = new THREE.Mesh(sphere, name);
                } else {
                    if (2 == method) {
                        /** @type {number} */
                        this.radiusSegments = 50;
                        /** @type {number} */
                        this.height = info.BLOCK.height / 21 * 1.5;
                        /** @type {number} */
                        y = info.BLOCK.height / 21 * 19.5;
                        /** @type {number} */
                        var height = info.BLOCK.height - y;
                        var v = new THREE.CylinderGeometry(info.BLOCK.radius - 4, info.BLOCK.radius - 2, y, 50);
                        var combined = new THREE.CylinderGeometry(info.BLOCK.radius, info.BLOCK.radius, height, 50);
                        var mesh = new THREE.Mesh(combined, this.greenMaterial);
                        /** @type {number} */
                        (d = new THREE.Mesh(v, this.whiteMaterial)).position.y = -info.BLOCK.height / 21 * 10.5;
                        this.body.add(d);
                        this.hitObj = mesh;
                    } else {
                        if (3 == method) {
                            /** @type {number} */
                            this.radiusSegments = 50;
                            this.middleLightGreenMaterial = new THREE.MeshLambertMaterial({
                                color: other.middleLightGreen
                            });
                            /** @type {Array} */
                            name = [this.greenMaterial, this.whiteMaterial, this.middleLightGreenMaterial];
                            sphere = new THREE.Geometry;
                            /** @type {number} */
                            y = 5;
                            /** @type {number} */
                            height = info.BLOCK.height - y;
                            v = new THREE.CylinderGeometry(info.BLOCK.radius, info.BLOCK.radius, y, 50);
                            combined = new THREE.CylinderGeometry(info.BLOCK.radius, info.BLOCK.radius, height, 50);
                            this.geometry = combined;
                            (objectProp = new THREE.RingGeometry(0.6 * info.BLOCK.radius, 0.8 * info.BLOCK.radius, 30)).rotateX(-Math.PI / 2);
                            this.merge(sphere, v, 1, [{
                                x: 0,
                                y: -(info.BLOCK.height - y) / 2,
                                z: 0
                            }]);
                            this.merge(sphere, combined, 0, [{
                                x: 0,
                                y: y + height / 2 - info.BLOCK.height / 2,
                                z: 0
                            }]);
                            this.merge(sphere, objectProp, 2, [{
                                x: 0,
                                y: info.BLOCK.height / 2 + 0.01,
                                z: 0
                            }]);
                            this.hitObj = new THREE.Mesh(sphere, name);
                        } else {
                            if (4 == method) {
                                /** @type {Array} */
                                name = [this.greenMaterial, this.whiteMaterial];
                                sphere = new THREE.Geometry;
                                geometry = three_model;
                                this.geometry = geometry;
                                this.merge(sphere, geometry, 0, [{
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }]);
                                var objectProp = new THREE.RingGeometry(1, 2, 30, 1);
                                this.merge(sphere, objectProp, 1, [{
                                    x: 0,
                                    y: 0,
                                    z: info.BLOCK.radius + 0.01
                                }]);
                                objectProp.rotateY(-Math.PI / 2);
                                this.merge(sphere, objectProp, 1, [{
                                    x: -info.BLOCK.radius - 0.01,
                                    y: 0,
                                    z: 0
                                }]);
                                this.hitObj = new THREE.Mesh(sphere, name);
                            } else {
                                if (5 == method) {
                                    /** @type {Array} */
                                    name = [this.greenMaterial, this.whiteMaterial];
                                    sphere = new THREE.Geometry;
                                    /** @type {number} */
                                    description = 3;
                                    /** @type {number} */
                                    gm = (info.BLOCK.height - description) / 2;
                                    re = new THREE.BoxGeometry(2 * info.BLOCK.radius, gm, 2 * info.BLOCK.radius);
                                    var suite = new THREE.BoxGeometry(2 * info.BLOCK.radius, description, 2 * info.BLOCK.radius);
                                    this.merge(sphere, re, 0, [{
                                        x: 0,
                                        y: -description / 2 - gm / 2,
                                        z: 0
                                    }, {
                                        x: 0,
                                        y: description / 2 + gm / 2,
                                        z: 0
                                    }]);
                                    this.merge(sphere, suite, 1, [{
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    }]);
                                    this.hitObj = new THREE.Mesh(sphere, name);
                                } else {
                                    if (6 == method) {
                                        /** @type {Array} */
                                        name = [this.greenMaterial, this.whiteMaterial];
                                        sphere = new THREE.Geometry;
                                        /** @type {number} */
                                        description = 3;
                                        /** @type {number} */
                                        gm = (info.BLOCK.height - description) / 2;
                                        re = new THREE.BoxGeometry(2 * info.BLOCK.radius, gm, 2 * info.BLOCK.radius);
                                        suite = new THREE.BoxGeometry(2 * info.BLOCK.radius, description, 2 * info.BLOCK.radius);
                                        this.merge(sphere, re, 0, [{
                                            x: 0,
                                            y: -description / 2 - gm / 2,
                                            z: 0
                                        }, {
                                            x: 0,
                                            y: description / 2 + gm / 2,
                                            z: 0
                                        }]);
                                        this.merge(sphere, suite, 1, [{
                                            x: 0,
                                            y: 0,
                                            z: 0
                                        }]);
                                        this.hitObj = new THREE.Mesh(sphere, name);
                                    } else {
                                        if (7 == method) {
                                            /** @type {number} */
                                            this.radiusSegments = 50;
                                            /** @type {number} */
                                            this.height = info.BLOCK.height / 21 * 1.5;
                                            /** @type {number} */
                                            y = info.BLOCK.height / 21 * 19.5;
                                            /** @type {number} */
                                            height = info.BLOCK.height - y;
                                            v = new THREE.CylinderGeometry(info.BLOCK.radius - 4, info.BLOCK.radius - 2, y, 50);
                                            combined = new THREE.CylinderGeometry(info.BLOCK.radius, info.BLOCK.radius, height, 50);
                                            mesh = new THREE.Mesh(combined, this.greenMaterial);
                                            var d = new THREE.Mesh(v, this.whiteMaterial);
                                            /** @type {number} */
                                            d.position.y = -info.BLOCK.height / 21 * 10.5;
                                            this.body.add(d);
                                            this.hitObj = mesh;
                                        } else {
                                            if (8 == method) {
                                                /** @type {Array} */
                                                name = [this.greenMaterial, this.whiteMaterial];
                                                sphere = new THREE.Geometry;
                                                /** @type {number} */
                                                y = info.BLOCK.height / 5;
                                                geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, y, 2 * info.BLOCK.radius);
                                                this.merge(sphere, geometry, 0, [{
                                                    x: 0,
                                                    y: 0,
                                                    z: 0
                                                }, {
                                                    x: 0,
                                                    y: -2 * y,
                                                    z: 0
                                                }, {
                                                    x: 0,
                                                    y: 2 * y,
                                                    z: 0
                                                }]);
                                                this.merge(sphere, geometry, 1, [{
                                                    x: 0,
                                                    y: -y,
                                                    z: 0
                                                }, {
                                                    x: 0,
                                                    y,
                                                    z: 0
                                                }]);
                                                this.hitObj = new THREE.Mesh(sphere, name);
                                            } else {
                                                if (9 == method) {
                                                    /** @type {Array} */
                                                    name = [new THREE.MeshLambertMaterial({
                                                        color: 15563832
                                                    }), material = new THREE.MeshBasicMaterial({
                                                        map: info.loader.load("res/game.png"),
                                                        transparent: true
                                                    })];
                                                    sphere = new THREE.Geometry;
                                                    geometry = three_model;
                                                    this.geometry = geometry;
                                                    this.merge(sphere, geometry, 0, [{
                                                        x: 0,
                                                        y: 0,
                                                        z: 0
                                                    }]);
                                                    this.merge(sphere, new THREE.PlaneGeometry(5, 5), 1, [{
                                                        x: 0,
                                                        y: 0.1,
                                                        z: info.BLOCK.radius + 0.01
                                                    }]);
                                                    this.hitObj = new THREE.Mesh(sphere, name);
                                                } else {
                                                    if (10 == method) {
                                                        /** @type {Array} */
                                                        name = [new THREE.MeshLambertMaterial({
                                                            color: 16508510
                                                        }), material = new THREE.MeshBasicMaterial({
                                                            map: info.loader.load("res/emotion.png"),
                                                            transparent: true
                                                        })];
                                                        sphere = new THREE.Geometry;
                                                        geometry = three_model;
                                                        const sd = new THREE.CylinderGeometry(2, 2, 1, 50);
                                                        var plane = new THREE.PlaneGeometry(1.5, 1.5);
                                                        this.geometry = geometry;
                                                        this.merge(sphere, geometry, 0, [{
                                                            x: 0,
                                                            y: 0,
                                                            z: 0
                                                        }]);
                                                        sd.rotateX(Math.PI / 2);
                                                        this.merge(sphere, sd, 0, [{
                                                            x: 0,
                                                            y: 0,
                                                            z: info.BLOCK.radius + 0.51
                                                        }]);
                                                        sd.rotateZ(Math.PI / 2);
                                                        sd.rotateY(Math.PI / 2);
                                                        this.merge(sphere, sd, 0, [{
                                                            x: -info.BLOCK.radius - 0.51,
                                                            y: 0,
                                                            z: 0
                                                        }]);
                                                        this.merge(sphere, plane, 1, [{
                                                            x: 0,
                                                            y: 0,
                                                            z: info.BLOCK.radius + 1.02
                                                        }]);
                                                        plane.rotateY(-Math.PI / 2);
                                                        this.merge(sphere, plane, 1, [{
                                                            x: -info.BLOCK.radius - 1.02,
                                                            y: 0,
                                                            z: 0
                                                        }]);
                                                        this.hitObj = new THREE.Mesh(sphere, name);
                                                    } else {
                                                        if (11 == method) {
                                                            geometry = three_model;
                                                            var ct = new THREE.BoxGeometry(3, 2, 4);
                                                            this.geometry = geometry;
                                                            var A = new THREE.MeshLambertMaterial({
                                                                color: 11855938
                                                            });
                                                            var material = new THREE.MeshBasicMaterial({
                                                                map: info.loader.load("res/green_face.png"),
                                                                transparent: true
                                                            });
                                                            plane = new THREE.PlaneGeometry(6, 3);
                                                            /** @type {Array} */
                                                            name = [A, material];
                                                            sphere = new THREE.Geometry;
                                                            this.merge(sphere, geometry, 0, [{
                                                                x: 0,
                                                                y: 0,
                                                                z: 0
                                                            }]);
                                                            this.merge(sphere, plane, 1, [{
                                                                x: 0.5,
                                                                y: -1,
                                                                z: info.BLOCK.radius + 0.01
                                                            }]);
                                                            ct.rotateZ(Math.PI / 5);
                                                            this.merge(sphere, ct, 0, [{
                                                                x: -info.BLOCK.radius - 1,
                                                                y: 1,
                                                                z: 2.5
                                                            }]);
                                                            ct.rotateZ(-2 * Math.PI / 5);
                                                            this.merge(sphere, ct, 0, [{
                                                                x: info.BLOCK.radius,
                                                                y: 1,
                                                                z: 2.5
                                                            }]);
                                                            this.hitObj = new THREE.Mesh(sphere, name);
                                                        } else {
                                                            if (12 == method) {
                                                                geometry = three_model;
                                                                ct = new THREE.BoxGeometry(3, 2, 4);
                                                                this.geometry = geometry;
                                                                A = new THREE.MeshLambertMaterial({
                                                                    color: 15921906
                                                                });
                                                                material = new THREE.MeshLambertMaterial({
                                                                    map: info.loader.load("res/white_face.png")
                                                                });
                                                                plane = new THREE.PlaneGeometry(6, 3);
                                                                /** @type {Array} */
                                                                name = [A, material];
                                                                sphere = new THREE.Geometry;
                                                                this.merge(sphere, geometry, 0, [{
                                                                    x: 0,
                                                                    y: 0,
                                                                    z: 0
                                                                }]);
                                                                this.merge(sphere, plane, 1, [{
                                                                    x: 0.5,
                                                                    y: -1,
                                                                    z: info.BLOCK.radius + 0.01
                                                                }]);
                                                                ct.rotateZ(Math.PI / 5);
                                                                this.merge(sphere, ct, 0, [{
                                                                    x: -info.BLOCK.radius - 1,
                                                                    y: 1,
                                                                    z: 2.5
                                                                }]);
                                                                ct.rotateZ(-2 * Math.PI / 5);
                                                                this.merge(sphere, ct, 0, [{
                                                                    x: info.BLOCK.radius,
                                                                    y: 1,
                                                                    z: 2.5
                                                                }]);
                                                                this.hitObj = new THREE.Mesh(sphere, name);
                                                            } else {
                                                                if (13 == method) {
                                                                    geometry = three_model;
                                                                    this.geometry = geometry;
                                                                    material = new THREE.MeshLambertMaterial({
                                                                        map: info.loader.load("res/money.png")
                                                                    });
                                                                    plane = new THREE.PlaneGeometry(3, 3);
                                                                    /** @type {Array} */
                                                                    name = [material];
                                                                    sphere = new THREE.Geometry;
                                                                    this.mapUv(64, 64, geometry, 1, 2, 2, 4, 4);
                                                                    this.mapUv(64, 64, geometry, 2, 2, 2, 4, 4);
                                                                    this.mapUv(64, 64, geometry, 4, 2, 2, 4, 4);
                                                                    this.merge(sphere, geometry, 0, [{
                                                                        x: 0,
                                                                        y: 0,
                                                                        z: 0
                                                                    }]);
                                                                    this.merge(sphere, plane, 0, [{
                                                                        x: 0,
                                                                        y: 0,
                                                                        z: info.BLOCK.radius + 0.01
                                                                    }]);
                                                                    this.hitObj = new THREE.Mesh(sphere, name);
                                                                } else {
                                                                    if (14 == method) {
                                                                        geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                        this.geometry = geometry;
                                                                        cubeMaterial = new THREE.MeshLambertMaterial({
                                                                            map: info.loader.load("res/tit.png")
                                                                        });
                                                                        this.mapUv(310, 310, geometry, 1, 0, 0, 200, 110);
                                                                        this.mapUv(310, 310, geometry, 2, 0, 110, 200, 310);
                                                                        this.mapUv(310, 310, geometry, 4, 200, 110, 310, 310);
                                                                        this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                    } else {
                                                                        if (15 == method) {
                                                                            geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                            this.map = info.loader.load("res/bag.png");
                                                                            cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                map: this.map
                                                                            });
                                                                            this.glowMap = info.loader.load("res/glow_bag.png");
                                                                            this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                            this.whenSucceed = this.glow;
                                                                            this.beforePopup = this.hideGlow;
                                                                            /** @type {number} */
                                                                            this.score = 20;
                                                                        } else {
                                                                            if (16 == method) {
                                                                                geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                var cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                    map: info.loader.load("res/dict.png")
                                                                                });
                                                                                this.mapUv(428, 428, geometry, 1, 0, 148, 280, 0);
                                                                                this.mapUv(428, 428, geometry, 2, 0, 148, 280, 428);
                                                                                this.mapUv(428, 428, geometry, 4, 280, 148, 428, 428);
                                                                                this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                            } else {
                                                                                if (17 == method) {
                                                                                    this.height /= 3;
                                                                                    const key = new THREE.MeshLambertMaterial({
                                                                                        map: info.loader.load("res/box_top.png")
                                                                                    });
                                                                                    var camel = new THREE.MeshLambertMaterial({
                                                                                        map: info.loader.load("res/box_bottom.png")
                                                                                    });
                                                                                    geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                    this.geometry = geometry;
                                                                                    var data = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                    /** @type {Array} */
                                                                                    name = [key, camel];
                                                                                    sphere = new THREE.Geometry;
                                                                                    this.mapUv(198, 198, geometry, 1, 0, 0, 148, 50);
                                                                                    this.mapUv(198, 198, geometry, 2, 0, 50, 148, 198);
                                                                                    this.mapUv(198, 198, geometry, 4, 148, 50, 198, 198);
                                                                                    this.mapUv(444, 50, data, 4, 148, 0, 296, 50, true);
                                                                                    this.mapUv(444, 50, data, 1, 0, 0, 148, 50);
                                                                                    this.mapUv(444, 50, data, 2, 0, 0, 1, 1);
                                                                                    this.mapUv(444, 50, data, 0, 296, 50, 444, 0);
                                                                                    this.merge(sphere, geometry, 0, [{
                                                                                        x: 0,
                                                                                        y: 0,
                                                                                        z: 0
                                                                                    }]);
                                                                                    this.merge(sphere, data, 1, [{
                                                                                        x: 0,
                                                                                        y: -2 * this.height,
                                                                                        z: 0
                                                                                    }]);
                                                                                    const robotBaseMaterial = new THREE.MeshLambertMaterial({
                                                                                        map: info.loader.load("res/box_middle.png")
                                                                                    });
                                                                                    this.middle = new THREE.Mesh(data, robotBaseMaterial);
                                                                                    /** @type {number} */
                                                                                    this.middle.position.y = -this.height;
                                                                                    this.body.add(this.middle);
                                                                                    this.hitObj = new THREE.Mesh(sphere, name);
                                                                                    this.succeedTimer = this.rotateBox;
                                                                                    /** @type {number} */
                                                                                    this.score = 10;
                                                                                } else {
                                                                                    if (18 == method) {
                                                                                        geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                        cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                            map: info.loader.load("res/express.png")
                                                                                        });
                                                                                        this.mapUv(428, 428, geometry, 1, 0, 0, 280, 148);
                                                                                        this.mapUv(428, 428, geometry, 2, 0, 148, 280, 428);
                                                                                        this.mapUv(428, 428, geometry, 4, 280, 148, 428, 428);
                                                                                        this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                                    } else {
                                                                                        if (19 == method) {
                                                                                            /** @type {number} */
                                                                                            this.min = 0.9;
                                                                                            /** @type {number} */
                                                                                            this.height = info.BLOCK.height / 21 * 4;
                                                                                            geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height + 0.1, 2 * info.BLOCK.radius);
                                                                                            this.geometry = geometry;
                                                                                            cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                color: 16777215,
                                                                                                transparent: true,
                                                                                                opacity: 0.3
                                                                                            });
                                                                                            v = new THREE.BoxGeometry(2.05 * info.BLOCK.radius, info.BLOCK.height / 21 * 17, 2.05 * info.BLOCK.radius);
                                                                                            /** @type {Array} */
                                                                                            name = [cubeMaterial, camel = new THREE.MeshBasicMaterial({
                                                                                                map: info.loader.load("res/sing.png")
                                                                                            })];
                                                                                            sphere = new THREE.Geometry;
                                                                                            this.mapUv(416, 416, v, 1, 0, 0, 256, 160);
                                                                                            this.mapUv(416, 416, v, 2, 0, 160, 256, 416);
                                                                                            this.mapUv(416, 416, v, 4, 256, 160, 416, 416);
                                                                                            this.merge(sphere, geometry, 0, [{
                                                                                                x: 0,
                                                                                                y: 0,
                                                                                                z: 0
                                                                                            }]);
                                                                                            this.merge(sphere, v, 1, [{
                                                                                                x: 0,
                                                                                                y: -info.BLOCK.height / 21 * 10.5,
                                                                                                z: 0
                                                                                            }]);
                                                                                            this.hitObj = new THREE.Mesh(sphere, name);
                                                                                            this.record = new THREE.Object3D;
                                                                                            this.record.add(new THREE.Mesh(new THREE.CylinderGeometry(0.9 * info.BLOCK.radius, 0.9 * info.BLOCK.radius, 0.4, 50), new THREE.MeshBasicMaterial({
                                                                                                color: 2894892
                                                                                            })));
                                                                                            plane = new THREE.CircleGeometry(0.9 * info.BLOCK.radius, 40);
                                                                                            material = new THREE.MeshBasicMaterial({
                                                                                                map: info.loader.load("res/record.png")
                                                                                            });
                                                                                            /** @type {number} */
                                                                                            (object = new THREE.Mesh(plane, material)).rotation.x = -Math.PI / 2;
                                                                                            /** @type {number} */
                                                                                            object.position.y = 0.26;
                                                                                            this.record.add(object);
                                                                                            this.body.add(this.record);
                                                                                            plane = new THREE.PlaneGeometry(2, 2);
                                                                                            this.musicIcon = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
                                                                                                map: info.loader.load("res/music_icon.png"),
                                                                                                transparent: true
                                                                                            }));
                                                                                            this.musicIcon.position.set(0, 0, 0);
                                                                                            /** @type {number} */
                                                                                            this.musicIcon.rotation.y = -Math.PI / 4;
                                                                                            /** @type {number} */
                                                                                            this.musicIcon.rotation.x = -Math.PI / 5;
                                                                                            /** @type {number} */
                                                                                            this.musicIcon.rotation.z = -Math.PI / 5;
                                                                                            /** @type {boolean} */
                                                                                            this.musicIcon.visible = false;
                                                                                            this.secondMusicIcon = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
                                                                                                map: info.loader.load("res/music_icon_two.png"),
                                                                                                transparent: true
                                                                                            }));
                                                                                            /** @type {number} */
                                                                                            this.secondMusicIcon.rotation.y = -Math.PI / 4;
                                                                                            /** @type {number} */
                                                                                            this.secondMusicIcon.rotation.x = -Math.PI / 5;
                                                                                            /** @type {number} */
                                                                                            this.secondMusicIcon.rotation.z = -Math.PI / 5;
                                                                                            /** @type {boolean} */
                                                                                            this.secondMusicIcon.visible = false;
                                                                                            /** @type {Array} */
                                                                                            this.icons = [];
                                                                                            this.icons.push(this.musicIcon, this.secondMusicIcon);
                                                                                            /** @type {number} */
                                                                                            i = 0;
                                                                                            for (; i < 2; ++i) {
                                                                                                this.body.add(this.icons[i]);
                                                                                            }
                                                                                            this.succeedTimer = this.playMusic;
                                                                                            /** @type {number} */
                                                                                            this.score = 30;
                                                                                            /** @type {string} */
                                                                                            this.musicName = "sing";
                                                                                            /**
                                                                                             * @return {undefined}
                                                                                             */
                                                                                            this.perFrame = () => {
                                                                                                self.record.rotation.y += 0.01;
                                                                                            };
                                                                                            /**
                                                                                             * @return {undefined}
                                                                                             */
                                                                                            this.whenLeave = () => {
                                                                                                self.stopMusic();
                                                                                            };
                                                                                        } else {
                                                                                            if (20 == method) {
                                                                                                geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius / 38 * 48);
                                                                                                this.geometry = geometry;
                                                                                                this.shadow.scale.set(1, 61 / 38, 48 / 38);
                                                                                                cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                    map: info.loader.load("res/disk.png")
                                                                                                });
                                                                                                var blockMaterial = new THREE.MeshBasicMaterial({
                                                                                                    map: info.loader.load("res/disk_dark.png"),
                                                                                                    transparent: true
                                                                                                });
                                                                                                plane = new THREE.PlaneGeometry(3, 3);
                                                                                                /** @type {Array} */
                                                                                                name = [blockMaterial, cubeMaterial];
                                                                                                sphere = new THREE.Geometry;
                                                                                                this.mapUv(236, 300, geometry, 1, 0, 250, 10, 260);
                                                                                                this.mapUv(236, 300, geometry, 2, 0, 300, 236, 0);
                                                                                                this.mapUv(236, 300, geometry, 4, 0, 250, 10, 260);
                                                                                                this.merge(sphere, geometry, 1, [{
                                                                                                    x: 0,
                                                                                                    y: 0,
                                                                                                    z: 0
                                                                                                }]);
                                                                                                this.merge(sphere, plane, 0, [{
                                                                                                    x: 3.5,
                                                                                                    y: 0.5,
                                                                                                    z: info.BLOCK.radius / 38 * 48 + 0.01
                                                                                                }]);
                                                                                                this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                this.plane = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
                                                                                                    map: info.loader.load("res/disk_light.png"),
                                                                                                    transparent: true
                                                                                                }));
                                                                                                this.plane.position.set(3.5, 0.5, info.BLOCK.radius / 38 * 48 + 0.03);
                                                                                                this.plane.updateMatrix();
                                                                                                /** @type {boolean} */
                                                                                                this.plane.matrixAutoUpdate = false;
                                                                                                this.body.add(this.plane);
                                                                                                /** @type {number} */
                                                                                                this.timer = setInterval(() => {
                                                                                                    /** @type {boolean} */
                                                                                                    self.plane.visible = !self.plane.visible;
                                                                                                }, 1E3);
                                                                                            } else {
                                                                                                if (21 == method) {
                                                                                                    /** @type {number} */
                                                                                                    this.radiusSegments = 50;
                                                                                                    /** @type {number} */
                                                                                                    this.min = 0.8;
                                                                                                    /** @type {number} */
                                                                                                    this.height = info.BLOCK.height / 21 * 4;
                                                                                                    geometry = new THREE.CylinderGeometry(0.7 * info.BLOCK.radius, 0.8 * info.BLOCK.radius, this.height, 50);
                                                                                                    this.geometry = geometry;
                                                                                                    plane = new THREE.CircleGeometry(0.7 * info.BLOCK.radius, 50);
                                                                                                    v = new THREE.CylinderGeometry(0.7 * info.BLOCK.radius, 0.5 * info.BLOCK.radius, info.BLOCK.height / 21 * 17, 50);
                                                                                                    cubeMaterial = new THREE.MeshBasicMaterial({
                                                                                                        color: 5066061
                                                                                                    });
                                                                                                    material = new THREE.MeshLambertMaterial({
                                                                                                        map: info.loader.load("res/westore_desk.png")
                                                                                                    });
                                                                                                    camel = new THREE.MeshBasicMaterial({
                                                                                                        map: info.loader.load("res/westore.png")
                                                                                                    });
                                                                                                    this.shadow.scale.set(0.55, 0.9, 0.7);
                                                                                                    /** @type {Array} */
                                                                                                    name = [cubeMaterial, camel, material];
                                                                                                    sphere = new THREE.Geometry;
                                                                                                    this.merge(sphere, geometry, 0, [{
                                                                                                        x: 0,
                                                                                                        y: 0,
                                                                                                        z: 0
                                                                                                    }]);
                                                                                                    v.rotateY(2.3);
                                                                                                    this.merge(sphere, v, 1, [{
                                                                                                        x: 0,
                                                                                                        y: -info.BLOCK.height / 21 * 10.5,
                                                                                                        z: 0
                                                                                                    }]);
                                                                                                    plane.rotateX(-Math.PI / 2);
                                                                                                    plane.rotateY(-0.7);
                                                                                                    this.merge(sphere, plane, 2, [{
                                                                                                        x: 0,
                                                                                                        y: this.height / 2 + 0.01,
                                                                                                        z: 0
                                                                                                    }]);
                                                                                                    this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                } else {
                                                                                                    if (22 == method) {
                                                                                                        /** @type {number} */
                                                                                                        this.height = info.BLOCK.height / 21 * 6;
                                                                                                        geometry = new THREE.BoxGeometry(2.1 * info.BLOCK.radius, this.height, 2.1 * info.BLOCK.radius);
                                                                                                        this.geometry = geometry;
                                                                                                        cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                            map: info.loader.load("res/gift.png")
                                                                                                        });
                                                                                                        v = new THREE.BoxGeometry(2 * info.BLOCK.radius, info.BLOCK.height / 21 * 15, 2 * info.BLOCK.radius);
                                                                                                        camel = new THREE.MeshLambertMaterial({
                                                                                                            color: 11637749
                                                                                                        });
                                                                                                        this.mapUv(300, 370, geometry, 1, 0, 0, 300, 70);
                                                                                                        this.mapUv(300, 370, geometry, 2, 0, 70, 300, 370);
                                                                                                        this.mapUv(300, 370, geometry, 4, 0, 0, 300, 70, true);
                                                                                                        /** @type {Array} */
                                                                                                        name = [cubeMaterial, camel];
                                                                                                        sphere = new THREE.Geometry;
                                                                                                        this.merge(sphere, geometry, 0, [{
                                                                                                            x: 0,
                                                                                                            y: 0,
                                                                                                            z: 0
                                                                                                        }]);
                                                                                                        this.merge(sphere, v, 1, [{
                                                                                                            x: 0,
                                                                                                            y: -info.BLOCK.height / 21 * 10.5,
                                                                                                            z: 0
                                                                                                        }]);
                                                                                                        this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                    } else {
                                                                                                        if (23 == method) {
                                                                                                            /** @type {number} */
                                                                                                            this.height = info.BLOCK.height / 21 * 5;
                                                                                                            geometry = new THREE.Geometry;
                                                                                                            const scripts = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius / 38 * 40);
                                                                                                            geometry.merge(scripts);
                                                                                                            this.shadow.scale.set(1, 48 / 38, 48 / 38);
                                                                                                            const target = new THREE.BoxGeometry(1.5, 3.5, 1.5);
                                                                                                            target.rotateZ(-0.3);
                                                                                                            target.vertices[7].y -= 0.4;
                                                                                                            target.vertices[6].y -= 0.4;
                                                                                                            target.translate(-4, -3, -3.5);
                                                                                                            geometry.merge(target);
                                                                                                            target.vertices[6].y += 0.5;
                                                                                                            target.translate(0, 0, 7);
                                                                                                            target.rotateX(-0.2);
                                                                                                            geometry.merge(target);
                                                                                                            target.vertices[7].y += 0.4;
                                                                                                            target.translate(5, -1, 0);
                                                                                                            target.rotateZ(0.4);
                                                                                                            geometry.merge(target);
                                                                                                            cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                map: info.loader.load("res/stool.png")
                                                                                                            });
                                                                                                            this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                                                            this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(this.shadowWidth, this.shadowWidth), new THREE.MeshBasicMaterial({
                                                                                                                map: info.loader.load("res/stool_shadow.png"),
                                                                                                                transparent: true,
                                                                                                                alphaTest: 0.01
                                                                                                            }));
                                                                                                            this.shadow.position.set(-0.76, -info.BLOCK.height / 2 - 0.001 * method, -3.6);
                                                                                                            /** @type {number} */
                                                                                                            this.shadow.scale.y = 1.4;
                                                                                                            /** @type {number} */
                                                                                                            this.shadow.scale.x = 0.9;
                                                                                                            /** @type {number} */
                                                                                                            this.shadow.rotation.x = -Math.PI / 2;
                                                                                                        } else {
                                                                                                            if (24 == method) {
                                                                                                                /** @type {number} */
                                                                                                                this.height = info.BLOCK.height / 21 * 6;
                                                                                                                geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius / 38 * 45, this.height, 2 * info.BLOCK.radius / 38 * 45);
                                                                                                                this.geometry = geometry;
                                                                                                                v = new THREE.BoxGeometry(2 * info.BLOCK.radius / 38 * 40, info.BLOCK.height / 21 * 15, 2 * info.BLOCK.radius / 38 * 40);
                                                                                                                this.shadow.scale.set(40 / 38, 1.4, 1);
                                                                                                                /** @type {Array} */
                                                                                                                name = [cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                    map: info.loader.load("res/store_top.png")
                                                                                                                }), camel = new THREE.MeshBasicMaterial({
                                                                                                                    map: info.loader.load("res/store_bottom.png"),
                                                                                                                    transparent: true
                                                                                                                }), material = new THREE.MeshBasicMaterial({
                                                                                                                    map: info.loader.load("res/indoor.png"),
                                                                                                                    transparent: true
                                                                                                                })];
                                                                                                                plane = new THREE.PlaneGeometry(3.1, 3.1);
                                                                                                                sphere = new THREE.Geometry;
                                                                                                                this.mapUv(340, 340, geometry, 1, 0, 0, 280, 60);
                                                                                                                this.mapUv(340, 340, geometry, 2, 0, 60, 280, 340);
                                                                                                                this.mapUv(340, 340, geometry, 4, 280, 60, 340, 340);
                                                                                                                this.merge(sphere, geometry, 0, [{
                                                                                                                    x: 0,
                                                                                                                    y: 0,
                                                                                                                    z: 0
                                                                                                                }]);
                                                                                                                this.mapUv(434, 164, v, 1, 0, 0, 217, 164);
                                                                                                                this.mapUv(434, 164, v, 4, 217, 0, 434, 164, true);
                                                                                                                this.merge(sphere, v, 1, [{
                                                                                                                    x: 0,
                                                                                                                    y: -info.BLOCK.height / 21 * 10.5,
                                                                                                                    z: 0
                                                                                                                }]);
                                                                                                                plane.rotateY(-Math.PI / 2);
                                                                                                                this.merge(sphere, plane, 2, [{
                                                                                                                    x: -info.BLOCK.radius / 38 * 40 - 0.01,
                                                                                                                    y: -3.3,
                                                                                                                    z: -2.5
                                                                                                                }]);
                                                                                                                this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                beamGeometry = new THREE.PlaneGeometry(1.55, 3.1);
                                                                                                                this.door = new THREE.Mesh(beamGeometry, new THREE.MeshBasicMaterial({
                                                                                                                    map: info.loader.load("res/door.png"),
                                                                                                                    transparent: true
                                                                                                                }));
                                                                                                                /** @type {number} */
                                                                                                                this.door.rotation.y = -Math.PI / 2;
                                                                                                                this.door.position.set(-info.BLOCK.radius / 38 * 40 - 0.02, -3.3, -3.3);
                                                                                                                this.body.add(this.door);
                                                                                                                this.secondDoor = new THREE.Mesh(beamGeometry, new THREE.MeshBasicMaterial({
                                                                                                                    map: info.loader.load("res/second_door.png"),
                                                                                                                    transparent: true
                                                                                                                }));
                                                                                                                /** @type {number} */
                                                                                                                this.secondDoor.rotation.y = -Math.PI / 2;
                                                                                                                this.secondDoor.position.set(-info.BLOCK.radius / 38 * 40 - 0.02, -3.3, -1.7);
                                                                                                                this.body.add(this.secondDoor);
                                                                                                                /** @type {number} */
                                                                                                                this.score = 15;
                                                                                                            } else {
                                                                                                                if (25 == method) {
                                                                                                                    geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                                                    this.geometry = geometry;
                                                                                                                    cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                        map: info.loader.load("res/clock.png")
                                                                                                                    });
                                                                                                                    this.mapUv(320, 200, geometry, 1, 0, 0, 5, 5);
                                                                                                                    this.mapUv(320, 200, geometry, 2, 0, 0, 5, 5);
                                                                                                                    this.mapUv(320, 200, geometry, 4, 0, 200, 320, 0, true);
                                                                                                                    const YYSTATE = YY_START;
                                                                                                                    const r20 = new THREE.CylinderGeometry(1, 1, 1, 30);
                                                                                                                    /** @type {Array} */
                                                                                                                    name = [cubeMaterial, YYSTATE];
                                                                                                                    sphere = new THREE.Geometry;
                                                                                                                    this.merge(sphere, geometry, 0, [{
                                                                                                                        x: 0,
                                                                                                                        y: 0,
                                                                                                                        z: 0
                                                                                                                    }]);
                                                                                                                    r20.rotateZ(Math.PI / 2);
                                                                                                                    this.merge(sphere, r20, 1, [{
                                                                                                                        x: -info.BLOCK.radius - 0.5,
                                                                                                                        y: 0,
                                                                                                                        z: 0
                                                                                                                    }]);
                                                                                                                    this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({
                                                                                                                        map: info.loader.load("res/point.png"),
                                                                                                                        transparent: true
                                                                                                                    }));
                                                                                                                    this.plane.position.set(0, 0, info.BLOCK.radius + 0.04);
                                                                                                                    this.body.add(this.plane);
                                                                                                                    /** @type {number} */
                                                                                                                    this.timer = setInterval(() => {
                                                                                                                        /** @type {boolean} */
                                                                                                                        self.plane.visible = !self.plane.visible;
                                                                                                                    }, 1E3);
                                                                                                                    /** @type {Array} */
                                                                                                                    this.numbers = [];
                                                                                                                    const coneGeometry = new THREE.PlaneGeometry(3, 3);
                                                                                                                    /** @type {number} */
                                                                                                                    var i = 0;
                                                                                                                    for (; i < 10; ++i) {
                                                                                                                        const sphereMaterial = new THREE.MeshBasicMaterial({
                                                                                                                            map: info.loader.load(`res/${i}.png`),
                                                                                                                            alphaTest: 0.5
                                                                                                                        });
                                                                                                                        /** @type {Array} */
                                                                                                                        const copies = [];
                                                                                                                        /** @type {number} */
                                                                                                                        let $ = 0;
                                                                                                                        for (; $ < 4; ++$) {
                                                                                                                            const s = new THREE.Mesh(coneGeometry, sphereMaterial);
                                                                                                                            s.position.z = info.BLOCK.radius + 0.01;
                                                                                                                            /** @type {boolean} */
                                                                                                                            s.visible = false;
                                                                                                                            copies.push(s);
                                                                                                                            this.body.add(s);
                                                                                                                        }
                                                                                                                        this.numbers.push(copies);
                                                                                                                    }
                                                                                                                    /** @type {Date} */
                                                                                                                    const now = new Date;
                                                                                                                    /** @type {string} */
                                                                                                                    const numbers = (`0${now.getHours()}`).slice(-2);
                                                                                                                    /** @type {string} */
                                                                                                                    const se = (`0${now.getMinutes()}`).slice(-2);
                                                                                                                    /** @type {number} */
                                                                                                                    this.numbers[numbers[0]][0].position.x = -3.2 * this.radiusScale;
                                                                                                                    /** @type {boolean} */
                                                                                                                    this.numbers[numbers[0]][0].visible = true;
                                                                                                                    /** @type {number} */
                                                                                                                    this.numbers[numbers[1]][1].position.x = -1.3 * this.radiusScale;
                                                                                                                    /** @type {boolean} */
                                                                                                                    this.numbers[numbers[1]][1].visible = true;
                                                                                                                    /** @type {number} */
                                                                                                                    this.numbers[se[0]][2].position.x = 1.3 * this.radiusScale;
                                                                                                                    /** @type {boolean} */
                                                                                                                    this.numbers[se[0]][2].visible = true;
                                                                                                                    /** @type {number} */
                                                                                                                    this.numbers[se[1]][3].position.x = 3.2 * this.radiusScale;
                                                                                                                    /** @type {boolean} */
                                                                                                                    this.numbers[se[1]][3].visible = true;
                                                                                                                } else {
                                                                                                                    if (26 == method) {
                                                                                                                        geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                                                        cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                            map: info.loader.load("res/well.png")
                                                                                                                        });
                                                                                                                        this.mapUv(280, 428, geometry, 1, 0, 0, 280, 148);
                                                                                                                        this.mapUv(280, 428, geometry, 2, 0, 148, 280, 428);
                                                                                                                        this.mapUv(280, 428, geometry, 4, 0, 0, 280, 148, true);
                                                                                                                        this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                                                                        /** @type {number} */
                                                                                                                        this.score = 5;
                                                                                                                    } else {
                                                                                                                        if (27 == method) {
                                                                                                                            /** @type {number} */
                                                                                                                            this.radiusSegments = 50;
                                                                                                                            geometry = new THREE.CylinderGeometry(2 * info.BLOCK.radius / 38 * 25, 2 * info.BLOCK.radius / 38 * 25, this.height, 50);
                                                                                                                            this.geometry = geometry;
                                                                                                                            this.shadow.scale.set(50 / 38, 50 / 38, 50 / 38);
                                                                                                                            cubeMaterial = new THREE.MeshBasicMaterial({
                                                                                                                                map: info.loader.load("res/golf_bottom.png")
                                                                                                                            });
                                                                                                                            plane = new THREE.CircleGeometry(2 * info.BLOCK.radius / 38 * 25 + 0.01, 30);
                                                                                                                            material = new Promise({
                                                                                                                                map: info.loader.load("res/golf_top.png")
                                                                                                                            });
                                                                                                                            sphere = new THREE.Geometry;
                                                                                                                            /** @type {Array} */
                                                                                                                            name = [cubeMaterial, material];
                                                                                                                            geometry.rotateY(3);
                                                                                                                            this.merge(sphere, geometry, 0, [{
                                                                                                                                x: 0,
                                                                                                                                y: 0,
                                                                                                                                z: 0
                                                                                                                            }]);
                                                                                                                            plane.rotateX(-Math.PI / 2);
                                                                                                                            plane.rotateY(-0.7);
                                                                                                                            this.merge(sphere, plane, 1, [{
                                                                                                                                x: 0,
                                                                                                                                y: this.height / 2 + 0.01,
                                                                                                                                z: 0
                                                                                                                            }]);
                                                                                                                            this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                            this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 10), this.whiteMaterial);
                                                                                                                            this.sphere.position.set(-8, -1, -1.5);
                                                                                                                            this.obj.add(this.sphere);
                                                                                                                            const body = new THREE.Mesh(new THREE.PlaneGeometry(2, 5), new THREE.MeshBasicMaterial({
                                                                                                                                map: info.loader.load("res/flag.png"),
                                                                                                                                transparent: true
                                                                                                                            }));
                                                                                                                            this.body.add(body);
                                                                                                                            body.position.set(-4.4, 5, -4.3);
                                                                                                                            /** @type {number} */
                                                                                                                            body.rotation.y = -Math.PI / 4;
                                                                                                                            /** @type {number} */
                                                                                                                            body.rotation.x = -0.928;
                                                                                                                            /** @type {number} */
                                                                                                                            body.rotation.z = -Math.PI / 5;
                                                                                                                        } else {
                                                                                                                            if (28 == method) {
                                                                                                                                /** @type {number} */
                                                                                                                                this.radiusSegments = 50;
                                                                                                                                geometry = new THREE.CylinderGeometry(2 * info.BLOCK.radius / 38 * 15, 2 * info.BLOCK.radius / 38 * 15, this.height, 50);
                                                                                                                                this.geometry = geometry;
                                                                                                                                this.shadow.scale.set(30 / 38, 30 / 38, 30 / 38);
                                                                                                                                cubeMaterial = new THREE.MeshBasicMaterial({
                                                                                                                                    map: info.loader.load("res/paper_bottom.png")
                                                                                                                                });
                                                                                                                                plane = new THREE.CircleGeometry(2 * info.BLOCK.radius / 38 * 15 + 0.01, 30);
                                                                                                                                material = new Promise({
                                                                                                                                    map: info.loader.load("res/paper_top.png")
                                                                                                                                });
                                                                                                                                sphere = new THREE.Geometry;
                                                                                                                                /** @type {Array} */
                                                                                                                                name = [cubeMaterial, material];
                                                                                                                                geometry.rotateY(4);
                                                                                                                                this.merge(sphere, geometry, 0, [{
                                                                                                                                    x: 0,
                                                                                                                                    y: 0,
                                                                                                                                    z: 0
                                                                                                                                }]);
                                                                                                                                plane.rotateX(-Math.PI / 2);
                                                                                                                                plane.rotateY(-0.7);
                                                                                                                                this.merge(sphere, plane, 1, [{
                                                                                                                                    x: 0,
                                                                                                                                    y: this.height / 2 + 0.01,
                                                                                                                                    z: 0
                                                                                                                                }]);
                                                                                                                                /** @type {number} */
                                                                                                                                this.shadow.scale.y = 1.1;
                                                                                                                                this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                            } else {
                                                                                                                                if (29 == method) {
                                                                                                                                    /** @type {number} */
                                                                                                                                    this.radiusSegments = 50;
                                                                                                                                    /** @type {number} */
                                                                                                                                    this.min = 0.8;
                                                                                                                                    /** @type {number} */
                                                                                                                                    this.height = info.BLOCK.height / 21 * 4;
                                                                                                                                    geometry = new THREE.CylinderGeometry(0.4 * info.BLOCK.radius, 0.4 * info.BLOCK.radius, this.height, 50);
                                                                                                                                    this.geometry = geometry;
                                                                                                                                    cubeMaterial = YY_START;
                                                                                                                                    plane = new THREE.CircleGeometry(0.4 * info.BLOCK.radius, 50);
                                                                                                                                    material = new THREE.MeshBasicMaterial({
                                                                                                                                        color: 16777215
                                                                                                                                    });
                                                                                                                                    data = new THREE.CylinderGeometry(0.4 * info.BLOCK.radius, 0.5 * info.BLOCK.radius, info.BLOCK.height / 21 * 1, 50);
                                                                                                                                    v = new THREE.CylinderGeometry(0.5 * info.BLOCK.radius, 0.5 * info.BLOCK.radius, info.BLOCK.height / 21 * 16, 50);
                                                                                                                                    camel = new THREE.MeshBasicMaterial({
                                                                                                                                        map: info.loader.load("res/medicine.png")
                                                                                                                                    });
                                                                                                                                    sphere = new THREE.Geometry;
                                                                                                                                    /** @type {Array} */
                                                                                                                                    name = [cubeMaterial, material, camel];
                                                                                                                                    this.merge(sphere, geometry, 0, [{
                                                                                                                                        x: 0,
                                                                                                                                        y: 0,
                                                                                                                                        z: 0
                                                                                                                                    }]);
                                                                                                                                    plane.rotateX(-Math.PI / 2);
                                                                                                                                    this.merge(sphere, plane, 1, [{
                                                                                                                                        x: 0,
                                                                                                                                        y: this.height / 2 + 0.01,
                                                                                                                                        z: 0
                                                                                                                                    }]);
                                                                                                                                    this.merge(sphere, data, 1, [{
                                                                                                                                        x: 0,
                                                                                                                                        y: -info.BLOCK.height / 21 * 2.5,
                                                                                                                                        z: 0
                                                                                                                                    }]);
                                                                                                                                    v.rotateY(2.3);
                                                                                                                                    this.merge(sphere, v, 2, [{
                                                                                                                                        x: 0,
                                                                                                                                        y: -info.BLOCK.height / 21 * 11,
                                                                                                                                        z: 0
                                                                                                                                    }]);
                                                                                                                                    this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                                    this.shadow.scale.set(0.55, 0.9, 0.7);
                                                                                                                                } else {
                                                                                                                                    if (30 == method) {
                                                                                                                                        geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                                                                        this.geometry = geometry;
                                                                                                                                        cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                            map: info.loader.load("res/luban.png")
                                                                                                                                        });
                                                                                                                                        this.mapUv(338, 338, geometry, 1, 0, 128, 208, 0);
                                                                                                                                        this.mapUv(338, 338, geometry, 2, 0, 128, 210, 338);
                                                                                                                                        this.mapUv(338, 338, geometry, 4, 210, 129, 337, 338);
                                                                                                                                        const hourHandMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                            color: 2199E3
                                                                                                                                        });
                                                                                                                                        const res = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 1.5), hourHandMaterial);
                                                                                                                                        const _worldMeshMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                            color: 4531468
                                                                                                                                        });
                                                                                                                                        const petalMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                            color: 8037621
                                                                                                                                        });
                                                                                                                                        this.earBlack = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.5, 3.5), _worldMeshMaterial);
                                                                                                                                        this.earBlue = new THREE.Mesh(new THREE.BoxGeometry(1, 2.5, 2.5), petalMaterial);
                                                                                                                                        res.position.set(0, 0.8, 5.75);
                                                                                                                                        this.body.add(res);
                                                                                                                                        this.earBlack.position.set(-5.4, 0, 0);
                                                                                                                                        this.earBlue.position.set(-6, 0, 0);
                                                                                                                                        this.body.add(this.earBlue);
                                                                                                                                        this.body.add(this.earBlack);
                                                                                                                                        this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                                                                                        /** @type {string} */
                                                                                                                                        this.musicName = "luban";
                                                                                                                                        /** @type {number} */
                                                                                                                                        this.score = 20;
                                                                                                                                        plane = new THREE.PlaneGeometry(2, 2);
                                                                                                                                        /** @type {Array} */
                                                                                                                                        this.icons = [];
                                                                                                                                        const sessionNameMap = info.loader.load("res/music_icon_two.png");
                                                                                                                                        /** @type {number} */
                                                                                                                                        i = 0;
                                                                                                                                        for (; i < 4; ++i) {
                                                                                                                                            this.icons[i] = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
                                                                                                                                                map: sessionNameMap,
                                                                                                                                                transparent: true
                                                                                                                                            }));
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.icons[i].rotation.y = -Math.PI / 4;
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.icons[i].rotation.x = -Math.PI / 5;
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.icons[i].rotation.z = -Math.PI / 5;
                                                                                                                                            this.body.add(this.icons[i]);
                                                                                                                                            this.icons[i].scale.set(0.6, 0.6, 0.6);
                                                                                                                                        }
                                                                                                                                        this.succeedTimer = this.playLubanMusic;
                                                                                                                                        this.whenLeave = this.stopLubanMusic;
                                                                                                                                    } else {
                                                                                                                                        if (31 == method) {
                                                                                                                                            /** @type {boolean} */
                                                                                                                                            this.canChange = false;
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.height = info.BLOCK.height / 21 * 7;
                                                                                                                                            geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius / 38 * 45, this.height, 2 * info.BLOCK.radius / 38 * 45);
                                                                                                                                            this.geometry = geometry;
                                                                                                                                            v = new THREE.BoxGeometry(2 * info.BLOCK.radius / 38 * 40, info.BLOCK.height / 21 * 14, 2 * info.BLOCK.radius / 38 * 40);
                                                                                                                                            this.shadow.scale.set(40 / 38, 1.4, 1);
                                                                                                                                            this.map = info.loader.load("res/wechat_close.png");
                                                                                                                                            this.topMap = info.loader.load("res/wechat_top.png");
                                                                                                                                            /** @type {Array} */
                                                                                                                                            name = [cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                                map: this.topMap
                                                                                                                                            }), camel = new THREE.MeshBasicMaterial({
                                                                                                                                                map: this.map,
                                                                                                                                                transparent: true
                                                                                                                                            })];
                                                                                                                                            sphere = new THREE.Geometry;
                                                                                                                                            this.mapUv(340, 340, geometry, 1, 0, 0, 280, 60);
                                                                                                                                            this.mapUv(340, 340, geometry, 2, 0, 60, 280, 340);
                                                                                                                                            this.mapUv(340, 340, geometry, 4, 280, 60, 340, 340);
                                                                                                                                            this.merge(sphere, geometry, 0, [{
                                                                                                                                                x: 0,
                                                                                                                                                y: 0,
                                                                                                                                                z: 0
                                                                                                                                            }]);
                                                                                                                                            this.mapUv(434, 164, v, 1, 0, 0, 217, 164);
                                                                                                                                            this.mapUv(434, 164, v, 4, 217, 0, 434, 164, true);
                                                                                                                                            this.merge(sphere, v, 1, [{
                                                                                                                                                x: 0,
                                                                                                                                                y: -info.BLOCK.height / 21 * 10.5,
                                                                                                                                                z: 0
                                                                                                                                            }]);
                                                                                                                                            this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                                            var beamGeometry = new THREE.PlaneGeometry(2.5, 3.34);
                                                                                                                                            this.door = new THREE.Mesh(beamGeometry, new THREE.MeshBasicMaterial({
                                                                                                                                                map: info.loader.load("res/wechat_door.png"),
                                                                                                                                                transparent: true
                                                                                                                                            }));
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.door.rotation.y = -Math.PI / 2;
                                                                                                                                            this.door.position.set(-info.BLOCK.radius / 38 * 40 - 0.05, -2.9, 1.2);
                                                                                                                                            /** @type {boolean} */
                                                                                                                                            this.door.visible = false;
                                                                                                                                            this.body.add(this.door);
                                                                                                                                            this.secondDoor = new THREE.Mesh(beamGeometry, new THREE.MeshBasicMaterial({
                                                                                                                                                map: info.loader.load("res/wechat_second_door.png"),
                                                                                                                                                transparent: true
                                                                                                                                            }));
                                                                                                                                            /** @type {boolean} */
                                                                                                                                            this.secondDoor.visible = false;
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.secondDoor.rotation.y = -Math.PI / 2;
                                                                                                                                            this.secondDoor.position.set(-info.BLOCK.radius / 38 * 40 - 0.05, -2.9, -1.2);
                                                                                                                                            this.body.add(this.secondDoor);
                                                                                                                                            this.glowMap = info.loader.load("res/wechat_open.png");
                                                                                                                                            this.glowTopMap = info.loader.load("res/wechat_glow_top.png");
                                                                                                                                            /**
                                                                                                                                             * @return {undefined}
                                                                                                                                             */
                                                                                                                                            this.succeedTimer = function() {
                                                                                                                                                if (5 != this.score) {
                                                                                                                                                    this.hitObj.material[1].map = this.glowMap;
                                                                                                                                                    this.hitObj.material[0].map = this.glowTopMap;
                                                                                                                                                    /** @type {boolean} */
                                                                                                                                                    this.logo.visible = false;
                                                                                                                                                    /** @type {boolean} */
                                                                                                                                                    this.glowLogo.visible = true;
                                                                                                                                                    /** @type {boolean} */
                                                                                                                                                    this.door.visible = true;
                                                                                                                                                    /** @type {boolean} */
                                                                                                                                                    this.secondDoor.visible = true;
                                                                                                                                                }
                                                                                                                                            };
                                                                                                                                            this.glowLogo = new THREE.Object3D;
                                                                                                                                            this.logo = new THREE.Object3D;
                                                                                                                                            data = new THREE.CylinderGeometry(1.8, 1.8, 0.5, 30);
                                                                                                                                            const waterMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                                color: 3457369
                                                                                                                                            });
                                                                                                                                            blockMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                                color: 5879160
                                                                                                                                            });
                                                                                                                                            const block = new THREE.Mesh(data, blockMaterial);
                                                                                                                                            const glassWater = new THREE.Mesh(data, waterMaterial);
                                                                                                                                            (plane = new THREE.CircleGeometry(1.8, 30)).rotateX(Math.PI / 2);
                                                                                                                                            plane.rotateY(-Math.PI / 2);
                                                                                                                                            material = new THREE.MeshBasicMaterial({
                                                                                                                                                map: info.loader.load("res/wechat_logo.png")
                                                                                                                                            });
                                                                                                                                            const woodMaterial = new THREE.MeshBasicMaterial({
                                                                                                                                                map: info.loader.load("res/wechat_glow_logo.png")
                                                                                                                                            });
                                                                                                                                            const planeMesh = new THREE.Mesh(plane, material);
                                                                                                                                            const cylinder = new THREE.Mesh(plane, woodMaterial);
                                                                                                                                            this.logo.add(block);
                                                                                                                                            /** @type {number} */
                                                                                                                                            planeMesh.position.y = -0.251;
                                                                                                                                            this.logo.add(planeMesh);
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.logo.position.x = -6.5;
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.logo.rotation.z = -Math.PI / 2;
                                                                                                                                            this.body.add(this.logo);
                                                                                                                                            /** @type {number} */
                                                                                                                                            cylinder.position.y = -0.251;
                                                                                                                                            this.glowLogo.add(cylinder);
                                                                                                                                            this.glowLogo.add(glassWater);
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.glowLogo.position.x = -6.5;
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.glowLogo.rotation.z = -Math.PI / 2;
                                                                                                                                            /** @type {boolean} */
                                                                                                                                            this.glowLogo.visible = false;
                                                                                                                                            this.body.add(this.glowLogo);
                                                                                                                                            /** @type {string} */
                                                                                                                                            this.musicName = "pay";
                                                                                                                                            /**
                                                                                                                                             * @return {undefined}
                                                                                                                                             */
                                                                                                                                            this.registerAudio = () => {
                                                                                                                                                if (5 != self.score) {
                                                                                                                                                    properties.customAnimation.to(self.door.position, 1, {
                                                                                                                                                        z: 2.2
                                                                                                                                                    });
                                                                                                                                                    properties.customAnimation.to(self.secondDoor.position, 1, {
                                                                                                                                                        z: -1.9
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                            };
                                                                                                                                            /**
                                                                                                                                             * @return {undefined}
                                                                                                                                             */
                                                                                                                                            this.registerEndAudio = () => {
                                                                                                                                                if (5 != self.score) {
                                                                                                                                                    properties.customAnimation.to(self.door.position, 1, {
                                                                                                                                                        z: 1.2
                                                                                                                                                    });
                                                                                                                                                    properties.customAnimation.to(self.secondDoor.position, 1, {
                                                                                                                                                        z: -1.2
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                            };
                                                                                                                                            /**
                                                                                                                                             * @return {undefined}
                                                                                                                                             */
                                                                                                                                            this.beforePopup = () => {
                                                                                                                                                self.hitObj.material[1].map = self.map;
                                                                                                                                                self.hitObj.material[0].map = self.topMap;
                                                                                                                                                /** @type {boolean} */
                                                                                                                                                self.logo.visible = true;
                                                                                                                                                /** @type {boolean} */
                                                                                                                                                self.glowLogo.visible = false;
                                                                                                                                                /** @type {boolean} */
                                                                                                                                                self.door.visible = false;
                                                                                                                                                /** @type {boolean} */
                                                                                                                                                self.secondDoor.visible = false;
                                                                                                                                            };
                                                                                                                                            /** @type {number} */
                                                                                                                                            this.score = 20;
                                                                                                                                        } else {
                                                                                                                                            if (32 == method) {
                                                                                                                                                /** @type {boolean} */
                                                                                                                                                this.canChange = false;
                                                                                                                                                /** @type {Array} */
                                                                                                                                                name = [this.greenMaterial, this.whiteMaterial];
                                                                                                                                                sphere = new THREE.Geometry;
                                                                                                                                                /** @type {number} */
                                                                                                                                                description = 3;
                                                                                                                                                /** @type {number} */
                                                                                                                                                gm = (info.BLOCK.height - description) / 2;
                                                                                                                                                re = new THREE.BoxGeometry(2 * info.BLOCK.radius, gm, 2 * info.BLOCK.radius);
                                                                                                                                                this.geometry = re;
                                                                                                                                                suite = new THREE.BoxGeometry(2 * info.BLOCK.radius, description, 2 * info.BLOCK.radius);
                                                                                                                                                this.merge(sphere, re, 0, [{
                                                                                                                                                    x: 0,
                                                                                                                                                    y: -description / 2 - gm / 2,
                                                                                                                                                    z: 0
                                                                                                                                                }, {
                                                                                                                                                    x: 0,
                                                                                                                                                    y: description / 2 + gm / 2,
                                                                                                                                                    z: 0
                                                                                                                                                }]);
                                                                                                                                                this.merge(sphere, suite, 1, [{
                                                                                                                                                    x: 0,
                                                                                                                                                    y: 0,
                                                                                                                                                    z: 0
                                                                                                                                                }]);
                                                                                                                                                this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                                                data = new THREE.CylinderGeometry(1.5, 1.5, 0.4, 30);
                                                                                                                                                const sessionModel = new THREE.Mesh(data, new THREE.MeshLambertMaterial({
                                                                                                                                                    color: 9099465
                                                                                                                                                }));
                                                                                                                                                (plane = new THREE.CircleGeometry(1.5, 30)).rotateX(Math.PI / 2);
                                                                                                                                                plane.rotateY(-Math.PI / 2);
                                                                                                                                                material = new THREE.MeshBasicMaterial({
                                                                                                                                                    map: info.loader.load("res/relax_back.png")
                                                                                                                                                });
                                                                                                                                                const handMaterial = new THREE.MeshBasicMaterial({
                                                                                                                                                    map: info.loader.load("res/relax_front.png"),
                                                                                                                                                    side: THREE.DoubleSide
                                                                                                                                                });
                                                                                                                                                var object = new THREE.Mesh(plane, material);
                                                                                                                                                const row = new THREE.Mesh(plane, handMaterial);
                                                                                                                                                this.board = new THREE.Object3D;
                                                                                                                                                /** @type {number} */
                                                                                                                                                object.position.y = -0.21;
                                                                                                                                                /** @type {number} */
                                                                                                                                                row.position.y = 0.21;
                                                                                                                                                this.board.add(object);
                                                                                                                                                this.board.add(row);
                                                                                                                                                this.board.add(sessionModel);
                                                                                                                                                /** @type {number} */
                                                                                                                                                this.board.rotation.z = -Math.PI / 2;
                                                                                                                                                this.board.position.set(6.7, 3.5, 6.7);
                                                                                                                                                this.obj.add(this.board);
                                                                                                                                                const obj = new THREE.Mesh(data, this.greenMaterial);
                                                                                                                                                const item = new THREE.Mesh(data, this.greenMaterial);
                                                                                                                                                item.scale.set(1, 1, 1);
                                                                                                                                                item.position.set(6.7, -2, 6.7);
                                                                                                                                                this.obj.add(item);
                                                                                                                                                obj.scale.set(0.7, 0.7, 0.7);
                                                                                                                                                obj.position.set(6.7, -1.5, 6.7);
                                                                                                                                                this.obj.add(obj);
                                                                                                                                                const rect = obj.clone();
                                                                                                                                                rect.scale.set(0.1, 11, 0.1);
                                                                                                                                                rect.position.set(6.7, 0, 6.7);
                                                                                                                                                this.obj.add(rect);
                                                                                                                                                /**
                                                                                                                                                 * @return {undefined}
                                                                                                                                                 */
                                                                                                                                                this.perFrame = () => {
                                                                                                                                                    self.board.rotation.y += 0.01;
                                                                                                                                                };
                                                                                                                                                /** @type {number} */
                                                                                                                                                this.score = -20;
                                                                                                                                                /** @type {string} */
                                                                                                                                                this.musicName = "relax";
                                                                                                                                            } else {
                                                                                                                                                if (33 == method) {
                                                                                                                                                    /** @type {boolean} */
                                                                                                                                                    this.canChange = false;
                                                                                                                                                    /** @type {Array} */
                                                                                                                                                    name = [this.greenMaterial, this.whiteMaterial];
                                                                                                                                                    sphere = new THREE.Geometry;
                                                                                                                                                    /** @type {number} */
                                                                                                                                                    description = 3;
                                                                                                                                                    /** @type {number} */
                                                                                                                                                    gm = (info.BLOCK.height - description) / 2;
                                                                                                                                                    re = new THREE.BoxGeometry(2 * info.BLOCK.radius, gm, 2 * info.BLOCK.radius);
                                                                                                                                                    this.geometry = re;
                                                                                                                                                    suite = new THREE.BoxGeometry(2 * info.BLOCK.radius, description, 2 * info.BLOCK.radius);
                                                                                                                                                    this.merge(sphere, re, 0, [{
                                                                                                                                                        x: 0,
                                                                                                                                                        y: -description / 2 - gm / 2,
                                                                                                                                                        z: 0
                                                                                                                                                    }, {
                                                                                                                                                        x: 0,
                                                                                                                                                        y: description / 2 + gm / 2,
                                                                                                                                                        z: 0
                                                                                                                                                    }]);
                                                                                                                                                    this.merge(sphere, suite, 1, [{
                                                                                                                                                        x: 0,
                                                                                                                                                        y: 0,
                                                                                                                                                        z: 0
                                                                                                                                                    }]);
                                                                                                                                                    this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                                                } else {
                                                                                                                                                    if (34 == method) {
                                                                                                                                                        /** @type {boolean} */
                                                                                                                                                        this.canChange = false;
                                                                                                                                                        /** @type {Array} */
                                                                                                                                                        name = [this.greenMaterial, this.whiteMaterial];
                                                                                                                                                        sphere = new THREE.Geometry;
                                                                                                                                                        /** @type {number} */
                                                                                                                                                        description = 3;
                                                                                                                                                        /** @type {number} */
                                                                                                                                                        gm = (info.BLOCK.height - description) / 2;
                                                                                                                                                        re = new THREE.BoxGeometry(2 * info.BLOCK.radius, gm, 2 * info.BLOCK.radius);
                                                                                                                                                        this.geometry = re;
                                                                                                                                                        suite = new THREE.BoxGeometry(2 * info.BLOCK.radius, description, 2 * info.BLOCK.radius);
                                                                                                                                                        this.merge(sphere, re, 0, [{
                                                                                                                                                            x: 0,
                                                                                                                                                            y: -description / 2 - gm / 2,
                                                                                                                                                            z: 0
                                                                                                                                                        }, {
                                                                                                                                                            x: 0,
                                                                                                                                                            y: description / 2 + gm / 2,
                                                                                                                                                            z: 0
                                                                                                                                                        }]);
                                                                                                                                                        this.merge(sphere, suite, 1, [{
                                                                                                                                                            x: 0,
                                                                                                                                                            y: 0,
                                                                                                                                                            z: 0
                                                                                                                                                        }]);
                                                                                                                                                        this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                                                    } else {
                                                                                                                                                        if (35 == method) {
                                                                                                                                                            /** @type {boolean} */
                                                                                                                                                            this.canChange = false;
                                                                                                                                                            /** @type {Array} */
                                                                                                                                                            name = [this.greenMaterial, this.whiteMaterial];
                                                                                                                                                            sphere = new THREE.Geometry;
                                                                                                                                                            /** @type {number} */
                                                                                                                                                            description = 3;
                                                                                                                                                            /** @type {number} */
                                                                                                                                                            gm = (info.BLOCK.height - description) / 2;
                                                                                                                                                            re = new THREE.BoxGeometry(2 * info.BLOCK.radius, gm, 2 * info.BLOCK.radius);
                                                                                                                                                            this.geometry = re;
                                                                                                                                                            suite = new THREE.BoxGeometry(2 * info.BLOCK.radius, description, 2 * info.BLOCK.radius);
                                                                                                                                                            this.merge(sphere, re, 0, [{
                                                                                                                                                                x: 0,
                                                                                                                                                                y: -description / 2 - gm / 2,
                                                                                                                                                                z: 0
                                                                                                                                                            }, {
                                                                                                                                                                x: 0,
                                                                                                                                                                y: description / 2 + gm / 2,
                                                                                                                                                                z: 0
                                                                                                                                                            }]);
                                                                                                                                                            this.merge(sphere, suite, 1, [{
                                                                                                                                                                x: 0,
                                                                                                                                                                y: 0,
                                                                                                                                                                z: 0
                                                                                                                                                            }]);
                                                                                                                                                            this.hitObj = new THREE.Mesh(sphere, name);
                                                                                                                                                        } else {
                                                                                                                                                            if (-1 == method) {
                                                                                                                                                                /** @type {Array} */
                                                                                                                                                                const suggestions = [15622240, 14980702, 15712087, 9089870, 7451844, 6519997, 10772948];
                                                                                                                                                                geometry = geometryLightSphere;
                                                                                                                                                                cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                                                    color: suggestions[index],
                                                                                                                                                                    transparent: true
                                                                                                                                                                });
                                                                                                                                                                this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                                                                                                                const bodygeo = new THREE.BoxGeometry(2 * info.BLOCK.radius, info.BLOCK.height, 2 * info.BLOCK.radius);
                                                                                                                                                                this.mapUv(100, 88, bodygeo, 2, 0, 0, 5, 5);
                                                                                                                                                                const bodymesh = new THREE.Mesh(bodygeo, charMaterial);
                                                                                                                                                                if (0 == index) {
                                                                                                                                                                    /** @type {boolean} */
                                                                                                                                                                    bodymesh.receiveShadow = true;
                                                                                                                                                                }
                                                                                                                                                                this.body.add(bodymesh);
                                                                                                                                                                let restoreScript;
                                                                                                                                                                let rreturn;
                                                                                                                                                                let udataCur;
                                                                                                                                                                let pdataOld;
                                                                                                                                                                plane = new THREE.PlaneGeometry(4, 8);
                                                                                                                                                                /** @type {number} */
                                                                                                                                                                udataCur = (restoreScript = index % 4 * 64) + 64;
                                                                                                                                                                /** @type {number} */
                                                                                                                                                                pdataOld = (rreturn = 128 * parseInt(index / 4)) + 128;
                                                                                                                                                                this.mapUv(256, 256, plane, 0, restoreScript, pdataOld, udataCur, rreturn);
                                                                                                                                                                /** @type {number} */
                                                                                                                                                                (object = new THREE.Mesh(plane, materials)).rotation.x = -Math.PI / 2;
                                                                                                                                                                /** @type {number} */
                                                                                                                                                                object.rotation.z = -Math.PI / 2;
                                                                                                                                                                /** @type {number} */
                                                                                                                                                                object.position.y = info.BLOCK.height / 2 + 0.05;
                                                                                                                                                                this.body.add(object);
                                                                                                                                                                this.obj.scale.set(0.7, 1, 0.7);
                                                                                                                                                            } else {
                                                                                                                                                                if ("object" == processJqueryArgs(arguments[1])) {
                                                                                                                                                                    geometry = new THREE.BoxGeometry(2 * info.BLOCK.radius, this.height, 2 * info.BLOCK.radius);
                                                                                                                                                                    cubeMaterial = new THREE.MeshLambertMaterial({
                                                                                                                                                                        map: info.loader.load(`${wx.env.USER_DATA_PATH}/${arguments[1].res[0].path}`)
                                                                                                                                                                    });
                                                                                                                                                                    this.mapUv(428, 428, geometry, 1, 0, 0, 280, 148);
                                                                                                                                                                    this.mapUv(428, 428, geometry, 2, 0, 148, 280, 428);
                                                                                                                                                                    this.mapUv(428, 428, geometry, 4, 280, 148, 428, 428);
                                                                                                                                                                    this.hitObj = new THREE.Mesh(geometry, cubeMaterial);
                                                                                                                                                                    this.score = arguments[1].score;
                                                                                                                                                                    if (arguments[1].music_src) {
                                                                                                                                                                        this.musicName = arguments[1].music_name;
                                                                                                                                                                        arguments[2].addMusic(arguments[1].music_name, arguments[1].music_src);
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.shadow.initZ = this.shadow.position.z;
            /** @type {boolean} */
            this.hitObj.receiveShadow = true;
            /** @type {string} */
            this.hitObj.name = "hitObj";
            this.body.add(this.hitObj);
            /** @type {boolean} */
            this.hitObj.matrixAutoUpdate = false;
            this.shadow.initScale = this.shadow.scale.y;
            /** @type {number} */
            this.body.position.y = info.BLOCK.height / 2 - this.height / 2;
            this.obj.add(this.shadow);
            this.obj.add(this.body);
        }
        return make(init, [{
            key: "merge",
            /**
             * @param {Object} self
             * @param {Object} data
             * @param {?} record
             * @param {Array} normals
             * @return {undefined}
             */
            value(self, data, record, normals) {
                /** @type {number} */
                let j = 0;
                let jl = data.faces.length;
                for (; j < jl; ++j) {
                    /** @type {number} */
                    data.faces[j].materialIndex = 0;
                }
                const obj = new THREE.Mesh(data);
                /** @type {number} */
                j = 0;
                jl = normals.length;
                for (; j < jl; ++j) {
                    obj.position.set(normals[j].x, normals[j].y, normals[j].z);
                    obj.updateMatrix();
                    self.merge(obj.geometry, obj.matrix, record);
                }
            }
        }, {
            key: "_mapUv",
            /**
             * @param {?} max
             * @param {?} w
             * @param {Object} scope
             * @param {number} i
             * @param {number} x2
             * @param {number} y
             * @param {number} x1
             * @param {number} x
             * @param {boolean} thisValue
             * @return {undefined}
             */
            value(max, w, scope, i, x2, y, x1, x, thisValue) {
                /** @type {number} */
                const scale = 1 / max;
                /** @type {number} */
                const s = 1 / w;
                if (scope.faces[i] instanceof THREE.Face3) {
                    d = scope.faceVertexUvs[0][2 * i];
                    if (4 == i && !thisValue || 2 == i && thisValue) {
                        /** @type {number} */
                        d[0].x = x2 * scale;
                        /** @type {number} */
                        d[0].y = y * s;
                        /** @type {number} */
                        d[2].x = x2 * scale;
                        /** @type {number} */
                        d[2].y = x * s;
                        /** @type {number} */
                        d[1].x = x1 * scale;
                        /** @type {number} */
                        d[1].y = y * s;
                    } else {
                        /** @type {number} */
                        d[0].x = x2 * scale;
                        /** @type {number} */
                        d[0].y = y * s;
                        /** @type {number} */
                        d[1].x = x2 * scale;
                        /** @type {number} */
                        d[1].y = x * s;
                        /** @type {number} */
                        d[2].x = x1 * scale;
                        /** @type {number} */
                        d[2].y = y * s;
                    }
                    var d = scope.faceVertexUvs[0][2 * i + 1];
                    if (4 == i && !thisValue || 2 == i && thisValue) {
                        /** @type {number} */
                        d[2].x = x2 * scale;
                        /** @type {number} */
                        d[2].y = x * s;
                        /** @type {number} */
                        d[1].x = x1 * scale;
                        /** @type {number} */
                        d[1].y = x * s;
                        /** @type {number} */
                        d[0].x = x1 * scale;
                        /** @type {number} */
                        d[0].y = y * s;
                    } else {
                        /** @type {number} */
                        d[0].x = x2 * scale;
                        /** @type {number} */
                        d[0].y = x * s;
                        /** @type {number} */
                        d[1].x = x1 * scale;
                        /** @type {number} */
                        d[1].y = x * s;
                        /** @type {number} */
                        d[2].x = x1 * scale;
                        /** @type {number} */
                        d[2].y = y * s;
                    }
                }
            }
        }, {
            key: "mapUv",
            /**
             * @param {?} newValue
             * @param {?} thisValue
             * @param {?} factor
             * @param {Array} codeSegments
             * @param {?} newVal
             * @param {?} error
             * @param {?} backgroundColor
             * @param {?} event
             * @param {?} timestamp
             * @return {undefined}
             */
            value(
                newValue,
                thisValue,
                factor,
                codeSegments,
                newVal,
                error,
                backgroundColor,
                event,
                timestamp) {
                if (codeSegments.length) {
                    /** @type {number} */
                    let i = 0;
                    for (; i < codeSegments.length; ++i) {
                        this._mapUv(newValue, thisValue, factor, codeSegments[i], newVal, error, backgroundColor, event, timestamp);
                    }
                } else {
                    this._mapUv(newValue, thisValue, factor, codeSegments, newVal, error, backgroundColor, event, timestamp);
                }
            }
        }, {
            key: "getBox",
            /**
             * @return {?}
             */
            value() {
                return this.boundingBox ? this.boundingBox : (this.boundingBox = (new THREE.Box3).setFromObject(this.body), this.boundingBox);
            }
        }, {
            key: "glow",
            /**
             * @return {undefined}
             */
            value() {
                this.hitObj.material.map = this.glowMap;
            }
        }, {
            key: "wechatGlow",
            /**
             * @return {undefined}
             */
            value() {}
        }, {
            key: "openDoor",
            /**
             * @return {undefined}
             */
            value() {
                properties.customAnimation.to(this.door.position, 1, {
                    z: -4.5
                });
                properties.customAnimation.to(this.secondDoor.position, 1, {
                    z: -0.5
                });
            }
        }, {
            key: "closeDoor",
            /**
             * @return {undefined}
             */
            value() {
                properties.customAnimation.to(this.door.position, 1, {
                    z: -3.3
                });
                properties.customAnimation.to(this.secondDoor.position, 1, {
                    z: -1.7
                });
            }
        }, {
            key: "rotateBox",
            /**
             * @return {undefined}
             */
            value() {
                properties.customAnimation.to(this.middle.rotation, 0.5, {
                    y: -Math.PI / 2
                });
            }
        }, {
            key: "playLubanMusic",
            /**
             * @return {undefined}
             */
            value() {
                const that = this;
                /**
                 * @return {undefined}
                 */
                const update = () => {
                    that.icons[0].position.set(1, 7, -1);
                    that.icons[1].position.set(-1, 7, -1);
                    that.icons[2].position.set(1, 7, 1);
                    that.icons[3].position.set(-1, 7, 1);
                    /** @type {number} */
                    let i = 0;
                    const valuesLen = that.icons.length;
                    for (; i < valuesLen; ++i) {
                        /** @type {number} */
                        that.icons[i].material.opacity = 0;
                        properties.customAnimation.to(that.icons[i].position, 0.7, {
                            y: 12,
                            ease: "Cubic.easeIn",
                            delay: 0.1 * i
                        });
                        properties.customAnimation.to(that.icons[i].position, 0.7, {
                            x: 0 == i || 2 == i ? 3 : -3,
                            delay: 0.1 * i
                        });
                        properties.customAnimation.to(that.icons[i].material, 0.7, {
                            opacity: 1,
                            delay: 0.1 * i
                        });
                        properties.customAnimation.to(that.icons[i].position, 0.7, {
                            y: 17,
                            ease: "Cubic.easeOut",
                            delay: 0.1 * i + 0.7
                        });
                        properties.customAnimation.to(that.icons[i].position, 0.7, {
                            x: 0 == i || 2 == i ? 1 : -1,
                            delay: 0.1 * i + 0.7
                        });
                        properties.customAnimation.to(that.icons[i].material, 0.7, {
                            opacity: 0,
                            delay: 0.1 * i + 0.7
                        });
                    }
                };
                setTimeout(() => {
                    update();
                }, 1E3);
                /** @type {number} */
                this.lubanMusicTimer = setInterval(() => {
                    update();
                }, 3E3);
                /**
                 * @return {undefined}
                 */
                const validateProperty = () => {
                    /** @type {number} */
                    let i = 0;
                    for (; i < 15; ++i) {
                        properties.customAnimation.to(that.earBlack.scale, 0.2, {
                            y: 1.3,
                            z: 1.3,
                            delay: 0.4 * i
                        });
                        properties.customAnimation.to(that.earBlue.scale, 0.2, {
                            y: 1.3,
                            z: 1.3,
                            delay: 0.4 * i
                        });
                        properties.customAnimation.to(that.earBlack.scale, 0.2, {
                            y: 1,
                            z: 1,
                            delay: 0.4 * i + 0.2
                        });
                        properties.customAnimation.to(that.earBlue.scale, 0.2, {
                            y: 1,
                            z: 1,
                            delay: 0.4 * i + 0.2
                        });
                    }
                };
                validateProperty();
                /** @type {number} */
                this.earTimer = setInterval(() => {
                    validateProperty();
                }, 9E3);
            }
        }, {
            key: "stopLubanMusic",
            /**
             * @return {undefined}
             */
            value() {
                if (this.earTimer) {
                    clearTimeout(this.earTimer);
                    /** @type {null} */
                    this.earTimer = null;
                }
                if (this.lubanMusicTimer) {
                    clearTimeout(this.lubanMusicTimer);
                    /** @type {null} */
                    this.lubanMusicTimer = null;
                }
            }
        }, {
            key: "playMusic",
            /**
             * @return {undefined}
             */
            value() {
                const proto = this;
                /** @type {number} */
                let i = 0;
                for (; i < 2; ++i) {
                    setTimeout((self => () => {
                        /** @type {boolean} */
                        self.visible = true;
                        self.position.set(0, 0, 0);
                        /** @type {number} */
                        self.material.opacity = 1;
                        properties.customAnimation.to(self.position, 2, {
                            x: 5 * (1 - 2 * Math.random()),
                            y: 15,
                            z: 5 * (1 - 2 * Math.random())
                        });
                        properties.customAnimation.to(self.material, 2, {
                            opacity: 0
                        });
                    })(this.icons[i]), 1E3 * i);
                }
                /** @type {number} */
                this.musicTimer = setTimeout(() => {
                    proto.playMusic();
                }, 2500);
            }
        }, {
            key: "stopMusic",
            /**
             * @return {undefined}
             */
            value() {
                if (this.musicTimer) {
                    clearTimeout(this.musicTimer);
                    /** @type {null} */
                    this.musicTimer = null;
                }
            }
        }, {
            key: "change",
            /**
             * @param {number} radius
             * @param {?} newValue
             * @param {number} thisValue
             * @return {?}
             */
            value(radius, newValue, thisValue) {
                if (this.canChange) {
                    if (this.order >= 9) {
                        /** @type {number} */
                        const val = this.order >= 13 ? 0.7 : 0.6;
                        return this.radiusScale = thisValue || Math.max((0, a.random)() * (info.BLOCK.maxRadiusScale - info.BLOCK.minRadiusScale) + info.BLOCK.minRadiusScale, this.min || val), this.radiusScale = +this.radiusScale.toFixed(2), this.radius = radius || this.radiusScale * info.BLOCK.radius, this.radius = +this.radius.toFixed(2), void this.obj.scale.set(this.radiusScale, 1, this.radiusScale);
                    }
                    this.radiusScale = thisValue || (0, a.random)() * (info.BLOCK.maxRadiusScale - info.BLOCK.minRadiusScale) + info.BLOCK.minRadiusScale;
                    /** @type {number} */
                    this.radiusScale = +this.radiusScale.toFixed(2);
                    this.radius = radius || this.radiusScale * info.BLOCK.radius;
                    /** @type {number} */
                    this.radius = +this.radius.toFixed(2);
                    this.obj.scale.set(this.radiusScale, 1, this.radiusScale);
                    this.changeColor(newValue);
                }
            }
        }, {
            key: "changeColor",
            /**
             * @param {string} timeout
             * @return {undefined}
             */
            value(timeout) {
                const t = timeout || this.types[Math.floor(3 * Math.random())];
                if (this.type != t) {
                    this.type = t;
                    if ("green" == t) {
                        this.greenMaterial.color.setHex(other.green);
                        this.whiteMaterial.color.setHex(other.white);
                        if (this.middleLightGreenMaterial) {
                            this.middleLightGreenMaterial.color.setHex(other.middleLightGreen);
                        }
                    } else {
                        if ("gray" == t) {
                            this.greenMaterial.color.setHex(other.white);
                            this.whiteMaterial.color.setHex(other.gray);
                            if (this.middleLightGreenMaterial) {
                                this.middleLightGreenMaterial.color.setHex(other.middleLightGray);
                            }
                        } else {
                            if ("black" == t) {
                                this.greenMaterial.color.setHex(other.black);
                                this.whiteMaterial.color.setHex(other.lightBlack);
                                if (this.middleLightGreenMaterial) {
                                    this.middleLightGreenMaterial.color.setHex(other.middleLightBlack);
                                }
                            }
                        }
                    }
                }
            }
        }, {
            key: "getVertices",
            /**
             * @return {?}
             */
            value() {
                const scope = this;
                /** @type {Array} */
                const eventPath = [];
                const geometry = this.geometry || this.hitObj.geometry;
                if (this.obj.updateMatrixWorld(), 4 === this.radiusSegments) {
                    [0, 1, 4, 5].forEach(i => {
                        const vars = geometry.vertices[i].clone().applyMatrix4(scope.hitObj.matrixWorld);
                        eventPath.push([vars.x, vars.z]);
                    });
                } else {
                    /** @type {number} */
                    let j = 0;
                    for (; j < this.radiusSegments; ++j) {
                        const vars = geometry.vertices[j].clone().applyMatrix4(this.hitObj.matrixWorld);
                        eventPath.push([vars.x, vars.z]);
                    }
                }
                return eventPath;
            }
        }, {
            key: "shrink",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {string} */
                this.status = "shrink";
            }
        }, {
            key: "_shrink",
            /**
             * @return {undefined}
             */
            value() {
                if (this.scale -= info.BLOCK.reduction, this.scale = Math.max(info.BLOCK.minScale, this.scale), this.scale <= info.BLOCK.minScale) {
                    /** @type {string} */
                    this.status = "stop";
                } else {
                    /** @type {number} */
                    this.body.scale.y = this.scale;
                    this.shadow.scale.y -= info.BLOCK.reduction / 2;
                    this.shadow.position.z += info.BLOCK.reduction / 4 * this.shadowWidth;
                    /** @type {number} */
                    const y = info.BLOCK.reduction / 2 * info.BLOCK.height * (info.BLOCK.height - this.height / 2) / info.BLOCK.height * 2;
                    this.body.position.y -= y;
                }
            }
        }, {
            key: "showup",
            /**
             * @param {number} backgroundColor
             * @return {undefined}
             */
            value(backgroundColor) {
                const z = this.shadow.position.z;
                this.body.position.set(0, 20, 0);
                /** @type {number} */
                this.shadow.position.z = -15;
                /** @type {boolean} */
                this.obj.visible = true;
                if (3 == backgroundColor || (4 == backgroundColor || 6 == backgroundColor)) {
                    this.obj.position.set(7.5 * (6 == backgroundColor ? 5 : 3), 0, 3.8 * (3 == backgroundColor || 6 == backgroundColor ? -1 : 1));
                } else {
                    if (5 == backgroundColor) {
                        this.obj.position.set(30, 0, 0);
                    } else {
                        this.obj.position.set(7.5 * backgroundColor, 0, 0);
                    }
                }
                (0, properties.TweenAnimation)(this.body.position.y, info.BLOCK.height / 2 - this.height / 2, 500, "Bounce.easeOut", (ry, dataAndEvents) => {
                    /** @type {number} */
                    this.body.position.y = ry;
                });
                (0, properties.TweenAnimation)(this.shadow.position.z, z, 500, "Bounce.easeOut", (zOrder, dataAndEvents) => {
                    /** @type {number} */
                    this.shadow.position.z = zOrder;
                });
            }
        }, {
            key: "hideGlow",
            /**
             * @return {undefined}
             */
            value() {
                this.hitObj.material.map = this.map;
            }
        }, {
            key: "popup",
            /**
             * @return {undefined}
             */
            value() {
                const player = this;
                if (this.beforePopup && this.beforePopup(), 25 == this.order) {
                    /** @type {number} */
                    let i = 0;
                    for (; i < 10; ++i) {
                        /** @type {number} */
                        let j = 0;
                        for (; j < 4; ++j) {
                            /** @type {boolean} */
                            this.numbers[i][j].visible = false;
                        }
                    }
                    /** @type {Date} */
                    const now = new Date;
                    /** @type {string} */
                    const numbers = (`0${now.getHours()}`).slice(-2);
                    /** @type {string} */
                    const r = (`0${now.getMinutes()}`).slice(-2);
                    /** @type {number} */
                    this.numbers[numbers[0]][0].position.x = -3.1 * this.radiusScale;
                    /** @type {boolean} */
                    this.numbers[numbers[0]][0].visible = true;
                    /** @type {number} */
                    this.numbers[numbers[1]][1].position.x = -1.2 * this.radiusScale;
                    /** @type {boolean} */
                    this.numbers[numbers[1]][1].visible = true;
                    /** @type {number} */
                    this.numbers[r[0]][2].position.x = 1.2 * this.radiusScale;
                    /** @type {boolean} */
                    this.numbers[r[0]][2].visible = true;
                    /** @type {number} */
                    this.numbers[r[1]][3].position.x = 3.1 * this.radiusScale;
                    /** @type {boolean} */
                    this.numbers[r[1]][3].visible = true;
                } else {
                    if (17 == this.order) {
                        /** @type {number} */
                        this.middle.rotation.y = 0;
                    }
                }
                const z = this.shadow.position.z;
                /** @type {number} */
                this.body.position.y = 20;
                /** @type {number} */
                this.shadow.position.z = -15;
                /** @type {boolean} */
                this.obj.visible = true;
                /** @type {null} */
                this.boundingBox = null;
                properties.customAnimation.to(this.body.position, 0.5, {
                    y: info.BLOCK.height / 2 - this.height / 2,
                    ease: "Bounce.easeOut",
                    /**
                     * @return {undefined}
                     */
                    onEnded() {
                        /** @type {number} */
                        player.body.position.y = info.BLOCK.height / 2 - player.height / 2;
                    }
                });
                properties.customAnimation.to(this.shadow.position, 0.5, {
                    z,
                    ease: "Bounce.easeOut",
                    /**
                     * @return {undefined}
                     */
                    onEnded() {
                        player.shadow.position.z = z;
                    }
                });
            }
        }, {
            key: "reset",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {string} */
                this.status = "stop";
                /** @type {number} */
                this.scale = 1;
                /** @type {number} */
                this.obj.scale.y = 1;
                /** @type {number} */
                this.body.scale.y = 1;
                /** @type {number} */
                this.obj.position.y = 0;
                /** @type {number} */
                this.body.position.y = info.BLOCK.height / 2 - this.height / 2;
                this.shadow.scale.y = this.shadow.initScale;
                this.shadow.position.z = this.shadow.initZ;
                /** @type {null} */
                this.boundingBox = null;
            }
        }, {
            key: "rebound",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {string} */
                this.status = "stop";
                /** @type {number} */
                this.scale = 1;
                properties.customAnimation.to(this.body.scale, 0.5, {
                    ease: "Elastic.easeOut",
                    y: 1
                });
                properties.customAnimation.to(this.body.position, 0.5, {
                    ease: "Elastic.easeOut",
                    y: info.BLOCK.height / 2 - this.height / 2
                });
                properties.customAnimation.to(this.shadow.scale, 0.5, {
                    ease: "Elastic.easeOut",
                    y: this.shadow.initScale
                });
                properties.customAnimation.to(this.shadow.position, 0.5, {
                    ease: "Elastic.easeOut",
                    z: this.shadow.initZ
                });
            }
        }, {
            key: "update",
            /**
             * @return {undefined}
             */
            value() {
                if (this.perFrame) {
                    this.perFrame();
                }
                if ("stop" !== this.status) {
                    if ("shrink" === this.status) {
                        this._shrink();
                    } else {
                        this.status;
                    }
                }
            }
        }]), init;
    })();
    obj.default = value;
});