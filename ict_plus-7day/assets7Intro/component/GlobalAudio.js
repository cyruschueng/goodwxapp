/**
 * Created by Administrator on 17-3-1.
 */
const $ = require('jquery');
const React = require('react');
const ReactDom = require('react-dom');
const OnFire = require('onfire.js');

const Material = require('../Material');
const WxConfig = require('../WxConfig');
const User = require('../User');
const Util = require('../Util');

const GHGuider = require('./GHGuider');

var audioInstance = null;
var learningTime = 0;

const GlobalAudioComp = React.createClass({

    getPropsType(){
        return {
            audioSource: React.PropTypes.string.isRequired,
            fmid: React.PropTypes.string.isRequired
            //onPause: React.PropTypes.func.isRequired,
            //onPlay: React.PropTypes.func.isRequired
        }
    },

    getInitialState() {
        return {
            audioSource: this.props.audioSource,
            timer: -1,
            fmid: this.props.fmid
        }
    },

    componentWillMount() {
        //console.log('ga',this.state.audioSource);
    },

    componentWillUnMount() {

    },

    componentWillReceiveProps(nextProps) {
        //console.log('nextProps.audioSource',nextProps.audioSource,
        //'this.state.audioSource',this.state.audioSource);

        if(nextProps.audioSource != this.state.audioSource){
            this.setState({
                audioSource: nextProps.audioSource,
                fmid: nextProps.fmid
            })
        }
    },

    componentDidMount(){
        //console.log('ga d',this.state.audioSource);
    },

    /**
     * 音频加载完毕
     */
    loadHandler(e) {
        console.log('loadHandler : ', e.target.duration);
    },

    play() {
        this.setState({
            isPlaying: true
        });

        $('#globalAudio')[0].play();
    },

    /**
     * 播放
     */
    playHandler() {
        this.setState({
            isPlaying: true
        });

        if (this.state.timer) {
            clearInterval(this.state.timer);
            learningTime = 0;
        }
        this.setState({
            timer: (setInterval(()=>{

                let audio = $('#globalAudio')[0];

                if(!audio){
                    return;
                }

                OnFire.fire('PLAY');

                let userInfo = User.getUserInfo();

                if(userInfo.userId){

                    if(learningTime != 0 && parseInt(learningTime) % 60 === 0 ) {
                        //每一分钟，上传到服务器，请求后服务器自动加1分钟学习时间
                        Material.updateLearningTime();
                    }
                    learningTime ++;
                }


            }, 1000))
        })
    },


    /**
     * 暂停
     */
    pauseHandler() {
        this.setState({
            isPlaying: false
        });


        clearInterval(this.state.timer);
    },


    /**
     * 听完
     */
    endedHandler() {
        // this.pauseHandler();

        GlobalAudio.pause();

        OnFire.fire('AUDIO_END');

        Util.postCnzzData('听完');
    },

    render() {

        return (
            <div className="fm-audio-player">
                <audio autoPlay={false}
                       ref="audio"
                       id="globalAudio"
                       onLoadedData={this.loadHandler}
                       onPlay={this.playHandler}
                       onPause={this.pauseHandler}
                       onEnded={this.endedHandler}
                       onRateChange={this.handler}
                       onProgress={this.handler}
                       src={this.state.audioSource}>
                </audio>

            </div>
        )
    }
});


class GlobalAudio {
    static play(audioSource,fmid){
        console.log('audioSource',audioSource);
        console.log('fmid',fmid);

        if( audioInstance ){
            audioInstance.play();
        }else {
            audioInstance = ReactDom.render(
                <GlobalAudioComp/>, $('#audio')[0]);
        }

        //console.log('audioSource',audioSource);
        //console.log('audioInstance',audioInstance);

        audioInstance.setState({
            audioSource: audioSource,
            fmid
        });

        setTimeout(()=>{
            $('#globalAudio')[0].play();
        },1000);

    }

    static pause() {
        if(audioInstance){
            audioInstance.setState({
                isPlaying: false
            });

            $('#globalAudio')[0].pause();
        }
    }



}

module.exports = GlobalAudio;