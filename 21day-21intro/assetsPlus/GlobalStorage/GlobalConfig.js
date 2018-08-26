/**
 * Created by ichangtou on 2017/7/21.
 */
//课程id表
    //1添加课程请增加 课程信息 和 分享 和路由表
// const courseIdList = [0,1,2,1003];
//随便写的临时的
// const couseIdNameMap = new Map();
// const couseIdName = {};
// `./assetsPlus/image/${GlobalConfig.getCourseName()}/course_select_title.png`
// Statistics.postDplusData('');
// Statistics.postDplusData('',[]);

const courseInfo = {
    '-1':{
        shareTitle: '长投派,每天进步一点点的行动派',
        shareDesc: '生活变得不一样',
    },

        '1004':{//课程ID
            show: 2,//0 不展示 1 跳转url连接 2项目内部
            mainImage: `./assetsPlus/image/home/course1004.png`,//展示图片
            name: 'courseBeta',//模板名称
            path: 'courseBeta',
            title: '入门课',
            shareTitle: '欢迎你加入长投派,开始你的学习之旅',//分享标题
            shareDesc: '长投派带你体验财富自由',//分享描述
        },

    '1000':{
        //常规
        name: 'courseBeta',
        path: 'courseBeta',
        show: 0,
        // router: '/courseBeta',//默认路由前缀`
        //描述
        title: '长投派',
        //报名
        // payPicLength: 4,//报名页图片长度
        price: [9,6],//价格
        //分享
        shareTitle: '欢迎你加入长投派,开始你的学习之旅',//分享标题
        shareDesc: '长投派带你体验财富自由',//分享描述
    },

        //5本书
        '2001':{
            //常规
            //show 0 1 2 2both 1 just show 0 null
            show: 1,
            mainImage: `./assetsPlus/image/home/course_book5.png`,
            href: '123',
            name: 'courseBeta',
            path: 'https://h5.ichangtou.com/minic/indexVinda.html#/tinycourse/1/index',
            // router: '/courseBeta',//默认路由前缀`
            //描述
            title: '长投派',
            //报名
            // payPicLength: 4,//报名页图片长度
            price: [9,6],//价格
            //分享
            shareTitle: '欢迎你加入长投派,开始你的学习之旅',//分享标题
            shareDesc: '长投派带你体验财富自由',//分享描述
        },

        //5险1斤
        // '2002':{
        //     show: 1,
        //     mainImage: `./assetsPlus/image/home/course_fund51.png`,
        //     href: '456',
        //     //常规
        //     name: 'courseBeta',
        //     path: 'https://h5.ichangtou.com/minic/indexVinda.html#/tinycourse/2/index',
        //     // router: '/courseBeta',//默认路由前缀`
        //     //描述
        //     title: '长投派',
        //     //报名
        //     // payPicLength: 4,//报名页图片长度
        //     price: [9,6],//价格
        //     //分享
        //     shareTitle: '欢迎你加入长投派,开始你的学习之旅',//分享标题
        //     shareDesc: '长投派带你体验财富自由',//分享描述
        // },

    '2':{
        //常规
        show: 0,
        name: 'course21',
        path: 'course21',
        router: '/course21',//默认路由前缀`
        //描述
        title: '21天训练营',
        //报名
        // payPicLength: 4,//报名页图片长度
        price: [9,6],//价格
        //分享
        shareTitle: '超过10万+的人都追捧的理财入门课，还不快来吗？',//分享标题
        shareDesc: '只要一顿早餐的钱，点击报名！',//分享描述

        shareOther: [
            //听课证
            {
                title: '',
                desc: '',
            }
        ]
    },
    '0':{
        show: 2,
        mainImage: './assetsPlus/image/home/course_seven.png',
        name: 'seven',
        path: 'seven',
        price: [9,3],
        title: '7天训练营',
        router: '/seven',
        shareTitle: '和我一起提高财商吧',
        shareDesc: '邀请你一起参加7天财商训练营',

        shareOther: [
            //听课证
            {
                title: '',
                desc: '',
            }
        ]
    },
    '1':{
        show: 2,
        mainImage: `./assetsPlus/image/home/course_fund.png`,
        name: 'fund',
        path: 'fund',
        price: [9,3],
        title: '基金课',
        router: '/fund',
        shareTitle: '14天带你躺赢基金定投！一天10分钟，手把手教你！',
        shareDesc: '宝宝618不再担心没钱买买买啦',
    },
    '3':{
        show: 0,
        path: 'stock0',
        name: 'stock0',
        price: [59,59],
        title: '股票课',
    },
    '1003':{
        show: 0,
        path: 'courseBeta',
        name: 'courseBeta',
        price: [69,69],
        title: 'beta',
    },
};

const betaInfo = {
    courseId: '1003',
};

