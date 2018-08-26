import Axe from './axe'
import Event from '../event/index'
import {
  initMixin,
  buildinMixin
} from './mixin'

let app = null
const bus = new Event()
Axe.$bus = bus

// 初始化混合
initMixin(Axe)
// 内置的混合属性
buildinMixin(Axe)

export function WApp (options = {}) {
  if (app) return app
  options.$bus = bus
  app = new Axe(options, App)
  app.$bus = bus
  // wx绑定bus
  wx.$bus = bus
  return app
}

export function WPage (options = {}) {
  options.$bus = bus
  let axe = new Axe(options, Page)
  axe.$root = app
  axe.$bus = bus
  return axe
}

export default Axe
