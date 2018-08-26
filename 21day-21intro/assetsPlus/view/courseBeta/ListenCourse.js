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
const ChooseBar = require('../../component/fund/ChooseBar');
const FixedBg = require('../../component/course/FixedBg');
const CourseProcessBar = require('../../component/course/CourseProcessBar');


//diff
// const AudioPlayer = require('../../component/seven/AudioPlayer');
const AudioPlayer = require('../../component/fund/AudioPlayer');

const GiveScoreContain = require('../../component/course21/GiveScoreContain');


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
            clickStatus: true,
            currentIndex: -1,
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
            console.log('finishFm');
            if (this.state.currentPlaying<0) {
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
            this.checkFinish('audio');
            //修改进度
            this.state.lessons[this.state.currentPlaying].process = true;
            let localLessons = this.state.lessons;
            this.setState({lessons: localLessons});
            //发送修改1
            Material.finishWork(0, this.state.lessons[this.state.currentPlaying].fmid).always( (data) => {
            });
            Statistics.postDplusData('完成_音频',[this.state.lessons[this.state.currentPlaying].fmid]);
            //统计第一次完成音频.作为留存起点
            let key = 'first_finish_vedio' + sessionStorage.getItem('courseId');
            if (!localStorage.getItem(key)) {
                Statistics.postDplusData('第一次_完成_音频',[this.state.lessons[this.state.currentPlaying].fmid]);
                localStorage.setItem(key,true);
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

            //1拉取关于dayID进度的数据.用于渲染进度条.
            this.getProcess();
            //2
            this.preFetch();
            this.fixProcess();
            this.calcInit();
            //自动滚到最下面
            // if(!this.state.allFinish){
            //     console.log('123')
            //     window.scrollTo(0,500);
            // }

            if (progressData) {
                this.setState({
                    lessons: this.state.lessons,
                });
            }
        });
    },

    calcInit() {
        //1完成全部选择题后
        if(this.state.allFinish) {
            this.setState({clickStatus: false});
        } else {
            this.setState({clickStatus: true});
        }
    },

    isAllFinish() {
        if(this.state.totalElement === this.state.finishElement) {
            this.state.allFinish = true;
        }
        this.setState({
            allFinish: this.state.allFinish
        })
    },

    //计算进度
    getProcess() {
        this.setProcess();
        this.isAllFinish();
    },

    setProcess() {
        let total = 0;
        let finish = 0;
        let allLesson = this.state.lessons;
        let lesson = {};
        for( let i = 0; i < allLesson.length; i++ ) {
            total++;
            lesson = allLesson[i];
            //选择题
            if(lesson.subs.length !== 0) {
                if ( lesson.subs[lesson.subs.length - 1].process ) {
                    finish++;
                }
            } else {
                if ( lesson.process ) {
                    finish++;
                }
            }
        }
        this.setState({
            totalElement: total,
            finishElement: finish,
        })
    },

    fixProcess() {
        //如果最后一课已经完成
        let allLesson = this.state.lessons;
        //1完成全部选择题后
        if(this.state.allFinish) {
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

    checkFinish(from) {
        let currentItem = {};
        let result = false;
        if(from === 'audio') {
            currentItem = this.state.lessons[this.state.currentPlaying];
            if(!currentItem.process) {
                if(this.state.lessons[this.state.currentPlaying].subs.length === 0) {
                    result = true;
                } else {
                    result = false;
                }
            }
        } else if (from === 'choose') {
            currentItem = this.state.lessons[this.state.currentPlaying].subs;
            if(currentItem[currentItem.length - 1].process) {
                result = true;
            }
        }
        if(result) {
            this.state.finishElement++;
            this.setState({finishElement: this.state.finishElement});
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
        this.checkFinish('choose')

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
                {/*{this.renderTitle()}*/}
                <CourseProcessBar finishElement = {this.state.finishElement} totalElement = {this.state.totalElement}/>
                {/*<span>当前点击的index{this.state.currentPlaying}</span>*/}
                {/*<span>当前播放的fmid{this.state.currentfmid}</span>*/}
                {/*<div>进入时,这门课程的状态时{this.props.location.query.name}</div>*/}
                {this.renderLesson()}
                {/*{this.passLessonRender()}*/}
                {/*{this.renderSignUp()}*/}
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
            // let res = PreFetch.fetchRes(audio.pptUrl,0);
            let res2 = PreFetch.fetchRes(audio.audio,0);
            // res.then(res2);
        }
    },


    renderTitle(){
        return(<div className="bg-title" style={{backgroundImage:"url('./assetsPlus/image/course/courseTitle.png')"}}>
            <h1>{this.state.courseTitle.title}</h1>
            <p>{this.state.courseTitle.subTitle}</p>
        </div>)
    },

    renderSignUp() {
        if (!this.state.isPay) {
            return (<div className = "sign-up-button" onClick={this.goSign}>点击播放按钮听课！喜欢的话点击这里报名！</div>);
        }
    },

    goSign() {
        // Material.postData('免费_跳转报名_ListenCourse');
        Statistics.postDplusData('点击_报名_按钮');
        Tools.MyRouter('PayPage','/payPage');
    },

    // preLoadPic() {
    //     return(<div className="pre-load">
    //         <img src={'./assetsPlus/image/seven/bglight_b.png'}/>
    //     </div>)
    // },

    cbfScoreClick (index) {
        if(this.state.clickStatus) {
            this.setState({
                clickStatus: false,
                currentIndex: index,
            });
            Statistics.postDplusData('点击_评分_按钮',[this.props.params.dayId,index + 1]);
        } else {
            window.dialogAlertComp.show('已经评分啦','您之前已评价，更多的学习体会和意见可以到QQ群里去分享哦，您的评价会让我们变得更好！','知道啦',()=>{},'',false);
        }
        //打分
    },

    renderGiveScore() {
        if (this.state.lessons.length === 0) {
            return null;
        }
        let lesson = this.state.lessons[this.state.lessons.length - 1].subs;
        //1完成全部选择题后
        if(lesson[lesson.length - 1].process === true) {
            let arr = [];
            let images = [`./assetsPlus/image/${GlobalConfig.getCourseName()}/score_on.png`,`./assetsPlus/image/${GlobalConfig.getCourseName()}/score_off.png`];
            let title = '给课程评个分吧！';
            // if(this.state.clickStatus) {
            //     title = '给课程评个分吧！'
            // } else {
            //
            // }
            let count = 5;
            if (this.state.lessons.length === 0) {
                return null;
            }
            if(!this.state.allFinish) {
                this.state.allFinish = true;
                arr.push (<GiveScoreContain className = "get-reward-command"
                                          images = {images}
                                          title = {title}
                                          count = {count}
                                          currentIndex = {this.state.currentIndex}
                                          cbfClick = {this.cbfScoreClick}
                />);
            } else {
                title = '谢谢您的评价！';
                arr.push (<GiveScoreContain className = "get-reward-command"
                                          images = {images}
                                          title = {title}
                                          count = {count}
                                          currentIndex = {this.state.currentIndex}
                                          cbfClick = {this.cbfScoreClick}
                />);
            }
            arr.push(<div style = {{textAlign: 'center',marginBottom: '10px'}}>
                <img src = {`./assetsPlus/image/${GlobalConfig.getCourseName()}/share_payPage.png`} onClick={this.shareButton} style = {{width: '64px'}}/>
            </div>);
            return arr;
        }
    },

    shareButton() {
        Statistics.postDplusData('点击_分享_按钮');
        window.dialogAlertComp.show('你最棒了！','恭喜你，你又完成了一课！快分享给你的朋友让他们为你加油吧！','知道啦',()=>{},'',false);
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
            for (let i = 0;i < this.state.totalElement; i++) {
                //如果满足...渲染FM.无条件渲染fm
                    arr.push(this.renderFMBar(i, lessons[i],count));
                    count++;
                    if(lessons[i].process){
                        //如果是有选择题的
                        if(lessons[i].subs.length !== 0 ) {
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
                                arr.push(<div className="lesson-column-line-course21">
                                    <img style={{width: '100%'}} src = {`./assetsPlus/image/fund/DividingLine.png`}></img>
                                </div>);
                                count++;
                            } else break OUT;
                        } else {
                            //如果不是最后一个
                            if(i !== lessons.length - 1) {
                                arr.push(<div className="lesson-column-line-course21">
                                    <img style={{width: '100%'}} src = {`./assetsPlus/image/fund/DividingLine.png`}></img>
                                </div>);
                            }
                            count++;
                        }
                } else break OUT;
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
                currentPlaying = {this.state.currentPlaying === index ? true : false}
                audioCallBack = {this.OnAudioButton}/>

            <AudioProgressBar
                audioIndex={this.state.lessons[index].fmid} //控制播放哪个音频
                playingIndex = {this.state.currentfmid}/>
        </div>)
    },

    // /**
    //  * 渲染播放音频列表
    //  * @returns {*}
    //  */
    // renderFMBar(index, FMContent,count) {
    //     let style1 = {
    //         // left: worldPox * imgWidth,
    //         // backgroundImage: `url(./assetsPlus/image/${GlobalConfig.getCourseName()}/fmbar-bg.png)`,
    //         backgroundColor: '#FFF7E0',
    //         // backgroundSize: 'cover',
    //         borderTop: '3px solid #907660',
    //         borderLeft: '3px solid #907660',
    //         borderRight: '3px solid #907660',
    //         borderRadius: '10px 10px 0 0'
    //         // transform: `translateX(${worldPox}00%)`
    //     };
    //     let style2 = {
    //         // left: worldPox * imgWidth,
    //         // backgroundImage: `url(./assetsPlus/image/${GlobalConfig.getCourseName()}/fmbar-bg.png)`,
    //         backgroundColor: '#FFF7E0',
    //         borderTop: '3px solid #907660',
    //         borderLeft: '3px solid #907660',
    //         borderRight: '3px solid #907660',
    //         borderBottom: '3px solid #907660',
    //         borderRadius: '0 0 10px 10px'
    //     };
    //     let titleColor = {
    //         color: '#907660',
    //         fontWeight: '700'
    //     }
    //     let buttonImgs = [`./assetsPlus/image/${GlobalConfig.getCourseName()}/btnPressed.png`,`./assetsPlus/image/${GlobalConfig.getCourseName()}/btnPlay.png`];
    //     return (<div key={count} style = {{boxShadow: '0 0 0'}}className={this.state.currentPlaying === index ? 'audio-player-on' : 'audio-player-off'}>
    //         <AudioPlayer
    //             titleColor = {titleColor}
    //             buttonImgs = {buttonImgs}
    //             bgImg = {style1}
    //             content = {FMContent}
    //             playingIndex = {this.state.currentPlaying}//控制暂停按钮的逻辑11
    //             audioIndex={index}
    //             audioCallBack = {this.OnAudioButton}/>
    //         <AudioProgressBar
    //             bgImg = {style2}
    //             backColor = {['#907660','#907660','#907660','#FFF7E0']}
    //             audioIndex={this.state.lessons[index].fmid} //控制播放哪个音频
    //             playingIndex = {this.state.currentfmid}/>
    //     </div>)
    // },



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
