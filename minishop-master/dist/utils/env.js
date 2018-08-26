export let noop = () => {}

export function extend (dist, src) {
  let keys = Object.keys(src)
  let key
  for (let i = 0, len = keys.length; i < len; i++) {
    key = keys[i]
    dist[key] = src[key]
  }
}

export let hasOwn = Object.prototype.hasOwnProperty
