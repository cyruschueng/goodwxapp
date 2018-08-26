/* eslint-disable indent,react/jsx-indent,react/jsx-closing-tag-location,object-curly-spacing */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import styles from './Contacts.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DmIcon from 'components/DmIcon';
import {convertTreeData} from 'utils/utils';
import _ from 'lodash';
import {
    Tree,
    Input,
    Row,
    Col,
    Table,
    Card,
    Button,
    Icon,
    Menu,
    Dropdown,
    Tooltip,
    Modal,
    Upload,
    message,
    Pagination,
} from 'antd';

const ButtonGroup = Button.Group;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;
const Dragger = Upload.Dragger;


const getParentKey = (id, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.id === id)) {
                parentKey = `${node.id}`;
            } else if (getParentKey(id, node.children)) {
                parentKey = getParentKey(id, node.children);
            }
        }
    }
    return parentKey;
};
// 上传配置
const props = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

@connect(state => ({
    party: state.party,
    partyUser: state.partyUser,
}))
export default class Contacts extends PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        // 部门
        partyList: [],
        // 展开指定的树节点
        expandedKeys: [],
        autoExpandParent: true,
        searchValue: '',

        // 我的
        batchImportModalShow: false,
        batchExportModalShow: false,
    }

    // 组件挂载之前
    async componentDidMount() {
        const {dispatch} = this.props;
        await dispatch({
            type: 'party/fetch',
        });
        const {party: {list: partyList, loading: partyLoading}, partyUser: {pagination: partyUserPagination}} = this.props;
        const attributes = {
            // 标识字段名
            keyField: 'id',
            // 上级标识字段名
            parentKeyField: 'parentid',
            // 文本字段名
            textField: 'name',
            // 根节点标识
            rootKey: 0,
        };
        // treeData即为转化后的树形结构数据
        const treeData = convertTreeData(partyList, attributes);
        this.setState({
            expandedKeys: [`${partyList[0].id}`],
            partyList: treeData,
        });

        await dispatch({
            type: 'partyUser/fetch',
            payload: {
                partyid: this.state.partyList[0].id,
                pageNo: partyUserPagination.pageNo,
                pageSize: partyUserPagination.pageSize,
            },
        });
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onChange = (e) => {
        const value = e.target.value;
        if (_.trim(value) === '') {
            return null;
        }
        const expandedKeys = this.props.party.list.map((item) => {
            if (item.name.indexOf(value) > -1) {
                return getParentKey(item.id, this.state.partyList);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        console.log(expandedKeys);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    showDeleteConfirm = ({item, key, keyPath}) => {
        console.log(item);
        console.log(key);
        console.log(keyPath);
        console.log(item.props.children);
        confirm({
            title: '删除成员',
            content: '删除后，成员的信息记录将完全被清楚。',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 文件导入
    openBatchImportModal = ({item, key, keyPath}) => {
        switch (key) {
            case '0':
                this.setState({
                    batchImportModalShow: true,
                });
                return;
            case '1':
                this.setState({
                    batchExportModalShow: true,
                });
        }
    }
    // 文件导入关闭
    closeBatchImportModal = () => {
        this.setState({
            batchImportModalShow: false,
        });
    }
    closeBatchExportModal = () => {
        this.setState({
            batchExportModalShow: false,
        });
    }

    onSelect = (selectedKeys, e) => {
        const {dispatch} = this.props;
        console.log(selectedKeys);
        let expandedKeys = this.state.expandedKeys;
        if (selectedKeys.length !== 0) {
            console.log(this.state.expandedKeys);
            console.log(selectedKeys[0]);
            if (!this.state.expandedKeys.includes(`${selectedKeys[0]}`)) {
                console.log('添加');
                expandedKeys = expandedKeys.concat(selectedKeys);
                console.log(expandedKeys);
                dispatch({
                    type: 'partyUser/fetch',
                    payload: {
                        partyid: selectedKeys[0],
                    },
                });
            } else {
                console.log('不添加');
                console.log(expandedKeys);
                expandedKeys.forEach((item, index) => {
                    console.log(`item=${item},index=${index}, item===selectedKeys[0]=${item === (`${selectedKeys[0]}`)}`);
                    if (item === `${selectedKeys[0]}`) {
                        expandedKeys.splice(index);
                    }
                });
                console.log(expandedKeys);
                console.log('不添加end');
            }
        } else {
            console.log('删除');
            expandedKeys.splice(-1);
            console.log(expandedKeys);
        }
        console.log('修改state');
        console.log(expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    render() {
        const {searchValue, expandedKeys, autoExpandParent} = this.state;
        const {batchImportModalShow, batchExportModalShow, partyList} = this.state;
        const {dispatch, party: {loading: partyLoading}, partyUser: {list: partyUserList, loading: partyUserLoading, pagination: partyUserPagination}} = this.props;
        // 递归tree
        const loop = data => data.map((item) => {
            const index = item.name.indexOf(searchValue);
            const beforeStr = item.name.substr(0, index);
            const afterStr = item.name.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                {beforeStr}
                    <span style={{color: '#f50'}}>{searchValue}</span>
                    {afterStr}
              </span>
            ) : <span>{item.name}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.id} title={<span><Icon type="folder"/> {title}</span>}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={title}/>;
        });
        // 通讯录 - 部门成员 - taber 表头数据
        const columns = [
            {
                title: '姓名',
                dataIndex: 'realname',
                key: 'realname',
                render: (text) => (
                    <Tooltip title={text} placement="bottom">
                        <span>{text}</span>
                    </Tooltip>
                ),
            },
            {
                title: '职务',
                dataIndex: 'isleader',
                key: 'isleader',
                render: (text) => (
                    <Tooltip title={text} placement="bottom">
                        <span>{text ? '领导' : '员工'}</span>
                    </Tooltip>
                ),
            },
            {
                title: '部门',
                dataIndex: 'partynames',
                key: 'partynames',
                render: (text) => (
                    <Tooltip title={text} placement="bottom">
                        <span>{text}</span>
                    </Tooltip>
                ),
            },
            {
                title: '手机',
                dataIndex: 'mobile',
                key: 'mobile',
                render: (text) => (
                    <Tooltip title={text} placement="bottom">
                        <span>{text || '暂无'}</span>
                    </Tooltip>
                ),
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                render: (text) => (
                    <Tooltip title={text} placement="bottom">
                        <span>{text}</span>
                    </Tooltip>
                ),
            },
            {
                title: '操作',
                key: 'filter',
                render: (text, record) => (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a
                            style={{textAlign: 'center', width: '100%', display: 'inline-block'}}
                            className="ant-dropdown-link"
                            href="#"
                        >
                            <Icon type="bars"/>
                        </a>
                    </Dropdown>
                ),
            },
        ];
        // 通讯录 - 部门成员 - taber 表头数据 - 功能按钮
        const menu = (
            <Menu onClick={this.showDeleteConfirm}>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">编辑</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">置顶</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="3">删除</Menu.Item>
            </Menu>
        );
        console.log(partyUserPagination.totalCount)
        // 通讯录 - 部门成员 - 分页 pagination
        const pagination = {
            defaultCurrent: 1,
            defaultPageSize: 5,
            current: partyUserPagination.pageNo,
            pageSize: partyUserPagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30', '40'],
            total: partyUserPagination.totalCount,
            onChange: (page, pageSize) => {
                const partyid = expandedKeys.length === 0 ? partyList[0].id : expandedKeys.slice(-1);
                console.log(page);
                console.log(pageSize);
                console.log(partyid);
                dispatch({
                    type: 'partyUser/fetch',
                    payload: {
                        partyid,
                    },
                });
                dispatch({
                    type: 'partyUser/fetch',
                    payload: {
                        partyid,
                        pageNo: partyUserPagination.pageNo,
                        pageSize: partyUserPagination.pageSize,
                    },
                });
            },
            onShowSizeChange: (current, size) => {
                console.log(current);
                console.log(size);
            },
        };
        // 通讯录 - 部门成员 右侧样式
        const Cardextra = (
            <div>
                <span>修改名称</span> | <span>添加子部门</span>
            </div>
        );
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        const tableTitle = () => {
            const BatchImportAndExportMenus = (
                <Menu onClick={this.openBatchImportModal}>
                    <Menu.Item key="0">文件导入</Menu.Item>
                    <Menu.Item key="1">导出通讯录</Menu.Item>
                </Menu>
            );
            return (
                <ButtonGroup>
                    <Button type="primary" icon="plus-circle-o">添加成员</Button>
                    <Dropdown overlay={BatchImportAndExportMenus} trigger={['click']}>
                        <Button type="primary" icon="cloud" className="ant-dropdown-link">批量导入/到处 <Icon
                            type="down"
                        />
                        </Button>
                    </Dropdown>
                    <Button type="primary" icon="cloud-download">设置所在部门</Button>
                    <Button type="primary" icon="minus-circle-o">删除</Button>
                </ButtonGroup>
            );
        };

        return (
            <PageHeaderLayout>
                {/* 文件导入 */}
                <Modal
                    visible={batchImportModalShow}
                    title="文件导入"
                    onOk={this.handleOk}
                    onCancel={this.closeBatchImportModal}
                    footer={[
                        <Button key="back" onClick={this.closeBatchImportModal}>Return</Button>,
                        <Button key="submit" type="primary">
                            Submit
                        </Button>,
                    ]}
                >
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text">点击或拖拽文件</p>
                        <p className="ant-upload-hint">支持文件批量导入, 可将一个或多个文件拖拽到上传栏中</p>
                    </Dragger>
                </Modal>
                {/* 导出通讯录 */}
                <Modal
                    visible={batchExportModalShow}
                    title="导出通讯录"
                    onOk={this.handleOk}
                    onCancel={this.closeBatchExportModal}
                    footer={[
                        <Button key="back" onClick={this.closeBatchExportModal}>取消</Button>,
                        <Button key="submit" type="primary">
                            导出
                        </Button>,
                    ]}
                >
                    <Row gutter={24}>
                        <Col xs={12} style={{borderRight: '1px solid #E4E6E9'}}>
                            <p>请选择部门</p>
                            <Tree
                                defaultExpandAll
                            >
                                <TreeNode title="第一财富网">
                                    <TreeNode title="开发部">
                                        <TreeNode title="前端组"/>
                                        <TreeNode title="后台组"/>
                                    </TreeNode>
                                    <TreeNode title="课程部"/>
                                    <TreeNode title="销售部"/>
                                    <TreeNode title="人事部"/>
                                </TreeNode>
                            </Tree>
                        </Col>
                        <Col xs={12}>
                            <p>已选择部门</p>
                        </Col>
                    </Row>
                </Modal>
                <Row gutter={24} className={styles.contacts}>
                    <Col xl={6} xs={8} className={styles.left}>
                        <Search
                            className={styles.search}
                            style={{padding: 10, borderBottom: '1px solid #E4E6E9'}}
                            placeholder="部门搜索"
                            onChange={this.onChange}
                        />
                        <Tree
                            className={styles.tree}
                            showIcon
                            draggable
                            onExpand={this.onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onSelect={this.onSelect}
                        >
                            {loop(partyList)}
                        </Tree>
                    </Col>
                    <Col xl={18} xs={16} className={styles.right}>
                        <Card
                            style={{marginBottom: 24}}
                            title="部门成员"
                            bordered={false}
                            extra={Cardextra}
                            loading={false}
                            bodyStyle={{padding: '12px'}}
                        >
                            <Table
                                className={styles.table}
                                title={tableTitle}
                                columns={columns}
                                rowKey="userid"
                                dataSource={partyUserList}
                                rowSelection={rowSelection}
                                size="middle"
                                loading={partyUserLoading}
                                pagination={pagination}
                            />
                        </Card>
                    </Col>
                </Row>
            </PageHeaderLayout>
        );
    }
}
