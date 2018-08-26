/**
 * 事件处理句柄
 * Created by lip on 2016/6/27.
 */
var $ = require('jquery');
var Hammer = require('Hammerjs');
var React = require('React');
var ReactDom = require('react-dom');

var AudioBank = require('./AudioBank');
var PayController = require('./PayController');
var Util = require('./Util');
var Group = require('./Group');
var RankingList = require('./RankingList');

var ShareGuider = require('./component/ShareGuider');
var Config = require('./Config');
var Tabbar = require('./component/Tabbar');



class EventHandler {
    /**
     * 初始化所有的全局动作
     */
    static initHandlers() {

        /* 按键提问按钮 */
        var askButtonHammer = new Hammer($('#askButton')[0]);
        askButtonHammer.on('tap', (e) => {
            //阻止事件冒泡
            e.srcEvent.stopPropagation();
            e.preventDefault();

            $('#page1').hide();
            $('#page2').show();
            //$('#backButton').show();
            //$('#shareButton').show();
            //输入框
            var Inputer = require('./component/Inputer');
            Config.inputer && Inputer.show();

            //迷你课汇总
            var Summary = require('./component/Summary');
            Config.summary && Summary.create();

            //标记已经访问
            localStorage.setItem('minic' + Util.getMinicId()+'-visited', true);

            Util.postCnzzData('点击提问');
        });


        /* 初始化支付功能 */
        if( !User.isNowFree() && !Config.free ){
            //限时免费  或 完全免费时不初始化
            PayController.init();
        }


        /* QQ浏览器中显示分享到微信的引导 */
        if( Util.isMQQBrowser() ) {
            let $qqShareGuide = $('#qqShareGuide');

            $qqShareGuide.addClass('qq-share-guide');

            let hammer = new Hammer($qqShareGuide[0]);
            hammer.on('tap', ()=> {
                $qqShareGuide.hide();

                $('body').removeClass('disable-scroll');
            });
        }
        

    }
}

module.exports = EventHandler;