import regeneratorRuntime from '../../../lib/regenerator-runtime'
import Mine from '../../../api/mine'
import { navigateErrorPage, alertError } from '../../../utils.js'

Page({
  data: {
    id: null,
    page: 1,
    limit: 10,
    finished: false,
    recordList: []
  },

  onLoad (options) {
    const { id } = options
    this.setData({ id })
    this.infiniteLoading()
  },

  onReachBottom () {
    const { finished } = this.data
    if (finished) return
    this.infiniteLoading()
  },

  async infiniteLoading () {
    const { id, page, limit, recordList } = this.data
    wx.showLoading()
    try {
      const { totalCount, list } = await Mine.getGiftCardRecordList({ id, page: page, limit })
      this.setData({ page: page + 1, recordList: [...recordList, ...list], finished: page > totalCount / limit })
    } catch (err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  }
})
