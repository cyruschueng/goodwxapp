let settings = require("../secret/settings.js")
let network = require("./network.js")

// success: 请求成功后执行的方法
function addFavorite(currencyId, marketId, success) {
  let postData = {
    currency_id: currencyId
  }

  if (marketId && marketId > 0) {
    postData.market_id = marketId
  }

  network.POST({
    url: settings.addFavoriteUrl,
    params: postData,
    success: success,
    fail: ()=>{
      wx.showToast({
        title: '添加关注失败，请重试',
        duration: 1500,
        image: '/images/icons/exclamationmark.png',
      })
    },
  })
}

// success: 请求成功后执行的方法
function removeFavorite(currencyId, marketId, success) {
  let postData = {
    currency_id: currencyId
  }

  if (marketId && marketId > 0) {
    postData.market_id = marketId
  }

  network.POST({
    url: settings.removeFavoriteUrl,
    params: postData,
    success: success,
    fail: () => {
      wx.showToast({
        title: '取消关注失败，请重试',
        duration: 1500,
        image: '/images/icons/exclamationmark.png',
      })
    },
  })
}

function syncFavoriteList(favlist, success) {
  network.POST({
    url: settings.syncFavoriteListUrl,
    params: favlist,
    success: success,
    fail: ()=>{
      wx.showToast({
        title: '同步关注列表失败，请重试',
        duration: 1500,
        image: '/images/icons/exclamationmark.png',
      })
    }
  })
}

module.exports = {
  addFavorite: addFavorite,
  removeFavorite: removeFavorite,
  syncFavoriteList: syncFavoriteList,
}