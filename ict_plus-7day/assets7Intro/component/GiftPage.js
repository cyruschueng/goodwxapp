/**
 * 赠送课程界面
 * Created by Robot on 2016/7/9.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var Util = require('../Util');
var PayController = require('../PayController');
var DoneToast = require('./DoneToast');
var Loading = require('../Loading');
var DialogAlert = require('./DialogAlert');
var User = require('../User');

var GiftPage = React.createClass({
    /**
     * 领取礼物
     */
    getGift() {
        let userInfo = window.User.getUserInfo(),
            apiUrl = Util.getAPIUrl('post_present'),
            me = this;

        let jsonData = JSON.stringify(
            {
                "parentId": Util.getUrlPara('ictgift'),
                "minicId": Util.getMinicId()
            }
        );

        //显示loading界面
        Loading.showLoading('获取好友赠送...');

        $.ajax({
            url: apiUrl,
            data: jsonData,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            headers: {
                Accept:"application/json"
            },

            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-Token",
                    Util.getApiToken());

                request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);

                request.setRequestHeader("X-iChangTou-Json-Api-Session", userInfo.sessionId);
            },

            success:function(data) {
                Loading.hideLoading();

                if( data ) {
                    DoneToast.show('领取成功');
                    //开通权限
                    User.setVipUser();

                    let parentNickName = Util.getUrlPara('ictnickname');
                    localStorage.setItem('minic'+Util.getMinicId()+'-giftParent', parentNickName);
                    User.setFollowerInfo();

                    me.setState({
                        buttonText: '领取成功，马上跳转...',
                        gotOver: true
                    });

                    //3s后自动跳转
                    setTimeout(me.hide, 2500);
                }else {
                    DialogAlert.show(()=>{
                        //已领取完毕，则跳往首页
                        me.hide();
                    });
                }

                me.setState({
                    disable: false,
                    gotOver: true,
                    buttonText: '马上去看课程'
                });
            },

            error : ()=>{
                Loading.hideLoading();

                DialogAlert.show(()=>{
                    //已领取完毕，则跳往首页
                    me.hide();
                });
                me.setState({
                    disable: false,
                    gotOver: true,
                    buttonText: '去看课程'
                });
            }
        });
    },

    getInitialState() {
        return {
            display: true,
            disable: false,
            buttonText: '领取课程',
            gotOver: false //领取完毕
        };
    },

    /**
     * 如果是VIP用户
     * @param data
     */
    onVipUser(data) {
        let me = this;

        if( data ){
            me.setState({
                buttonText: '你已领取课程，马上跳转...',
                gotOver: true
            });

            //3s后自动跳转
            setTimeout(me.hide, 2500);
        }
    },

    componentWillMount() {
        //赠送者userid
        let giftUserId = Util.getUrlPara('ictgift'),
            me = this;

        if( giftUserId ){
            let successFun = (data)=>{
                //设置赠送者头像
                me.setState({
                    headImageUrl: data.image
                });
            };

            let failureFun = (err)=>{};

            User.getUserInfoById(giftUserId, successFun, failureFun);
        }

    },

    /**
     * 隐藏自己，修改title
     */
    hide() {
        this.setState({
            display: false
        });
        $('title').html(Util.getCommonTitle());
    },

    /**
     * 获取上下线信息
     */
    componentDidMount() {
        let userId = Util.getUrlPara('ictgift'),
            apiUrl = Util.getAPIUrl('get_relation');

        let jsonData = JSON.stringify(
            {
                "userId": userId,
                'pyramidType': 'C',
                "minicId": Util.getMinicId()
            }
        );

        let me = this;

        /**
         * 获取上下线关系
         */
        $.ajax({
            url: apiUrl,
            data: jsonData,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            headers: {
                Accept:"application/json"
            },

            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-Token",
                    Util.getApiToken());
            },

            //成功后显示下线数据
            success:function(data) {
                data = data || {};
                console.log('data = ', data);
                if( data && data[0] ){
                    //有下线的用户信息，课程已经被领取了
                    me.setState({
                        childUser: data[0].userInfo.nickName,
                        buttonText: '去看课程'
                    });
                }
            },

            error : (data)=>{
                console.log('data = ', data);
            }
        });

        $('title').html('赠一得一·邀请好友一起学习投资知识');
    },

    /**
     * 点击领取按钮
     */
    clickHandler() {
        if( this.state.disable ){
            return;
        }

        if( this.state.gotOver ){
            //已领取完毕，则跳往首页
            this.hide();
        }else {
            this.setState({
                disable: true,
                buttonText: '正在获取课程...'
            });

            this.getGift();
        }
    },


    render() {
        let state = this.state,
            hideClass = state.display ? '':'hide',
            nickName = decodeURIComponent(Util.getUrlPara('ictnickname')),
            title = Util.getCommonTitle(),
            headImageStyle = {},
            hint;

        if( state.headImageUrl ) {
            headImageStyle.backgroundImage = 'url(' + state.headImageUrl + ')';
        }
        if( state.childUser ){
            hint = <p className="hint">{state.childUser + ' 等人已领取'}</p>
        }

        return (<div className={"gift-page-content "+hideClass}>
            <div className="title">
                <div className="head-image" style={headImageStyle}></div>
                <div className="title-content">
                    <p>{nickName}送了一个迷你课给你</p>
                    <p>"{title}</p>
                </div>
            </div>

            <div className="course-cover"></div>
            <p className="course-name">{Util.getMinicName()}</p>
            <p className="teacher">Lip（长投网）</p>
            <p className="couse-price">¥ {PayController.getCoursePrice().toFixed(2)}</p>

            <div className="get-button pay weui_btn weui_btn_plain_primary"
                 ref="button"
                 onTouchEnd={this.clickHandler}>{state.buttonText}</div>
            {hint}
        </div>);
    }
});

module.exports = GiftPage;
