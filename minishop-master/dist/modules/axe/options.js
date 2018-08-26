import { isFunction } from '../../utils/index'

import { extend } from './utils'

import config from './config'

let lifecycleHooks = config.app.lifecycleHooks.concat(config.page.lifecycleHooks)

export function mixin (options) {
  if (Array.isArray(options.mixins)) {
    let mixins = options.mixins
    delete options.mixins
    for (let i = 0, len = mixins.length; i < len; i++) {
      mergeOptions(options, mixins[i])
    }
  }
  return options
}

/**
 * 合并策略
 *
 * data:
 *  在混合选项中的data必须是函数
 *
 * 生命周期钩子函数：
 *  1: 先执行全局混合，按照添加顺序执行
 *  2: 执行模块的混合，按照mixins的顺序执行
 *  3: 执行模块自身的钩子
 *
 * 其他options选项：
 *  直接替换，替换的顺序同生命周期钩子函数
 */
export function mergeOptions (distOptions, srcOptions) {
  if (Array.isArray(srcOptions.mixins)) {
    let mixins = srcOptions.mixins
    delete srcOptions.mixins
    for (let i = 0, len = mixins.length; i < len; i++) {
      mergeOptions(distOptions, mixins[i])
    }
  }

  for (let key in srcOptions) {
    mergeField(key)
  }

  function mergeField (key) {
    if (key === 'data') {
      distOptions.data = distOptions.data || {}
      var data = srcOptions[key]
      if (isFunction(data)) {
        data = data()
      }
      if (isFunction(distOptions.data)) {
        distOptions.data = distOptions.data() || {}
      }
      extend(distOptions.data, data)
    } else if (isHook(key)) {
      distOptions[key] = concatFunction(distOptions[key], srcOptions[key])
    } else {
      distOptions[key] = srcOptions[key]
    }
  }
}

export function bindOptions (axe, options) {
  const wxOptions = {}
  Object.keys(options).forEach((key) => {
    if (isFunction(options[key])) {
      wxOptions[key] = axe[key] = options[key].bind(axe)
    } else if (isHook(key)) {
      wxOptions[key] = axe[key] = function (...args) {
        // 绑定上下文
        axe.$cxt = this
        options[key].forEach((fn) => {
          fn.apply(axe, args)
        })
      }
    } else {
      wxOptions[key] = axe[key] = options[key]
    }
  })
  return wxOptions
}

export function pickOptions (axe, keys, options) {
  let nkeys = Object.keys(axe)
  if (nkeys.length <= keys.length) return options
  let key = null
  for (let i = 0, len = nkeys.length; i < len; i++) {
    key = nkeys[i]
    if (keys.indexOf(key) === -1) {
      options[key] = axe[key]
    }
  }
  return options
}

function isHook (key) {
  return lifecycleHooks.indexOf(key) > -1
}

function concatFunction (a, b) {
  if (!Array.isArray(a)) {
    a = isFunction(a) ? [a] : []
  }

  if (!Array.isArray(b)) {
    b = isFunction(b) ? [b] : []
  }

  return a.concat(b)
}
