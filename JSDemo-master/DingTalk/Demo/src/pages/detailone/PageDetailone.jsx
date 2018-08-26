require('./PageDetailone.less');
import logic from './PageLogic';
import { Component, LogicRender } from 'refast';
import { Control, Route } from 'react-keeper';
import { Button, NavBar, Icon, Popover } from 'antd-mobile';

const Item = Popover.Item;

class Detailone extends Component {
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
                    mode="dark"
                    icon={<Icon type="left" />}
                    leftContent="返回"
                    onLeftClick={() => {
                        console.log('onLeftClick');
                        Control.go(-1);
                    }}
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
                >导航条</NavBar>
                detailone It's somethings.
            </div>
        );
    }

}

export default Detailone;
