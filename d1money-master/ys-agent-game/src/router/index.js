import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/pages/Game'
import QSJS from '@/pages/games/QSJS'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/game'
        },
        {
            path: '/game',
            name: 'Game',
            component: Game,
            meta: {
                title: '小游戏'
            }
        },
        {
            path: '/qsjs',
            name: 'QSJS',
            component: QSJS,
            meta: {
                title: '你的前世今生'
            }
        }
    ]
})
