import Request from '../../utils/request'

var app = getApp()

Page({
  data: {
    animationData: {},
    // Scroll
    scrollAnimating: false,
    scrollToView: '#',
    scrollTop: 0,
    viewShifting: 0,
    scrollAnimationData: {},

    groupId: 0,
    accountsCount: 3,
    totalCount: 3,
    currentUserAccount: {
      rank: 199,
      displayName: '不听不听, 飞鞋点金, 安徽发顺丰阿道夫哈地方',
      avatars: {
        medium: 'http://osr3pl3q8.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg'
      },

      summary: {
        winningPercentage: 20.4,
        kdaAvg: 3
      }
    },
    accounts: [
      {
        rank: 199,
        displayName: '不听不听, 飞鞋点金, 安徽发顺丰阿道夫哈地方',
        avatars: {
          medium: 'http://osr3pl3q8.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg'
        },

        summary: {
          winningPercentage: 20.4,
          kdaAvg: 3
        }
      },
      {
        rank: 1,
        displayName: 'a',
        avatars: {
          medium: 'http://osr3pl3q8.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg'
        },

        summary: {
          winningPercentage: 80.5,
          kdaAvg: 8
        }
      },
      {
        rank: 1,
        displayName: 'a',
        avatars: {
          medium: 'http://osr3pl3q8.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg'
        },

        summary: {
          winningPercentage: 80.5,
          kdaAvg: 8
        }
      },
      {
        rank: 1,
        displayName: 'a',
        avatars: {
          medium: 'http://osr3pl3q8.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg'
        },

        summary: {
          winningPercentage: 80.5,
          kdaAvg: 8
        }
      },
      {
        rank: 1,
        displayName: 'a',
        avatars: {
          medium: 'http://osr3pl3q8.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg'
        },

        summary: {
          winningPercentage: 80.5,
          kdaAvg: 8
        }
      },
      {
        rank: 2,
        displayName: 'b',
        avatars: {
          medium: 'http://osr3pl3q8.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg'
        },

        summary: {
          winningPercentage: 70,
          kdaAvg: 7
        }
      }
    ]
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true
    })

    console.log(options)
    wx.getShareInfo({
      shareTicket: '123',
      success: (res) => {
        console.log
      }
    })
  },

  onReady() {
  
  },

  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        let animation = wx.createAnimation({
          duration: 1500,
          delay: 1000
        })

        let scrollAnimation = wx.createAnimation({
          duration: 1500,
          delay: 1000
        });

        animation.top(-190).step();
        scrollAnimation.height(res.windowHeight - 80).step();

        this.setData({
          animationData: animation.export(),
          scrollAnimationData: scrollAnimation.export()
        })
      }
    })

  },

  onHide() {
  
  },

  onUnload() {
  
  },

  onPullDownRefresh() {
  
  },

  onReachBottom() {
  
  },

  onShareAppMessage(res) {
    // console.log(res)

    // return {
    //   // title: '自定义转发标题',
    //   success: (res) => {

    //   }
    // }
  },

  upsetGroupId() {

    // Request.authSend(app.authentication, ())

    this.authentication.executeAuthTask(({token}) => {

    })
  },

  lower(e) {
    if (!this.data.scrollAnimating) {
      this.setData({
        scrollAnimating: true,
        scrollToView: 'group-ranking-share'
      })
    }

    this.setData({
      scrollAnimating: false
    })
  },

  scrolling(e) {
    console.log(e)
  }
})