/**
 * Created by ichangtou on 2017/8/3.
 */
/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const AbstractBox = require('../../component/abstract/AbstractBox');
// interface StateTypes {
//
//     index: number,//设置index的接口.(设置了就不会改变的,不应该放在state中)
//         status: String,//表示按钮的状态.
//         cbfClick: Function,//点击事件回调接口
//         // cbfHover: Function,
//         // cbfPress: Function,
//         //数据
//         title: String,//可选标题
//         imageOn: String//背景图片
//         imageOff: String//背景图片
//     //样式
//     styleBox: Object,//定义操作相应区域样式(大小)的接口
//         styleClick: Object,
//         styleHover: Object,
//         stylePress: Object,
//         styleDefault: Object,
//styleImage
//
//
// }

const StarBox = React.createClass({
    render (){
        let distance = 0;
        let styleClick = {
            // color: 'white',
        }
        let styleHover = {
            // color: 'white',
        }
        let styleDefault = {
            width: '58px',
            height: '58px',
            marginLeft: `${distance}`,
            marginRight: `${distance}`,
        };
        let styleImage = {
            width: '58px',
            height: '58px',
        };

        return(<AbstractBox
                            // styleClick = {}
                            styleDefault = {styleDefault}
                            // styleHover = {}
                            styleImage = {styleImage}

                            status = {this.props.status}
                            cbfClick = {this.props.cbfClick}
                            cbfHover = {this.props.cbfHover}
                            index = {this.props.index}
                            content = {this.props.content}
                            arrayIndex = {this.props.arrayIndex}>
            {/*<img style = {styleImage} src={this.props.status === 'click' ? this.props.content.imageOn : this.props.content.imageOff}/>*/}
        </AbstractBox>)
    },

});

module.exports = StarBox;







