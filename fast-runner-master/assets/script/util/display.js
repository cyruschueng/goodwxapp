/*
    分离display
*/

var display = {
    /*
        「概要」格式化输出字符串、object、array数据
        「参数」indent 前缀
        「参数」level 遍历深度
    */
    dump : function(obj, indent, level) {
        level = (typeof level === 'undefined' && 4) || level;
        indent = indent || '';

        if (level == 0) {
            cc.log(indent + '// reach max depth');
            return;
        }

        this.mDumpDepth = this.mDumpDepth || 0;
        this.mDumpDepth += 1;

        if (Array.isArray(obj)) {
            if (this.mDumpDepth == 1) {
                cc.log(indent + '[');
                indent += '    ';
            }

            for (var key in obj) {
                var value = obj[key];
                if (Array.isArray(value)) {
                    cc.log(indent + "'" + key + "' : [");

                    this.dump(value, indent + '    ', level - 1);

                    cc.log(indent + '],');
                } else if (typeof(value) == 'object') {
                    cc.log(indent +  "{");

                    this.dump(value, indent + '    ', level - 1);

                    cc.log(indent + '},');
                } else if (typeof(value) == 'function') {
                    cc.log(indent + 'function(){}' + ",");
                } else if (typeof(value) == 'string') {
                    cc.log(indent + "'" + value + "',");
                } else if (typeof(value) == 'number') {
                    cc.log(indent + value + ",");
                } else if (typeof(value) == 'boolean') {
                    cc.log(indent + value + ",");
                }
            }

            if (this.mDumpDepth == 1) {
                indent = indent.substr(0, indent.length - 4);
                cc.log(indent + ']');
            }
        } else if (typeof(obj) == 'object') {
            if (this.mDumpDepth == 1) {
                cc.log(indent + '{');
                indent += '    ';
            }

            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }

                var value = obj[key];
                if (Array.isArray(value)) {
                    cc.log(indent + "'" + key + "' : [");

                    this.dump(value, indent + '    ', level - 1);

                    cc.log(indent + '],');
                } else if (typeof(value) == 'object') {
                    cc.log(indent + "'" + key + "' : {");

                    this.dump(value, indent + '    ', level - 1);

                    cc.log(indent + '},');
                } else if (typeof(value) == 'function') {
                    cc.log(indent + "'" + key + "' : " + 'function(){}' + ",");
                } else if (typeof(value) == 'string') {
                    cc.log(indent + "'" + key + "' : '" + value + "',");
                } else if (typeof(value) == 'number') {
                    cc.log(indent + "'" + key + "' : " + value + ",");
                } else if (typeof(value) == 'number') {
                    cc.log(indent + "'" + key + "' : " + value + ",");
                }
            }

            if (this.mDumpDepth == 1) {
                indent = indent.substr(0, indent.length - 4);
                cc.log(indent + '}');
            }
        } else if (typeof(obj) == 'function') {
            cc.log(indent + 'function(){}' + ",");
        } else if (typeof(obj) == 'string') {
            cc.log(indent + "'" + obj + "'");
        } else if (typeof(obj) == 'number') {
            cc.log(indent + obj);
        } else {
            cc.log(indent + obj);
        }

        this.mDumpDepth -= 1;
    },

    isTouchInside : function(node, event) {
        var pos = event.getLocation();
        var box = node.getBoundingBoxToWorld();
        return box.contains(pos);
    },

    replaceSpriteFrameRemote : function(sprite, localPath) {
        cc.loader.loadRes(localPath, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            sprite.spriteFrame = spriteFrame;
        });
    },

    on : function(node, eventName, cb) {
        var eventListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName : eventName,
            callback : function(event) {
                var data = event.getUserData();
                if (cb) {
                    cb(data);
                }
            },
        });
        cc.eventManager.addListener(eventListener, node);

        return eventListener;
    },

    loadRemote : function(sprite, url) {
        if (!url || url == '') {
            return;
        }

        cc.loader.load({url: url, type: 'jpg'}, function(err, tex) {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            sprite.spriteFrame = new cc.SpriteFrame(tex);
        });
    },

    pContains : function(a, b, c) {
        return (a <= c && c <= b) || (a >= c && c >= b);
    },

    clone : function(src, dst) {
        var defaultValue = (src instanceof Array) ? [] : {};
        var dst = dst || defaultValue;

        for (var i in src)
        {
            if (typeof src[i] === 'object')
            {
                dst[i] = (src[i].constructor === Array) ? [] : {};
                this.clone(src[i], dst[i]);
                } else
            {
                dst[i] = src[i];
            }
        }

        return dst;
    },

    schedule : function(obj, updateFunc, interval) {
        var scheduler = cc.director.getScheduler();
        scheduler.schedule(updateFunc, obj, interval, false);
    },

    unschedule : function(obj, updateFunc) {
        var scheduler = cc.director.getScheduler();
        scheduler.unschedule(updateFunc, obj);
    },

    unscheduleAll : function(obj) {
        var scheduler = cc.director.getScheduler();
        scheduler.unscheduleAllForTarget(obj);
    },

    scheduleOnce : function(callback, interval) {
        var self = this;
        var obj = cc._Class.extend({
            ctor : function() {
                self.schedule(this, this.update, interval);
            },

            update : function() {
                self.unschedule(this, this.update);
                callback();
            },
        });
        new obj();
    },

    emit : function(eventName, optionData) {
        cc.eventManager.dispatchCustomEvent(eventName, optionData);
    },

    object2url : function(data) {
        var arr = [];
        for (var key in data) {
            arr.push(key + '=' + data[key]);
        }
        return arr.join('&');
    },

    showTips : function() {
        var args = arguments;
        cc.loader.loadRes('prefab/BubbleTips', function(err, prefab) {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            var tips = cc.instantiate(prefab);
            var component = tips.getComponent('BubbleTips');
            component.show.apply(component, args);
        });
    },

    showMatchIntro : function() {
        fr.window.show('MatchIntro');
    },

    showMatchReward : function() {
        fr.window.show('MatchReward');
    },

    showCashExchange : function() {
        fr.window.show('CashExchange');
    },

    showMatchResult : function() {
        fr.window.show('MatchResult');
    },

    showDialog : function(params) {
        var prefab = cc.instantiate(fr.cache.prefabs['Dialog']);
        prefab.parent = cc.director.getScene();

        prefab.getComponent("Dialog").reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },

    showDialogQuit : function(params) {
        var scene = cc.director.getScene();
        if (scene.dialog_quit && cc.isValid(scene.dialog_quit)) {
            scene.dialog_quit.removeFromParent();
        }

        var prefab = cc.instantiate(fr.cache.prefabs['DialogQuit']);
        prefab.parent = scene;
        scene.dialog_quit = prefab;

        prefab.getComponent("DialogQuit").reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },

    showScoreChanged : function(params, pos) {
        var prefab = cc.instantiate(fr.cache.prefabs['AnimationScoreChanged']);
        prefab.parent = cc.director.getScene();

        prefab.getComponent("ScoreChanged").reload(params);

        if (!pos) {
            var size = cc.director.getWinSize();
            prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
        } else {
            prefab.setPosition(pos);
        }
    },

    decorateNumPrefix : function(num) {
        return num > 0 ? '+' + num : num;
    },

    // 0 : 单关; 1 : 双关; 2 : 反关
    showAnimationTableAchieve : function(params) {
        var prefab = cc.instantiate(fr.cache.prefabs['AnimationGuan2']);
        prefab.parent = cc.director.getScene();

        prefab.getComponent("AnimationGuan2").reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },

    // 0 : 单关; 1 : 反关; 2 : 淘汰
    showAnimationTablePunish : function(params) {
        var prefab = cc.instantiate(fr.cache.prefabs['AnimationGuan']);
        prefab.parent = cc.director.getScene();

        prefab.getComponent("AnimationGuan").reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },

    showAnimationBoom : function(params) {
        var prefab = cc.instantiate(fr.cache.prefabs['AnimationBoom']);
        prefab.parent = cc.director.getScene();

        prefab.getComponent("AnimationComplete").reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
        fr.audio.playCardAni(4);
    },

    showAnimationAirplane : function(params) {
        var prefab = cc.instantiate(fr.cache.prefabs['AnimationPlane']);
        prefab.parent = cc.director.getScene();

        prefab.getComponent("AnimationComplete").reload(params);
        fr.audio.playCardAni(3);
    },

    showAnimationSHUNZI : function(params) {
        var prefab = cc.instantiate(fr.cache.prefabs['AnimationShunzi']);
        prefab.parent = params.parent || cc.director.getScene();

        prefab.getComponent("AnimationShunzi").reload(params);

        prefab.setPosition(params.pos);
        fr.audio.playCardAni(1);
    },

    showAnimationLIANDUI : function(params) {
        var prefab = cc.instantiate(fr.cache.prefabs['AnimationLiandui']);
        prefab.parent = params.parent || cc.director.getScene();

        prefab.getComponent("AnimationComplete").reload(params);

        prefab.setPosition(params.pos);
        fr.audio.playCardAni(2);
    },

    // year.month.day %02
    timeFormat1 : function(timestamp) {
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var szMonth = month < 10 ? '0' + month : month;
        var szDay = day < 10 ? '0' + day : day;

        return year + '.' + szMonth + '.' + szDay;
    },

    formatCoupon : function(num) {
        var num0 = Math.floor(num);
        num = (num * 100).toFixed(0);

        var num2 = Math.floor(num % 10);
        var num1 = Math.floor(num % 100 / 10);

        return num0 + '.' + num1 + num2;
    },
};

module.exports = display;
