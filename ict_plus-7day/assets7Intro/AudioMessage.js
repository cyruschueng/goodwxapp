/**
 * 语音消息控制器
 * Created by lip on 2016/6/6.
 */
var Hammer = require('hammerjs');
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var AudioBank = require('./AudioBank');
var User = require('./User');
var Util = require('./Util');
var Group = require('./Group');
var PayController = require('./PayController');
var GHGuider = require('./component/GHGuider');
//var Modal = require('./component/Modal');

class AudioMessage {
    constructor( dom, index ) {
        //外层DOM
        this.$dom = $(dom);
        //音频媒体
        this.mediaSource = Util.getDomain() + AudioBank.getAudio(index);
        //顺序
        this.index = index;

        var wrapperHammer = new Hammer(dom);
        var me = this;
        //添加点击 播放or暂停动作
        wrapperHammer.on('tap', ()=>{
            me.tapHandler();
        });

        //播放器
        var player = this.player = document.createElement('audio');
        player.preload = true;
        player.addEventListener('ended', function() {
            me.$dom.removeClass('playing');
        });
        player.src = this.mediaSource;

        //加入音频仓库
        AudioBank.addMessage(this);
    }

    /**
     * 点击 处理句柄
     */
    tapHandler() {
        if( this.index >= Util.getChargeIndex() ) {
            //没买课时不允许听其他部分

            if( !User.isVipUser() ){
                //没开通VIP权限

                //滚动到按钮中心
                PayController.scrollToPayCenter();

                $('#payButton').addClass('animate-shake');
                setTimeout(()=>{
                    $('#payButton').removeClass('animate-shake');
                }, 2000);

                AudioBank.pauseOthers(this);

                return;
            }

            let userInfo = User.getUserInfo();
            if( Util.isWeixin() && !userInfo.subscribe ){
                //如果在微信端，切没有关注公号的话，则弹框提醒关注公号
                GHGuider.showModalGuider();

                AudioBank.pauseOthers(this);
                return;
            }

        }

        //点击播放/暂停 切换
        if( this.isPlaying() ){
            this.pause();
        }else {
            this.play();
        }

        //第1条语音，加入统计
        if( this.index === 0 && !this.czced ) {
            this.czced = true;//只统计一次
            // Util.postCnzzData('试听第一节');
        }
    }

    /**
     * 是否处于播放中 状态
     * @returns {*}
     */
    isPlaying() {
        return this.$dom.hasClass('playing');
    }

    /**
     * 暂停
     */
    pause() {
        this.player.pause();
        this.$dom.removeClass('playing');
        this.player.setAttribute('src', this.mediaSource);
    }

    /**
     * 播放
     */
    play() {
        //先把其他音频停止
        AudioBank.pauseOthers(this);

        this.player.play();
        this.$dom.addClass('playing');
        this.$dom.find('.red-dot').hide();
    }


}

module.exports = AudioMessage;
