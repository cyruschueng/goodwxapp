/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
//接口
//totalElement
//finishElement
//this.props.userSet
//styleDefault
//styleChoose


const CourseProcessBar = React.createClass({


    render() {
        return(
            <div className="course-process-bar">
                {/*<p>{this.props.finishElement}</p>*/}
                {/*<p>{this.props.totalElement}</p>*/}
                {this.renderType()}
            </div>
        )
    },

    renderType() {
        if(this.props.userSet) {
            return(this.renderUserSet())
        } else {
            return(this.renderTotalElement())
        }
    },

    renderUserSet () {
        let arr = [];

        for (let i = 0; i < this.props.totalElement; i++) {
            let style = this.props.styleDefault;
            //如果当前渲染的
            if ( i < this.props.finishElement) {
                style = this.addStyle(this.props.styleDefault,this.props.styleChoose);
            }
            arr.push(<div style={style}></div>)
        }
        return arr;
    },

    addStyleByStatus() {

        let addStyle = {};

        return this.addStyle(originStyle, addStyle);
    },

    addStyle(originStyle, addStyle) {
        let copy1 = JSON.parse(JSON.stringify(originStyle));
        for (let style in addStyle) {
            copy1[style] = addStyle[style];
        }
        return copy1;
    },

    renderTotalElement() {
        let arr = [];
        for (let i = 0; i < this.props.totalElement; i++) {
            //如果当前渲染的
            if ( i < this.props.finishElement) {
                arr.push(<img className="process-bar" index = {i} src={"./assetsPlus/image/course/processBar_On.png"}/>)
            } else {
                arr.push(<img className="process-bar" index = {i} src={"./assetsPlus/image/course/processBar_Off.png"}/>)
            }
        }
        return arr;
    },


});

module.exports = CourseProcessBar;
