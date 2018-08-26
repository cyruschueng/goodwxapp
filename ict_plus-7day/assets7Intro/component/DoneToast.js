/**
 * 动作完成的toast
 * Created by Robot on 2016/7/10.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var doneToastInstance = null;
var toastInstance = null;

var DoneToastComp = React.createClass({
    onTransitionEnd() {
        false && console.log('onTransitionEnd');
    },
    getInitialState() {
        return {
            hide: false,
            text: '已完成'
        };
    },

    show() {
        this.setState({
            hide: false
        });

        setTimeout(this.hide, 5000);
    },

    componentDidMount(){
        setTimeout(this.hide, 5000);
    },

    hide() {
        this.setState({
            hide: true
        });
    },

    onMaskTouchEnd() {
        this.hide();
    },

    render(){
        let hide = this.state.hide ? 'hide' : '',
            text = this.state.text || this.props.text;

        return (
            <div ref="self" className={"done-toast " + hide} onTransitionEnd={this.onTransitionEnd}>
                <div className="weui_mask_transparent" onTouchEnd={this.onMaskTouchEnd}></div>
                <div className="weui_toast">
                    <i className="weui_icon_toast"></i>
                    <p className="weui_toast_content">{text}</p>
                </div>
            </div>
        );
    }
});

class DoneToast {
    static show(text){
        if( doneToastInstance ){
            doneToastInstance.show();
        }else {
            doneToastInstance = ReactDom.render(<DoneToastComp />, $('#toast')[0]);
        }

        doneToastInstance.setState({
            text: text
        });
    }
}

var ToastComp = React.createClass({

    onTransitionEnd() {
        false && console.log('onTransitionEnd');
    },
    getInitialState() {
        return {
            hide: false,
            text: '已完成'
        };
    },

    show() {
        this.setState({
            hide: false
        });

        setTimeout(this.hide, 3000);
    },

    componentDidMount(){
        setTimeout(this.hide, 3000);
    },

    hide() {
        this.setState({
            hide: true
        });
    },

    onMaskTouchEnd() {
        this.hide();
    },

    render(){
        let hide = this.state.hide ? 'hide' : '',
            text = this.state.text || this.props.text;

        return (
            <div ref="self" className={"done-toast normal " + hide} onTransitionEnd={this.onTransitionEnd}>
                <div className="weui_mask_transparent" onTouchEnd={this.onMaskTouchEnd}></div>
                <div className="weui_toast customized">
                    <p className="weui_toast_content">{text}</p>
                </div>
            </div>
        );
    }
});

class Toast {
    static show(text){
        if( toastInstance ){
            toastInstance.show();
        }else {
            toastInstance = ReactDom.render(<ToastComp />, $('#toast')[0]);
        }

        toastInstance.setState({
            text: text
        });
    }
}


module.exports = DoneToast;
module.exports = Toast;