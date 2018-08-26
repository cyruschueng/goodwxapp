require('./PageEntry.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';  


class Entry extends Component {
    constructor(props) { 
        super(props, logic);        
        
    }

    render() {
        return (
            <div>
              entry entry
            </div>
        );
    }

}

export default Entry ;
