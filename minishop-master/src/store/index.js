import Immutable from 'immutable'
import initialState from './state'
import { provider } from '../modules/axe-redux/index'
import reducers from './reducers/index'
import log from './log'
import reduxThunk from '../modules/redux-thunk/index'

import {
  createStore,
  applyMiddleware
} from 'redux'

let store
if (process.env.NODE_ENV !== 'production') {
  store = createStore(reducers, Immutable(initialState), applyMiddleware(reduxThunk, log))
} else {
  store = createStore(reducers, Immutable(initialState), applyMiddleware(reduxThunk))
}

// 为小程序提供 store 绑定
provider(store)

// 提供全局访问
wx.$store = store

export default store
