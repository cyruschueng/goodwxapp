function isEmpty(val) {
  return isNull(val) || isUndefined(val) || isEmptyString(val) || isZero(val)
}

function isNotEmpty(val) {
  // TODO: use functional programming to improve
  return !isEmpty(val)
}

function isRequired(val) {
  return isNotEmpty(val)
}

/** 是否仅包含中文字符 */
function isPureChinese(val) {
  const reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/
  return reg.test(val)
}

function isZero(val) {
  return val === 0
}

function isNull(val) {
  return val === null
}

function isUndefined(val) {
  return val === undefined
}

function isEmptyString(val) {
  return (typeof val === 'string') && val.trim() === ''
}

/** 是否有效的金钱格式，最多两位小数 */
function isMoney(val) {
  const reg = /^[0-9]+(\.[0-9]{1,2})?$/
  return reg.test(val)
}

/** 是否是有效整数（大于0） */
function isInt(val) {
  const reg = /^[1-9][0-9]*$/
  return reg.test(val)
}

/**
 * 这是 checkValid 的回调函数格式
 *
 * @callback checkValidCallback
 * @param {object} res - 报错参数
 * @param {string} res.key - 报错的键值
 * @param {string} res.msg - 报错的错误文本
 */

/**
 * 根据传入的参数选项，返回是否校验是否通过
 * 返回一个 Promise 实例
 *
 * @param {object} options - 校验选项
 * @param {object} options.input - 待检测数据对象
 * @param {object[]} options.conditions - 需要通过的一系列检测条件
 * @param {string} options.conditions[].key - 待检测键值
 * @param {string} options.conditions[].msg - 没有通过检测时的报错信息
 * @param {function} options.conditions[].predicate - 判断函数
 * @return {Promise}
 */
function checkValid(options) {
  if (!options) {
    throw new Error('选项不能为空')
  }

  const { input, conditions, success, fail } = options

  if (!conditions) throw new Error('待检测条件不能为空!')
  if (conditions.length <= 0) throw new Error('待检测条件数量需要大于零')
  if (!input) throw new Error('待检测对象不能为空')

  const failedCases = conditions.filter(({key, predicate}) => {
    const val = input[key]
    return predicate(val) === false
  })

  return new Promise((resolve, reject) => {
    if (failedCases.length > 0) {
      reject(failedCases[0])
    } else {
      resolve()
    }
  })
}

export default {
  isEmpty,
  isNotEmpty,
  isRequired,
  isPureChinese,
  isMoney,
  isInt,
  checkValid
}
