/**
 * Created by ichangtou on 2017/6/23.
 */
/**
 * Created by ichangtou on 2017/6/23.
 */
// const Dimensions = require('./Dimensions');

const OnFire = require('onfire.js');
const User = require('../User');

const WxConfig = require('../WxConfig');

const Tools = require('../GlobalFunc/Tools');

const Statistics = require('../GlobalFunc/Statistics');
const GlobalConfig = require('../GlobalStorage/GlobalConfig');
const Actions = require('../GlobalStorage/Actions');


const Util = require('../Util');

class BeforeStart {
    static init() {
        //0 初始化全局
        this.initGlobal();

        //1 微信设置
        // if (window.sessionStorage.getItem('wx-share-ready')) {
        //     this.setShareConfig();
        //     Loading.hideLoading();
        // }
        // OnFire.on('OAUTH_SUCCESS', () => {
        //     this.setShareConfig();
        //     Loading.hideLoading();
        // })
        //1 进行异步的userID请求 之后进行必要的请求(付费,设置分享等)
        this.getUserId().then(this.start.bind(this));
        //2 将项目业务需求所需要的参数统统保存起来
        this.getInfoFromUrl();
        Statistics.setStaticData();
        //3 截取入口(之后这个操作统一汇总到信息中)
        this.getWhereChannel();
        //4 获取之后要跳转的连接
        let redictUrl = this.getRedirect();
        console.log(redictUrl);
        //5 返回最终连接 跳转
        return redictUrl;
    }

    static initGlobal() {


        //清空有影响的缓存
        // sessionStorage.removeItem('courseId');
        let totalTime = sessionStorage.getItem('startTime');
        //清空缓存,保留有用缓存
        if(sessionStorage.getItem('wxshare')) {
            sessionStorage.clear();
            sessionStorage.setItem('wxshare',true)
        } else {
            sessionStorage.clear();
        }

        sessionStorage.setItem('SstartTime',totalTime);
        console.log(totalTime);
        console.log('clear session');

        MyStorage.init();
        GlobalExp.init();
        //获取经验信息的接口.
    }
    static getWhereChannel () {
        let getWhere = Util.getUrlPara("getWhere");
        if (getWhere) {
            console.log(getWhere);
        }
    }

