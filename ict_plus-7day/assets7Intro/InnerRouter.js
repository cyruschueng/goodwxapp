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

const CourseSelect = require('./component/course/CourseSelect');
const PayPage = require('./component/PayPage');
const ListenCourse = require('./component/course/ListenCourse');
const GetReward = require('./component/course/GetReword');
const GetGraduated = require('./component/course/GetGraduated');

let InnerRouter = React.createClass({

    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    {/*<IndexRedirect to="/FMView"/>*/}
                    <IndexRedirect to="/select"/>
                    <Route path="/select" component={CourseSelect}/>
                    <Route path="/payPage(/:free)" component={PayPage}/>
                    <Route path="/course/:courseId" component={ListenCourse}/>
                    <Route path="/getReward/:courseId" component={GetReward}/>
                    <Route path="/getGraduated/" component={GetGraduated}/>
                    {/*<Route path="/FMView" component={FMView}/>*/}
                </Route>
            </Router>
        )
    }
});

module.exports = InnerRouter;
