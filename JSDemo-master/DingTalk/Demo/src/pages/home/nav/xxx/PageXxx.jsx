require('./PageXxx.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';


class Xxx extends Component {
    constructor(props) {
        super(props, logic);

    }

    render() {
        return (
            <div>
                xxxxxxxx
            </div>
        );
    }

}

export default Xxx;
