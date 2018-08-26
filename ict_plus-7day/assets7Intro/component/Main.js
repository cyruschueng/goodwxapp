/**
 *
 * Created by doudou on 16-8-2.
 */

var React = require('react');
var ReactDom = require('react-dom');
var Util =require('../Util');
var OnFire = require('onfire.js');

var PayPage = require('./PayPage');
var ScoreExchange =require('./ScoreExchange');

var Main = React.createClass({
    getInitialState() {
        return {

        };
    },

    componentWillMount() {

    },

    render() {
        return (
            <div className="main-container">
                <PayPage/>
        </div>);
    }

});

module.exports = Main;