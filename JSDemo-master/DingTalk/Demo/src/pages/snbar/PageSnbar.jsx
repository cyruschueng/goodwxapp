require('./PageSnbar.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';
import { Button, NavBar, Icon, Popover } from 'antd-mobile';
import { Link, Control, Route } from 'react-keeper';

const Item = Popover.Item;

export default class Snbar extends Component {
    constructor(props) {
        super(props, logic);
    }

    state = {
        visible: false,
        selected: ''
    };

    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value
        });

        console.log(opt.key);
        if (opt.key === '5') {
        }
    };

    handleVisibleChange = (visible) => {
        this.setState({
            visible: visible
        });
    };

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { console.log('onLeftClick'); }}
                    rightContent={[
                        <Popover className="s-popover" mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<Item key="4" value="scan" data-seed="logId">Scan</Item>),
                                (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
                                (<Item key="6" value="button ct">
                                    <span style={{ marginRight: 5 }}>Help</span>
                                </Item>),
                            ]}

                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            onVisibleChange={this.handleVisibleChange}
                            onSelect={this.onSelect}

                        ><Icon key="1" type="ellipsis" /></Popover>
                    ]}
                >导航条/Icon/气泡学习</NavBar>
            </div >
        );
    }

}

