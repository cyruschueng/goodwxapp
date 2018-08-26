var AudioBgMap = {
    hall : 'bg_hall',
    table : 'bg_table_1',
}

var AudioCardAniMap = {
    '0' : 'ani_card_type_1',
    '1' : 'ani_card_type_2',
    '2' : 'ani_card_type_3',
    '3' : 'ani_card_type_4',
}

var transKey = function(key) {
    if (CC_JSB) {
        return cc.url.raw('resources/sound/' + key + '.mp3');
    } else {
        return fr.config.cdnUrl + `res/raw-assets/resources/sound/${key}.mp3`;
    }
}

var audio = cc._Class.extend({
    ctor : function() {
        this.mVolumn = 0.5;
        this.mMusic = -1;

        this.mAudioMap = {};
    },

    play : function(key, loop) {
        if (CC_JSB) {
            var context = cc.audioEngine.play(transKey(key), loop, this.mVolumn);

            this.mAudioMap[key] = context;
            return key;
        } else {
            var context = wx.createInnerAudioContext();
            context.src = transKey(key);
            context.autoplay = true;
            context.loop = loop;
            context.obeyMuteSwitch = true;
            context.volume = this.mVolumn;
            context.play();
            context.onEnded(function() {
            }.bind(this));

            this.mAudioMap[key] = context;
            return key;
        }
    },

    pause : function() {
        if (CC_JSB) {
            cc.audioEngine.pauseAll();
        } else {
            for (var key in this.mAudioMap) {
                if (key === this.mMusicKey) {
                    cc.warn('audio | pause | ' + key);
                    this.mAudioMap[key].pause();
                } else {
                    cc.warn('audio | stop | ' + key);
                    this.mAudioMap[key].stop();
                }
            }
        }
    },

    resume : function() {
        if (CC_JSB) {
            cc.audioEngine.resumeAll();
        } else {
            var context = this.mAudioMap[this.mMusicKey];
            if (context) {
                context.play();
            }
        }
    },

    stopBg : function() {
        var context = this.mAudioMap[this.mMusicKey];
        if (context) {
            if (CC_JSB) {
                cc.audioEngine.stop(context);
            } else {
                context.stop();
            }
        }
    },

    playBg : function(key, noLoop) {
        key = AudioBgMap[key];
        if (this.mMusicKey == key) {
            return;
        }

        this.stopBg();
        this.mMusicKey = this.play(key, !noLoop);
    },

    playCardAni : function(key, loop) {
        this.play(AudioCardAniMap[key], loop);
    },

    playBtn : function(isBack) {
        if (isBack) {
            this.play('btn_click_back');
        } else {
            this.play('btn_click_normal');
        }
    },

    playWithSex : function(key, female) {
        if (female) {
            this.play(key + '_female');
        } else {
            this.play(key + '_man');
        }
    },

    playCardType : function(cards, female) {
        var result = fr.picker.judge(cards);
        if (result.type == 4) {
            if (result.bonus == 0) {
                this.playWithSex('card_bomb', female);
            } else {
                // TODO
                // console.log('4带' + result.bonus);
            }
        } else if (result.type == 3) {
            if (result.repeat > 1) {
                if (result.bonus == 0) {
                    this.playWithSex('card_airplane', female);
                } else {
                    this.playWithSex('card_airplane_wing', female);
                }
            } else {
                if (result.bonus == 0) {
                    this.playWithSex('card_type_3_0', female);
                } else {
                    // TODO
                    this.playWithSex('card_type_3_' + result.bonus, female);
                }
            }
        } else if (result.type == 2) {
            if (result.repeat > 1) {
                this.playWithSex('card_type_2', female);
            } else {
                this.playWithSex('card_type_2_' + cards[0].digit, female);
            }
        } else if (result.type == 1) {
            if (result.length > 1) {
                this.playWithSex('card_type_1_0', female);
            } else {
                this.playWithSex('card_type_1_' + cards[0].digit, female);
            }
        }
    },
});

module.exports = audio;