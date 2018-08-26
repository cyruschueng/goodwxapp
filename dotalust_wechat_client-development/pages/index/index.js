import { $wuxRefresher } from '../../components/wux'
import Request from '../../utils/request'

var app = getApp()

Page({
  data: {
    urlId: null,
    id: null,
    accountId: '暂无',
    displayName: '获取中...',
    avatars: {},
    createdAt: null,
    default: true,
    valid: true,

    summary: {
      winningPercentage: 0,
      killsCountAvg: 0,
      deathsCountAvg: 0,
      assistsCountAvg: 0,
      goldPerMinuteAvg: 0,
      heroHealingAvg: 0,
      heroDamageAvg: 0,
      lastHitsCountAvg: 0,
      experiencePerMinuteAvg: 0,
      kdaAvg: 0
    }
  },

  setupRefresher() {
    this.refresher = new $wuxRefresher({
      onPulling: () => {
        console.log('onPulling')
      },
      onRefresh: () => {
        app.refreshData(this.data.id, () => {
          // page.events.emit(`scroll.refreshComplete`)

          wx.redirectTo({
            url: `/pages/loading/index?channel=account_sync:${this.data.id}`,
          })
        })
      }
    })
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        urlId: options.id
      })
    }

    this.setupRefresher()
  },
  touchstart(e) {
    this.refresher.touchstart(e)
  },
  touchmove(e) {
    this.refresher.touchmove(e)
  },
  touchend(e) {
    this.refresher.touchend(e)
  },
  onReady() {

  },

  onShow() {
    this.fetch_summary()
  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  },

  fetch_summary() {
    let url = '/api/wechat/steam_account/summary'

    if (this.data.urlId) {
      url = `/api/wechat/steam_accounts/${this.data.urlId}/summary`
    }

    this.setData({
      urlId: null
    })

    Request.authSend(app.authentication, {
      url: url,
      success: (data) => {
        var summary = data.summary;

        this.setData({
          id: data.id,
          accountId: data.account_id,
          displayName: data.display_name,
          avatars: data.avatars,
          createdAt: data.created_at,
          default: data.default,
          valid: data.valid,
          summary: {
            winningPercentage: summary.winning_percentage,
            killsCountAvg: summary.kills_count_avg,
            deathsCountAvg: summary.deaths_count_avg,
            assistsCountAvg: summary.assists_count_avg,
            goldPerMinuteAvg: summary.gold_per_minute_avg,
            heroHealingAvg: summary.hero_healing_avg,
            heroDamageAvg: summary.hero_damage_avg,
            lastHitsCountAvg: summary.last_hits_count_avg,
            experiencePerMinuteAvg: summary.experience_per_minute_avg,
            kdaAvg: summary.kda_avg
          }
        })
      }
    })
  }
})
