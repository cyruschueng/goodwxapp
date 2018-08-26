define("js/bottle.js", (Event, dataAndEvents, obj) => {
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
    })(Event("./lib/three"));
    const event = Event("./lib/animation");
    const self = Event("./config");
    const opts = (d => d && d.__esModule ? d : {
        default: d
    })(Event("./text"));
    const value = (() => {
        /**
         * @return {undefined}
         */
        function init() {
            animate(this, init);
            this.obj = new THREE.Object3D;
            /** @type {string} */
            this.obj.name = "bottle";
            /** @type {null} */
            this.trail = null;
            this.bottle = new THREE.Object3D;
            const legMaterial = new THREE.MeshBasicMaterial({
                map: self.loader.load("res/head.png")
            });
            this.human = new THREE.Object3D;
            this.head = new THREE.Mesh(new THREE.SphereGeometry(2.1 * 0.45, 20, 20), legMaterial);
            /** @type {boolean} */
            this.head.castShadow = true;
            this.bottom = new THREE.Mesh(new THREE.CylinderGeometry(0.8316, 1.20015, 2.1 * 0.45 * 2.68, 20), new THREE.MeshBasicMaterial({
                map: self.loader.load("res/bottom.png")
            }));
            /** @type {number} */
            this.bottom.rotation.y = 4.7;
            /** @type {boolean} */
            this.bottom.castShadow = true;
            const sd = new THREE.CylinderGeometry(2.1 * 0.45, 0.8316, 2.1 * 0.45 * 1.2, 20);
            /** @type {Array} */
            const cubeMaterial = [new THREE.MeshBasicMaterial({
                map: self.loader.load("res/top.png")
            }), legMaterial];
            const plane = new THREE.Geometry;
            sd.rotateY(4.7);
            this.merge(plane, sd, 0, [{
                x: 0,
                y: this.bottom.position.y + 2.1 * 0.45 * 1.94,
                z: 0
            }]);
            const base = new THREE.SphereGeometry(2.1 * 0.45, 20, 20);
            base.scale(1, 0.54, 1);
            this.merge(plane, base, 1, [{
                x: 0,
                y: this.bottom.position.y + 2.4003,
                z: 0
            }]);
            this.middle = new THREE.Mesh(plane, cubeMaterial);
            /** @type {boolean} */
            this.middle.castShadow = true;
            this.body = new THREE.Object3D;
            this.body.add(this.bottom);
            this.body.add(this.middle);
            this.human.add(this.body);
            /** @type {number} */
            this.head.position.y = 4.725;
            this.human.add(this.head);
            this.bottle.add(this.human);
            /** @type {number} */
            this.bottle.position.y = self.BOTTLE.bodyHeight / 2 - 0.25;
            this.obj.add(this.bottle);
            /** @type {string} */
            this.status = "stop";
            /** @type {number} */
            this.scale = 1;
            /** @type {number} */
            this.double = 1;
            this.velocity = {};
            /** @type {number} */
            this.flyingTime = 0;
            /** @type {string} */
            this.direction = "straight";
            /** @type {string} */
            this.jumpStatus = "init";
            /** @type {Array} */
            this.particles = [];
            const material = new THREE.MeshBasicMaterial({
                map: self.loader.load("res/white.png"),
                alphaTest: 0.5
            });
            const markMaterial = new THREE.MeshBasicMaterial({
                map: self.loader.load("res/green.png"),
                alphaTest: 0.5
            });
            const geometry = new THREE.PlaneGeometry(1, 1);
            /** @type {number} */
            let m = 0;
            for (; m < 15; ++m) {
                /** @type {number} */
                (obj = new THREE.Mesh(geometry, material)).rotation.y = -Math.PI / 4;
                /** @type {number} */
                obj.rotation.x = -Math.PI / 5;
                /** @type {number} */
                obj.rotation.z = -Math.PI / 5;
                this.particles.push(obj);
                this.obj.add(obj);
            }
            /** @type {number} */
            m = 0;
            for (; m < 5; ++m) {
                var obj = new THREE.Mesh(geometry, markMaterial);
                /** @type {number} */
                obj.rotation.y = -Math.PI / 4;
                /** @type {number} */
                obj.rotation.x = -Math.PI / 5;
                /** @type {number} */
                obj.rotation.z = -Math.PI / 5;
                this.particles.push(obj);
                this.obj.add(obj);
            }
            this.scoreText = new opts.default("0", {
                fillStyle: 2434341,
                textAlign: "center",
                plusScore: true
            });
            /** @type {boolean} */
            this.scoreText.obj.visible = false;
            /** @type {number} */
            this.scoreText.obj.rotation.y = -Math.PI / 4;
            this.scoreText.obj.scale.set(0.5, 0.5, 0.5);
            this.obj.add(this.scoreText.obj);
        }
        return make(init, [{
            key: "merge",
            /**
             * @param {Object} self
             * @param {Object} data
             * @param {?} record
             * @param {Array} arr
             * @return {undefined}
             */
            value(self, data, record, arr) {
                /** @type {number} */
                let i = 0;
                let padLength = data.faces.length;
                for (; i < padLength; ++i) {
                    /** @type {number} */
                    data.faces[i].materialIndex = 0;
                }
                const obj = new THREE.Mesh(data);
                /** @type {number} */
                i = 0;
                padLength = arr.length;
                for (; i < padLength; ++i) {
                    obj.position.set(arr[i].x, arr[i].y, arr[i].z);
                    obj.updateMatrix();
                    self.merge(obj.geometry, obj.matrix, record);
                }
            }
        }, {
            key: "showAddScore",
            /**
             * @param {(number|string)} newValue
             * @param {?} thisValue
             * @param {?} firstTime
             * @param {?} pathToValue
             * @return {undefined}
             */
            value(newValue, thisValue, firstTime, pathToValue) {
                if (pathToValue) {
                    this.scoreText.setScore(newValue.toString());
                } else {
                    if (thisValue) {
                        if (1 === this.double) {
                            /** @type {number} */
                            this.double = 2;
                        } else {
                            this.double += 2;
                        }
                    } else {
                        /** @type {number} */
                        this.double = 1;
                    }
                    if (firstTime) {
                        if (this.double <= 2) {
                            this.double *= 2;
                        }
                    }
                    /** @type {number} */
                    this.double = Math.min(32, this.double);
                    newValue *= this.double;
                    this.scoreText.setScore(newValue.toString());
                }
                /** @type {boolean} */
                this.scoreText.obj.visible = true;
                /** @type {number} */
                this.scoreText.obj.position.y = 3;
                /** @type {number} */
                this.scoreText.material.opacity = 1;
                (0, event.TweenAnimation)(this.scoreText.obj.position.y, self.BOTTLE.bodyHeight + 6, 700, ry => {
                    if (void 0 !== ry) {
                        /** @type {number} */
                        this.scoreText.obj.position.y = ry;
                    }
                });
                (0, event.TweenAnimation)(this.scoreText.material.opacity, 0, 700, (opacity, dataAndEvents, deepDataAndEvents) => {
                    if (void 0 !== opacity) {
                        /** @type {number} */
                        this.scoreText.material.opacity = opacity;
                        if (deepDataAndEvents) {
                            /** @type {boolean} */
                            this.scoreText.obj.visible = false;
                        }
                    }
                });
            }
        }, {
            key: "changeScorePos",
            /**
             * @param {?} from
             * @return {undefined}
             */
            value(from) {
                this.scoreText.obj.position.z = from;
            }
        }, {
            key: "resetParticles",
            /**
             * @return {undefined}
             */
            value() {
                if (this.gatherTimer) {
                    clearTimeout(this.gatherTimer);
                }
                /** @type {null} */
                this.gatherTimer = null;
                /** @type {number} */
                let i = 0;
                const valuesLen = this.particles.length;
                for (; i < valuesLen; ++i) {
                    /** @type {boolean} */
                    this.particles[i].gathering = false;
                    /** @type {boolean} */
                    this.particles[i].visible = false;
                    /** @type {boolean} */
                    this.particles[i].scattering = false;
                }
            }
        }, {
            key: "scatterParticles",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {number} */
                let i = 0;
                for (; i < 10; ++i) {
                    /** @type {boolean} */
                    this.particles[i].scattering = true;
                    /** @type {boolean} */
                    this.particles[i].gathering = false;
                    this._scatterParticles(this.particles[i]);
                }
            }
        }, {
            key: "_scatterParticles",
            /**
             * @param {Object} scope
             * @return {undefined}
             */
            value(scope) {
                /** @type {number} */
                const i = self.BOTTLE.bodyWidth / 2;
                /** @type {number} */
                const x = (i + Math.random() * (2 - i)) * (1 - 2 * Math.random());
                /** @type {number} */
                const z = (i + Math.random() * (2 - i)) * (1 - 2 * Math.random());
                scope.scale.set(1, 1, 1);
                /** @type {boolean} */
                scope.visible = false;
                /** @type {number} */
                scope.position.x = x;
                /** @type {number} */
                scope.position.y = -0.5;
                /** @type {number} */
                scope.position.z = z;
                setTimeout((scope => () => {
                    if (scope.scattering) {
                        /** @type {boolean} */
                        scope.visible = true;
                        /** @type {number} */
                        const immediate = 0.3 + 0.2 * Math.random();
                        event.customAnimation.to(scope.scale, immediate, {
                            x: 0.2,
                            y: 0.2,
                            z: 0.2
                        });
                        event.customAnimation.to(scope.position, immediate, {
                            x: 2 * x,
                            y: 2.5 * Math.random() + 2,
                            z: 2 * z,
                            /**
                             * @return {undefined}
                             */
                            onComplete() {
                                /** @type {boolean} */
                                scope.scattering = false;
                                /** @type {boolean} */
                                scope.visible = false;
                            }
                        });
                    }
                })(scope), 0);
            }
        }, {
            key: "gatherParticles",
            /**
             * @return {undefined}
             */
            value() {
                const self = this;
                /** @type {number} */
                let i = 10;
                for (; i < 20; ++i) {
                    /** @type {boolean} */
                    this.particles[i].gathering = true;
                    /** @type {boolean} */
                    this.particles[i].scattering = false;
                    this._gatherParticles(this.particles[i]);
                }
                /** @type {number} */
                this.gatherTimer = setTimeout(() => {
                    /** @type {number} */
                    let i = 0;
                    for (; i < 10; ++i) {
                        /** @type {boolean} */
                        self.particles[i].gathering = true;
                        /** @type {boolean} */
                        self.particles[i].scattering = false;
                        self._gatherParticles(self.particles[i]);
                    }
                }, 500 + 1E3 * Math.random());
            }
        }, {
            key: "_gatherParticles",
            /**
             * @param {Object} scope
             * @return {undefined}
             */
            value(scope) {
                const fn = this;
                scope.scale.set(1, 1, 1);
                /** @type {boolean} */
                scope.visible = false;
                /** @type {number} */
                const x = Math.random() > 0.5 ? 1 : -1;
                /** @type {number} */
                const DEPTH = Math.random() > 0.5 ? 1 : -1;
                /** @type {number} */
                scope.position.x = (1 + 7 * Math.random()) * x;
                /** @type {number} */
                scope.position.y = 1 + 7 * Math.random();
                /** @type {number} */
                scope.position.z = (1 + 7 * Math.random()) * DEPTH;
                setTimeout((scope => () => {
                    if (scope.gathering) {
                        /** @type {boolean} */
                        scope.visible = true;
                        /** @type {number} */
                        const n = 0.5 + 0.4 * Math.random();
                        (0, event.TweenAnimation)(scope.scale.x, 0.8 + Math.random(), 1E3 * n, tx => {
                            if (void 0 !== tx) {
                                /** @type {number} */
                                scope.scale.x = tx;
                            }
                        });
                        (0, event.TweenAnimation)(scope.scale.y, 0.8 + Math.random(), 1E3 * n, ry => {
                            if (void 0 !== ry) {
                                /** @type {number} */
                                scope.scale.y = ry;
                            }
                        });
                        (0, event.TweenAnimation)(scope.scale.z, 0.8 + Math.random(), 1E3 * n, zOrder => {
                            if (void 0 !== zOrder) {
                                /** @type {number} */
                                scope.scale.z = zOrder;
                            }
                        });
                        (0, event.TweenAnimation)(scope.position.x, Math.random() * x, 1E3 * n, tx => {
                            if (void 0 !== tx) {
                                /** @type {number} */
                                scope.position.x = tx;
                            }
                        });
                        (0, event.TweenAnimation)(scope.position.y, 2.5 * Math.random(), 1E3 * n, ry => {
                            if (void 0 !== ry) {
                                /** @type {number} */
                                scope.position.y = ry;
                            }
                        });
                        (0, event.TweenAnimation)(scope.position.z, Math.random() * DEPTH, 1E3 * n, (zOrder, dataAndEvents) => {
                            if (void 0 !== zOrder) {
                                /** @type {number} */
                                scope.position.z = zOrder;
                                if (dataAndEvents) {
                                    if (scope.gathering) {
                                        fn._gatherParticles(scope);
                                    }
                                }
                            }
                        });
                    }
                })(scope), 500 * Math.random());
            }
        }, {
            key: "update",
            /**
             * @param {?} x
             * @return {undefined}
             */
            value(x) {
                if ("stop" != this.status) {
                    if ("prepare" == this.status) {
                        this._prepare();
                    } else {
                        if ("jump" == this.status) {
                            this._jump(x);
                        } else {
                            if ("turn" == this.status) {
                                this.turn();
                            }
                        }
                    }
                }
            }
        }, {
            key: "lookAt",
            /**
             * @param {string} dir
             * @param {?} thisValue
             * @return {undefined}
             */
            value(dir, thisValue) {
                if (dir !== this.direction) {
                    if ("straight" === dir) {
                        /** @type {number} */
                        this.turnAngle = -Math.PI / 2;
                        /** @type {number} */
                        this.angle = 0;
                    } else {
                        /** @type {number} */
                        this.turnAngle = Math.PI / 2;
                        /** @type {number} */
                        this.angle = Math.PI / 2;
                    }
                    /** @type {string} */
                    this.direction = dir;
                }
            }
        }, {
            key: "turn",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {number} */
                const deltaY = this.turnAngle > 0 ? 0.2 : -0.2;
                this.bottle.rotation.y += deltaY;
                this.turnAngle -= deltaY;
                if (this.turnAngle >= -0.2) {
                    if (this.turnAngle <= 0.2) {
                        this.bottle.rotation.y = this.angle;
                        /** @type {string} */
                        this.status = "stop";
                    }
                }
            }
        }, {
            key: "fall",
            /**
             * @return {undefined}
             */
            value() {
                const that = this;
                this.stop();
                setTimeout(() => {
                    /** @type {string} */
                    that.status = "fall";
                    (0, event.TweenAnimation)(that.obj.position.y, -self.BLOCK.height / 2 - 0.3, 400, function(ry) {
                        if (void 0 !== ry) {
                            /** @type {number} */
                            this.obj.position.y = ry;
                        }
                    }.bind(that));
                }, 0);
            }
        }, {
            key: "forerake",
            /**
             * @return {undefined}
             */
            value() {
                const that = this;
                this.stop();
                /** @type {string} */
                this.status = "forerake";
                setTimeout(() => {
                    if ("straight" === that.direction) {
                        (0, event.TweenAnimation)(that.obj.rotation.z, -Math.PI / 2, 1E3, function(zOrder) {
                            if (void 0 !== zOrder) {
                                /** @type {number} */
                                this.obj.rotation.z = zOrder;
                            }
                        }.bind(that));
                    } else {
                        (0, event.TweenAnimation)(that.obj.rotation.x, -Math.PI / 2, 1E3, function(tx) {
                            if (void 0 !== tx) {
                                /** @type {number} */
                                this.obj.rotation.x = tx;
                            }
                        }.bind(that));
                    }
                    setTimeout(() => {
                        if ("suspend" != that.status) {
                            (0, event.TweenAnimation)(that.obj.position.y, -self.BLOCK.height / 2 + 1.2, 400, function(ry, dataAndEvents) {
                                if (void 0 !== ry) {
                                    /** @type {number} */
                                    this.obj.position.y = ry;
                                }
                            }.bind(that));
                            event.customAnimation.to(that.head.position, 0.2, {
                                x: -1.125
                            });
                            event.customAnimation.to(that.head.position, 0.2, {
                                x: 0,
                                delay: 0.2
                            });
                        } else {
                            /** @type {string} */
                            that.status = "stop";
                        }
                    }, 200);
                }, 200);
            }
        }, {
            key: "hypsokinesis",
            /**
             * @return {undefined}
             */
            value() {
                const that = this;
                this.stop();
                /** @type {string} */
                this.status = "hypsokinesis";
                setTimeout(() => {
                    if ("straight" === that.direction) {
                        (0, event.TweenAnimation)(that.obj.rotation.z, Math.PI / 2, 800, function(zOrder) {
                            if (void 0 !== zOrder) {
                                /** @type {number} */
                                this.obj.rotation.z = zOrder;
                            }
                        }.bind(that));
                    } else {
                        (0, event.TweenAnimation)(that.obj.rotation.x, Math.PI / 2, 800, function(tx) {
                            if (void 0 !== tx) {
                                /** @type {number} */
                                this.obj.rotation.x = tx;
                            }
                        }.bind(that));
                    }
                    setTimeout(() => {
                        if ("suspend" != that.status) {
                            (0, event.TweenAnimation)(that.obj.position.y, -self.BLOCK.height / 2 + 1.2, 400, function(ry, dataAndEvents) {
                                if (void 0 !== ry) {
                                    /** @type {number} */
                                    this.obj.position.y = ry;
                                }
                            }.bind(that));
                            event.customAnimation.to(that.head.position, 0.2, {
                                x: 1.125
                            });
                            event.customAnimation.to(that.head.position, 0.2, {
                                x: 0,
                                delay: 0.2
                            });
                        } else {
                            /** @type {string} */
                            that.status = "stop";
                        }
                    }, 350);
                }, 200);
            }
        }, {
            key: "_jump",
            /**
             * @param {number} dt
             * @return {undefined}
             */
            value(dt) {
                const desired = new THREE.Vector3(0, 0, 0);
                /** @type {number} */
                desired.z = this.velocity.vz * dt;
                /** @type {number} */
                desired.y = this.velocity.vy * dt - self.GAME.gravity / 2 * dt * dt - self.GAME.gravity * this.flyingTime * dt;
                this.flyingTime += dt;
                this.obj.translateY(desired.y);
                this.obj.translateOnAxis(this.axis, desired.z);
            }
        }, {
            key: "squeeze",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {number} */
                this.obj.position.y = self.BLOCK.height / 2;
                event.customAnimation.to(this.body.scale, 0.15, {
                    y: 0.9,
                    x: 1.07,
                    z: 1.07
                });
                event.customAnimation.to(this.body.scale, 0.15, {
                    y: 1,
                    x: 1,
                    z: 1,
                    delay: 0.15
                });
                event.customAnimation.to(this.head.position, 0.15, {
                    y: 4.725,
                    delay: 0.15
                });
            }
        }, {
            key: "stop",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {string} */
                this.status = "stop";
                /** @type {number} */
                this.flyingTime = 0;
                /** @type {number} */
                this.scale = 1;
                this.velocity = {};
                /** @type {string} */
                this.jumpStatus = "init";
            }
        }, {
            key: "suspend",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {string} */
                this.status = "suspend";
                event.TweenAnimation.killAll();
            }
        }, {
            key: "rotate",
            /**
             * @return {undefined}
             */
            value() {
                if (event.TweenAnimation.killAll(), "straight" === this.direction) {
                    (0, event.TweenAnimation)(this.obj.rotation.z, 0, 300, zOrder => {
                        if (void 0 !== zOrder) {
                            /** @type {number} */
                            this.obj.rotation.z = zOrder;
                        }
                    });
                    var distance;
                    /** @type {number} */
                    distance = this.status.includes("forerake") ? 2 : -2;
                    (0, event.TweenAnimation)(this.obj.position.x, this.obj.position.x + distance, 300, tx => {
                        if (void 0 !== tx) {
                            /** @type {number} */
                            this.obj.position.x = tx;
                        }
                    });
                } else {
                    (0, event.TweenAnimation)(this.obj.rotation.x, 0, 300, tx => {
                        if (void 0 !== tx) {
                            /** @type {number} */
                            this.obj.rotation.x = tx;
                        }
                    });
                    /** @type {number} */
                    distance = this.status.includes("forerake") ? -2 : 2;
                    (0, event.TweenAnimation)(this.obj.position.z, this.obj.position.z + distance, 300, zOrder => {
                        if (void 0 !== zOrder) {
                            /** @type {number} */
                            this.obj.position.z = zOrder;
                        }
                    });
                }
                (0, event.TweenAnimation)(this.head.position.x, 0, 100, tx => {
                    if (void 0 !== tx) {
                        /** @type {number} */
                        this.head.position.x = tx;
                    }
                });
                (0, event.TweenAnimation)(this.obj.position.y, -self.BLOCK.height / 2, 300, (ry, dataAndEvents) => {
                    if (void 0 !== ry) {
                        /** @type {number} */
                        this.obj.position.y = ry;
                        if (dataAndEvents) {
                            /** @type {string} */
                            this.status = "stop";
                        }
                    }
                });
                /** @type {string} */
                this.status = "rotate";
            }
        }, {
            key: "_prepare",
            /**
             * @return {undefined}
             */
            value() {
                if (this.scale -= self.BOTTLE.reduction, this.scale = Math.max(self.BOTTLE.minScale, this.scale), !(this.scale <= self.BOTTLE.minScale)) {
                    /** @type {number} */
                    this.body.scale.y = this.scale;
                    this.body.scale.x += 0.007;
                    this.body.scale.z += 0.007;
                    this.head.position.y -= 0.018;
                    this.obj.position.y -= self.BLOCK.reduction / 2 * self.BLOCK.height / 2 + 0.027;
                }
            }
        }, {
            key: "prepare",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {string} */
                this.status = "prepare";
                this.gatherParticles();
            }
        }, {
            key: "jump",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                this.resetParticles();
                /** @type {string} */
                this.status = "jump";
                this.axis = thisValue;
                event.customAnimation.to(this.body.scale, 0.25, {
                    x: 1,
                    y: 1,
                    z: 1
                });
                /** @type {number} */
                this.head.position.y = 4.725;
                /** @type {number} */
                this.scale = 1;
                /** @type {number} */
                const dx = Math.min(Math.max(this.velocity.vz / 35, 1.2), 1.4);
                /** @type {number} */
                this.human.rotation.z = this.human.rotation.x = 0;
                if ("straight" === this.direction) {
                    event.customAnimation.to(this.human.rotation, 0.14, {
                        z: this.human.rotation.z - Math.PI
                    });
                    event.customAnimation.to(this.human.rotation, 0.18, {
                        z: this.human.rotation.z - 2 * Math.PI,
                        delay: 0.14
                    });
                    event.customAnimation.to(this.head.position, 0.1, {
                        y: this.head.position.y + 0.9 * dx,
                        x: this.head.position.x + 0.45 * dx
                    });
                    event.customAnimation.to(this.head.position, 0.1, {
                        y: this.head.position.y - 0.9 * dx,
                        x: this.head.position.x - 0.45 * dx,
                        delay: 0.1
                    });
                    event.customAnimation.to(this.head.position, 0.15, {
                        y: 4.725,
                        x: 0,
                        delay: 0.25
                    });
                    event.customAnimation.to(this.body.scale, 0.1, {
                        y: Math.max(dx, 1),
                        x: Math.max(Math.min(1 / dx, 1), 0.7),
                        z: Math.max(Math.min(1 / dx, 1), 0.7)
                    });
                    event.customAnimation.to(this.body.scale, 0.1, {
                        y: Math.min(0.9 / dx, 0.7),
                        x: Math.max(dx, 1.2),
                        z: Math.max(dx, 1.2),
                        delay: 0.1
                    });
                    event.customAnimation.to(this.body.scale, 0.3, {
                        y: 1,
                        x: 1,
                        z: 1,
                        delay: 0.2
                    });
                } else {
                    event.customAnimation.to(this.human.rotation, 0.14, {
                        x: this.human.rotation.x - Math.PI
                    });
                    event.customAnimation.to(this.human.rotation, 0.18, {
                        x: this.human.rotation.x - 2 * Math.PI,
                        delay: 0.14
                    });
                    event.customAnimation.to(this.head.position, 0.1, {
                        y: this.head.position.y + 0.9 * dx,
                        z: this.head.position.z - 0.45 * dx
                    });
                    event.customAnimation.to(this.head.position, 0.1, {
                        z: this.head.position.z + 0.45 * dx,
                        y: this.head.position.y - 0.9 * dx,
                        delay: 0.1
                    });
                    event.customAnimation.to(this.head.position, 0.15, {
                        y: 4.725,
                        z: 0,
                        delay: 0.25
                    });
                    event.customAnimation.to(this.body.scale, 0.05, {
                        y: Math.max(dx, 1),
                        x: Math.max(Math.min(1 / dx, 1), 0.7),
                        z: Math.max(Math.min(1 / dx, 1), 0.7)
                    });
                    event.customAnimation.to(this.body.scale, 0.05, {
                        y: Math.min(0.9 / dx, 0.7),
                        x: Math.max(dx, 1.2),
                        z: Math.max(dx, 1.2),
                        delay: 0.1
                    });
                    event.customAnimation.to(this.body.scale, 0.2, {
                        y: 1,
                        x: 1,
                        z: 1,
                        delay: 0.2
                    });
                }
            }
        }, {
            key: "showup",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {string} */
                this.status = "showup";
                /** @type {number} */
                this.obj.position.y = 25;
                /** @type {number} */
                this.human.rotation.x = this.human.rotation.z = 0;
                (0, event.TweenAnimation)(this.obj.position.y, self.BLOCK.height / 2, 500, "Bounce.easeOut", (ry, dataAndEvents) => {
                    if (void 0 !== ry) {
                        /** @type {number} */
                        this.obj.position.y = ry;
                        if (dataAndEvents) {
                            /** @type {string} */
                            this.status = "stop";
                        }
                    }
                });
            }
        }, {
            key: "stopPrepare",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {number} */
                this.obj.position.y = self.BLOCK.height / 2;
                this.stop();
                this.body.scale.set(1, 1, 1);
                /** @type {number} */
                this.head.position.y = 4.725;
                /** @type {number} */
                this.head.position.x = 0;
                this.resetParticles();
            }
        }, {
            key: "getBox",
            /**
             * @return {?}
             */
            value() {
                return [(new THREE.Box3).setFromObject(this.head), (new THREE.Box3).setFromObject(this.middle), (new THREE.Box3).setFromObject(this.bottom)];
            }
        }, {
            key: "reset",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                this.stop();
                /** @type {number} */
                this.obj.position.y = self.BLOCK.height / 2;
                /** @type {number} */
                this.obj.position.x = this.obj.position.z = 0;
                /** @type {number} */
                this.obj.rotation.z = 0;
                /** @type {number} */
                this.obj.rotation.y = 0;
                /** @type {number} */
                this.obj.rotation.x = 0;
                /** @type {number} */
                this.bottle.rotation.y = 0;
                /** @type {number} */
                this.bottle.rotation.z = 0;
                /** @type {number} */
                this.bottle.rotation.x = 0;
                if (this.body) {
                    if (this.head) {
                        this.body.scale.set(1, 1, 1);
                        /** @type {number} */
                        this.body.rotation.z = this.body.rotation.x = this.body.rotation.y = 0;
                        /** @type {number} */
                        this.head.position.y = 4.725;
                        /** @type {number} */
                        this.head.position.x = 0;
                        /** @type {number} */
                        this.human.rotation.y = this.human.rotation.z = this.human.rotation.x = 0;
                    }
                }
                if (!thisValue) {
                    /** @type {string} */
                    this.direction = "straight";
                }
                /** @type {string} */
                this.jumpStatus = "init";
                /** @type {number} */
                this.double = 1;
                this.resetParticles();
                /** @type {boolean} */
                this.scoreText.obj.visible = false;
                /** @type {Array} */
                this.destination = [];
            }
        }]), init;
    })();
    obj.default = value;
});