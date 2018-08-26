/**
 * Created by yiran.
 */
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory =  require('react-router').hashHistory;
const IndexRedirect = require('react-router').IndexRedirect;
var React = require('react');
var App = require('./component/App');
// const FMView = require('./component/FMView');

// const PayPage = require('./component/PayPage');
// const CourseSelect = require('./component/course/CourseSelect');
// const ListenCourse = require('./component/course/ListenCourse');
// const GetReward = require('./component/course/GetReword');
// const GetGraduated = require('./component/course/GetGraduated');

//beta模板课程
const PayPageBeta = require('./view/courseBeta/PayPage');
const CourseSelectBeta = require('./view/courseBeta/CourseSelect');
const ListenCourseBeta = require('./view/courseBeta/ListenCourse');

const PayPageFund = require('./view/fund/PayPage');
const CourseSelectFund = require('./view/fund/CourseSelect');
const ListenCourseFund = require('./view/fund/ListenCourse');
const GetRewardFund = require('./view/fund/GetReword');
const GetGraduatedFund = require('./view/fund/GetGraduated');


const PayPageSeven = require('./view/seven/PayPage');
const CourseSelectSeven = require('./view/seven/CourseSelect');
const ListenCourseSeven = require('./view/seven/ListenCourse');
const GetRewardSeven = require('./view/seven/GetReword');
const GetGraduatedSeven = require('./view/seven/GetGraduated');


const PayPage21 = require('./view/course21/PayPage');
const CourseBegin21 = require('./view/course21/CourseBegin');
const CourseSelect21 = require('./view/course21/CourseSelect');
const ListenCourse21 = require('./view/course21/ListenCourse');
const HomeWork21 = require('./view/course21/HomeWork');

//股票课
const PayPageStock0 = require('./view/stock0/PayPage');
const CourseSelectStock0 = require('./view/stock0/CourseSelect');
const ListenCourseStock0 = require('./view/stock0/ListenCourse');

const InitPage = require('./view/page/InitPage');



const CPlusMain = require('./view/CPlusMain');

