/**
 * 公号引导者
 * Created by lip on 2016/6/30.
 */

var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');
var Hammer = require('hammerjs');

var Modal = require('./Modal');

/**
 * props:
 *  text: 头部的引导文案
 */
var GHGuider = React.createClass({

    getPropType() {
        return {
            blank: React.PropTypes.bool.isRequired, //是否需要白条分割样式
            text: React.PropTypes.string //引导文案
        }
    },

    getInitialState(){
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
        let blank = this.props.blank ? <p className="blank"></p> : null ; //true 显示白条

        let text = this.props.text || '关注「长投」，获取更多理财资讯';

        let displayCls = this.state.display ? 'show' : 'hide';

        return (
            <div id="guiderComponent" className={"GH-guider " + displayCls} style={this.props.style} ref="container">
                <p className="description" style={{paddingTop: '1rem',fontSize:'0.8rem'}}>{text}</p>
                <p className="description">长按识别 公众号: itousha</p>
                <img src={"build21/tousha-qrcode.jpg"} />
                {blank}
            </div>
        );

    }
});

module.exports = GHGuider;