/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const User = require('../../User');

const Config = require('../../Config');
const DoneToast = require('../../component/DoneToast');
const LessonBar = require(`../../component/course21/LessonBar`);
const FixedBg = require('../../component/course/FixedBg');
const IconBar = require('../../component/course/IconBar');

const Tools = require('../../GlobalFunc/Tools');




const CourseSelect = React.createClass({
    getInitialState: function() {
        return {
            courseList: {},
            tips:[],
            // treasure: {
            //     status: -1,
            //     haveOpen: true,
            //     canOpen: false,
            //     canView: false,
            // },
            allLessonStatus: 'NotAll',//所有课程都完成状态
            allowLesson: '',//用户听课权限
            topBarStatus: [
                false,true,false
            ],
            iconImg:[
                [
                    "./assetsPlus/image/course/indDiplomaDisabled.png",
                    "./assetsPlus/image/course/indDiplomaNormal.png",

                ],
                [
                    "./assetsPlus/image/course/indQQDisabled.png",
                    "./assetsPlus/image/course/indQQNormal.png",
                ],
                [
                    "./assetsPlus/image/course/indGiftDisabled.png",
                    "./assetsPlus/image/course/indGiftNormal.png",
                ]
            ],
            rewardImg: "./assetsPlus/image/course/indNote.png",
            qqStatus: 2,
            courseId: sessionStorage.getItem('courseId'),
            groupInfo: {},
            homeWorkStatus: [],
        };
    },

    componentWillMount() {
        MyStorage.whenEnterPage('select');
        let courseId = sessionStorage.getItem('courseId');
        Tools.fireRaceCourse(courseId).then((value)=>{
            if(value.qqGroup) {
                this.state.groupInfo.qq = value.qqGroup;
                this.state.groupInfo.link = value.qqGroupUrl;
                this.state.groupInfo.secret = value.secret;
                this.setState({groupInfo: this.state.groupInfo});
            }
            this.state.allowLesson = value.pay;
            this.setState({allowLesson: this.state.allowLesson});
            this.init();
        });
    },

    init() {
        // if (!User.getUserInfo().subscribe) {
        //     DoneToast.show('赶紧关注公众号"长投"，"长投"，"长投"，每天陪你一起学习哟~');
        // }
        //0.获取听课列表
        this.getCourseList();
    },


    getCourseList () {
        Material.getCourseList(this.state.courseId).then( (data) => {
            this.state.courseList = data;
            this.setState({courseList: this.state.courseList});
            // this.getHomeWorkStatus()
        })
    },

    //获取作业状态
    getHomeWorkStatus() {
        let courseList = this.state.courseList;
        let dayIdArrays = [];
        let promiseArray = [];
        for(let i = 0; i < courseList.length; i++) {
            if(courseList[i].homework === 'Y' && (courseList[i].status).toString() !== '-1') {
                dayIdArrays.push(courseList[i].id);
            }
        }
        for (let i = 0;i < dayIdArrays.length; i++) {
            console.log('123')
            promiseArray.push(Material.getHomeworkByDay(dayIdArrays[i]))
        }
        this.popArray(promiseArray);
    },

    popArray(promiseArray) {
        let promise = promiseArray.pop();
        let resultNumber = 0;
        promise.then((result)=>{
            switch (result.status) {
                case 'unfinished':
                    resultNumber = 0;
                    break;
                case 'nocorrections':
                    resultNumber = 1;
                    break;
                case 'correcting':
                    resultNumber = 2;
                    break;
                default:
                    resultNumber = 0;
                    break;
            }
            this.state.homeWorkStatus.unshift(resultNumber);
            this.setState({homeWorkStatus: this.state.homeWorkStatus});
            if(promiseArray.length!==0) {
                this.popArray(promiseArray);
            } else {
                console.log(this.state.homeWorkStatus);
            }

        })
    },

    render() {
        // test1
        if(this.state.allowLesson === ''){
            //无数据
            return(<div>
                <FixedBg/>
            </div>)
        } else if(this.state.allowLesson === false){
            //未开课数据
            return(<div>
                <FixedBg/>
                {this.renderEmpty()}
            </div>);
            //二维码 开课
            {/*<div className="course-select">*/}
                {/*<FixedBg/>*/}
                {/*<div>*/}
                    {/*{this.renderTopBar()}*/}
                    {/*{this.renderCourseList()}*/}
                {/*</div>*/}
            {/*</div>*/}
        } else{
            return(
                //开课
                <div className="course-select">
                    <FixedBg/>
                    <div>
                        {this.renderTopBar()}
                        {this.renderQQGroup()}
                        {this.renderCourseList()}
                    </div>
                </div>
            )
        }
    },

    renderQQGroup() {
      return(<img className="qq-group" onClick = {this.showGroup} src={`./assetsPlus/image/${GlobalConfig.getCourseName()}/select_qq_group.png`}/>)
    },

    renderEmpty() {
        let arr = [];
        console.log('empty！！');

        Statistics.postDplusData('列表页空白');
        arr.push(<p>您似乎未购买相关的课程，如果有疑问，请咨询客服QQ群：592596096</p>);
        arr.push(<p onClick={()=>{Tools.MyRouter('','/payPage/');Statistics.postDplusData('空白跳转报名');}}>点击我跳转报名页</p>)
        return(arr)
    },

    renderTopBar(){
        return(<div className="top-bar margin-fix">
            {/*{this.renderIcon()}*/}
            {this.renderTitleIcon()}
            {this.renderBeginReward()}
        </div>)
    },

    renderTitleIcon() {
        return(<img className="" src={`./assetsPlus/image/${GlobalConfig.getCourseName()}/course_select_title.png`}>

        </img>)
    },

    renderBeginReward() {
        return(<img className="" style={{width: '100%'}} src={`./assetsPlus/image/${GlobalConfig.getCourseName()}/course_select_begin.png`} onClick={()=>{Tools.MyRouter('ListenCourse','/courseBegin/select');Statistics.postDplusData('点击_开课证_按钮');}}>
        </img>)
    },

    // renderIcon(){
    //     let title=[
    //         '毕业证书', '课程指导', '毕业礼物'];
    //     let arr = [];
    //     for (let i = 0; i<title.length; i++) {
    //         arr.push(
    //             <IconBar cbfCheckBar = {this.cbfCheckBar} index = {i} isView = {this.state.topBarStatus[i]} iconImg = {this.state.iconImg[i]} iconTitle={title[i]}/>
    //         )
    //     }
    //     return arr;
    // },

    // cbfCheckBar(type) {
    //     switch (type) {
    //         //毕业
    //         case 0:
    //             this.openGraduated();
    //             break;
    //         case 1:
    //             this.showGroup();
    //             break;
    //         case 2:
    //             this.openTreasure();
    //             break;
    //     }
    // },

    renderCourseList() {

        let courseList = this.state.courseList;
        let arr = [];
        let homeWorkCount = 0;
        if(!courseList || courseList.length === 0 ){
            return null;
        } else {
            for (let i = 0; i < courseList.length; i++) {
                //计算出来状态,并赋值.
                let result = this.calcCourseStatus(courseList[i], i);
                //如果上一个能看.这个还可以渲染.
                if ( i === 0 || this.state.courseList[i-1].courseStatus.see === true){
                    // if (result) {
                    //     arr.push(
                    //         <div className="lesson-bar">
                    //             <LessonBar  index = {i} content = {this.state.courseList[i]} cbfGoLesson = {this.cbfGoLesson} cbfSeeReward = {this.cbfSeeReward}></LessonBar>
                    //         </div>
                    //     );
                    // } else {
                    //     arr.push(
                    //         <div className="lesson-bar">
                    //             <img className="bg-not-see" src = "./assetsPlus/image/course/tomorrow.png"/>
                    //         </div>
                    //     );
                    // }
                    arr.push(
                        <div className="lesson-bar-course21">
                            <LessonBar  index = {i} content = {this.state.courseList[i]} cbfGoLesson = {this.cbfGoLesson} cbfSeeReward = {this.cbfSeeReward}></LessonBar>
                        </div>
                    );

                    //如果有题目
                    if (courseList[i].homework === 'Y' && courseList[i].courseStatus.see && sessionStorage.getItem('testType') === 'have' ) {
                        //得到题目id
                        arr.push( <div className="lesson-bar-course21" style = {{height: '45px'}} onClick={this.cbfGoHomeWork.bind(this,i)}>
                            <img style = {{width: '100%'}} src={`./assetsPlus/image/${GlobalConfig.getCourseName()}/homework_line_${this.state.homeWorkStatus[homeWorkCount] ? this.state.homeWorkStatus[homeWorkCount] : 0}.png`} />
                        </div>);
                        homeWorkCount++;
                    }
                    //设定题目
                        //数据
                        //样式
                        //操作
                    //渲染题目

                } else break;
                // switch (courseStatus) {
                //     //没有达到听课时间
                //     case -1:
                //         //TODO 后台上线后 先获得列表 获得报名结果 修改课程类型 判定能否上的时间 再根据免付费用户,结合课程的后台类型进行判定.
                //         if (this.state.allowLesson === 'FREE') {
                //             arr.push(this.renderLesson(i,courseList[i]));
                //         } else {
                //             arr.push(
                //                 <div className="lesson-bar" onClick={this.renderNotEnter.bind(this,i)}>
                //                     <LessonBar  index = {i} content = {courseList[i]}></LessonBar>
                //                 </div>
                //             );
                //         }
                //         break;
                //     //不为-1
                //     default:
                //         arr.push(this.renderLesson(i,courseList[i]));
                //         break;
                // }
            }
            return arr
        }
    },

    showGroup() {

        if(this.state.groupInfo.secret) {
            window.dialogAlertComp.show('加入学习社群',`和小伙伴们分享今天学习到的知识吧。群暗号：${this.state.groupInfo.secret}（QQ群：${this.state.groupInfo.qq}）`, '点击加入', () => {
                location.href = this.state.groupInfo.link;
            }, '我加过了', true)
        } else {
            window.dialogAlertComp.show('加入学习社群',`和小伙伴们分享今天学习到的知识吧。`, '知道啦', null, '', false)
        }
        Statistics.postDplusData('点击_社群_按钮');

    },

    renderHomeWork() {

    },

    addCourseStatus() {
        let courseStatus = {
            see: false,
            enter: '',
            allFinish: false,
            reward: 'not-get',
        };
    },

    calcCourseStatus(course, index) {
        //制作一个用来解析day状态的json.根据具体的赋值 并保存.为了渲染使用.
        let courseStatus = {
            see: false,
            enter: '',
            allFinish: false,
            reward: 'not-get',
        };
        switch (this.state.allowLesson) {
            //如果是免费用户
            case false:
                courseStatus.reward = 'free-not-get';
                if (index === 0) {
                    courseStatus.see = true;//可以看到
                    courseStatus.enter = 'free-enter';
                    switch (course.status) {
                        case -1:
                            break;
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            courseStatus.allFinish = true;
                            courseStatus.reward = 'free-not-get';
                            break;
                        default:
                            console.log('error' + course.status);
                    }
                } else {
                    courseStatus.see = false;
                    courseStatus.enter = 'free-no-pay';
                }
                break;
            //如果是付费用户
            case true:
                //先判定是否可以收听.
                switch (course.status) {
                    case -1:
                        courseStatus.enter = 'no-time';
                        break;
                    case 0:
                        courseStatus.see = true;//可见
                        courseStatus.enter = 'pay';
                        break;
                    case 1:
                        courseStatus.see = true;//可见
                        courseStatus.enter = 'pay';
                        break;
                    case 2:
                        courseStatus.see = true;//可见
                        courseStatus.enter = 'pay';
                        courseStatus.allFinish = true;
                        courseStatus.reward = 'get';
                        break;
                    default:
                        console.log('error' + course.status);
                }
                break;
        }
        // courseStatus.see = true;
        this.state.courseList[index].courseStatus = courseStatus;//赋值.
        return courseStatus.see;
    },


    cbfGoHomeWork(index) {
        let dayId = this.state.courseList[index].id;
        Statistics.postDplusData('点击_作业_列表',[index,status.enter]);
        Tools.GoRouter('homework','/' + dayId );
    },

    //跳转到听课界面
    cbfGoLesson(course, index) {
        let status = course.courseStatus;
        let dayId = this.state.courseList[index].id;
        let type = course.type;
        switch (status.enter) {
            // case 'free-enter':
            //     Material.postData('免费_试听_CourseSelect');
            //     Tools.MyRouter('ListenCourse','/listenCourse/' + dayId);
            //     break;
            // case 'free-no-pay':
            //     Material.postData('免费_禁止_CourseSelect');
            //     window.dialogAlertComp.show('7天财商训练营','每天更新一课，为你量身定做的理财指南课程，只需要7天，带着你财商涨涨涨！','去看看',()=>
            //     {location.hash = '/payPage';Material.postData('免费_跳转购买_CourseSelect');},'先不要',true);
            //     break;
            case 'pay':
                switch (type) {
                    case 0:
                        Tools.MyRouter('ListenCourse','/listenCourse/' + dayId);
                        break;
                    case 1:
                        location.href = course.link;
                        break;
                    case 2:
                        Tools.MyRouter('ListenCourse','/listenCourse/' + dayId);
                        break;
                }

                break;
            case 'no-time':
                window.dialogAlertComp.show('还没有开放课程哦','每天更新一课哦，耐心等一等吧！','知道啦',()=>{},()=>{},false);
                break;
            default:
                break;
        }
        Statistics.postDplusData('点击_课程_列表',[index,status.enter]);
    },


    //点击成就卡回调函数
    cbfSeeReward(course, index) {
        let status = course.courseStatus;
        let dayId = this.state.courseList[index].id;
        switch (status.reward) {
            // case 'free-not-get':
            //     Tools.MyRouter('ListenCourse','/listenCourse/' + dayId);
            //     // window.dialogAlertComp.show('你未完成课程,不能查看成就卡','快去完成吧','完成',()=>
            //     // {location.hash = '/course/' + dayId;},'先不去',false);
            //     break;
            // case 'free-get':
            //     //如果已获得成就卡
            //     Tools.MyRouter('ListenCourse','/listenCourse/' + dayId);
            //     // location.hash = '/getReward/' + dayId;
            //     break;
            case 'not-get':
                window.dialogAlertComp.show('你未完成课程,不能查看成就卡','快去完成吧','完成',()=>
                {Tools.MyRouter('ListenCourse','/listenCourse/' + dayId);},'先不去',true);
                break;
            case 'get':
                //如果已获得成就卡
                Tools.MyRouter('GetReward','/getReward/' + dayId + '/mine');
                break;
            default:
                break;
        }
        Statistics.postDplusData('点击_成就卡_按钮',[status.reward]);
    },


    // showGroup() {
    //     let result = -1;
    //
    //     if(sessionStorage.getItem('hhr')) {
    //         result = 0;
    //         window.dialogAlertComp.show('加入学习社群','基金课教学QQ群，手把手带你投资实战基金课。群暗号：棉花（QQ群：592596096）','点击加入',()=>
    //         {location.href = "https://jq.qq.com/?_wv=1027&k=4Bbmgn0";},'我加过了',true)
    //     } else if (this.state.qqStatus === 1) {
    //         result = 1;
    //         window.dialogAlertComp.show('加入学习社群','基金课教学QQ群，手把手带你投资实战基金课。群暗号：棉花（QQ群：188416619）','点击加入',()=>
    //         {location.href = "https://jq.qq.com/?_wv=1027&k=4AdZhRM";},'我加过了',true)
    //     } else {
    //         result = 2;
    //         window.dialogAlertComp.show('加入学习社群','基金课教学QQ群，手把手带你投资实战基金课。群暗号：棉花（QQ群：188416619）','点击加入',()=>
    //         {location.href = "https://jq.qq.com/?_wv=1027&k=4AdZhRM";},'我加过了',true)
    //     }
    //     Statistics.postDplusData('点击qq群');
    // },

    openGraduated() {
        if (this.state.allLessonStatus === 'AllPass') {
            Material.getGraduatedRank(sessionStorage.getItem('courseId')).always( (rank) => {
                //2如果请求道有效值
                // rank !== -1
                if ( rank!== -1 ) {
                    sessionStorage.setItem('graduated-rank',rank);
                    Tools.MyRouter('GetGraduated','/getGraduated/mine');
                } else {
                    window.dialogAlertComp.show('还不能领取毕业证哦！','你还没有完成全部课程呢，要都通过才行哦。','好的',()=>{},'',false);
                }
            });
        } else if(this.state.allLessonStatus === 'AllEnter') {
            window.dialogAlertComp.show('还不能领取毕业证哦！','现在全部的课程都可以听了，把他们都完成，就可以领取毕业证。','好的',()=>{},'',false);
        } else {
            window.dialogAlertComp.show('还不能领取毕业证哦！','按时完成14天的训练之后，就可以顺利领取毕业证啦。','我会加油的',()=>{},'',false);
        }
        Statistics.postDplusData('点击_毕业证_按钮', [this.state.allLessonStatus]);
    },

    openTreasure() {
        //可以领取
        if (this.state.allLessonStatus === 'AllPass') {
            Material.getTreasureInfo().always((data) => {
                console.log('宝箱请求的结果是' + data);
                //如果已领取
                if (data) {
                    window.dialogAlertComp.show('你已经领取过宝箱啦', '使用长投FM去积分商城兑换奖励吧！', '去看看', () => {
                        location.href = "https://h5.ichangtou.com/h5/fm/index.html#/mall";
                    }, '等一等', true);
                } else {
                    Material.openTreasure().always((data) => {
                        //弹出打开宝箱的界面1
                        if (data.status) {
                            window.dialogAlertComp.show('领取了'+data.content+'金币！', '使用长投FM去积分商城兑换奖励吧！', '去看看', () => {
                                location.href = "https://h5.ichangtou.com/h5/fm/index.html#/mall";
                            }, '等一等', true);
                        } else {
                            window.dialogAlertComp.show(data.msg, '领取失败了', '我知道了', () => {
                            }, () => {
                            }, false);
                        }
                    })
                }
            });
        } else if(this.state.allLessonStatus === 'AllEnter'){
            window.dialogAlertComp.show('毕业宝箱等着你！', '现在全部的课程都可以听了，把他们都完成，就可以领取毕业宝箱噢。', '我会加油的', () => {
            }, '', false);
        } else {
            window.dialogAlertComp.show('毕业宝箱等着你！', '按时完成14天的训练之后，才可以领取毕业宝箱噢。', '我会加油的',()=>{},'',false);
        }
        Statistics.postDplusData('点击_宝箱_按钮', [this.state.allLessonStatus]);
    }
});

module.exports = CourseSelect;
