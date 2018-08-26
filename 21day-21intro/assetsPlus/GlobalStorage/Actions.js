/**
 * Created by ichangtou on 2017/7/20.
 */
/**
 * Created by ichangtou on 2017/5/13
 */
var Material = require('../Material');
// const MyStorage = require('../GlobalFunc/MyStorage');
const $ = window.$ = require('jquery');
const React = require('react');
const OnFire = require('onfire.js');

class Actions {
    /**
     * 根据ID 发送不同的请求
     * 得到结果后设置 pay free
     * @param courseId 传入课程ID
     */
    static ifCourseSignUp(courseId) {
        let ajaxResult = {};
        //重置数据
        MyStorage.deleteCourseStatus(courseId);
        courseId = parseInt(courseId);
        //根据不同的id调用接口
        switch (courseId) {
            case 2:
                //判断是否是21报名(因为接口未统一)
                Material.getJudgeFromServer21().then((result)=>{
                    if(typeof (result) === 'boolean') {
                        ajaxResult.pay = result;
                    } else {
                        ajaxResult = result;
                        //已购买
                        if(result.qqGroup) {
                            ajaxResult.pay = true;
                        } else {
                            ajaxResult.pay = false;
                        }
                    }
                    // saveMyStorage 保存到课程列表中
                    MyStorage.setCourseStatus(courseId,ajaxResult);
                });
                break;
            default:
                //判断是否是21报名(因为接口未统一)
                Material.getJudgeFromServer(courseId).then((result)=>{
                    if(typeof (result === 'boolean')) {
                        ajaxResult.pay = result;
                    } else {
                        ajaxResult = result;
                        //已购买
                        if(result.data.qqGroup) {
                            ajaxResult.pay = true;
                        } else {
                            ajaxResult.pay = false;
                        }
                    }
                    // saveMyStorage 保存到课程列表中
                    MyStorage.setCourseStatus(courseId,ajaxResult);
                });
                break;
        }
    }

    static getUesrExpInfo() {
        Material.getExpInfo().then((result)=>{
            GlobalExp.setExpInfo(result);
        });
    }

    //down 想要的时候试图获取
    //get 监听这个广播
    //action 如果调用的时候没有(*)
    //saveMyStorage 获取到了之后 保存
    //call all 保存之后 广播


    // /**
    //  * 检查用户购买状态
    //  */
    // static checkUserPayStatue(courseId) {
    //     console.log('enter');
    //     let returnValue;
    //     returnValue = MyStorage.getCourseStatus(courseId);
    //     return new Promise((reslove,reject)=>{
    //         if(!returnValue) {
    //             Material.getJudgeFromServer(courseId).done((result)=>{
    //                 if(result){
    //                     returnValue = 'pay'
    //                 } else {
    //                     returnValue = 'pay'
    //                 }
    //                 reslove(returnValue);
    //             }).fail(()=>{
    //
    //             });
    //         } else {
    //             reslove(returnValue);
    //         }
    //     });
    // }
}



module.exports = Actions;