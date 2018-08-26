define("js/pages/pages2d/rank.js", (Event, dataAndEvents, ctx) => {
  /**
   * @param {Function} options
   * @return {?}
   */
  function getOptions(options) {
    return options && options.__esModule ? options : {
      /** @type {Function} */
      default : options
    };
  }
  /**
   * @param {?} options
   * @return {undefined}
   */
  function render(options) {
    const state = options.self;
    state.imgid.btn++;
    const ctx = state.context.btn;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.8)";
    ctx.fillRect(0, 0, (self.WIDTH - (0, self.cwh)(354)) / 2, self.HEIGHT);
    ctx.fillRect((0, self.cx)(384), 0, (self.WIDTH - (0, self.cwh)(354)) / 2, self.HEIGHT);
    ctx.fillRect((0, self.cx)(30), 0, (0, self.cwh)(354), (0, self.cy)(110));
    ctx.fillRect((0, self.cx)(30), (0, self.cy)(592), (0, self.cwh)(354), (0, self.cy)(144));
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect((0, self.cx)(30), (0, self.cy)(110), (0, self.cwh)(354), (0, self.cwh)(33));
    /** @type {string} */
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    /** @type {number} */
    ctx.lineWidth = 1 * self.Dpr;
    ctx.beginPath();
    ctx.moveTo((0, self.cx)(30), (0, self.cy)(143));
    ctx.lineTo((0, self.cx)(384), (0, self.cy)(143));
    ctx.stroke();
    ctx.closePath();
    (0, self.drawText)({
      self : state,
      bold : true,
      size : 12,
      align : "left",
      t : "\u6bcf\u5468\u4e00\u51cc\u6668\u5237\u65b0",
      pos : [54, 126.5],
      type : "btn"
    });
    /** @type {number} */
    ctx.lineWidth = 1 * self.Dpr;
    /** @type {string} */
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    (0, self.roundedRect)((0, self.cx)(30), (0, self.cy)(110), (0, self.cwh)(354), (0, self.cwh)(482), 1 * self.Dpr, ctx);
    (0, self.updatePlane)({
      self : state,
      type : "btn"
    });
    if (state.canvasType == self.CANVASTYPE.groupRank) {
      (0, self.drawText)({
        self : state,
        size : 17,
        t : "\u73a9\u4e00\u5c40",
        pos : [207, 680],
        type : "btn"
      });
      (0, self.drawImageCenter)({
        self : state,
        src : "res/r_arr.png",
        pos : [244, 680, 6.6, 10],
        type : "btn",
        imgid : state.imgid.btn
      });
    }
    if (state.canvasType == self.CANVASTYPE.friendRank) {
      (0, self.drawText)({
        self : state,
        size : 17,
        t : "\u67e5\u770b\u7fa4\u6392\u884c",
        pos : [177, 674],
        align : "left",
        type : "btn"
      });
      (0, self.drawImageCenter)({
        self : state,
        src : "res/r_arr.png",
        pos : [270, 674, 6.6, 10],
        type : "btn",
        imgid : state.imgid.btn
      });
      (0, self.drawImageCenter)({
        self : state,
        src : "res/rank.png",
        pos : [154, 674, 22, 22],
        type : "btn",
        imgid : state.imgid.btn
      });
      (0, self.drawImageCenter)({
        self : state,
        src : "res/close.png",
        pos : [375, 114, 48, 48],
        type : "btn",
        imgid : state.imgid.btn
      });
    }
  }
  /**
   * @param {Object} info
   * @return {undefined}
   */
  function add(info) {
    const s = info.self;
    let data = info.list;
    /** @type {Array} */
    let node = [];
    s.myUserInfo = s.myUserInfo || {
      headimg : "",
      nickname : "",
      week_best_score : 0,
      score_info : [{
        score : 0
      }]
    };
    (data = data || []).push(s.myUserInfo);
    node = (0, self.rerank)(data);
    s.sotedRankList = node;
    let outterOffsetHeight;
    /** @type {number} */
    const innerOffsetHeight = s.sotedRankList.length * (0, self.cwh)(self.ListLineHeight) / self.Dpr;
    s.myidx = node.findIndex(self.findSelfIndex.bind(s)) + 1;
    /** @type {number} */
    outterOffsetHeight = (0, self.cwh)(445) / self.Dpr;
    s.scrollHandler = new opts.default({
      innerOffsetHeight,
      outterOffsetHeight,
      updatePosition : s.updatePosition.bind(s)
    });
    init(s, 0, "list1");
    init(s, 10, "list2");
  }
  /**
   * @param {Object} state
   * @param {number} size
   * @param {string} list
   * @return {undefined}
   */
  function init(state, size, list) {
    if ("list1" == list) {
      state.imgid.list1++;
    } else {
      if ("list2" == list) {
        state.imgid.list2++;
      }
    }
    const codeSegments = state.sotedRankList.slice(size, size + 10);
    const ctx = state.context[list];
    if (ctx.clearRect(0, 0, self.WIDTH, 10 * (0, self.cwh)(self.ListLineHeight)), ctx.fillStyle = "rgba(0,0,0,0.9)", ctx.fillRect(0, 0, self.WIDTH, 10 * (0, self.cwh)(self.ListLineHeight)), 0 == size || 0 != codeSegments.length) {
      if (!(size < 0)) {
        const valuesLen = codeSegments.length;
        /** @type {number} */
        let i = 0;
        for (;i < valuesLen;i++) {
          let offset;
          let color;
          !(() => {
            if (i % 2 == 1) {
              /** @type {string} */
              ctx.fillStyle = "rgba(255,255,255, 0.03)";
              ctx.fillRect(0, i * (0, self.cwh)(self.ListLineHeight), (0, self.cwh)(414), (0, self.cwh)(self.ListLineHeight));
            }
            /** @type {number} */
            const wy = (i + 0.5) * self.ListLineHeight;
            /** @type {string} */
            ctx.textAlign = "center";
            /** @type {string} */
            color = "";
            /** @type {string} */
            color = 1 == (offset = i + 1 + size) ? "rgb(250,126,0)" : 2 == offset ? "rgb(254,193,30)" : 3 == offset ? "rgb(251,212,19)" : "#aaa";
            (0, self.drawText)({
              self : state,
              color,
              size : 17,
              italic : true,
              bold : true,
              t : offset,
              pos : [58.5, wy],
              type : list
            });
            codeSegments[i].grade;
            ctx.beginPath();
            /** @type {string} */
            ctx.strokeStyle = "rgba(255,255,255, 0.1)";
            /** @type {string} */
            ctx.fillStyle = "rgba(255,255,255, 0.1)";
            (0, self.roundedRect)((0, self.cx)(90), (0, self.cwh)(wy - 17), (0, self.cwh)(34), (0, self.cwh)(34), 4 * self.Dpr, ctx);
            ctx.fill();
            ctx.closePath();
            (0, self.drawImageCenter)({
              round : true,
              self : state,
              src : codeSegments[i].headimg,
              pos : [107, wy, 34, 34],
              type : list,
              /**
               * @return {undefined}
               */
              cb() {
                (0, self.drawImageCenter)({
                  self : state,
                  src : "res/ava_rank.png",
                  pos : [107, wy, 47, 47],
                  type : list,
                  imgid : state.imgid[list]
                });
              },
              imgid : state.imgid[list],
              noupdate : true
            });
            (0, self.drawText)({
              self : state,
              align : "left",
              size : 17,
              t : (0, self.cname)(codeSegments[i].nickname, 16),
              pos : [144, wy],
              type : list
            });
            (0, self.drawText)({
              self : state,
              align : "right",
              size : 22,
              special : true,
              t : codeSegments[i].week_best_score || 0,
              pos : [339, wy + 2],
              type : list
            });
            if (codeSegments[i].playback_id) {
              (0, self.drawImageCenter)({
                round : true,
                self : state,
                src : "res/2d/record.png",
                pos : [359, wy, 18, 18],
                type : list,
                imgid : state.imgid[list]
              });
            }
          })();
        }
        (0, self.updatePlane)({
          self : state,
          type : list
        });
      }
    } else {
      (0, self.updatePlane)({
        self : state,
        type : list
      });
    }
  }
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @param {Object} object
   * @return {undefined}
   */
  ctx.drawFriendRankList = object => {
    const url = object.self;
    const path = url.last2CanvasType;
    (0, self.routeCanvas)(url, "friendRank");
    if (url.lastCanvasType == self.CANVASTYPE.record) {
      url.lastCanvasType = path;
    }
    url.myUserInfo = obj.default.getMyUserInfo() || {};
    url.myUserInfo.week_best_score = url.opt.week_best_score || 0;
    (0, self.createPlane)(url);
    (0, self.updateClip)({
      self : url
    });
    render({
      self : url
    });
    add({
      self : url,
      list : obj.default.getFriendsScore()
    });
  };
  /**
   * @param {number} state
   * @param {Array} result
   * @param {?} ctx
   * @return {undefined}
   */
  ctx.drawGroupRankList = (state, result, ctx) => {
    (0, self.routeCanvas)(state, "groupRank");
    state.myUserInfo = ctx || {
      headimg : "",
      nickname : "",
      week_best_score : 0,
      grade : 1
    };
    (0, self.createPlane)(state);
    (0, self.updateClip)({
      self : state
    });
    render({
      self : state
    });
    add({
      self : state,
      list : result
    });
  };
  /** @type {function (Object, number, string): undefined} */
  ctx.drawRankList = init;
  var self = Event("./base");
  var obj = getOptions(Event("../../store/storage"));
  var opts = getOptions(Event("../../scroll/scrollHandler"));
});
