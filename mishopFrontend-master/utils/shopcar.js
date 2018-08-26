/**
 * 购物车增加
 */
function shopCarAdd(data) {
  var value = wx.getStorageSync('carnum');
  if (!value) {
    value = 0;
  }
  value++;

  wx.setStorage({
    key: 'carnum',
    data: value,
    success: function (res) {
      //console.log(wx.getStorageSync('carnum'))
      data.setData({
        carNum: value
      });
    }
  })
}

/**
 * 购物车减少
 */
function shopCarDel(e) {
  var value = wx.getStorageSync('carnum');
  if (!value) {
    value = 0;
  }

  value -= e;

  wx.setStorage({
    key: 'carnum',
    data: value,
    success: function (res) {
      //console.log(wx.getStorageSync('carnum'));
    }, fail(e) {
      console.log(e);
    }
  })
}

/**
 * 程序启动检查购物车
 * 因为有可能清除本地缓存 所以打开软件必须同步一下才行
 * 原本是打算本地清楚缓存可能会造成本地数据丢失与网上不同步
 * 但是360如何清理 数据都在
 * 可是本地数据在的时候,有可能网上的数据就变更了.可能的原因是商品删除,记得好像做过这个简单起见就把商品从购物车删除了
 * 但原本的程序却造成了错误 本地有数据就不联网同步了
 * 目前 是有本地数据就同步 有可能存在的问题 还是本地缓存清除 先这样如果除了问题 再把if语句去掉就可以 这样启动必须同步 就没问题了
 */
function shopCarCheck(d) {
  var value = wx.getStorageSync('carnum');
  //console.log(value+"<----carnum");
  if (value) {
    wx.request({
      url: d.ceshiUrl + '/Api/Shopping/index',
      method: 'post',
      data: {
        user_id: d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var carts = [];
        carts = res.data.cart;
        if (carts) {
          // 计算总数
          var total = 0;
          for (var i = 0; i < carts.length; i++) {
            total += parseInt(carts[i].num);
          }
          //console.log(total+"<----total");
          wx.setStorageSync('carnum',total);
        }
      },
      fail(e) {
        console.log(e);
      }
    });
  }
}


module.exports = {
  shopCarAdd: shopCarAdd,
  shopCarDel: shopCarDel,
  shopCarCheck: shopCarCheck,
}