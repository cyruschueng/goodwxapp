/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const TabBarBox = require('./TabBarBox');

// interface StateTypes {
// status: String,
//     //逻辑
//     count: number,//按钮数量
//     currentIndex: number,//当前选中的按钮
//     cbfClick: Function,//按钮栏中的按钮被选中的回调
//
//     //填充内容
//     dataIcon: Array,//icon数组
//     dataTitle: Array,//标题数组
//     styleDefault: Object,//默认
// }

const TabBar = React.createClass({
    getInitialState: function() {
        // console.log('123');
        return {
            currentIndex: -1,
            status: 'default',
        };
    },

    // componentWillMount() {
    //     console.log('enter mine');
    //     // this.getUserInfo();
    //
    // },

    render (){
        return(<div style = {this.props.styleDefault}>
            {this.renderBars()}
        </div>)

    },

    renderBars() {
        let arr = [];
        for (let i = 0 ; i < this.props.content.length; i++) {
            let array = this.props.arrayIndex.slice();
            array.push(i);
            arr.push(<TabBarBox
                content = {this.props.content[i].content}
                index = {i}
                arrayIndex = {array}
                status = {this.calcStatus(i)}
                cbfClick={this.props.cbfClick}
                cbfHover={this.cbfHover}

                perHeight = {this.props.perHeight}
                />)
        }
        return arr;
    },

    //根据回调带来的结果,确定按钮的样式.
    calcStatus(index) {
        //如果这个index 是被点击的那个
        if(this.props.currentIndex === index && this.props.status === 'click') {
            return 'click';
        } else {
            //如果这个index 什么都没触发
            return 'default'
        }
    }
});

module.exports = TabBar;







