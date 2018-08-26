define("js/pages/pages2d/relay.js", (Event, dataAndEvents, o) => {
  /**
   * @param {?} game
   * @param {?} data
   * @param {Object} option
   * @return {?}
   */
  function addItem(game, data, option) {
    if (!data) {
      return false;
    }
    if ((data = JSON.parse(data)).my_seat_no != data.room_owner_seat && game.my_seat_no == game.room_owner_seat) {
      return false;
    }
    let opt = void 0;
    let a = void 0;
    let b = void 0;
    if (game.players.length == data.players.length) {
      /** @type {number} */
      let i = 0;
      for (;i < game.players.length;i++) {
        if (!(game.players[i].headimg == data.players[i].headimg && game.players[i].name == data.players[i].name)) {
          /** @type {boolean} */
          opt = true;
        }
      }
    } else {
      /** @type {boolean} */
      opt = true;
    }
    return opt && init(option), game.game_level != data.game_level && (a = true, create(option)), game.players.length > 1 && 1 == data.players.length ? (b = true, jQuery(option)) : data.players.length > 1 && (1 == game.players.length && (b = true, jQuery(option))), !!(opt || (a || b)) || void 0 == opt && (void 0 == a && void 0 == b);
  }
  /**
   * @param {Object} option
   * @return {undefined}
   */
  function add(option) {
    /** @type {string} */
    const path = `data:image/jpeg;base64,${option.opt.room_wxa_code}`;
    const ctx = option.context.bg;
    (0, self.drawImageCenter)({
      self : option,
      src : "res/qr.png",
      pos : [207, 368, 390, 390],
      type : "bg",
      imgid : option.imgid.bg,
      /**
       * @return {undefined}
       */
      cb() {
        /** @type {Image} */
        const image = new Image;
        /**
         * @return {undefined}
         */
        image.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc((0, self.cx)(207), (0, self.cy)(368), (0, self.cwh)(150), 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(image, (0, self.cx)(67), (0, self.cy)(228), (0, self.cwh)(280), (0, self.cwh)(280));
          ctx.closePath();
          ctx.restore();
          (0, self.updatePlane)({
            self : option,
            type : "bg"
          });
        };
        if (option.opt.room_wxa_code) {
          /** @type {string} */
          image.src = path;
        }
      }
    });
  }
  /**
   * @param {Object} option
   * @return {undefined}
   */
  function create(option) {
    option.context.btn.clearRect((0, self.cx)(100), (0, self.cy)(555), (0, self.cwh)(200), (0, self.cwh)(40));
    (0, self.drawText)({
      self : option,
      t : `\u6e38\u620f\u96be\u5ea6  :   ${option.opt.game_level_s}`,
      size : 17,
      pos : [138, 575],
      align : "left",
      type : "btn"
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "res/r_arr.png",
      pos : [273, 575, 6.5, 12.5],
      type : "btn",
      imgid : option.imgid.btn
    });
    (0, self.updatePlane)({
      self : option,
      type : "btn"
    });
  }
  /**
   * @param {Object} selector
   * @return {undefined}
   */
  function init(selector) {
    const octx = selector.context.btn;
    octx.clearRect((0, self.cx)(20), (0, self.cy)(270), (0, self.cwh)(370), (0, self.cwh)(210));
    const dimensions = selector.opt.players;
    /** @type {number} */
    let d0 = 0;
    for (;d0 < 10;d0++) {
      !(d => {
        /** @type {number} */
        const x = 59 + d % 5 * 74;
        /** @type {number} */
        const wy = 314 + 103 * Math.floor(d / 5);
        if (dimensions[d]) {
          (0, self.drawImageCenter)({
            self : selector,
            src : dimensions[d].headimg,
            pos : [x, wy, 51, 51],
            type : "btn",
            imgid : selector.imgid.btn,
            round : true,
            noupdate : true,
            /**
             * @return {undefined}
             */
            cb() {
              (0, self.drawImageCenter)({
                self : selector,
                src : "res/2d/ava_square.png",
                pos : [x, wy, 53, 53],
                type : "btn",
                imgid : selector.imgid.btn,
                /**
                 * @return {undefined}
                 */
                cb() {
                  console.log(dimensions[d].seat_no, selector.opt.room_owner_seat);
                  if (dimensions[d].seat_no == selector.opt.room_owner_seat) {
                    (0, self.drawImageCenter)({
                      self : selector,
                      src : "res/2d/owner.png",
                      pos : [x, wy - 27, 40, 18],
                      imgid : selector.imgid.btn,
                      type : "btn",
                      /**
                       * @return {undefined}
                       */
                      cb() {
                        (0, self.updatePlane)({
                          self : selector,
                          type : "btn"
                        });
                      }
                    });
                  }
                }
              });
            }
          });
          (0, self.drawText)({
            self : selector,
            t : (0, self.cname)(dimensions[d].name, 6),
            size : 14,
            pos : [x, wy + 45],
            type : "btn"
          });
        } else {
          /** @type {number} */
          octx.lineWidth = 1 * self.Dpr;
          /** @type {string} */
          octx.strokeStyle = "rgba(0,0,0,0.06)";
          /** @type {string} */
          octx.fillStyle = "rgba(0,0,0,0.06)";
          (0, self.roundedRect)((0, self.cx)(x - 27), (0, self.cy)(wy - 27), (0, self.cwh)(53), (0, self.cwh)(53), 4 * self.Dpr, octx);
          octx.fill();
        }
      })(d0);
    }
  }
  /**
   * @param {Object} selector
   * @return {undefined}
   */
  function jQuery(selector) {
    selector.context.btn.clearRect((0, self.cx)(100), (0, self.cy)(620), (0, self.cwh)(220), (0, self.cwh)(80));
    if (selector.opt.players.length > 1) {
      (0, self.drawImageCenter)({
        self : selector,
        src : "res/play.png",
        pos : [207, 657, 208, 78],
        type : "btn",
        imgid : selector.imgid.btn
      });
    }
  }
  /**
   * @param {Object} option
   * @return {undefined}
   */
  function draw(option) {
    const ctx = option.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    const linearGradient = ctx.createLinearGradient(0, 0, 0, self.HEIGHT);
    linearGradient.addColorStop(0, "#D6F1F1");
    linearGradient.addColorStop(1, "#D3EDE6");
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawImageCenter)({
      self : option,
      src : "res/2d/555.png",
      pos : [207, 214, 37.4, 27],
      type : "bg",
      imgid : option.imgid.bg
    });
    (0, self.drawText)({
      self : option,
      size : 24,
      t : "\u8be5\u5c40\u6e38\u620f\u5df2\u7ed3\u675f",
      pos : [207, 286]
    });
    (0, self.drawHomeImg)(ctx, option);
    (0, self.drawImageCenter)({
      self : option,
      src : "res/lookers_btn.png",
      pos : [207, 588, 162, 78],
      type : "bg",
      imgid : option.imgid.bg,
      /**
       * @return {undefined}
       */
      cb() {
        (0, self.drawText)({
          self : option,
          t : "\u6211\u4e5f\u8981\u73a9",
          size : 18,
          pos : [207, 588],
          color : "#000"
        });
      }
    });
    (0, self.updatePlane)({
      self : option,
      type : "bg"
    });
  }
  /**
   * @param {?} vars
   * @param {?} state
   * @param {Object} x
   * @return {?}
   */
  function apply(vars, state, x) {
    if (!state) {
      return false;
    }
    if (state.my_seat_no != state.room_owner_seat && vars.my_seat_no == vars.room_owner_seat) {
      return false;
    }
    /** @type {*} */
    state = JSON.parse(state);
    let a = void 0;
    let l = void 0;
    if (vars.players.length == state.players.length) {
      /** @type {number} */
      let i = 0;
      for (;i < vars.players.length;i++) {
        if (!(vars.players[i].headimg == state.players[i].headimg && vars.players[i].name == state.players[i].name)) {
          /** @type {boolean} */
          a = true;
        }
      }
    } else {
      /** @type {boolean} */
      a = true;
    }
    return a && translate(x), (state.players.length < 10 && vars.players.length >= 10 || state.game_level != vars.game_level) && (l = true, emit(x)), !(!a && !l);
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function translate(data) {
    console.log("diff player");
    const btn = data.context.btn;
    const dimensions = data.opt.players;
    btn.clearRect((0, self.cx)(20), (0, self.cy)(260), (0, self.cwh)(370), (0, self.cwh)(210));
    /** @type {number} */
    let d0 = 0;
    for (;d0 < 10;d0++) {
      !(d => {
        /** @type {number} */
        const x = 59 + d % 5 * 74;
        /** @type {number} */
        const wy = 299 + 103 * Math.floor(d / 5);
        if (dimensions[d]) {
          (0, self.drawImageCenter)({
            self : data,
            src : dimensions[d].headimg,
            pos : [x, wy, 52, 52],
            type : "btn",
            imgid : data.imgid.btn,
            round : true,
            noupdate : true,
            /**
             * @return {undefined}
             */
            cb() {
              (0, self.drawImageCenter)({
                self : data,
                src : "res/2d/ava_square.png",
                pos : [x, wy, 54, 54],
                imgid : data.imgid.btn,
                type : "btn",
                /**
                 * @return {undefined}
                 */
                cb() {
                  if (dimensions[d].seat_no == data.opt.room_owner_seat) {
                    (0, self.drawImageCenter)({
                      self : data,
                      src : "res/2d/owner.png",
                      pos : [x, wy - 27, 40, 18],
                      imgid : data.imgid.btn,
                      type : "btn",
                      /**
                       * @return {undefined}
                       */
                      cb() {
                        (0, self.updatePlane)({
                          self : data,
                          type : "btn"
                        });
                      }
                    });
                  }
                }
              });
            }
          });
          (0, self.drawText)({
            self : data,
            t : (0, self.cname)(dimensions[d].name, 6),
            size : 14,
            pos : [x, wy + 45],
            type : "btn"
          });
        }
      })(d0);
    }
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function emit(data) {
    data.context.btn.clearRect((0, self.cx)(120), (0, self.cy)(111), (0, self.cwh)(170), (0, self.cwh)(90));
    if (10 == data.opt.players.length) {
      (0, self.drawText)({
        self : data,
        size : 24,
        t : "\u623f\u95f4\u4eba\u6570\u5df2\u6ee1",
        pos : [207, 131.5],
        type : "btn"
      });
    } else {
      (0, self.drawText)({
        self : data,
        size : 24,
        t : "\u7b49\u5f85\u5f00\u59cb\u6e38\u620f",
        pos : [207, 131.5],
        type : "btn"
      });
    }
    (0, self.drawText)({
      self : data,
      size : 17,
      t : `\u6e38\u620f\u96be\u5ea6 : ${data.opt.game_level_s}`,
      pos : [207, 167],
      color : "#FCBA4B",
      type : "btn"
    });
    (0, self.updatePlane)({
      self : data,
      type : "btn"
    });
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function drawBackground(data) {
    const ctx = data.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    const linearGradient = ctx.createLinearGradient(0, 0, 0, self.HEIGHT);
    linearGradient.addColorStop(0, "#D6F1F1");
    linearGradient.addColorStop(1, "#D3EDE6");
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    data.opt.players;
    data.opt;
    (0, self.drawHomeImg)(ctx, data);
    /** @type {number} */
    let sectionLength = 0;
    for (;sectionLength < 10;sectionLength++) {
      /** @type {number} */
      const l = 59 + sectionLength % 5 * 74;
      /** @type {number} */
      const o = 299 + 103 * Math.floor(sectionLength / 5);
      /** @type {number} */
      ctx.lineWidth = 1 * self.Dpr;
      /** @type {string} */
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      /** @type {string} */
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      (0, self.roundedRect)((0, self.cx)(l - 27), (0, self.cy)(o - 27), (0, self.cwh)(54), (0, self.cwh)(54), 4 * self.Dpr, ctx);
      ctx.fill();
    }
    translate(data);
    emit(data);
    (0, self.drawText)({
      self : data,
      size : 14,
      t : "\u4ec5\u623f\u4e3b\u53ef\u5f00\u59cb\u6e38\u620f\u4ee5\u53ca\u8bbe\u7f6e\u6e38\u620f\u96be\u5ea6",
      pos : [207, 214]
    });
    (0, self.drawText)({
      self : data,
      t : "+  \u9080\u8bf7\u597d\u53cb",
      size : 17,
      pos : [207, 608]
    });
    (0, self.drawImageCenter)({
      self : data,
      src : "res/btn_invite_fri.png",
      pos : [207, 608, 152, 37],
      type : "bg",
      imgid : data.imgid.bg
    });
    (0, self.updatePlane)({
      self : data,
      type : "bg"
    });
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function clear(data) {
    data.imgid.bg++;
    const ctx = data.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    const linearGradient = ctx.createLinearGradient(0, 0, 0, self.HEIGHT);
    linearGradient.addColorStop(0, "#D6F1F1");
    linearGradient.addColorStop(1, "#D3EDE6");
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    const args = data.opt.players;
    const opt = data.opt;
    (0, self.drawHomeImg)(ctx, data);
    /** @type {Array} */
    let callbacks = [];
    if (args.length < 6) {
      unload(data, callbacks = args, 299);
    } else {
      callbacks = args.slice(0, Math.ceil(args.length / 2));
      unload(data, callbacks, 299);
      callbacks = args.slice(Math.ceil(args.length / 2), args.length);
      unload(data, callbacks, 402);
    }
    (0, self.drawText)({
      self : data,
      size : 24,
      t : "\u6e38\u620f\u5df2\u5f00\u59cb",
      pos : [207, 141]
    });
    (0, self.drawText)({
      self : data,
      size : 17,
      t : `\u6e38\u620f\u96be\u5ea6 : ${opt.game_level_s}`,
      pos : [207, 167],
      color : "#FCBA4B"
    });
    (0, self.drawImageCenter)({
      self : data,
      src : "res/lookers_btn.png",
      pos : [207, 588, 152, 78],
      type : "bg",
      imgid : data.imgid.bg,
      /**
       * @return {undefined}
       */
      cb() {
        (0, self.drawText)({
          self : data,
          t : "\u89c2\u6218",
          size : 22,
          pos : [207, 588],
          color : "#000"
        });
      }
    });
    (0, self.updatePlane)({
      self : data,
      type : "bg"
    });
  }
  /**
   * @param {Object} data
   * @param {Array} callbacks
   * @param {number} opt_attributes
   * @return {undefined}
   */
  function unload(data, callbacks, opt_attributes) {
    const n = callbacks.length;
    /** @type {number} */
    const d = 54;
    /** @type {number} */
    const baseY = 207 - (n * d + 20 * (n - 1)) / 2;
    /** @type {number} */
    let i = (data.context.bg, 0);
    for (;i < n;i++) {
      !(() => {
        /** @type {number} */
        const x = baseY + 27 + 74 * i;
        (0, self.drawImageCenter)({
          self : data,
          round : true,
          src : callbacks[i].headimg,
          pos : [x, opt_attributes, d, d],
          type : "bg",
          /**
           * @return {undefined}
           */
          cb() {
            (0, self.drawImageCenter)({
              self : data,
              src : "res/2d/ava_square.png",
              pos : [x, opt_attributes, 56, 56],
              type : "bg",
              imgid : data.imgid.bg
            });
          },
          imgid : data.imgid.bg,
          noupdate : true
        });
        (0, self.drawText)({
          self : data,
          t : (0, self.cname)(callbacks[i].name, 6),
          size : 14,
          pos : [x, opt_attributes + 45]
        });
      })();
    }
  }
  /**
   * @param {Object} option
   * @return {undefined}
   */
  function reset(option) {
    option.context.btn.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.updatePlane)({
      self : option,
      type : "btn"
    });
    const ctx = option.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    const linearGradient = ctx.createLinearGradient(0, 0, 0, self.HEIGHT);
    linearGradient.addColorStop(0, "#D6F1F1");
    linearGradient.addColorStop(1, "#D3EDE6");
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.5)";
    ctx.fillRect(0, 0, self.WIDTH, (0, self.cy)(247));
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect(0, (0, self.cy)(247), self.WIDTH, (0, self.cy)(489));
    init(option);
    (0, self.drawText)({
      self : option,
      t : "\u901a\u8fc7\u623f\u95f4\u7801\u9080\u8bf7",
      size : 17,
      pos : [198, 181],
      color : "rgba(255,255,255,0.7)"
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "res/r_arr.png",
      pos : [273, 181, 6.5, 12.5],
      type : "btn",
      imgid : option.imgid.btn
    });
    create(option);
    (0, self.drawText)({
      self : option,
      t : "+  \u9080\u8bf7\u597d\u53cb",
      size : 17,
      pos : [207, 119]
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "res/btn_invite_fri.png",
      pos : [207, 119, 152, 37],
      type : "bg",
      imgid : option.imgid.bg
    });
    jQuery(option);
    (0, self.drawHomeImg)(ctx, option);
    (0, self.updatePlane)({
      self : option,
      type : "bg"
    });
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} r
   * @param {CanvasRenderingContext2D} ctx
   * @return {undefined}
   */
  function rect(x, y, width, height, r, ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y + r - 1);
    ctx.lineTo(x, y + height - r);
    ctx.quadraticCurveTo(x, y + height, x + r, y + height);
    ctx.lineTo(x + width - r, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - r);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function update(data) {
    (0, self.routeCanvas)(data, "relayRank");
    (0, self.createPlane)(data);
    (0, self.updateClip)({
      self : data
    });
    const c = data.context.bg;
    (0, self.drawHomeImg)(c, data);
    /** @type {string} */
    c.fillStyle = "rgba(255,255,255,0.04)";
    c.fillRect((0, self.cx)(30), (0, self.cy)(177), (0, self.cwh)(354), (0, self.cwh)(227));
    /** @type {string} */
    c.fillStyle = "rgba(0,0,0,0.3)";
    /** @type {number} */
    c.lineWidth = 0.5 * self.Dpr;
    /** @type {string} */
    c.strokeStyle = "rgba(0,0,0,0.2)";
    rect((0, self.cx)(30), (0, self.cy)(561), (0, self.cwh)(354), (0, self.cwh)(90), 2 * self.Dpr, c);
    c.fill();
    const errors = data.opt.players || [];
    console.log("\u6392\u884c\u699c\u7684 players: ", errors);
    (0, self.drawText)({
      self : data,
      t : `${errors.length}\u4eba\u603b\u5f97\u5206\uff1a${data.opt.total_score}`,
      size : 17,
      pos : [207, 145]
    });
    (0, self.drawImageCenter)({
      self : data,
      src : errors[0].headimg,
      pos : [207, 247, 48, 48],
      type : "bg",
      imgid : data.imgid.bg,
      /**
       * @return {undefined}
       */
      cb() {
        (0, self.drawImageCenter)({
          self : data,
          src : "res/2d/ava_square.png",
          pos : [207, 247, 50, 50],
          imgid : data.imgid.bg
        });
      }
    });
    (0, self.drawText)({
      self : data,
      t : `\u7b2c${data.opt.my_rank}\u540d`,
      size : 30,
      pos : [207, 316],
      color : "#E3B857"
    });
    (0, self.drawText)({
      self : data,
      t : `\u5171${errors.length}\u540d\u73a9\u5bb6`,
      size : 15,
      pos : [207, 356],
      color : "#888"
    });
    (0, self.drawText)({
      self : data,
      t : "\u518d\u6765\u4e00\u5c40",
      size : 22,
      pos : [207, 606]
    });
    (0, self.updatePlane)({
      self : data,
      type : "bg"
    });
    show(data, errors);
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function render(data) {
    (0, self.routeCanvas)(data, "relayRank");
    (0, self.updateClip)({
      self : data
    });
    const c = data.context.bg;
    (0, self.drawHomeImg)(c, data);
    /** @type {string} */
    c.fillStyle = "rgba(255,255,255,0.04)";
    c.fillRect((0, self.cx)(30), (0, self.cy)(177), (0, self.cwh)(354), (0, self.cwh)(141));
    c.fill();
    const errors = data.opt.players;
    /** @type {boolean} */
    let r = false;
    if (0 == data.opt.my_seat_no) {
      /** @type {boolean} */
      r = true;
    }
    if (r) {
      (0, self.drawText)({
        self : data,
        t : "\u6e38\u620f\u7ed3\u675f",
        size : 30,
        pos : [207, 243]
      });
    } else {
      /** @type {string} */
      c.fillStyle = "rgba(0,0,0,0.3)";
      /** @type {string} */
      c.strokeStyle = "rgba(0,0,0,0.2)";
      /** @type {number} */
      c.lineWidth = 0.5 * self.Dpr;
      rect((0, self.cx)(30), (0, self.cy)(560), (0, self.cwh)(354), (0, self.cwh)(90), 2 * self.Dpr, c);
      c.fill();
      (0, self.drawText)({
        self : data,
        t : `\u7b2c${data.opt.my_rank}\u540d`,
        size : 30,
        pos : [207, 237],
        color : "#E3B857"
      });
      (0, self.drawText)({
        self : data,
        t : `\u5171${errors.length}\u540d\u73a9\u5bb6`,
        size : 17,
        pos : [207, 275]
      });
      (0, self.drawText)({
        self : data,
        t : "\u518d\u6765\u4e00\u5c40",
        size : 22,
        pos : [207, 606]
      });
    }
    (0, self.drawText)({
      self : data,
      t : `${errors.length}\u4eba\u603b\u5f97\u5206\uff1a${data.opt.total_score}`,
      size : 17,
      pos : [207, 145]
    });
    (0, self.updatePlane)({
      self : data,
      type : "bg"
    });
    show(data, errors);
  }
  /**
   * @param {Object} data
   * @param {?} x
   * @return {undefined}
   */
  function show(data, x) {
    console.log("renderRelayRankList :: ");
    data.sotedRankList = x;
    /** @type {number} */
    const innerOffsetHeight = data.sotedRankList.length * (0, self.cwh)(self.ListLineHeight) / self.Dpr;
    /** @type {number} */
    let outterOffsetHeight = (0, self.cwh)(157) / self.Dpr;
    if (1 != data.opt.my_rank) {
      /** @type {number} */
      outterOffsetHeight = (0, self.cwh)(242) / self.Dpr;
    }
    data.scrollHandler = new obj.default({
      innerOffsetHeight,
      outterOffsetHeight,
      updatePosition : data.updatePosition.bind(data)
    });
    load(data, 0, "list1");
  }
  /**
   * @param {Object} config
   * @param {number} value
   * @param {string} id
   * @return {undefined}
   */
  function load(config, value, id) {
    if ("list1" == id) {
      config.imgid.list1++;
    } else {
      if ("list2" == id) {
        config.imgid.list2++;
      }
    }
    const values = config.sotedRankList.slice(value, value + 10);
    const ctx = config.context[id];
    if (ctx.clearRect(0, 0, self.WIDTH, 10 * (0, self.cwh)(self.ListLineHeight)), ctx.textBaseline = "middle", 0 == value || 0 != values.length) {
      if (!(value < 0)) {
        const valuesLen = values.length;
        /** @type {number} */
        let i = 0;
        for (;i < valuesLen;i++) {
          !(() => {
            console.log(i);
            /** @type {number} */
            const wy = (i + 0.5) * self.ListLineHeight;
            const tval = i + 1 + value;
            /** @type {string} */
            let lc = "";
            /** @type {string} */
            lc = 1 == tval ? "#ffd800" : "#888";
            (0, self.drawText)({
              self : config,
              bold : true,
              italic : true,
              size : 17,
              t : tval,
              pos : [58.5, wy],
              type : id,
              color : lc
            });
            (0, self.drawImageCenter)({
              self : config,
              src : values[i].headimg,
              pos : [107, wy, 36, 36],
              type : id,
              /**
               * @return {undefined}
               */
              cb() {
                (0, self.drawImageCenter)({
                  self : config,
                  src : "res/2d/ava_square.png",
                  pos : [107, wy, 37, 37],
                  type : id,
                  imgid : config.imgid[id]
                });
              },
              round : true,
              imgid : config.imgid[id],
              noupdate : true
            });
            (0, self.drawText)({
              self : config,
              align : "left",
              size : 17,
              bold : true,
              t : (0, self.cname)(values[i].name, 14),
              pos : [144, wy],
              type : id
            });
          })();
        }
        (0, self.updatePlane)({
          self : config,
          type : id
        });
      }
    } else {
      (0, self.updatePlane)({
        self : config,
        type : id
      });
    }
  }
  Object.defineProperty(o, "__esModule", {
    value : true
  });
  /**
   * @param {Object} data
   * @return {?}
   */
  o.drawRelayRoomPage = data => {
    const config = data.opt;
    if ((0, self.createPlane)(data, ["bg", "btn"]), (0, self.routeCanvas)(data, "relay"), 1 == config.game_level ? config.game_level_s = "\u4e2d" : 2 == config.game_level ? config.game_level_s = "\u9ad8" : config.game_level_s = "\u4f4e", 2 == config.game_status) {
      (0, self.createPlane)(data);
      draw(data);
    } else {
      if (1 == config.game_status) {
        (0, self.createPlane)(data);
        clear(data);
      } else {
        if (0 == config.game_status) {
          if (config.my_seat_no == config.room_owner_seat) {
            if (addItem(data.opt, data.lastopt, data)) {
              return void(data.lastopt = JSON.stringify(data.opt));
            }
            /** @type {string} */
            data.lastopt = JSON.stringify(data.opt);
            reset(data);
          } else {
            if (apply(data.opt, data.lastopt, data)) {
              return void(data.lastopt = JSON.stringify(data.opt));
            }
            data.context.btn.clearRect(0, 0, self.WIDTH, self.HEIGHT);
            /** @type {string} */
            data.lastopt = JSON.stringify(data.opt);
            drawBackground(data);
          }
        }
      }
    }
  };
  /**
   * @param {Object} option
   * @return {undefined}
   */
  o.drawRelayLookers = option => {
    option.opt;
    (0, self.createPlane)(option);
    (0, self.routeCanvas)(option, "relayLookers");
    option.context.btn.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawImageCenter)({
      self : option,
      src : "res/relay_return.png",
      pos : [207, 678, 140, 54],
      imgid : option.imgid.bg,
      type : "bg",
      /**
       * @return {undefined}
       */
      cb() {
        (0, self.drawText)({
          self : option,
          t : "\u6211\u4e5f\u8981\u73a9",
          size : 17,
          pos : [207, 678],
          color : "#555"
        });
        (0, self.updatePlane)({
          self : option,
          type : "bg"
        });
      }
    });
  };
  /**
   * @param {Object} option
   * @return {undefined}
   */
  o.drawRelayQr = option => {
    option.opt;
    (0, self.createPlane)(option);
    (0, self.routeCanvas)(option, "relayQr");
    const ctx = option.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    const linearGradient = ctx.createLinearGradient(0, 0, 0, self.HEIGHT);
    linearGradient.addColorStop(0, "#D6F1F1");
    linearGradient.addColorStop(1, "#D3EDE6");
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawText)({
      self : option,
      t : "\u626b\u7801\u5373\u53ef\u8fdb\u5165\u623f\u95f4",
      size : 17,
      pos : [207, 180]
    });
    add(option);
    (0, self.drawReturnImg)(ctx, option);
    (0, self.updatePlane)({
      self : option,
      type : "bg"
    });
  };
  /**
   * @param {Object} data
   * @return {undefined}
   */
  o.drawRelaying = data => {
    const opt = data.opt;
    (0, self.createPlane)(data);
    (0, self.routeCanvas)(data, "relay");
    data.context.btn.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawText)({
      self : data,
      t : opt.text,
      size : 26,
      pos : [34, 220],
      align : "left",
      type : "btn",
      color : "#403A5B"
    });
    (0, self.updatePlane)({
      self : data,
      type : "btn"
    });
  };
  /**
   * @param {Object} option
   * @return {undefined}
   */
  o.drawRelayGG = option => {
    if (option.canvasType == self.CANVASTYPE.relay || self.DEBUG) {
      (0, self.createPlane)(option);
      const ctx = option.context.bg;
      ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
      (0, self.routeCanvas)(option, "relayGG");
      const data = option.opt;
      (0, self.drawHomeImg)(ctx, option);
      (0, self.drawImageCenter)({
        self : option,
        src : "res/bl2.png",
        pos : [207, 342.5, 354, 417],
        imgid : option.imgid.bg,
        type : "bg",
        round : true,
        /**
         * @return {undefined}
         */
        cb() {
          (0, self.drawImageCenter)({
            self : option,
            src : "res/2d/555.png",
            pos : [207, 214, 37.4, 27],
            type : "bg",
            imgid : option.imgid.bg
          });
          (0, self.drawText)({
            self : option,
            t : "\u6e38\u620f\u7ed3\u675f",
            size : 36,
            pos : [207, 298]
          });
          (0, self.drawText)({
            self : option,
            t : `\u7b2c${data.my_rank}\u540d`,
            size : 30,
            pos : [207, 358],
            color : "#E3B857"
          });
          (0, self.drawText)({
            self : option,
            t : `\u5171${data.all_player}\u540d\u73a9\u5bb6`,
            size : 17,
            pos : [207, 398],
            color : "#888"
          });
          /** @type {number} */
          ctx.lineWidth = 2 * self.Dpr;
          /** @type {string} */
          ctx.strokeStyle = "rgba(255,255,255,0.06)";
          /** @type {string} */
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          rect((0, self.cx)(30), (0, self.cy)(460), (0, self.cwh)(354), (0, self.cwh)(91), 4 * self.Dpr, ctx);
          ctx.fill();
          (0, self.drawText)({
            self : option,
            t : "\u7ee7\u7eed\u89c2\u6218",
            size : 22,
            pos : [207, 506]
          });
        }
      });
      (0, self.updatePlane)({
        self : option,
        type : "bg"
      });
    }
  };
  /**
   * @param {Object} data
   * @return {undefined}
   */
  o.drawRelayRank = data => {
    if (data.opt.players = (0, self.relayRerank)(data.opt.players), (0, self.createPlane)(data), data.context.bg.clearRect(0, 0, self.WIDTH, self.HEIGHT), 1 == data.opt.my_rank) {
      (0, self.drawImageCenter)({
        round : true,
        self : data,
        src : "res/bl2.png",
        pos : [207, 382.5, 354, 537],
        type : "bg",
        imgid : data.imgid.bg,
        /**
         * @return {undefined}
         */
        cb() {
          update(data);
        }
      });
    } else {
      /** @type {boolean} */
      let name = false;
      /** @type {number} */
      let names = 0;
      if (0 == data.opt.my_seat_no) {
        /** @type {boolean} */
        name = true;
      }
      /** @type {number} */
      names = name ? 446 : 537;
      (0, self.drawImageCenter)({
        round : true,
        self : data,
        src : "res/bl2.png",
        pos : [207, 114 + names / 2, 354, names],
        type : "bg",
        imgid : data.imgid.bg,
        /**
         * @return {undefined}
         */
        cb() {
          render(data);
        }
      });
    }
  };
  /** @type {function (Object, number, string): undefined} */
  o.drawRelayList = load;
  /**
   * @param {Object} state
   * @return {undefined}
   */
  o.drawRelayBeginner = state => {
    (0, self.routeCanvas)(state, "relayBeginner");
    (0, self.createPlane)(state);
    const ctx = state.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    ctx.beginPath();
    /** @type {string} */
    ctx.fillStyle = "rgba(132,111,126,0.8)";
    ctx.fillRect(0, (0, self.cy)(547), self.WIDTH, (0, self.cwh)(189));
    ctx.fill();
    ctx.closePath();
    (0, self.drawImageCenter)({
      self : state,
      src : "res/2d/skip.png",
      pos : [357, 547, 80, 48],
      type : "bg",
      imgid : state.imgid.bg
    });
    (0, self.drawText)({
      self : state,
      t : "\u73a9\u6cd5\u8bf4\u660e",
      size : 17,
      pos : [207, 599]
    });
    (0, self.drawText)({
      self : state,
      t : "\u9080\u8bf7\u597d\u53cb\u8fdb\u5165\u6e38\u620f\uff0c\u8f6e\u6d41\u64cd\u4f5c\u3002\u6bcf\u4e2a\u4eba\u5728\u89c4\u5b9a\u65f6\u95f4\u5185",
      size : 14,
      pos : [207, 631]
    });
    (0, self.drawText)({
      self : state,
      t : "\u5b8c\u6210\u4e00\u6b21\u64cd\u4f5c\u3002\u6389\u843d\u8005\u5219\u88ab\u6dd8\u6c70\uff0c\u575a\u6301\u5230\u6700\u540e\u7684\u73a9",
      size : 14,
      pos : [207, 653]
    });
    (0, self.drawText)({
      self : state,
      t : "\u5bb6\u5373\u4e3a\u80dc\u5229\u3002",
      size : 14,
      pos : [207, 675]
    });
    (0, self.updatePlane)({
      self : state,
      type : "bg"
    });
  };
  var self = Event("./base");
  var obj = (d => d && d.__esModule ? d : {
    /** @type {Function} */
    default : d
  })(Event("../../scroll/scrollHandler"));
});
