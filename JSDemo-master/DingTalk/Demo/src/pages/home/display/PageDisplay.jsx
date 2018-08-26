require('./PageDisplay.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';  


class Display extends Component {
    constructor(props) { 
        super(props, logic);        
        
    }

    render() {
        return (
            <div>
              display display
            </div>
        );
    }

}

export default Display ;
