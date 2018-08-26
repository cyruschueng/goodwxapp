/**
 * Created by ichangtou on 2017/5/13.1
 */
// const Dimensions = require('./Dimensions');
const WxConfig = require('../WxConfig');
const OnFire = require('onfire.js');
const GlobalConfig = require('../GlobalStorage/GlobalConfig');
const Actions = require('../GlobalStorage/Actions');


//课程信息
let expInfo ={};
let expList = [60,180,370,700];
let levelUpStack = [];
let expModalInfo = {
    txt: '获得经验',
    value: '',
    level: '',
    headImage: '',
};

//课程Id列表
// let courseList = [0,1,2];

//这里面需要分出来几个
//1做一个全局的常量保存的地方
//2这里面用来保存变量数据.主要就是set和get
//3这里还负责保存后的广播.

class GlobalExp {
    static getExpModalInfo() {
        let json = JSON.parse(JSON.stringify(expModalInfo));
        return json;
    }

    static setExpModalInfo(string,image) {
        expModalInfo.txt = string;
        expModalInfo.headImage = image;
    }

    static init() {
        //发送拉取的请求
        Actions.getUesrExpInfo();
    }

    static setExpInfo(valueObj) {

        //保存信息
        //返回
        expInfo.level = valueObj.userLevel;
        expInfo.max = valueObj.levelExp;
        expInfo.current = valueObj.userExp;
        expInfo.levelUp = false;
        OnFire.fire("getExpInfo",expInfo);
    }

    static expUpEvent(type) {
        // let expData = {};
        return new Promise((resolve,reject)=>{
            switch (type) {
                case 'signUp':
                    expModalInfo.txt = '签到成功';
                    //0增长经验的触发事件
                    Material.putSignUp().then((data)=>{
                        if(data.expChange !== -1) {
                            //1将经验变化值保存
                            this.putExpUp(data.expChange);
                            resolve(data.expChange);
                            //遍历去除
                        } else {
                            reject(false)
                        }
                    });
                    break;
                default:
                    reject(false);
                    console.log('abc');
                    break;
            }

        })

    }

    static getLevelUpStack() {
        expModalInfo.level = levelUpStack[0].level;
        let json = levelUpStack.shift();
        json = JSON.parse(JSON.stringify(json));
        return json;
    }

    //将升级过程储存
    static putExpUp(value) {
        expModalInfo.value = value;
        let lastExp = value;
        let gap = expInfo.max - expInfo.current;
        let localExpInfo = {
            level: 0,
            max: 0,
            current: 0,
        };
        let upArray = [];
        while(lastExp >= gap){
            let localExpInfo = {};
            //设置上当前的
            localExpInfo.level = expInfo.level;
            localExpInfo.max = expInfo.max;
            localExpInfo.current = expInfo.max;
            //设置上升级
            localExpInfo.levelUp = true;
            upArray.push(localExpInfo);
            //计算下一次
            lastExp = lastExp - gap;
            expInfo.level = expInfo.level + 1;
            expInfo.max = expList[expInfo.level - 1];
            expInfo.current = expInfo.current + gap;
            expInfo.levelUp = false;
            gap = expInfo.max - expInfo.current;
        }
        expInfo.current = expInfo.current  + lastExp;
        //保存最后一次
        upArray.push(expInfo);
        levelUpStack = upArray;
        //返回全部的obj
        return levelUpStack;
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
        let json = JSON.parse(JSON.stringify(expInfo));
        return json;
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

}

// module.exports = MyStorage;
window.GlobalExp = GlobalExp;