let InnerRouter = React.createClass({
    render(){
        // let routerInfo = GlobalConfig.getRouterInfo();
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    {/*<IndexRedirect to="/FMView"/>*/}
                    {/*共有*/}
                    <IndexRedirect to={this.props.goWhere}/>
                    <Route path="/main" component={CPlusMain}/>
                    <Route path="/initPage" component={InitPage}/>
                    {/*基金课*/}
                    <Route path = {`/${ GlobalConfig.getRouterInfo(1)}/${ GlobalConfig.getRouterInfo('pay')}`} component={PayPageFund}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(1)}/${ GlobalConfig.getRouterInfo('select')}`} component={CourseSelectFund}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(1)}/${ GlobalConfig.getRouterInfo('listen')}/:dayId`} component={ListenCourseFund}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(1)}/${ GlobalConfig.getRouterInfo('reward')}/:dayId(/:mine)`} component={GetRewardFund}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(1)}/${ GlobalConfig.getRouterInfo('graduate')}(/:mine)`} component={GetGraduatedFund}/>


                    {/*<Route path ="/fund/payPage" component={PayPageFund}/>*/}
                    {/*<Route path ="/fund/courseSelect" component={CourseSelectFund}/>*/}
                    {/*<Route path ="/fund/listenCourse/:dayId" component={ListenCourseFund}/>*/}
                    {/*<Route path="/fund/getReward/:dayId(/:mine)" component={GetRewardFund}/>*/}
                    {/*<Route path="/fund/getGraduated(/:mine)" component={GetGraduatedFund}/>*/}
                    {/*七天*/}
                    <Route path = {`/${ GlobalConfig.getRouterInfo(0)}/${ GlobalConfig.getRouterInfo('pay')}`} component={PayPageSeven}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(0)}/${ GlobalConfig.getRouterInfo('select')}`} component={CourseSelectSeven}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(0)}/${ GlobalConfig.getRouterInfo('listen')}/:dayId`} component={ListenCourseSeven}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(0)}/${ GlobalConfig.getRouterInfo('reward')}/:dayId(/:mine)`} component={GetRewardSeven}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(0)}/${ GlobalConfig.getRouterInfo('graduate')}(/:mine)`} component={GetGraduatedSeven}/>


                    {/*<Route path ="/seven/payPage" component={PayPageSeven}/>*/}
                    {/*<Route path ="/seven/courseSelect" component={CourseSelectSeven}/>*/}
                    {/*<Route path ="/seven/listenCourse/:dayId" component={ListenCourseSeven}/>*/}
                    {/*<Route path="/seven/getReward/:dayId(/:mine)" component={GetRewardSeven}/>*/}
                    {/*<Route path="/seven/getGraduated(/:mine)" component={GetGraduatedSeven}/>*/}
                    {/*21天*/}
                    {/*<Route path="/course21/payPage" component={PayPage21}/>*/}
                    {/*<Route path="/course21/courseBegin/:type" component={CourseBegin21}/>*/}
                    {/*<Route path="/course21/courseSelect" component={CourseSelect21}/>*/}
                    {/*<Route path="/course21/listenCourse/:dayId" component={ListenCourse21}/>*/}

                    <Route path = {`/${ GlobalConfig.getRouterInfo(2)}/${ GlobalConfig.getRouterInfo('pay')}`} component={PayPage21}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(2)}/${ GlobalConfig.getRouterInfo('begin')}/:type`} component={CourseBegin21}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(2)}/${ GlobalConfig.getRouterInfo('select')}`} component={CourseSelect21}/>
                    <Route path = {`/${ GlobalConfig.getRouterInfo(2)}/${ GlobalConfig.getRouterInfo('listen')}/:dayId`} component={ListenCourse21}/>
                    <Route path = {`/${ GlobalConfig.getCourseInfo(2).name}/${ GlobalConfig.getRouterInfo('homework')}/:dayId`} component={HomeWork21}/>

                    {/*股票课*/}
                    <Route path = {`/${ GlobalConfig.getCourseInfo(3).name}/${ GlobalConfig.getRouterInfo('pay')}`} component={PayPageStock0}/>
                    <Route path = {`/${ GlobalConfig.getCourseInfo(3).name}/${ GlobalConfig.getRouterInfo('select')}`} component={CourseSelectStock0}/>
                    <Route path = {`/${ GlobalConfig.getCourseInfo(3).name}/${ GlobalConfig.getRouterInfo('listen')}/:dayId`} component={ListenCourseStock0}/>

                    {/*Beta课程*/}
                    <Route path = {`/${ GlobalConfig.getCourseInfo(GlobalConfig.getBetaInfo().courseId).name}/${ GlobalConfig.getRouterInfo('pay')}`} component={PayPageBeta}/>
                    <Route path = {`/${ GlobalConfig.getCourseInfo(GlobalConfig.getBetaInfo().courseId).name}/${ GlobalConfig.getRouterInfo('select')}`} component={CourseSelectBeta}/>
                    <Route path = {`/${ GlobalConfig.getCourseInfo(GlobalConfig.getBetaInfo().courseId).name}/${ GlobalConfig.getRouterInfo('listen')}/:dayId`} component={ListenCourseBeta}/>

                    {/*<Route path="/payPage(/:free)" component={PayPage}/>*/}
                    {/*<Route path="/select" component={CourseSelect}/>*/}
                    {/*<Route path="/course/:courseId(/:free)" component={ListenCourse}/>*/}
                    {/*用于标识是自己在听课*/}
                    {/*<Route path="/getReward/:courseId(/:mine)" component={GetReward}/>*/}
                    {/*<Route path="/getGraduated(/:mine)" component={GetGraduated}/>*/}
                    {/*<Route path="/FMView" component={FMView}/>*/}
                </Route>
            </Router>
        )
    }
});

module.exports = InnerRouter;
