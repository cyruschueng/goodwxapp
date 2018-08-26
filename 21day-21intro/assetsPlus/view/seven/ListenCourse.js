/**
 * Created by Administrator on 17-2-23.
 */
const React = require('react');
const Material = require('../../Material');
const Loading = require('../../Loading');
const OnFire = require('onfire.js');
const WxConfig = require('../../WxConfig');
const Util = require('../../Util');

//component
const GlobalAudio = require('../../component/GlobalAudio');
const AudioProgressBar = require('../../component/audioPlayer/AudioProgressBar');
const ChooseBar = require('../../component/seven/ChooseBar');
const FixedBg = require('../../component/course/FixedBg');
const CourseProcessBar = require('../../component/course/CourseProcessBar');


//diff
const AudioPlayer = require('../../component/seven/AudioPlayer');


const User = require('../../User');

const autoMove = require('../../AutoMove');
const PreFetch = require('../../GlobalFunc/PreFetch');

const Tools = require('../../GlobalFunc/Tools');

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
            isPay: false,
            finishElement: 0,
            totalElement: 0,
            courseTitle: {
                title: '',
                subTitle: '',
            },
            resPic: '',
            timer: true,
        }
    },

    componentWillMount() {
        MyStorage.whenEnterPage('listen',[this.props.params.dayId]);

        //登录
        Tools.fireRace(User.getUserInfo().userId,"OAUTH_SUCCESS").then(()=>{
            this.getFmInfo();
        });

        //付费
        Tools.fireRaceCourse(sessionStorage.getItem('courseId')).then((value)=>{
            if(value.pay){
                this.state.isPay = true;
                this.setState({
                    isPay: true,
                });
            }
        });

        //音频完成监听
        OnFire.on('AUDIO_END',()=>{
            if (this.state.currentPlaying<0 || sessionStorage.getItem('courseId') !== '0') {
                return null;
            }
            //终止多余的其你去
            if(!this.state.timer){
                return
            } else {
                this.state.timer = false;
                setTimeout(() => {
                    this.state.timer = true;
                }, 1000);
            }
            //
            if(!this.state.allFinish){
                OnFire.fire('Course_AutoMove');
            }
            //修改进度
            this.state.lessons[this.state.currentPlaying].process = true;
            let localLessons = this.state.lessons;
            this.setState({lessons: localLessons});
            //发送修改1
            Material.finishWork(0, this.state.lessons[this.state.currentPlaying].fmid).always( (data) => {
            });
            Statistics.postDplusData('完成_音频',[this.state.lessons[this.state.currentPlaying].fmid]);
            // Util.postCnzzData("听完", this.state.lessons[this.state.currentPlaying].fmid);
            if (this.state.isPay) {
                //统计第一次完成音频.作为留存起点
                let key = 'first_finish_vedio' + sessionStorage.getItem('courseId');
                if (!localStorage.getItem(key)) {
                    console.log('first!!!!!!!!!!!!!!!');
                    Statistics.postDplusData('第一次_完成_音频',[this.state.lessons[this.state.currentPlaying].fmid]);
                    localStorage.setItem(key,true);
                }
            }
        });

        //自动滚动监听
        OnFire.on('Course_AutoMove', ()=>{
            //如果所有的课程都通过了

            // if  (this.props.location.query.name === '2') {
            //
            // }
            let divHeight = document.getElementById("fmView").offsetHeight;
            if(isMoving === 0) {
                isMoving = 1;
                // this.state.isMoving = true;
                autoMove.startMove(divHeight).then(() => {
                    // this.state.isMoving = false;
                    isMoving = 0;
                })
            }
        });
    },

    /**
     * 获取信息
     */
    getFmInfo() {
        Loading.showLoading('获取信息...');
        let courseId = this.props.params.dayId;

        Material.getCourseProgress(courseId).then((progressData) => {
            Loading.hideLoading();
            this.state.lessons = progressData;
            this.preFetch();
            this.fixProcess();
            this.calcInit();
            this.calcProcess();
            if (progressData) {
                this.setState({
                    lessons: this.state.lessons,
                });
            }
        });
    },

    calcInit() {
        let allLesson = this.state.lessons;
        let lastLesson = allLesson[allLesson.length - 1].subs;
        //1完成全部选择题后
        if(lastLesson[lastLesson.length - 1].process === true) {
            this.state.allFinish = true;
            this.setState({allFinish: this.state.allFinish});
        }
    },

    //计算进度
    calcProcess() {
        let allLesson = this.state.lessons;
        for(let i = 0; i<allLesson.length; i++){
            this.state.totalElement++;
            if(allLesson[i].subs[allLesson[i].subs.length - 1].process === true) {
                this.state.finishElement++;
            }
        }
        this.setState({
            totalElement:this.state.totalElement,
            finishElement: this.state.finishElement
        })
    },

    fixProcess() {
        //如果最后一课已经完成
        let allLesson = this.state.lessons;
        let lastLesson = allLesson[allLesson.length - 1].subs;
        //1完成全部选择题后
        if(lastLesson[lastLesson.length - 1].process === true) {
            for (let lesson of allLesson) {
                if(lesson.process!==true){

                    // Util.postCnzzData("修复音频数据" + lesson.fmid + '/' + User.getUserInfo().userId);
                    Material.finishWork(0, lesson.fmid);
                }
                for(let choose of lesson.subs){
                    if(choose.process!==true){
                        //发送修改1
                        // Util.postCnzzData("修复作业数据" + choose.subjectid + '/' + User.getUserInfo().userId);
                        Material.finishWork(1, choose.subjectid);
                    }
                }
            }
        } else {
            return;
        }
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
        this.state.finishElement++;
        this.setState({finishElement: this.state.finishElement});
        // Material.postData('免费_完成选择题_ListenCourse');
    },

    /**
     * 点击按钮的回调
     * @returns {*}
     */
    OnAudioButton(index, isPlaying) {
        if (isPlaying) {
            this.setState({currentPlaying: -1});
        } else {
            this.state.currentPlaying = index;
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
            let lesson = this.state.lessons[index];
            //保存当前正在播放的音频
            this.setState({currentfmid: lesson.fmid});
            GlobalAudio.play(lesson.audio, lesson.fmid);
            this.preFetch();
            Statistics.postDplusData('点击_播放_按钮',[lesson.fmid]);
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
                <CourseProcessBar finishElement = {this.state.finishElement} totalElement = {this.state.totalElement}/>
                {/*<span>当前点击的index{this.state.currentPlaying}</span>*/}
                {/*<span>当前播放的fmid{this.state.currentfmid}</span>*/}
                {/*<div>进入时,这门课程的状态时{this.props.location.query.name}</div>*/}
                {this.renderLesson()}
                {this.passLessonRender()}
                {this.renderSignUp()}
                {this.preLoadPic()}
            </div>
        )
    },

    //预加载资源
    preFetch() {
        console.log('try' + this.state.currentPlaying);
        if(this.state.lessons.length <= 0) {
            if(!this.state.lessons)
            {
                console.log('lier')
            }
            return;
        }
        let index= this.state.currentPlaying;
        // if (index<0) {
        //     index = -1;
        // }
        //往后播放一课
        index = index + 1;
        let audio = this.state.lessons[index];
        if (audio) {
            let res = PreFetch.fetchRes(audio.pptUrl,0);
            let res2 = PreFetch.fetchRes(audio.audio,0);
            res.then(res2);
        }
    },

    renderSignUp() {
        if (!this.state.isPay) {
            return (<div className = "sign-up-button" onClick={this.goSign}>火速报名！</div>);
        }
    },

    goSign() {
        // Material.postData('免费_跳转报名_ListenCourse');
        Statistics.postDplusData('点击_报名_按钮');
        Tools.MyRouter('PayPage','/payPage');
    },

    preLoadPic() {
        return(<div className="pre-load">
            <img src={'./assetsPlus/image/seven/bglight_b.png'}/>
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
            if (!this.state.isPay) {
                // Material.postData('免费_完成课程' + this.props.params.dayId +'_ListenCourse');
            }
        } else {
            // Util.postCnzzData("再次点击成就卡");
        }
        let url = '/getReward/' + this.props.params.dayId + '/mine';
        Tools.MyRouter('GetReward',url);
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
                            arr.push(<div style = {{backgroundImage: 'url("./assetsPlus/image/seven/DividingLine.png")'}} className="lesson-column-line-seven"></div>);

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
        let buttonImgs = ['./assetsPlus/image/seven/btnPressed.png','./assetsPlus/image/seven/btnPlay.png'];
        return (<div key={count} className={this.state.currentPlaying === index ? 'audio-player-on' : 'audio-player-off'}>
            <AudioPlayer
                buttonImgs = {buttonImgs}
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
