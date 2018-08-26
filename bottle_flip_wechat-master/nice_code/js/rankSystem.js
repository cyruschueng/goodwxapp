define("js/rankSystem.js", (keys, dataAndEvents, object) => {
  /**
   * @param {?} obj
   * @param {Function} type
   * @return {undefined}
   */
  function promise(obj, type) {
    if (!(obj instanceof type)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   * @return {?}
   */
  function render(ctx, x, y, width, height, radius) {
    return ctx.moveTo(x, y + radius), ctx.lineTo(x, y + height - radius), ctx.quadraticCurveTo(x, y + height, x + radius, y + height), ctx.lineTo(x + width - radius, y + height), ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius), ctx.lineTo(x + width, y + radius), ctx.quadraticCurveTo(x + width, y, x + width - radius, y), ctx.lineTo(x + radius, y), ctx.quadraticCurveTo(x, y, x, y + radius), ctx;
  }
  /**
   * @param {Object} geometry
   * @return {undefined}
   */
  function parseModel(geometry) {
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
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const make = (() => {
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
  var THREE = (b => {
    if (b && b.__esModule) {
      return b;
    }
    const c = {};
    if (null != b) {
      let e;
      for (e in b) {
        if (Object.prototype.hasOwnProperty.call(b, e)) {
          c[e] = b[e];
        }
      }
    }
    return c.default = b, c;
  })(keys("./lib/three"));
  const obj = (keys("./config"), (d => d && d.__esModule ? d : {
    default : d
  })(keys("./text")));
  const properties = keys("./lib/animation");
  /** @type {number} */
  const n = 1.3;
  /** @type {number} */
  const h = n / 20 * 21;
  const prototype = (() => {
    /**
     * @param {Object} theGame
     * @return {undefined}
     */
    function init(theGame) {
      promise(this, init);
      /** @type {Object} */
      this.game = theGame;
      /** @type {number} */
      this.seed = 0;
      /** @type {number} */
      this.startDist = 0;
      this.hitPoint = {
        uuid : "",
        ready : false,
        texture : null
      };
      this.loader = new THREE.TextureLoader;
      this.text = new obj.default("\u8d85\u8d8a\uff01", {
        fillStyle : 2434341,
        chinese : true,
        textAlign : "center"
      });
      let x = new THREE.Shape;
      x = render(x, -h, -h, 2 * h, 2 * h, 0.5);
      let data = new THREE.Shape;
      data = render(data, -n, -n, 2 * n, 2 * n, 0.5);
      const geometry = new THREE.ShapeGeometry(data);
      parseModel(geometry);
      this.avatorFrame = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        transparent : true,
        opacity : 1
      }));
      this.avatorOuter = new THREE.Mesh(new THREE.ShapeGeometry(x), new THREE.MeshBasicMaterial({
        color : 16777215,
        transparent : true,
        opacity : 1
      }));
      this.text.obj.scale.set(0.8, 0.8, 0.8);
      this.text.obj.position.set(0, 2.2, 0.1);
      this.avatorFrame.position.set(0, 0, 0.1);
      /** @type {number} */
      this.avatorFrame.material.opacity = 0;
      this.avatorOuter.position.set(0, 0, 0);
      /** @type {number} */
      this.avatorOuter.material.opacity = 0;
      /** @type {number} */
      this.text.material.opacity = 0;
      this.obj = new THREE.Object3D;
      /** @type {boolean} */
      this.text.obj.visible = false;
      this.obj.add(this.avatorOuter);
      this.obj.add(this.avatorFrame);
      this.obj.add(this.text.obj);
      this.obj.rotateY(-Math.PI / 4);
      this.obj.rotateX(-Math.PI / 16 * 3);
      this.game.scene.add(this.obj);
      /** @type {boolean} */
      this.obj.visible = false;
    }
    return make(init, [{
      key : "update",
      /**
       * @return {undefined}
       */
      value() {
        if (this.game.gameModel.friendsScore) {
          if (this.game.gameModel.friendsScore.length) {
            this.seed++;
            if (this.hitPoint.uuid == this.game.currentBlock.obj.uuid) {
              if (this.hitPoint.ready) {
                if (this.hitPoint.texture) {
                  if (this.startDist < 2) {
                    this.startDist++;
                    /** @type {boolean} */
                    this.text.obj.visible = true;
                  }
                  this.playAnimate();
                  /** @type {number} */
                  this.seed = 0;
                }
              }
            }
            if (this.seed >= 5) {
              this.checkScore();
            }
          }
        }
      }
    }, {
      key : "checkScore",
      /**
       * @return {undefined}
       */
      value() {
        const score = this.game.UI.score;
        const codeSegments = this.game.gameModel.friendsScore;
        try {
          /** @type {number} */
          let i = 0;
          for (;i < codeSegments.length;i++) {
            if (codeSegments[i].week_best_score == score) {
              this.hitPoint.uuid = this.game.nextBlock.obj.uuid;
              /** @type {boolean} */
              this.hitPoint.ready = false;
              this.animateAvator(codeSegments[i]);
              break;
            }
          }
        } catch (matches) {
          console.log("RankSystem checkScore err:", matches);
        }
      }
    }, {
      key : "animateAvator",
      /**
       * @param {?} page
       * @return {undefined}
       */
      value(page) {
        const req = this;
        this.loader.load(page.headimg, texture => {
          if (req.hitPoint.uuid == req.game.nextBlock.obj.uuid) {
            /** @type {boolean} */
            req.hitPoint.ready = true;
            texture.minFilter = THREE.LinearFilter;
            /** @type {string} */
            req.hitPoint.texture = texture;
          }
        });
      }
    }, {
      key : "playAnimate",
      /**
       * @return {undefined}
       */
      value() {
        const lychee = this;
        this.game.bottle.changeScorePos(3);
        const gravity = this.game.bottle.obj.position.clone();
        const x = gravity.x;
        const z = gravity.z;
        this.obj.position.set(x, 10, z);
        this.avatorFrame.material.map = this.hitPoint.texture;
        /** @type {boolean} */
        this.obj.visible = true;
        properties.customAnimation.to(this.obj.position, 0.4, {
          y : 13
        });
        properties.customAnimation.to(this.text.material, 0.4, {
          opacity : 1
        });
        properties.customAnimation.to(this.avatorOuter.material, 0.4, {
          opacity : 1
        });
        properties.customAnimation.to(this.avatorFrame.material, 0.4, {
          opacity : 1
        });
        properties.customAnimation.to(this.text.material, 0.4, {
          opacity : 0,
          delay : 0.6,
          /**
           * @return {undefined}
           */
          onComplete() {
            lychee.resetAvator();
            lychee.game.bottle.changeScorePos(0);
          }
        });
        properties.customAnimation.to(this.avatorOuter.material, 0.4, {
          opacity : 0,
          delay : 0.6
        });
        properties.customAnimation.to(this.avatorFrame.material, 0.4, {
          opacity : 0,
          delay : 0.6
        });
        /** @type {string} */
        this.hitPoint.uuid = "";
        /** @type {boolean} */
        this.hitPoint.ready = false;
        /** @type {null} */
        this.hitPoint.texture = null;
      }
    }, {
      key : "resetAvator",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.obj.visible = false;
        /** @type {boolean} */
        this.text.obj.visible = false;
        /** @type {number} */
        this.avatorFrame.material.opacity = 0;
        if (this.avatorFrame.material.map) {
          this.avatorFrame.material.map.dispose();
        }
        /** @type {string} */
        this.avatorFrame.material.map = "";
        /** @type {number} */
        this.avatorOuter.material.opacity = 0;
        /** @type {number} */
        this.text.material.opacity = 0;
      }
    }, {
      key : "reset",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        this.seed = 0;
        /** @type {number} */
        this.seed = 0;
        /** @type {number} */
        this.startDist = 0;
        /** @type {number} */
        this.startDist = 0;
        this.hitPoint = {
          uuid : "",
          ready : false,
          texture : null
        };
        /** @type {boolean} */
        this.obj.visible = false;
      }
    }]), init;
  })();
  object.default = prototype;
});
