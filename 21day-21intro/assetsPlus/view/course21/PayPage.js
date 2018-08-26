/**
 * Created by ichangtou on 2017/7/19.
 */
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
const ModalMask = require('../../component/common/ModalMask');

const Tools = require('../../GlobalFunc/Tools');
const WxConfig = require('../../WxConfig');
const GlobalConfig = require('../../GlobalStorage/GlobalConfig');
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

            endTime:[], // 截止时间


            num: 0,
            time: 0,
            hhrChannel: false,
            ifBgShow: false,

            //21天的报名信息
            // signUpInfo: {}
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
                        // signUpInfo: value,
                        hasPaid: true, //已报名
                    });
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
            //首先接收到付款结束.
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
        //3设置下线和价格
        this.setIfCanPaid();
        //5请求倒计时和剩余人数
        this.signUpNumber();
    },

    // setShareConfig() {
    //     let shareTitle = '我正在参加21天训练营',
    //         link = Util.getShareLink(),
    //         desc = '一起来参加';
    //     link = link + '&goPath=' + 'payPage';
    //     link = link + '&courseId=' + sessionStorage.getItem('courseId');
    //     WxConfig.shareConfig(shareTitle,desc,link);
    // },

    ifHhrChannel() {
        let seniorId = Util.getUrlPara("ictchannel");
        let channel = Util.getUrlPara("getWhere");
        if(seniorId && channel) {
            this.state.hhrChannel = true;
            this.setState({hhrChannel: this.state.hhrChannel});
        }
    },

    getUserId() {
        let userId = User.getUserInfo().userId;
        return Tools.fireRace(userId,"OAUTH_SUCCESS");
    },

    setIfCanPaid() {
        console.log('setIfCanPaid');
        let courseId = sessionStorage.getItem('courseId');
        let courseInfo = GlobalConfig.getCourseInfo(courseId);
        let normalPrice = courseInfo.price[0];
        let friendPrice = courseInfo.price[1];
        console.log(normalPrice);
        Util.setPrice(normalPrice);
        //设置下线
        let seniorId = Util.getUrlPara("ictchannel");
        //上报下线友情链接进入
        let userId = User.getUserInfo().userId;
        Tools.fireRace(userId,"OAUTH_SUCCESS").then(()=>{
            let userId = User.getUserInfo().userId;
            //下线进入界面
            if(seniorId && (userId !== seniorId)){
                // alert('seniorId');
                this.state.hasSenior = true;
                Util.setPrice(friendPrice);
                //发送post
                Material.recordSeniorEnter(seniorId);
            }
            this.setState({
                hasSenior: this.state.hasSenior,
                buttonPrice: Util.getPrice(),
            });
        });
        this.setState({
            hasSenior: this.state.hasSenior,
            buttonPrice: Util.getPrice(),
        });
    },

    /***
     * 请求剩余报名人数和报名时间是否截止
     */
    signUpNumber(){
        Material.getRegistered21().done((result) =>{
            console.log(result);
            //设置报名时间
            result.time = false;// 一定可以报名
            //设置剩余人数
            let restNum = result.leftQuota;
            if(!result.time && (restNum > 0)) {
                this.state.ifCanPaid = true;
            }
            //设置报名人数/时间等属性
            if (restNum <= 0){
                this.setState({
                    num: 0,
                    time: result.time,
                    showint: false,
                    ifCanPaid: false,
                });
            } else {
                this.setState({
                    num: restNum,
                    time: result.time,
                    showint: true,
                    ifCanPaid: true,
                });
            }
            let timeArray = Util.TimeToArray(result.endTime);
            console.log('!!!!!!!!' + timeArray);
            this.setState({
                endTime: timeArray,
            });

        });
    },

    goRouter() {
        console.log("goRouter");
        let ictChannel = Util.getUrlPara("ictchannel");
        if (ictChannel) {
            location.href = Util.getHtmlUrl() + "?ictchannel=" + Util.getUrlPara("");
        } else {
            location.href = Util.getHtmlUrl();
        }
    },

    /**
     * 支付动作
     */
    payHandler() {
        console.log('click');
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
    gotoBeginReward() {
        Tools.MyRouter('ListenCourse','/courseBegin/mine');
    },

    /**
     * 检测购买后是否关注公号
     */
    checkSubscribe () {
        let isSubscribed = User.getUserInfo().subscribe;

        //TODO 加qq群号.的弹窗.
        // 重新请求.
        // this.signUpNumber()
        //TODO 显示报名开课证(跳转)
        //TODo 上下线
        // alert('router');
        this.gotoBeginReward();

        // // 已关注公号的用户直接跳转关卡页面学习
        // if (isSubscribed) {
        //     DoneToast.show('报名成功，开始学习第一课吧！');
        //     //TODO 加qq群号.的弹窗.
        //     // 重新请求.
        //     this.signUpNumber()
        //     //TODO 显示报名开课证(跳转)
        //     //TODo 上下线
        //     this.gotoBeginReward();
        // } else { // 未关注引导关注公号
        //     this.scrollToTop();
        //     window.dialogAlertComp.show('报名成功','赶紧关注公众号"长投"，"长投"，"长投"，每天陪你一起学习哟~','好勒，知道了！',this.gotoBeginReward,()=>{},false);
        // }
    },

    renderBg() {
        let arr =[];
        for(let i = 0;i<4;i++) {
            let path = GlobalConfig.getCourseName();
            let url = `./assetsPlus/image/${path}/join-content-${i}.png`;
            arr.push(<img src={url}/>)
        }
        return arr;
    },

    render(){
        return (
            <div className="pay_page_course21">
                <FixedBg/>
                <ModalMask type = {true} cbfClick = {()=>{this.setState({ifBgShow: false})}} isShow = {this.state.ifBgShow} imageBg = {`./assetsPlus/image/${GlobalConfig.getCourseName()}/paypage_share.png`}/>
                <div className={"intro-img"}>
                    {this.renderBg()}
                    {/*<div className="fund-status">*/}
                        {/*<Timeout hasEnded={this.state.time} finalDate={this.state.endTime}/>*/}
                        {/*<span className="fund-status-number">剩余名额：{this.state.ifCanPaid ? this.state.num : 0}</span>*/}
                    {/*</div>*/}
                </div>
                {/*{this.bottomBar()}*/}
                {this.bottomPay()}


                {/*<div className="fund-join-page">*/}
                    {/*/!*<img src="./assetsPlus/image/fund/join-title.png" alt="" className="fund-join-title"/>*!/*/}
                    {/*<div className="fund-join-content-box">*/}
                        {/*<img src="./assetsPlus/image/course21/join-content.png" alt="" className="fund-join-content"/>*/}
                        {/*<div className="fund-status">*/}
                            {/*<Timeout hasEnded={this.state.time} finalDate={this.state.endTime}/>*/}
                            {/*<span className="fund-status-number">剩余名额：{this.state.ifCanPaid ? this.state.num : 0}</span>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*<div className="global-empty-div" style={{height: 70}}>123</div>*/}
                {/*</div>*/}
            </div>
        )
    },

    bottomPay() {
        return(<div className="global-div-fixed" onClick={this.clickHandler}>
            <div className="button-pay">
                {`立即学习（${this.state.buttonPrice}元）`}
            </div>

        </div>)
    },

    bottomBar() {
        return(<div className="global-div-absolute">
            <div className="join-and-share">
                {/*<div className="mid">*/}
                    {/*{this.renderButtonSignUp()}*/}
                    {/*{this.renderButtonShare()}*/}
                {/*</div>*/}
                <div className="left">
                    {this.renderButtonSignUp()}
                </div>
                <div className="right" onClick={this.onButtonShare}>
                    {this.renderButtonShare()}
                </div>
            </div>
        </div>)
    },

    renderButtonSignUp() {
        if(!this.state.hasPaid){
            //报名按钮
            return(
                <div className="button" onClick={this.clickHandler}>
                    <img src={'./assetsPlus/image/course21/button_payPage.png'}/>
                    <span>{this.state.hasSenior ? "分享优惠价" : "我要报名"}（{this.state.buttonPrice}元）</span>
                </div>);
            //查看毕业证按钮
        } else {
            return(
                <div className="button" onClick={this.onSeeReward}>
                    <img src={'./assetsPlus/image/course21/button_payPage.png'}/>
                    <span >我的开课证</span>
                </div>);
        }
    },

    renderButtonShare() {
        return(<img src={'./assetsPlus/image/course21/share_payPage.png'}/>)
    },

    onSeeReward () {
        //TODO 跳转到成就卡界面
        Statistics.postDplusData('点击_开课证_按钮');
        Tools.MyRouter('ListenCourse','/courseBegin/mine');
    },

    onButtonShare() {
        Statistics.postDplusData('点击_分享_按钮');
        this.setState({ifBgShow: true});
        // window.dialogAlertComp.show('分享','快去分享给你的小伙伴吧。学姐说大家一起学习更能坚持下去哦！','知道啦',()=>{},'',false);
    },

    /**
     * 按钮点击
     */
    clickHandler() {
        let data= {};
        if(this.state.ifCanPaid) {
            data.result = true;
            this.payHandler();
        } else {
            data.result = false;
            window.dialogAlertComp.show('报名失败','出故障了.重新进入一下再试试，还不行的话可以报告管理员.手机号：15652778863','知道啦',()=>{},'',false);
        }
        Statistics.postDplusData('点击_报名_按钮',data);
    },


    // buttonSignUp() {
    //     if(!this.state.hasPaid){
    //         //报名按钮
    //         return(<span className="btn join" onClick={this.clickHandler}>{this.renderPrice()}</span>)
    //     } else {
    //         //查看毕业证按钮
    //         return(<span className="btn join" onClick={this.onSeeReward}><span style={{lineHeight: '2.8rem'}}>查看开课</span></span>)
    //     }
    //
    // },

    // renderPrice() {
    //     let arr = [];
    //     if(!this.state.hhrChannel) {
    //         arr.push(<div className="price-span-right"><s className="price-span-inner origin-price">原价¥{20}</s><span className="price-span-inner current-price">现价¥{this.state.buttonPrice}</span></div>);
    //     } else {
    //         arr.push(<div className="price-span-right"><s className="price-span-inner origin-price">原价¥{200}</s><span className="price-span-inner current-price">友情价¥{this.state.buttonPrice}</span></div>);
    //     }
    //     return arr;
    // },

    // freeLesson() {
    //     //TODO 分享给好友
    //     Statistics.postDplusData('shareButton');
    //     Tools.MyRouter('ListenCourse','/listenCourse/10');
    // }

});

module.exports = PayPage;
