/**
 * Created by yiran
 */
var $ = window.$ = require('jquery');
var React = require('react');
var IctMain = require('../view/CPlusMain');


var App = React.createClass({

    componentWillMount() {
        //console.log('App');
    },


    render() {
        return(
            <div style={{height: '100%'}}>
                {this.props.children || <IctMain/>}
                {/*<FMView/>*/}
            </div>
        )
    }
});

module.exports = App;