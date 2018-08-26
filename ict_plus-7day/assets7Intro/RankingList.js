/**
 * Created by lip on 2016/6/28.
 */

var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
var Dimensions = require('./Dimensions');

var User = require('./User');
var Loading = require('./Loading');

//排行榜数组
var rankArray = [];
/**
 * props:
 *
 * list: [] 有序的排名数组
 *      bonus	奖金数量	number
        fans	下线数量	number
        figure	用户头像图片获取路径 string
        nickName	用户昵称	string
 */
var RankingListComponent = React.createClass({
    getInitialState() {
        return {
            hide: false
        };
    },

    /**
     * 准备插入真实的DOM
     */
    componentWillMount() {
        let $rankButton = $('#rankButton');
        let windowHeight = Dimensions.getWindowHeight(),
            windowWidth = Dimensions.getWindowWidth();

        //计算排行榜容器样式
        let containerTop = $rankButton.offset().top;
        let top = (windowHeight*0.1 - containerTop);
        let height = windowHeight*0.8,
            width = windowWidth * 0.8;

        //计算mask的样式
        let maskLeft = $rankButton.offset().left * -1,
            maskTop = height* -0.125,
            rankHeight = height*0.9/11;

        let style = {
            container: {
                width: width,
                height: height,
                top: top,
                left: 0,
            },
            mask: {
                width: windowWidth,
                height: windowHeight,
                left: maskLeft,
                top: maskTop
            },
            //排行列
            rank: {
                height: rankHeight,
            },
            title: {
                height: rankHeight,
                lineHeight: rankHeight+'px'
            },
            //头像
            headImage: {
                height: rankHeight * 0.9,
                width: rankHeight * 0.9
            }
        };

        this.setState({
            style: style
        });
    },

    /**
     * 点击后隐藏自己
     * @param e
     */
    clickHandler(e) {
        e.stopPropagation();

        let $dom = $(this.refs.selfContainer),
            style = this.state.style;

        $(this.refs.mask).hide();

        $dom.addClass('animate-zoomOutRight');

        setTimeout(()=>{
            $dom.hide();
            $dom.removeClass('animate-zoomOutRight');
        }, 1000);

        //只主动显示1次排行榜
        localStorage.setItem( ('minic' + Util.getMinicId() + '-rankShowed'), true);

    },

    render() {
        let state = this.state,
            style = state.style;

        //排行榜数据
        let domArray = [],
            rankLength = rankArray.length;

        if( rankLength > 10 ){
            rankLength = 10;
        }

        for( let i = 0, l = rankLength; i < l; i++  ){
            let nickName = rankArray[i].nickName || '';
            if( nickName.length >= 10 ){
                nickName = nickName.substr(0,nickName.length-6);
            }

            let index = i + 1;
            index = index < 10 ? ('0'+index) : index;

            let headStyle = {};
            headStyle.height = style.headImage.height;
            headStyle.width = style.headImage.width;
            headStyle.backgroundImage = 'url('+ rankArray[i].figure + ')';

            domArray.push(<div className={'rank'} style={style.rank}>
                <p className={"index"}>{index}</p>
                <p className={"head-image"} style={headStyle}></p>
                <p className={"nick-name"}>{nickName}</p>
                <p className={"score"}>{rankArray[i].fans + ' 人'}</p>
            </div>);
        }

        let content = domArray.length > 0 ? domArray : (<p className="empty-text">害羞了，没有数据<br/>⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</p>);

        return <div ref="selfContainer"
            style={style.container} className={"ranking-list"} id={"rankingList"}>

            <div className={"mask "} style={style.mask} ref="mask" id="rankMask" onClick={this.clickHandler}></div>

            <div className="list">
                <p className={"delete-icon"} onClick={this.clickHandler}></p>
                <p className={"title"} style={style.title}>跟随排行榜TOP10</p>
                {content}
            </div>

        </div>;
    }
});

var isCreated = false;

class RankingList {
    static init() {
        ReactDom.render(<RankingListComponent />, $('#rankingListContainer')[0]);
        isCreated = true;
    }

    /**
     * 显示排行榜
     */
    static show() {
        $('#rankingList').show();
        $('#rankMask').show();
    }

    /**
     * 是否已经创建
     * @returns {boolean}
     */
    static isCreated() {
        return isCreated;
    }

    /**
     * 获取排行榜信息
     */
    static getRankListFromServer(callBack) {
        $.ajax({
            url: Util.getAPIUrl('get_ranking')+'/'+Util.getMinicId(),
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: function(request) {
                //request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            },
            /**
             *
             * @param data
             *  bonus	奖金数量	number
             fans	下线数量	number
             figure	用户头像图片获取路径 string
             nickName	用户昵称	string
             */
            success: (data)=> {
                Loading.hideLoading();
                rankArray = data;

                //执行回调函数
                callBack && callBack.apply();
            },
            error: (data)=>{
                Loading.hideLoading();
            }
    });
}
}

module.exports = RankingList;