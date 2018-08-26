/**
 * Created by Administrator on 16-9-28.
 */
var $ = require('jquery');
var User = require('./User');
const Tools = require('./GlobalFunc/Tools');
//奖品信息
var PRIZE_INFO = [];

//兑换奖品记录
var PRIZE_RECORD = [];


const BACKUP_QQ = [
    {
        QQNum: 'Max后备群1', //QQ群号
        QQLink: 'www.baidu.com', //QQ群链接
        QQCode: 'Max后备群1' //QQ暗号
     },
    {
        QQNum: 'Max后备群2', //QQ群号
        QQLink: 'www.baidu.com', //QQ群链接
        QQCode: 'Max后备群2' //QQ暗号
    },
    {
        QQNum: 'Max后备群3', //QQ群号
        QQLink: 'www.baidu.com', //QQ群链接
        QQCode: 'Max后备群3' //QQ暗号
    }
];

class Material {
    /**
     * 获取链接中的参数内容
     * @param key
     * @returns {Array}
     */
    static getUrlPara( key ) {
        let href = location.href,
            res = href.split( key + '=' );

        if( res[1] ) {
            res = decodeURIComponent(res[1].split('&')[0]);
        }else {
            res = null;
        }
        return res;
    }


    static getJudgeFromServerPromise() {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_judge_signup');
        let userInfo = User.getUserInfo();
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    url: apiUrl,
                    type: 'put',
                    cache: false,
                    contentType: 'application/json;charset=utf-8',
                    headers: {
                        Accept: 'application/json'
                    },
                    beforeSend: (request)=>{
                        request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                        request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                    }
                }
            )
        }).then(data => {
            resolve(data)
        }, err => {
            reject(err)
        })
    }

    static getJudgeFromServer(courseId) {
        //接口合并未上线
        // courseId = 1;
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_judge_signup').replace('{courseId}',courseId);
        let userInfo = User.getUserInfo();
        const Tools = require('./GlobalFunc/Tools');
        //改成异步
        return new Promise((resolve,reject)=>{
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                let userInfo = User.getUserInfo();
                let jqxhr = $.ajax(
                    {
                        url: apiUrl,
                        type: 'put',
                        cache: false,
                        contentType: 'application/json;charset=utf-8',
                        headers: {
                            Accept: 'application/json'
                        },
                        beforeSend: (request)=>{
                            request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                            request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                        }
                    }
                );
                jqxhr.done((data)=>{
                    resolve(data)
                });
                jqxhr.fail((data)=>{
                    reject(data)
                })
            })
        });
    }

    static getCanUserShareFreeSub (userId) {
        const User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_judge_signup');
        const userid = userId || User.getUserInfo().userId;
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userId);
                }
            }
        )
    }

    static getCanUserShareFreeSubPromise (userId) {
        const User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_judge_signup');
        const userid = userId || User.getUserInfo().userId;
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    url: apiUrl,
                    type: 'get',
                    cache: false,
                    contentType: 'application/json;charset=utf-8',
                    headers: {
                        Accept: 'application/json'
                    },
                    beforeSend: (request)=>{
                        request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                        request.setRequestHeader("X-iChangTou-Json-Api-User", userId);
                    }
                }
            )
        }).then(data => {
            resolve(data)
        }, err => {
            reject(err)
        })
    }

    /*获取笔记卡内容*/
    static getNoteCardText (courseId) {
        const User = require('./User')
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_notes').replace('{dayId}', courseId);
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", User.getUserInfo().userId);
                }
            }
        )
    }

    /**
     * 获取fm信息
     * @param fmid
     */
    static getFmInfoFromServer(fmid) {
        console.log('fmid');
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_fmid_info').replace('{fmId}',fmid);
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", User.getUserInfo().userId);
                }
            }
        )
    }

    /**
     * 更新学习时间
     * @param fmid
     * @param duration 秒
     * @returns {*}
     */
    static updateLearningTime() {
        const Util = require('./Util');
        const User = require('./User');

        let userInfo = User.getUserInfo();
        let apiUrl = Util.getAPIUrl('post_audio_time'); //打卡

        let jsonData = JSON.stringify({
            fmid: 0,
        });

        return $.ajax({
            url: apiUrl,
            data: jsonData,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }
        });
    }


    /**
     * 获取后备QQ号
     * @returns {*[]}
     */
    static getBackupQQ() {
        return BACKUP_QQ;
    }

    /**
     *  本地获取所有奖品信息
     * @returns {Array}
     */
    static getAllPrize() {
        return PRIZE_INFO;
    }

    /**
     * 服务器获取所有奖品信息
     * @returns {*}
     */
    static getPrizeFromServer(userId) {
        let apiUrl = Util.getAPIUrl('get_prize');

        return $.ajax({
            url: apiUrl,
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            },
            success: (prizeInfo)=>{
                PRIZE_INFO = prizeInfo;
            }
        });
    }


    /**
     *  本地获取产品兑换记录
     * @returns {Array}
     */
    static getPrizeExchangeRecord() {
        return PRIZE_RECORD;
    }

    /**
     *  获取奖品兑换记录
     * @returns {*}
     */
    static getExchangeRecord(userId) {
        let apiUrl = Util.getAPIUrl('get_exchange_record');

        return $.ajax({
            url: apiUrl,
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            },
            success: (prizeRecord)=>{
                //奖品兑换记录
                PRIZE_RECORD = prizeRecord;
            }
        });
    }

    /**
     *  兑换奖品请求
     * @returns {*}
     */
    static postExchangePrize(id) {
        let apiUrl = Util.getAPIUrl('exchange_prize').replace('id',id);

        var User = require('./User');
        let userInfo = User.getUserInfo();

        return $.ajax({
            url: apiUrl,
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'text',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }

        });
    }

    /**
     * 获取上线信息
     * @returns {*}
     */
    static getSeniorInfoFromServer(seniorId) {
        //21eval/user/parent-profile
        let apiUrl = Util.getAPIUrl('get_senior_info');

        return $.ajax({
            url: apiUrl,
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", seniorId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }

        });
    }

    /***
     * 获取报名人数
     * @param albumId
     * @returns {*}
     */
    static getRegistered() {
        console.log('123123123')
        let courseId = sessionStorage.getItem('courseId');
        const Util = require('./Util');
        const User = require('./User');

        let apiUrl = Util.getAPIUrl('get_registered').replace('{courseId}',courseId);

        return $.ajax({
            url: apiUrl,
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", User.getUserInfo().userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }
        });
    }

    /***
     * 获得关卡列表
     */
    static getCourseList(courseId) {
        const Util = require('./Util');
        const User = require('./User');

        // let userInfo = User.getUserInfo();
        let apiUrl = Util.getAPIUrl('get_course_list').replace('{courseId}',courseId);
        const Tools = require('./GlobalFunc/Tools');
        let userInfo = User.getUserInfo();
        //改成异步
        return new Promise((resolve,reject)=>{
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                let jqxhr = $.ajax({
                    url: apiUrl,
                    type: 'get',
                    cache: false,
                    contentType: 'application/json;charset=utf-8',
                    headers: {
                        Accept:"application/json"
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("X-iChangTou-Json-Api-User", User.getUserInfo().userId);
                        request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    }
                });
                jqxhr.done((data)=>{
                    resolve(data)
                });
                jqxhr.fail((data)=>{
                    reject(data)
                });
            });
        });
    }

    /***
     * 获得课程进度和内容
     */
    static getCourseProgress(dayId){
        let url = Util.getAPIUrl('get_course_progress').replace('{dayId}',dayId);
        let type = 'get';
        return (this.ajaxSomeUrl(url,type));
    }

    /***
     *上传作业
     */
    static finishWork(type,id){
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('finish_work').replace('{type}',type).replace('{id}',id);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'put',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    /***
     *已经听过课
     */
    static haveStartLesson(id){
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('have_start_lesson').replace('{fmid}',id);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'put',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    /***
     * 判断宝箱情况
     */
    static getTreasureInfo() {
        let courseId = sessionStorage.getItem('courseId');
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_treasure_info').replace('{courseId}',courseId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'put',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    /***
     * 打开宝箱
     */
    static openTreasure() {
        let courseId = sessionStorage.getItem('courseId');
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('open_treasure').replace('{courseId}',courseId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'put',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    /***
     * 获取排名
     */
    static courseFinishRank(dayId,userId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_course_finish_rank').replace('{userId}',userId).replace('{dayId}',dayId);
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userId);
                }
            }
        )
    }

    /***
     * 毕业排名
     */
    static getGraduatedRank(courseId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_graduated_finish_rank').replace('{courseId}',courseId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    /***
     * 获取头像
     */
    static getOtherHeadImage(userId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_other_headinfo').replace('{userId}',userId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }




    /***
     * 下线分享报名
     */
    static FreeShareSignUp(userId,username) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('put_free_share').replace('{userId}',userId).replace('{username}',username);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'put',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    //数据上报
    static postData(eventName) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('post_statistic_data');
        let userInfo = User.getUserInfo();
        let jsonData;
        if(sessionStorage.getItem('courseId') === '1') {
            jsonData = JSON.stringify({
                eventName: eventName,
                version: 21,
            })
        } else {
            jsonData = JSON.stringify({
                eventName: eventName,
                version: 20,
            })
        }
        // alert(eventName + '/' + userInfo.userId);
        return $.ajax(
            {
                url: apiUrl,
                type: 'post',
                data: jsonData,
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    /***
     * 获得上线课程免费报名的名额信息
     */
    static getCourseShareInfo(userId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_course_share_info').replace('{userId}',userId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    //基金课
    /***
     * 获得上线免费报名的名额信息
     */
    static getShareInfo(userId,dayId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_shares_info').replace('{userId}',userId).replace('{dayId}',dayId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }



    //获取免费课程
    static GetFreeShareLesson(userId,dayId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_free_lesson');
        let userInfo = User.getUserInfo();
        let jsonData = JSON.stringify({
            userId: userId,
            dayId: dayId,
        });
        // alert(eventName + '/' + userInfo.userId);
        return $.ajax(
            {
                url: apiUrl,
                type: 'post',
                data: jsonData,
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    //查询上线当天课程按时完成,获得对应的分享权限.
    static getUpstreamShare(dayId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_upstream_share').replace('{dayId}',dayId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'put',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    //获取用户基本信息
    static getUserAdvanceInfo(userId) {
        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_advance_user_info').replace('{userId}',userId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'get',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }


    //获取用户评论
    static getUserComment(dayId) {
        dayId = '20160809';
        let pageIndex = 1;
        const Util = require('./Util'),
            User = require('./User');

        //{fmId}/{pageSize}/{pageIndex}

        let userInfo = User.getUserInfo(),
            apiUrl = Util.getAPIUrl('get_next_page_comment').replace('{fmId}',dayId).replace('{pageSize}',20).replace('{pageIndex}',pageIndex);

        return $.ajax({
            url: apiUrl,
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }
        });
    }

    /***
     * 获取报名人数21
     * @param albumId
     * @returns {*}
     */
    static getRegistered21() {
        const Util = require('./Util');
        const User = require('./User');

        let apiUrl = Util.getAPIUrl('get_activity_status');

        return $.ajax({
            url: apiUrl,
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-User", User.getUserInfo().userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }
        });
    }

    /***
     * 获取是否报名人数
     * @param albumId
     * @returns {*}
     */


    /***
     * 21上报下线访问
     * @param albumId
     * @returns {*}
     */
    static recordSeniorEnter(seniorId) {
        //接口合并未上线
        // courseId = 1;
        var User = require('./User');
        const Util = require('./Util'),
              apiUrl = Util.getAPIUrl('post_record_info').replace("{parentId}", seniorId);
        let userInfo = User.getUserInfo();
        return $.ajax(
            {
                url: apiUrl,
                type: 'post',
                cache: false,
                contentType: 'application/json;charset=utf-8',
                headers: {
                    Accept: 'application/json'
                },
                beforeSend: (request)=>{
                    request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                }
            }
        )
    }

    static getJudgeFromServer21() {
        //接口合并未上线
        // courseId = 1;

        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('has_registered');
        let userInfo = User.getUserInfo();
        const Tools = require('./GlobalFunc/Tools');
        //改成异步
        return new Promise((resolve,reject)=>{
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                let userInfo = User.getUserInfo();
                let jqxhr = $.ajax(
                    {
                        url: apiUrl,
                        type: 'post',
                        cache: false,
                        contentType: 'application/json;charset=utf-8',
                        headers: {
                            Accept: 'application/json'
                        },
                        beforeSend: (request)=>{
                            request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                            request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                        }
                    }
                )
                jqxhr.done((data)=>{
                    resolve(data)
                })
                jqxhr.fail((data)=>{
                    reject(data)
                })
            })
        })
    }

    static getGroupInfo(courseId) {
        //接口合并未上线
        // courseId = 1;

        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = Util.getAPIUrl('get_qq_info').replace("{courseId}",courseId);
        let userInfo = User.getUserInfo();
        const Tools = require('./GlobalFunc/Tools');
        //改成异步
        return new Promise((resolve,reject)=>{
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                let userInfo = User.getUserInfo();
                let jqxhr = $.ajax(
                    {
                        url: apiUrl,
                        type: 'get',
                        cache: false,
                        contentType: 'application/json;charset=utf-8',
                        headers: {
                            Accept: 'application/json'
                        },
                        beforeSend: (request)=>{
                            request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                            request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                        }
                    }
                )
                jqxhr.done((data)=>{
                    resolve(data)
                })
                jqxhr.fail((data)=>{
                    reject(data)
                })
            })
        })
    }

    /***
     * 21天是否开课
     */
    static getStartClassCourse21() {
        const Util = require('./Util');
        const User = require('./User');

        // let userInfo = User.getUserInfo();
        let apiUrl = Util.getAPIUrl('start_class_21');
        const Tools = require('./GlobalFunc/Tools');
        let userInfo = User.getUserInfo();
        //改成异步
        return new Promise((resolve,reject)=>{
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                let jqxhr = $.ajax({
                    url: apiUrl,
                    type: 'get',
                    cache: false,
                    contentType: 'application/json;charset=utf-8',
                    headers: {
                        Accept:"application/json"
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("X-iChangTou-Json-Api-User", User.getUserInfo().userId);
                        request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                    }
                });
                jqxhr.done((data)=>{
                    resolve(data)
                });
                jqxhr.fail((data)=>{
                    reject(data)
                });
            });
        });
    }

    //获取开课信息
    static getStartClassInfo(courseId) {
        let url = Util.getAPIUrl('get_start_class_info').replace("{courseId}",courseId);
        let type = 'get';
        return (this.ajaxSomeUrl(url,type));
    }

    //获取开课信息
    static getHomeworkByDay(dayId) {
        let url = Util.getAPIUrl('get-day-homework').replace("{dayId}",dayId);
        let type = 'get';
        return (this.ajaxSomeUrl(url,type));
    }

    //提交
    static postUserInfo(data) {
        let url = Util.getAPIUrl('post-user-info');
        return (this.ajaxPostSomeUrl(url,data));
    }

    //获取开课信息
    static postHomeworkAnswerById(itemIdArray,answerArray) {
        let answers = [];
        for(let i = 0; i < itemIdArray.length; i++) {
            answers[i] = {};
            answers[i].answer = answerArray[i];
            answers[i].questionId = itemIdArray[i];
        }

        let url = Util.getAPIUrl('post-day-homework');
        var User = require('./User');
        const Tools = require('./GlobalFunc/Tools');
        let userInfo = User.getUserInfo();
        return new Promise((resolve,reject)=>{
            let answersInner = answers;
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                //批量提交
                let jsonData = JSON.stringify({
                    userId: userInfo.userId,
                    answers: answersInner,
                });
                this.ajaxPostSomeUrl(url,jsonData).then((data)=>{
                    resolve(data);
                });
            });
        })

    }

    //提交评论
    static postCommentByDayId(dayId,answer) {
        let url = Util.getAPIUrl('post-comment');
        let data = {
            comment: answer,
            dayId: dayId,
        }
        data = JSON.stringify(data);
        return (this.ajaxPostSomeUrl(url,data));
    }

    //提交喜欢
    static postLikeCommment(dayId,commentId) {
        let type = 'post';
        let url = Util.getAPIUrl('choose-like-comment').replace('{commentId}',commentId).replace('{dayId}',dayId);
        return (this.ajaxSomeUrl(url,type));
    }

    //提交喜欢
    static DeleteDislikeCommment(dayId,commentId) {
        let type = 'delete';
        let url = Util.getAPIUrl('choose-dislike-comment').replace('{commentId}',commentId).replace('{dayId}',dayId);
        return (this.ajaxSomeUrl(url,type));
    }


    //获取通用报名信息
    static getPayPageInfo(courseId) {
        let url = Util.getAPIUrl('get_pay_page_info').replace('{courseId}',courseId);
        let type = 'get';
        return (this.ajaxSomeUrl(url,type));
    }

    //获取评论信息
    static getCommentInfo(dayId) {
        let pageIndex = 1;
        let pageSize = 20;
        let url = Util.getAPIUrl('get-comment');
        let type = 'get';
        return (this.ajaxSomeUrl(url,type));
    }

    //Get用户经验
    static getExpInfo() {
        let url = Util.getAPIUrl('get-user-exp');
        url = Util.getTestAPI(url);
        let type = 'get';
        return (this.ajaxSomeUrl(url,type));
        // return (this.testAjax(0));
    }

    //Put用户签到,获得经验
    static putSignUp() {
        let url = Util.getAPIUrl('put-sign-in');

        url = Util.getTestAPI(url);
        let type = 'put';
        return (this.ajaxSomeUrl(url,type));
        // return (this.testAjax(1));
    }

    //get用户签到否?
    static getSignUpStatus() {
        let url = Util.getAPIUrl('get-sign-status');
        url = Util.getTestAPI(url);
        let type = 'get';
        return (this.ajaxSomeUrl(url,type));
        // return (this.testAjax(2));
    }

    static testAjax(type) {
        let data;
        return new Promise((resolve,reject)=>{
            switch (type) {
                case 0:
                    data = {
                        level: 1,
                        levelExp: 60,
                        userExp: 20,
                    };
                    break;
                case 1:
                    data = {
                        value: 200,
                    }
                    break;
                case 2:
                    data = true;
                    break;
                default:
                    break;
            }
            resolve(data)
        })
    }

    static ajaxPostSomeUrl(url,json) {
        //接口合并未上线
        // courseId = 1;

        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = url;
        let userInfo = User.getUserInfo();
        const Tools = require('./GlobalFunc/Tools');
        //改成异步
        return new Promise((resolve,reject)=>{
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                let userInfo = User.getUserInfo();
                let jqxhr = $.ajax(
                    {
                        data: json,
                        url: apiUrl,
                        type: 'post',
                        cache: false,
                        contentType: 'application/json;charset=utf-8',
                        headers: {
                            Accept: 'application/json'
                        },
                        beforeSend: (request)=>{
                            request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                            request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                        }
                    }
                );
                jqxhr.done((data)=>{
                    resolve(data)
                });
                jqxhr.fail((data)=>{
                    reject(data)
                })
            })
        })
    }

    static ajaxSomeUrl(url,type) {
        //接口合并未上线
        // courseId = 1;

        var User = require('./User');
        const Util = require('./Util'),
            apiUrl = url;
        let userInfo = User.getUserInfo();
        const Tools = require('./GlobalFunc/Tools');
        //改成异步
        return new Promise((resolve,reject)=>{
            Tools.fireRace(userInfo.userId,"OAUTH_SUCCESS").then(()=>{
                let userInfo = User.getUserInfo();
                let jqxhr = $.ajax(
                    {
                        url: apiUrl,
                        type: type,
                        cache: false,
                        contentType: 'application/json;charset=utf-8',
                        headers: {
                            Accept: 'application/json'
                        },
                        beforeSend: (request)=>{
                            request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                            request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                        }
                    }
                );
                jqxhr.done((data)=>{
                    resolve(data)
                });
                jqxhr.fail((data)=>{
                    reject(data)
                })
            })
        })
    }




}
window.Material = Material;

module.exports = Material;
