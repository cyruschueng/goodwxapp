/**
 * Created by yiran on 2017/5/5.
 */
const $ = window.$ = require('jquery');
const React = require('react');
const OnFire = require('onfire.js');

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
        };
    },

    componentWillMount() {
        console.log('1.yiran');
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

    render() {
        let content = this.props.content;
        let buttonImgs = this.props.buttonImgs;
        return(
            <div onClick={this.controlHandler} className="audio-title-seven" style={this.props.bgImg}>
                <img className="click-button" src={this.state.isPlaying ? buttonImgs[0] : buttonImgs[1]}/>
                {/*<p style={this.props.titleColor} className={this.state.isPlaying ? 'title-bottom':'title-top'}>{content.title}</p>*/}
                <p style={this.props.titleColor} className={'title-top'}>{content.title}</p>
            </div>
        )
    },

});

module.exports = AudioBar;