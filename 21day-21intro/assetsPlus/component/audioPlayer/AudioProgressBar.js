/**
 * Created by Administrator on 17-3-1.
 */
const $ = window.$ = require('jquery');
const React = require('react');
const OnFire = require('onfire.js');
const Draggable = require('react-draggable');


const AudioProgressBar = React.createClass({

    getInitialState(){
        return{
            playbarWidth: 0,
            index: this.props.audioIndex,
            isPlaying: false,
        }
    },

    componentWillMount() {
        //console.log('AudioProgressBar');
        OnFire.on('PLAY',this.keepgoing);
    },
    

    /**
     * 点击进度条
     * @param e
     */
    progressClickHandler: function progressClickHandler(e) {
        let audio = $('#globalAudio')[0];
        let x = e.nativeEvent.pageX,
            newCurrentTime = audio.duration * (x / window.innerWidth);

        audio.currentTime = newCurrentTime;
    },

    /**
     * 格式化时间
     * @param time
     * @returns {string}
     */
    formatTime(time,position) {

        if(time){
            let minute = Math.floor(time / 60);
            minute = minute < 10 ? '0' + minute : minute;

            let second = Math.round(time%60);
            second = second < 10 ? '0' + second : second;

            return minute + ':' + second;

        }else{
            if(position){
                return '00:00'
            }else{
                return '00:00'
            }
        }
    },


    keepgoing(currentTime){
        let audio = $('#globalAudio')[0];

        if(!currentTime){
            currentTime = audio.currentTime;
        }

        //标记播放进度
        if( audio && audio.duration ) {

            // if(currentTime / audio.duration * 100 >95){
            //     return
            // }

            this.setState({
                playbarWidth : currentTime / audio.duration * 85 + '%'
            })
        }
    },


    /**
     * 拖拽
     * @param ev
     */
    dragTargetHandler(ev) {
        let audio = $('#globalAudio')[0];
        let x = ev.changedTouches[0].pageX;
        let newCurrentTime = audio.duration * ( x/ window.innerWidth );



        if(newCurrentTime > audio.duration){
            newCurrentTime = audio.duration;
        }else if(newCurrentTime <= 0){
            newCurrentTime = 0;
        }

        //console.log('newCurrentTime',newCurrentTime);

        audio.currentTime = newCurrentTime;


        this.keepgoing(newCurrentTime);

    },


    /**
     * 停下拖拽
     * @param ev
     */
    dropOverProgressHandler(ev) {
        //console.log('dropOverProgressHandler',ev,ev.changedTouches[0].pageX)
        let audio = $('#globalAudio')[0];
        let newCurrentTime = audio.duration * (ev.changedTouches[0].pageX / window.innerWidth );

        if(newCurrentTime > audio.duration){
            newCurrentTime = audio.duration;

        }else if(newCurrentTime <= 0){
            newCurrentTime = 0;
        }

        //console.log('newCurrentTime',newCurrentTime);

        audio.currentTime = newCurrentTime;
        //console.log('audio.currentTime',audio.currentTime);

        this.keepgoing(newCurrentTime);
    },

    componentWillReceiveProps(nextProps) {
        if (this.state.index === nextProps.playingIndex) {
            this.setState({isPlaying: true});
        } else {
            this.setState({isPlaying: false});
        }
    },

    render() {
        let audio = $('#globalAudio')[0];
        return(
            <div className="audio-progress-bar" style={this.props.bgImg}>
                {/*<span>是否在播放{this.state.isPlaying ? 'true':'false'}</span>*/}
                {/*<span>这是编号{this.state.index}</span>*/}
                <div className={this.state.isPlaying ? 'is-playing' : 'is-paused'}>
                    <div className="process-panel" onClick={this.progressClickHandler}>
                        <div className="time-bar" style= {this.props.backColor ? {color: `${this.props.backColor[2]}`} : {}}>
                            <span className="time player_position">{this.state.isPlaying && audio && audio.currentTime ? this.formatTime(audio.currentTime,0) : '00:00'}</span>
                            <span className="time">{' / '}</span>
                            <span className="time duration">{this.state.isPlaying && audio && audio.duration ? this.formatTime(audio.duration,1) : '00:00'}</span>
                        </div>
                        {this.renderMovingBar()}
                    </div>
                    <div className="background-bar" style= {this.props.backColor ? {backgroundColor: `${this.props.backColor[1]}`} : {}}></div>
                </div>
            </div>

        )
    },

    renderMovingBar () {
        let myStyle = {};
        if(this.props.backColor) {
            myStyle = {
                transform:' translate(0, 0)',
                backgroundColor: `${this.props.backColor[0]}`}
        } else {
            myStyle = {
                transform: ' translate(0, 0)',
            }
        }

        if (!this.state.isPlaying) {
            return ( <div className="progressbar player_progressbar" onClick={this.progressClickHandler}>
                <div className="seekbar player_seekbar" style={{width: '100%'}}></div>
                <div className="moving-bar" style={{width:"100%",maxWidth:"100%"}}>
                    <div className="moving-ball" style={myStyle}></div>
                </div>
            </div>);
        } else {
            return ( <div className="progressbar player_progressbar" onClick={this.progressClickHandler}>
                <div className="seekbar player_seekbar" style={{width: '100%'}}></div>
                <div className="moving-bar" style={{width:"100%",maxWidth:"100%"}}>
                    <div className="playbar player_playbar" style={{width: this.state.playbarWidth,maxWidth:"100%"}}></div>
                    {this.state.isPlaying &&
                    <Draggable
                        axis="x"  bounds="parent"
                        onStart={this.dragTargetHandler}
                        onDrag={this.dragTargetHandler}
                        onStop={this.dropOverProgressHandler}>
                        <div className="moving-ball" style={myStyle}></div>
                    </Draggable>
                    }
                </div>
            </div>);
        }
    }
});

module.exports = AudioProgressBar;