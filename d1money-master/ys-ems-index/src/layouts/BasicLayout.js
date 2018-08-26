/* eslint-disable */
import React from 'react';
import dynamic from 'dva/dynamic';
import PropTypes from 'prop-types';
import {Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin} from 'antd';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Link, Route, Redirect, Switch} from 'dva/router';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import HeaderSearch from '../components/HeaderSearch';
import NoticeIcon from '../components/NoticeIcon';
import GlobalFooter from '../components/GlobalFooter';
import NotFound from '../routes/Exception/404';
import styles from './BasicLayout.less';
import logo from '../assets/logo.png';

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;
const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
    },
};


class BasicLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    }

    constructor(props) {
        super(props);
        // 把一级 Layout 的 children 作为菜单项
        this.menus = props.navData.reduce((arr, current) => arr.concat(current.children), []);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props),
        };
        // 页面内导航
        this.route = props.baseicLayoutRoutesData;
    }

    getChildContext() {
        const {location, navData, getRouteData} = this.props;
        const routeData = getRouteData('BasicLayout');
        const firstMenuData = navData.reduce((arr, current) => arr.concat(current.children), []);
        const menuData = this.getMenuData(firstMenuData, '');
        const breadcrumbNameMap = {};
        routeData.concat(menuData).concat(this.route).forEach((item) => {
            breadcrumbNameMap[item.path] = {
                name: item.name,
                component: item.component,
            };
        });
        return {location, breadcrumbNameMap};
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'user/fetchCurrent',
        });
    }

    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    onMenuClick = ({key}) => {
        if (key === 'logout') {
            this.props.dispatch({
                type: 'login/logout',
            });
        }
    }
    getMenuData = (data, parentPath) => {
        let arr = [];
        data.forEach((item) => {
            if (item.children) {
                arr.push({path: `${parentPath}/${item.path}`, name: item.name});
                arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
            }
        });
        return arr;
    }

    getDefaultCollapsedSubMenus(props) {
        const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
        currentMenuSelectedKeys.splice(-1, 1);
        if (currentMenuSelectedKeys.length === 0) {
            return [''];
        }
        return currentMenuSelectedKeys;
    }

    getCurrentMenuSelectedKeys(props) {
        const {location: {pathname}} = props || this.props;
        const keys = pathname.split('/').slice(1);
        if (keys.length === 1 && keys[0] === '') {

            return [this.menus[0].key];
        }
        return keys;
    }

    getNavMenuItems(menusData, parentPath = '') {
        if (!menusData) {
            return [];
        }
        return menusData.map((item) => {
            if (!item.name) {
                return null;
            }
            let itemPath;
            if (item.path.indexOf('http') === 0) {
                itemPath = item.path;
            } else {
                itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
            }
            if (item.children && item.children.some(child => child.name)) {
                return (
                    <SubMenu
                        title={
                            item.icon ? (
                                <span>
                  <Icon type={item.icon}/>
                  <span>{item.name}</span>
                </span>
                            ) : item.name
                        }
                        key={item.key || item.path}
                    >
                        {this.getNavMenuItems(item.children, itemPath)}
                    </SubMenu>
                );
            }
            const icon = item.icon && <Icon type={item.icon}/>;
            return (
                <Menu.Item key={item.key || item.path}>
                    {
                        /^https?:\/\//.test(itemPath) ? (
                            <a href={itemPath} target={item.target}>
                                {icon}<span>{item.name}</span>
                            </a>
                        ) : (
                            <Link
                                to={itemPath}
                                target={item.target}
                                replace={itemPath === this.props.location.pathname}
                            >
                                {icon}<span>{item.name}</span>
                            </Link>
                        )
                    }
                </Menu.Item>
            );
        });
    }

    getPageTitle() {
        const {location, getRouteData} = this.props;
        const {pathname} = location;
        let title = 'Ant Design Pro';
        getRouteData('BasicLayout').concat(this.route).forEach((item) => {
            if (item.path === pathname) {
                title = `${item.name} - 燕梳云平台·企业管理后台`;
            }
        });
        return title;
    }

    handleOpenChange = (openKeys) => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.menus.some(
            item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    }


    render() {
        const {currentUser, collapsed, fetchingNotices, getRouteData} = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item disabled><Icon type="user"/>个人中心</Menu.Item>
                <Menu.Item disabled><Icon type="setting"/>设置</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
            </Menu>
        );

        // Don't show popup menu when it is been collapsed
        const menuProps = collapsed ? {} : {
            openKeys: this.state.openKeys,
        };
        const layout = (
            <Layout>
                <Header className={styles.header}>
                    <div className={styles.top}>
                        <div className={styles.home}>
                            <div className={styles.logo}>
                                <img src={logo}/>
                                燕梳云平台·企业管理后台
                            </div>
                        </div>
                        <div className={styles.right}>
                            <HeaderSearch
                                className={`${styles.action} ${styles.search}`}
                                placeholder="站内搜索"
                                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                                onSearch={(value) => {
                                    console.log('input', value); // eslint-disable-line
                                }}
                                onPressEnter={(value) => {
                                    console.log('enter', value); // eslint-disable-line
                                }}
                            />
                            {currentUser.name ? (
                                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar}/>
                      {currentUser.name}
                  </span>
                                </Dropdown>
                            ) : <Spin size="small" style={{marginLeft: 8}}/>}
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <Menu
                            mode="horizontal"
                            onOpenChange={this.handleOpenChange}
                            selectedKeys={this.getCurrentMenuSelectedKeys()}
                            style={{margin: '0'}}
                        >
                            {this.getNavMenuItems(this.menus)}
                        </Menu>
                    </div>
                </Header>
                <Content className={styles.content}>
                    <div style={{minHeight: 'calc(100vh - 260px)'}}>
                        <Switch>
                            {
                                getRouteData('BasicLayout').concat(this.route).map(item => {
                                        return (
                                            <Route
                                                exact={item.exact}
                                                key={item.path}
                                                path={item.path}
                                                component={item.component}
                                            />
                                        )
                                    }
                                )
                            }
                            <Redirect exact from="/" to="/workplace"/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                    <GlobalFooter
                        links={[{
                            title: 'Pro 首页',
                            href: 'http://pro.ant.design',
                            blankTarget: true,
                        }, {
                            title: 'GitHub',
                            href: 'https://github.com/ant-design/ant-design-pro',
                            blankTarget: true,
                        }, {
                            title: 'Ant Design',
                            href: 'http://ant.design',
                            blankTarget: true,
                        }]}
                        copyright={
                            <div>
                                Copyright <Icon type="copyright"/> 2017 第一财富网技术部出品
                            </div>
                        }
                    />
                </Content>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default connect(state => ({
    currentUser: state.user.currentUser,
    collapsed: state.global.collapsed,
    fetchingNotices: state.global.fetchingNotices,
    notices: state.global.notices,
}))(BasicLayout);
