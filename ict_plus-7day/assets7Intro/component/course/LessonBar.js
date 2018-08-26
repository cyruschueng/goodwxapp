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
                "./assets7Intro/image/course/card_1_b.png",
                "./assets7Intro/image/course/card_2_b.png",
                "./assets7Intro/image/course/card_3_b.png",
                "./assets7Intro/image/course/card_4_b.png",
                "./assets7Intro/image/course/card_5_b.png",
                "./assets7Intro/image/course/card_6_b.png",
                "./assets7Intro/image/course/card_7_b.png",
            ],
            unlockPic: [
                "./assets7Intro/image/course/card_1_b.png",
                "./assets7Intro/image/course/card_2_b.png",
                "./assets7Intro/image/course/card_3_b.png",
                "./assets7Intro/image/course/card_4_b.png",
                "./assets7Intro/image/course/card_5_b.png",
                "./assets7Intro/image/course/card_6_b.png",
                "./assets7Intro/image/course/card_7_b.png",
            ],
            typePic: [
                "./assets7Intro/image/course/indWrong.png",
                "./assets7Intro/image/course/indRight.png",
                "./assets7Intro/image/course/indRight.png",
                "./assets7Intro/image/course/indRight.png",
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
        if(content.status === -1)
        {
            return (<div className="column-container">
                <div className="column-not-view">
                    <h1>
                        {this.state.day[this.state.index]}
                    </h1>
                    <h2>
                        {content.title}
                    </h2>
                </div>

            </div>)
        } else {
            return (<div className="column-container">
                <div className="pic-container" onClick={this.callBackFunc.bind(this,'pic')}>
                    <img className="column-pic" src={content.status === 2 ? this.state.unlockPic[this.state.index]:this.state.lockPic[this.state.index]}/>
                </div>
                <div className="touch-range" onClick={this.callBackFunc.bind(this,'all')}>

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
        if(type === 'all'){
            // this.props.cbfNotAllowLesson(content.status);
            this.props.cbfGoLesson(this.state.index);
        } else if(type === 'pic') {
            this.props.cbfSeeReward(this.state.index);
        }

    },

    renderFinish() {
        if( this.state.content.status === 2) {
            return <img className="column-type" src={'./assets7Intro/image/course/indFinished.png'}/>
        } else {
            return <div className="space-pic"></div>
        }
    }
});

module.exports = LessonBar;