    static getRedirect() {
        //初始化.
        sessionStorage.setItem('testType','have-not');

        console.log('enterridict');
        //重定向到main
        let redictUrl = '/main';
        // let redictUrl = '/courseSelect';


        let goPath = MyStorage.getItem('goPath');
        // if (!goPath) {
        //
        // }
        let courseId = MyStorage.getItem('courseId');
        let getWhere = MyStorage.getItem('getWhere');
        //判断特殊渠道(推送必然可以听课.(需要扫码))
        if(getWhere === 'rumenke') {
            courseId = 1004
            MyStorage.setCourseId(courseId);
            redictUrl = 'courseSelect';
            let dataResult = {};
            dataResult.pay = true;
            MyStorage.setCourseStatus(courseId,dataResult);
            sessionStorage.setItem('SisBuy','付费');
            //3设置默认分享(特殊设置)

            //4设置跳转
            // 举例/fund/getReward/
            redictUrl = Tools.setCourseUrl(courseId) + '/' + redictUrl;
        }
        else if(getWhere === 'autoPushHigh') {
            console.log('已废弃');
            // goPath = 'courseSelect';
            // courseId = 2;
            // redictUrl = goPath;
            //如果有课程
            // if(courseId) {

            //1设置courseId
            if(goPath) {
                redictUrl = goPath
            } else {
                redictUrl = 'courseSelect';
            }

            //2获取课程支付信息
            let dataResult = {};
            dataResult.pay = true;
            MyStorage.setCourseStatus(courseId,dataResult);
            sessionStorage.setItem('SisBuy','付费');
            //3设置默认分享(特殊设置)

            //4设置跳转
            // 举例/fund/getReward/
            redictUrl = Tools.setCourseUrl(courseId) + '/' + redictUrl;

            // https://h5test.ichangtou.com/minic/indexPlus.html?courseId=2&goPath=payPage&getWhere=queen

        // } else if(getWhere === 'ggh' && courseId === '2') {
        } else if(getWhere === 'yixin') {
            redictUrl = goPath;
            if(!redictUrl) {
                redictUrl = 'payPage';
            } else {
                redictUrl = '/' + redictUrl;
            }
            //如果有课程
            //针对公众号21天入口.需要根据用户判断界面
            Actions.ifCourseSignUp(courseId);
            //TODO
            //并且可以开课
            Tools.fireRaceCourse(courseId).then((value)=>{
                console.log('get');
                if(parseInt(sessionStorage.getItem('courseId')) === parseInt(courseId)) {
                    if(value.pay){
                        sessionStorage.setItem('SisBuy','付费');
                    } else {
                        sessionStorage.setItem('SisBuy','未付费');
                    }
                    Tools.MyRouter('',redictUrl);
                }
            });
            //3设置默认分享(特殊设置)

            //4设置跳转
            //公号判定支付/开课时间后才会跳转
            return '/padding';
        } else if(getWhere === 'share') {
            redictUrl = goPath;
            if(MyStorage.getItem('dayId')){
                redictUrl = redictUrl + '/' + MyStorage.getItem('dayId');
            }
            if(!redictUrl) {
                redictUrl = '/payPage';
            } else {
                redictUrl = '/' + redictUrl;
            }
            //如果有课程
            //针对公众号21天入口.需要根据用户判断界面
            Actions.ifCourseSignUp(courseId);
            //TODO
            //并且可以开课
            Tools.fireRaceCourse(courseId).then((value)=>{
                console.log('get');
                if(parseInt(sessionStorage.getItem('courseId')) === parseInt(courseId)) {
                    if(value.pay){
                        sessionStorage.setItem('SisBuy','付费');
                    } else {
                        sessionStorage.setItem('SisBuy','未付费');
                    }
                    Tools.MyRouter('',redictUrl);
                }
            });
            //3设置默认分享(特殊设置)

            //4设置跳转
            //公号判定支付/开课时间后才会跳转
            return '/padding';
        } else if(courseId === '2') {
            //针对公众号21天入口.需要根据用户判断界面
            Actions.ifCourseSignUp(courseId);
            //TODO
            //并且可以开课
            Tools.fireRaceCourse(courseId).then((value)=>{
                console.log(value);
                if(value && value.qqGroup) {
                    if (value.qqGroup === '537596931') {
                        sessionStorage.setItem('testType','have');
                    } else {
                        sessionStorage.setItem('testType','have-not');
                    }
                }
                if(parseInt(sessionStorage.getItem('courseId')) === parseInt(courseId)) {
                    if(value.pay){
                        sessionStorage.setItem('SisBuy','付费');
                        Material.getStartClassCourse21().then((result)=>{
                            if(result) {
                                Tools.GoRouter('select');
                            } else {
                                Tools.GoRouter('begin','/mine');
                            }
                        });

                    } else {
                        sessionStorage.setItem('SisBuy','未付费');
                        Tools.GoRouter('pay');
                    }
                }
            });
            //3设置默认分享(特殊设置)

            //4设置跳转
            //公号判定支付/开课时间后才会跳转
            redictUrl = '/padding';
            return redictUrl;

        } else if (courseId === GlobalConfig.getBetaInfo().courseId) {
            //针对股票课beta
            Actions.ifCourseSignUp(courseId);
            //TODO
            //并且可以开课
            Tools.fireRaceCourse(courseId).then((value)=>{
                console.log('get');
                if(parseInt(sessionStorage.getItem('courseId')) === parseInt(courseId)) {
                    if(value.pay){
                        sessionStorage.setItem('SisBuy','付费');
                        Tools.GoRouter('select');
                    } else {
                        sessionStorage.setItem('SisBuy','未付费');
                        Tools.GoRouter('pay');
                    }
                }
            });
            //3设置默认分享(特殊设置)

            //4设置跳转
            //公号判定支付/开课时间后才会跳转
            redictUrl = '/padding';
            return redictUrl;

        } else if (goPath) {
            console.log('111111goPath1111111111111111');
            //判断
            redictUrl = goPath;
            //如果有课程
            if(courseId) {
                //1设置c ourseId
                //2获取课程支付信息
                //action在特定页面懒发起,这里只负责分发跳转.(但是因为所有的跳转界面都需要这个数据,所以在这里进行处理)
                Actions.ifCourseSignUp(courseId);
                Tools.fireRaceCourse(courseId).then((value)=>{
                    if(parseInt(sessionStorage.getItem('courseId')) === courseId) {
                        if(value.pay){
                            sessionStorage.setItem('SisBuy','付费');
                        } else {
                            sessionStorage.setItem('SisBuy','未付费');
                        }
                    }
                });

                //3设置默认分享

                //4设置跳转
                // 举例/fund/getReward/
                redictUrl = Tools.setCourseUrl() + '/' + redictUrl;
            }
        }
        //加上dayId
        let dayId = MyStorage.getItem('dayId');
        if(dayId){
            redictUrl = redictUrl + '/' + dayId;
        }
        if(!courseId) {
            courseId = -1;
        }
        MyStorage.setCourseId(courseId);

        return redictUrl;
    }

    static getUserId() {
        let userId = User.getUserInfo().userId;
        return Tools.fireRace(userId,"OAUTH_SUCCESS");
    }

    //userId        - 这个用户的userId

    //ictchannel    - 上线/null
    //goPath        - 跳转到哪里(着陆页)/null
    //getWhere      - 哪个渠道来的/null
    //courseId      - 哪个课程/null(从入口进入,之后再赋值)    这个值在分享链接的时候要再次加进去
    //shareType     - 高级/低级/普通/null

    //上下线
    //isBuy         -??

    //pathFrom      - 从哪里来
    //pathNow       - 到哪里

    //分享
    //dayId         - 第几天的课程/null   这个值需要修改



    //这里面用于保存逻辑上需要的东西.从url中获取到的
    static getInfoFromUrl() {

    }

    //这里面保存从url中截取并用于数据统计的东西
    //如果这个统计里面有别的连带参数,也一并获取并加入进去
    //用户类型userType,上线ID,登陆页,渠道,免费课


    //现在判断购买情况放在这里.
    //因为流程上需要先登录userInfo 在进行购买判定.
    //这个过程写在这里.当得到结果后统一发送Onfire就可以.
    static start() {
        // let f = this.SetCoursePayStatus.bind(this);
        // f();
    }

    static setShareConfig() {
        WxConfig.shareConfig();
    }

    // static SetCoursePayStatus() {
    //     //获取课程列表
    //     let list = MyStorage.getCourseList();
    //     for( let i = 0; i<list.length; i++) {
    //         let courseId = list[i];
    //         this.checkUserPayStatue(courseId).then((result)=>{
    //             //保存到课程列表中
    //             MyStorage.setCourseStatus(courseId,result)
    //         });
    //     }
    // }


}

module.exports = BeforeStart;
