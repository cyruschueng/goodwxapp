// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {sync} from 'vuex-router-sync'
import {AjaxPlugin, WechatPlugin, ToastPlugin, LoadingPlugin, BusPlugin} from 'vux'
import FastClick from 'fastclick'
import App from './App'

import router from './router/index'
import VueScroller from 'vue-scroller'

let store = new Vuex.Store({
    modules: {}
})
Vue.use(store)
sync(store, router)
store.registerModule('vux', {
    state: {
        isLoading: false,
        direction: 'forward',
        userInfo: null,
        myVisitingRecordTabIndex: 0
    },
    mutations: {
        updateLoadingStatus (state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection (state, payload) {
            state.direction = payload.direction
        },
        updateUserInfo (state, payload) {
            state.userInfo = payload.userInfo
        },
        updateMyVisitingRecordTabIndex (state, payload) {
            state.userInfo = payload.myVisitingRecordTabIndex
        }
    },
    actions: {
        updateUserInfo ({commit}, userInfo) {
            commit({type: 'updateUserInfo', userInfo: userInfo})
        },
        updateMyVisitingRecordTabIndex ({commit}, myVisitingRecordTabIndex) {
            alert(myVisitingRecordTabIndex)
            commit({type: 'updateMyVisitingRecordTabIndex', myVisitingRecordTabIndex: myVisitingRecordTabIndex})
        }
    }
})

require('es6-promise').polyfill()
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueScroller)
Vue.use(BusPlugin)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach((to, from, next) => {
    if (to.name === 'TeamMemberVisitingRecord') {
        window.document.title = to.params.name + to.meta.title
    } else {
        window.document.title = to.meta.title
    }

    store.commit('updateLoadingStatus', {isLoading: true})

    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', {direction: 'forward'})
        } else {
            store.commit('updateDirection', {direction: 'reverse'})
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('updateDirection', {direction: 'forward'})
    }
    next()
})
router.afterEach(function (to) {
    store.commit('updateLoadingStatus', {isLoading: false})
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')
