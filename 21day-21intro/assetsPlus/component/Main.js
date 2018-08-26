/**
 *
 * Created by doudou on 16-8-2.
 */

var React = require('react');

var IctMain = require('../view/CPlusMain');

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
                <IctMain/>
        </div>);
    }

});

module.exports = Main;