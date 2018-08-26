require('./PagePagetwo.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';
import { Button } from 'antd-mobile';


export default class Pagetwo extends Component {
    constructor(props) {
        super(props, logic);

    }

    render() {
        return (
            <div>
                <Button>page two button</Button>
            </div>
        );
    }

}

