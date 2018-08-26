const objectProto = Object.prototype
const toString = (obj) => objectProto.toString.call(obj)

export function isNull (obj) {
  return obj === null
}

export function isUndefined (obj) {
  return obj === undefined
}

export function isNil (obj) {
  return obj == null
}

export function isString (obj) {
  const type = typeof obj
  return type === 'string' || obj instanceof String
}

export function isNumber (obj) {
  const type = typeof obj
  return type === 'number' || obj instanceof Number
}

export function isBoolean (obj) {
  return obj === true || obj === false || obj instanceof Boolean
}

export function isSymbol (obj) {
  const type = typeof obj
  return type === 'symbol' || obj instanceof Symbol
}

export function isObject (obj) {
  const type = typeof obj
  return obj != null && (type === 'object' || type === 'function')
}

export function isObjectLike (obj) {
  return obj != null && typeof obj === 'object'
}

/**
 *
 * @param obj {*}
 * @returns {boolean}
 * @example
 * eg1
 * isPlainObject(null) => false
 *
 * eg2
 * isPlainObject([1,2]) => false
 *
 * eg3
 * isPlainObject(Object.create(null)) => true
 *
 * eg4
 * function Foo(){}
 * isPlainObject(new Foo) => false
 */
export function isPlainObject (obj) {
  // eg1,eg2
  if (!isObjectLike(obj) || toString(obj) !== '[object Object]') {
    return false
  }
  // eg3
  const proto = Object.getPrototypeOf(obj)
  if (proto === null) {
    return true
  }

  // eg4
  return proto.constructor === Object
}

export function isArguments (obj) {
  return isObjectLike(obj) && toString(obj) === '[object Arguments]'
}

export function isArray (obj) {
  return Array.isArray(obj)
}

export function isLikeArray (obj) {
  return isObject(obj) && typeof obj.length === 'number'
}

// 2^53 - 1 数组下标从0开始，最大长度length - 1
const MAX_SAFE_INTEGER = 9007199254740991
/**
 *
 * @param value {*}
 * @returns {boolean}
 * @example
 * eg1
 * isLength(1) => true
 *
 * eg2
 * isLength(-1) => false
 *
 * eg3
 * isLength(1.1) => false
 *
 * eg4
 * isLength(1.1) => false
 *
 * eg5
 * isLength(9007199254740992) => false
 *
 */
export function isLength (value) {
  return typeof value === 'number' && value > -1 && value <= MAX_SAFE_INTEGER && value % 1 === 0
}

export function isArrayLike (obj) {
  return obj !== null && typeof obj !== 'function' && isLength(obj.length)
}

export function isBuffer (obj) {
  return Buffer.isBuffer(obj)
}

export function isDate (obj) {
  return isObjectLike(obj) && toString(obj) === '[object Date]'
}

export function isElement (obj) {
  return isObjectLike(obj) && obj.nodeType === 1
}

export function isFunction (obj) {
  if (!isObject(obj)) {
    return false
  }

  const tag = toString(obj)
  return tag === '[object Function]' ||
    tag === '[object AsyncFunction]' ||
    tag === '[object GeneratorFunction]' ||
    tag === '[object Proxy]'
}

export function isMap (obj) {
  return isObjectLike(obj) && toString(obj) === '[object Map]'
}

export function isSet (obj) {
  return isObjectLike(obj) && toString(obj) === '[object Set]'
}

export function isWeakMap (obj) {
  return isObjectLike(obj) && toString(obj) === '[object WeakMap]'
}

export function isWeakSet (obj) {
  return isObjectLike(obj) && toString(obj) === '[object WeakSet]'
}

export function isRegExp (obj) {
  return isObjectLike(obj) && toString(obj) === '[object RegExp]'
}

export function isError (obj) {
  const tag = toString(obj)
  return isObjectLike(obj) &&
    (
      tag === '[object Error]' ||
      tag === '[object DOMException]'
    )
}
