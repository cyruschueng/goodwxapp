const app = getApp()
const regeneratorRuntime = require('../../lib/regenerator-runtime')
const promisify = require('../../lib/promisify')
const { getLuckDrawData, luckDraw } = require('../../api/mine')
const { navigateErrorPage, alertError } = require('../../utils')

Page({
  data: {
    id: '',
    prizes: [],

    rotateAnimation: {},
    runTimes: 0,
    drawing: false,

    prize: null,
    thanksModal: false,
    winnerModal: false,
    coinModal:false,

    amount: null,
    startTime: null,
    endTime: null,
    avatar: '',
    nickName: '',
    num:null,
    prizeType:null,
    useLimit:null,
    validType:null,
    tag:null,
    couponId:0,
    money:null

  },

  onLoad (options) {
    const { id } = options
    this.setData({ id })
    this.init()
  },

  onShow (options) {},

  // onPullDownRefresh () {
  //   this.init()
  // },
  // methods
  async init () {
    const { id } = this.data
    wx.showNavigationBarLoading()
    try {
      let { prizesList: prizes } = await getLuckDrawData({ id })
      const length = prizes.length
      prizes = prizes.map((prize, index) => {
        return { amount: prize.prizeAmount, prizetype:prize.prizeType, num:prize.num, turn: `${index * 1 / length}turn`}
      })
      this.setData({ prizes })
      console.log(prizes)
    } catch (err) {
      navigateErrorPage(err)
    } finally {
      wx.hideNavigationBarLoading()
    }
  },

  // events
  async draw () {
    // TODO 优化，先转起来。
    const { id, prizes, runTimes, drawing } = this.data
    const length = prizes.length

    if (drawing) return

    wx.showLoading()
    try {
      const { startTime, endTime, amount, prizeType, num, avatar, nickName, prizeIndex: index, useLimit, validType, tag, couponId, money } = await luckDraw({ id })
      // const index = Math.random() * length >>> 0

      const offset = 360 / length * (index)

      const rotateAnimation = wx.createAnimation({
        duration: 3000,
        timingFunction: 'ease'
      })

      const rotate = 3600 * runTimes + 3600 - offset
      rotateAnimation.rotate(rotate).step()

      this.setData({
        drawing: true,
        runTimes: runTimes + 1,
        rotateAnimation: rotateAnimation.export()
      })

      setTimeout(() => {
        const type = prizes[index].prizetype
        const thanksModal = type == 0
        const winnerModal = type == 1
        const coinModal = type == 2


        this.setData({ thanksModal, winnerModal, coinModal, amount, prizeType, num, useLimit, tag, money, validType, avatar, nickName, drawing: false, startTime: startTime || '', endTime: endTime || '' })
      }, 3000)
    } catch (err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  },

  closeThanksModal () {
    this.setData({ thanksModal: false })
  },
  closeWinnerModal () {
    this.setData({ winnerModal: false })
  },
  closeCoinModal () {
    this.setData({ coinModal: false})
  }
})
