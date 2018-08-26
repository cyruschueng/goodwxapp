/**
 * Created by yiran
 */
var $ = window.$ = require('jquery');
var React = require('react');
const payPage = require('./PayPage');


var App = React.createClass({

    componentWillMount() {
        //console.log('App');
    },


    render() {
        return(
            <div>
                {this.props.children || <payPage/>}
                {/*<FMView/>*/}
            </div>
        )
    }
});

module.exports = App;