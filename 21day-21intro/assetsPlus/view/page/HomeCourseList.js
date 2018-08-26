/**
 * Created by ichangtou on 2017/6/23.
 */
/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const Tools = require('../../GlobalFunc/Tools');
const Util = require('../../Util');
const Material = require('../../Material');
const Statistics = require('../../GlobalFunc/Statistics');
// const MyStorage = require('../../GlobalFunc/MyStorage');
const GlobalConfig = require('../../GlobalStorage/GlobalConfig');
const WxConfig = require('../../WxConfig');
const Actions = require('../../GlobalStorage/Actions');
const Carousel = require('../../component/home/Carousel');
const Banner = require('../../component/home/Banner');

const PreFetch = require('../../GlobalFunc/PreFetch');
// const SwipeView = require('../../component/container/SwipeView').default;

let bannerTimer;//banner timer

const HomeCourseList = React.createClass({
    getInitialState: function() {
        return {
            content: this.props.content,
            bannerIndex: 0,
            bannerContent: [],
            courseStatusList: [],//课程ID列表
            courseShowList: [],
            courseContent: [,'./assetsPlus/image/home/course_fund.png'],//课程内容信息
            bannerPic: ['./assetsPlus/image/home/banner_seven.png','./assetsPlus/image/home/banner_fund.png','./assetsPlus/image/home/banner_seven.png','./assetsPlus/image/home/banner_fund.png',],//课程内容信息
        };
    },

    componentWillMount() {
        MyStorage.whenEnterPage('homelist');
        Loading.hideLoading();
        //0 设置页面默认分享
        // WxConfig.shareConfig(shareTitle,desc,link);
        //1 获取课程ID
        this.getCourseList();
        //2 根据课程列表获取课程信息
        this.getCourseContent();
        //3 根据课程Id获取用户相关数据
        this.getCourseStatus();
    },

    preFetchBg(index,path) {
        if(index === 3) {
            return
        } else {
            index++;
        }
        let url = `./assetsPlus/image/${path}/join-content-${index}.png`;
        PreFetch.fetchSerialRes(url).then(this.preFetchBg.bind(this,index,path));
    },

    preFetchRes(courseId) {
        //针对这门课预加载.测试
        if(courseId === 2) {
            let path = GlobalConfig.getCourseName();
            this.preFetchBg(-1,path);
        }

        // let url = `./assetsPlus/image${path}/join-content.png`;
        // console.log(url);
        // PreFetch.fetchRes(url,0);
    },




    //获取列表并初始化
    getCourseList() {
        let courseList = GlobalConfig.getCourseIdList();
        let courseInfo = {};
        for (let i = 0; i < courseList.length; i++) {

            courseInfo = GlobalConfig.getCourseInfo(courseList[i]);

            switch (courseInfo.show) {
                case 0:
                    break;
                case 1:
                    this.state.courseShowList.push({id: courseList[i], image: courseInfo.mainImage, path: courseInfo.path});
                    break;
                case 2:
                    this.state.courseStatusList.push({id: courseList[i]});
                    this.state.courseShowList.push({id: courseList[i], image: courseInfo.mainImage});
                    break;
                default:
                    break;
            }
            this.setState({
                courseShowList: this.state.courseShowList,
                courseStatusList: this.state.courseStatusList,
            })
        }
    },

    getCourseContent() {

    },

    //根据列表获取购买情况
    getCourseStatus() {
        let courseList = this.state.courseStatusList;
        for( let i = 0; i<courseList.length; i++) {
            let courseId = courseList[i].id;
            Actions.ifCourseSignUp(courseId);
            //action & get
            //这边的结果完成后get
            Tools.fireRaceCourse(courseId).then((value)=>{
                for( let i = 0; i <  courseList.length; i++ ) {
                    if(courseList[i].id === courseId) {
                        this.state.courseStatusList[i].payStatus = value.pay;
                    }
                }
                this.setState({courseStatusList: this.state.courseStatusList});
                //4 预加载资源
                this.preFetchRes(courseId);
            })
        }
        //首先,这是一个课程列表
        //每个列表关心自己的课程状态
        //让他们分别去获取.fireRace
        //如果拿到的ID是自己的.那么执行逻辑
        //如果不是自己的.那么继续等待
        //或者是保存完所有的之后统一进行
        //因为课程状态没办法精确
    },

    //跳转外链接
    goOutUrl(urlPath) {
      console.log(urlPath);
        location.href = urlPath;
    },

    goRouter(courseId) {
        Statistics.postDplusData('点击_课程_列表',[courseId]);
        for( let i in this.state.courseShowList) {
            if(this.state.courseShowList[i].id === courseId) {
                if(this.state.courseShowList[i].path)  {
                    this.goOutUrl(this.state.courseShowList[i].path)
                    return;
                }
            }
        }
        //当抓到courseId后都需要一系列操作
        //设置微信
        //设置id
        //获取课程状态
        Loading.showLoading('获取课程中...');
        let enterWhere;
        Tools.fireRaceCourse(courseId).then((value)=>{
            //0保存上当前的课程ID
            if (value.pay) {
                enterWhere = '/courseSelect';
                sessionStorage.setItem('SisBuy','付费');
            } else {
                enterWhere = '/payPage';
                sessionStorage.setItem('SisBuy','未付费');
            }
            MyStorage.setCourseId(courseId);
            //3设置默认分享
            // WxConfig.shareConfig();
            Loading.hideLoading();
            //4设置跳转
            Tools.MyRouter('',enterWhere);
        });

        // switch (type) {
        //     case 0:
        //         Tools.MyRouter('PayPage','/payPage');
        //         break;
        //     case 1:
        //         Tools.MyRouter('CourseSelect','/courseSelect');
        //         break;
        // }

    },


    //渲染
    render() {
        // console.log(Banner);
        return(
            <div className="home-course-list">
                <div className = 'course-banner'>
                    <Banner totalImage = {this.state.bannerPic} cbfClickBanner = {this.cbfClickBanner}/>
                </div>
                <div>
                    {/*<div className="course-banner">*/}
                        {/*<img src="./assetsPlus/image/home/banner_seven.png"/>*/}
                    {/*</div>*/}
                    <div className="course-list">
                        {this.renderCourseList()}
                    </div>
                </div>
            </div>
        )
    },

    cbfClickBanner(index) {
        let courseId = index % 2;
        Statistics.postDplusData('点击_课程_横幅',[index]);
        this.goRouter(courseId);
    },


    renderCourseList(){
        let arr =[];
        let courseList = this.state.courseShowList;
        for(let i = 0;i<courseList.length;i++) {
            arr.push(<div className="course-content-line" key={i} onClick={this.goRouter.bind(this,courseList[i].id)}>
                <img className="course-line-img" src={courseList[i].image}/>
            </div>)
        }
        return arr;
    },

    // renderCourseList3() {
    //     let arr =[];
    //     let courseList = this.state.courseList;
    //     for(let i = 0;i<courseList.length;i++) {
    //         arr.push(<div className="course-content-line" key={i} onClick={this.goRouter.bind(this,courseList[i],0)}>
    //             <span>课程ID为{courseList[i]}</span>
    //             <span>课程名称为{this.state.courseContent[i]}</span>
    //             <span>课程状态为{this.state.courseStatus[i].payStatus}</span>
    //         </div>)
    //     }
    //     return arr;
    // },
    //
    //
    //
    // renderCourseList2(){
    //     let arr =[];
    //     let courseList = this.state.courseList;
    //     for(let i = 0;i<courseList.length;i++) {
    //         arr.push(<div className="course-content-line" key={i} onClick={this.goRouter.bind(this,courseList[i],1)}>
    //             <span>课程ID为{courseList[i]}</span>
    //             <span>课程名称为{this.state.courseContent[i]}</span>
    //             <span>课程状态为{this.state.courseStatus[i].payStatus}</span>
    //         </div>)
    //     }
    //     return arr;
    // }
});

module.exports = HomeCourseList;