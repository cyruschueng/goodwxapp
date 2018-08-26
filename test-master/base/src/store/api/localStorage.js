export default {
  get (item) {
    return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
  },
  set (item, obj) {
    localStorage.setItem(item, JSON.stringify(obj))
  },
  clear (item) {
    localStorage.removeItem(item)
  }
}