//为了配置路由
const routerInfo = {
    '-1': '',
    '0': 'seven',
    '1': 'fund',
    '2': 'course21',
    //长投家页面
    'main': 'main',
    'homelist': 'homelist',
    'homeinfo': 'homeinfo',
    'pay': 'payPage',
    'listen': 'listenCourse',
    'select': 'courseSelect',
    // 'begin': 'courseBegin',
    // 'graduated': 'getGraduated',
    'begin': 'courseBegin',
    'reward': 'getReward',
    'graduate': 'getGraduated',
    'homework': 'homeWork',
};

//为了数据上报
const pageToName = {
    //长投家页面
    'entryJs': '入口_文件',
    'main': '长投派_页面',
    'homelist': '长投派_课程列表_页面',
    'homeinfo': '长投派_个人信息_页面',
    'payPage': '支付_页面',
    'listenCourse': '听课_页面',
    'courseSelect': '课程列表_页面',
    // 'begin': 'courseBegin',
    // 'graduated': 'getGraduated',
    'courseBegin': '开课证_页面',
    'getReward': '成就卡_页面',
    'getGraduated': '毕业证_页面',
    'homework': '简答题_页面',
};


class GlobalConfig {
    /**
     *
     * @param courseId 课程编号
     * @param shareType 界面名称
     * @returns {{}}
     * 界面名称有两种 1 预设好的界面名称.作为进入每个界面自动触发的分享.
     * 2自定义的额外界面.作为一个界面需要有两种以上的分享(判定逻辑)
     */
    static getShareInfo(courseId,shareType,params) {
        if(!params) {
            params = {};
        }
        courseId = parseInt(courseId);
        let shareInfo =
        {
            '-1': {
                'default': {
                    title: '长投派,每天进步一点点的行动派',
                    desc: '生活变得不一样',
                    link: ''
                }
            },
            '1003': {
                //默认到报名页
                'default': {
                    title: '邀请你参加最新的股票课内测版',
                    desc: '欢迎小伙伴多多参与',
                    link: `&goPath=${GlobalConfig.getRouterInfo('pay')}&courseId=${sessionStorage.getItem('courseId')}&getWhere=share`,
                },
            },
            '0': {
                'default': {
                    title: '和我一起提高财商吧',
                    desc: '邀请你一起参加7天财商训练营',
                    link: `&goPath=${GlobalConfig.getRouterInfo('pay')}&courseId=${sessionStorage.getItem('courseId')}&getWhere=share`
                },
                'getReward': {
                    title: `我是第${params.rank}名完成${params.courseName}课的人，快来看看我的成就卡吧！`,
                    desc: '快比比谁的财商更高吧?',
                    link: `&goPath=${GlobalConfig.getRouterInfo('reward')}&courseId=${sessionStorage.getItem('courseId')}&name=${params.name}&rank=${params.rank}&dayId=${params.dayId}&getWhere=share`
                },
                'getGraduated': {
                    title: `经过7天的学习，我成为第${params.rank}个完成财商训练营的人！`,
                    desc: '快来看看我的毕业证！',
                    link: `&goPath=${GlobalConfig.getRouterInfo('graduate')}&courseId=${sessionStorage.getItem('courseId')}&name=${params.name}&rank=${params.rank}&getWhere=share`
                }
            },
            '1': {
                'default': {
                    title: '14天带你躺赢基金定投！一天10分钟，手把手教你！',
                    desc: '宝宝618不再担心没钱买买买啦',
                    link: `&goPath=${GlobalConfig.getRouterInfo('pay')}&courseId=${sessionStorage.getItem('courseId')}&getWhere=share`
                },
                'getReward': {
                    title: `今天我第${params.rank}名，Get到了“${params.dayTitle}”！快看我的成就卡！`,
                    desc: '基金定投很简单',
                    link: `&goPath=${GlobalConfig.getRouterInfo('reward')}&courseId=${sessionStorage.getItem('courseId')}&name=${params.name}&rank=${params.rank}&dayId=${params.dayId}&getWhere=share`

                },
                'getRewardFree': {
                    title: `今天我是第${params.rank}名，Get到了“${params.dayTitle}”！这是我赢得的免费学习课！`,
                    desc: '先到先得哦!',
                    link: `&goPath=${GlobalConfig.getRouterInfo('reward')}&courseId=${sessionStorage.getItem('courseId')}&name=${params.name}&rank=${params.rank}&dayId=${params.dayId}&freeLesson=${params.freeLesson}&getWhere=share`

                },
                'getGraduated': {
                    title: `经过14天的学习，我成为第${params.rank}个完成基金训练营的人！`,
                    desc: '快来为我点个赞吧！',
                    link: `&goPath=${GlobalConfig.getRouterInfo('graduate')}&courseId=${sessionStorage.getItem('courseId')}&name=${params.name}&rank=${params.rank}&getWhere=share`
                }
            },
            '2': {
                //默认到报名页
                'default': {
                    title: '超过10万+的人都追捧的理财入门课，还不快来吗？',
                    desc: '只要一顿早餐的钱，点击报名！',
                    link: `&goPath=${GlobalConfig.getRouterInfo('pay')}&courseId=${sessionStorage.getItem('courseId')}&getWhere=share`,
                },
                //开课证页面
                'courseBegin': {
                    title: '快看我的录取通知书！',
                    desc: '我在参加21天训练营',
                    link: `&goPath=${GlobalConfig.getRouterInfo('begin')}/other&courseId=${sessionStorage.getItem('courseId')}&getWhere=share`,
                },
                //开课证页面
                'listenCourse': {
                    title: '今天的学习任务我又搞定啦，你也和我一起参加吧！',
                    desc: '我在参加21天训练营',
                    link: `&goPath=${GlobalConfig.getRouterInfo('pay')}&courseId=${sessionStorage.getItem('courseId')}&getWhere=share`,
                }
            },
            '3': {
                //默认到报名页
                'default': {
                    title: '我是股票课',
                    desc: '只要一顿早餐的钱，点击报名！',
                    link: `&goPath=${GlobalConfig.getRouterInfo('pay')}&courseId=${sessionStorage.getItem('courseId')}&getWhere=share`,
                },
            },
        };

        let getCourseDefault = shareInfo[courseId];
        if(!getCourseDefault) {
            getCourseDefault = shareInfo[-1]
        }
        let getCourseShare = getCourseDefault[shareType];
        if(!getCourseShare) {
            getCourseShare = getCourseDefault['default'];
        }
        return getCourseShare;
        return finalResult;
    }

