/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');

// interface StateTypes {
//cbfClick  点击背景任意位置回调
//cbfOkClick    确定回调
//isShow    是否显示
//imageBg   全屏背景图
//className 默认的样式.全屏图片/自定义蒙版+图片实现
//type 两种模式
// }

const ModalMask = React.createClass({
    // getInitialState: function() {
        // console.log('123');
        // return {
        //     localStatus: 'default',
        // };
    // },

    // componentWillMount() {
    //     console.log('enter mine');
    //     // this.getUserInfo();
    //
    // },

    render (){
        console.log(this.props);
        if(!this.props.isShow) {
            return (<div></div>);
        }
        let style = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            zIndex: '9999',
            top: 0,
        };

        let styleClick = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            zIndex: '-1',
        };

        // let style = {
        //     display: 'flex',
        //     flexWrap: 'wrap',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     fontSize: '20px',
        //     width: '100%',
        //     height: '100%',
        //     backgroundColor: 'rgba(144,118,96,0.9)'
        // };

        // return(<div style={style} onClick={this.cbfClick} onMouseOver={this.cbfHover} onMouseOut = {this.cbfHoverOut}>
        return(<div onClick={this.props.cbfClick} style={style } >
            {/*<div className="click" style = {styleClick} onClick={this.props.cbfClick}></div>*/}
            {this.props.type ? this.renderBg() : this.props.children}
            {/*正确写法*/}
            {/*{this.props.imageBg ? this.renderBg() : this.props.children}*/}

            {/*{this.renderContent()}*/}
            {/*<div style = {this.props.styleBox}*/}

            {/*{this.props.title}*/}
            {/*{this.props.children}*/}

            {/*</div>*/}
        </div>)

    },

    renderBg (){
        let style = {
            width: '100%',
            height: '100%',
        };
        return(<img style={style} src={this.props.imageBg}></img>)
    },

    renderContent() {
        // let content = this.props.content
        // let title = content.title;
        // let imageOn = content.imageOn;
        // let imageOff = content.imageOff;
        // //有两种图片的布局
        // if(imageOn && imageOff) {
        //     return(<img style = {this.props.styleImage} src={this.props.status === 'click' ? imageOn : imageOff}/>)
        // }
    },


    // //这部分考虑到复用,就放在底层来写
    // addStyleByStatus() {
    //     let originStyle = this.props.styleDefault;
    //     let addStyle = {}
    //     console.log('!!!!!!!')
    //     if(this.props.status === 'click') {
    //         addStyle = this.props.styleClick;
    //     } else {
    //         //自身判断
    //         if(this.state.localStatus === 'hover') {
    //             addStyle = this.props.styleHover;
    //         }
    //     }
    //
    //     return this.addStyle(originStyle, addStyle);
    // },
    //
    // addStyle(originStyle, addStyle) {
    //     let copy1 = JSON.parse(JSON.stringify(originStyle));
    //     for (let style in addStyle) {
    //         copy1[style] = addStyle[style];
    //     }
    //     return copy1;
    // },
    //
    // cbfHover() {
    //     let index = this.props.index;
    //     this.setState({localStatus: 'hover'});
    //     // this.props.cbfHover(index)
    // },
    //
    // cbfHoverOut() {
    //     this.setState({localStatus: 'default'});
    //     // this.props.cbfHoverOut(index)
    // },
    //
    // cbfClick() {
    //     let index = this.props.index;
    //     this.props.cbfClick();
    // },
});

module.exports = ModalMask;







