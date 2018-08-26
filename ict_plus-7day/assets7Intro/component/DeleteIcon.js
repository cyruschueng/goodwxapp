/**
 * 删除按钮
 * Created by lip on 2016/7/8.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var DeleteIcon = React.createClass({
    clickHandler(e) {
        console.log('this.props.deleteIconHandler = ', this.props.deleteIconHandler);
        this.props.deleteIconHandler.apply(this);
    },

    render() {
        return (
            <div className="delete-icon" ref="self"
                 onTouchEnd={this.clickHandler}></div>
        );
    }
});

module.exports = DeleteIcon;