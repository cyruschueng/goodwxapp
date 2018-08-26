/**
 * Created by Robot on 2016/6/29.
 */
var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');

var Loading = require('../Loading');
var User = require('../User');

var Refresher = React.createClass({
    getInitialState() {
        return {
          refreshing: false
        };
    },

    clickHanlder() {
        let $dom = $(this.refs.container);
        $dom.addClass('animate-rotate');

        setTimeout(()=>{
            $dom.removeClass('animate-rotate');
        }, 550);

        if( this.state.refreshing ){
            //3s只可以请求一次
            return;
        }
        this.setState({
            refreshing: true
        });

        User.refresh();

        var me = this;
        setTimeout(()=>{
            me.setState({
                refreshing: false
            });
        }, 3000);
    },

    render() {
        return <div ref="container"
            className="refresher" onClick={this.clickHanlder}>
        </div>
    }
});

module.exports = Refresher;