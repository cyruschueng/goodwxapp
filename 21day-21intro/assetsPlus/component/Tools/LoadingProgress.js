/**
 * Created by yiran on 2017/5/5.
 */
const React = require('react');
const OnFire = require('onfire.js');

const LoadingProgress = React.createClass({

    getInitialState: function() {
        return {
            // finishElement: this.props.finishElement,
            // totalElement: this.props.totalElement
            processNow: 0,
            processTotal: 0,
        };
    },

    componentWillMount() {
        OnFire.on('LOADING', (event) => {
            this.setState({processNow: event.loaded});
            this.setState({processTotal: event.total});
        });
    },


    render() {
        return(
            <div className="global-style">
                <span>{this.state.processNow}/</span>
                <span>{this.state.processTotal}</span>
            </div>
        )
    },

});

module.exports = LoadingProgress;
