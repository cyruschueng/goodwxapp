/**
 * Created by ichangtou on 2017/7/11.
 */
/**
 * Created by ichangtou on 2017/7/8.
 */

const React = require('react');
const Material = require('../../Material');
const AbsCommentBox = require('../../component/abstract/AbsCommentBox');


//titleImg
//userLists[][]
const CommentBox = React.createClass({
    getInitialState: function() {
        return {
        };
    },

    componentWillMount() {

    },

    render() {
        return(
            <div style = {this.props.outStyle}>{this.renderTextArea()}</div>
        )
    },

    renderTextArea() {
        let commentStyle = {
            position: 'relative',
            border: '2px solid #907660',
            width: '100%',
            height: '237px',
            borderRadius: '10px',
            backgroundColor: '#FFF7E0',
            padding: '5px',
        };
        let defaultStyle = commentStyle;
        if(this.props.defaultStyle) {
            defaultStyle = this.addStyle(commentStyle,this.props.defaultStyle);
        }
        return (<div style = {defaultStyle}>
            <AbsCommentBox index = {this.props.index ? this.props.index : 0}
                           defaultTxt = {this.props.defaultTxt}
                           currentContent = {this.props.currentContent}
                           status = {this.props.status}
                           cbfOnChange = {this.props.cbfOnChange}>
            </AbsCommentBox>
        </div>)
    },

    addStyle(originStyle, addStyle) {
        let copy1 = JSON.parse(JSON.stringify(originStyle));
        for (let style in addStyle) {
            copy1[style] = addStyle[style];
        }
        return copy1;
    },



});

module.exports = CommentBox;