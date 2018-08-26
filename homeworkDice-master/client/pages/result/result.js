//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    homeworks: [{}],
    works: [{}],
    res: []
  },

  //事件处理函数
  goBackToPeople: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  bindtapButton: function (e) {
    switch (e.target.id) {
      case 'prev':
        this.goBackToPeople();
        break;
      default:
        break;
    }
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        // console.log('shareMenu share success')
        // console.log(res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
    //处理从上一个页面传递的数据
    var ws = options.peopleList.split(',');
    // console.log(options.flag == 1)
    // console.log(options.res)
    if (options.flag == 1) {
      // console.log(options.flag)
      // console.log(JSON.parse(options.res))
      this.setData({
        res: JSON.parse(options.res),
        works: ws
      })
      return;
    }
    var hw = JSON.parse(options.housework);
    this.setData({
      homeworks: hw,
      works: ws
    })


    let homeworks = this.data.homeworks;
    let wl = this.data.works.length;
    let tres = [];

    function sortPower(a, b) {
      return b.power - a.power;
    }
    function sum(arr) {
      let s = 0;
      arr.forEach(function (val, idx, arr) {
        s += parseInt(val.power);
      }, 0);
      return s;
    }

    homeworks.sort(sortPower);

    while (homeworks.length > 0) {
      let avg = sum(homeworks) / wl;
      if (parseInt(homeworks[0].power) >= avg) {
        let tmp = [];
        tmp.push(homeworks[0].txt);
        homeworks.shift();
        tres.push(tmp);
      } else {
        let pow = homeworks[0].power;
        let tmp = [];
        tmp.push(homeworks[0].txt);
        homeworks.shift();
        while (pow < avg) {
          tmp.push(homeworks[homeworks.length - 1].txt);
          pow = parseInt(pow) + parseInt(homeworks[homeworks.length - 1].power);
          homeworks.pop();
        }
        tres.push(tmp);
      }
      wl = wl - 1;
    }
    this.setData({
      res: tres
    })

    console.log(JSON.stringify(this.data.res));
    console.log(this.data.works.join(","));
  },
  onShareAppMessage: function () {
    return {
      title: '分享小程序标题',
      path: '/pages/result/result?res=' + JSON.stringify(this.data.res) + '&peopleList=' + this.data.works.join(",") + '&flag=1',
      success: function (res) {
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {
            // console.log(res) 
            console.log(res.iv)
            console.log(res.encryptedData)
            wx.showToast({
              title: '分享成功！',
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '分享失败！',
            })
            console.log(res)
          },
          complete: function (res) {
            console.log(res.errMsg)
          }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})
