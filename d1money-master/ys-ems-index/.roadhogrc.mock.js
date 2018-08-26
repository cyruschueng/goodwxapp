import mockjs from 'mockjs';
import {getActivities, getNotice, getFakeList} from './mock/api';
import {getRule, postRule} from './mock/rule';
import {getFakeChartData} from './mock/chart';
import {imgMap} from './mock/utils';
import {getProfileBasicData} from './mock/profile';
import {getProfileAdvancedData} from './mock/profile';
import {getNotices} from './mock/notices';
import {format, delay} from 'roadhog-api-doc';

import {getApplist} from './mock/EnterpriseApplication/applist'
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
    // 查询公司当前用户Applist接口
    'POST /app/services/loadApplistByCorpid': {
        "code": "SUCCESS",
        "msg": "成功",
        "body": [{
            "id": 1,
            "appid": null,
            "name": "好文分享",
            "slogan": "精选文章锦集",
            "description": "每天都会有官方推荐的好文",
            "createtime": 1511506508000,
            "updatetime": 1511506511000,
            "dataMap": null
        }]
    },
    // 查询所有部门
    'POST /contactbook/services/loadAllPartysByCorpId': {
        "code": "SUCCESS",
        "msg": "成功",
        "body": [{
            "id": 1,
            "corpid": 1,
            "name": "第一财富网",
            "parentid": 0,
            "order": 0,
            "status": 1,
            "createtime": 1511502158000,
            "updatetime": 1511502161000
        }, {
            "id": 2,
            "corpid": 1,
            "name": "开发部",
            "parentid": 1,
            "order": 0,
            "status": null,
            "createtime": null,
            "updatetime": null
        }, {
            "id": 3,
            "corpid": 1,
            "name": "课程部",
            "parentid": 1,
            "order": 0,
            "status": null,
            "createtime": null,
            "updatetime": null
        }, {
            "id": 4,
            "corpid": 1,
            "name": "销售部",
            "parentid": 1,
            "order": 0,
            "status": null,
            "createtime": 1512734704000,
            "updatetime": 1512734707000
        }, {
            "id": 5,
            "corpid": 1,
            "name": "文案组",
            "parentid": 3,
            "order": 0,
            "status": null,
            "createtime": null,
            "updatetime": null
        }, {
            "id": 6,
            "corpid": 1,
            "name": "教科组",
            "parentid": 3,
            "order": 0,
            "status": null,
            "createtime": null,
            "updatetime": null
        }]
    },
    // 获取当前部门下的成员
    'POST /contactbook/services/loadPartyUsers': {
        "code": "SUCCESS",
        "msg": "成功",
        "body": {
            "list": [
                {
                    "corpid": 1,
                    "userid": 10,
                    "realname": "高士超10",
                    "position": "领导",
                    "email": "123.567.com",
                    "sex": 1,
                    "isleader": 0,
                    "status": 1,
                    "createtime": 1512350918000,
                    "updatetime": 1512350922000,
                    "mobile": null,
                    "partynames": "第一财富网,开发部",
                    "partyids": null
                },
                {
                    "corpid": 1,
                    "userid": 11,
                    "realname": "高士超11",
                    "position": "领导",
                    "email": "123.567.com",
                    "sex": 1,
                    "isleader": 0,
                    "status": 1,
                    "createtime": 1512350918000,
                    "updatetime": 1512350922000,
                    "mobile": null,
                    "partynames": "第一财富网,开发部",
                    "partyids": null
                },
                {
                    "corpid": 1,
                    "userid": 12,
                    "realname": "高士超12",
                    "position": "领导",
                    "email": "123.567.com",
                    "sex": 1,
                    "isleader": 1,
                    "status": 1,
                    "createtime": 1512350918000,
                    "updatetime": 1512350922000,
                    "mobile": null,
                    "partynames": "第一财富网,开发部",
                    "partyids": null
                },
                {
                    "corpid": 1,
                    "userid": 13,
                    "realname": "高士超13",
                    "position": "领导",
                    "email": "123.567.com",
                    "sex": 1,
                    "isleader": 0,
                    "status": 1,
                    "createtime": 1512350918000,
                    "updatetime": 1512350922000,
                    "mobile": null,
                    "partynames": "第一财富网,开发部",
                    "partyids": null
                },
                {
                    "corpid": 1,
                    "userid": 14,
                    "realname": "高士超14",
                    "position": "领导",
                    "email": "123.567.com",
                    "sex": 1,
                    "isleader": 0,
                    "status": 1,
                    "createtime": 1512350918000,
                    "updatetime": 1512350922000,
                    "mobile": null,
                    "partynames": "第一财富网,开发部",
                    "partyids": null
                },
                {
                    "corpid": 1,
                    "userid": 15,
                    "realname": "高士超15",
                    "position": "领导",
                    "email": "123.567.com",
                    "sex": 1,
                    "isleader": 0,
                    "status": 1,
                    "createtime": 1512350918000,
                    "updatetime": 1512350922000,
                    "mobile": null,
                    "partynames": "第一财富网,开发部",
                    "partyids": null
                },
                {
                    "corpid": 1,
                    "userid": 16,
                    "realname": "高士超16",
                    "position": "领导",
                    "email": "123.567.com",
                    "sex": 1,
                    "isleader": 0,
                    "status": 1,
                    "createtime": 1512350918000,
                    "updatetime": 1512350922000,
                    "mobile": null,
                    "partynames": "第一财富网,开发部",
                    "partyids": null
                }],
            "pageCount": 0,
            "pageNo": 0,
            "pageSize": 0,
            "totalCount": 10
        }
    },
    // 支持值为 Object 和 Array
    'GET /api/currentUser': {
        $desc: "获取当前用户接口",
        $params: {
            pageSize: {
                desc: '分页',
                exp: 2,
            },
        },
        $body: {
            body: {
                name: 'Serati Ma',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png',
                userid: '00000001',
                notifyCount: 12,
            },
            code: "SUCCESS",
            msg: "成功"
        },
    },
    // GET POST 可省略
    'GET /api/users': [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }
    ],
    'GET /api/project/notice': getNotice,
    'GET /api/activities': getActivities,
    'GET /api/rule': getRule,
    'POST /api/rule': {
        $params: {
            pageSize: {
                desc: '分页',
                exp: 2,
            },
        },
        $body: postRule,
    },
    'POST /api/forms': (req, res) => {
        res.send({message: 'Ok'});
    },
    'GET /api/tags': mockjs.mock({
        'list|100': [{name: '@city', 'value|1-100': 150, 'type|0-2': 1}]
    }),
    'GET /api/fake_list': getFakeList,
    'GET /api/fake_chart_data': getFakeChartData,
    'GET /api/profile/basic': getProfileBasicData,
    'GET /api/profile/advanced': getProfileAdvancedData,
    'POST /api/login/account': (req, res) => {
        const {password, userName} = req.body;
        res.send({status: password === '888888' && userName === 'admin' ? 'ok' : 'error', type: 'account'});
    },
    'POST /api/login/mobile': (req, res) => {
        res.send({status: 'ok', type: 'mobile'});
    },
    'POST /api/register': (req, res) => {
        res.send({status: 'ok'});
    },
    'GET /api/notices': getNotices,
};

export default noProxy ? {} : delay(proxy, 1000);
