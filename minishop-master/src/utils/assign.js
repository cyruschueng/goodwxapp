import { hasOwn } from './env'
var getOwnPropertySymbols = Object.getOwnPropertySymbols
var propIsEnumerable = Object.prototype.propertyIsEnumerable
var shouldUseNative = typeof Object.assign === 'function'
function toObject (val) {
  if (val == null) {
    throw new TypeError('Object.assign cannot be called with null or undefined')
  }

  return Object(val)
}

export var assign = shouldUseNative ? Object.assign : function (target) {
  var from
  var to = toObject(target)
  var symbols

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s])

    for (var key in from) {
      if (hasOwn.call(from, key)) {
        to[key] = from[key]
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from)
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]]
        }
      }
    }
  }

  return to
}
