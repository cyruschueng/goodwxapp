/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const StarBox = require('../../component/course21/StarBox');

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

const GiveScoreTabBar = React.createClass({
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
        for (let i = 0 ; i < this.props.count; i++) {
            let array = [];
            array.push(i);
            arr.push(<StarBox
                content = {this.props.content[i]}
                key={i}
                index = {i}
                status = {this.calcStatus(i)}
                cbfClick={this.props.cbfClick}
                cbfHover={this.cbfHover}
                arrayIndex = {array}/>)
        }
        return arr;
    },

    //根据回调带来的结果,确定按钮的样式.
    calcStatus(index) {
        //如果这个index 是被点击的那个
        if( index <= this.props.currentIndex) {
            return 'click';
        } else {
            //如果这个index 什么都没触发
            return 'default'
        }
    }
});

module.exports = GiveScoreTabBar;







