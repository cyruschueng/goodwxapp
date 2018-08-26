// require('./PageHome.less');
import './PageHome.less';
import logic from './PageLogic';
import { Control, Route } from 'react-keeper';
import { Component, LogicRender } from 'refast';
import TabBar, { activeTabbar } from 'components/card-tabbar';
import { Button, NavBar, Icon, Popover } from 'antd-mobile';

const Item = Popover.Item;

class Home extends Component {
    constructor(props) {
        super(props, logic);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key) {
        this.dispatch('setTabbarIndex', key);
        console.log(key);
        Control.go(this.state.menu[key].path, ); // keeper的跳转
    }

    render() {
        const { state: { menu, tabbarIndex, badge, }, } = this;
        const activeIndex = activeTabbar(menu);

        if (tabbarIndex != activeIndex) { // 对比url索引和当前选中的值,如不对应则纠正.
            // this.dispatch('setTabbarIndex', activeIndex);

            this.handleChange(tabbarIndex);
        }

        return (
            <div className="home">
                <NavBar
                    mode="dark"
                    // icon={<Icon type="none" />}
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
                {/* <Button className="s_button" onClick={() => {
                    // location.hash=('/detailone');
                    Control.go('/detailone');
                }}>炫彩按钮</Button>

                <Button>sss</Button> */}

                {/*中间嵌套的页面*/}
                {this.props.children}

                <TabBar menu={menu} tabbarIndex={tabbarIndex} badge={badge} onChange={this.handleChange} />
            </div>
        );
    }

    componentDidMount() {
        dd.biz.navigation.setTitle({ title: 'Home' })
    }

}

export default Home;
