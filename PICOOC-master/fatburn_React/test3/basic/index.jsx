
// import DatePicker from '../../dist/react-mobile-datepicker.js';
var React=require("react");
var ReactDOM=require("react-dom");
require("./main.css");
var convertDate=require("./lib/time.js");
var DatePicker=require("./lib/index.js");
window.Perf = require('react-addons-perf');

var App=React.createClass({
        getInitialState:function(){
            return{
                time: new Date(),
                isOpen: false,
                theme: 'default',
            }
            
        },

        handleToggle:function(isOpen) {
            this.setState({ isOpen });
        },

        handleThemeToggle:function(theme){
            this.setState({ theme, isOpen: true });
        },

        handleSelect:function(time){
            this.setState({ time, isOpen: false });
        },

        render() {
            return (
                <div className="App">
                    <p className="select-time ">
                        {convertDate(this.state.time, 'YYYY-MM-DD')}
                    </p>
                    <div>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('default')}>
                            default
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('dark')}>
                            dark
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('ios')}>
                            ios
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('android')}>
                            android
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('android-dark')}>
                            android-dark
                        </a>
                    </div>
                    <DatePicker
                        value={this.state.time}
                        theme={this.state.theme}
                        isOpen={this.state.isOpen}
                        onSelect={this.handleSelect}
                        onCancel={this.handleToggle(false)} />
                </div>
            );
        }
    })


    ReactDOM.render(<App />, document.getElementById('react-box'));

