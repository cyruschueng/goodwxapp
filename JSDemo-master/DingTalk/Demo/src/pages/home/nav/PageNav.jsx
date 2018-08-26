require('./PageNav.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';
import { Button } from 'antd-mobile';
import { Control, Route, HashRouter } from 'react-keeper';

import PageXxx from 'pages/home/nav/xxx';
import DetailOne from 'pages/detailone';

class Nav extends Component {
    constructor(props) {
        super(props, logic);

    }

    render() {
        return (
            <div>
                {/* <HashRouter>
                    <div>
                        <Route component={PageXxx.route} path='/home/nav/xxx' />
                        <Route component={DetailOne.route} path='detailone' />
                    </div>
                </HashRouter> */}

                nav nav
                <Button onClick={() => {
                    Control.go('/home/nav/xxx');
                }}>xxx</Button>
                <Button onClick={() => {
                    Control.go('/detailone');
                }
                }>detailone</Button>
            </div>
        );
    }

}

export default Nav;
