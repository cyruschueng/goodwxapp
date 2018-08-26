/**
 * Created by Robot on 2016/6/25.
 */
var $ = require('jquery');
var eventPreventFlag = true;//事件阻止flag
var PayController = require('./PayController');

class Reward {
    static init() {
        let $dom = $('#reward');

        if( Reward.initialized ) {
            return;
        }

        Reward.$dom = $dom;

        $dom.find('.backButton').on('click', ()=> {
            if( eventPreventFlag ) {
                return;
            }


            Reward.hide();
            // Util.postCnzzData('打赏返回');
        });

        //默认价格
        let $defaultAmount = $dom.find('.default-amount');
        $defaultAmount.on('click', ()=>{
            if( eventPreventFlag ) {
                return;
            }

            Reward.addSelectedCls($defaultAmount);

            window.PayController.getOrder(window.User.getUserInfo(), 1);
        });

        //打赏第一级
        let $amount1 = $dom.find('.amount1');
        $amount1.on('click', ()=>{
            if( eventPreventFlag ) {
                return;
            }

            Reward.addSelectedCls($amount1);

            window.PayController.getOrder(window.User.getUserInfo(), 2);
        });

        //打赏第二级
        let $amount2 = $dom.find('.amount2');
        $amount2.on('click', ()=>{
            if( eventPreventFlag ) {
                return;
            }

            Reward.addSelectedCls($amount2);

            window.PayController.getOrder(window.User.getUserInfo(), 5);
        });

        //打赏第三级
        let $amount3 = $dom.find('.amount3');
        $amount3.on('click', ()=>{
            if( eventPreventFlag ) {
                return;
            }

            Reward.addSelectedCls($amount3);

            window.PayController.getOrder(window.User.getUserInfo(), 20);
        });

        Reward.initialized = true;

    }

    /**
     * 是否初始化完成
     * @returns {boolean}
     */
    static isInitialized() {
        return Reward.initialized;
    }

    static show() {
        PayController.scrollToPayCenter();
        Reward.$dom.show();
        Reward.showing = true;

        //禁止滚动
        $('body').addClass('disable-scroll');

        //取消事件阻止
        setTimeout(()=>{
            eventPreventFlag = false;
        }, 500);
    }

    static hide() {
        Reward.$dom.hide();
        Reward.showing = false;

        //启用滚动
        $('body').removeClass('disable-scroll');

        //开启事件阻止
        eventPreventFlag = true;
    }

    /**
     * 是否正在现实中
     * @returns {*}
     */
    static isShowing() {
        return Reward.showing;
    }

    /**
     * 添加被选择的样式
     */
    static addSelectedCls($dom) {
        Reward.removeSelectedCls();
        $dom.addClass('selected');

        setTimeout(()=>{
            Reward.removeSelectedCls();
        }, 1500);
    }

    /**
     * 移除被选择的样式
     */
    static removeSelectedCls() {
        let $s = $('#reward').find('.selected');
        $s.removeClass('selected');
    }
}
module.exports = Reward;