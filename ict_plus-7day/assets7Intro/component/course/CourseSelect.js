/**
 * Created by yiran on 2017/5/5.
 */
const $ = window.$ = require('jquery');
const React = require('react');
const ReactDom = require('react-dom');
const OnFire = require('onfire.js');
const User = require('../../User');

const Config = require('../../Config');
const Link = require('react-router').Link;
const LessonBar = require('./LessonBar');
const FixedBg = require('./FixedBg');
var boolOnce = true;
// const GetReword = require('./GetReword');

const CourseSelect = React.createClass({


    getInitialState: function() {
        return {
            courseList: {},
            tips:[],
            treasure: {
                status: -1,
                haveOpen: true,
                canOpen: false,
                canView: false,
            },
            allFinish: false,//所有课程都完成.
            allowLesson: 'FREE',//用户听课权限
        };
    },

    componentWillMount() {
        //判断连接是否需要跳转
        let goPath = Util.getUrlPara('goPath');
        if(goPath){
            location.hash = goPath;
        }
        let userId = User.getUserInfo().userId;
        console.log("===userId = " + userId);
        //判断用户当前的购买状态，未购买则直接跳转到支付页面
        if (userId) {
            this.init();
        } else {
            OnFire.on(Config.OAUTH_SUCCESS, ()=>{
                this.init();
            });
        }
    },

    /**
    * 检查用户购买状态
    */
    checkUserPayStatue() {
      Material.getJudgeFromServer().done((result)=>{
          Loading.hideLoading();
          if(result){
              this.state.allowLesson = 'ALL';
          } else{ // 未购买直接跳到购买页面
              this.state.allowLesson = 'FREE';
              location.hash = "/payPage";
          }
      }).fail(()=>{

      });
    },

    init() {
        //0.获取听课列表
        this.getCourseList();
        //1.判断听课状态.
        this.checkUserPayStatue();
        //2.获取宝箱信息
        Material.getTreasureInfo().always( (data) => {
            //如果未领取.
            if(!data) {
                this.state.treasure.haveOpen = false;
                this.setState({treasure: this.state.treasure});
            }
        })
    },


    getCourseList () {
        Material.getCourseList().always( (data) => {
            this.setState({courseList: data})
            for( let process of this.state.courseList) {
                if (process.status !== 2) {
                    return;
                }
            }
            //如果课程都通过了,并且没有领取宝箱.
            if(!this.state.treasure.haveOpen){
                this.setState({allFinish: true})
            }
        })
    },

    render() {
        return(
            <div className="course-list">
                <FixedBg/>
                <div>
                    {this.renderTreasure()}
                    {this.renderCourseList()}
                    {this.renderGraduated()}
                    {this.reloadPic()}
                </div>
            </div>
        )
    },

    renderCourseList() {
        let courseList = this.state.courseList;
        let arr = [];
        if(!courseList || courseList.length === 0 ){
            return null;
        } else {
            for (let i = 0; i < courseList.length; i++) {
                let status = courseList[i].status;
                switch (status) {
                    //没有达到听课时间
                    case -1:
                        arr.push(
                            <div className="lesson-bar" onClick={this.renderNotEnter.bind(this,i)}>
                                <LessonBar  index = {i} content = {courseList[i]}></LessonBar>
                            </div>
                        );
                        break;
                    //不为-1
                    default:
                        arr.push(this.renderLesson(i,courseList[i]));
                        break;
                }
            }
            return arr
        }
    },

    //type听课3种课程.
    //F 免费课.
    //S 邀请试听课.
    //P 付费课.
    //这部分可以在点击后统一处理.一个render不同的绘制点击结果.
    renderLesson(index,courseList) {
        let arr = [];
        courseList.type = 'P';
        switch (courseList.type){
            case 3:
                //点击后,显示不能播放,然后显示跳转过去.
                //第一次完成免费/试听后,会有付费的流程.
                //这个地方也许要...提示免费课程还有多少
                arr.push(
                    <div className="lesson-bar">
                        <LessonBar  index = {index} content = {courseList} cbfGoLesson = {this.cbfGoLesson} cbfSeeReward = {this.cbfSeeReward}></LessonBar>
                    </div>
                    );
                break;
            default:
                arr.push(
                    <Link className="lesson-bar" to={{pathname:"/course/"+ (index + 1)}}>
                        <LessonBar index = {index} content = {courseList} ></LessonBar>
                    </Link>
                );
                break;
        }
        return arr;
    },

    //跳转到听课界面
    cbfGoLesson(courseId) {
        location.hash = '/course/' + (courseId + 1);
    },

    //不能继续收听.付钱
    cbfNotAllowLesson(type) {
        console.log('cbf' + type);
        window.dialogAlertComp.show('不能试听','付钱！快来吧','付钱',()=>
        {location.hash = '/payPage'},'先不要',true)
    },

    //点击成就卡回调函数
    cbfSeeReward(courseId) {
        //如果已获得成就卡
        location.hash = '/getReward/' + (courseId + 1);
        //如果未获得成绩卡
    },


    renderNotEnter(index) {
        window.dialogAlertComp.show('还没有开放课程哦','每天更新一课哦，耐心等一等吧！','知道啦',()=>{},()=>{},false);
    },

    //可以领取宝箱,自动滚动
    componentDidUpdate() {
        if(boolOnce){
            if(this.state.treasure.canOpen){
                scrollTo(0,999);
                boolOnce = false;
            }
        }

    },

    //预加载毕业证的大图.
    reloadPic() {
        //如果可以领取
        if(this.state.treasure.canOpen){
            return(
                <div className="reload-bg" style = {{backgroundImage: 'url("./assets7Intro/image/course/graduated.png")'}}></div>
                )
        }
    },



    renderTreasure() {
        console.log('render treasure');
        let courseList = this.state.courseList;
        if (!courseList.length || courseList.length === 0) {
            return null;
        }
        let countUnlock = 0;
        let countPass = 0;
        let countTotle = this.state.courseList.length;
        let result = 0;
        for ( let i = 0; i < courseList.length; i++ ){
            result = courseList[i].status;
            if (result !== -1) {
                countUnlock++;
            }
            if (result === 2) {
                countPass++;
            }
        }
        if( countUnlock === countTotle ) {
            this.state.treasure.canView = true;
        }
        if( countPass === countTotle ) {
            this.state.treasure.canOpen = true;
        }
        // this.calcTreasureInfo();

            // return(<div className="lesson-bar" onClick={this.openTreasure}>
            //         <TreasureBar treasure = {this.state.treasure}></TreasureBar>
            //         </div>)
        return <img onClick={this.openTreasure} className={this.state.allFinish ? 'fix-treasure-shake' : 'fix-treasure'} src={'./assets7Intro/image/course/treasure.png'}/>


    },

    // calcTreasureInfo() {
    //     let treasure =  this.state.treasure;
    //     if(treasure.canView) {
    //         //
    //         treasure.status = 0;
    //     }else if(!treasure.canOpen) {
    //         //不可以打开,因为没有完成所有的课程
    //         treasure.status = 0;
    //     } else if (this.state.treasure.canOpen) {
    //         //可以打开
    //         treasure.status = 1;
    //     }
    //     else if (!treasure.haveOpen) {
    //         //不可以打开,页还没打开
    //         treasure.status = 3;
    //     } else {
    //         //已经领取
    //         treasure.status = 2;
    //     }
    // },

    renderGraduated(){
        if(this.state.treasure.canOpen){
            return(
                <div>
                    <img className="graduatedButton" onClick={this.openGraduated} src={'./assets7Intro/image/course/graduatedButton.png'}/>
                </div>
            )
        } else if(this.state.courseList.length && this.state.courseList.length !== 0){
            return(
                <div>
                    <div className="show-group" onClick={this.showGroup}>点我加入7天学习群</div>
                </div>
            )
        }
    },

    showGroup() {
        window.dialogAlertComp.show('快来加入7天学习群','在群里可以分享到理财干货，更有师兄直播讲课答疑哦！快来吧','点击加群',()=>
        {location.href = "https://jq.qq.com/?_wv=1027&k=49fUv5j";},'先不要',true)
    },

    openGraduated() {
        Util.postCnzzData("点击毕业证");
        Material.getGraduatedRank().always( (rank) => {
            //2如果请求道有效值
            // rank !== -1
            if ( rank!== -1 ) {
                let courseId = 8;
                if (courseId) {
                    location.hash = '/getGraduated/';
                }
            } else {
                window.dialogAlertComp.show('还不能领取毕业证哦！','你还没有完成全部课程呢，要都通过才行哦。','好的',()=>{},'',false);
            }
        });
    },

    openTreasure() {
        if(this.state.treasure.canView) {
            if(this.state.treasure.canOpen){

                if(this.state.treasure.haveOpen) {
                    //领了
                    window.dialogAlertComp.show('你已经领取过宝箱啦','使用长投FM去积分商城兑换奖励吧！','去看看',()=>{
                        location.href = "https://h5.ichangtou.com/h5/fm/index.html#/mall";},'等一等',true);
                } else {
                    //听完课,还没领,
                    //1如果可以完成毕业证
                    Material.openTreasure().always( (data) => {
                        //弹出打开宝箱的界面1
                        if(data.status)
                        {
                            Util.postCnzzData("成功领取宝箱");
                            this.state.treasure.haveOpen = true;
                            window.dialogAlertComp.show('领取了50金币！','使用长投FM去积分商城兑换奖励吧！','去看看',()=>{
                                Util.postCnzzData("宝箱跳转FM");
                                location.href = "https://h5.ichangtou.com/h5/fm/index.html#/mall";},'等一等',true);
                        } else {
                            Util.postCnzzData("失败领取宝箱",data.msg);
                            window.dialogAlertComp.show(data.msg,'领取失败了','我知道了',()=>{},()=>{},false);
                        }
                    })
                }
            } else {
                ////到了第七天,还没听完课
                window.dialogAlertComp.show('毕业宝箱等着你！','完成了7天所有的训练才能获得毕业宝箱！希望就在前方！','我没问题的',()=>{},()=>{},false);
            }
        } else {
            //还没有到第七天
            window.dialogAlertComp.show('毕业宝箱等着你！','完成7天的训练后，才可以领取毕业证和宝箱噢。加油！','我会加油的',()=>{},()=>{},false);
        }
    }
});

module.exports = CourseSelect;
