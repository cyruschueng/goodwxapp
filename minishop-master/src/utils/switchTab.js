var pageReady = {}

export function switchTab (options) {
  var { url, name, data, page = name } = options
  var success = () => {
    if (pageReady[name]) {
      wx.$bus.emit('switchTab:' + name, data)
    } else {
      wx.$bus.on('page:' + page + ':ready', () => {
        pageReady[name] = true
        wx.$bus.emit('switchTab:' + name, data)
      })
    }
  }
  wx.switchTab({
    url,
    success
  })
}

export function initSwitchTab (name) {
  wx.$bus.on('page:' + name + ':ready', () => {
    pageReady[name] = true
  })
}
