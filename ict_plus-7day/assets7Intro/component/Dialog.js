/**
 * Created by Administrator on 2016/7/4.
 */

/**

 */

var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var User = require('../User');


var CHECK_NUM = 0;
var Material = require('../Material');
//var DeleteIcon = require('./DeleteIcon');
var Toast = require('./DoneToast');
var Loading = require('../Loading');
var Util = require('../Util');


//对话框组件实例
var DialogInstance = null;

var DialogComp = React.createClass({

    getPropsType(){
        return {
            desc: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            okText: React.PropTypes.string,
            cancelText: React.PropTypes.string,
            okFun: React.PropTypes.func,
            cancelFun: React.PropTypes.func
        }
    },

    componentWillMount() {
        this.setState({
            desc: this.props.desc,
            title: this.props.title,
            okText: this.props.okText||'是',
            cancelText: this.props.cancelText||'否',
            okFun: this.props.okFun || this.okClickHandler,
            cancelFun: this.props.cancelFun || this.cancelClickHandler
        });
    },

    cancelClickHandler() {
        $('#dialog').hide();
        //PayController.scrollToPayCenter();
        //window.User.getUserLevel();
    },

    okClickHandler() {
        //window.User.getUserLevel();
        $('#dialog').hide();
    },


    render() {
        let desc = this.state.desc,
            title = this.state.title,
            state = this.state;

        return (
            <div className="weui_dialog_confirm dialog_text">
                <div className="weui_mask"></div>
                <div className="weui_dialog">
                    <div className="weui_dialog_hd"><strong className="weui_dialog_title">{title}</strong></div>
                    <div className="weui_dialog_bd">{desc}</div>
                    <div className="weui_dialog_ft">
                        <a href="#" className="weui_btn_dialog default"
                           onClick={this.state.cancelFun}>{state.cancelText}</a>
                        <a href="#" className="weui_btn_dialog primary"
                           onClick={this.state.okFun}>{state.okText}</a>
                    </div>
                </div>
            </div>
        );
    }
});

class DiaLog {
    /**
     * 显示对话框
     * @param title
     * @param desc
     * @param okText
     * @param cancelText
     * @param okFun
     * @param cancelFun
     */
    static showDialog(title, desc, okText, cancelText, okFun, cancelFun) {
        if( !DialogInstance ) {
            DialogInstance = ReactDom.render(<DialogComp title={title} desc={desc}
                                                         okText={okText} cancelText={cancelText}
                                                         okFun={okFun} cancelFun={cancelFun}/>, $('#dialog')[0]);
        }else {
            let attr = { title, desc, okFun, cancelFun };
            DialogInstance.setState(attr);
            $('#dialog').show();
        }

    }

}
window.Dialog = DiaLog;

module.exports = DiaLog;