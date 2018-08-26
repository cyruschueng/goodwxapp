/**
 * Created by ichangtou on 2017/7/9.
 */
/**
 * Created by yiran on 2017/5/5.
 */
const $ = window.$ = require('jquery');
const React = require('react');

const LessonBar = React.createClass({

    getInitialState: function() {
        return {
            content: this.props.content,
            index: this.props.index,
            day: [
                '第一天',
                '第二天',
                '第三天',
                '第四天',
                '第五天',
                '第六天',
                '第七天',
            ],
            type: [
                '未解锁!',
                '新的!未听!',
                '没听完',
                '已完成'
            ],
            lockPic: [
                "./assetsPlus/image/seven/card_1_b.png",
                "./assetsPlus/image/seven/card_2_b.png",
                "./assetsPlus/image/seven/card_3_b.png",
                "./assetsPlus/image/seven/card_4_b.png",
                "./assetsPlus/image/seven/card_5_b.png",
                "./assetsPlus/image/seven/card_6_b.png",
                "./assetsPlus/image/seven/card_7_b.png",
            ],
            unlockPic: [
                "./assetsPlus/image/seven/card_1_b.png",
                "./assetsPlus/image/seven/card_2_b.png",
                "./assetsPlus/image/seven/card_3_b.png",
                "./assetsPlus/image/seven/card_4_b.png",
                "./assetsPlus/image/seven/card_5_b.png",
                "./assetsPlus/image/seven/card_6_b.png",
                "./assetsPlus/image/seven/card_7_b.png",
            ],
            typePic: [
                "./assetsPlus/image/seven/indWrong.png",
                "./assetsPlus/image/seven/indRight.png",
                "./assetsPlus/image/seven/indRight.png",
                "./assetsPlus/image/seven/indRight.png",
            ],
        };
    },

    render() {
        return(
            <div>
                <div className="bar-background"></div>
                {this.LineRender()}
            </div>
        )
    },
    // style={{backgroundImage:'url('+content.image+')'}}
    LineRender() {
        let content = this.state.content;
        //看不到
        if(!this.props.content.courseStatus.see)
        {
            return (<div className="column-container" onClick={this.callBackFunc.bind(this,'goCourse')}>
                <div className="column-not-view">
                    <h1>
                        {this.state.day[this.state.index]}
                    </h1>
                    <h2>
                        {content.title}
                    </h2>
                    {this.renderFreeNextDay()}
                </div>
            </div>)
        } else {
            return (<div className="column-container">
                <div className="pic-container" onClick={this.callBackFunc.bind(this,'goReward')}>
                    {this.renderReward()}
                </div>
                <div className="touch-range" onClick={this.callBackFunc.bind(this,'goCourse')}>

                </div>
                <span className="column-container-title">
                <h1>{this.state.day[this.state.index]}</h1>
                    {this.renderFinish()}
                    <h2>{content.title}</h2>
            </span>
            </div>)
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
                arr.push(<img className="column-pic" src={this.state.unlockPic[this.state.index]}/>);
                break;
                break;
            case 'not-get':
                arr.push(<img className="column-pic" src={this.state.lockPic[this.state.index]}/>);
                break;
            case 'get':
                //如果已获得成就卡
                arr.push(<img className="column-pic" src={this.state.unlockPic[this.state.index]}/>);
                break;
            default:
                console.log('error' + this.props.content.courseStatus.reward);
                break;
        }
        return arr;
    },

    //渲染finish
    renderFinish() {
        if( this.props.content.courseStatus.allFinish) {
            return <img className="column-type" src={'./assetsPlus/image/seven/indFinished.png'}/>
        } else {
            if (this.props.content.courseStatus.enter === 'free-enter') {
                return(<p className = "free-lesson">免费收听</p>)
            }
            // return <div className="space-pic"></div>
        }
    }
});

module.exports = LessonBar;