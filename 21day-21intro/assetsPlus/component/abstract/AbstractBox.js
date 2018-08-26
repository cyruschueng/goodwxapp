/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');


// interface StateTypes {
//          index: number,//设置index的接口
//          arrayIndex: Array,//父组件传递的记录点击的数组
//          content:内容包{title: imageOn: imageOff}
//          status: String,//表示按钮的状态.
//          cbfClick: Function,//点击事件回调接口
//          styleDefault: Object,
//          styleClick: Object,
//          styleHover: Object,
//          styleImage: Object,
// }

const AbstractBox = React.createClass({
    getInitialState: function() {
        // console.log('123');
        return {
            localStatus: 'default',
        };
    },

    // componentWillMount() {
    //     console.log('enter mine');
    //     // this.getUserInfo();
    //
    // },

    render (){

        return(<div style={this.addStyleByStatus()} onClick={this.cbfClick} onMouseOver={this.cbfHover} onMouseOut = {this.cbfHoverOut}>
            {this.props.children ? this.props.children :this.renderContent()}
            {/*<div style = {this.props.styleBox}*/}

            {/*{this.props.title}*/}
            {/*{this.props.children}*/}

            {/*</div>*/}
        </div>)

    },

    renderContent() {
        let content = this.props.content;
        if(!content) {
            return
        }
        let title = content.title;
        let imageOn = content.imageOn;
        let imageOff = content.imageOff;
        //有两种图片的布局
        if(imageOn && imageOff) {
            return(<img style = {this.props.styleImage} src={this.props.status === 'click' ? imageOn : imageOff}/>)
        } else {
            return(<span>{content.title}</span>)
        }
    },


    //这部分考虑到复用,就放在底层来写
    addStyleByStatus() {
        let originStyle = this.props.styleDefault;
        let addStyle = {}
        console.log('!!!!!!!')
        if(this.props.status === 'click') {
            addStyle = this.props.styleClick;
        } else {
            //自身判断
            if(this.state.localStatus === 'hover') {
                addStyle = this.props.styleHover;
            }
        }

        return this.addStyle(originStyle, addStyle);
    },

    addStyle(originStyle, addStyle) {
        let copy1 = JSON.parse(JSON.stringify(originStyle));
        for (let style in addStyle) {
            copy1[style] = addStyle[style];
        }
        return copy1;
    },

    cbfHover() {
        if(!this.props.styleHover) {
            return
        }
        let index = this.props.index;
        this.setState({localStatus: 'hover'});
        // this.props.cbfHover(index)
    },

    cbfHoverOut() {
        if(!this.props.styleHover) {
            return
        }
        this.setState({localStatus: 'default'});
        // this.props.cbfHoverOut(index)
    },

    cbfClick() {
        if(!this.props.styleClick) {
            return
        }
        let index = this.props.index;
        let arrayIndex = this.props.arrayIndex;
        this.props.cbfClick(index,arrayIndex);
    },
});

module.exports = AbstractBox;







