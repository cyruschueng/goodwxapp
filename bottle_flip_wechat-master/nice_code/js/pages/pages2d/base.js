define("js/pages/pages2d/base.js", (require, dataAndEvents, self) => {
  /**
   * @param {Object} obj
   * @return {undefined}
   */
  function update(obj) {
    if ((obj = Object.assign({}, {
      self : {},
      type : "bg"
    }, obj)).self.showState) {
      if (!(obj.self.canvasType == o.gameOver && ("bg" != obj.type && ("btn" != obj.type && "sample" != obj.type)))) {
        if (!(obj.self.canvasType == o.start && ("bg" != obj.type && ("btn" != obj.type && "sample" != obj.type)))) {
          if (!(obj.self.canvasType == o.record && "bg" != obj.type)) {
            /** @type {boolean} */
            obj.self.texture[obj.type].needsUpdate = true;
            /** @type {boolean} */
            obj.self.obj[obj.type].visible = true;
            obj.self.options.camera.add(obj.self.obj[obj.type]);
          }
        }
      }
    }
  }
  /**
   * @param {?} p1
   * @param {?} p2
   * @param {boolean} dataAndEvents
   * @return {undefined}
   */
  function interpolate(p1, p2, dataAndEvents) {
    if (p1 && p2) {
      const elem = p1.distanceToPoint(p2);
      if (elem < 0) {
        if (!dataAndEvents) {
          p1.negate();
        }
      }
      if (dataAndEvents) {
        if (elem > 0) {
          p1.negate();
        }
      }
    }
  }
  /**
   * @param {Object} self
   * @param {string} obj
   * @return {undefined}
   */
  function loop(self, obj) {
    if (!h) {
      /** @type {boolean} */
      self.showState = false;
      /** @type {number} */
      let i = 0;
      for (;i < codeSegments.length;i++) {
        if (!!self.obj[codeSegments[i]]) {
          if (!(obj && obj.includes(codeSegments[i]))) {
            /** @type {boolean} */
            self.obj[codeSegments[i]].visible = false;
            self.options.camera.remove(self.obj[codeSegments[i]]);
          }
        }
      }
      if (!obj) {
        self.lastopt = void 0;
      }
    }
  }
  /**
   * @param {number} b
   * @return {?}
   */
  function match(b) {
    /** @type {number} */
    let result = b * d / 414;
    return t / d < 736 / 414 && (result = b * t / 736), result * scale;
  }
  /**
   * @param {number} opt_attributes
   * @return {?}
   */
  function f(opt_attributes) {
    /** @type {number} */
    let result = opt_attributes * d / 414;
    return t / d < 736 / 414 && (result = opt_attributes * t / 736 + (d - 414 * t / 736) / 2), result * scale;
  }
  /**
   * @param {number} opt_attributes
   * @return {?}
   */
  function win(opt_attributes) {
    return(t / d > 736 / 414 ? opt_attributes * d / 414 + (t - 736 * d / 414) / 2 : opt_attributes * t / 736) * scale;
  }
  /**
   * @param {number} y
   * @param {string} a
   * @return {?}
   */
  function equal(y, a) {
    /** @type {number} */
    let r = y * scale * d / 414;
    return t / d < 736 / 414 && (r = y * scale * t / 736), a && b ? `${r}px ${b}` : `${r}px Helvetica`;
  }
  /**
   * @param {Object} options
   * @return {undefined}
   */
  function init(options) {
    if (!("/0" != (options = Object.assign({}, {
      self : {},
      src : "",
      pos : [0, 0, 100, 100],
      type : "bg",
      cb : null,
      imgid : 0,
      noupdate : false,
      round : false
    }, options)).src && ("/96" != options.src && ("/64" != options.src && options.src)))) {
      /** @type {string} */
      options.src = "res/ava.png";
    }
    /** @type {Image} */
    const img = new Image;
    const ctx = options.self.context[options.type];
    /**
     * @return {undefined}
     */
    img.onload = () => {
      if (options.self.imgid[options.type] == options.imgid) {
        if (options.round) {
          ctx.save();
          let offsetY = void 0;
          /** @type {number} */
          offsetY = "list1" == options.type || "list2" == options.type ? match(options.pos[1]) - match(options.pos[3]) / 2 : win(options.pos[1]) - match(options.pos[3]) / 2;
          render(f(options.pos[0]) - match(options.pos[2]) / 2, offsetY, match(options.pos[2]), match(options.pos[3]), 2, ctx);
          ctx.clip();
          ctx.drawImage(img, f(options.pos[0]) - match(options.pos[2]) / 2, offsetY, match(options.pos[2]), match(options.pos[3]));
          ctx.closePath();
          ctx.restore();
        } else {
          if ("list1" == options.type || "list2" == options.type) {
            ctx.drawImage(img, f(options.pos[0]) - match(options.pos[2]) / 2, match(options.pos[1]) - match(options.pos[3]) / 2, match(options.pos[2]), match(options.pos[3]));
          } else {
            ctx.drawImage(img, f(options.pos[0]) - match(options.pos[2]) / 2, win(options.pos[1]) - match(options.pos[3]) / 2, match(options.pos[2]), match(options.pos[3]));
          }
        }
        if (!!options.cb) {
          options.cb();
        }
        if (!options.noupdate) {
          update({
            self : options.self,
            type : options.type
          });
        }
      }
    };
    /**
     * @return {undefined}
     */
    img.onerror = () => {
      if (!!options.cb) {
        options.cb();
      }
    };
    img.src = options.src;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   * @param {CanvasRenderingContext2D} ctx
   * @return {undefined}
   */
  function render(x, y, width, height, radius, ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius - 1);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
    ctx.closePath();
  }
  /**
   * @param {string} content
   * @param {number} deepDataAndEvents
   * @return {?}
   */
  function removeComments(content, deepDataAndEvents) {
    return(content = content || "").replace(/[^\x00-\xff]/g, "**").length > deepDataAndEvents && (content = removeComments(content = content.substring(0, content.length - 1), deepDataAndEvents)), content;
  }
  Object.defineProperty(self, "__esModule", {
    value : true
  });
  self.ListLineHeight = self.DEBUG = self.frustumSizeWidth = self.frustumSizeHeight = self.CANVASTYPE = self.WIDTH = self.HEIGHT = self.realDpr = self.Dpr = void 0;
  /**
   * @param {Object} self
   * @param {string} walkers
   * @return {undefined}
   */
  self.createPlane = (self, walkers) => {
    if (loop(self, walkers), self.showState = true, !self.canvas.bg) {
      if (h) {
        /** @type {Array} */
        codeSegments = ["sample", "btn", "list1", "list2", "bg"];
      }
      /** @type {number} */
      let i = 0;
      for (;i < codeSegments.length;i++) {
        /** @type {Element} */
        self.canvas[codeSegments[i]] = document.createElement("canvas");
        self.context[codeSegments[i]] = self.canvas[codeSegments[i]].getContext("2d");
        /** @type {number} */
        self.canvas[codeSegments[i]].width = v;
        if ("list1" == codeSegments[i] || "list2" == codeSegments[i]) {
          /** @type {number} */
          self.canvas[codeSegments[i]].height = 10 * match(oldconfig);
        } else {
          /** @type {number} */
          self.canvas[codeSegments[i]].height = total;
        }
        self.texture[codeSegments[i]] = new THREE.Texture(self.canvas[codeSegments[i]]);
        self.material[codeSegments[i]] = new THREE.MeshBasicMaterial({
          map : self.texture[codeSegments[i]],
          transparent : true
        });
        if ("list1" == codeSegments[i] || "list2" == codeSegments[i]) {
          self.geometry[codeSegments[i]] = new THREE.PlaneBufferGeometry(width, 10 * match(oldconfig) / total * height);
        } else {
          self.geometry[codeSegments[i]] = new THREE.PlaneBufferGeometry(width, height);
        }
        self.obj[codeSegments[i]] = new THREE.Mesh(self.geometry[codeSegments[i]], self.material[codeSegments[i]]);
        self.material[codeSegments[i]].map.minFilter = THREE.LinearFilter;
        /** @type {number} */
        self.obj[codeSegments[i]].position.y = 0;
        /** @type {number} */
        self.obj[codeSegments[i]].position.x = 0;
        /** @type {number} */
        self.obj[codeSegments[i]].position.z = 9 - 0.001 * i;
      }
      if (h) {
        if (T) {
          /** @type {number} */
          self.context.sample.globalAlpha = 0.4;
          setTimeout(() => {
            init({
              self,
              src : "res/sample.png",
              pos : [207, 368, 414, 736],
              type : "sample",
              imgid : self.imgid.sample
            });
          }, 2E3);
        }
      }
    }
  };
  /** @type {function (Object): undefined} */
  self.updatePlane = update;
  /**
   * @param {Object} me
   * @return {undefined}
   */
  self.updateClip = me => {
    const data = me.self;
    if (!data.p0) {
      data.p0 = new THREE.Vector3(0, 0, 9);
      data.p1 = new THREE.Vector3(-width * (0.5 - f(30) / v), (0.5 - win(143) / total) * height, 9);
      data.p2 = new THREE.Vector3(width * (0.5 - f(30) / v), height * (0.5 - win(143) / total), 9);
      data.p3 = new THREE.Vector3(width * (0.5 - f(30) / v), -height * (0.5 - win(144) / total), 9);
      data.p4 = new THREE.Vector3(-width * (0.5 - f(30) / v), -height * (0.5 - win(144) / total), 9);
    }
    if (!data.p5) {
      data.p5 = new THREE.Vector3(-width * (0.5 - f(30) / v), (0.5 - win(205) / total) * height, 9);
      data.p6 = new THREE.Vector3(width * (0.5 - f(30) / v), height * (0.5 - win(205) / total), 9);
      data.p7 = new THREE.Vector3(width * (0.5 - f(30) / v), -height * (0.5 - win(104) / total), 9);
      data.p8 = new THREE.Vector3(-width * (0.5 - f(30) / v), -height * (0.5 - win(104) / total), 9);
    }
    if (!data.p9) {
      data.p9 = new THREE.Vector3(-width * (0.5 - f(30) / v), -height * (0.5 - win(332) / total), 9);
      data.p10 = new THREE.Vector3(width * (0.5 - f(30) / v), -height * (0.5 - win(332) / total), 9);
      data.p11 = new THREE.Vector3(width * (0.5 - f(30) / v), -height * (0.5 - win(175) / total), 9);
      data.p12 = new THREE.Vector3(-width * (0.5 - f(30) / v), -height * (0.5 - win(175) / total), 9);
    }
    if (!data.p13) {
      data.p13 = new THREE.Vector3(-width * (0.5 - f(30) / v), (0.5 - win(318) / total) * height, 9);
      data.p14 = new THREE.Vector3(width * (0.5 - f(30) / v), height * (0.5 - win(318) / total), 9);
      data.p15 = new THREE.Vector3(width * (0.5 - f(30) / v), -height * (0.5 - win(176) / total), 9);
      data.p16 = new THREE.Vector3(-width * (0.5 - f(30) / v), -height * (0.5 - win(176) / total), 9);
    }
    const vertex = data.p0.clone();
    let v1 = data.p1.clone();
    let options = data.p2.clone();
    let radius = data.p3.clone();
    let pos = data.p4.clone();
    if (data.canvasType == o.pk) {
      v1 = data.p5.clone();
      options = data.p6.clone();
      radius = data.p7.clone();
      pos = data.p8.clone();
    }
    if (data.canvasType == o.relayRank) {
      v1 = data.p9.clone();
      options = data.p10.clone();
      radius = data.p11.clone();
      pos = data.p12.clone();
      if (1 != data.opt.my_rank) {
        v1 = data.p13.clone();
        options = data.p14.clone();
        radius = data.p15.clone();
        pos = data.p16.clone();
      }
    }
    data.options.camera.updateMatrixWorld();
    const matrix = data.options.camera.matrixWorld;
    vertex.applyMatrix4(matrix);
    v1.applyMatrix4(matrix);
    options.applyMatrix4(matrix);
    radius.applyMatrix4(matrix);
    pos.applyMatrix4(matrix);
    let view = new THREE.Triangle(options, v1);
    const msg = view.plane();
    if (data.canvasType == o.relayRank && 1 == data.opt.my_rank) {
      interpolate(msg, vertex.clone(), true);
    } else {
      interpolate(msg, vertex.clone());
    }
    const a = (view = new THREE.Triangle(radius, options)).plane();
    interpolate(a, vertex.clone());
    const ll = (view = new THREE.Triangle(pos, radius)).plane();
    interpolate(ll, vertex.clone());
    const pp = (view = new THREE.Triangle(v1, pos)).plane();
    interpolate(pp, vertex.clone());
    /** @type {Array} */
    data.material.list1.clippingPlanes = [msg, a, ll, pp];
    /** @type {boolean} */
    data.material.list1.needsUpdate = true;
    /** @type {Array} */
    data.material.list2.clippingPlanes = [msg, a, ll, pp];
    /** @type {boolean} */
    data.material.list2.needsUpdate = true;
  };
  /** @type {function (Object, string): undefined} */
  self.hide = loop;
  /** @type {function (number): ?} */
  self.cwh = match;
  /** @type {function (number): ?} */
  self.cx = f;
  /** @type {function (number): ?} */
  self.cy = win;
  /**
   * @param {Array} keys
   * @return {?}
   */
  self.rerank = keys => {
    let i;
    let key;
    /** @type {number} */
    let value = 0;
    const len = keys.length;
    for (;value < len;value++) {
      /** @type {number} */
      i = 0;
      for (;i < len;i++) {
        if (keys[value].week_best_score > keys[i].week_best_score) {
          key = keys[i];
          keys[i] = keys[value];
          keys[value] = key;
        }
      }
    }
    return keys;
  };
  /** @type {function (Object): undefined} */
  self.drawImageCenter = init;
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Object} dataAndEvents
   * @return {undefined}
   */
  self.drawHomeImg = (context, dataAndEvents) => {
    /** @type {Image} */
    const bee = new Image;
    /**
     * @return {undefined}
     */
    bee.onload = () => {
      if (1624 == total && 750 == v) {
        context.drawImage(bee, 10 * scale, 44 * scale, 104, 64);
      } else {
        context.drawImage(bee, 10 * scale, 10 * scale, 104, 64);
      }
      update({
        self : dataAndEvents,
        type : "bg"
      });
    };
    /** @type {string} */
    bee.src = "res/2d/home.png";
  };
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Object} dataAndEvents
   * @return {undefined}
   */
  self.drawReturnImg = (context, dataAndEvents) => {
    /** @type {Image} */
    const bee = new Image;
    /**
     * @return {undefined}
     */
    bee.onload = () => {
      if (1624 == total && 750 == v) {
        context.drawImage(bee, 10 * scale, 45 * scale, 86, 64);
      } else {
        context.drawImage(bee, 10 * scale, 10 * scale, 86, 64);
      }
      update({
        self : dataAndEvents,
        type : "bg"
      });
    };
    /** @type {string} */
    bee.src = "res/2d/return.png";
  };
  /** @type {function (number, number, number, number, number, CanvasRenderingContext2D): undefined} */
  self.roundedRect = render;
  /**
   * @param {Object} options
   * @return {undefined}
   */
  self.drawText = options => {
    const ctx = (options = Object.assign({}, {
      self : {},
      t : "",
      size : 17,
      pos : [0, 0],
      type : "bg",
      special : false,
      align : "center",
      color : "#fff",
      bold : false,
      italic : false
    }, options)).self.context[options.type];
    let fontstr = equal(options.size, options.special);
    if (options.bold) {
      /** @type {string} */
      fontstr = `bold ${fontstr}`;
    }
    if (options.italic) {
      /** @type {string} */
      fontstr = `italic ${fontstr}`;
    }
    ctx.font = fontstr;
    /** @type {string} */
    ctx.textBaseline = "middle";
    ctx.textAlign = options.align;
    ctx.fillStyle = options.color;
    if ("list1" == options.type || "list2" == options.type) {
      ctx.fillText(options.t, f(options.pos[0]), match(options.pos[1]));
    } else {
      ctx.fillText(options.t, f(options.pos[0]), win(options.pos[1]));
    }
  };
  /**
   * @param {?} args
   * @param {?} k
   * @return {undefined}
   */
  self.routeCanvas = (args, k) => {
    args.last2CanvasType = args.lastCanvasType;
    args.lastCanvasType = args.canvasType;
    args.canvasType = o[k];
  };
  /**
   * @param {string} html
   * @param {number} deepDataAndEvents
   * @return {?}
   */
  self.cname = (html, deepDataAndEvents) => (deepDataAndEvents = deepDataAndEvents || 16, (html = html || "").replace(/[^\x00-\xff]/g, "**").length > deepDataAndEvents + 2 && (html = `${removeComments(html, deepDataAndEvents)}...`), html);
  /**
   * @param {?} user
   * @param {?} dataAndEvents
   * @param {?} deepDataAndEvents
   * @return {?}
   */
  self.findSelfIndex = function(user, dataAndEvents, deepDataAndEvents) {
    return user.nickname === this.myUserInfo.nickname && user.week_best_score === this.myUserInfo.week_best_score;
  };
  /**
   * @param {Array} arr
   * @return {?}
   */
  self.relayRerank = arr => {
    let i;
    let tempi;
    /** @type {number} */
    let j = 0;
    const e = arr.length;
    for (;j < e;j++) {
      /** @type {number} */
      i = 0;
      for (;i < e;i++) {
        if (arr[j].rank < arr[i].rank) {
          tempi = arr[i];
          arr[i] = arr[j];
          arr[j] = tempi;
        }
      }
    }
    return arr;
  };
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
  })(require("../../lib/three"));
  const nodes = require("../../config");
  /** @type {number} */
  var scale = self.Dpr = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio;
  /** @type {number} */
  var d = (self.realDpr = window.devicePixelRatio, window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth);
  /** @type {number} */
  var t = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
  /** @type {number} */
  var total = self.HEIGHT = t * scale;
  /** @type {number} */
  var v = self.WIDTH = d * scale;
  /** @type {Array} */
  var codeSegments = ["btn", "list1", "list2", "bg"];
  var o = self.CANVASTYPE = {
    friendRank : 0,
    groupRank : 1,
    gameOver : 2,
    start : 3,
    pk : 4,
    lookers : 5,
    gameOverNew : 6,
    gameOverHighest : 7,
    beginner : 8,
    verify : 9,
    relay : 10,
    relayGG : 11,
    relayRank : 12,
    relayLookers : 13,
    record : 14,
    relayBeginner : 15,
    relayQr : 16
  };
  var height = self.frustumSizeHeight = nodes.FRUSTUMSIZE;
  /** @type {number} */
  var width = self.frustumSizeWidth = v / total * height;
  /** @type {boolean} */
  var h = self.DEBUG = false;
  /** @type {boolean} */
  var T = false;
  /** @type {number} */
  var oldconfig = self.ListLineHeight = 60;
  var b = wx.loadFont("res/num.ttf");
});
