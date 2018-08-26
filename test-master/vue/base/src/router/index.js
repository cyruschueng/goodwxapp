import Vue from 'vue'
import Router from 'vue-router'
import mainMenu from './mainMenu.js'

Vue.use(Router)

export default new Router({
  routes: [
    ...mainMenu
  ]
})
