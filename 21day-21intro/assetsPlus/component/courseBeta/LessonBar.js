/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');

const LessonBar = React.createClass({

    getInitialState: function() {
        return {
            content: this.props.content,
            index: this.props.index,
            day: [
                '壹',
                '贰',
                '叁',
                '肆',
                '伍',
                '陆',
                '柒',
                '捌',
                '玖',
                '拾',
                '壹',
                '贰',
                '叁',
                '肆',
            ],
            type: [
                '未解锁!',
                '新的!未听!',
                '没听完',
                '已完成'
            ],
            rewardPic: "./assetsPlus/image/course/indNote.png",
            typePic: [
                "./assetsPlus/image/course/indWrong.png",
                "./assetsPlus/image/course/indRight.png",
                "./assetsPlus/image/course/indRight.png",
                "./assetsPlus/image/course/indRight.png",
            ],
        };
    },

    render() {
        return(
            <div>
                {this.renderBg()}
                {this.LineRender()}
            </div>
        )
    },
    renderBg() {
        if(this.props.content.courseStatus.see){
            return(<div className="bar-background"></div>)
        }

    },

    // style={{backgroundImage:'url('+content.image+')'}}
    LineRender() {
        let content = this.state.content;
        //看不到
        if(this.props.content.courseStatus.see)
        {
            return (<div className="column-container">
                <div className="bg-number"><h1>{this.state.day[this.props.index]}</h1></div>
                {/*<div className="pic-container" onClick={this.callBackFunc.bind(this,'goReward')}>{this.renderReward()}</div>*/}
                <div className="touch-range" onClick={this.callBackFunc.bind(this,'goCourse')}></div>
                {this.renderFinish()}
                <span className="column-container-title"><h2>{content.title}</h2></span>
            </div>)
        } else {
            return(<img onClick={this.callBackFunc.bind(this,'goCourse')} className="bg-not-see" src = "./assetsPlus/image/course/tomorrow.png"/>)
            // return (<div className="column-container" onClick={this.callBackFunc.bind(this,'goCourse')}>
            //     <div className="column-not-view">
            //         <h2>
            //             {content.title}
            //         </h2>
            //         {this.renderFreeNextDay()}
            //     </div>
            // </div>)
        }

    },

// {/*<span>{this.state.type[content.status + 1]}</span>*/}
// {/*<img className="column-type" src={this.state.typePic[content.status + 1]}/>*/}

    callBackFunc(type) {
        let content = this.state.content;
        switch (type) {
            case 'goCourse':
                this.props.cbfGoLesson(content, this.state.index);
                break;
            case 'goReward':
                this.props.cbfSeeReward(content, this.state.index);
                break;
            case 'all':
                this.props.cbfGoLesson(content, this.state.index);
                break;
            case 'pic':
                this.props.cbfSeeReward(content, this.state.index);
                break;
            case 'no-time':
                this.props.cbfSeeReward(content, this.state.index);
                break;
            default:
                console.log('error' + type);
                break;
        }

    },
    //渲染明日的免费课.
    renderFreeNextDay() {
        if (this.props.content.courseStatus.enter === 'free-no-pay') {
            if (this.state.index === 1) {
                return(<p style={{textAlign:"right"}}>付费收听</p>)
            }
        }
    },

    //渲染免费听课
    // renderFree() {
    //     if (this.state.courseStatus.enter === 'free-enter') {
    //         return(<p>免费试听</p>)
    //     }
    // },

    //渲染成就卡
    renderReward(){
        let arr = [];
        switch (this.props.content.courseStatus.reward) {
            case 'free-not-get':
                arr.push(<img  className="column-pic" src={this.state.rewardPic}/>);
                break;
                break;
            case 'not-get':
                arr.push(<img style={{opacity: '0.2'}} className="column-pic" src={this.state.rewardPic}/>);
                break;
            case 'get':
                //如果已获得成就卡
                arr.push(<img className="column-pic" src={this.state.rewardPic}/>);
                break;
            default:
                console.log('error' + this.props.content.courseStatus.reward);
                break;
        }
        return arr;
    },

    //渲染finish
    renderFinish() {
        // return <img onClick={this.callBackFunc.bind(this,'goReward')} className="column-type" src={'./assetsPlus/image/course/indFinished.png'}/>
        if( this.props.content.courseStatus.allFinish) {
            return <img onClick={this.callBackFunc.bind(this,'goReward')} className="column-type" src={'./assetsPlus/image/fund/indFinished.png'}/>
        } else {
            if (this.props.content.courseStatus.enter === 'free-enter') {
                return(<p className = "free-lesson">免费收听</p>)
            }
            // return <div className="space-pic"></div>
        }
    }
});

module.exports = LessonBar;