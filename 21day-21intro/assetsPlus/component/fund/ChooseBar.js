/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const OnFire = require('onfire.js');

const ChooseBar = React.createClass({

    getInitialState: function() {
        return {
            choose: -1,
            tipShow: -1,
            answer: -1,
            process: this.props.question.process,
            results: [-1,-1,-1,-1],
            nowClick: -1,
        };
    },


    handleClick(index) {
        // this.setState({liked: !this.state.liked});
        OnFire.fire('Course_AutoMove');
        Util.postCnzzData("点击作业");
        this.setState({nowClick: index});
        if(index === this.props.question.trueindex[0])
        {

            this.state.results[index] = 1;
            this.setState({results: this.state.results})
            console.log('right');
            this.setState({answer: 1});
            this.props.passCallBack(this.props.lessonIndex ,this.props.index);
        } else {
            Util.postCnzzData("选择题错了(sId)",this.props.question.subjectid);
            this.state.results[index] = 0;
            this.setState({results: this.state.results});
            this.setState({answer: 0});
        }
    },

    render() {
        var question = this.props.question;
        return(
        <div className="choose-bar-fund">
            <div className="choose-part">
                <div className="choose-question">
                    <h1>问题</h1>
                    <p>{question.introduce}</p>
                </div>
                <div className="choose-answer-bg">
                    {this.optionRender()}
                </div>
            </div>
            {this.tipsRender()}
        </div>
        )
    },

    optionRender () {
        let question = this.props.question;
        let arr=[];
        for(let i = 0; i< question.answerList.length; i++) {
            arr.push( <div className={(this.state.nowClick === i || (this.state.nowClick === -1 && question.process && question.trueindex[0] === i) ) ? 'choose-options-on' : 'choose-options-off'}key={i}>
                {this.resultRender(i)}
                <div className="choose-options-click" onClick={this.props.question.process ? null : this.handleClick.bind(this, i)}></div>
                <p className="choose-answer-word">{question.answerList[i].detail}</p>
                </div>)
        }
        return arr;
    },

    resultRender(index) {
        let question = this.props.question;
        //通过情况下.绘制正确答案
        if(this.state.process) {
            if(question.trueindex[0] === index) {
                this.state.nowClick = index;
                return <div style = {{backgroundColor: '#5FCF5A'}} className='choose-options-bg'></div>
            } else {
                return null;
            }
        } else if(this.state.nowClick === index){
            if(this.state.results[index] === 1) {
                return <div style = {{backgroundColor: '#5FCF5A'}} className='choose-options-bg'></div>
            } else if(this.state.results[index] === 0){
                return <div style = {{backgroundColor: '#CF5959'}} className='choose-options-bg'></div>
            }
        }
    },

    // resultRender(index) {
    //     let question = this.props.question;
    //     //通过情况下.绘制正确答案
    //     if(this.state.process) {
    //         if(question.trueindex[0] === index) {
    //             this.state.nowClick = index
    //             return <img className= "choose-options-img" src={'./assetsPlus/image/course/indRight.png'}></img>
    //         } else {
    //             return null;
    //         }
    //     } else if(this.state.nowClick === index){
    //         if(this.state.results[index] === 1) {
    //             return <img className= "choose-options-img" src={'./assetsPlus/image/course/indRight.png'}></img>
    //         } else if(this.state.results[index] === 0){
    //             return <img className= "choose-options-img" src={'./assetsPlus/image/course/indWrong.png'}></img>
    //         }
    //     }
    // },

    tipsRender () {
        if(this.state.answer !== -1 || this.props.question.process)
        {
            return (<div className="choose-tips">
                <h1 className="tips-font">Tips</h1>
                <div className="tips-bg">
                    <p className="tips-font">{this.props.question.tips}</p>
                </div>
            </div>);
        }

    },

});

module.exports = ChooseBar;
