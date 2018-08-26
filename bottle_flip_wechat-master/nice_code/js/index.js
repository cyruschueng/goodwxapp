define("js/index.js", (keys, dataAndEvents, deepDataAndEvents) => {
  /**
   * @param {Object} s
   * @return {?}
   */
  function $(s) {
    return s && s.__esModule ? s : {
      default : s
    };
  }
  /**
   * @param {?} obj
   * @param {Function} type
   * @return {undefined}
   */
  function addListener(obj, type) {
    if (!(obj instanceof type)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * @return {undefined}
   */
  function main() {
    /** @type {number} */
    const width = Date.now();
    /** @type {number} */
    const i = width - n;
    /** @type {number} */
    n = width;
    requestAnimationFrame(main, true);
    if (!(i > 100)) {
      result.update(i / 1E3);
    }
  }
  const selectWordAt = (() => {
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
  keys("./weapp-adapter");
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
  })(keys("./lib/three"));
  const dd = $(keys("./block"));
  const property = $(keys("./ui"));
  const desc = $(keys("./wave"));
  const option = $(keys("./ground"));
  const action = $(keys("./bottle"));
  const sprite = keys("./config");
  const track = $(keys("./ui/audioManager"));
  const item = $(keys("./tailSystem"));
  const tag = $(keys("./lib/point-in-polygon"));
  const object = $(keys("./network/network"));
  const opts = $(keys("./store/storage"));
  const self = $(keys("./store/session"));
  const def = $(keys("./rankSystem"));
  const prompt = $(keys("./network/socket"));
  const obj = $(keys("./pages/full2D"));
  const pureShare = ($(keys("./pages/singleSettlementPage")), keys("./shareApp"));
  const val = $(keys("./viewer"));
  const properties = keys("./lib/animation");
  const c = $(keys("./store/historyTimes"));
  const value = $(keys("./network/reporter"));
  const emptyJ = $(keys("./gameCtrl"));
  const $spy = $(keys("./gameView"));
  const $src = $(keys("./gameModel"));
  const props = keys("./random");
  const curElem = $(keys("./control/instructionCtrl"));
  const out = $(keys("./control/relayInstructionCtrl"));
  const node = $(keys("./lib/mue/eventcenter"));
  const revisionCheckbox = $(keys("./control/onebyoneCtrl"));
  const visible_keys = keys("util/encryption");
  const opt = $(keys("./network/relayMoniter"));
  /** @type {number} */
  const h = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
  /** @type {number} */
  const w = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  const that = wx.getSystemInfoSync() || {};
  /** @type {boolean} */
  const e = "ios" == that.platform;
  const columns = that.model;
  const subject = (() => {
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function start(options) {
      addListener(this, start);
      /** @type {Object} */
      this.options = options;
      /** @type {number} */
      this.is_from_wn = 0;
      /** @type {boolean} */
      this.firstInit = true;
      /** @type {number} */
      this.distance = 0;
      /** @type {number} */
      this.heightestScore = 0;
      /** @type {string} */
      this.stage = "";
      /** @type {number} */
      this.succeedTime = 0;
      /** @type {number} */
      this.lastAddBonus = -2;
      /** @type {string} */
      this.lastStage = "";
      /** @type {null} */
      this.deadTimeout = null;
      /** @type {number} */
      this.currentScore = 0;
      /** @type {number} */
      this.seq = 0;
      /** @type {null} */
      this.thirdBlock = null;
      /** @type {boolean} */
      this.straight = true;
      /** @type {boolean} */
      this.firstBlood = false;
      /** @type {number} */
      this.lastHardLevel = 200;
      /** @type {boolean} */
      this.guider = false;
      /** @type {Array} */
      this.hardDistances = [];
      /** @type {boolean} */
      this.socketFirstSync = false;
      this.init();
      this.randomSeed = this.generateSeed();
      (0, props.setRandomSeed)(this.randomSeed);
      /** @type {Array} */
      this.actionList = [];
      /** @type {Array} */
      this.musicList = [];
      /** @type {Array} */
      this.touchList = [];
      /** @type {Array} */
      this.touchMoveList = [];
      /** @type {Array} */
      this.onceTouchMoveList = [];
      /** @type {Array} */
      this.touchStartTime = [];
      /** @type {Array} */
      this.blocks = [];
      /** @type {number} */
      this.liveTime = 0;
      /** @type {Array} */
      this.eggBlocksCount = [];
      /** @type {Array} */
      this.eggBlocksTriggerCount = [];
      /** @type {Array} */
      this.eggBlocksFailCount = [];
      /** @type {Array} */
      this.eggBlocksSucceedCount = [];
      if (wx.setKeepScreenOn) {
        wx.setKeepScreenOn({
          keepScreenOn : true
        });
      }
    }
    return selectWordAt(start, [{
      key : "moveTo",
      /**
       * @param {?} offset
       * @return {undefined}
       */
      value(offset) {
        this.camera.position.x = this.camera.position.x + offset.x;
        this.camera.position.z = this.camera.position.z + offset.z;
      }
    }, {
      key : "moveGradually",
      /**
       * @param {?} offset
       * @param {number} thisValue
       * @return {undefined}
       */
      value(offset, thisValue) {
        if (this.animating && !this.guider) {
          (0, properties.TweenAnimation)(this.bottle.obj.position.x, this.bottle.obj.position.x - offset.x, 500 * thisValue, "Linear", (tx, dataAndEvents) => {
            if (void 0 !== tx) {
              /** @type {number} */
              this.bottle.obj.position.x = tx;
              if (dataAndEvents) {
                /** @type {number} */
                this.bottle.obj.position.x = -0.098;
              }
            }
          });
          /** @type {number} */
          let i = 0;
          const valuesLen = this.blocksInUse.length;
          for (;i < valuesLen;++i) {
            (0, properties.TweenAnimation)(this.blocksInUse[i].obj.position.x, this.blocksInUse[i].obj.position.x - offset.x, 500 * thisValue, "Linear", function(tx) {
              if (void 0 !== tx) {
                /** @type {number} */
                this.obj.position.x = tx;
              }
            }.bind(this.blocksInUse[i]));
          }
          if (this.blocks) {
            if (this.blocks[0]) {
              (0, properties.TweenAnimation)(this.blocks[0].obj.position.x, this.blocks[0].obj.position.x - offset.x, 500 * thisValue, "Linear", function(tx) {
                if (void 0 !== tx) {
                  /** @type {number} */
                  this.obj.position.x = tx;
                }
              }.bind(this.blocks[0]));
            }
          }
        } else {
          /** @type {Array} */
          this.camera.destination = [this.camera.position.x + offset.x, this.camera.position.z + offset.z];
          (0, properties.TweenAnimation)(this.camera.position.x, this.camera.position.x + offset.x, 500 * thisValue, "Quad.easeOut", tx => {
            if (void 0 !== tx) {
              /** @type {number} */
              this.camera.position.x = tx;
            }
          });
          (0, properties.TweenAnimation)(this.camera.position.z, this.camera.position.z + offset.z, 500 * thisValue, "Quad.easeOut", zOrder => {
            if (void 0 !== zOrder) {
              /** @type {number} */
              this.camera.position.z = zOrder;
            }
          });
        }
      }
    }, {
      key : "update",
      /**
       * @param {number} percent
       * @return {?}
       */
      value(percent) {
        const self = this;
        if (this.tailSystem) {
          this.tailSystem.update(1E3 * percent);
        }
        this.bottle.update(percent);
        if (this.renderer.shadowMap.enabled) {
          this.shadowTarget.position.x = this.bottle.obj.position.x;
          this.shadowTarget.position.z = this.bottle.obj.position.z;
          this.shadowLight.position.x = this.bottle.obj.position.x + 0;
          this.shadowLight.position.z = this.bottle.obj.position.z + 10;
        }
        /** @type {number} */
        let i = 0;
        let ln = this.blocksInUse.length;
        for (;i < ln;++i) {
          this.blocksInUse[i].update();
        }
        if (this.blocks && (this.blocks[0] && this.blocks[0].update()), ("forerake" === this.bottle.status || "hypsokinesis" === this.bottle.status) && 5 != this.hit) {
          const configList = this.bottle.getBox();
          const r20 = "forerake" === this.bottle.status ? this.nextBlock.getBox() : this.currentBlock.getBox();
          /** @type {number} */
          i = 0;
          ln = configList.length;
          for (;i < ln;++i) {
            if (configList[i].intersectsBox(r20)) {
              if (0 == i) {
                this.bottle.rotate();
                if (this.suspendTimer) {
                  clearTimeout(this.suspendTimer);
                  /** @type {null} */
                  this.suspendTimer = null;
                }
              } else {
                if (1 == i) {
                  this.bottle.suspend();
                  if (this.suspendTimer) {
                    clearTimeout(this.suspendTimer);
                    /** @type {null} */
                    this.suspendTimer = null;
                  }
                } else {
                  if (!(2 != i)) {
                    if (!this.suspendTimer) {
                      /** @type {number} */
                      this.suspendTimer = setTimeout(() => {
                        self.bottle.suspend();
                        /** @type {null} */
                        self.suspendTimer = null;
                      }, 90 * this.distance);
                    }
                  }
                }
              }
              break;
            }
          }
        }
        if (this.bottle.obj.position.y <= sprite.BLOCK.height / 2 + 0.1 && ("jump" === this.bottle.status && (this.bottle.flyingTime > 0.3 && !this.pendingReset))) {
          if (1 === this.hit || 7 === this.hit) {
            if (this.bottle.stop(), this.bottle.changeScorePos(0), this.succeed(), this.animating) {
              return;
            }
            if (1 === this.hit) {
              this.audioManager[`combo${Math.min(this.doubleHit + 1, 8)}`].seek(0);
              this.audioManager[`combo${Math.min(this.doubleHit + 1, 8)}`].play();
              ++this.doubleHit;
              this.addWave(Math.min(this.doubleHit, 4));
              this.bottle.showAddScore(1, true, this.quick);
              this.UI.addScore(1, true, this.quick);
              this.currentScore = this.UI.score;
              if ("observe" != this.mode) {
                this.showCombo();
              }
            } else {
              /** @type {number} */
              this.doubleHit = 0;
              this.UI.addScore(1, false, this.quick);
              this.currentScore = this.UI.score;
              this.bottle.showAddScore(1, false, this.quick);
            }
            this.audioManager.success.seek(0);
            this.audioManager.success.play();
            if (!("observe" == this.mode)) {
              if (!("relay" == this.mode)) {
                if (!this.gameCtrl.reviewCtrl.isInThisPage) {
                  this.rankSystem.update();
                }
              }
            }
          } else {
            if (2 === this.hit) {
              this.bottle.stop();
              /** @type {number} */
              this.bottle.obj.position.y = sprite.BLOCK.height / 2;
              this.bottle.obj.position.x = this.bottle.destination[0];
              this.bottle.obj.position.z = this.bottle.destination[1];
            } else {
              if (3 === this.hit) {
                this.bottle.hypsokinesis();
                this.audioManager.fall_2.play();
                /** @type {number} */
                this.bottle.obj.position.y = sprite.BLOCK.height / 2;
              } else {
                if (4 === this.hit || 5 === this.hit) {
                  this.bottle.forerake();
                  this.audioManager.fall_2.play();
                  /** @type {number} */
                  this.bottle.obj.position.y = sprite.BLOCK.height / 2;
                } else {
                  if (0 === this.hit) {
                    this.bottle.fall();
                    this.audioManager.fall.play();
                    /** @type {number} */
                    this.bottle.obj.position.y = sprite.BLOCK.height / 2;
                  } else {
                    if (6 === this.hit) {
                      this.bottle.stop();
                      this.audioManager.fall.play();
                      /** @type {number} */
                      this.bottle.obj.position.y = sprite.BLOCK.height / 2;
                    } else {
                      if (-1 === this.hit) {
                        this.bottle.stop();
                        /** @type {number} */
                        this.bottle.obj.position.y = sprite.BLOCK.height / 2;
                        /** @type {number} */
                        this.bottle.obj.position.x = 0;
                      }
                    }
                  }
                }
              }
            }
          }
          if (0 === this.hit || (3 === this.hit || (4 === this.hit || (5 === this.hit || 6 === this.hit)))) {
            if (this.guider) {
              if (this.UI.score > 0) {
                /** @type {boolean} */
                this.guider = false;
              } else {
                if (!(this.liveTime > 3)) {
                  return void this.live();
                }
                /** @type {boolean} */
                this.guider = false;
                this.full2D.hide2DGradually();
              }
            }
            /** @type {boolean} */
            this.pendingReset = true;
            this.currentScore = this.UI.score;
            this.reporter.addEggBlockReport(this.eggBlocksCount, this.eggBlocksTriggerCount, this.eggBlocksFailCount, this.eggBlocksSucceedCount);
            this.gameCtrl.gameOver(this.currentScore);
            const mode = this.mode;
            /** @type {number} */
            this.deadTimeout = setTimeout(() => {
              /** @type {boolean} */
              self.pendingReset = false;
              if (!("relay" == mode)) {
                if (!self.gameCtrl.reviewCtrl.isInThisPage) {
                  properties.TweenAnimation.killAll();
                  self.gameCtrl.gameOverShowPage();
                }
              }
              if ("observe" == self.mode) {
                self.instructionCtrl.onCmdComplete();
              }
            }, 2E3);
          } else {
            if ("observe" == this.mode) {
              this.instructionCtrl.onCmdComplete();
            }
          }
          if ("relay" == this.mode) {
            setTimeout(() => {
              node.default.emitSync(sprite.EVENT.NOWPLAYEROVER, {
                hit : self.hit
              });
            }, 0 === this.hit || (3 === this.hit || (4 === this.hit || (5 === this.hit || 6 === this.hit))) ? 2E3 : 0);
          }
        }
        this.renderer.render(this.scene, this.camera);
      }
    }, {
      key : "succeed",
      /**
       * @param {boolean} error
       * @return {undefined}
       */
      value(error) {
        const self = this;
        if (++this.succeedTime, this.musicScore = false, this.lastSucceedTime = Date.now(), this.succeedTime % 15 == 0 && (error && error.noAnimation || this.ground.changeColor()), this.blocksInUse.length >= 9) {
          const p = this.blocksInUse.shift();
          /** @type {boolean} */
          p.obj.visible = false;
          this.blocksPool.push(p);
        }
        const group = this.nextBlock.obj.position.clone().sub(this.currentBlock.obj.position);
        this.bottle.obj.position.x = this.bottle.destination[0];
        this.bottle.obj.position.z = this.bottle.destination[1];
        const that = this.thirdBlock;
        if (this.audioManager.setTimerFlag(true), !this.firstAnimating) {
          if (this.guider && (this.guider = false, this.full2D.hide2DGradually()), !this.animating) {
            if (this.nextBlock.whenSucceed && this.nextBlock.whenSucceed(), !this.nextBlock.succeedTimer && (void 0 === this.nextBlock.score && !this.nextBlock.musicName) || (error && error.noAnimation || "relay" == this.mode)) {
              if (error) {
                if (error.musicScore) {
                  if ("relay" != this.mode) {
                    if (31 == this.nextBlock.order) {
                      this.nextBlock.score = this.mmpayScore;
                    }
                    this.UI.addScore(this.nextBlock.score, false, false, true);
                    if (32 == this.nextBlock.order) {
                      this.relaxLeft += 2;
                    }
                  }
                }
              }
            } else {
              const data = this.nextBlock;
              /** @type {number} */
              this.musicTimer = setTimeout(() => {
                if (void 0 !== data.score) {
                  if (!(2 == self.reviewVersion && 15 == data.order)) {
                    /** @type {boolean} */
                    self.musicScore = true;
                    if (31 == data.order) {
                      data.score = self.mmpayScore;
                    }
                    self.UI.addScore(data.score, false, false, true);
                    self.bottle.showAddScore(data.score, false, false, true);
                    node.default.emit(sprite.EVENT.TRIGGER_EGG, {
                      order : data.order
                    });
                  }
                }
                if (data.musicName) {
                  self.audioManager[data.musicName].seek(0);
                  self.audioManager[data.musicName].play();
                  if (data.registerAudio) {
                    self.audioManager.register(data.musicName, () => {
                      data.registerAudio();
                    }, () => {
                      if (data.registerEndAudio) {
                        data.registerEndAudio();
                      }
                    });
                  }
                }
                if (data.succeedTimer) {
                  data.succeedTimer(self.UI.score);
                }
                if (32 == data.order) {
                  self.relaxLeft += 2;
                }
              }, 2E3);
              this.audioManager.pop.seek(0);
              this.audioManager.pop.play();
            }
            const pos = this.nextBlock.obj.position.clone();
            const tmp_x = this.nextBlock.radius + this.distance + that.radius;
            if (this.straight) {
              pos.x += tmp_x;
              this.bottle.lookAt("straight", pos.clone());
            } else {
              pos.z -= tmp_x;
              this.bottle.lookAt("left", pos.clone());
            }
            that.obj.position.x = pos.x;
            that.obj.position.z = pos.z;
          }
          const shape = that.obj.position.clone().sub(this.nextBlock.obj.position);
          const point1 = group.add(shape);
          point1.x /= 2;
          point1.z /= 2;
          this.scene.add(that.obj);
          this.currentBlock = this.nextBlock;
          this.nextBlock = that;
          /** @type {number} */
          const r20 = point1.length() / 10;
          /** @type {number} */
          this.bottle.human.rotation.z = 0;
          /** @type {number} */
          this.bottle.human.rotation.x = 0;
          if (error && error.noAnimation) {
            this.moveTo(point1);
            /** @type {number} */
            that.body.position.y = sprite.BLOCK.height / 2 - that.height / 2;
            /** @type {boolean} */
            that.obj.visible = true;
          } else {
            this.bottle.squeeze();
            that.popup();
            if (sprite.GAME.canShadow) {
              this.bottle.scatterParticles();
            }
            if (this.animating) {
              /** @type {number} */
              point1.x = 19.8;
            }
            /** @type {number} */
            this.cameraMoveDuration = r20;
            this.moveGradually(point1, r20);
          }
        }
      }
    }, {
      key : "handleWxOnHideEvent",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.show = false;
        if ("prepare" == this.bottle.status) {
          /** @type {boolean} */
          this.touchObserve = true;
        }
        if (this.animateTimer) {
          clearTimeout(this.animateTimer);
          /** @type {null} */
          this.animateTimer = null;
        }
        if (this.onshowAnimateTimer) {
          clearTimeout(this.onshowAnimateTimer);
          /** @type {null} */
          this.onshowAnimateTimer = null;
        }
        this.gameCtrl.wxOnhide();
      }
    }, {
      key : "init",
      /**
       * @return {undefined}
       */
      value() {
        const self = this;
        if (!opts.default.getFirstBlood()) {
          if (!this.options.query.mode) {
            /** @type {boolean} */
            this.guider = true;
          }
        }
        this.socketMonitor = new opt.default({
          report : this.report.bind(this),
          duration : 13E3,
          logMaxLength : 5E3
        });
        this.gameCtrl = new emptyJ.default(this);
        this.gameView = new $spy.default(this);
        this.gameModel = new $src.default(this);
        this.instructionCtrl = new curElem.default(this);
        this.relayInstructionCtrl = new out.default(this);
        this.historyTimes = new c.default(this);
        this.reporter = new value.default;
        this.audioManager = new track.default(this);
        this.gameSocket = new prompt.default(this);
        this.scene = new THREE.Scene;
        const height = sprite.FRUSTUMSIZE;
        /** @type {number} */
        const aspect = w / h;
        this.camera = new THREE.OrthographicCamera(height * aspect / -2, height * aspect / 2, height / 2, height / -2, -10, 85);
        this.camera.position.set(-17, 30, 26);
        this.camera.lookAt(new THREE.Vector3(13, 0, -4));
        this.scene.add(this.camera);
        this.renderer = new THREE.WebGLRenderer({
          antialias : true,
          canvas,
          preserveDrawingBuffer : true
        });
        window.renderer = this.renderer;
        /** @type {Array} */
        this.blocksPool = [];
        /** @type {Array} */
        this.blocksInUse = [];
        /** @type {Array} */
        this.blocksRemoved = [];
        /** @type {number} */
        this.doubleHit = 0;
        if (e && (columns.includes("iPhone 4") || (columns.includes("iPhone 5") || (that.system.includes("iOS 9") || (that.system.includes("iOS 8") || columns.includes("iPhone 6") && !columns.includes("iPhone 6s")))))) {
          /** @type {boolean} */
          this.renderer.shadowMap.enabled = false;
          /** @type {boolean} */
          sprite.GAME.canShadow = false;
          this.renderer.setPixelRatio(1.5);
        } else {
          if (void 0 !== that.benchmarkLevel && (that.benchmarkLevel < 5 && -1 != that.benchmarkLevel)) {
            /** @type {boolean} */
            sprite.GAME.canShadow = false;
            /** @type {boolean} */
            this.renderer.shadowMap.enabled = false;
            this.renderer.setPixelRatio(window.devicePixelRatio ? e ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio : 1);
          } else {
            this.renderer.setPixelRatio(window.devicePixelRatio ? e ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio : 1);
            /** @type {boolean} */
            this.renderer.shadowMap.enabled = true;
          }
        }
        this.renderer.setSize(w, h);
        /** @type {boolean} */
        this.renderer.localClippingEnabled = true;
        this.ground = new option.default;
        /** @type {number} */
        this.ground.obj.position.z = -84;
        this.camera.add(this.ground.obj);
        /** @type {Array} */
        this.waves = [];
        /** @type {number} */
        token = 0;
        for (;token < 4;++token) {
          const p = new desc.default;
          this.waves.push(p);
          /** @type {boolean} */
          p.obj.visible = false;
          this.scene.add(p.obj);
        }
        const legMaterial = new THREE.MeshBasicMaterial({
          color : 16119285
        });
        this.combo = new THREE.Mesh(new THREE.CircleGeometry(0.6, 30), legMaterial);
        /** @type {string} */
        this.combo.name = "combo";
        /** @type {number} */
        this.combo.position.x = -50;
        /** @type {number} */
        this.combo.rotation.x = -Math.PI / 2;
        this.scene.add(this.combo);
        if (this.renderer.shadowMap.enabled) {
          this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), legMaterial);
          /** @type {boolean} */
          this.shadowTarget.visible = false;
          /** @type {string} */
          this.shadowTarget.name = "shadowTarget";
          this.scene.add(this.shadowTarget);
        }
        this.currentBlock = new dd.default(0);
        this.initNextBlock = this.nextBlock = new dd.default(1);
        /** @type {number} */
        this.nextBlock.obj.position.x = 20;
        this.bottle = new action.default;
        this.bottle.obj.position.set(-10, -sprite.BLOCK.height / 2, 0);
        this.scene.add(this.bottle.obj);
        if (this.guider) {
          this.bottle.obj.position.set(-11, 50, 0);
          this.camera.position.x -= 19;
          setTimeout(() => {
            self.bottle.showup();
          }, 800);
          /** @type {number} */
          this.currentBlock.obj.position.x = -11;
          this.currentBlock.change(null, "gray", 0.7);
          this.scene.add(this.currentBlock.obj);
          /** @type {number} */
          this.guiderTimer = setInterval(() => {
            /** @type {number} */
            self.bottle.velocity.vz = 0;
            /** @type {number} */
            self.bottle.velocity.vy = 150;
            self.direction = new THREE.Vector2(1, 0);
            const exports = new THREE.Vector3(1, 0, 0);
            self.bottle.jump(exports.normalize());
            self.hit = self.checkHit2(self.bottle, self.currentBlock);
          }, 3E3);
        }
        this.blocksInUse.push(this.nextBlock);
        this.blocksInUse.push(this.currentBlock);
        /** @type {number} */
        var token = 2;
        for (;token < 36;++token) {
          const copies = new dd.default(token);
          this.blocksPool.push(copies);
        }
        this.removeFromPool();
        /** @type {number} */
        this.showRelaxScore = 0;
        /** @type {number} */
        this.relaxLeft = 0;
        this.onebyoneCtrl = new revisionCheckbox.default(this, this.camera);
        this.full2D = new obj.default({
          camera : this.camera,
          onClickRank : this.gameCtrl.clickRank.bind(this.gameCtrl),
          onClickReplay : this.gameCtrl.clickReplay.bind(this.gameCtrl),
          onClickShare : this.gameCtrl.shareBattleCard.bind(this.gameCtrl),
          onClickStart : this.gameCtrl.clickStart.bind(this.gameCtrl),
          onShowFriendRank : this.gameCtrl.showFriendRank.bind(this.gameCtrl),
          onBattlePlay : this.gameCtrl.onBattlePlay.bind(this.gameCtrl),
          onGroupShare : this.gameCtrl.shareGroupRank.bind(this.gameCtrl),
          friendRankReturn : this.gameCtrl.friendRankReturn.bind(this.gameCtrl),
          groupPlayGame : this.gameCtrl.groupPlayGame.bind(this.gameCtrl),
          onLookersStart : this.gameCtrl.onViewerStart.bind(this.gameCtrl),
          /**
           * @return {undefined}
           */
          onReturnWechat() {
            wx.exitMiniProgram();
          },
          /**
           * @param {?} deepDataAndEvents
           * @return {undefined}
           */
          onClickPureShare(deepDataAndEvents) {
            (0, pureShare.pureShare)(deepDataAndEvents, self.gameModel.currentScore);
          },
          newRelay : this.gameCtrl.gotoRelayMode.bind(this.gameCtrl),
          outRelay1 : this.gameCtrl.outRelay1.bind(this.gameCtrl),
          outRelay2 : this.gameCtrl.outRelay2.bind(this.gameCtrl),
          startRelay : this.gameCtrl.startRelay.bind(this.gameCtrl),
          watchRelay : this.gameCtrl.watchRelay.bind(this.gameCtrl),
          replayRelay : this.gameCtrl.replayRelay.bind(this.gameCtrl),
          shareRelay : this.gameCtrl.shareRelay.bind(this.gameCtrl),
          quitRecord : this.gameCtrl.quitReview.bind(this.gameCtrl),
          goRecord : this.gameCtrl.initReview.bind(this.gameCtrl),
          skipRelayBeginner : this.gameCtrl.skipRelayBeginner.bind(this.gameCtrl)
        });
        this.UI = new property.default(this.scene, this.camera, this.full2D, this);
        if (sprite.GAME.canShadow) {
          this.tailSystem = new item.default(this.scene, this.bottle);
        }
        this.addLight();
        this.bindEvent();
        this.viewer = new val.default(this.camera);
        this.rankSystem = new def.default(this);
        setTimeout(() => {
          self.audioManager.icon.play();
        }, 300);
        this.UI.hideScore();
        this.gameModel.init();
        this.gameCtrl.init();
        this.gameView.init();
        wx.onShow(this.handleWxOnShowEvent.bind(this));
        wx.onHide(this.handleWxOnHideEvent.bind(this));
        wx.onError(this.handleWxOnError.bind(this));
        if (wx.onAudioInterruptionBegin) {
          wx.onAudioInterruptionBegin(this.handleInterrupt.bind(this));
        }
        this.gameCtrl.firstInitGame(this.options);
        wx.showShareMenu();
        wx.onShareAppMessage(() => ({
          title : "\u4e00\u8d77\u6765\uff0c\u8df3\u4e00\u8df3",
          imageUrl : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJHS4AOib6MiaPhwEaqw1NPcZGtgAGTlVJ4lrBAGtchhnXanMyo7q7toRpD4DukV5F2TA/0?wx_fmt=png"
        }));
      }
    }, {
      key : "loopAnimate",
      /**
       * @return {undefined}
       */
      value() {
        const self = this;
        /** @type {boolean} */
        this.animating = true;
        this.touchStartAnim({
          fromGuider : true
        });
        /** @type {number} */
        this.touchStartTimer = setTimeout(() => {
          /** @type {number} */
          self.bottle.velocity.vz = Math.min(0.719 * sprite.BOTTLE.velocityZIncrement, 180);
          /** @type {number} */
          self.bottle.velocity.vy = Math.min(sprite.BOTTLE.velocityY + 0.719 * sprite.BOTTLE.velocityYIncrement, 180);
          const exports = new THREE.Vector3(self.nextBlock.obj.position.x - self.bottle.obj.position.x, 0, self.nextBlock.obj.position.z - self.bottle.obj.position.z);
          self.direction = new THREE.Vector2(self.nextBlock.obj.position.x - self.bottle.obj.position.x, self.nextBlock.obj.position.z - self.bottle.obj.position.z);
          self.hit = self.checkHit2(self.bottle, self.currentBlock, self.nextBlock);
          self.thirdBlock = self.generateNextBlock();
          if (self.thirdBlock) {
            if (self.thirdBlock.obj) {
              self.thirdBlock.obj.position.set(39.7, 0, 0);
              if (self.tailSystem) {
                self.tailSystem.correctPosition();
              }
              properties.TweenAnimation.kill("progress");
              self.bottle.jump(exports.normalize());
              self.currentBlock.rebound();
              /** @type {number} */
              self.animateTimer = setTimeout(() => {
                console.log("loopAnimate loopAnimate");
                self.loopAnimate();
              }, 3E3);
            }
          }
        }, 719);
      }
    }, {
      key : "animate",
      /**
       * @return {undefined}
       */
      value() {
        const self = this;
        /** @type {boolean} */
        this.firstAnimating = true;
        const child = this;
        /** @type {number} */
        let udataCur = 0;
        for (;udataCur < 7;++udataCur) {
          setTimeout((value => function() {
            if (("single" == child.mode && ("startPage" == child.stage || "friendRankList" == child.stage) || child.guider) && (child.blocks && child.blocks.length < 7)) {
              const node = new dd.default(-1, value);
              node.showup(value);
              child.scene.add(node.obj);
              child.blocks.push(node);
              if (0 == value) {
                this.nextBlock = node;
              }
            }
          })(udataCur), 200 * udataCur);
        }
        /** @type {number} */
        this.animateTimer = setTimeout(() => {
          if ("single" == child.mode && ("startPage" == child.stage || "friendRankList" == child.stage) || child.guider) {
            /** @type {number} */
            self.bottle.velocity.vz = Math.min(0.4 * sprite.BOTTLE.velocityZIncrement, 180);
            /** @type {number} */
            self.bottle.velocity.vy = Math.min(sprite.BOTTLE.velocityY + 0.4 * sprite.BOTTLE.velocityYIncrement, 180);
            self.direction = new THREE.Vector2(self.nextBlock.obj.position.x - self.bottle.obj.position.x, self.nextBlock.obj.position.z - self.bottle.obj.position.z);
            const exports = new THREE.Vector3(self.nextBlock.obj.position.x - self.bottle.obj.position.x, 0, self.nextBlock.obj.position.z - self.bottle.obj.position.z);
            if (self.bottle.jump(exports.normalize()), self.hit = -1, self.nextBlock = self.initNextBlock, self.blocks) {
              /** @type {number} */
              let i = 0;
              let padLength = self.blocks.length;
              for (;i < padLength;++i) {
                properties.customAnimation.to(self.blocks[i].hitObj.material, 1, {
                  opacity : 0,
                  delay : 0.2 * i + 0.5
                });
              }
              /** @type {number} */
              i = 1;
              padLength = self.blocks.length;
              for (;i < padLength;++i) {
                properties.customAnimation.to(self.blocks[i].obj.position, 0.5, {
                  z : i % 2 == 0 ? 60 : -60,
                  delay : 0.1 * i + 2.2
                });
              }
              if (self.guider) {
                properties.customAnimation.to(self.currentBlock.obj.position, 0.5, {
                  z : -60,
                  delay : 2.1
                });
                const current = self.currentBlock;
                setTimeout(() => {
                  /** @type {boolean} */
                  current.obj.visible = false;
                }, 3E3);
              }
              self.currentBlock = self.blocks[0];
              /** @type {number} */
              self.beginnerTimer = setTimeout(() => {
                if (("single" == child.mode && ("startPage" == child.stage || "friendRankList" == child.stage) || child.guider) && (child.guider && self.full2D.showBeginnerPage(), self.nextBlock.popup(), self.nextBlock.greenMaterial.color.setHex(6118749), self.nextBlock.whiteMaterial.color.setHex(11184810), self.scene.add(self.nextBlock.obj), self.blocks)) {
                  /** @type {number} */
                  let i = 1;
                  const valuesLen = self.blocks.length;
                  for (;i < valuesLen;++i) {
                    /** @type {boolean} */
                    self.blocks[i].obj.visible = false;
                  }
                  if (self.guider) {
                    /** @type {boolean} */
                    self.animating = false;
                  }
                  /** @type {boolean} */
                  self.firstAnimating = false;
                }
              }, 3E3);
              /** @type {number} */
              self.loopAnimateTimer = setTimeout(() => {
                if (!("single" != child.mode)) {
                  if (!("startPage" != child.stage && "friendRankList" != child.stage)) {
                    if (child.show) {
                      console.log("loopAnimateTimer loopAnimateTimer loopAnimate");
                      self.loopAnimate();
                    }
                  }
                }
              }, 4500);
            }
          }
        }, 1500);
      }
    }, {
      key : "handleWxOnShowEvent",
      /**
       * @param {Object} c
       * @return {undefined}
       */
      value(c) {
        if (c.query && c.query.mode || this.options.query && this.options.query.mode) {
          /** @type {boolean} */
          this.guider = false;
        }
        console.log("onshow \u64cd\u4f5c", c);
        const self = this;
        /** @type {boolean} */
        this.show = true;
        this.reporter.enterReport(c.scene);
        if (this.guiderTimer) {
          if (!this.guider) {
            clearInterval(this.guiderTimer);
            /** @type {null} */
            this.guiderTimer = null;
          }
        }
        /** @type {number} */
        this.onshowAnimateTimer = setTimeout((dataAndEvents => () => {
          if ("single" == self.mode) {
            if ("startPage" == self.stage) {
              if (!self.animateTimer) {
                if (self.show) {
                  if (self.blocks && (self.blocks.length > 0 && !self.firstAnimating)) {
                    console.log("onSHow loopAnimate");
                    self.loopAnimate();
                  } else {
                    if (!self.animating) {
                      if (!!dataAndEvents) {
                        if (!self.guider) {
                          /** @type {boolean} */
                          self.animating = true;
                          self.animate();
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        })(this.firstInit), 1E3);
        if (this.firstInit) {
          /** @type {boolean} */
          this.firstInit = false;
        } else {
          this.gameCtrl.wxOnShow(c);
        }
      }
    }, {
      key : "showCombo",
      /**
       * @return {undefined}
       */
      value() {
        const self = this;
        setTimeout(() => {
          self.combo.position.set(self.nextBlock.obj.position.x, sprite.BLOCK.height / 2 + 0.15, self.nextBlock.obj.position.z);
        }, 200);
      }
    }, {
      key : "hideCombo",
      /**
       * @return {undefined}
       */
      value() {
        this.combo.position.set(-30, 0, 0);
      }
    }, {
      key : "replayGame",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        /** @type {number} */
        this.currentScore = 0;
        this.gameCtrl.onReplayGame();
        this.audioManager.restart.seek(0);
        this.audioManager.restart.play();
        if (this.guider) {
          if (this.guiderTimer) {
            clearInterval(this.guiderTimer);
            /** @type {null} */
            this.guiderTimer = null;
          }
          /** @type {boolean} */
          this.animating = true;
          this.animate();
          this.moveGradually(new THREE.Vector3(19, 0, 0), 3);
          this.randomSeed = this.generateSeed();
          (0, props.setRandomSeed)(this.randomSeed);
        } else {
          this.resetScene(newValue);
          this.bottle.showup();
        }
      }
    }, {
      key : "addWave",
      /**
       * @param {number} precision
       * @return {undefined}
       */
      value(precision) {
        const params = this;
        /** @type {number} */
        let i = 0;
        for (;i < precision;++i) {
          setTimeout((i => () => {
            /** @type {boolean} */
            params.waves[i].obj.visible = true;
            params.waves[i].obj.position.set(params.bottle.obj.position.x, sprite.BLOCK.height / 2 + 0.1 * i + 1, params.bottle.obj.position.z);
            (0, properties.TweenAnimation)(params.waves[i].obj.scale.x, 4, 2 / (i / 2.5 + 2) * 500, "Linear", (newSize, dataAndEvents) => {
              if (void 0 !== newSize) {
                params.waves[i].obj.scale.x = newSize;
                params.waves[i].obj.scale.y = newSize;
                params.waves[i].obj.scale.z = newSize;
              }
            });
            (0, properties.TweenAnimation)(params.waves[i].obj.material.opacity, 0, 2 / (i / 2.5 + 2) * 500, "Linear", (opacity, dataAndEvents, deepDataAndEvents) => {
              if (void 0 !== opacity) {
                /** @type {number} */
                params.waves[i].obj.material.opacity = opacity;
                if (deepDataAndEvents) {
                  params.waves[i].reset();
                }
              }
            });
          })(i), 200 * i);
        }
      }
    }, {
      key : "addLight",
      /**
       * @return {undefined}
       */
      value() {
        const ambientLight = new THREE.AmbientLight(16777215, 0.8);
        if (this.shadowLight = new THREE.DirectionalLight(16777215, 0.28), this.shadowLight.position.set(0, 15, 10), this.renderer.shadowMap.enabled) {
          /** @type {boolean} */
          this.shadowLight.castShadow = true;
          this.shadowLight.target = this.shadowTarget;
          /** @type {number} */
          this.shadowLight.shadow.camera.near = 5;
          /** @type {number} */
          this.shadowLight.shadow.camera.far = 32;
          /** @type {number} */
          this.shadowLight.shadow.camera.left = -10;
          /** @type {number} */
          this.shadowLight.shadow.camera.right = 10;
          /** @type {number} */
          this.shadowLight.shadow.camera.top = 10;
          /** @type {number} */
          this.shadowLight.shadow.camera.bottom = -10;
          /** @type {number} */
          this.shadowLight.shadow.mapSize.width = 512;
          /** @type {number} */
          this.shadowLight.shadow.mapSize.height = 512;
          const geometry = new THREE.PlaneGeometry(65, 25);
          this.shadowGround = new THREE.Mesh(geometry, new THREE.ShadowMaterial({
            transparent : true,
            color : 0,
            opacity : 0.3
          }));
          /** @type {boolean} */
          this.shadowGround.receiveShadow = true;
          /** @type {number} */
          this.shadowGround.position.x = -25;
          /** @type {number} */
          this.shadowGround.position.y = -18;
          /** @type {number} */
          this.shadowGround.position.z = -15;
          /** @type {number} */
          this.shadowGround.rotation.x = -Math.PI / 2;
          this.shadowLight.add(this.shadowGround);
        }
        this.scene.add(this.shadowLight);
        this.scene.add(ambientLight);
      }
    }, {
      key : "checkHit2",
      /**
       * @param {?} newValue
       * @param {?} opt
       * @param {Object} params
       * @param {?} position
       * @return {?}
       */
      value(newValue, opt, params, position) {
        const options = this.checkHit2Core(newValue, opt, params, position);
        if ("relay" == this.mode) {
          options.translate.x = options.translate.x.toFixed(2);
          options.translate.y = options.translate.y.toFixed(2);
          const fmt = `|cH:${options.hit};fT:${options.flyingTime},t:${options.time},tsl:${options.translate.x},${options.translate.y};dst:${JSON.stringify(options.destination)},inY:${options.initY},cb:${this.currentBlock.order},${this.currentBlock.obj.position.x.toFixed(2)},${this.currentBlock.obj.position.z.toFixed(2)};nb:${this.nextBlock.order},${this.nextBlock.obj.position.x.toFixed(2)},${this.nextBlock.obj.position.z.toFixed(2)}`;
          this.socketMonitor.log(fmt);
        } else {
          if (params) {
            if (params.order >= 13) {
              if (1 == options.hit || 7 == options.hit) {
                this.eggBlocksSucceedCount[params.order] = this.eggBlocksSucceedCount[params.order] ? this.eggBlocksSucceedCount[params.order] + 1 : 1;
              } else {
                if (2 != options.hit) {
                  this.eggBlocksFailCount[params.order] = this.eggBlocksFailCount[params.order] ? this.eggBlocksFailCount[params.order] + 1 : 1;
                }
              }
            }
          }
        }
        return options.hit;
      }
    }, {
      key : "checkHit2Core",
      /**
       * @param {Object} self
       * @param {?} p
       * @param {Object} scope
       * @param {number} offset
       * @return {?}
       */
      value(self, p, scope, offset) {
        /** @type {number} */
        let remain = self.velocity.vy / sprite.GAME.gravity * 2;
        offset = offset || +self.obj.position.y.toFixed(2);
        /** @type {number} */
        const n = sprite.BLOCK.height / 2 - offset;
        /** @type {number} */
        const m = +((-self.velocity.vy + Math.sqrt(self.velocity.vy ** 2 - 2 * sprite.GAME.gravity * n)) / -sprite.GAME.gravity).toFixed(2);
        /** @type {number} */
        remain = +(remain -= m).toFixed(2);
        /** @type {Array} */
        const progressValues = [];
        const pos = new THREE.Vector2(self.obj.position.x, self.obj.position.z);
        const t = this.direction.setLength(self.velocity.vz * remain);
        if (pos.add(t), self.destination = [+pos.x.toFixed(2), +pos.y.toFixed(2)], progressValues.push(+pos.x.toFixed(2), +pos.y.toFixed(2)), this.animating, scope) {
          var errorMessage;
          /** @type {number} */
          const oDelta = (progressValues[0] - scope.obj.position.x) ** 2 + (progressValues[1] - scope.obj.position.z) ** 2;
          const restoreScript = scope.getVertices();
          if ((0, tag.default)(progressValues, restoreScript)) {
            /** @type {number} */
            errorMessage = Math.abs(oDelta) < 0.5 ? 1 : 7;
          } else {
            if ((0, tag.default)([progressValues[0] - sprite.BOTTLE.bodyWidth / 2, progressValues[1]], restoreScript) || (0, tag.default)([progressValues[0], progressValues[1] + sprite.BOTTLE.bodyDepth / 2], restoreScript)) {
              /** @type {number} */
              errorMessage = 5;
            } else {
              if ((0, tag.default)([progressValues[0], progressValues[1] - sprite.BOTTLE.bodyDepth / 2], restoreScript) || (0, tag.default)([progressValues[0] + sprite.BOTTLE.bodyDepth / 2, progressValues[1]], restoreScript)) {
                /** @type {number} */
                errorMessage = 3;
              }
            }
          }
        }
        const r20 = p.getVertices();
        return(0, tag.default)(progressValues, r20) ? errorMessage = 2 : ((0, tag.default)([progressValues[0], progressValues[1] + sprite.BOTTLE.bodyDepth / 2], r20) || (0, tag.default)([progressValues[0] - sprite.BOTTLE.bodyWidth / 2, progressValues[1]], r20)) && (errorMessage = errorMessage ? 6 : 4), {
          hit : errorMessage || 0,
          flyingTime : remain,
          time : m,
          translate : t,
          destination : progressValues,
          initY : offset
        };
      }
    }, {
      key : "shuffleArray",
      /**
       * @param {Array} params
       * @return {undefined}
       */
      value(params) {
        /** @type {number} */
        let paramName = params.length - 1;
        for (;paramName > 0;paramName--) {
          /** @type {number} */
          const i = Math.floor((0, props.random)() * (paramName + 1));
          const param = params[paramName];
          params[paramName] = params[i];
          params[i] = param;
        }
      }
    }, {
      key : "useBlock",
      /**
       * @param {Array} p
       * @return {?}
       */
      value(p) {
        let part;
        /** @type {number} */
        let j = 0;
        const pl = p.length;
        for (;j < pl;++j) {
          /** @type {number} */
          let i = 0;
          const valuesLen = this.blocksPool.length;
          for (;i < valuesLen;++i) {
            if (this.blocksPool[i].order == p[j]) {
              return this.blocksInUse.push(this.blocksPool[i]), part = this.blocksPool[i], this.blocksPool.splice(i, 1), part;
            }
          }
        }
      }
    }, {
      key : "generateNextBlock",
      /**
       * @return {?}
       */
      value() {
        let s;
        if (2 === this.reviewVersion) {
        } else {
          if (this.relaxLeft) {
            return--this.relaxLeft, s = this.useBlock([33, 34, 35]);
          }
          if (this.UI.score - this.showRelaxScore >= 1E3) {
            return s = this.useBlock([32]), this.showRelaxScore = this.UI.score, this.relaxLeft = 1, s;
          }
        }
        /** @type {number} */
        let e = 5;
        if (this.UI.score > 1E3) {
          /** @type {number} */
          e = 6;
        } else {
          if (this.succeedTime > 3E3) {
            /** @type {number} */
            e = 7;
          }
        }
        if (!this.animating) {
          this.shuffleArray(this.blocksPool);
        }
        /** @type {number} */
        let i = 0;
        const valuesLen = this.blocksPool.length;
        for (;i < valuesLen;++i) {
          if (this.succeedTime - this.lastAddBonus >= e && this.blocksPool[i].order >= 13 || this.succeedTime - this.lastAddBonus < e && this.blocksPool[i].order < 13) {
            if ((s = this.blocksPool[i]).order >= 13) {
              if (this.lastBonusOrder && this.lastBonusOrder == s.order || (this.UI.score < 100 && 29 == s.order || [32, 33, 34, 35].includes(s.order))) {
                continue;
              }
              this.lastAddBonus = this.succeedTime;
              this.lastBonusOrder = s.order;
            }
            this.blocksInUse.push(s);
            this.blocksPool.splice(i, 1);
            break;
          }
        }
        if (!s) {
          let p = this.blocksInUse.shift();
          for (;p.order >= 13;) {
            /** @type {boolean} */
            p.obj.visible = false;
            this.blocksPool.push(p);
            p = this.blocksInUse.shift();
          }
          s = p;
          this.blocksInUse.push(s);
        }
        return s.obj.visible = false, s.change(), s;
      }
    }, {
      key : "live",
      /**
       * @return {undefined}
       */
      value() {
        const bottleShowupAnimation = this;
        ++this.liveTime;
        setTimeout(() => {
          bottleShowupAnimation.resetScene(null, {
            bottleShowupAnimation : true
          });
        }, 2E3);
      }
    }, {
      key : "clearTimer",
      /**
       * @return {undefined}
       */
      value() {
        if (this.animateTimer) {
          clearTimeout(this.animateTimer);
          /** @type {null} */
          this.animateTimer = null;
        }
        if (this.loopAnimateTimer) {
          clearTimeout(this.loopAnimateTimer);
          /** @type {null} */
          this.loopAnimateTimer = null;
        }
        if (this.beginnerTimer) {
          clearTimeout(this.beginnerTimer);
          /** @type {null} */
          this.beginnerTimer = null;
        }
        if (this.touchStartTimer) {
          clearTimeout(this.touchStartTimer);
          /** @type {null} */
          this.touchStartTimer = null;
        }
        if (this.suspendTimer) {
          clearTimeout(this.suspendTimer);
          /** @type {null} */
          this.suspendTimer = null;
        }
      }
    }, {
      key : "setSpecialBaseStatus",
      /**
       * @param {boolean} error
       * @return {undefined}
       */
      value(error) {
        if ("relay" == this.mode) {
          /** @type {boolean} */
          this.use_mmpaybase = this.mmpay_status = this.use_wangzhe = true;
        } else {
          this.use_mmpaybase = error && void 0 !== error.use_mmpaybase ? error.use_mmpaybase : opts.default.getMmpayBaseStatus();
          this.mmpay_status = error && void 0 !== error.mmpay_status ? error.mmpay_status : opts.default.getMmpayBonusStatus().status;
          /** @type {number} */
          this.mmpayScore = this.mmpay_status ? 20 : 5;
          this.mmpay_checksum = opts.default.getMmpayBonusStatus().checksum;
          this.use_wangzhe = error && error.use_wangzhe || opts.default.getWangZheBaseStatus();
        }
      }
    }, {
      key : "removeFromPool",
      /**
       * @param {Array} data
       * @return {undefined}
       */
      value(data) {
        this.setSpecialBaseStatus(data);
        let matches;
        /** @type {Array} */
        matches = 3 == (data && data.version || sprite.VERSION) ? [24, 26, 27] : [30, 31, 32, 33, 34, 35];
        if (!this.use_mmpaybase) {
          if (!matches.includes(31)) {
            matches.push(31);
          }
        }
        if (!this.use_wangzhe) {
          if (!matches.includes(30)) {
            matches.push(30);
          }
        }
        matches.sort();
        /** @type {number} */
        let sel = matches.length - 1;
        for (;sel >= 0;--sel) {
          /** @type {number} */
          let index = this.blocksPool.length - 1;
          for (;index >= 0;--index) {
            if (this.blocksPool[index].order === matches[sel]) {
              const self = this.blocksPool.splice(index, 1);
              this.blocksRemoved.push(self[0]);
            }
          }
        }
      }
    }, {
      key : "resetScene",
      /**
       * @param {?} thisValue
       * @param {Array} prototype
       * @return {undefined}
       */
      value(thisValue, prototype) {
        if (this.reviewVersion = null, prototype && (prototype.version && (this.reviewVersion = prototype.version)), this.touchObserve = false, this.firstAnimating = false, this.myTurn = false, this.clicked = false, this.pendingReset = false, this.blocks && this.blocks.length > 0) {
          /** @type {number} */
          var i = 0;
          var padLength = this.blocks.length;
          for (;i < padLength;++i) {
            this.scene.remove(this.blocks[i].obj);
          }
        }
        /** @type {null} */
        this.blocks = null;
        if ("observe" == this.mode) {
          this.audioManager.scale_intro.stop();
          this.audioManager.scale_loop.stop();
        }
        this.randomSeed = thisValue || this.generateSeed();
        (0, props.setRandomSeed)(this.randomSeed);
        /** @type {Array} */
        this.actionList = [];
        /** @type {Array} */
        this.musicList = [];
        /** @type {Array} */
        this.touchList = [];
        /** @type {Array} */
        this.touchStartTime = [];
        /** @type {Array} */
        this.touchMoveList = [];
        this.clearTimer();
        if (this.currentBlock) {
          this.currentBlock.reset();
        }
        properties.TweenAnimation.killAll();
        /** @type {boolean} */
        this.animating = false;
        if ("relay" == this.mode && (prototype && prototype.gameLevel)) {
          if (1 == prototype.gameLevel) {
            /** @type {number} */
            sprite.BLOCK.minRadiusScale = 0.7;
            /** @type {number} */
            sprite.BLOCK.maxRadiusScale = 0.9;
            /** @type {number} */
            sprite.BLOCK.minDistance = 1;
            /** @type {number} */
            sprite.BLOCK.maxDistance = 19;
          } else {
            if (2 == prototype.gameLevel) {
              /** @type {number} */
              sprite.BLOCK.minRadiusScale = 0.6;
              /** @type {number} */
              sprite.BLOCK.maxRadiusScale = 0.8;
              /** @type {number} */
              sprite.BLOCK.minDistance = 1;
              /** @type {number} */
              sprite.BLOCK.maxDistance = 20;
            }
          }
        } else {
          /** @type {number} */
          sprite.BLOCK.minRadiusScale = 0.8;
          /** @type {number} */
          sprite.BLOCK.maxRadiusScale = 1;
          /** @type {number} */
          sprite.BLOCK.minDistance = 1;
          /** @type {number} */
          sprite.BLOCK.maxDistance = 17;
        }
        /** @type {number} */
        i = 0;
        padLength = this.blocksInUse.length;
        for (;i < padLength;++i) {
          /** @type {boolean} */
          (obj = this.blocksInUse.pop()).obj.visible = false;
          obj.reset();
          this.blocksPool.push(obj);
        }
        /** @type {number} */
        i = 0;
        padLength = this.blocksRemoved.length;
        for (;i < padLength;++i) {
          var obj = this.blocksRemoved.pop();
          /** @type {boolean} */
          obj.obj.visible = false;
          obj.reset();
          this.blocksPool.push(obj);
        }
        /** @type {number} */
        i = 0;
        padLength = this.waves.length;
        for (;i < padLength;++i) {
          this.waves[i].reset();
        }
        this.blocksPool.sort((a, b) => a.order - b.order);
        this.removeFromPool(prototype);
        this.currentBlock = this.blocksPool.shift();
        /** @type {boolean} */
        this.currentBlock.obj.visible = true;
        this.scene.add(this.currentBlock.obj);
        this.blocksInUse.push(this.currentBlock);
        if (this.shadowTarget) {
          this.shadowTarget.position.set(0, 0, 0);
        }
        this.nextBlock = this.blocksPool.shift();
        this.currentBlock.change(null, null, 1);
        this.nextBlock.change(null, null, 1);
        this.nextBlock.obj.position.set(20, 0, 0);
        this.currentBlock.obj.position.set(0, 0, 0);
        /** @type {boolean} */
        this.nextBlock.obj.visible = true;
        this.scene.add(this.nextBlock.obj);
        this.blocksInUse.push(this.nextBlock);
        this.bottle.reset();
        /** @type {null} */
        this.thirdBlock = null;
        this.UI.reset();
        this.rankSystem.reset();
        /** @type {null} */
        this.hit = null;
        /** @type {number} */
        this.lastAddBonus = -2;
        /** @type {null} */
        this.lastBonusOrder = null;
        /** @type {number} */
        this.succeedTime = 0;
        /** @type {number} */
        this.doubleHit = 0;
        this.camera.position.set(-17, 30, 26);
        this.shadowLight.position.set(0, 15, 10);
        if (prototype) {
          if (prototype.bottleShowupAnimation) {
            this.bottle.showup();
            this.audioManager.restart.seek(0);
            this.audioManager.restart.play();
          }
        }
        /** @type {number} */
        this.showRelaxScore = 0;
        /** @type {number} */
        this.relaxLeft = 0;
        /** @type {Array} */
        this.eggBlocksCount = [];
        /** @type {Array} */
        this.eggBlocksTriggerCount = [];
        /** @type {Array} */
        this.eggBlocksFailCount = [];
        /** @type {Array} */
        this.eggBlocksSucceedCount = [];
        if (wx.triggerGC) {
          wx.triggerGC();
        }
      }
    }, {
      key : "generateSeed",
      /**
       * @return {?}
       */
      value() {
        const selector = opts.default.getMyUserInfo();
        if (selector && selector.open_id) {
          /** @type {number} */
          const r20 = Date.now();
          return this.time_seed = r20, (0, visible_keys.encryptSeed)(r20, selector.open_id);
        }
        return object.default.sendServerError(7), null === selector && object.default.sendServerError(8), this.time_seed = void 0, Date.now();
      }
    }, {
      key : "stopLoopMusic",
      /**
       * @return {undefined}
       */
      value() {
        if (this.audioManager.scale_intro) {
          this.audioManager.scale_intro.stop();
        }
        if (this.audioManager.scale_loop) {
          this.audioManager.scale_loop.stop();
        }
        this.stopBlockMusic();
      }
    }, {
      key : "generateHardDistances",
      /**
       * @return {?}
       */
      value() {
        /** @type {number} */
        const length = 2 + Math.floor(2 * (0, props.random)());
        /** @type {Array} */
        const eventPath = [];
        /** @type {number} */
        let i = 0;
        for (;i < length;++i) {
          if (i < length - 1) {
            eventPath.push(sprite.BLOCK.minDistance + 2 * (0, props.random)());
          } else {
            eventPath.push(sprite.BLOCK.maxDistance - 2 * (0, props.random)());
          }
        }
        return eventPath;
      }
    }, {
      key : "touchStartAnim",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.stopBlockMusic();
        this.bottle.prepare();
        this.currentBlock.shrink();
        if (!(newValue && newValue.fromGuider)) {
          this.audioManager.scale_intro.seek(0);
          this.audioManager.scale_intro.play();
          /** @type {number} */
          this.mouseDownTime = Date.now();
          /** @type {Array} */
          this.onceTouchMoveList = [];
        }
      }
    }, {
      key : "touchEndAnim",
      /**
       * @param {number} thisValue
       * @param {?} newValue
       * @param {boolean} value
       * @param {boolean} firstTime
       * @param {boolean} error
       * @return {?}
       */
      value(thisValue, newValue, value, firstTime, error) {
        if ("relay" == this.mode) {
          properties.TweenAnimation.kill("progress");
        }
        if (void 0 !== firstTime) {
          /** @type {boolean} */
          this.musicScore = firstTime;
        }
        this.duration = thisValue || (Date.now() - this.mouseDownTime) / 1E3;
        /** @type {number} */
        this.bottle.velocity.vz = Math.min(this.duration * sprite.BOTTLE.velocityZIncrement, 150);
        /** @type {number} */
        this.bottle.velocity.vz = +this.bottle.velocity.vz.toFixed(2);
        /** @type {number} */
        this.bottle.velocity.vy = Math.min(sprite.BOTTLE.velocityY + this.duration * sprite.BOTTLE.velocityYIncrement, 180);
        /** @type {number} */
        this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2);
        this.direction = new THREE.Vector2(this.nextBlock.obj.position.x - this.bottle.obj.position.x, this.nextBlock.obj.position.z - this.bottle.obj.position.z);
        /** @type {number} */
        this.direction.x = +this.direction.x.toFixed(2);
        /** @type {number} */
        this.direction.y = +this.direction.y.toFixed(2);
        const exports = new THREE.Vector3(this.direction.x, 0, this.direction.y);
        if (this.hit = this.checkHit2(this.bottle, this.currentBlock, this.nextBlock, newValue), this.distance = sprite.BLOCK.minDistance + (0, props.random)() * (sprite.BLOCK.maxDistance - sprite.BLOCK.minDistance), this.distance = +this.distance.toFixed(2), this.straight = (0, props.random)() > 0.5 ? 1 : 0, 1 === this.hit || 7 === this.hit) {
          const u = this.generateNextBlock();
          if (u) {
            if (u.order >= 13) {
              this.eggBlocksCount[u.order] = this.eggBlocksCount[u.order] ? this.eggBlocksCount[u.order] + 1 : 1;
            }
          }
          this.thirdBlock = u;
          this.quick = void 0 === value ? Date.now() - this.lastSucceedTime < 800 || false : value;
          if ("relay" == this.mode) {
            /** @type {boolean} */
            this.quick = false;
          }
        }
        return error && error.noAnimation || (this.audioManager.scale_intro.stop(), this.audioManager.scale_loop.stop(), this.currentBlock.rebound(), this.bottle.jump(exports.normalize()), this.hideCombo()), this.hit;
      }
    }, {
      key : "bindEvent",
      /**
       * @return {undefined}
       */
      value() {
        const object = this;
        const self = this;
        node.default.on(sprite.EVENT.GOTOSINGLESTARTPAGE, (dataAndEvents, deepDataAndEvents) => {
          console.log("GOTOSINGLESTARTPAGE loopAnimate");
          object.loopAnimate();
        });
        node.default.on(sprite.EVENT.TRIGGER_EGG, (dataAndEvents, a) => {
          const order = a.order;
          object.eggBlocksTriggerCount[order] = object.eggBlocksTriggerCount[order] ? object.eggBlocksTriggerCount[order] + 1 : 1;
        });
        self.instructionCtrl.bindCmdHandler(options => {
          if (-1 == options.type) {
            return self.gameCtrl.showPlayerGG(options.s), void self.instructionCtrl.onCmdComplete();
          }
          if (0 == options.type) {
            return self.socketFirstSync = true, self.bottle.reset(), self.UI.scoreText.changeStyle({
              textAlign : "center"
            }), self.UI.setScore(0), void self.instructionCtrl.onCmdComplete();
          }
          if (self.gameCtrl.showPlayerWaiting(), options.score != self.UI.score && (self.UI.score = options.score, self.UI.setScore(options.score)), options && (options.b && options.b.vy)) {
            if (self.socketFirstSync && (self.socketFirstSync = false, self.camera.position.set(options.ca.x, options.ca.y, options.ca.z), self.ground.obj.position.set(options.gd.x, options.gd.y, options.gd.z)), self.currentBlock.order != options.c.order || self.nextBlock.order != options.n.order) {
              /** @type {number} */
              let ti = 0;
              const nTokens = self.blocksInUse.length;
              for (;ti < nTokens;++ti) {
                const layer = self.blocksInUse.pop();
                self.scene.remove(layer.obj);
                self.blocksPool.push(layer);
              }
              const idx = self.blocksPool.findIndex(a => a.order == options.c.order);
              self.currentBlock = self.blocksPool[idx];
              code = self.blocksPool.splice(idx, 1);
              self.blocksInUse.push(code[0]);
              const i = self.blocksPool.findIndex(a => a.order == options.n.order);
              self.nextBlock = self.blocksPool[i];
              code = self.blocksPool.splice(i, 1);
              self.blocksInUse.push(code[0]);
            }
            self.scene.add(self.currentBlock.obj);
            self.scene.add(self.nextBlock.obj);
            /** @type {boolean} */
            self.currentBlock.obj.visible = true;
            /** @type {boolean} */
            self.nextBlock.obj.visible = true;
            self.currentBlock.obj.position.x = options.c.x;
            self.currentBlock.obj.position.z = options.c.z;
            self.currentBlock.change(options.c.r, options.c.type, options.c.rs);
            self.nextBlock.obj.position.x = options.n.x;
            self.nextBlock.obj.position.z = options.n.z;
            self.nextBlock.change(options.n.r, options.n.type, options.n.rs);
            self.bottle.obj.position.set(options.b.x, sprite.BLOCK.height / 2, options.b.z);
            self.bottle.velocity.vz = options.b.vz;
            self.bottle.velocity.vy = options.b.vy;
            self.distance = options.di;
            self.straight = options.s;
            const exports = new THREE.Vector3(self.nextBlock.obj.position.x - self.bottle.obj.position.x, 0, self.nextBlock.obj.position.z - self.bottle.obj.position.z);
            if (self.direction = new THREE.Vector2(self.nextBlock.obj.position.x - self.bottle.obj.position.x, self.nextBlock.obj.position.z - self.bottle.obj.position.z), self.checkHit2(self.bottle, self.currentBlock, self.nextBlock, options.b.y), self.quick = options.q, options.t) {
              const index = self.blocksPool.findIndex(a => a.order == options.t.order);
              if (index > -1) {
                self.thirdBlock = self.blocksPool[index];
                var code = self.blocksPool.splice(index, 1);
                self.blocksInUse.push(self.thirdBlock);
              } else {
                self.thirdBlock = self.blocksInUse.find(a => a.order == options.t.order);
                if (self.thirdBlock) {
                  if (self.thirdBlock.obj) {
                    self.scene.remove(self.thirdBlock.obj);
                  }
                }
              }
              self.thirdBlock.change(options.t.r, options.t.type, options.t.rs);
            }
            self.hit = options.h;
            if (self.tailSystem) {
              self.tailSystem.correctPosition();
            }
            self.audioManager.scale_intro.seek(0);
            self.audioManager.scale_intro.play();
            self.bottle.prepare();
            self.currentBlock.shrink();
            let pos = {
              x : options.ca.x,
              y : options.ca.y,
              z : options.ca.z
            };
            let min = {
              x : options.gd.x,
              y : options.gd.y,
              z : options.gd.z
            };
            self.stopBlockMusic();
            /** @type {number} */
            self.instructionCtrl.icTimeout = setTimeout(() => {
              self.audioManager.scale_intro.stop();
              self.audioManager.scale_loop.stop();
              if (15 == self.currentBlock.order) {
                self.currentBlock.hideGlow();
              }
              self.currentBlock.rebound();
              self.camera.position.set(pos.x, pos.y, pos.z);
              self.ground.obj.position.set(min.x, min.y, min.z);
              /** @type {null} */
              pos = null;
              /** @type {null} */
              min = null;
              self.bottle.jump(exports.normalize());
            }, 1E3 * options.d);
            /** @type {null} */
            options = null;
          } else {
            self.instructionCtrl.onCmdComplete();
          }
        });
        self.gameSocket.onReciveCommand((deepDataAndEvents, opt_obj2) => {
          if ("observe" == self.mode) {
            self.instructionCtrl.onReceiveCommand(opt_obj2, deepDataAndEvents);
          }
        });
        self.gameSocket.onPeopleCome(deepDataAndEvents => {
          self.gameCtrl.onPeopleCome(deepDataAndEvents);
        });
        self.gameSocket.onPlayerOut(() => {
          self.gameCtrl.onPlayerOut();
        });
        self.gameSocket.onJoinSuccess(deepDataAndEvents => {
          self.gameCtrl.socketJoinSuccess(deepDataAndEvents);
          if ("observe" == self.mode) {
            self.bottle.obj.position.set(8, -sprite.BLOCK.height / 2, 0);
            self.camera.position.set(-17, 30, 26);
            self.shadowLight.position.set(0, 15, 10);
            if (self.currentBlock) {
              /** @type {boolean} */
              self.currentBlock.obj.visible = false;
            }
            if (self.nextBlock) {
              /** @type {boolean} */
              self.nextBlock.obj.visible = false;
            }
          }
        });
        self.gameSocket.onRelayCmdCome(self.relayInstructionCtrl.cmdCome.bind(self.relayInstructionCtrl));
        canvas.addEventListener("touchstart", e => {
          if (e.touches.length >= 2) {
            /** @type {boolean} */
            self.touchObserve = true;
          } else {
            if ("relay" == self.mode && ("game" == self.stage && self.full2D.doTouchStartEvent(e)), "relay" != self.mode || ("game" != self.stage || !self.clicked && self.myTurn)) {
              if (self.gameCtrl.reviewCtrl.isInThisPage) {
                self.full2D.doTouchStartEvent(e);
              } else {
                if (("single" == self.mode || "player" == self.mode) && ("game" == self.stage && (!self.is_from_wn && (!self.guider && (e.changedTouches[0].clientX < 0.13 * w && e.changedTouches[0].clientY > 0.88 * h))))) {
                  return "prepare" == self.bottle.status && (self.touchObserve = true), void self.gameCtrl.shareObservCard();
                }
                if ("friendRankList" != self.stage && ("battlePage" != self.stage && ("groupRankList" != self.stage && ("singleSettlementPgae" != self.stage && "startPage" != self.stage)))) {
                  if ("viewerWaiting" != self.stage && ("viewerGG" != self.stage && "viewerOut" != self.stage)) {
                    if ("relayRoom" != self.stage) {
                      if ("game" == self.stage) {
                        if ("observe" === self.mode) {
                          return;
                        }
                        if (!("prepare" !== self.bottle.status || (self.pendingReset || self.guider && self.animating)) && 1 == e.targetTouches.length) {
                          return self.touchObserve ? void(self.touchObserve = false) : void self.handleInterrupt();
                        }
                        if (!("stop" !== self.bottle.status)) {
                          if (!self.pendingReset) {
                            if (!(self.guider && self.animating)) {
                              self.touchStartAnim();
                            }
                          }
                        }
                      }
                    } else {
                      self.full2D.doTouchStartEvent(e);
                    }
                  } else {
                    self.full2D.doTouchStartEvent(e);
                  }
                } else {
                  self.full2D.doTouchStartEvent(e);
                }
              }
            }
          }
        });
        canvas.addEventListener("touchcancel", dataAndEvents => {
          self.handleInterrupt();
        });
        canvas.addEventListener("touchend", touch => {
          touch.changedTouches[0].clientX;
          touch.changedTouches[0].clientY;
          if ("relay" == self.mode && ("game" == self.stage && self.full2D.doTouchEndEvent(touch)), "relay" != self.mode || ("game" != self.stage || !self.clicked && self.myTurn)) {
            if (self.gameCtrl.reviewCtrl.isInThisPage) {
              self.full2D.doTouchEndEvent(touch);
            } else {
              if ("singleSettlementPgae" != self.stage && "startPage" != self.stage) {
                if ("viewerWaiting" != self.stage && ("viewerGG" != self.stage && "viewerOut" != self.stage)) {
                  if ("friendRankList" != self.stage) {
                    if ("battlePage" != self.stage) {
                      if ("groupRankList" != self.stage) {
                        return "relayRoom" == self.stage ? (console.log(self.stage), void self.full2D.doTouchEndEvent(touch)) : void("game" == self.stage && ("prepare" !== self.bottle.status || (self.pendingReset || (self.guider && self.animating || (self.touchEndAnim(), "player" === self.mode && (++self.seq, self.gameSocket.sendCommand(self.seq, {
                          type : 1,
                          c : {
                            x : self.currentBlock.obj.position.x,
                            z : self.currentBlock.obj.position.z,
                            order : self.currentBlock.order,
                            type : self.currentBlock.type,
                            r : self.currentBlock.radius,
                            rs : self.currentBlock.radiusScale
                          },
                          n : {
                            x : self.nextBlock.obj.position.x,
                            z : self.nextBlock.obj.position.z,
                            order : self.nextBlock.order,
                            type : self.nextBlock.type,
                            r : self.nextBlock.radius,
                            rs : self.nextBlock.radiusScale
                          },
                          d : self.duration,
                          b : {
                            x : self.bottle.obj.position.x,
                            y : +self.bottle.obj.position.y.toFixed(2),
                            z : self.bottle.obj.position.z,
                            vy : self.bottle.velocity.vy,
                            vz : self.bottle.velocity.vz
                          },
                          t : 1 === self.hit || 7 === self.hit ? {
                            order : self.thirdBlock.order,
                            type : self.thirdBlock.type,
                            r : self.thirdBlock.radius,
                            rs : self.thirdBlock.radiusScale
                          } : null,
                          h : self.hit,
                          di : self.distance,
                          s : self.straight,
                          q : self.quick,
                          ca : {
                            x : self.camera.position.x,
                            y : self.camera.position.y,
                            z : self.camera.position.z
                          },
                          gd : {
                            x : self.ground.obj.position.x,
                            y : self.ground.obj.position.y,
                            z : self.ground.obj.position.z
                          },
                          score : self.UI.score
                        })), "observe" != self.mode && ("review" != self.mode && (self.actionList.push([self.duration, +self.bottle.obj.position.y.toFixed(2), self.quick]), self.musicList.push(self.musicScore), "relay" == self.mode && (!self.isObserver && (self.onebyoneCtrl.data && (self.clicked = true, node.default.emitSync(sprite.EVENT.NOWPLAYERJUMP, {
                          jump_succ : 1 == self.hit || (7 == self.hit || 2 == self.hit) ? 1 : 0,
                          msginfo : JSON.stringify({
                            duration : self.duration,
                            initY : +self.bottle.obj.position.y.toFixed(2)
                          }),
                          msg_seq : self.onebyoneCtrl.data.msg_seq
                        })))), self.touchStartTime.push(self.mouseDownTime), touch.changedTouches && (touch.changedTouches[0] && (self.touchMoveList.push(self.onceTouchMoveList), self.touchList.push([touch.changedTouches[0].clientX, touch.changedTouches[0].clientY]))))))))));
                      }
                      self.full2D.doTouchEndEvent(touch);
                    } else {
                      self.full2D.doTouchEndEvent(touch);
                    }
                  } else {
                    self.full2D.doTouchEndEvent(touch);
                  }
                } else {
                  self.full2D.doTouchEndEvent(touch);
                }
              } else {
                self.full2D.doTouchEndEvent(touch);
              }
            }
          }
        });
        canvas.addEventListener("touchmove", touch => {
          if ("relay" == self.mode && ("game" == self.stage && self.full2D.doTouchMoveEvent(touch)), "prepare" == self.bottle.status) {
            if (self.onceTouchMoveList.length >= 10) {
              return;
            }
            self.onceTouchMoveList.push(touch.changedTouches[0].clientX, touch.changedTouches[0].clientY);
          }
          if ("battlePage" != self.stage && ("friendRankList" != self.stage && "groupRankList" != self.stage)) {
            if (!("relayRoom" != self.stage)) {
              self.full2D.doTouchMoveEvent(touch);
            }
          } else {
            self.full2D.doTouchMoveEvent(touch);
          }
        });
      }
    }, {
      key : "report",
      /**
       * @param {string} error
       * @return {undefined}
       */
      value(error) {
        if (Math.random() <= 1) {
          console.log(`\u65e5\u5fd7\u4e0a\u62a5\uff1a${error}`);
          object.default.logReport(`|SM|:${error}`);
        }
      }
    }, {
      key : "stopBlockMusic",
      /**
       * @return {undefined}
       */
      value() {
        if (this.currentBlock.whenLeave) {
          this.currentBlock.whenLeave();
        }
        if (this.currentBlock.musicName) {
          this.audioManager[this.currentBlock.musicName].stop();
        }
        if (this.currentBlock.registerEndAudio) {
          this.currentBlock.registerEndAudio();
        }
        this.audioManager.clearTimer();
        this.audioManager.setTimerFlag(false);
        if (this.musicTimer) {
          clearTimeout(this.musicTimer);
          /** @type {null} */
          this.musicTimer = null;
        }
      }
    }, {
      key : "handleNetworkFucked",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const h = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "\u7f51\u7edc\u5f02\u5e38,\u70b9\u51fb\u786e\u5b9a\u8fdb\u5165\u6e38\u620f";
        this.rollBackToSingle();
        if (thisValue) {
          wx.showModal({
            title : "\u63d0\u793a",
            content : h,
            showCancel : false
          });
        }
      }
    }, {
      key : "handleSocketFucked",
      /**
       * @return {undefined}
       */
      value() {
        this.gameSocket.close();
        if ("player" == this.mode) {
          this.shareObservCardFail();
          this.updateUI();
        }
        if ("observe" == this.mode) {
          this.handleNetworkFucked(true);
        }
      }
    }, {
      key : "handleInterrupt",
      /**
       * @return {undefined}
       */
      value() {
        if ("prepare" == this.bottle.status) {
          /** @type {number} */
          this.bottle.velocity.vz = 0;
          /** @type {number} */
          this.bottle.velocity.vy = 150;
          this.bottle.jump((new THREE.Vector3(1, 0, 0)).normalize());
          this.currentBlock.rebound();
          this.audioManager.scale_loop.stop();
          this.direction = new THREE.Vector2(1, 0);
          this.hit = this.checkHit2(this.bottle, this.currentBlock, this.nextBlock);
        }
      }
    }, {
      key : "relayBottleReset",
      /**
       * @param {boolean} error
       * @return {undefined}
       */
      value(error) {
        this.bottle.reset(true);
        this.bottle.obj.position.x = this.currentBlock.obj.position.x;
        this.bottle.obj.position.z = this.currentBlock.obj.position.z;
        if (!(error && error.noAnimation)) {
          this.bottle.showup();
          this.audioManager.restart.seek(0);
          this.audioManager.restart.play();
        }
      }
    }, {
      key : "handleWxOnError",
      /**
       * @param {?} error
       * @return {undefined}
       */
      value(error) {
        /** @type {number} */
        const e = (void 0 == self.default.serverConfig.bad_js_ratio ? 1E6 : self.default.serverConfig.bad_js_ratio) / 1E6 || 1;
        if (Math.random() <= e) {
          object.default.badReport(error.message, error.stack);
        }
      }
    }, {
      key : "sendServerError",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        object.default.sendServerError(newValue);
      }
    }]), start;
  })();
  if (wx.getLaunchOptionsSync) {
    result = new subject(wx.getLaunchOptionsSync());
  } else {
    var result = new subject
  }
  /** @type {number} */
  var n = Date.now();
  /** @type {function (function (number): ?, (Element|null)=): number} */
  const synchronize = requestAnimationFrame;
  /** @type {Array} */
  const buffer = [];
  let root = void 0;
  /**
   * @param {function (number): ?} element
   * @param {(Element|null)=} callback
   * @return {number}
   */
  window.requestAnimationFrame = (element, callback) => {
    if (callback) {
      root = element;
    } else {
      buffer.push(element);
    }
  };
  (function run() {
    /** @type {Array} */
    const arr = [];
    const fn = root;
    buffer.forEach(chunk => {
      arr.push(chunk);
    });
    root = void 0;
    /** @type {number} */
    buffer.length = 0;
    arr.forEach(fn => {
      if ("function" == typeof fn) {
        fn();
      }
    });
    if ("function" == typeof fn) {
      fn();
    }
    synchronize(run);
  })();
  main();
});
