let {isObject, isLikeArray} = require('./type')

let stack = []

/**
 * 对象深浅拷贝
 *
 * @param obj 原对象
 * @param deep {boolean} true:深拷贝,false:浅拷贝
 * @returns {object} 返回一个新对象
 */
export function clone (obj, deep) {
  if (!isObject(obj)) return obj

  for (let i = 0, len = stack.length; i < len; i++) {
    if (stack[i].key === obj) {
      return stack[i].value
    }
  }

  let nobj = null
  let res = null
  if (isLikeArray(obj)) {
    res = []
    stack.push({key: obj, value: res})
    nobj = cloneArray(obj, res, deep)
  } else {
    res = {}
    stack.push({key: obj, value: res})
    nobj = cloneObject(obj, res, deep)
  }
  // 清空缓存
  stack = []
  return nobj
}

function cloneObject (obj, res, deep) {
  let keys = Object.keys(obj)
  let key
  for (let i = 0, len = keys.length; i < len; i++) {
    key = keys[i]
    if (deep && isObject(obj[key])) {
      res[key] = clone(obj[key], deep)
    } else {
      res[key] = obj[key]
    }
  }
  return res
}

function cloneArray (arr, res, deep) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    if (deep && isObject(arr[i])) {
      res[i] = clone(arr[i], deep)
    } else {
      res[i] = arr[i]
    }
  }
  return res
}
