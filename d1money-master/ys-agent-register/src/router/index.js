import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import MyVisitingRecord from '@/pages/MyVisitingRecord'
import AddVisitRecord from '@/pages/AddVisitRecord'
import AddRepublishVisitingRecord from '@/pages/AddRepublishVisitingRecord'
import Error from '@/pages/Error'
import CustomDetail from '@/pages/CustomDetail'
import TeamVisitingRecord from '@/pages/TeamVisitingRecord'
import TeamMemberVisitingRecord from '@/pages/TeamMemberVisitingRecord'
import CustomerList from '@/pages/CustomerList'
import TeamMemberCustomDetail from '@/pages/TeamMemberCustomDetail'
import VisitingRecordDetail from '@/pages/VisitingRecordDetail'
import ExportData from '@/pages/ExportData'
import SubmitMe from '@/pages/SubmitMe'
import Test from '@/pages/Test'

Vue.use(Router)

export default new Router({
    base: '/ys/gzrz/index',
    routes: [
        {
            path: '/',
            redirect: '/test'
        },
        {
            path: '/test',
            name: 'Test',
            meta: {
                title: '测试'
            },
            component: Test
        },
        {
            path: '/home',
            name: 'Home',
            meta: {
                title: '活动量管理'
            },
            component: Home
        },
        {
            path: '/test',
            name: 'Test',
            meta: {
                title: '测试页面'
            },
            component: Test
        },
        {
            path: '/myVisitingRecord',
            name: 'MyVisitingRecord',
            meta: {
                title: '我的拜访记录',
                keepAlive: false,
                // 页面tab index
                currentIndex: 0,
                // 页面离开时 当前tab 的index
                leaveCurrentIndex: 0
            },
            component: MyVisitingRecord
        },
        {
            path: '/addVisitRecord',
            name: 'AddVisitRecord',
            meta: {
                title: '记录实地拜访'
            },
            component: AddVisitRecord
        },
        {
            path: '/addRepublishVisitingRecord',
            name: 'AddRepublishVisitingRecord',
            meta: {
                title: '补充拜访记录'
            },
            component: AddRepublishVisitingRecord
        },
        {
            path: '/CustomDetail/:customerId/:name',
            name: 'CustomDetail',
            meta: {
                title: '客户详情'
            },
            component: CustomDetail
        },
        {
            path: '/teamVisitingRecord',
            name: 'teamVisitingRecord',
            meta: {
                title: '我团队拜访记录',
                keepAlive: true
            },
            component: TeamVisitingRecord
        },
        {
            path: '/teamMemberVisitingRecord/:userid/:name',
            name: 'TeamMemberVisitingRecord',
            meta: {
                title: '的拜访记录',
                keepAlive: false
            },
            component: TeamMemberVisitingRecord,
            props: true
        },
        {
            path: '/customerList/:userid/:name',
            name: 'CustomerList',
            meta: {
                title: '的通讯录',
                keepAlive: false
            },
            component: CustomerList,
            props: true
        },
        {
            path: '/teamMemberCustomDetail/:customerId/:userid',
            name: 'TeamMemberCustomDetail',
            meta: {
                title: '客户详情'
            },
            component: TeamMemberCustomDetail,
            props: true
        },
        {
            path: '/visitingRecordDetail/:visitId',
            name: 'VisitingRecordDetail',
            meta: {
                title: '客户拜访记录详情'
            },
            component: VisitingRecordDetail,
            props: true
        },
        {
            path: '/exportData',
            name: 'ExportData',
            meta: {
                title: '导出拜访记录'
            },
            component: ExportData
        },
        {
            path: '/submitMe',
            name: 'SubmitMe',
            meta: {
                title: '提交给我的',
                keepAlive: true
            },
            component: SubmitMe
        },
        {
            path: '/error',
            name: 'Error',
            meta: {
                title: '页面错误',
                desc: '内容详情，可根据实际需要安排，如果换行则不超过规定'
            },
            component: Error,
            children: [
                {
                    path: '400',
                    name: 'Error400',
                    meta: {
                        title: '400错误',
                        desc: '400错误，你访问的页面域名不存在或者请求错误。'
                    }
                },
                {
                    path: '403',
                    name: 'Error403',
                    meta: {
                        title: '403错误',
                        desc: '403错误，表示资源不可用。服务器理解客户的请求，但拒绝处理它，通常由于服务器上文件或目录的权限设置导致的WEB访问错误。'
                    }
                },
                {
                    path: '404',
                    name: 'Error404',
                    meta: {
                        title: '页面不存在',
                        desc: '404错误，您访问的链接指向的网页不存在'
                    }
                },
                {
                    path: '500',
                    name: 'Error500',
                    meta: {
                        title: '500错误',
                        desc: '500错误，http 500内部服务器（HTTP-Internal Server Error）错误 , IIS服务器无法解析ASP代码。'
                    }
                },
                {
                    path: '503',
                    name: 'Error503',
                    meta: {
                        title: '503错误',
                        desc: '503错误，网页程序没有相关的结果'
                    }
                }

            ]
        }
    ]
})
