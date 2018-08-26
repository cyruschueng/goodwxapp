
const React = require('react');
// status: String,//表示按钮的状态.
// styleDefault: Object,

// export default class Tabbar extends React.PureComponent<StateTypes> {
class ProcessBarOut extends React.Component{
    constructor() {
        super();
    }

    //className = {(className as any).container}

    render (){
        return(<div style={this.props.styleDefault}>
            {this.props.children}
        </div>)

    }
}

module.exports = ProcessBarOut;