/**
 * Created by Administrator on 2016/7/11.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var DialogAlert = React.createClass({
    getPropsType() {
        return {
            title: React.PropTypes.string.isRequired,  //标题
            desc: React.PropTypes.any.isRequired,   //描述

            confirmText: React.PropTypes.string, //确认按钮
            onConfirm: React.PropTypes.func,  //确认回调函数

            cancelRequire: React.PropTypes.bool,  //是否需要取消按钮
            cancelText: React.PropTypes.string, //取消按钮
            onCancel: React.PropTypes.func  //取消回调函数
        };
    },

    getInitialState() {
        return {
            display: true,
            title: this.props.title,
            desc: this.props.desc,
            confirmText: this.props.confirmText || '确定',
            cancelText: this.props.cancelText || '取消',
            cancelRequire: this.props.cancelRequire || false,
            onConfirm: this.props.onConfirm
        }
    },

    show() {
        this.setState({
            display: true
        });

    },
    enterHandler(e) {
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }

        setTimeout(()=>{
            this.setState({
                display: false
            });

            this.state.onConfirm && this.state.onConfirm(e);
        },150);


    },

    /**
     * 点击取消
     */
    cancelHandler(e) {
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }

        setTimeout(()=>{
            this.setState({
                display: false
            });

            this.props.onCancel && this.props.onCancel();
        },150)
    },

    render() {
        let display = this.state.display ? '' : 'hide';

        false && console.log('this.state.desc = ', this.state.desc);

        return (
            <div className={"weui_dialog_alert dialog-alert " + display}>
                <div className="weui_mask"></div>
                <div className="weui_dialog">
                    <div className="weui_dialog_hd"><strong className="weui_dialog_title">{this.state.title}</strong></div>

                    <div className="weui_dialog_bd">{this.state.desc}</div>

                    {this.props.children}

                    <div className="weui_dialog_ft">

                        {
                            this.state.cancelRequire ? <a href="javascript:void(0)" className="weui_btn_dialog default cancel"
                                                          onTouchEnd={this.cancelHandler}>{this.state.cancelText}</a> : null
                        }

                        <a href="javascript:void(0)" className="weui_btn_dialog primary confirm"
                           onTouchEnd={this.enterHandler}>{this.state.confirmText}</a>
                    </div>

                </div>
            </div>
        );
    }
});

var dialogAlertInstance = null;
class dialogAlertComp {
    /**
     * 显示alert
     * @param title 标题
     * @param desc 描述
     * @param confirmText 确认文案
     * @param onConfirm 确认后的调用
     * @param cancelText 取消文案
     * @param cancelRequire
     */
    static show(title,desc,confirmText,onConfirm,cancelText,cancelRequire){
        if( dialogAlertInstance ){
            dialogAlertInstance.show();
        }else {
            dialogAlertInstance = ReactDom.render(<DialogAlert/>, $('#dialogAlert')[0]);
        }

        dialogAlertInstance.setState({
            display: true,
            title,
            desc,
            confirmText,
            onConfirm,
            cancelText,
            cancelRequire
        });
    }

    static hide(){
        if( dialogAlertInstance ){
            dialogAlertInstance.setState({
                display: false
            });
        }
    }
}
window.dialogAlertComp = dialogAlertComp;

module.exports = DialogAlert;
