/**
 * Created by Administrator on 16-8-2.
 */
var React = require('react');
var $ = require('jquery');
var OnFire =require('onfire.js');

var User = require('../../User');
var Dimensions = require('../../Dimensions');
var PayController = require('../../PayController');
var Util = require('../../Util');
var Material = require('../../Material');
var Loading = require('../../Loading');
var DoneToast = require('../../component/DoneToast');
const Timeout = require('../../component/Timeout');

const FixedBg = require('../../component/course/FixedBg');

const Tools = require('../../GlobalFunc/Tools');
const MassageBoard = require('../../component/common/MessageBoard');

const Actions = require('../../GlobalStorage/Actions');

var PayPage = React.createClass({

    getInitialState(){
        return {
            hasPaid:false, //是否付费
            ifCanPaid: false,
            showGuide: false, // 显示关注引导信息
            showShareHint: false, //显示分享
            QQNum: null, //QQ群号
            QQLink: null, //QQ群链接
            QQCode: null, //QQ暗号
            remain: parseInt(localStorage.getItem('remain-num')) || Util.getUserNumber(), //剩余席位

            //21days2.0
            hasSenior: false, //是否有上线
            buttonPrice: Util.getPrice(), //

            //wechat
            showWechatGroup: false, //显示微信联系方式

            showint:true,//初始剩余人数

            endTime: Util.getEndTime(), // 截止时间


            num: 0,
            time: 0,

            userComments: [],
            likeCountArray: [90,65,30,25,65,32,16,50,20,30],
        };
    },


    componentWillMount(){
        MyStorage.whenEnterPage('pay');
        //0获取当前的Id
        let courseId = sessionStorage.getItem('courseId');
        //1获取用户名 获取报名信息
        this.getUserId().then(()=>{
            //获取用户是否有报名记录
            Tools.fireRaceCourse(courseId).then((value)=>{
                if(value.pay){
                    this.setState({
                        hasPaid: true, //已报名
                    });
                    this.gotoSelectPage();
                } else{
                    this.setState({
                        hasPaid: false, //未报名
                    });
                }
            });
        });
        //2监听支付完成 通往听课
        let outBool = false;
        while(!outBool) {
            outBool = true;
            OnFire.on('PAID_DONE', ()=>{
                if (sessionStorage.getItem('courseId') !== courseId) {
                    return
                }
                //先ajax更新这个数据(花费少量时间)
                Actions.ifCourseSignUp(courseId);
                //action & get
                //这边的结果完成后get
                Tools.fireRaceCourse(courseId).then((value)=>{
                    // alert('start' + value.qqGroup);
                    if(value.pay){
                        Statistics.postDplusData('报名_成功');
                        Statistics.postDplusData('支付_回调',[true]);
                        this.state.hasPaid = true;
                        this.setState({
                            hasPaid: true, //已报名
                        });
                        this.state.hasPaid = true;
                        this.checkSubscribe();
                    } else {
                        Statistics.postDplusData('报名_失败');
                        Statistics.postDplusData('支付_回调',[false]);
                        outBool = false;
                    }
                })
            });
        }
        //3设置下线置价格
        this.setIfCanPaid();
        //5请求倒计时和剩余人数
        this.signUpNumber();
        //6获取评论
        this.getComment();
    },

    getComment() {
        Material.getUserComment().done((result) => {
            let likeCountArray = this.state.likeCountArray;
            for (let i =0; i< result.length; i++) {
                result[i].likeCount = likeCountArray[i];
            }
            this.state.userComments.push(result);
            this.setState({userComments: this.state.userComments})
        })
    },

    getUserId() {
        let userId = User.getUserInfo().userId;
        return Tools.fireRace(userId,"OAUTH_SUCCESS");
    },

    setIfCanPaid() {
        let seniorId = Util.getUrlPara("ictchannel");
        Util.setPrice(9);
        //下线进入界面
        if(seniorId){
            this.state.hasSenior = true;
            this.state.ifCanPaid = true;
            Util.setPrice(3);
        }
        //试听进入
        if(sessionStorage.getItem('pathFrom') === 'ListenCourse') {
            this.state.ifCanPaid = true;
        }
        this.setState({
            hasSenior: this.state.hasSenior,
            ifCanPaid: this.state.ifCanPaid,
            buttonPrice: Util.getPrice(),
        });
    },

    /***
     * 请求剩余报名人数和报名时间是否截止
     */
    signUpNumber(){
        Material.getRegistered().done((result) => {
            let restNum = 500 - result.number;
            if (restNum <= 0){
                this.setState({
                    num: 0,
                    time: result.time,
                    showint: false,
                });
            } else {
                this.setState({
                    num: restNum,
                    time: result.time,
                    showint: true,
                });
            }
        }).fail(()=>{

        });


    },


    /**
     * 按钮点击
     */
    clickHandler() {
        Statistics.postDplusData('点击_报名_按钮');
        this.payHandler();
    },

    /**
     * 支付动作
     */
    payHandler() {
        if(User.getUserInfo().userId){
            //微信支付
            PayController.wechatPay();
        }else{
            this.scrollToTop();
            window.dialogAlertComp.show('提示','重新进入一下再试试，还不行的话可以报告管理员.手机号：15652778863','知道啦',()=>{},'',false);
        }
    },

    scrollToTop() {
        scrollTo(0,0);
    },

    /**
     * 跳转到关卡页面
     */
    gotoSelectPage() {
        Tools.MyRouter('CourseSelect','/courseSelect/');
    },

    /**
     * 检测购买后是否关注公号
     */
    checkSubscribe () {
        let isSubscribed = User.getUserInfo().subscribe;
        // 已关注公号的用户直接跳转关卡页面学习
        if (isSubscribed) {
            DoneToast.show('报名成功，开始学习第一课吧！');
            this.gotoSelectPage();
        } else { // 未关注引导关注公号
            this.scrollToTop();
            window.dialogAlertComp.show('报名成功','赶紧关注公众号"长投"，"长投"，"长投"，每天陪你一起学习哟~','好勒，知道了！',this.gotoSelectPage,()=>{},false);
        }
    },

    render(){
        return (
            <div className="pay_page_seven">
                <FixedBg/>
                <div className="top-banner">
                    <img src={'./assetsPlus/image/seven/payPage/banner_seven.jpg'}/>
                </div>
                <div className={"intro-img"}>
                    <img src='./assetsPlus/image/seven/join-content.png' />
                    {this.renderBuyButton()}
                </div>
                <div className="bottom-img">
                    <img src={'./assetsPlus/image/seven/payPage/comment-top.png'}/>
                    <p>学员评价</p>
                </div>
                {this.state.hasPaid && <div>
                    <div className="paid-bg" style={{height:window.innerHeight}} onClick={this.gotoSelectPage}>
                        <div className="paid-text-box">
                            <p className="paid-text">报名成功！</p>
                            {!this.state.showWechatGroup && <div>
                                <p className="paid-text paid-times"></p>
                                <p className="paid-text">下一个百万富翁就是你</p>
                                {!this.state.followSubscribe && <div><p className="paid-text">长按扫描下方二维码进入课程公号的“财商训练”，开始学习吧</p>
                                    <div className="page-div">
                                        <img className="page-image" src="./asstesFund/image/tousha-qrcode.jpg"/>
                                    </div></div>}

                            </div>}
                        </div>
                    </div>
                </div>}
                {/*{this.renderBuyButton}*/}

                {/*{(!this.state.hasPaid && !this.state.isFreeUser) &&*/}
                {/*<div className="bottom-button">*/}
                    {/*{<span onClick={this.clickHandler}  className={!this.state.hasSenior ?"join-button":"whole-join-button"}>立即参加（{this.state.buttonPrice}元）</span>}*/}
                    {/*<span className="free-lesson-button" onClick={this.freeLesson}>免费试听</span>*/}
                {/*</div>*/}
                {/*}*/}
                {/*{(!this.state.hasPaid && this.state.isFreeUser) &&*/}
                {/*<div className="bottom-button">*/}
                    {/*<span onClick={this.checkSubscribe} className="join-button">开始学习吧！</span>*/}
                    {/*<span className="share-button" onClick={this.shareModalHandler}>邀请好友</span>*/}
                {/*</div>*/}
                {/*}*/}
                {this.renderListenFree()}
                {this.renderMessage()}
            </div>
        )
    },

    renderListenFree () {
        return(<img onClick={this.freeLesson} className="pay-listen-free" src={'./assetsPlus/image/seven/payPage/listen-free.png'}/>)
    },

    renderBuyButton() {
        let arr = [];
        arr.push(<div onClick={this.clickHandler} className="buy-button">
            <img src = {"./assetsPlus/image/seven/payPage/paypage-buy.png"}/>
            <p>立即参加（{this.state.buttonPrice}元）</p>
        </div>);
        // if(this.state.isFreeUser) {
        //     arr.push(<div onClick={this.clickHandler} className="buy-button">
        //         <img src = {"./assetsPlus/image/seven/payPage/paypage-buy.png"}/>
        //         <span>立即参加（{this.state.buttonPrice}元）</span>
        //     </div>)
        // } else {
        //     arr.push(<div onClick={this.clickHandler} className="buy-button">
        //         <img src = {"./assetsPlus/image/seven/payPage/paypage-buy.png"}/>
        //         <span>免费领取</span>
        //     </div>)
        // }
        return arr;
    },

    renderMessage() {
        // let styleMassageBoard = {
        //     bgColor: {
        //         backgroundColor: 'white',
        //         color: '#4498C7',
        //     },
        //     textMargin: {
        //         marginLeft: '10px',
        //     },
        //     borderBottom: {
        //         borderBottom: '2px solid #4498C7',
        //     }
        // }
        return(<MassageBoard userLists = {this.state.userComments}/>)
        // return(<MassageBoard defaultStyle = {styleMassageBoard} cbfLike = {()=>{}} userLists = {this.state.userComments}/>)
    },

    freeLesson() {
        Statistics.postDplusData('点击_试听_按钮');
        Tools.MyRouter('ListenCourse','/listenCourse/1');
    }

});

module.exports = PayPage;
