/**
 * 底部的tababr
 * Created by lip on 2016/7/15.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');
var Dimensions = require('../Dimensions');
var Util = require('../Util');
var User = require('../User');

var TabbarComp = React.createClass({
    componentDidMount() {
        let $body = $('body'),
            containerHeight = 0,
            lastTopPosition = 0,
            windowHeight = Dimensions.getWindowHeight();

        $(window).on('scroll', (e)=>{
            if( containerHeight === 0 ) {
                containerHeight = $body[0].scrollHeight;
            }

            let currentTopPosition = $body.scrollTop();

            //滚动到底部了
            //if( (containerHeight - currentTopPosition) <= (windowHeight + 4) ){
            //    this.show();
            //}

            if( lastTopPosition - currentTopPosition > 4 ){
                //往上滚动了
                this.show();
            }else if( currentTopPosition - lastTopPosition > 4 ){
                this.hide();
            }

            lastTopPosition = $body.scrollTop()
        });
    },

    show() {
        this.setState({
            display: true
        });
    },
    hide() {
        this.setState({
            display: false
        });
        $(this.refs.self).hide();
    },
    getInitialState() {
        return {
            display: false
        };
    },

    moreHandler() {
        let url = 'http://mp.weixin.qq.com/s?__biz=MzI5MjA2MDkyOA==&mid=502662150&idx=1&sn=afd8c49953e077ae0beed3ee73b88549#rd';

        Util.postCnzzData('看更多');

        location.href = url;
    },
    /**
     * 跳去投票和意见反馈页面
     */
    questionHandler() {
        let url = 'http://mp.weixin.qq.com/s?__biz=MzI5MjA2MDkyOA==&mid=502662185&idx=1&sn=8d25852be4dd51c88bc2c57ae8b20d3d#rd';

        Util.postCnzzData('我要提问');

        location.href = url;
    },

    /**
     * 跳往M站
     */
    jumpMapp() {
        let userInfo = User.getUserInfo(),
            url = 'http://h5.ichangtou.com/mapp/index.html?channel=minic';

        Util.postCnzzData('去长投');

        if( userInfo.userId ) {
            url = url + '&userId='+ userInfo.userId + '&sessionId=' + userInfo.sessionId;
        }

        location.href = url;
    },

    render() {
        let style = {};

        if( !this.state.display ){
            style.display = 'none';
        }
        /**
         *             <div className="icon" onTouchEnd={this.questionHandler}>我要提问</div>
         */
        return <div className={"tabbar"} style={style} ref="self">
            <div className="icon" onTouchEnd={this.moreHandler}>看更多迷你课</div>
            <div className="icon" onTouchEnd={this.jumpMapp}>去长投</div>
        </div>;
    }
});

var tabbarInstance = null;

class Tabbar{
    static show() {
        if( !tabbarInstance ){
            tabbarInstance = ReactDom.render(<TabbarComp />, $('#tabbar')[0]);
        }else {
            tabbarInstance.show();
        }
    }

    static hide() {
        tabbarInstance && tabbarInstance.hide();
    }
}
window.tabbar = Tabbar;

module.exports = Tabbar;