    //获得课程配置常量
    static getCourseInfo(courseId) {
        // let nameKey = couseIdNameMap.get(courseId);
        let localCourseInfo = courseInfo[courseId];
        // if(!localCourseInfo) {
        //     localCourseInfo = courseInfo[1000];
        // }
        return localCourseInfo;
    }


    //常用名换router路径
    static getRouterInfo(key) {
        let result = routerInfo[key];
        if(result) {
            return result
        } else {
            return 'payPage';
        }
    }

    //数据上报的字典对应
    static getRouterName(key) {
        let result = pageToName[key];
        if(result) {
            return result
        } else {
            return key;
        }
    }

    //获取课程名称(实际上等同于先取出来课程信息.在读取名字.但是统一这边获取.)
    static getCourseName() {
        return this.getCourseInfo(sessionStorage.getItem('courseId')).name
    }

    //获取听课模板
    static getCoursePath() {
        return this.getCourseInfo(sessionStorage.getItem('courseId')).path
    }

    static getBetaInfo() {
        return betaInfo;
    }

    static getCourseIdList() {
        let courseIdList = [];
        let orderedArray = [];
        // let rankList = [2001,0,1,1003,2];
        let rankList = [2001,1004,0,1,1003,2];
        for( let i = 0; i < rankList.length; i++) {
            orderedArray.push(String(rankList[i]))
        }

        return orderedArray;
    }
}
// let finalResult = {};
// switch (courseId) {
//     case -1:
//         switch (shareType) {
//             default:
//                 finalResult = {
//                     title: '长投派,每天进步一点点的行动派',
//                     desc: '生活变得不一样',
//                     link: ''
//                 }
//         }
//         break;
//     case 0:
//         switch (shareType) {
//             case 'getReward':
//                 finalResult = {
//                     title: `我是第 ${arguments[0]} 名完成'+ ${arguments[1]}  + '课的人，快来看看我的成就卡吧！`,
//                     desc: '快比比谁的财商更高吧?',
//                     link: ''
//                 };
//                 break;
//             default:
//                 finalResult = {
//                     title: '和我一起提高财商吧',
//                     desc: '邀请你一起参加7天财商训练营',
//                     link: ''
//                 }
//         }
//         break;
//     case 1:
//         switch (shareType) {
//             case 'getReward':
//                 finalResult = {
//                     title: `我是第 ${arguments[0]} 名完成'+ ${arguments[1]}  + '课的人，快来看看我的成就卡吧！`,
//                     desc: '快比比谁的财商更高吧?',
//                     link: ''
//                 };
//                 break;
//             default:
//                 finalResult = {
//                     title: '14天带你躺赢基金定投！一天10分钟，手把手教你！',
//                     desc: '宝宝618不再担心没钱买买买啦',
//                     link: ''
//                 }
//         }
//         break;
//     case 2:
//         switch (shareType) {
//             case 'courseBegin':
//                 finalResult = {
//                     title: '快看我的录取通知书！',
//                     desc: '我在参加21天训练营',
//                     link: `&goPath=${GlobalConfig.getRouterInfo('reward0')}
//                            &courseId=${sessionStorage.getItem('courseId')}`,
//                 };
//                 break;
//             default:
//                 finalResult = {
//                     title: '超过10万+的人都追捧的理财入门课，还不快来吗？',
//                     desc: '只要一顿早餐的钱，点击报名！',
//                     link: `&goPath=${GlobalConfig.getRouterInfo('pay')}
//                            &courseId=${sessionStorage.getItem('courseId')}`,
//                 }
//         }
//         break;
//     default:
//         finalResult = {
//             title: '长投派,每天进步一点点的行动派',
//             desc: '生活变得不一样',
//         }
// }

module.exports = GlobalConfig;
window.GlobalConfig = GlobalConfig;