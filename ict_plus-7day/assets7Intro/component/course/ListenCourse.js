/**
 * Created by Administrator on 17-2-23.
 */
const $ = window.$ = require('jquery');
const React = require('react');
const ReactDom = require('react-dom');
// const Player = require('./Player');
const Link = require('react-router').Link;
const Material = require('../../Material');
// const TitleBar = require('./TitleBar');
const Loading = require('../../Loading');
const GlobalAudio = require('../GlobalAudio');
const AudioProgressBar = require('../Audio/AudioProgressBar');
const OnFire = require('onfire.js');
const WxConfig = require('../../WxConfig');
const Modal = require('./../Modal');
const Toast = require('./../Toast');
const Util = require('../../Util');
const CheckinPanel = require('../CheckinPanel');
const DidCheckinPanel = require('../DidCheckinPanel');
const EnterPanel = require('../EnterPanel');

const ChooseBar = require('./Choose');
const AudioBar = require('./Audio');
const FixedBg = require('./FixedBg');



const User = require('../../User');

const autoMove = require('../../AutoMove');

var isMoving = 0;

const ListenCourse = React.createClass({

    getPropsType() {
        return {
            fmid: React.PropTypes.string
        }
    },


    getInitialState() {
        return {
            // columnid: this.props.params.columnid,
            // fmid: this.props.fmid || this.props.params.fmid,
            isPlaying: false,
            isPlay: true,
            currentPlaying: -1,
            currentfmid: -1,
            lessons: [],
            allFinish: false,//全部课程都通过
        }
    },

    componentWillMount() {

        Util.postCnzzData("进入听课页面");

        if (User.getUserInfo().userId) {

            this.getFmInfo();

        } else {
            OnFire.on('OAUTH_SUCCESS', (userInfo)=>{
                this.getFmInfo();
            })
        }

        //音频完成之后
        OnFire.on('AUDIO_END',()=>{
            if (this.state.currentPlaying<0) {
                return null;
            }
            //
            OnFire.fire('Course_AutoMove');
            //修改进度
            this.state.lessons[this.state.currentPlaying].process = true;
            let localLessons = this.state.lessons;
            this.setState({lessons: localLessons});
            //发送修改1
            Material.finishWork(0, this.state.lessons[this.state.currentPlaying].fmid).always( (data) => {
            });

            Util.postCnzzData("听完", this.state.lessons[this.state.currentPlaying].fmid);

        });

        OnFire.on('Course_AutoMove', ()=>{
            //如果所有的课程都通过了
            if (this.state.allFinish) {
                return;
            }
            // if  (this.props.location.query.name === '2') {
            //
            // }
            let divHeight = document.getElementById("fmView").offsetHeight;
            if(isMoving === 0) {
                isMoving = 1
                // this.state.isMoving = true;
                autoMove.startMove(divHeight).then(() => {
                    // this.state.isMoving = false;
                    isMoving = 0;
                })
            }
        })

        Material.getCourseList().always( (data) => {
        })
    },

    /**
     * 获取信息
     */
    getFmInfo() {
        Loading.showLoading('获取信息...');
        let courseId = this.props.params.courseId;

        Material.getCourseProgress(courseId).always((progressData) => {
            Loading.hideLoading();
            this.state.lessons = progressData;
            this.fixProcess();
            if (progressData) {
                // if  (this.props.location.query.name === '0') {
                //     Material.haveStartLesson(progressData[0].fmid);
                // }
                this.setState({
                    lessons: progressData
                });
            }
        });
    },

    fixProcess() {
        //如果最后一课已经完成
        let allLesson = this.state.lessons;
        let lastLesson = allLesson[allLesson.length - 1].subs;
        //1完成全部选择题后
        if(lastLesson[lastLesson.length - 1].process === true) {
            this.state.allFinish = true;
            for (let lesson of allLesson) {
                if(lesson.process!==true){

                    Util.postCnzzData("修复音频数据" + lesson.fmid + '/' + User.getUserInfo().userId);
                    Material.finishWork(0, lesson.fmid);
                }
                for(let choose of lesson.subs){
                    if(choose.process!==true){
                        //发送修改1
                        Util.postCnzzData("修复作业数据" + choose.subjectid + '/' + User.getUserInfo().userId);
                        Material.finishWork(1, choose.subjectid);
                    }
                }
            }
        } else {
            return;
        }
    },



    /**
     * 设置分享内容
     * @param fmid
     * @param title
     */
    setShareConfig(fmid,title) {
        let shareTitle = '小白理财FM《'+title+'》',
            link = location.origin+location.pathname+
                "?fmid="+fmid;

        WxConfig.shareConfig(shareTitle,'',fmid,link);
    },

    /**
     * 完成选择题
     * @param index 当前某一音频第几个选择题
     */
    OnChoosePass(lessonIndex,index) {
        let questions = this.state.lessons[lessonIndex].subs;
        questions[index].process = true;
        let localLessons = this.state.lessons;
        this.setState({lessons: localLessons});
        //发送修改1
        Material.finishWork(1, this.state.lessons[lessonIndex].subs[index].subjectid).always( (data) => {
        });
    },

    /**
     * 点击按钮的回调
     * @returns {*}
     */
    OnAudioButton(index, isPlaying) {
        if (isPlaying) {
            this.setState({currentPlaying: -1});
        } else {
            this.setState({currentPlaying: index});
        }
        this.controlHandler(index, isPlaying)
    },

    /**
     * 多个组件,同一个回调函数控制播放键操作
     */
    controlHandler(index, isPlaying) {
        if (isPlaying) {
            GlobalAudio.pause();
        } else {
            let lesson = this.state.lessons[index]
            //保存当前正在播放的音频
            this.setState({currentfmid: lesson.fmid})
            GlobalAudio.play(lesson.audio, lesson.fmid);

            Util.postCnzzData("播放", lesson.fmid);
        }
    },

    /**
     *
     * @returns {XML}
     */
    render() {
        let preStyle = {},nextStyle = {};
        preStyle.visibility = this.state.previousIssue ?  'visible' : 'hidden';
        nextStyle.visibility = this.state.nextIssue ?  'visible' : 'hidden';

        return(
            <div id="fmView" className="fm-view">
                <FixedBg />
                <div className="fix-bg-space"></div>
                {/*<span>当前点击的index{this.state.currentPlaying}</span>*/}
                {/*<span>当前播放的fmid{this.state.currentfmid}</span>*/}
                {/*<div>进入时,这门课程的状态时{this.props.location.query.name}</div>*/}
                {this.renderLesson()}
                {this.passLessonRender()}
                {this.preLoadPic()}
            </div>
        )
    },

    preLoadPic() {
        return(<div className="pre-load">
            <img src={'./assets7Intro/image/course/bglight_b.png'}/>
        </div>)
    },

    passLessonRender() {
        if (this.state.lessons.length === 0) {
            return null;
        }
        let lesson = this.state.lessons[this.state.lessons.length - 1].subs;
        //1完成全部选择题后
        if(lesson[lesson.length - 1].process === true) {
            //1如果第一次通过 ,会有提示.
            // return (<div className = "get-reward-command" onClick={this.goReward.bind(this,1)}>祝贺！完成本节！点击我领取成就卡！</div>);
            // if(this.props.location.query.name !== '2') {
            //     return (<div className = "get-reward-command" onClick={this.goReward.bind(this,1)}>祝贺！完成本节！点击我领取成就卡！</div>);
            // } else {
            //     //1如果已经通过 ,会有提示.
            //     return (<div className = "get-reward-command" onClick={this.goReward.bind(this,2)}>查看我的成就卡！</div>);
            // }
            if(!this.state.allFinish) {
                this.state.allFinish = true;
                return (<div className = "get-reward-command" onClick={this.goReward.bind(this,1)}>祝贺！完成本节！点击我领取成就卡！</div>);
            } else {
                //1如果已经通过 ,会有提示.
                return (<div className = "get-reward-command" onClick={this.goReward.bind(this,2)}>查看我的成就卡！</div>);
            }
        }
    },

    goReward(type) {
        console.log(type);
        if (type === 1) {
            this.fixProcess();
            Util.postCnzzData("第一次点击成就卡");
        } else {
            Util.postCnzzData("再次点击成就卡");
        }
        location.hash = '/getReward/' + this.props.params.courseId;
    },

    /**
     * 渲染听课列表
     * @returns {*}
     */
    renderLesson() {
        let lessons = this.state.lessons;
        if (lessons.length === 0) {
            return null;
        }

        let arr = [];
        let count = 0;

        OUT:
        for (let i = 0;i < lessons.length; i++) {
            //如果满足...渲染FM.无条件渲染fm
            if(i === 0 || lessons[i-1].subs[(lessons[i-1].subs.length) - 1].process) {
                arr.push(this.renderFMBar(i, lessons[i],count));
                count++;
                //如果fm听完
                if(lessons[i].process){
                    let lessonQuestions = lessons[i].subs;
                    //循环某一节的所有的题目
                    for (let j = 0; j < lessonQuestions.length; j++){
                        //如果上一道题答对1
                        if( j === 0 || lessonQuestions[j-1].process) {
                            //如果满足...渲染题目
                            arr.push(this.renderChooseBar(lessonQuestions[j], i, j,count));
                            count++;
                        } else break OUT;
                    }
                    //如果选择题都完成了1
                    if(lessonQuestions[lessonQuestions.length - 1].process && i !== lessons.length - 1) {
                        arr.push(<div className="lesson-column-line"></div>)
                        count++;
                    }
                } else break OUT;

            }
        }
        return arr;
    },

    /**
     * 渲染播放音频列表
     * @returns {*}
     */
    renderFMBar(index, FMContent,count) {
        return (<div key={count} className={this.state.currentPlaying === index ? 'audio-player-on' : 'audio-player-off'}>
            <AudioBar
                content = {FMContent}
                playingIndex = {this.state.currentPlaying}//控制暂停按钮的逻辑11
                audioIndex={index}
                audioCallBack = {this.OnAudioButton}/>
            <AudioProgressBar
                audioIndex={this.state.lessons[index].fmid} //控制播放哪个音频
                playingIndex = {this.state.currentfmid}/>
        </div>)
    },

    /**
     * 渲染选择题
     * @param 问题内容,第几节,第几个选择题
     */
    renderChooseBar(questions, lessonIndex,questionIndex,count) {
        if( !questions ) {
            return null;
        } else {
            return <ChooseBar  key={count} lessonIndex = {lessonIndex} index = {questionIndex} question={questions} passCallBack = {this.OnChoosePass}/>
        }
    },

});

module.exports = ListenCourse;
