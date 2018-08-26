/**
 * Created by ichangtou on 2017/7/13.
 */
/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const SwipeView = require("../../component/container/SwipeView").default;

let initPos = 0;
let movingTimer;
let waitTimer;

const Banner = React.createClass({

    getInitialState: function() {
        return {
            currentIndex: 0,//当前收看的图片ID
            totalImage: [],//全部的图片
            isMoveByHand: false,
            picWidth: 0,
            boolAutoMoving: false,
            direction: 'left',
            currentMove: [],
            isAutoMoving: false,
            isMoveByHand: false,
            currentPos: 0,

        };
    },

    componentWillMount() {
        this.getWidth();
        //计算出来需要移动的图片
        this.setCurrentMove();
        this.startWaitTimer();
    },

    getWidth() {
        // document.getElementById('need-draw');
        // this.state.picWidth = 351;
    },


    setCurrentMove() {
        let currentIndex = this.state.currentIndex;
        if(currentIndex === 0) {
            this.state.currentMove[0] = this.props.totalImage.length - 1;
            this.state.currentMove[1] = currentIndex;
            this.state.currentMove[2] = currentIndex + 1;
        } else if (currentIndex === this.props.totalImage.length - 1) {
            this.state.currentMove[0] = currentIndex - 1;
            this.state.currentMove[1] = currentIndex;
            this.state.currentMove[2] = 0
        } else {
            this.state.currentMove[0] = currentIndex - 1;
            this.state.currentMove[1] = currentIndex;
            this.state.currentMove[2] = currentIndex + 1;
        }
        // this.setState({currentMove: this.state.currentMove});
    },

    startMoveTimer() {
        //如果要移动
        // this.setState({boolAutoMoving: true});
        movingTimer = setTimeout(this.bannerAfterMove.bind(this), 1200);
    },

    startWaitTimer() {

        // this.setState({boolAutoMoving: false});
        waitTimer = setTimeout(this.bannerAfterWait.bind(this), 1000);
    },

    bannerAfterMove() {
        //清空timer

        //初始化(防止没设置的bug)
        this.state.isMoveByHand = false;
        this.state.direction = 'left';
        //停止移动后,关闭移动
        this.state.isAutoMoving  = false;
        //触发渲染
        this.setState({isAutoMoving: this.state.isAutoMoving});
        //2.打开等待的timer
        this.startWaitTimer()
    },

    bannerAfterWait() {
        //开启移动
        this.state.isAutoMoving  = true;
        //设置好下一个坐标
        this.setCurrentIndex();
        //计算出来需要移动的图片
        this.setCurrentMove();
        //触发渲染
        this.setState({isAutoMoving: this.state.isAutoMoving});
        //开始move的timer
        this.startMoveTimer();

    },

    //设置当前的编号
    setCurrentIndex() {
        let totalImage = this.props.totalImage;
        let maxIndex = totalImage.length - 1;
        let currentIndex = this.state.currentIndex;
        let next = 0;
        //如果要移动
        switch (this.state.direction) {
            case 'left':
                next = 1;
                break;
            case 'right':
                next = -1;
                break;
        }

        currentIndex = currentIndex + next;
        if(currentIndex < 0) {
            currentIndex = maxIndex
        } else if(currentIndex > maxIndex) {
            currentIndex = 0
        }
        this.state.currentIndex = currentIndex;
    },


    // cbfPress(e, deltaX, deltaY, absX, absY, velocity) {
    //     //如果当前在等待状态中.并且非手动操作
    //     if (!this.state.isAutoMoving && !this.state.isMoveByHand) {
    //         //修改操作模式
    //         this.state.isMoveByHand = true;
    //         //关闭timer
    //
    //         //记录初始位置.
    //         initPos = 0;
    //         //开始捕捉滑动
    //
    //     }
    // },

    cbfMoving(e, deltaX, deltaY, absX, absY, velocity) {
        deltaX = -deltaX;
        if (!this.state.isAutoMoving && !this.state.isMoveByHand) {
            //修改操作模式
            this.state.isMoveByHand = true;
            //关闭timer
            window.clearInterval(waitTimer);
            //记录img初始位置.
            initPos = 0;
        }
        //开始捕捉滑动(如果是手动模式.)
        if(this.state.isMoveByHand) {
            //设置好方向.
            if(deltaX >= 0) {
                if(this.state.direction !== 'right') {
                    this.state.direction = 'right';
                    this.setState({direction: 'right'});
                }
            } else {
                if(this.state.direction !== 'left') {
                    this.setState({direction: 'left'});
                }
            }
            this.setState({currentPos: deltaX});
            //计算好加速度.
        }
    },

    cbfPutOn(e, deltaX, deltaY, absX, absY, velocity) {
        //如果是手动模式
        if(!this.state.isMoveByHand) {
            return;
        }
        //关闭手动,打开
        this.state.isMoveByHand = false;
        console.log('startWaitTimer');
        window.clearInterval(waitTimer);
        window.clearInterval(movingTimer);
        this.bannerAfterWait();
        //
    },

    // onTap = {this.cbfPress}

    render() {
        return(
            <div id = 'banner' className = "global-banner">
                {/*<SwipeView/>*/}
                <SwipeView className="banner-container" onSwiping = {this.cbfMoving} onSwiped = {this.cbfPutOn} >
                    <div onClick={this.goRouter} >
                        {this.renderImgSlot()}
                    </div>
                </SwipeView>
                <div className="banner-process">
                    {this.renderBannerProcess()}
                </div>
            </div>
        )
    },

    goRouter() {

        if(!this.state.isAutoMoving && !this.state.isMoveByHand) {
            this.props.cbfClickBanner(this.state.currentIndex);
        }
    },

    // transform: translateZ(0);
    // style={{transform: `translateX(-100%)`}}
    style(index) {
        let result = this.state.currentMove.indexOf(index);
        if(result === -1) {
            return
        }
        result = result - 1;
        let imgWidth = 351;
        if(this.state.isAutoMoving) {
            //自动移动.
            let hiddenIndex = 0;
            if(this.state.direction === 'right') {
                hiddenIndex = -1;
            } else {
                hiddenIndex = 1;
            }
            if(result!=hiddenIndex) {
                return {
                    // left: worldPox * imgWidth,
                    // transition: 'left 2s'
                    transition: 'transform 1s',
                    transform: `translateX(${result * imgWidth}px)`,
                    visibility: 'visible',
                    // transform: `translateX(${worldPox}00%)`
                }
            } else {
                return {
                    visibility: 'hidden',
                }
            }
        } else {
            if(!this.state.isMoveByHand) {
                //等待状态
                return {
                    // left: `(${worldPox * imgWidth}%)`,
                    // left: (worldPox) * imgWidth,
                    transform: `translateX(${result * imgWidth}px)`,
                    visibility: 'visible',
                }
            } else {
                //手动移动
                return {
                    // left: `(${worldPox * imgWidth}%)`,
                    // left: (worldPox) * imgWidth,
                    transform: `translateX(${result * imgWidth + this.state.currentPos}px)`,
                    visibility: 'visible',
                }
            }

        }
    },

    renderImgSlot() {
        let imgs = this.props.totalImage;
        let arr = [];
        for(let i = 0; i < imgs.length; i++) {
            arr.push(<img style={this.style(i)} src={imgs[i]}/>);
        }
        return arr;
    },

    renderBannerProcess() {
        let imgs = this.props.totalImage;
        let arr = [];
        for(let i = 0; i < imgs.length; i++) {
            let j = i % 2;
            if(i === 0 || i === 1){
                arr.push(<span className="banner-span" style={this.state.currentIndex % 2 === j ? {backgroundColor: 'white'} : {}}/>);
            }

            // arr.push(<span className="banner-span" style={this.state.currentIndex === i ? {backgroundColor: 'white'} : {}}/>);
        }
        return arr;
    }
});

module.exports = Banner;

