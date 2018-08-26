/**
 * Created by ichangtou on 2017/5/13.1
 */
// const Dimensions = require('./Dimensions');
const WxConfig = require('../WxConfig');
const OnFire = require('onfire.js');
const GlobalConfig = require('../GlobalStorage/GlobalConfig');


//课程信息
let courseInfo = {};
let expTotal = 0;
let expInfo ={};
let expList = [60,180,370,700];
//课程Id列表
// let courseList = [0,1,2];

//这里面需要分出来几个
//1做一个全局的常量保存的地方
//2这里面用来保存变量数据.主要就是set和get
//3这里还负责保存后的广播.

class MyStorage {
    static init() {
        // let max = 0;
        // for(let i = 0; i<courseList.length; i++) {
        //     if(courseList[i]>max) {
        //         max = courseList[i];
        //     }
        // }
        // for(let i = 0; i<max+1; i++) {
        //     courseInfo[courseList[i]] = {};
        // }
        let courseList = GlobalConfig.getCourseIdList();
        for(let i = 0; i< courseList.length; i++) {
            courseInfo[courseList[i]] = {};
        }
        //
        // for(let i = 0; i< GlobalConfig.getCourseIdList().length; i++) {
        //     courseInfo[i] = {};
        // }
    }

    static setExpInfo(valueObj) {
        //计算并设置最大经验值.
        expTotal = 20;
        //得到当前经验信息

        //保存信息
        //返回
        expInfo.level = valueObj.level;
        expInfo.max = valueObj.levelExp;
        expInfo.current = valueObj.userExp;
        OnFire.fire("getExpInfo",expInfo);
    }

    static putExpUp(value) {
        let lastExp = value;
        let gap = expInfo.max - expInfo.current;
        let localExpInfo = {
            level: 0,
            max: 0,
            current: 0,
        };
        let upArray = [];
        while(lastExp > gap){
            //设置上当前的
            expInfo.current = expInfo.max;
            upArray.push(expInfo);
            //计算下一次
            lastExp = lastExp - gap;
            expInfo.level = expInfo.level + 1;
            expInfo.max = expList[expInfo.level];
            expInfo.current = 0;
            gap = expInfo.max - expInfo.current;
        }
        expInfo.current = gap;
        if(upArray.length === 0) {
            upArray.push(expInfo);
        }
        //返回全部的obj
        return upArray;
    }

    static calcExp() {
        let level = 0;
        let current = 0;

        for(level = 0; level < expList.length; level++) {
            if(expList[level] > this.state.currentExp) {
                break;
            }
            current = current + expList[level];
        };
        this.state.userInfo.level = level;
        this.state.userInfo.current = this.state.currentExp - current;
        this.state.userInfo.max = expList[level];
        this.state.kValue = this.state.userInfo.current/this.state.userInfo.max;

        this.setState({
            userInfo: this.state.userInfo,
            kValue: this.state.kValue,
        })
    }

    static getExpInfo() {
        return expInfo;
    }

    /**
     *  保存数据,并且广播数据
     * @param courseId 课程ID 拼接广播
     * @param status 关于购买的数据 .pay是是否支付
     */

    static setCourseStatus(courseId,dataResult) {
        //保存到全局
        courseInfo[courseId].dataResult = dataResult;
        // OnFire.fire("courseStatus",{courseId: courseId,status: status});
        //报名成功后触发
        if(parseInt(sessionStorage.getItem('courseId')) === courseId) {
            if(dataResult.pay){
                sessionStorage.setItem('SisBuy','付费');
            } else {
                sessionStorage.setItem('SisBuy','未付费');
            }

        }
        OnFire.fire("courseStatus" + courseId,dataResult);
    }

    static getCourseStatus(courseId) {
        if(courseInfo[courseId]) {
            return courseInfo[courseId].dataResult;
        } else {
            return null
        }

    }

    static deleteCourseStatus(courseId) {
        if(courseInfo[courseId]) {
            courseInfo[courseId].dataResult = null;
        } else {
            console.log('error' + 'deleteCourseStatus');
        }
    }



    static setItem(key,value){
        console.log('read-only')
        // sessionStorage.setItem(key,value);
        // if(!getItem(type,key)){
        //     sessionStorage.setItem(key,value);
        // } else {
        //     console.log('已经有数值');
        // }
    }


    /**
     * 传入全局变量名称
     * 返回值
     * 封装了set/get
     * @param key
     * @returns {Array}
     */
    static getItem(key){
        return Util.getUrlPara(key);
        // return sessionStorage.getItem(key);
    }

    //需要修改的全局变量.
    //并且需要上报.

    /**
     * 设置当前的课程ID
     * @param courseId
     */
    static setCourseId(courseId) {
        sessionStorage.setItem('courseId',courseId);
        sessionStorage.setItem('ScourseId',courseId);
    }

    /**
     * 设定当前界面名称.
     * @param pathNow
     */
    static setPathNow(pathNow) {
        console.log('set');
        let pathLogicNow = GlobalConfig.getRouterInfo(pathNow);
        let pathLogicOld = sessionStorage.getItem('pathNow');
        if(!pathLogicOld) {
            pathLogicOld = 'entryJs'
        }
        sessionStorage.setItem('pathFrom',pathLogicOld);
        sessionStorage.setItem('pathNow',pathLogicNow);
        let pathOldName = GlobalConfig.getRouterName(pathLogicOld);
        let pathNowName = GlobalConfig.getRouterName(pathLogicNow);
        sessionStorage.setItem('SpathFrom',pathOldName);
        sessionStorage.setItem('SpathNow',pathNowName);
    }

    /**
     * 进入界面调用函数.
     * 用于统计和记录当前页面
     * @param pathNow 界面名称
     */
    static whenEnterPage(pathNow,data) {

        console.log('你进入了' + pathNow);
        this.setPathNow(pathNow);
        //每个界面默认设置分享
        WxConfig.shareConfig();
        Statistics.postDplusData('进入界面',data);
    }
}

// module.exports = MyStorage;
window.MyStorage = MyStorage;