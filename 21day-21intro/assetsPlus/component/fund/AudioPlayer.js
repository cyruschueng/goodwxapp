/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const Project = require('../../Project');

const AudioBar = React.createClass({

    // getInitialState(){
    //     return{
    //         playbarWidth: 0
    //     }
    // },


    getInitialState: function() {
        return {
            content: this.props.content,
            index: this.props.audioIndex,
            isPlaying: false,
            pptIndex: 0,
        };
    },

    componentWillMount() {
        if (this.state.index === this.props.playingIndex) {
            this.setState({isPlaying: true});
        } else {
            this.setState({isPlaying: false});
        }
    },

    componentWillReceiveProps(nextProps) {
        if (this.state.index === nextProps.playingIndex) {
            this.setState({isPlaying: true});
        } else {
            this.setState({isPlaying: false});
        }
    },

    // componentDidUpdate() {
    //     OnFire.fire('Course_AutoMove')
    // },


    controlHandler: function() {
        this.props.audioCallBack(this.state.index, this.state.isPlaying);
    },

    PPTComponent(content, index) {
            const num = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
            return(
                <div onClick={this.controlHandler}>
                    {this.state.isPlaying && <p className={this.state.isPlaying ? 'title-bottom-fund':'title-top-fund'} style={{dispaly:'none'}}>
                        <img src={content.pptUrl[this.state.pptIndex]} className="title-ppt"/>
                    </p>}
                    {!this.state.isPlaying && <p className={this.state.isPlaying ? 'title-bottom-fund':'title-top-fund'} style={{background: '#545454'}}>
                        <p className="title-play-logo">
                            <img src="./assetsPlus/image/course/btnPlayer.png" alt=""/>
                        </p>
                        <p className="title-play-text">
                            <p>
                                <span>第{num[index]}节</span><br/>
                                <span>{content.title}</span>
                            </p>
                        </p>
                    </p>}
                </div>
            )
        
    },

    render() {
        let content = this.props.content;
        let index = this.props.audioIndex;
        return(
            <div className="audio-title-fund">
                {/*<img className="click-button" src={this.state.isPlaying ? './assetsPlus/image/course/btnPressed.png':'./assetsPlus/image/course/btnPlay.png'}
                 />*/}
                {this.PPTComponent(content, index)}
                {this.buttonNextPage('L')}
                {this.buttonNextPage('R')}
            </div>
        )
    },

    buttonNextPage(type) {
        if(!this.props.currentPlaying) {
            return
        }
        if(type === 'L') {
            if(this.state.pptIndex !== 0) {
                return(<img className="button-left" onClick={this.nextPPt.bind(this,type)} src="./assetsPlus/image/course/pptButtonLeft.png"/>
                )
            }
        } else {
            if(this.state.pptIndex !== this.state.content.pptUrl.length - 1) {
                return(<img className="button-right" onClick={this.nextPPt.bind(this,type)} src="./assetsPlus/image/course/pptButtonRight.png"/>
                )
            }
        }

    },

    nextPPt(type) {
        console.log('get click' +this.state.pptIndex);
        if(type === 'L') {
            this.state.pptIndex = this.state.pptIndex - 1;
        } else if(type ==='R') {
            this.state.pptIndex = this.state.pptIndex + 1;
        }
        this.setState({pptIndex: this.state.pptIndex});
        console.log('get click' +this.state.pptIndex);
    },

});

module.exports = AudioBar;