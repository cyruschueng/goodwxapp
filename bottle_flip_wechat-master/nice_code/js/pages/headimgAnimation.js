define("js/pages/headimgAnimation.js", (jQuery, dataAndEvents, object) => {
  /**
   * @param {?} from_instance
   * @param {Function} update
   * @return {undefined}
   */
  function copy(from_instance, update) {
    if (!(from_instance instanceof update)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const progress = (() => {
    /**
     * @param {Function} object
     * @param {Array} d
     * @return {undefined}
     */
    function defineProperty(object, d) {
      /** @type {number} */
      let i = 0;
      for (;i < d.length;i++) {
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
  })(jQuery("../lib/three"));
  const self = jQuery("../lib/animation");
  const loader = jQuery("../config");
  const obj = (d => d && d.__esModule ? d : {
    default : d
  })(jQuery("../lib/mue/eventcenter"));
  const Cls = (() => {
    /**
     * @param {boolean} message2
     * @param {string} val
     * @return {undefined}
     */
    function update(message2, val) {
      copy(this, update);
      let geometry = new THREE.Shape;
      geometry = this.roundedRect(geometry, -1.5, -1.5, 3, 3, 0.25);
      new THREE.Shape;
      const mesh = new THREE.ShapeGeometry(geometry);
      this.reMapUv(mesh);
      this.avatorFrame = new THREE.Mesh(mesh, new THREE.MeshBasicMaterial({
        transparent : true,
        map : message2,
        opacity : 1
      }));
      this.outer = new THREE.Mesh(mesh, new THREE.MeshBasicMaterial({
        transparent : true,
        color : 16777215,
        opacity : 1
      }));
      this.outer.scale.set(1.05, 1.05, 1.05);
      /** @type {number} */
      this.outer.position.z = -0.1;
      this.obj = new THREE.Object3D;
      this.obj.add(this.avatorFrame);
      this.obj.add(this.outer);
      /** @type {string} */
      this.id = val;
      /** @type {Array} */
      this.waitingList = [];
    }
    return progress(update, [{
      key : "roundedRect",
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @param {number} radius
       * @return {?}
       */
      value(ctx, x, y, width, height, radius) {
        return ctx.moveTo(x, y + radius), ctx.lineTo(x, y + height - radius), ctx.quadraticCurveTo(x, y + height, x + radius, y + height), ctx.lineTo(x + width - radius, y + height), ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius), ctx.lineTo(x + width, y + radius), ctx.quadraticCurveTo(x + width, y, x + width - radius, y), ctx.lineTo(x + radius, y), ctx.quadraticCurveTo(x, y, x, y + radius), ctx;
      }
    }, {
      key : "reMapUv",
      /**
       * @param {Object} geometry
       * @return {undefined}
       */
      value(geometry) {
        geometry.computeBoundingBox();
        const max = geometry.boundingBox.max;
        const min = geometry.boundingBox.min;
        const size = new THREE.Vector2(0 - min.x, 0 - min.y);
        const offsetCoordinate = new THREE.Vector2(max.x - min.x, max.y - min.y);
        const fs = geometry.faces;
        /** @type {Array} */
        geometry.faceVertexUvs[0] = [];
        /** @type {number} */
        let i = 0;
        for (;i < fs.length;i++) {
          const pos = geometry.vertices[fs[i].a];
          const scroll = geometry.vertices[fs[i].b];
          const start = geometry.vertices[fs[i].c];
          geometry.faceVertexUvs[0].push([new THREE.Vector2((pos.x + size.x) / offsetCoordinate.x, (pos.y + size.y) / offsetCoordinate.y), new THREE.Vector2((scroll.x + size.x) / offsetCoordinate.x, (scroll.y + size.y) / offsetCoordinate.y), new THREE.Vector2((start.x + size.x) / offsetCoordinate.x, (start.y + size.y) / offsetCoordinate.y)]);
        }
        /** @type {boolean} */
        geometry.uvsNeedUpdate = true;
      }
    }]), update;
  })();
  const prototype = (() => {
    /**
     * @return {undefined}
     */
    function update() {
      copy(this, update);
      this.obj = new THREE.Object3D;
      /** @type {Array} */
      this.list = [];
      /** @type {Array} */
      this.secondList = [];
      const geometry = new THREE.PlaneBufferGeometry(26, 0.76, 30);
      this.progress = new THREE.Object3D;
      const sessionNameMap = loader.loader.load("res/progress2.png");
      const beamGeometry = new THREE.CircleGeometry(0.38, 15, 0, Math.PI);
      this.roundCircle = new THREE.Mesh(beamGeometry, new THREE.MeshBasicMaterial({
        map : sessionNameMap
      }));
      this.roundCircleBack = new THREE.Mesh(beamGeometry, new THREE.MeshBasicMaterial({
        transparent : true,
        opacity : 0.08,
        color : 0
      }));
      this.secondRoundCircleBack = this.roundCircleBack.clone();
      this.secondRoundCircle = this.roundCircle.clone();
      this.backgroundBar = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        transparent : true,
        opacity : 0.08,
        color : 0
      }));
      this.progressBar = new THREE.Object3D;
      this.progressBar.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        map : sessionNameMap,
        transparent : true
      })));
      this.progressShadow = new THREE.Mesh(new THREE.PlaneGeometry(26, 0.38), new THREE.MeshBasicMaterial({
        transparent : true,
        color : 16777215,
        opacity : 0.08
      }));
      this.progressShadow.position.set(0, 0.19, 0.1);
      this.progressBar.add(this.progressShadow);
      this.progress.add(this.roundCircleBack);
      /** @type {number} */
      this.secondRoundCircleBack.position.z = this.roundCircleBack.position.z = this.backgroundBar.position.z = -0.1;
      this.progress.add(this.secondRoundCircleBack);
      this.progress.add(this.backgroundBar);
      this.progress.add(this.progressBar);
      /** @type {number} */
      this.roundCircle.rotation.z = this.roundCircleBack.rotation.z = -Math.PI / 2;
      /** @type {number} */
      this.roundCircle.position.x = this.roundCircleBack.position.x = 13;
      this.secondRoundCircle = this.roundCircle.clone();
      /** @type {number} */
      this.secondRoundCircle.rotation.z = this.secondRoundCircleBack.rotation.z = Math.PI / 2;
      /** @type {number} */
      this.secondRoundCircle.position.x = this.secondRoundCircleBack.position.x = -13;
      this.progress.add(this.roundCircle);
      this.progress.add(this.secondRoundCircle);
      this.progress.position.set(8.2, 3.25, 0);
      this.obj.add(this.progress);
      this.turnAudio = wx.createInnerAudioContext();
      /** @type {string} */
      this.turnAudio.src = "res/turn.mp3";
    }
    return progress(update, [{
      key : "set",
      /**
       * @param {Array} values
       * @param {?} opts
       * @return {undefined}
       */
      value(values, opts) {
        const el = this;
        this.destroy();
        /** @type {Array} */
        this.list = [];
        /** @type {number} */
        let i = 0;
        const valuesLen = values.length;
        for (;i < valuesLen;++i) {
          if (!("/0" != values[i].headimg && ("/96" != values[i].headimg && ("/64" != values[i].headimg && values[i].headimg)))) {
            /** @type {string} */
            values[i].headimg = "res/ava.png";
          }
          const geometry = loader.loader.load(values[i].headimg);
          var obj = new Cls(geometry, values[i].seat_no);
          this.obj.add(obj.obj);
          /** @type {number} */
          obj.obj.position.x = 4 * (i - 5 >= 1 ? i - 5 : i);
          if (0 == i) {
            obj.obj.scale.set(2.2, 2.2, 2.2);
            obj.obj.position.set(-1.8, -1.8, 0);
          }
          if (i >= 6) {
            /** @type {number} */
            obj.obj.position.y = -3.5;
          }
          this.list.push(obj);
          const p = new Cls(geometry, values[i].seat_no);
          /** @type {boolean} */
          p.obj.visible = false;
          this.obj.add(p.obj);
          this.secondList.push(p);
        }
        /** @type {number} */
        this.progressBar.scale.x = 1;
        /** @type {number} */
        this.progressBar.position.x = 0;
        /** @type {number} */
        this.roundCircle.position.x = 13;
        /** @type {boolean} */
        this.roundCircle.visible = true;
        /** @type {boolean} */
        this.secondRoundCircle.visible = true;
        /** @type {number} */
        let immediate = 5;
        if (opts) {
          if (opts.timeout) {
            /** @type {number} */
            immediate = 1;
          }
        }
        self.customAnimation.to(this.progressBar.scale, immediate, {
          x : 0.01,
          name : "progress",
          /**
           * @return {undefined}
           */
          onComplete() {
            /** @type {number} */
            el.progressBlinkTimer = setInterval(() => {
              /** @type {boolean} */
              el.roundCircle.visible = !el.roundCircle.visible;
              /** @type {boolean} */
              el.secondRoundCircle.visible = !el.secondRoundCircle.visible;
            }, 800);
            if (!(opts && opts.noEmit)) {
              obj.default.emitSync(loader.EVENT.PROGRESSOVER);
            }
          }
        });
        self.customAnimation.to(this.progressBar.position, immediate, {
          x : -13,
          name : "progress"
        });
        self.customAnimation.to(this.roundCircle.position, immediate, {
          x : -13,
          name : "progress"
        });
      }
    }, {
      key : "next",
      /**
       * @param {boolean} item
       * @param {?} error
       * @return {?}
       */
      value(item, error) {
        const that = this;
        if (console.log("next111111"), this.progressBlinkTimer && (clearInterval(this.progressBlinkTimer), this.progressBlinkTimer = null), this.animating) {
          return console.log("waitingList!!!!!!!!"), void this.waitingList.push(item);
        }
        console.log("next22222222");
        self.TweenAnimation.kill("progress");
        /** @type {boolean} */
        this.roundCircle.visible = true;
        /** @type {boolean} */
        this.secondRoundCircle.visible = true;
        /** @type {boolean} */
        this.animating = true;
        const obj = this.list.shift();
        const p = this.secondList.shift();
        if (item && item.now_player_seat_no == obj.id) {
          return console.warn("data \u91cd\u590d\u7684next \u5bfc\u81f4\u5934\u50cf\u4e0d\u5339\u914d"), this.list.unshift(obj), this.secondList.unshift(p), void(this.animating = false);
        }
        if (this.list[0]) {
          if (item) {
            if (item.my_seat_no == item.now_player_seat_no) {
              this.turnAudio.play();
            }
          }
          if (item) {
            if (this.currentDie(obj.id, item.playerlist)) {
              /** @type {boolean} */
              obj.died = true;
            }
          }
          /** @type {number} */
          let immediate = 0.3;
          if (error) {
            if (error.noAnimation) {
              /** @type {number} */
              immediate = 0.01;
            }
          }
          /** @type {number} */
          this.list[0].avatorFrame.material.opacity = 0.3;
          /** @type {number} */
          this.list[0].outer.material.opacity = 0.3;
          self.customAnimation.to(this.list[0].avatorFrame.material, immediate, {
            opacity : 1
          });
          self.customAnimation.to(this.list[0].outer.material, immediate, {
            opacity : 1
          });
          self.customAnimation.to(this.list[0].obj.scale, immediate, {
            x : 2.2,
            y : 2.2,
            z : 2.2
          });
          self.customAnimation.to(this.list[0].obj.position, immediate, {
            x : -1.8,
            y : -1.8
          });
          /** @type {number} */
          this.progressBar.scale.x = 1;
          /** @type {number} */
          this.progressBar.position.x = 0;
          /** @type {number} */
          this.roundCircle.position.x = 13;
          self.customAnimation.to(this.progressBar.scale, 5, {
            x : 0.01,
            name : "progress",
            /**
             * @return {undefined}
             */
            onComplete() {
              console.log("fuck progress over");
              /** @type {number} */
              that.progressBlinkTimer = setInterval(() => {
                /** @type {boolean} */
                that.roundCircle.visible = !that.roundCircle.visible;
                /** @type {boolean} */
                that.secondRoundCircle.visible = !that.secondRoundCircle.visible;
              }, 800);
              if (item) {
                obj.default.emitSync(loader.EVENT.PROGRESSOVER);
              }
            }
          });
          self.customAnimation.to(this.progressBar.position, 5, {
            x : -13,
            name : "progress"
          });
          self.customAnimation.to(this.roundCircle.position, 5, {
            x : -13,
            name : "progress"
          });
          /** @type {number} */
          let i = 1;
          const l = this.list.length;
          for (;i < l;++i) {
            if (5 == i) {
              const a = this.list[5];
              /** @type {number} */
              a.obj.position.z = -1;
              const element = this.secondList[5];
              self.customAnimation.to(a.outer.material, immediate, {
                opacity : 0
              });
              self.customAnimation.to(a.avatorFrame.material, immediate, {
                opacity : 0
              });
              self.customAnimation.to(a.obj.position, immediate, {
                x : 0
              });
              /** @type {boolean} */
              element.obj.visible = true;
              /** @type {number} */
              element.outer.material.opacity = 0;
              /** @type {number} */
              element.avatorFrame.material.opacity = 0;
              /** @type {number} */
              element.obj.position.x = 24;
              /** @type {number} */
              element.obj.position.y = 0;
              self.customAnimation.to(element.obj.position, immediate, {
                x : element.obj.position.x - 4,
                /**
                 * @return {undefined}
                 */
                onEnded() {
                  a.obj.position.x = element.obj.position.x;
                  a.obj.position.y = element.obj.position.y;
                  /** @type {number} */
                  a.outer.material.opacity = 1;
                  /** @type {number} */
                  a.avatorFrame.material.opacity = 1;
                  /** @type {boolean} */
                  element.obj.visible = false;
                }
              });
              self.customAnimation.to(element.avatorFrame.material, immediate, {
                opacity : 1
              });
              self.customAnimation.to(element.outer.material, immediate, {
                opacity : 1
              });
            } else {
              /** @type {number} */
              this.list[i].obj.position.z = 0;
              self.customAnimation.to(this.list[i].obj.position, immediate, {
                x : 4 * (i - 5 >= 1 ? i - 5 : i)
              });
            }
          }
          self.customAnimation.to(obj.obj.position, immediate, {
            x : -8,
            /**
             * @return {undefined}
             */
            onEnded() {
              if (that.animating = false, that.waitingList.length > 0) {
                console.log("onComplete next");
                const err = that.waitingList.shift();
                that.next(err, {
                  noAnimation : true
                });
              }
            }
          });
          self.customAnimation.to(obj.avatorFrame.material, immediate, {
            opacity : 0
          });
          self.customAnimation.to(obj.outer.material, immediate, {
            opacity : 0
          });
          if (obj.died) {
            this.obj.remove(obj.obj);
            this.obj.remove(p.obj);
          } else {
            /** @type {number} */
            p.obj.position.x = 4 * (this.list.length - 5 >= 1 ? this.list.length - 5 : this.list.length) + 4;
            console.log("secondFirstItem obj", p.obj.position.x, this.list.length);
            /** @type {number} */
            p.obj.position.y = this.list.length + 1 > 6 ? -3.5 : 0;
            /** @type {number} */
            p.avatorFrame.material.opacity = 0;
            /** @type {number} */
            p.outer.material.opacity = 0;
            /** @type {boolean} */
            p.obj.visible = true;
            self.customAnimation.to(p.obj.position, immediate, {
              x : p.obj.position.x - 4,
              /**
               * @return {undefined}
               */
              onEnded() {
                obj.obj.scale.set(1, 1, 1);
                obj.obj.position.x = p.obj.position.x;
                obj.obj.position.y = p.obj.position.y;
                console.log("final", obj.obj.position.x, obj.obj.position.y);
                /** @type {number} */
                obj.avatorFrame.material.opacity = 1;
                /** @type {number} */
                obj.outer.material.opacity = 1;
                /** @type {boolean} */
                p.obj.visible = false;
              }
            });
            self.customAnimation.to(p.avatorFrame.material, immediate, {
              opacity : 1
            });
            self.customAnimation.to(p.outer.material, immediate, {
              opacity : 1
            });
            this.list.push(obj);
            this.secondList.push(p);
          }
        } else {
          /** @type {boolean} */
          this.animating = false;
        }
      }
    }, {
      key : "currentJumperDie",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.list[0].died = true;
      }
    }, {
      key : "currentDie",
      /**
       * @param {?} event
       * @param {Array} newValue
       * @return {?}
       */
      value(event, newValue) {
        console.log("id", event, newValue);
        /** @type {number} */
        let i = 0;
        const n = newValue.length;
        for (;i < n;++i) {
          if (newValue[i].seat_no == event && 0 != newValue[i].rank) {
            return true;
          }
        }
      }
    }, {
      key : "destroy",
      /**
       * @return {undefined}
       */
      value() {
        if (this.progressBlinkTimer) {
          clearInterval(this.progressBlinkTimer);
          /** @type {null} */
          this.progressBlinkTimer = null;
        }
        /** @type {number} */
        let i = 0;
        let l = this.list.length;
        for (;i < l;++i) {
          if (this.list[i]) {
            if (this.list[i].obj) {
              if (this.list[i].obj.material) {
                if (this.list[i].obj.material.map) {
                  this.list[i].obj.material.map.dispose();
                }
              }
            }
          }
          this.obj.remove(this.list[i].obj);
        }
        /** @type {number} */
        i = 0;
        l = this.secondList.length;
        for (;i < l;++i) {
          if (this.secondList[i]) {
            if (this.secondList[i].obj) {
              if (this.secondList[i].obj.material) {
                if (this.secondList[i].obj.material.map) {
                  this.secondList[i].obj.material.map.dispose();
                }
              }
            }
          }
          this.obj.remove(this.secondList[i].obj);
        }
        /** @type {Array} */
        this.list = [];
        /** @type {Array} */
        this.secondList = [];
        /** @type {Array} */
        this.waitingList = [];
        /** @type {boolean} */
        this.animating = false;
      }
    }]), update;
  })();
  object.default = prototype;
});
