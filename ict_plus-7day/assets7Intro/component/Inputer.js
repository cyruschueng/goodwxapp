/**
 * 输入框组件
 * Created by lip on 2016/7/26.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');
var Util = require('../Util');
var User = require('../User');

var DoneToast = require('./DoneToast');

var Inputer = React.createClass({
    getInitialState() {
        return {
            display: true
        };
    },

    show() {
        this.setState({
            display: true
        });
    },
    hide() {
        this.setState({
            display: false
        });
    },

    render() {
        let style={};
        this.state.display===false ? style.display='none' : null;

        return (<div className="inputer-container" style={style}>
            <textarea className="textarea" ref="textarea" placeholder="我想说..." maxlength="200"></textarea>
            <div className="weui_btn weui_btn_primary send-button" onClick={this.sendHandler}>发送</div>
        </div>);
    },

    getComment() {
        let comment = '';
        if( this.refs.textarea ) {
            comment = $(this.refs.textarea).val();
        }

        return comment.trim();
    },

    /**
     * 发送事件句柄
     */
    sendHandler() {
        let ajax = this.postComment();
        if( ajax ) {
            ajax.done(()=>{
                DoneToast.show('提交评论成功');
            })
                .fail(()=>{
                    DoneToast.show('提交评论成功');
                });
        }else {
            console.log('提交失败');
        }

        $(this.refs.textarea).val(null);
    },

    /**
     * 上传评论到服务器
     * @returns {*}
     */
    postComment() {
        let comment = this.getComment(),
            userInfo = User.getUserInfo();
        if( !comment || !userInfo.userId ) {
            //没有内容或没有用户名时不提交
            return null;
        }

        let jsonData = JSON.stringify(
            {
                "minicId": Util.getMinicId(),
                "content": comment
            }
            ),
            apiUrl = Util.getAPIUrl('post_comment');

        return $.ajax({
            url: apiUrl,
            data: jsonData,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            headers: {
                Accept:"application/json"
            },

            beforeSend: function(request) {
                request.setRequestHeader("X-iChangTou-Json-Api-Token",
                    Util.getApiToken());

                request.setRequestHeader("X-iChangTou-Json-Api-User", userInfo.userId);

                request.setRequestHeader("X-iChangTou-Json-Api-Session", userInfo.sessionId);
            }
        });
    }
});

//var inputerCompIntance = null;

//class Inputer {
//    static show() {
//        if( !inputerCompIntance ) {
//            inputerCompIntance = ReactDom.render(<InputerComp />, $('#inputer')[0]);
//        }else {
//            inputerCompIntance.show();
//        }
//    }
//
//    static hide() {
//        inputerCompIntance.hide();
//    }
//}

module.exports = Inputer;