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

const Card = require('../../component/components/Card');
const CourseCatalogCard = require('../../component/components/CourseCatalogCard');
const ImageCard = require('../../component/components/ImageCard');
const SummaryCard = require('../../component/components/SummaryCard');
const TeacherIntro = require('../../component/components/TeacherIntro');

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

            payPageInfo: {
                // bannerSrc: '123',
                // summary: '123#456',
                // catalog: '123',
                // teacherIntro: '123',
                // teacherImg: '123',
                // price: '1',
            },

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
                    this.checkSubscribe();
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
                Loading.showLoading('获取报名信息...');
                //报名后片刻插表
                setTimeout(()=>{
                    //先ajax更新这个数据(花费少量时间)
                    Actions.ifCourseSignUp(courseId);
                    //action & get
                    //这边的结果完成后get
                    Tools.fireRaceCourse(courseId).then((value)=>{
                        Loading.hideLoading();
                        // alert('start' + value.qqGroup);
                        if(value.pay){
                            Statistics.postDplusData('报名_成功');
                            Statistics.postDplusData('支付_回调',[true]);
                            this.state.hasPaid = true;
                            this.setState({
                                hasPaid: true, //已报名
                            });
                            this.checkSubscribe();
                        } else {
                            Statistics.postDplusData('报名_失败');
                            Statistics.postDplusData('支付_回调',[false]);
                            outBool = false;
                        }
                    })
                },500);
            });
        }
        //获取报名页信息
        this.getPayPageInfo();
        //3设置下线和价格
        // this.setIfCanPaid();
        //5请求倒计时和剩余人数
        // this.signUpNumber();
    },

    // setShareConfig() {
    //     let shareTitle = '我正在参加21天训练营',
    //         link = Util.getShareLink(),
    //         desc = '一起来参加';
    //     link = link + '&goPath=' + 'payPage';
    //     link = link + '&courseId=' + sessionStorage.getItem('courseId');
    //     WxConfig.shareConfig(shareTitle,desc,link);
    // },


    getUserId() {
        let userId = User.getUserInfo().userId;
        return Tools.fireRace(userId,"OAUTH_SUCCESS");
    },

    getPayPageInfo() {
        console.log('getPayPageInfo')
        let courseId = sessionStorage.getItem('courseId');
        Material.getPayPageInfo(courseId).then((payPageInfo)=>{
            this.setState(
                {
                    payPageInfo: payPageInfo
                }
            )
            Util.setPrice(payPageInfo.price);
        })
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
        Material.getRegistered().done((result) =>{
            console.log(result);
            //设置报名时间
            result.time = false;// 一定可以报名
            //设置剩余人数
            let restNum = Util.getUserNumber() - result.number;
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
            // let timeArray = Util.TimeToArray(result.endTime);
            let timeArray = [2017,8,16,9,0,0];
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
            PayController.wechatPay(1);
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
        Tools.GoRouter('select');
    },

    /**
     * 检测购买后是否关注公号
     */
    checkSubscribe () {

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



    render() {
        if(!this.state.payPageInfo.price) {
            return null
        }
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        // return(<div className="pay_page_modal">
        //     456
        //     <div>
        //         <div className="submitButton" onClick={this.clickHandler}>
        //             {this.state.payPageInfo.price} 元，立即学习
        //         </div>
        //     </div>
        // </div>)
        return (

            <div className="pay_page_modal">
                <div style={{paddingLeft: 0, paddingRight: 0}}>
                    <ImageCard src={this.state.payPageInfo.bannerSrc}></ImageCard>
                </div>
                <div>
                    <SummaryCard title= {"课程介绍"}>
                        {this.state.payPageInfo.summary}
                    </SummaryCard>
                </div>
                {/*<div>*/}
                    {/*<CourseCatalogCard>*/}
                        {/*{this.state.payPageInfo.catalog}*/}
                    {/*</CourseCatalogCard>*/}
                {/*</div>*/}
                <div>
                    <TeacherIntro
                        title = {"导师介绍"}
                        headImage = {this.state.payPageInfo.teacherImg}
                        introTxt = {this.state.payPageInfo.teacherIntro}
                    />
                </div>
                <div className="submitButton" onClick={this.clickHandler}>
                    {this.state.payPageInfo.price} 元，立即学习
                </div>
            </div>
        );
    },

    // render(){
    //     return (
    //         <div className="pay_page_modal">
    //             <FixedBg/>
    //             <div className="fund-join-page">
    //                 <img src= {`./assetsPlus/image/${GlobalConfig.getCourseName()}/join-title.png`} alt="" className="fund-join-title"/>
    //                 <div className="fund-join-content-box">
    //                     <img src={`./assetsPlus/image/${GlobalConfig.getCourseName()}/join-content.png`} alt="" className="fund-join-content"/>
    //                     <div className="fund-status">
    //                     </div>
    //                 </div>
    //                 {this.bottomBar()}
    //                 <div className="global-empty-div" style={{height: 70}}></div>
    //             </div>
    //         </div>
    //     )
    // },

    bottomBar() {
        return(<div className="global-div-fixed">
            <div className="fund-join-btns">
                {/*{this.buttonLesson()}*/}
                {this.buttonSignUp()}
            </div>
        </div>)
    },

    buttonLesson() {
        return(<span className="btn try" onClick={this.freeLesson}>试听</span>)
    },

    buttonSignUp() {
        if(this.state.ifCanPaid){
            return(<span className="btn join" style = {{lineHeight: '60px',width: '100%'}} onClick={this.clickHandler}>{this.state.hasSenior ? "分享优惠价" : "我要报名"}（{this.state.buttonPrice}元）</span>)
        } else if(this.state.hasPaid){
            return(<span className="btn join" style = {{lineHeight: '60px',width: '100%'}} onClick={this.goCourseSelect}><span style={{lineHeight: '2.8rem'}}>这就去听课</span></span>)
        } else {
            return(<span className="btn join" style = {{lineHeight: '60px',width: '100%'}}><span style={{lineHeight: '2.8rem'}}>敬请期待新的股票课</span></span>)
        }

    },
    goCourseSelect () {
        //TODO 跳转到成就卡界面
        Statistics.postDplusData('点击_开课证_按钮');
        Tools.GoRouter('select');
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
        this.payHandler();
        // if(this.state.ifCanPaid) {
        //     data.result = true;
        //
        // } else {
        //     data.result = false;
        //     window.dialogAlertComp.show('报名失败','出故障了.重新进入一下再试试，还不行的话可以报告管理员.手机号：15652778863','知道啦',()=>{},'',false);
        // }
        Statistics.postDplusData('点击_报名_按钮',data);
    },




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
