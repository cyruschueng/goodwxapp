/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const GiveScoreTabBar = require('../../component/course21/GiveScoreTabBar');
// interface StateTypes {
//图片images[]
//标题title
//星星数量
//cbfClick 点击回调
//currentIndex
// }

const GiveScoreContain = React.createClass({
    getInitialState: function() {
        // console.log('123');
        return {
            currentIndex: -1,
        };
    },

    // componentWillMount() {
    //     console.log('enter mine');
    //     // this.getUserInfo();
    //
    // },

    render (){
        return(<div className="give-score-contain">
            {this.renderTitle()}
            {this.renderTabBar()}
        </div>)

    },

    renderTitle() {
        return(<p>{this.props.title}</p>)
    },

    renderTabBar() {
        let count = this.props.count;
        let data = {
            title: '',
            imageOn: this.props.images[0],
            imageOff: this.props.images[1],
        };
        let content = [];
        for(let i = 0; i< count; i++) {
            content.push(data)
        };
        let defaultStyle = {
            padding: '0 20px 0 20px',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
        };
        return(<GiveScoreTabBar
            content = {content}
            styleDefault = {defaultStyle}
            currentIndex = {this.props.currentIndex}
            count={count}
            cbfClick = {this.props.cbfClick}>
        </GiveScoreTabBar>)

    },
});

module.exports = GiveScoreContain;







