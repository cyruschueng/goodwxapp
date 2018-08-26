/**
 * Created by ichangtou on 2017/7/11.
 */
/**
 * Created by ichangtou on 2017/7/8.
 */

const React = require('react');
const Material = require('../../Material');
const Tools = require('../../GlobalFunc/Tools');


//titleImg
//userLists[][]
const messageBoard = React.createClass({
    getInitialState: function() {
        // console.log('123');
        return {
            subTitle: ['我的资产','金币交易所','我的优惠券','成就屋']
        };
    },

    componentWillMount() {
        console.log('enter mine');
        // this.getUserInfo();

    },

    // getUserInfo() {
    //     let userId = User.getUserInfo().userId;
    //     Tools.fireRace(userId,"OAUTH_SUCCESS").then(()=>{
    //         Material.getUserAdvanceInfo(userId).done((result)=>{
    //             this.state.userAdvanceInfo = result;
    //             this.setState({userAdvanceInfo: this.state.userAdvanceInfo});
    //         })
    //     });
    // },

    // style = {fullbg}
    render() {
        return(
            <div className="message-board" style={this.props.defaultStyle.bgColor}>
                <div className="list" >
                    {this.renderList()}
                </div>
            </div>
        )
    },

    renderList() {
        console.log('enter list');
        let arr = [];
        let userLists = this.props.userLists;
        // if
        //多少页
        for (let i = 0; i < userLists.length; i++) {
            let messagePage = this.props.userLists[i];
            for (let j = 0; j < messagePage.length; j++) {
                let userMessage = messagePage[j];
                arr.push(this.renderLine(i,j))
            }
        }
        return arr;
    },

    renderLine(i,j) {
        let userMessage = this.props.userLists[i][j];
        // userMessage.likeCount = 12123;
        return(<div className="user-message" style={this.props.defaultStyle.borderBottom}>
            <img className="head-image" src={userMessage.headImage}/>
            <div className="user-info" style = {this.props.defaultStyle.textMargin}>
                <p className="name">{userMessage.nickeName}</p>
                <p className="data">{userMessage.createTime}</p>
                <p className="message">{userMessage.comment}</p>
            </div>
            <div className="like" onClick = {this.cbfLike.bind(this,i,j)}>
                <img style = {this.props.defaultStyle.likeSize.img} src={userMessage.isLike ?  `./assetsPlus/image/${GlobalConfig.getCourseName()}/comment-like-on.png` : `./assetsPlus/image/${GlobalConfig.getCourseName()}/comment-like-off.png`}/>
                <span style = {this.props.defaultStyle.likeSize.font}>{userMessage.likeQty}</span>
            </div>

        </div>)
    },

    cbfLike(pageIndex,lineIndex) {
        this.props.cbfLike(pageIndex,lineIndex)
    }

});

module.exports = messageBoard;