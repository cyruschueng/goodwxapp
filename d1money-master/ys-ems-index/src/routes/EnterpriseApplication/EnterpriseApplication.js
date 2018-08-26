import React, {PureComponent} from 'react';
import numeral from 'numeral';
import moment from 'moment';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Row, Col, Card, List, Avatar, Tabs, Tooltip, Icon, Dropdown, Menu} from 'antd';

const TabPane = Tabs.TabPane;

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './EnterpriseApplication.less';
import styles from './EnterpriseApplication.less';

@connect(state => {
    return ({
        project: state.project,
        enterpriseApplication: state.enterpriseApplication,
    })
})
export default class EnterpriseApplication extends PureComponent {
    // 组件挂载之前
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'enterpriseApplication/fetch'
        });
    }

    constructor(props) {
        super(props);
    }

    // tabPane切换事件
    TabPaneChange(key) {
        console.log(key);
    }

    render() {
        const {
            project: {loading: projectLoading, notice},
            enterpriseApplication: {applist, loading}
        } = this.props;
        console.log(this.props)
        const pageHeaderContent = (
            <div className={styles.pageHeaderContent}>
                <div className={styles.avatar}>
                    <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>上海维际信息技术有限公司</div>
                    <div>第一财富网，中国最大的财商教育网，提供最新最全的个人理财、家庭理财、如何理财、理财方法、投资理财、理财小知识等。</div>
                </div>
            </div>
        );
        const pageHeaderExtra = (
            <div className={styles.pageHeaderExtra}>
                <div>
                    <p>项目数</p>
                    <p>56</p>
                </div>
                <div>
                    <p>团队内排名</p>
                    <p>8<span> / 24</span></p>
                </div>
                <div>
                    <p>项目访问</p>
                    <p>2,223</p>
                </div>
            </div>
        );
        const itemMenu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
                </Menu.Item>
            </Menu>
        );
        const CardInfo = ({ activeUser, newUser }) => (
            <div className={styles.cardInfo}>
                <div>
                    <p>活跃用户</p>
                    <p>{activeUser}</p>
                </div>
                <div>
                    <p>新增用户</p>
                    <p>{newUser}</p>
                </div>
            </div>
        );
        const formatWan = (val) => {
            const v = val * 1;
            if (!v || isNaN(v)) return '';

            let result = val;
            if (val > 10000) {
                result = Math.floor(val / 10000);
                result = <span>{result}<em className={styles.wan}>万</em></span>;
            }
            return result;
        };
        return (
            <PageHeaderLayout
                content={pageHeaderContent}
                extraContent={pageHeaderExtra}
            >
                <Col xs={24} style={{backgroundColor: '#fff'}}>
                    <Tabs
                        defaultActiveKey="1"
                        tabBarStyle={{marginBottom: 0}}
                        onChange={this.TabPaneChange}
                    >
                        <TabPane tab="已安装应用" key="1">
                            <List
                                rowKey="id"
                                style={{margin: '24px 24px 0 24px'}}
                                grid={{gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}}
                                loading={loading}
                                dataSource={applist}
                                renderItem={item => (
                                    <List.Item key={item.appid}>
                                        <Card
                                            hoverable
                                            bodyStyle={{paddingBottom: 20}}
                                            actions={[
                                                <Tooltip title="进入"><Link to={'/enterpriseApplication/articleApp'}><Icon type="arrow-right" /></Link></Tooltip>,
                                                <Tooltip title="安装"><Icon type="download"/></Tooltip>,
                                                <Tooltip title="编辑"><Icon type="edit"/></Tooltip>,
                                                <Dropdown overlay={itemMenu}><Icon type="ellipsis"/></Dropdown>,
                                            ]}
                                        >
                                            <Card.Meta
                                                avatar={<Avatar size="small" src={item.name}/>}
                                                title={item.name}
                                            />
                                            <div className={styles.cardItemContent}>
                                                <CardInfo
                                                    activeUser={formatWan(item.activeUser)}
                                                    newUser={numeral(item.newUser).format('0,0')}
                                                />
                                            </div>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="全部应用" key="2">
                            <Card
                                className={styles.projectList}
                                bordered={false}
                                loading={projectLoading}
                                bodyStyle={{padding: 0}}
                            >
                                {
                                    notice.map(item => (
                                        <Card.Grid className={styles.projectGrid} key={item.id}>
                                            <Card bodyStyle={{padding: 0}} bordered={false}>
                                                <Card.Meta
                                                    title={(
                                                        <div className={styles.cardTitle}>
                                                            <Avatar size="small" src={item.logo}/>
                                                            <Link to={item.href}>{item.title}</Link>
                                                        </div>
                                                    )}
                                                    description={item.description}
                                                />
                                                <div className={styles.projectItemContent}>
                                                    <Link to={item.memberLink}>{item.member || ''}</Link>
                                                    {item.updatedAt && (
                                                        <span className={styles.datetime} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                                                    )}
                                                </div>
                                            </Card>
                                        </Card.Grid>
                                    ))
                                }
                            </Card>
                        </TabPane>
                        <TabPane tab="未安装应用" key="3">
                            <List
                                rowKey="id"
                                style={{margin: '24px 24px 0 24px'}}
                                grid={{gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}}
                                loading={loading}
                                dataSource={applist}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <Card
                                            hoverable
                                            bodyStyle={{paddingBottom: 20}}
                                            actions={[
                                                <Tooltip title="安装"><Icon type="download"/></Tooltip>,
                                                <Tooltip title="编辑"><Icon type="edit"/></Tooltip>,
                                                <Dropdown overlay={itemMenu}><Icon type="ellipsis"/></Dropdown>,
                                            ]}
                                        >
                                            <Card.Meta
                                                avatar={<Avatar size="small" src={item.avatar}/>}
                                                title={item.title}
                                            />
                                            <div className={styles.cardItemContent}>
                                                <CardInfo
                                                    activeUser={formatWan(item.activeUser)}
                                                    newUser={numeral(item.newUser).format('0,0')}
                                                />
                                            </div>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </Col>
            </PageHeaderLayout>
        );
    }
}
