/**
 * Created by yiran on 2017/5/5.
 */
const $ = window.$ = require('jquery');
const React = require('react');
const Dimensions = require('../../Dimensions');

const GetReward = React.createClass({
    getInitialState: function() {
        // console.log('123');
        return {
            content: this.props.content
        };
    },

    componentWillMount() {
        // console.log(Dimensions.getWidthScale());
        // console.log('22222211');
        // console.log(Dimensions);
    },


    handleClick() {
        // this.setState({liked: !this.state.liked});
        location.hash = "/select";
    },
    // style = {fullbg}
    render() {
        return(
            <div className="bg-ground" style = {{backgroundImage: 'url("./assets7Intro/image/course/bg_1.png")', width:Dimensions.getWindowWidth(), height: Dimensions.getWindowHeight()}}></div>
        )
    }
});

module.exports = GetReward;